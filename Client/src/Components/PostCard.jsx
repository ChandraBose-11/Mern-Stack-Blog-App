import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div
      className="
        relative group rounded-2xl overflow-hidden
         dark:  border-3 border-white
        bg-white dark:bg-slate-900
        shadow-md hover:shadow-2xl
        transition-all duration-500
        hover:scale-[1.03]
        w-full h-[420px]  /* consistent size */
        flex flex-col
      "
    >
      {/* Image Section */}
      <Link to={`/post/${post.slug}`}>
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="
              w-full h-full object-cover
              transition-transform duration-700 group-hover:scale-110
            "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-grow p-5 text-center">
        <div>
          <span
            className="
              inline-block px-3 py-1 text-xs font-medium
              bg-gradient-to-r from-purple-400 to-pink-400 text-white
              rounded-full mb-3 
            "
          >
            {post.category || "Uncategorized"}
          </span>

          <h2
            className="
              text-lg font-semibold text-gray-800 dark:text-gray-100
              line-clamp-2
            "
          >
            {post.title}
          </h2>
        </div>

        <Link
          to={`/post/${post.slug}`}
          className="
            mt-5 text-sm font-medium
            text-purple-600 hover:text-pink-500
            dark:text-purple-400 dark:hover:text-pink-400
            transition-colors duration-300
          "
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
