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

  // ================================
  // FETCH POST TO EDIT
  // ================================
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/${postId}`, {
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

  // ================================
  // UPLOAD IMAGE (Cloudinary)
  // ================================
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

  // ================================
  // SUBMIT UPDATED POST
  // ================================
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

      const res = await fetch(`/api/post/update/${postId}`, {
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

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        {/* Title + Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          
          <TextInput
            type="text"
            placeholder="Title"
            required
            className="flex-1"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select
            value={formData.category || "uncategorized"}
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

        {/* Image Upload UI */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">

          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            disabled={imageUploadProgress}
            onClick={handleUploadImage}
          >
            {imageUploadProgress ? imageUploadProgress : "Upload Image"}
          </Button>

        </div>

        {/* Errors */}
        {imageUploadError && (
          <Alert color="failure">{imageUploadError}</Alert>
        )}

        {/* Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="post"
            className="w-full h-72 object-cover"
          />
        )}

        {/* Content Editor */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          value={formData.content || ""}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        {/* Submit */}
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
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
