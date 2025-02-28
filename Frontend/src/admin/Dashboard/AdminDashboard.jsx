import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../main";
import Layout from "../Utils/Layout";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLecture: 0,
    totalUsers: 0,
  });

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStats(data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    } else {
      fetchStats();
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-lg font-semibold text-gray-600">Total Courses</p>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {stats.totalCourses}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-lg font-semibold text-gray-600">
              Total Lectures
            </p>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {stats.totalLecture}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-lg font-semibold text-gray-600">Total Users</p>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {stats.totalUsers}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
AdminDashboard.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};

export default AdminDashboard;
