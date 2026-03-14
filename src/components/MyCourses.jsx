import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./loader/Spinner.jsx";
import { purchasedCoursesFetchService } from "../services/user.service.js";

function MyCourses() {
  const navigate = useNavigate();

  const { data: purchases, isLoading, isError } = useQuery({
    queryKey: ["purchased-courses"],
    queryFn: purchasedCoursesFetchService,
    staleTime: 1000 * 60 * 5,
  });

  const completedPurchases = purchases?.filter(
    (p) => p.purchaseStatus === "COMPLETED"
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <p className="text-red-400">Failed to load your courses. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>

      {!completedPurchases?.length ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-20 text-gray-400">
          <p className="text-lg">You haven't purchased any courses yet.</p>
          <Link
            to="/courses"
            className="px-4 py-2 rounded-sm text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedPurchases.map((purchase) => {
            const course = purchase.course;
            if (!course) return null;
            return (
              <div
                key={purchase._id}
                className="bg-slate-900 rounded-lg overflow-hidden flex flex-col border border-slate-800 hover:border-slate-600 transition-colors"
              >
                {course.thumbnail?.url && (
                  <img
                    src={course.thumbnail.url}
                    alt={course.title}
                    className="w-full h-44 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className="text-xs text-cyan-400 uppercase tracking-wide">
                    {course.category}
                  </span>
                  <h2 className="text-lg font-semibold leading-snug">
                    {course.title}
                  </h2>
                  {course.overview && (
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {course.overview}
                    </p>
                  )}
                  <div className="mt-auto pt-3">
                    <button
                      onClick={() => navigate(`/course/${course._id}/learn`)}
                      className="w-full py-2 rounded-sm text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:cursor-pointer"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
