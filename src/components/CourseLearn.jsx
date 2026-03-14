import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { courseContentFetchService } from "../services/course.service.js";
import { Spinner } from "./index.js";

function CourseLearn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course-content", id],
    queryFn: () => courseContentFetchService(id),
    enabled: Boolean(id),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const [activeIds, setActiveIds] = useState({
    sectionId: null,
    contentId: null,
  });

  const activeContent = useMemo(() => {
    if (!course?.sections?.length) return null;
    const currentSection =
      course.sections.find((section) => section._id === activeIds.sectionId) ||
      course.sections[0];
    const currentContent =
      currentSection.contents.find(
        (content) => content._id === activeIds.contentId
      ) || currentSection.contents[0];

    return { section: currentSection, content: currentContent };
  }, [course, activeIds]);

  useEffect(() => {
    if (course?.sections?.length && !activeIds.sectionId) {
      const firstSection = course.sections[0];
      const firstContent = firstSection.contents?.[0];
      setActiveIds({
        sectionId: firstSection?._id || null,
        contentId: firstContent?._id || null,
      });
    }
  }, [course, activeIds.sectionId]);

  useEffect(() => {
    if (error?.status === 401 || error?.status === 403) {
      navigate("/auth", { replace: true, state: { from: `/course/${id}` } });
    }
  }, [error, id, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-50 space-y-4">
        <p className="text-xl font-semibold">Please sign in to access the course.</p>
        <Link
          to="/auth"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-medium"
        >
          Login to continue
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-50 space-y-2">
        <p className="text-xl font-semibold">Unable to load course content.</p>
        <p className="text-gray-400">{error.message}</p>
        <button
          className="bg-slate-800 px-4 py-2 rounded-md"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-gray-50 grid grid-cols-1 lg:grid-cols-12">
      <aside className="lg:col-span-4 xl:col-span-3 border-r border-slate-800 max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-semibold">{course.title}</h2>
          <p className="text-gray-400 text-sm mt-1">
            {course.overview || "Course overview"}
          </p>
        </div>
        <div className="divide-y divide-slate-800">
          {course.sections?.map((section, sectionIdx) => (
            <div key={section._id} className="p-4">
              <button
                className="w-full text-left flex justify-between items-center"
                onClick={() =>
                  setActiveIds((prev) => ({
                    ...prev,
                    sectionId:
                      prev.sectionId === section._id ? prev.sectionId : section._id,
                    contentId:
                      prev.sectionId === section._id
                        ? prev.contentId
                        : section.contents?.[0]?._id || null,
                  }))
                }
              >
                <div>
                  <p className="text-sm text-gray-400">
                    Section {sectionIdx + 1}
                  </p>
                  <h3 className="font-semibold">{section.title}</h3>
                  {section.description ? (
                    <p className="text-xs text-gray-500 mt-1">
                      {section.description}
                    </p>
                  ) : null}
                </div>
              </button>

              <div className="mt-3 space-y-2">
                {section.contents?.length ? (
                  section.contents.map((content, contentIdx) => {
                    const isActive = content._id === activeIds.contentId;
                    return (
                      <button
                        key={content._id}
                        className={`w-full text-left rounded-md px-3 py-2 ${
                          isActive
                            ? "bg-slate-800 border border-blue-500"
                            : "hover:bg-slate-900"
                        }`}
                        onClick={() =>
                          setActiveIds({
                            sectionId: section._id,
                            contentId: content._id,
                          })
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-400">
                              Lecture {contentIdx + 1}
                            </p>
                            <p className="font-medium">{content.title}</p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {Math.round(content.duration || 0)}s
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No content yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="lg:col-span-8 xl:col-span-9 h-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              {activeContent?.section?.title}
            </p>
            <h1 className="text-2xl font-bold">{activeContent?.content?.title}</h1>
          </div>
          <Link
            to={`/course/${id}`}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Back to course page
          </Link>
        </div>

        <div className="p-6 space-y-4">
          {activeContent?.content?.url ? (
            <div className="aspect-video bg-black rounded-md overflow-hidden">
              <video
                key={activeContent.content._id}
                controls
                className="w-full h-full object-contain bg-black"
                poster={activeContent.content.thumbnail}
                src={activeContent.content.url}
              />
            </div>
          ) : (
            <div className="aspect-video bg-slate-900 rounded-md flex items-center justify-center">
              <p className="text-gray-400">Content not available</p>
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-md p-4 space-y-2">
            <p className="text-sm text-gray-400">
              {course.description || "Course description"}
            </p>
            {activeContent?.content?.type ? (
              <p className="text-xs text-gray-500">
                Type: {activeContent.content.type}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseLearn;

