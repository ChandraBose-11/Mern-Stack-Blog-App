import React, { useEffect, useState } from "react";
import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import {
  HiArrowSmRight,
  HiAnnotation,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
  HiChartPie,
} from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../Redux/Slice/userSlice";

const DashSidebar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
   const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/signout`, {
        method: "POST",credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        Navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Sidebar className="w-full md:w-56">
        {/* <SidebarItem> */}
        <SidebarItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <SidebarItem
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </SidebarItem>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <SidebarItem
                active={tab === "post"}
                icon={HiDocumentText}
                as="div"
              >
                Post
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <SidebarItem
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </SidebarItem>
              </Link>
              <Link to="/dashboard?tab=comments">
                <SidebarItem
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Comments
                </SidebarItem>
              </Link>
            </>
          )}
          <SidebarItem
            active
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
        {/* </SidebarItem> */}
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
