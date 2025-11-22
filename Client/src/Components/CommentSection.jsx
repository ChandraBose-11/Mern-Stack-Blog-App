// import React, { useEffect, useState } from "react";
// import Comment from "./Comment";

// const CommentSection = ({ postId, currentUser }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   // Load comments when page loads
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await fetch(
//           `https://mern-stack-blog-app-8.onrender.com/api/comment/getComments/${postId}`,
//           {
//             credentials: "include",
//           }
//         );
//         const data = await res.json();
//         if (res.ok) setComments(data);
//       } catch (error) {
//         console.error("Error loading comments:", error);
//       }
//     };
//     fetchComments();
//   }, [postId]);

//   // Create comment
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     try {
//       const res = await fetch(
//         `https://mern-stack-blog-app-8.onrender.com/api/comment/create`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({
//             content: newComment,
//             postId,
//             userId: currentUser?._id,
//           }),
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         setComments([data, ...comments]);
//         setNewComment("");
//       } else {
//         console.error("Comment creation failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Error creating comment:", error);
//     }
//   };

//   // Like, Edit, Delete handlers
//   const handleLike = async (commentId) => {
//     try {
//       const res = await fetch(
//         `https://mern-stack-blog-app-8.onrender.com/api/comment/like/${commentId}`,
//         {
//           method: "PUT",
//           credentials: "include",
//         }
//       );
//       if (res.ok) {
//         setComments((prev) =>
//           prev.map((c) =>
//             c._id === commentId
//               ? {
//                   ...c,
//                   likes: c.likes.includes(currentUser._id)
//                     ? c.likes.filter((id) => id !== currentUser._id)
//                     : [...c.likes, currentUser._id],
//                 }
//               : c
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Like error:", err);
//     }
//   };

//   const handleEdit = (comment, newContent) => {
//     setComments((prev) =>
//       prev.map((c) =>
//         c._id === comment._id ? { ...c, content: newContent } : c
//       )
//     );
//   };

//   const handleDelete = async (commentId) => {
//     try {
//       const res = await fetch(
//         `https://mern-stack-blog-app-8.onrender.com/api/comment/delete/${commentId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );
//       if (res.ok) setComments(comments.filter((c) => c._id !== commentId));
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-6">
//       <form onSubmit={handleSubmit} className="mb-4">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write a comment..."
//           className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//           rows="3"
//         />
//         <button
//           type="submit"
//           className="mt-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
//         >
//           Submit
//         </button>
//       </form>

//       {comments.length === 0 ? (
//         <p className="text-gray-500 text-sm">No comments yet!</p>
//       ) : (
//         comments.map((comment) => (
//           <Comment
//             key={comment._id}
//             comment={comment}
//             onLike={handleLike}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//             currentUser={currentUser}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default CommentSection;

import React, { useEffect, useState } from "react";
import Comment from "./Comment";

const CommentSection = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Load comments when page loads
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // ✅ FIXED: correct backend route name: getPostComments
        const res = await fetch(
          `https://mern-stack-blog-app-8.onrender.com/api/comment/getPostComments/${postId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) setComments(data);
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  // Create comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(
        `https://mern-stack-blog-app-8.onrender.com/api/comment/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            content: newComment,
            postId,
            userId: currentUser?._id,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setComments([data, ...comments]);
        setNewComment("");
      } else {
        console.error("Comment creation failed:", data.message);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Like, Edit, Delete handlers
  const handleLike = async (commentId) => {
    // ✅ Guard: avoid crashing when user is not logged in
    if (!currentUser?._id) return;

    try {
      // ✅ FIXED route: likeComment instead of like
      const res = await fetch(
        `https://mern-stack-blog-app-8.onrender.com/api/comment/likeComment/${commentId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (res.ok) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId
              ? {
                  ...c,
                  likes: c.likes.includes(currentUser._id)
                    ? c.likes.filter((id) => id !== currentUser._id)
                    : [...c.likes, currentUser._id],
                  numberOfLikes: c.likes.includes(currentUser._id)
                    ? c.numberOfLikes - 1
                    : c.numberOfLikes + 1,
                }
              : c
          )
        );
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleEdit = (comment, newContent) => {
    setComments((prev) =>
      prev.map((c) =>
        c._id === comment._id ? { ...c, content: newContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    try {
      // ✅ FIXED route: deleteComment instead of delete
      const res = await fetch(
        `https://mern-stack-blog-app-8.onrender.com/api/comment/deleteComment/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok)
        setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          rows="3"
        />
        <button
          type="submit"
          className="mt-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
        >
          Submit
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet!</p>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            onLike={handleLike}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentUser={currentUser}
          />
        ))
      )}
    </div>
  );
};

export default CommentSection;
