import axios from "axios";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import { server } from "../../main";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth, loading } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete course");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm">
      <img
        src={`${server}/${course.image}`}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600">Duration: {course.duration} weeks</p>
        <p className="text-gray-600 mb-4">Price: ${course.price}</p>

        {!isAuth ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>
        ) : user?.subscription?.includes(course._id) ? (
          <button
            onClick={() => navigate(`/courses/study/${course._id}`)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Study
          </button>
        ) : user?.role === "admin" ? (
          <button
            onClick={() => navigate(`/courses/study/${course._id}`)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            View Content
          </button>
        ) : (
          <button
            onClick={() => navigate(`/courses/${course._id}`)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>
        )}

        {user?.role === "admin" && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Delete Course
          </button>
        )}
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    subscription: PropTypes.array,
  }).isRequired,
};

export default CourseCard;
