import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/coursecard/CourseCard";
import { CourseData } from "../../context/CourseContext";
import Layout from "../Utils/Layout";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const { courses } = CourseData();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    createdBy: "",
    duration: "",
    image: null,
  });

  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePrev(reader.result);
        setFormData((prev) => ({ ...prev, image: file }));
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) return alert("Please select a category");

    setBtnLoading(true);

    // Placeholder for form submission logic
    console.log("Submitting course:", formData);

    setTimeout(() => {
      setBtnLoading(false);
      alert("Course added successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        createdBy: "",
        duration: "",
        image: null,
      });
      setImagePrev("");
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8 p-6">
        {/* Left - Course List */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-6">All Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.length ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

        {/* Right - Add Course Form */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-6">Add Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(formData).map(
              ([key, value]) =>
                key !== "image" && (
                  <div key={key}>
                    <label className="block text-sm font-semibold capitalize">
                      {key}
                    </label>
                    {key === "category" ? (
                      <select
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={
                          key === "price" || key === "duration"
                            ? "number"
                            : "text"
                        }
                        name={key}
                        value={value}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                      />
                    )}
                  </div>
                )
            )}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold">Image</label>
              <input
                type="file"
                onChange={changeImageHandler}
                className="w-full p-2 border rounded-lg"
                required
              />
              {imagePrev && (
                <img
                  src={imagePrev}
                  alt="Preview"
                  className="mt-4 w-full rounded-lg shadow-lg"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={btnLoading}
              className="w-full p-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {btnLoading ? "Please wait..." : "Add Course"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

AdminCourses.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminCourses;
