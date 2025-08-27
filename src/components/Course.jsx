import { courseFetchService } from "../services/public.service.js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./index.js";

function Course() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Course"],
    queryFn: () => courseFetchService(id),
    staleTime: 0,
    cacheTime: 1000 * 60 * 30,
    retry: 2,
    onSuccess: (data) => console.log("Courses fetched", data),
    onError: (err) => console.error("Error fetching courses", err),
  });

  return isLoading ? (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="min-h-screen text-gray-50">
      <div className="bg-gray-500/25  flex justify-center">
        <div className="h-100 w-full max-w-300 p-10 flex justify-between">
          <div className="w-2/3 min-w-105 flex flex-col justify-around pr-10">
            <h1 className="text-2xl font-extrabold">{data.title}</h1>
            <h3 className="text-lg font-medium">{data.overview}</h3>
            <div className="space-y-3">
              <p>author: {data.createdBy}</p>
              <p>Last updated: {data.updatedAt}</p>
              <p>Language</p>
            </div>
          </div>
          <div className="bg-slate-900 w-1/3 min-w-70 max-w-100 h-125 flex flex-col space-y-2 items-center rounded-sm">
            <div>
              <img
                src={data.thumbnail.url}
                alt="thumbnail"
                className="w-full rounded-t-sm"
              />
            </div>
            <div className="w-full p-4 h-full flex flex-col justify-between">
              <div className="flex justify-between items-baseline font-medium space-x-2">
                <p className="space-x-3 text-xl ">
                  <span className="font-bold text-2xl">
                    &#8377; {4919}
                    <span className="text-sm font-normal">(+GST)</span>
                  </span>
                  <span>
                    <del className="text-gray-400/50 text-lg">
                      &#8377; {data.basePrice.amount}
                    </del>
                  </span>
                </p>
                <p className="text-blue-500 text-2xl">
                  <span>{59}% OFF</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="border-1 border-dashed border-slate-700/50 p-2 text-gray-50/50 text-sm">
                  <strong>MT260825G2</strong> is applied
                </p>
                <form action="" className="rounded-md ">
                  <input
                    type="text"
                    placeholder="Enter Coupon"
                    className="w-2/3 bg-slate-700/50 p-2 rounded-l-md outline-0 border-1 border-slate-700/50"
                  />
                  <button className="w-1/3 bg-blue-500 p-2 hover:bg-blue-600 hover:cursor-pointer font-medium rounded-r-md">
                    Apply
                  </button>
                </form>
              </div>
              <hr className="border-1 border-dashed border-cyan-500/15" />
              <div className="w-full ">
                <button className="w-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-md p-2 font-medium">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-300 p-10 flex justify-between">
          <div className="w-2/3 min-w-105 flex flex-col justify-between pr-10">
            <div className="h-full">{data.description}</div>
            <div>Course Contents</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
