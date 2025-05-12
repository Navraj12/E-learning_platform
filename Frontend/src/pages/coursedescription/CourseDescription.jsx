import axios from "axios"; // Import axios
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import { initializeKhaltiCheckout } from "../../utils/Khalti.js";
// import { initializeKhaltiCheckout } from "../utils/khalti.jsx"; // Import Khalti utility

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [fetchCourse, fetchCourses, fetchMyCourse, params.id]);

  const handlePaymentSuccess = async (payload) => {
    try {
      // Call your backend to verify the payment
      const response = await axios.post(`${server}/api/payment/verify`, {
        token: payload.token,
        amount: payload.amount,
        courseId: course._id,
      });

      if (response.data.success) {
        alert("Payment successful! You can now access the course.");
        navigate(`/courses/study/${course._id}`);
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment Error:", error);
    alert("Payment failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {course && (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
          <div className="flex flex-col md:flex-row">
            {/* Course Image */}
            <img
              src={`${server}${course.image}`}
              alt={course.title}
              className="w-full md:w-1/2 h-64 object-cover"
            />

            {/* Course Details */}
            <div className="p-8 w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-2">
                Instructor:{" "}
                <span className="font-medium">{course.createdBy}</span>
              </p>
              <p className="text-gray-600 mb-2">
                Duration: <span className="font-medium">{course.duration}</span>
              </p>

              <p className="text-xl mt-4 font-semibold text-gray-900">
                Let's get started with this course at Rs. {course.price}
              </p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/courses/study/${course._id}`)}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() =>
                    initializeKhaltiCheckout(
                      course.price,
                      course.title,
                      course._id,
                      handlePaymentSuccess,
                      handlePaymentError
                    )
                  }
                  className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
                >
                  Pay with Khalti
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
CourseDescription.propTypes = {
  user: PropTypes.shape({
    subscription: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default CourseDescription;
