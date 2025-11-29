import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
   
   <div
      className="
        rounded-3xl overflow-hidden 
        bg-white dark:bg-slate-900
        shadow-lg hover:shadow-2xl
        hover:-translate-y-1 transition-all duration-500
        flex flex-col text-center
      "
    >
      {/* IMAGE */}
      <Link to={`/post/${post.slug}`}>
        <div className="w-full h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="
              w-full h-full object-cover
              transition-transform duration-700
              hover:scale-110
            "
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow justify-between">

        {/* Category */}
        <span
          className="
            inline-block self-center mb-3 px-4 py-1 text-xs font-medium
            rounded-full
            bg-gradient-to-r from-purple-500 to-pink-500 text-white
          "
        >
          {post.category || "Uncategorized"}
        </span>

        {/* Title */}
        <h2
          className="
            text-xl font-semibold 
            text-gray-800 dark:text-gray-200 
            line-clamp-2 mb-4
          "
        >
          {post.title}
        </h2>

        {/* Read More */}
        <Link
          to={`/post/${post.slug}`}
          className="
            text-purple-600 dark:text-purple-400 
            hover:text-pink-500 dark:hover:text-pink-400
            text-lg font-medium transition
          "
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
