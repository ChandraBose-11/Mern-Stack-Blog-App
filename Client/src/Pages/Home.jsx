import React from "react";
import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import { Link } from "react-router-dom";

const categories = [
  { name: "Technology", icon: "💻", color: "bg-indigo-500", link: "/search?category=technology" },
  { name: "Lifestyle", icon: "❤️", color: "bg-pink-500", link: "/search?category=lifestyle" },
  { name: "Business", icon: "💰", color: "bg-amber-500", link: "/search?category=business" },
  { name: "Education", icon: "📚", color: "bg-blue-500", link: "/search?category=education" },
  { name: "Entertainment", icon: "🎬", color: "bg-fuchsia-500", link: "/search?category=entertainment" },
  { name: "News", icon: "📰", color: "bg-red-500", link: "/search?category=news" },
];

const feature = [
  { title: "🔥 Trending Topics", text: "Stay ahead with real-time trends and expert insights.", color: "from-purple-500 to-indigo-600" },
  { title: "🌍 Global Community", text: "Join a diverse audience of creators worldwide.", color: "from-pink-500 to-rose-600" },
  { title: "🚀 Smooth Experience", text: "Clean design, fast performance, immersive feel.", color: "from-blue-500 to-sky-600" },
];

const Home = () => {
  const [posts, setPosts] = useState([]);
 const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${API_URL}/api/post/getPosts?startIndex=0&limit=8`,{credentials:"include"});
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const ShineAnimation = () => (
    <>
      <div className="animate-float absolute top-[-10%] left-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-30 blur-3xl z-0" />
      <div className="animate-float-reverse absolute bottom-[-10%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400 to-pink-300 opacity-30 blur-3xl z-0" />
    </>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] transition-colors duration-500 overflow-hidden">

        {/* ---------------- HERO ---------------- */}
        <section className="relative flex flex-col justify-center items-center text-center min-h-[85vh] h-full pt-28 pb-16 sm:h-[90vh] px-6 sm:px-10 md:px-16 overflow-hidden">
          <ShineAnimation />
          <div className="relative z-10 max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-serif mb-8 text-gray-900 dark:text-white">
              Dive Into the World of
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-textShine block">
                  Blogger Hunt
                </span>
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-12 max-w-2xl mx-auto">
              Discover engaging stories, ideas, and trends shaping today’s digital world.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/search" className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 duration-300">Explore Posts</a>
              <a href="/about" className="px-8 py-3 rounded-full border-2 border-pink-600 dark:border-purple-500 text-pink-600 dark:text-purple-400 font-semibold hover:bg-gradient-to-r hover:border-transparent from-purple-500 to-pink-600 hover:text-white duration-300">Learn More</a>
            </div>
          </div>
        </section>

        {/* ---------------- CATEGORY ---------------- */}
        <section className="max-w-7xl mx-auto py-15 px-6 sm:px-10 md:px-16">
          <h2 className="text-3xl font-extrabold font-serif text-center mb-12 text-gray-900 dark:text-white">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {categories.map((cat) => (
              <a key={cat.name} href={cat.link} className={`flex flex-col items-center justify-center p-6 rounded-2xl text-white font-semibold shadow-xl hover:scale-105 duration-300 ${cat.color}`}>
                <div className="text-4xl mb-2">{cat.icon}</div>
                <span className="text-sm">{cat.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ---------------- FEATURES ---------------- */}
        <section className="bg-white dark:bg-[#0f172a] py-10 px-6 sm:px-10 md:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold font-serif mb-8 text-gray-900 dark:text-white">Why Readers Love Blogger Hunt</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-14 max-w-3xl mx-auto text-base">
              We combine creativity, quality, and technology to deliver stories that move people.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {feature.map((feature, i) => (
                <div key={i} className={`p-10 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-xl hover:scale-[1.03] duration-300`}>
                  <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- RECENT POSTS ---------------- */}
        <section className="max-w-7xl mx-auto py-10 px-6 sm:px-10 md:px-16">
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-8 text-center">
              <h2 className="text-3xl font-extrabold font-serif text-gray-900 dark:text-white">Recent Posts</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {posts.map((post) => <PostCard key={post._id} post={post} />)}
              </div>

              <Link to={"/search"} className="text-lg text-teal-500 hover:underline">
                View all posts
              </Link>
            </div>
          )}
        </section>

      </div>
    </>
  );
};

export default Home;
