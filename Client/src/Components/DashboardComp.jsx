import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";

const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5",{credentials: "include"});
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5",{credentials: "include"});
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5",{credentials: "include"});
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-4 md:mx-auto">
      {/* === Summary Cards Section === */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
        {/* Total Users */}
        <div className="flex flex-col p-4 dark:bg-slate-800 bg-white gap-4 md:w-72 w-full rounded-md shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl font-semibold">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-md" />
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>

        {/* Total Comments */}
        <div className="flex flex-col p-4 dark:bg-slate-800 bg-white gap-4 md:w-72 w-full rounded-md shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
              <p className="text-2xl font-semibold">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-md" />
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>

        {/* Total Posts */}
        <div className="flex flex-col p-4 dark:bg-slate-800 bg-white gap-4 md:w-72 w-full rounded-md shadow-md hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl font-semibold">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-md" />
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>
      </div>

      {/* === Tables Section === */}
      <div className="flex flex-wrap gap-6 justify-center items-start py-5">
        {/* Recent Users */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-3 rounded-md dark:bg-gray-800 bg-white">
          <div className="flex justify-between items-center p-2 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline >
              <Link to="/dashboard?tab=users">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt="user"
                      className="w-10 h-10 rounded-full bg-gray-500"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Recent Comments */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-3 rounded-md dark:bg-gray-800 bg-white">
          <div className="flex justify-between items-center p-2 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline >
              <Link to="/dashboard?tab=comments">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Comment Content</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {comments.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell className="w-96 line-clamp-2">
                    {comment.content}
                  </TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Recent Posts */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-3 rounded-md dark:bg-gray-800 bg-white">
          <div className="flex justify-between items-center p-2 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline >
              <Link to="/dashboard?tab=posts">See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell>Post Image</TableHeadCell>
                <TableHeadCell>Post Title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <img
                      src={post.image}
                      alt="post"
                      className="w-14 h-10 rounded-md bg-gray-500"
                    />
                  </TableCell>
                  <TableCell className="w-96">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
