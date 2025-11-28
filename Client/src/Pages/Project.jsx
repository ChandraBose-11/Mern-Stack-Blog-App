import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import { Spinner } from "flowbite-react";

const Project = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/post/getposts`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch posts");
        setPosts(data.posts || data.post || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#0f172a]">
        <Spinner size="xl" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 bg-white dark:bg-[#0f172a]">
        Failed to load posts 😢
      </div>
    );

  return (
    <main
      className="
        relative min-h-screen px-6 py-16 overflow-hidden
        bg-white text-gray-800
        dark:bg-[#0f172a] dark:text-gray-100
        transition-colors duration-500 
      "
    >
      {/* Floating background blobs */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-3xl animate-float-slow -z-10"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/20 rounded-full blur-3xl animate-float-slow delay-200 -z-10"></div>

      {/* Title Section */}
      <div className="text-center mb-14 animate-fade-in">
        <h1
          className="
            text-4xl md:text-5xl font-extrabold font-serif mb-4
            text-gray-800 dark:text-white
          "
        >
          Our Latest Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore a collection of our most recent articles, stories, and
          innovations — crafted with passion and creativity.
        </p>
      </div>

      {/* Post Grid */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No projects available.
        </p>
      ) : (
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-8 max-w-7xl mx-auto animate-fade-in delay-300
          "
        >
          {posts.map((post) => (
            <div
              key={post._id}
              className="
                transform transition-all duration-300
                hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1
              "
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {/* Decorative Divider */}
      <div className="mt-16 flex justify-center">
        <div
          className="
            h-1 w-32 rounded-full animate-pulse
            bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
          "
        ></div>
      </div>
    </main>
  );
};

export default Project;
