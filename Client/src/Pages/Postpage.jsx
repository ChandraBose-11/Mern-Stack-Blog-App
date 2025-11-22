import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CommentSection from "../Components/CommentSection.jsx";
import PostCard from "../Components/PostCard.jsx";

const Postpage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`https://mern-stack-blog-app-8.onrender.com/api/post/getposts?slug=${postSlug}`,{credentials:"include"});
        const data = await res.json();
        if (!res.ok || !data.post) throw new Error("Failed to fetch post");
        setPost(data.post);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setRecentLoading(true);
        const res = await fetch(`https://mern-stack-blog-app-8.onrender.com/api/post/getposts?limit=4`,{
          credentials:"include"
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch recent posts");
        setRecentPosts(data.posts || data.post || data || []);
      } catch (err) {
        console.error(err.message);
        setRecentPosts([]);
      } finally {
        setRecentLoading(false);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#0f172a]">
        <Spinner size="xl" />
      </div>
    );

  if (error || !post)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 bg-white dark:bg-[#0f172a]">
        Failed to load post 😢
      </div>
    );

  return (
    <main className="relative p-4 max-w-6xl mx-auto min-h-screen bg-white text-gray-800 dark:bg-[#0f172a] dark:text-gray-100 transition-colors duration-500">
      <div className="absolute top-10 -left-20 w-72 h-72 bg-pink-200 rounded-full opacity-30 animate-float-slow -z-10 dark:bg-pink-600/20"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 animate-float-slow delay-200 -z-10 dark:bg-blue-600/20"></div>

      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 dark:bg-gray-700">
        <div className="h-1 bg-purple-500 transition-all duration-200" style={{ width: `${scrollProgress}%` }} />
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-center mt-10 max-w-3xl mx-auto">
        {post.title}
      </h1>

      <div className="flex justify-center mt-4">
        <Link to={`/search?category=${post.category}`}>
          <Button size="sm" className="bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:opacity-90 transition duration-300" pill>
            {post.category}
          </Button>
        </Link>
      </div>

      {post.image && (
        <div className="mt-8 mb-8 w-full flex justify-center relative rounded-lg shadow-lg">
          <img src={post.image} alt={post.title} className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg"></div>
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-500 mt-4 max-w-3xl mx-auto p-2 border-b border-gray-300 dark:text-gray-400 dark:border-gray-700">
        <span>
          {post.createdAt &&
            new Date(post.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
        </span>
        <span>
          {post.content ? Math.max(Math.round(post.content.replace(/<[^>]+>/g, "").length / 200), 1) : 1} min read
        </span>
      </div>

      <article
        className="prose prose-lg md:prose-xl max-w-3xl mx-auto mt-6 mb-12 p-6 bg-white rounded-lg shadow-md dark:bg-[#1e293b] dark:prose-invert dark:border dark:border-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="max-w-3xl mx-auto mb-12 border-t border-gray-300 pt-6 p-6 bg-gray-100 rounded-lg shadow-sm dark:bg-[#1e293b]">
        <CommentSection postId={post._id} />
      </div>

      <section className="max-w-6xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Recent Articles</h2>
        {recentLoading ? (
          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        ) : recentPosts.length === 0 ? (
          <p className="text-gray-500 text-center dark:text-gray-400">No recent articles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((recentPost) => (
              <div key={recentPost._id} className="transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
                <PostCard post={recentPost} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Postpage;
