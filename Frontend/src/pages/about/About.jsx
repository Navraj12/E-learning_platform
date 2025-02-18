import React from "react";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
      <div className="max-w-2xl px-6 py-12">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">About Us</h2>
        <p className="text-gray-600 leading-relaxed">
          We are dedicated to providing high-quality online courses to help
          individuals learn and grow in their desired fields. Our experienced
          instructors ensure that each course is tailored for effective learning
          and practical application.
        </p>
      </div>
    </div>
  );
};

export default About;
