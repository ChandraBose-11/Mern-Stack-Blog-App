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

      const res = await fetch(`/api/post/create-image`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

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

      const res = await fetch(`/api/post/create`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

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
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title + Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select
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
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? imageUploadProgress : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        {/* Content */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        <Button type="submit" >
          Publish
        </Button>

        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
