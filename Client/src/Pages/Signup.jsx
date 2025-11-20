import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials:"include"
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.success === false) {
        return setErrorMessage(data.message || "Signup failed");
      }

      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-[90%] md:w-[950px] bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-fadeIn">
        
        {/* Left Side - Image & Text */}
        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

          {/* Text */}
          <div className="relative z-10 text-white text-center px-8 py-10">
            <h1 className="text-3xl font-extrabold mb-4 leading-snug">
              Start Writing Your <span className="text-pink-400">Next Chapter ✨</span>
            </h1>
            <p className="text-gray-200 text-sm leading-relaxed">
              Every great story begins with a single word.  
              Join Blogger Hunt and create your space to write, share, and connect  
              with readers who believe in the power of words.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10 bg-white dark:bg-gray-900">
          <Link
            to="/"
            className="text-3xl font-bold mb-3 text-gray-800 dark:text-white tracking-tight"
          >
            Blogger<span className="text-pink-500"> Hunt 🖋️</span>
          </Link>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm text-center">
            Sign up for free and start building your voice in the world of blogging 🌍
          </p>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" className="text-gray-700 dark:text-gray-300" />
              <TextInput
                type="text"
                id="username"
                placeholder="Choose a username"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value="Email" className="text-gray-700 dark:text-gray-300" />
              <TextInput
                type="email"
                id="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value="Password" className="text-gray-700 dark:text-gray-300" />
              <TextInput
                type="password"
                id="password"
                placeholder="********"
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="transition-transform hover:scale-[1.03] hover:shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              {loading ? (
                <>
                  <Spinner color="pink" size="sm" />
                  <span className="pl-3">Creating Account...</span>
                </>
              ) : (
                "Join Blogger Hunt"
              )}
            </Button>

            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-6 justify-center text-gray-600 dark:text-gray-300">
            <span>Already have an account?</span>
            <Link to="/signin" className="text-red-500 hover:underline">
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
