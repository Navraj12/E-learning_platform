import CourseCard from "../../components/coursecard/CourseCard.jsx";
import { CourseData } from "../../context/CourseContext";

const Courses = () => {
  const { courses } = CourseData();
  console.log(courses);
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Available Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No Courses Yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default Courses;
