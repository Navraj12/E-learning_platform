import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { server } from "../main";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/users/login`, {
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse();
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response.data.message);
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/users/register`, {
        name,
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);

      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response.data.message);
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/users/verify`, {
        otp,
        activationToken,
      });
      toast.success(data.message);
      navigate("login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${server}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
      }}
    >
      {" "}
      {children} <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
