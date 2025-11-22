import { Button, FileInput, Select, Alert, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const CATEGORY_OPTIONS = [
  { value: "Uncategoried", label: "Uncategoried" },
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "business", label: "Business & Finance" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "news", label: "News" },
];

const UpdatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [noChangeWarning, setNoChangeWarning] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/post/${postId}`);
        const post = res.data?.post || res.data;

        if (!post) {
          setPublishError("Failed to fetch post data");
          return;
        }

        const matchedCategory =
          CATEGORY_OPTIONS.find(
            (opt) =>
              opt.value.toLowerCase() === (post.category || "").toLowerCase()
          )?.value || "Uncategoried";

        const normalized = {
          title: post.title || "",
          content: post.content || "",
          category: matchedCategory,
          image: post.image || null,
        };

        setFormData(normalized);
        setOriginalData(normalized);
        if (post.image) setFile(post.image);
      } catch (err) {
        setPublishError("Failed to fetch post data");
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;

    setPublishError(null);
    setSuccessMessage(null);
    setNoChangeWarning(null);

    const isSameTitle = formData.title === originalData.title;
    const isSameContent = formData.content === originalData.content;
    const isSameCategory = formData.category === originalData.category;
    const isSameImage =
      file instanceof File ? false : file === originalData.image;

    if (isSameTitle && isSameContent && isSameCategory && isSameImage) {
      setNoChangeWarning(
        "⚠️ No changes detected. Please edit something before saving."
      );
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", formData.category);
      if (file && file instanceof File) data.append("image", file);

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `${API_URL}/api/post/update/${postId}`);
      xhr.withCredentials = true;
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable)
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
      };

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status !== 200) {
          setPublishError(res.message);
        } else {
          setSuccessMessage("✅ Post updated successfully!");
          setTimeout(() => navigate(`/post/${res.slug}`), 1500);
        }
        setUploadProgress(null);
      };

      xhr.onerror = () => {
        setPublishError("Something went wrong");
        setUploadProgress(null);
      };

      xhr.send(data);
    } catch (err) {
      setPublishError("Something went wrong");
      setUploadProgress(null);
    }
  };

  if (!formData)
    return <div className="p-6 text-center text-gray-500">Loading post...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-10 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 flex flex-col justify-between border border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              ✍️ Update Your Post
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Give your blog a fresh update — refine your content and make it
              shine.
            </p>

            <TextInput
              type="text"
              placeholder="Enter post title"
              value={formData.title}
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mb-4"
            />

            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="mb-4"
            >
              <option value="" disabled>
                Select Category
              </option>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>

            <div className="border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-4">
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0])
                    setFile(e.target.files[0]);
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Upload or replace the featured image
              </p>
            </div>

            {uploadProgress !== null && (
              <div className="mt-4 w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress}%`}
                />
              </div>
            )}
          </div>

          {file && (
            <img
              src={file instanceof File ? URL.createObjectURL(file) : file}
              alt="Preview"
              className="mt-6 rounded-xl shadow-lg object-cover h-56 w-full"
            />
          )}

          <Button
            onClick={() => navigate(-1)}
            outline
            color="gray"
            className="mt-6 hover:scale-105 transition-all"
          >
            ← Back to Posts
          </Button>
        </div>

        {/* Right Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              ✨ Content Editor
            </h2>

            <div className="flex-grow border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-6">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
                className="h-72"
                placeholder="Start improving your content..."
                required
              />
            </div>

            <Button
              type="submit"
              disabled={uploadProgress !== null}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all py-2 text-lg font-semibold rounded-lg shadow-md"
            >
              💾 Save Changes
            </Button>

            {publishError && (
              <Alert className="mt-5" color="failure">
                {publishError}
              </Alert>
            )}
            {successMessage && (
              <Alert className="mt-5" color="success">
                {successMessage}
              </Alert>
            )}
            {noChangeWarning && (
              <Alert className="mt-5" color="warning">
                {noChangeWarning}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
