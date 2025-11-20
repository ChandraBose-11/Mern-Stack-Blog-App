import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Project from "./Pages/Project";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Header from "./Components/Header";
import FooterComp from "./Components/FooterComp";
import PrivateRoute from "./Components/PrivateRoute";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";
import Postpage from "./Pages/Postpage";
import ScrollToTop from "./Components/ScrollToTop";
import Search from "./Pages/Search";
import Category from "./Pages/Category";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ScrollToTop/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/post/:postSlug" element={<Postpage/>}/>
             <Route path='/search' element={<Search/>} />
          {/* Protected Route for logged-in users */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* Protected Route for Admin users */}
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          {/* Catch-all 404 route */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-3xl">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </div>
  );
};

export default App;
