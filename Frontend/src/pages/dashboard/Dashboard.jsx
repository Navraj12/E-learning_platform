import CourseCard from "../../components/coursecard/CourseCard";
import { CourseData } from "../../context/CourseContext";

const Dashboard = () => {
  const { mycourse } = CourseData;
  console.log(mycourse);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        All Enrolled Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p className="text-gray-600 text-lg">No course enrolled yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
