import { Button, FileInput, Select, Alert, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

const CreatePost = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
 const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Uncategoried",
  });

  // ✅ Load saved draft
  useEffect(() => {
    const savedDraft = localStorage.getItem("draftPost");
    if (savedDraft) setFormData(JSON.parse(savedDraft));
  }, []);

  // ✅ Auto-save draft
  useEffect(() => {
    localStorage.setItem("draftPost", JSON.stringify(formData));
  }, [formData]);

  // ✅ Submit with progress
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);
    setSuccessMessage(null);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("summary", formData.summary);
      data.append("content", formData.content);
      data.append("category", formData.category);
      if (file) data.append("image", file);

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `${API_URL}/api/post/create`
      );
      xhr.withCredentials = true;
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status !== 201) {
          setPublishError(res.message);
        } else {
          setSuccessMessage(" 🎉 Post created successfully!");
          localStorage.removeItem("draftPost");
          setTimeout(() => navigate(`/post/${res.slug}`), 1500);
        }
        setUploadProgress(null);
      };

      xhr.onerror = () => {
        setPublishError("Something went wrong");
        setUploadProgress(null);
      };

      xhr.send(data);
    } catch {
      setPublishError("Something went wrong");
      setUploadProgress(null);
    }
  };

  // ✅ Drag & drop image
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            ✨ Create New Blog Post
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Write and publish your latest article
          </p>
        </div>
        <Button
          onClick={() => navigate(-1)}
          outline
          color="gray"
          className="hover:scale-105 transition-transform mt-4 md:mt-0"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Title */}
          <TextInput
            type="text"
            placeholder="Enter post title"
            value={formData.title}
            required
            className="text-lg dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* Summary */}
          <TextInput
            type="text"
            placeholder="Short summary (optional)"
            value={formData.summary}
            className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />

          {/* Category */}
          <Select
            className="text-lg dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="Uncategoried">🗂️ Select A Category</option>
            <option value="technology">💻 Technology</option>
            <option value="lifestyle">🌿 Lifestyle</option>
            <option value="business">💼 Business & Finance</option>
            <option value="education">📚 Education</option>
            <option value="entertainment">🎬 Entertainment</option>
            <option value="news">📰 News</option>
          </Select>

          {/* Image Upload */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-purple-400 dark:border-purple-600 rounded-xl p-6 text-center cursor-pointer hover:border-purple-600 hover:bg-purple-50/40 dark:hover:bg-gray-800/50 transition"
          >
            <p className="text-gray-500 dark:text-gray-300 mb-2">
              Drag & drop image here, or click to upload
            </p>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="dark:text-gray-100"
            />
            {uploadProgress !== null && (
              <div className="mx-auto mt-4 w-16 h-16">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${uploadProgress}%`}
                />
              </div>
            )}
          </div>

          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-72 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            />
          )}

          {/* Post Content */}
          <div className="dark:text-white">
            <ReactQuill
              theme="snow"
              placeholder="Write something inspiring..."
              className="h-72 mb-12 rounded-xl quill-dark-mode"
              value={formData.content}
              required
              onChange={(value) => setFormData({ ...formData, content: value })}
            />
          </div>

          {/* Publish Button */}
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg py-2 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Publish Post
          </Button>

          {/* Alerts */}
          {publishError && (
            <Alert color="failure" onDismiss={() => setPublishError(null)}>
              {publishError}
            </Alert>
          )}
          {successMessage && (
            <Alert color="success" onDismiss={() => setSuccessMessage(null)}>
              {successMessage}
            </Alert>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
