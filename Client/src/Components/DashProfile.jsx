import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../Redux/Slice/userSlice";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";

const DashProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(
    currentUser?.profilePicture || ""
  );
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  // --- Effect to initialize form data when currentUser loads ---
  useEffect(() => {
    if (currentUser) {
      setImageFileUrl(currentUser.profilePicture || "");
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
      });
    }
  }, [currentUser]);

  // --- Handlers ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setImageUploadProgress(0);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    // Check for no change
    const noChange =
      formData.username === currentUser.username &&
      formData.email === currentUser.email &&
      !formData.password &&
      !imageFile;

    if (noChange) return setSuccess("No changes detected ⚠️");

    try {
      dispatch(updateStart());
      setError(null);
      setSuccess(null);

      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);
      if (imageFile) data.append("profilePicture", imageFile);

      const res = await axios.put(`https://mern-stack-blog-app-8.onrender.com/api/user/update/${currentUser._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setImageUploadProgress(percent);
        },
      });

      setImageFileUrl(res.data.profilePicture || currentUser.profilePicture);
      dispatch(updateSuccess(res.data));
      setImageFile(null);
      setFormData((prev) => ({ ...prev, password: "" }));
      setSuccess("Profile updated successfully ✅");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Update failed";
      setError(msg);
      dispatch(updateFailure(msg));
    }
  };

  const handleSignout = async () => {
    try {
      await fetch(`https://mern-stack-blog-app-8.onrender.com/api/user/signout`, { method: "POST",credentials: "include" });
      dispatch(signoutSuccess());
      navigate("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`https://mern-stack-blog-app-8.onrender.com/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate("/signup");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const homeNavigate = () => {
    navigate("/");
  };

  // --- Loading State ---
  if (!currentUser) return <div className="text-center p-5">Loading...</div>;

  return (
    // The responsive wrapper that limits width on large screens
    <div className="max-w-5xl w-full mx-auto m-5 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header Section (Already responsive using flex-col md:flex-row) */}
      <div className="mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            👤 Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal info and account settings.
          </p>
        </div>
        <Button
          onClick={homeNavigate}
          outline
          color="gray"
          className="hover:scale-105 transition-transform mt-4 md:mt-0"
        >
          ← Back to Home
        </Button>
      </div>

      {/* 2. Main Profile Container (The core responsive element) */}
      <div className="flex flex-col md:flex-row items-stretch bg-white/80 dark:bg-gray-800/70 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden border border-gray-200/30 dark:border-gray-700/40 w-full">
        
        {/* LEFT SIDE (1/3 width on desktop, full width on mobile) */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-600 to-pink-500 text-white">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />

          <div
            className="relative w-28 h-28 mb-5 cursor-pointer rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-105 transition-transform"
            onClick={() => filePickerRef.current.click()}
          >
            {/* Circular Progressbar */}
            {imageUploadProgress > 0 && imageUploadProgress < 100 && (
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress}%`}
                strokeWidth={6}
                styles={{
                  path: {
                    stroke: `rgba(255,255,255,${imageUploadProgress / 100})`,
                  },
                }}
              />
            )}
            {/* Profile Image */}
            <img
              src={imageFileUrl || "/default-avatar.png"}
              alt="profile"
              className={`object-cover w-full h-full ${
                imageUploadProgress > 0 && imageUploadProgress < 100
                  ? "opacity-60"
                  : "hover:scale-110 transition-transform duration-500"
              }`}
            />
            {/* Edit Overlay */}
            <div className="absolute bottom-0 w-full bg-black/40 py-2 text-xs text-center font-medium">
              <FiEdit2 className="inline-block mr-1" /> Change
            </div>
          </div>

          <h2 className="text-lg font-semibold text-center">
            {currentUser.username}
          </h2>
          <p className="text-sm text-pink-100 text-center">
            {currentUser.email}
          </p>
        </div>

        {/* RIGHT SIDE (2/3 width on desktop, full width on mobile) */}
        <div className="w-full md:w-2/3 flex flex-col justify-center p-8 md:p-10">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextInput
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <TextInput
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <TextInput
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password (optional)"
            />

            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-500 text-white font-semibold shadow-lg transition"
            >
              Save Changes
            </Button>

            {currentUser.isAdmin && (
              <Link to="/create-post">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-500 w-full text-white font-semibold shadow-lg transition">
                  Create Post
                </Button>
              </Link>
            )}
          </form>

          <div className="flex justify-between mt-6 text-sm text-red-500 dark:text-white ">
            <span
              onClick={() => setShowModal(true)}
              className="cursor-pointer hover:underline "
            >
              Delete Account
            </span>
            <span
              onClick={handleSignout}
              className="cursor-pointer hover:underline"
            >
              Sign Out
            </span>
          </div>
        </div>
      </div>

      {/* 3. Alerts (Will respect the parent container's max-width) */}
      {success && (
        <Alert color="success" className="mt-5 text-sm">
          {success}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5 text-sm">
          {error}
        </Alert>
      )}

      {/* 4. Delete Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center py-6">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-3 mx-auto" />
            <h3 className="mb-3 text-lg text-gray-700 dark:text-gray-300">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, delete
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashProfile;