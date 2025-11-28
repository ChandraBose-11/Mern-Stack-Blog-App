import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";

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

export default function Home() {
  const [posts, setPosts] = useState([]);

  // 🌟 Original Functionality (Unchanged)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/post/getPosts`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const ShineAnimation = () => (
    <>
      <div className="animate-float absolute top-[-10%] left-[20%] w-40 h-40 rounded-full bg-purple-400 opacity-20 blur-3xl" />
      <div className="animate-float-reverse absolute bottom-[-15%] right-[10%] w-56 h-56 rounded-full bg-blue-400 opacity-20 blur-[80px]" />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] transition-colors duration-500 overflow-hidden relative">

      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-500/5 pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col justify-center items-center text-center min-h-[85vh] pt-28 pb-16 px-6">
        <ShineAnimation />

        <div className="relative z-10 max-w-4xl animate-fadeInSlow">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-serif mb-6 text-gray-900 dark:text-white drop-shadow-sm">
            Dive Into the World of
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-textShine">
              Blogger Hunt
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            A creative space where stories come alive, ideas connect, and creators share their voices with the world.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/search"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Explore Posts
            </Link>

            <Link
              to="/about"
              className="px-8 py-3 rounded-full border-2 border-pink-600 dark:border-purple-500 text-pink-600 dark:text-purple-400 font-semibold hover:bg-gradient-to-r hover:border-transparent from-purple-500 to-pink-600 hover:text-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full border-t border-gray-300 dark:border-gray-700 opacity-40"></div>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-900 dark:text-white animate-slideUp">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl hover:scale-110 duration-300 hover:shadow-2xl transform transition ${cat.color}`}
            >
              <div className="text-5xl mb-2 group-hover:rotate-12 transition-transform">{cat.icon}</div>
              <span className="text-md font-semibold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full border-t border-gray-300 dark:border-gray-700 opacity-40"></div>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 bg-white dark:bg-transparent bg-opacity-70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 animate-slideUp">
            Why Readers Love Blogger Hunt
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-14 max-w-3xl mx-auto text-lg">
            Designed for creators. Built for readers. Loved by everyone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {feature.map((f, i) => (
              <div
                key={i}
                className={`p-10 rounded-2xl bg-gradient-to-br ${f.color} shadow-xl hover:shadow-2xl hover:scale-[1.04] duration-300 text-white`}
              >
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT POSTS SECTION */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        {posts?.length > 0 && (
          <div className="flex flex-col gap-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white animate-slideUp">
              Recent Posts
            </h2>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 animate-fadeIn">
              {posts.map((post) => (
                <div key={post._id} className="hover:scale-[1.02] duration-300">
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            <Link to="/search" className="text-lg text-teal-500 hover:underline">
              View all posts
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
