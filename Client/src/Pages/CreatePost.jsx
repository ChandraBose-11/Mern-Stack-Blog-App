import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  // Upload only image file
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress("Uploading...");

      const form = new FormData();
      form.append("image", file);

      const res = await fetch(
        `https://mern-stack-blog-app-render.onrender.com/api/post/create-image`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setImageUploadError(data.msg || "Upload failed");
        setImageUploadProgress(null);
        return;
      }

      setFormData({ ...formData, image: data.imageUrl });
      setImageUploadProgress(null);
    } catch (err) {
      console.log(err);
      setImageUploadError("Upload failed");
      setImageUploadProgress(null);
    }
  };

  // Submit entire post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setPublishError("Title and content are required");
      return;
    }

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append("category", formData.category || "uncategorized");

      if (formData.image) form.append("image", formData.image);

      const res = await fetch(
        `https://mern-stack-blog-app-render.onrender.com/api/post/create`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Failed to publish");
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
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

      {/* Form Container */}
      <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Title */}
          <TextInput
            type="text"
            placeholder="Enter post title"
            className="text-lg dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* Category */}
          <Select
            className="text-lg dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">🗂️ Select A Category</option>
            <option value="technology">💻 Technology</option>
            <option value="lifestyle">🌿 Lifestyle</option>
            <option value="business">💼 Business & Finance</option>
            <option value="education">📚 Education</option>
            <option value="entertainment">🎬 Entertainment</option>
            <option value="news">📰 News</option>
          </Select>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-purple-400 dark:border-purple-600 rounded-xl p-6 text-center cursor-pointer hover:border-purple-600 hover:bg-purple-50/40 dark:hover:bg-gray-800/50 transition">
            <p className="text-gray-500 dark:text-gray-300 mb-2">
              Click to upload featured image
            </p>

            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="dark:text-gray-100 mx-auto"
            />

            <Button
              type="button"
              className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-[1.03]"
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? imageUploadProgress : "Upload Image"}
            </Button>

            {/* Upload error */}
            {imageUploadError && (
              <Alert color="failure" className="mt-3">
                {imageUploadError}
              </Alert>
            )}
          </div>

          {/* Show Uploaded Image */}
          {formData.image && (
            <img
              src={formData.image}
              alt="uploaded"
              className="w-full h-72 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            />
          )}

          {/* Content Editor */}
          <div className="dark:text-white">
            <ReactQuill
              theme="snow"
              placeholder="Write something inspiring..."
              className="h-72 mb-12 rounded-xl"
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

          {/* Publish Error */}
          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
