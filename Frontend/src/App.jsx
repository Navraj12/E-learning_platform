import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Loading from "./components/loading/Loading";
import { UserData } from "./context/UserContext";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import Courses from "./pages/courses/Courses";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Lecture from "./pages/lecture/Lecture";
function App() {
  // const { user } = UserData();
  // console.log(user);
  const { isAuth, user, loading } = UserData();

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route
              path="/courses/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route path="/courses/study/:id" element={<CourseStudy />} />
            <Route
              path="/account/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />

            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/courses/:id/lectures/:lectureId"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/lectures"
              element={isAuth ? <AdminDashboard user={user} /> : <Login />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* <Route path="/lectures/:id" element={<Lecture />} /> */}
            <Route
              path="/admin/courses"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
