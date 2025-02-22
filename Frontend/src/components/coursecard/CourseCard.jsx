import React from "react";
import { server } from "../../main";

const CourseCard = (course) => {
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
        <p className="text-gray-600">Duration: {course.duration}</p>
        <p className="text-gray-600 mb-4">Price: ${course.price}</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
