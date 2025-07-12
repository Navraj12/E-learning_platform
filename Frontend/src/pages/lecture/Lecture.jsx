/* eslint-disable no-unused-vars */
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { server } from "../../main";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== "admin" && !user?.subscription.includes(params.id)) {
      navigate("/");
    } else {
      fetchLectures();
    }
  }, [user, params.id, navigate]);

  async function fetchLectures() {
    try {
      const { data } = await axios.get(
        `${server}/api/courses/${params.id}/lectures`,
        // `${server}/api/admin/okay`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setLectures(data.lectures);
    } catch (error) {
      toast.error("Failed to fetch lectures");
    } finally {
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/api/courses/${params.id}/lectures/${id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setLecture(data.lecture);
    } catch (error) {
      toast.error("Failed to fetch lecture");
    } finally {
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setVideoPrev(reader.result);
        setVideo(file);
      };
      reader.onerror = () => toast.error("Failed to load video");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        // `${server}/api/courses/${params.id}`,
        `${server}/api/admins/${params.id}`,
        myForm,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success(data.message);
      fetchLectures();
      setShow(false);
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lectures/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Deletion failed");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 gap-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="lg:w-3/4 w-full">
            {lecLoading ? (
              <Loading />
            ) : lecture?.video ? (
              <>
                <video
                  src={`${server}/${lecture.video}`}
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  autoPlay
                  className="w-full rounded-lg shadow-lg"
                ></video>
                <h1 className="mt-4 text-2xl font-bold">{lecture.title}</h1>
                <h3 className="mt-2 text-lg text-gray-600">
                  {lecture.description}
                </h3>
              </>
            ) : (
              <h1 className="text-2xl font-semibold">
                Please Select a Lecture
              </h1>
            )}
          </div>

          <div className="lg:w-1/4 w-full flex flex-col gap-4">
            {user?.role === "admin" && (
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                onClick={() => setShow(!show)}
              >
                {show ? "Close" : "Add Lecture +"}
              </button>
            )}

            {show && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add Lecture</h2>
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                  />
                  <input type="file" onChange={changeVideoHandler} required />

                  {videoPrev && (
                    <video
                      src={videoPrev}
                      controls
                      className="mt-2 rounded-lg"
                    />
                  )}

                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    {btnLoading ? "Please wait" : "Add"}
                  </button>
                </form>
              </div>
            )}

            {lectures.length > 0 ? (
              lectures.map((e, i) => (
                <div key={e._id} className="flex items-center justify-between">
                  <div
                    onClick={() => fetchLecture(e._id)}
                    className="cursor-pointer"
                  >
                    {i + 1}. {e.title}
                  </div>
                  {user?.role === "admin" && (
                    <button
                      onClick={() => deleteHandler(e._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No Lectures Yet!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Lecture.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
    subscription: PropTypes.array.isRequired,
  }).isRequired,
};

export default Lecture;
