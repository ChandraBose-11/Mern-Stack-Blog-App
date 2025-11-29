import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  // console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `https://mern-stack-blog-app-server.onrender.com/api/post/getposts?${searchQuery}`,
        {
          method: "GET",
          credentials: "include", // 🔥 ADDED
        }
      );
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(
      `https://mern-stack-blog-app-server.onrender.com/api/post/getposts?${searchQuery}`,
      {
        method: "GET",
        credentials: "include", // 🔥 ADDED
      }
    );
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    // <div className="flex flex-col md:flex-row">
    //   <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
    //     <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
    //       <div className="flex   items-center gap-2">
    //         <label className="whitespace-nowrap font-semibold">
    //           Search Term:
    //         </label>
    //         <TextInput
    //           placeholder="Search..."
    //           id="searchTerm"
    //           type="text"
    //           value={sidebarData.searchTerm}
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <label className="font-semibold">Sort:</label>
    //         <Select onChange={handleChange} value={sidebarData.sort} id="sort">
    //           <option value="desc">Latest</option>
    //           <option value="asc">Oldest</option>
    //         </Select>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <label className="font-semibold">Category:</label>
    //         <Select
    //           onChange={handleChange}
    //           value={sidebarData.category}
    //           id="category"
    //         >
    //           <option value="uncategorized">🗂️ Select A Category</option>
    //           <option value="technology">💻 Technology</option>
    //           <option value="lifestyle">🌿 Lifestyle</option>
    //           <option value="business">💼 Business & Finance</option>
    //           <option value="education">📚 Education</option>
    //           <option value="entertainment">🎬 Entertainment</option>
    //           <option value="news">📰 News</option>
    //         </Select>
    //       </div>
    //       <Button type="submit" outline>
    //         Apply Filters
    //       </Button>
    //     </form>
    //   </div>
    //   <div className="w-full">
    //     <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
    //       Posts results:
    //     </h1>
    //     <div className="p-7 flex flex-wrap gap-4">
    //       {!loading && posts.length === 0 && (
    //         <p className="text-xl text-gray-500">No posts found.</p>
    //       )}
    //       {loading && <p className="text-xl text-gray-500">Loading...</p>}
    //       {!loading &&
    //         posts &&
    //         posts.map((post) => <PostCard key={post._id} post={post} />)}
    //       {showMore && (
    //         <button
    //           onClick={handleShowMore}
    //           className="text-teal-500 text-lg hover:underline p-7 w-full"
    //         >
    //           Show More
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  <div className="min-h-screen w-full flex bg-gray-50 dark:bg-slate-900">

    {/* LEFT SIDEBAR */}
    <div className="w-full md:w-72 bg-white dark:bg-slate-800 
                    shadow-lg border-r dark:border-slate-700 p-6">

      <h2 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
        Filters
      </h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        
        {/* Search Term */}
        <div>
          <label className="font-medium text-gray-600 dark:text-gray-300">
            Search
          </label>
          <TextInput
            placeholder="Search posts..."
            id="searchTerm"
            type="text"
            className="mt-1"
            value={sidebarData.searchTerm}
            onChange={handleChange}
          />
        </div>

        {/* Sort */}
        <div>
          <label className="font-medium text-gray-600 dark:text-gray-300">
            Sort By
          </label>
          <Select
            onChange={handleChange}
            value={sidebarData.sort}
            id="sort"
            className="mt-1"
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </Select>
        </div>

        {/* Category */}
        <div>
          <label className="font-medium text-gray-600 dark:text-gray-300">
            Category
          </label>
          <Select
            onChange={handleChange}
            value={sidebarData.category}
            id="category"
            className="mt-1"
          >
            <option value="uncategorized">🗂️ Select a Category</option>
            <option value="technology">💻 Technology</option>
            <option value="lifestyle">🌿 Lifestyle</option>
            <option value="business">💼 Business</option>
            <option value="education">📚 Education</option>
            <option value="entertainment">🎬 Entertainment</option>
            <option value="news">📰 News</option>
          </Select>
        </div>

        <Button gradientMonochrome="purple" type="submit" className="mt-2">
          Apply Filters
        </Button>
      </form>
    </div>

    {/* RIGHT CONTENT */}
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Results
      </h1>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && posts.length === 0 && (
          <p className="text-lg text-gray-500 col-span-full text-center">
            No posts found.
          </p>
        )}

        {loading && (
          <p className="text-lg text-gray-500 col-span-full text-center">
            Loading...
          </p>
        )}

        {!loading &&
          posts &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>

      {showMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 rounded-xl text-purple-600 
                       dark:text-purple-400 border hover:bg-purple-50 
                       dark:hover:bg-slate-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  </div>


  );
}
