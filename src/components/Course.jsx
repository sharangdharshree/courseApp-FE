import { courseFetchService } from "../services/public.service.js";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Spinner, CourseDescription } from "./index.js";
import { purchasedCoursesFetchService } from "../services/user.service.js";
import {
  applyCouponService,
  initiatePaymentService,
  verifyPaymentService,
} from "../services/checkout.service.js";
import toast from "react-hot-toast";

function Course() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, userData } = useSelector((state) => state.auth);
  const [isPaying, setIsPaying] = useState(false);

  // coupon state
  const [couponInput, setCouponInput] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["Course", id],
    queryFn: () => courseFetchService(id),
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
    retry: 2,
  });

  const { data: purchases } = useQuery({
    queryKey: ["purchased-courses"],
    queryFn: purchasedCoursesFetchService,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  const hasPurchased = useMemo(() => {
    if (!purchases?.length) return false;
    return purchases.some((purchase) => {
      const courseId =
        typeof purchase.course === "object"
          ? purchase.course?._id || purchase.course?.toString()
          : purchase.course;
      return courseId === id;
    });
  }, [purchases, id]);

  const mrp = data?.basePrice?.amount || 0;
  const discount = couponData?.discount || 0;
  const finalPrice = couponData ? couponData.finalPrice : mrp;
  const discountPercent = mrp > 0 ? Math.round((discount / mrp) * 100) : 0;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    if (!isAuthenticated) {
      navigate("/auth", { state: { from: `/course/${id}` } });
      return;
    }

    try {
      setIsApplyingCoupon(true);
      setCouponError("");
      const result = await applyCouponService(id, couponInput.trim());
      setCouponData(result);
    } catch (err) {
      setCouponError(err?.message || "Invalid coupon");
      setCouponData(null);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponData(null);
    setCouponInput("");
    setCouponError("");
  };

  const loadRazorpay = () => {
    if (window.Razorpay) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  };

  const handlePrimaryCta = async () => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: `/course/${id}` } });
      return;
    }

    if (hasPurchased) {
      navigate(`/course/${id}/learn`);
      return;
    }

    try {
      setIsPaying(true);
      await loadRazorpay();
      const order = await initiatePaymentService(
        id,
        couponData?.couponCode || undefined,
      );

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "CourseWallah",
        description: order.course?.title,
        order_id: order.orderId,
        prefill: {
          name: userData?.fullName,
          email: userData?.email,
          contact: userData?.phone,
        },
        handler: async function (response) {
          try {
            await verifyPaymentService(id, {
              ...response,
              amountPaid: order.amount,
              couponCode: couponData?.couponCode || undefined,
            });
            await queryClient.invalidateQueries({
              queryKey: ["purchased-courses"],
            });
            toast.success("Enrollment successful! Happy learning.");
            navigate(`/course/${id}/learn`, { replace: true });
          } catch (err) {
            toast.error(err?.message || "Payment verification failed");
          }
        },
      });

      rzp.on("payment.failed", function (response) {
        toast.error(
          response.error?.description || "Payment failed. Please try again.",
        );
      });

      rzp.open();
    } catch (err) {
      toast.error(err?.message || "Unable to start payment");
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-50">
        <p>{error?.message || "Course not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-50">
      <div className="bg-cyan-900/50 flex flex-wrap justify-center">
        <div className="w-full max-w-300 p-10 flex flex-wrap lg:flex-nowrap justify-between gap-6">
          <div className="w-full lg:w-2/3 flex flex-col justify-around space-y-4 pr-0 lg:pr-10">
            <h1 className="text-2xl font-extrabold">{data.title}</h1>
            <h3 className="text-lg font-medium">{data.overview}</h3>
            <div className="space-y-3 text-sm font-medium">
              <p>Author: {data.createdBy}</p>
              <p>Last updated: {data.updatedAt}</p>
              <p>Language: English</p>
            </div>
          </div>
          <div className="bg-slate-800 w-full lg:w-1/3 min-w-70 max-w-100 flex flex-col space-y-2 items-center rounded-sm shrink-0">
            <div>
              <img
                src={data.thumbnail.url}
                alt="thumbnail"
                className="w-full rounded-t-sm"
              />
            </div>
            <div className="w-full p-4 h-full flex flex-col justify-between space-y-3">
              <div className="flex justify-between items-baseline font-medium space-x-2">
                <p className="space-x-3 text-xl">
                  <span className="font-bold text-2xl">
                    &#8377; {finalPrice}
                    <span className="text-sm font-normal">(+GST)</span>
                  </span>
                  {discount > 0 && (
                    <span>
                      <del className="text-gray-400/50 text-lg">
                        &#8377; {mrp}
                      </del>
                    </span>
                  )}
                </p>
                {discountPercent > 0 && (
                  <p className="text-blue-500 text-2xl">
                    <span>{discountPercent}% OFF</span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                {couponData && (
                  <div className="border-1 border-dashed border-slate-700/50 p-2 text-gray-50/50 text-sm flex justify-between items-center">
                    <span>
                      <strong>{couponData.couponCode}</strong> is applied
                    </span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-400 hover:text-red-300 text-xs cursor-pointer ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-red-400 text-sm">{couponError}</p>
                )}
                {!couponData && (
                  <form onSubmit={handleApplyCoupon} className="rounded-md">
                    <input
                      type="text"
                      placeholder="Enter Coupon"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-2/3 bg-slate-700/50 p-2 rounded-l-md outline-0 border-1 border-slate-700/50"
                    />
                    <button
                      type="submit"
                      disabled={isApplyingCoupon || !couponInput.trim()}
                      className="w-1/3 bg-blue-500 p-2 hover:bg-blue-600 hover:cursor-pointer font-medium rounded-r-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isApplyingCoupon ? "..." : "Apply"}
                    </button>
                  </form>
                )}
              </div>
              <hr className="border-1 border-dashed border-cyan-500/15" />
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-md p-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handlePrimaryCta}
                disabled={isPaying}
              >
                {hasPurchased
                  ? "Go to course"
                  : isPaying
                    ? "Processing..."
                    : "Enroll"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-300 p-10 flex justify-between">
          <div className="w-full lg:w-2/3 flex flex-col gap-8 pr-0 lg:pr-10">
            <CourseDescription descriptionHTML={data.description} />
            {data.sections?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Course Contents</h2>
                <div className="space-y-2">
                  {data.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-slate-800/50 border border-slate-700/50 rounded-md px-4 py-3"
                    >
                      <span className="font-medium">{section.title}</span>
                      <span className="text-sm text-gray-400 shrink-0 ml-4">
                        {section.contentCount}{" "}
                        {section.contentCount === 1 ? "lesson" : "lessons"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
