import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});

  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);


  //  POST TO EDIT

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://mern-stack-blog-app-render.onrender.com/api/post/${postId}`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

        setFormData(data);
        setPublishError(null);
      } catch (error) {
        console.log(error);
        setPublishError("Failed to fetch post");
      }
    };

    fetchPost();
  }, [postId]);


  // UPLOAD IMAGE (Cloudinary)
  
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

      const res = await fetch(`https://mern-stack-blog-app-render.onrender.com/api/post/create-image`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setImageUploadError(data.msg || "Image upload failed");
        setImageUploadProgress(null);
        return;
      }

      // Save Cloudinary URL
      setFormData({ ...formData, image: data.imageUrl });

      setImageUploadProgress(null);
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };


  // SUBMIT UPDATED POST
 
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

      // If image updated or exists → send URL
      if (formData.image) {
        form.append("image", formData.image);
      }

      const res = await fetch(`https://mern-stack-blog-app-render.onrender.com/api/post/update/${postId}`, {
        method: "PUT",
        credentials: "include",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Failed to update post");
        return;
      }

      setPublishError(null);

      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  // CATEGORY Options
  const CATEGORY_OPTIONS = [
    { value: "technology", label: "💻 Technology" },
    { value: "lifestyle", label: "🌿 Lifestyle" },
    { value: "business", label: "💼 Business & Finance" },
    { value: "education", label: "📚 Education" },
    { value: "entertainment", label: "🎬 Entertainment" },
    { value: "news", label: "📰 News" },
    { value: "uncategorized", label: "🗂️ Uncategorized" },
  ];
  return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-10 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SECTION */}
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 flex flex-col justify-between border border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              ✍️ Update Your Post
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Give your blog a fresh update — refine your content and make it shine.
            </p>

            {/* TITLE */}
            <TextInput
              type="text"
              placeholder="Enter post title"
              value={formData.title || ""}
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mb-4"
            />

            {/* CATEGORY */}
            <Select
              value={formData.category || "uncategorized"}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="mb-4"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>

            {/* IMAGE UPLOAD */}
            <div className="border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-4">
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Upload or replace the featured image
              </p>
            </div>

            {/* Upload Progress */}
            {imageUploadProgress !== null && (
              <div className="mt-4 w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={
                    typeof imageUploadProgress === "number"
                      ? `${imageUploadProgress}%`
                      : imageUploadProgress
                  }
                />
              </div>
            )}
          </div>

          {/* Preview Image */}
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-6 rounded-xl shadow-lg object-cover h-56 w-full"
            />
          )}

          {/* Upload Button */}
          <Button
            onClick={handleUploadImage}
            outline
            color="purple"
            disabled={imageUploadProgress}
            className="mt-6 hover:scale-105 transition-all"
          >
            Upload Image
          </Button>

          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            outline
            color="gray"
            className="mt-4 hover:scale-105 transition-all"
          >
            ← Back to Posts
          </Button>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              ✨ Content Editor
            </h2>

            {/* CONTENT EDITOR */}
            <div className="flex-grow border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-6">
              <ReactQuill
                theme="snow"
                value={formData.content || ""}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
                className="h-72"
                placeholder="Start improving your content..."
                required
              />
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={imageUploadProgress !== null}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all py-2 text-lg font-semibold rounded-lg shadow-md"
            >
              💾 Save Changes
            </Button>

            {/* ERRORS */}
            {publishError && (
              <Alert className="mt-5" color="failure">
                {publishError}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
