import DOMPurify from "dompurify";

function CourseDescription({ descriptionHTML }) {
  const cleanDescription = DOMPurify.sanitize(descriptionHTML);

  return (
    <div
      className="prose prose-lg prose-headings:font-bold prose-li:marker:text-indigo-600"
      dangerouslySetInnerHTML={{ __html: cleanDescription }}
    />
  );
}

export default CourseDescription;
