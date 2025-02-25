import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = () => {
  const params = useParams();
  const { fetchCourse, course, user } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  return (
    <>
      {course && (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="w-full max-w-4xl rounded-lg shadow-lg mb-8"
          />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {course.title}
          </h2>
          <h4 className="text-lg text-gray-600 mb-4">{course.description}</h4>
          <h5 className="text-md text-gray-700 mb-2">by- {course.createdBy}</h5>
          <h5 className="text-md text-gray-700 mb-6">
            Duration- {course.duration}
          </h5>
          <Link
            to={`/lectures/${course._id}`}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            View Lectures
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
