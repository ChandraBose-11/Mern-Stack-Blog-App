import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostCard from "../Components/PostCard";

const Category = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
 const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Convert URL dashes to spaces to match backend category
        const categoryQuery = categoryName.replace(/-/g, " ");
        const res = await fetch(`${API_URL}/api/post/getPosts?category=${categoryQuery}`,{
          credentials:"include"
        });
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [categoryName]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Category Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gradient mb-8">
        {categoryName.replace(/-/g, " ")}
      </h1>

      {/* Posts Grid Layout */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post._id} className="transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts found in this category.</p>
      )}

      {/* Back to Home Link */}
      <div className="text-center mt-8">
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition duration-300"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Category;
