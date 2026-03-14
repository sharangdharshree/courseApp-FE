import { allCoursesFetchService } from "../services/public.service.js";
import { useQuery } from "@tanstack/react-query";
import { Card, Spinner } from "./index.js";

function Courses() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Courses"],
    queryFn: allCoursesFetchService,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: 2,
    onSuccess: (data) => console.log("Courses fetched", data),
    onError: (err) => console.error("Error fetching courses", err),
  });

  return (
    <div className="flex justify-evenly flex-wrap bg-slate-950 my-20 px-10">
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        data.map((course) => (
          <Card
            key={course._id}
            id={course._id}
            banner={course.thumbnail.url}
            title={course.title}
            sellingPrice={course.basePrice.amount}
            mrp={course.basePrice.amount}
            discount={59}
          />
        ))
      )}
    </div>
  );
}
// bannerP,
//   titleP,
//   tagsP /* array of tags */,
//   sellingPriceP,
//   mrpP,
//   discountP,
export default Courses;
