import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import  React,{ useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../Redux/Slice/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const DashProfile=()=>{
  
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateStart());
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    const form = new FormData();

    // send only changed fields
    if (formData.username && formData.username !== currentUser.username) {
      form.append("username", formData.username);
    }

    if (formData.email && formData.email !== currentUser.email) {
      form.append("email", formData.email);
    }

    if (formData.password) {
      form.append("password", formData.password);
    }

    if (imageFile) {
      form.append("profilePicture", imageFile);
    }

    if ([...form.entries()].length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`, {
        method: "PUT",
        credentials: "include",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.msg || data.message));
        setUpdateUserError(data.msg || data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError(err.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/signout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) dispatch(signoutSuccess());
    } catch (error) {}
  };
 const homeNavigate = () => {
    navigate("/");
  };
  return (
    
 <div className="max-w-5xl w-full mx-auto mt-20 px-4 sm:px-6 lg:px-5">

      {/* HEADER */}
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

      {/* MAIN CONTAINER */}
      <div className="flex flex-col md:flex-row items-stretch bg-white/80 dark:bg-gray-800/70 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden border border-gray-200/30 dark:border-gray-700/40 w-full">

        {/* LEFT PANEL */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-500 to-pink-400 text-white">
          
          <input
            type="file"
            hidden
            accept="image/*"
            ref={filePickerRef}
            onChange={handleImageChange}
          />

          <div
            className="relative w-28 h-28 mb-5 cursor-pointer rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-105 transition-transform"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={previewUrl || currentUser.profilePicture}
              className="w-full h-full object-cover hover:scale-110 transition-transform"
              alt="Profile"
            />
            <div className="absolute bottom-0 w-full bg-black/40 py-1 text-xs text-center">
              Change Photo
            </div>
          </div>

          <h2 className="text-lg font-semibold text-center text-black dark:text-white">
            {currentUser.username}
          </h2>
          <p className="text-sm  text-center text-black dark:text-white">
            {currentUser.email}
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-2/3 flex flex-col justify-center p-8 md:p-10">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextInput
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              placeholder="Username"
            />

            <TextInput
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <TextInput
              id="password"
              type="password"
              onChange={handleChange}
              placeholder="New Password (optional)"
            />

            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-500 text-white font-semibold shadow-lg transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>

            {currentUser.isAdmin && (
              <Link to="/create-post">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-500 text-white font-semibold shadow-lg transition">
                  Create Post
                </Button>
              </Link>
            )}
          </form>

          <div className="flex justify-between mt-6 text-sm text-red-500 dark:text-white">
            <span
              onClick={() => setShowModal(true)}
              className="cursor-pointer hover:underline"
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

      {/* ALERTS */}
      {updateUserSuccess && (
        <Alert color="success" className="mt-5 text-sm">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5 text-sm">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5 text-sm">
          {error}
        </Alert>
      )}

      {/* DELETE MODAL */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center py-6">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-3 mx-auto" />
            <h3 className="mb-3 text-lg text-gray-700 dark:text-gray-300">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              <Button color="red" onClick={handleDeleteUser}>
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
}

export default  DashProfile