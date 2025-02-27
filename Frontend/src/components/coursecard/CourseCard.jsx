import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import { server } from "../../main";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-sm">
      <img
        src={`${server}/${course.image}`}
        alt=""
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600">Duration: {course.duration} weeks</p>
        <p className="text-gray-600 mb-4">Price: ${course.price}</p>
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/courses/study/${course._id}`)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Get Started
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/courses/study/${course._id}`)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>
        )}
        <br />
        {user && user.role == "admin" && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
