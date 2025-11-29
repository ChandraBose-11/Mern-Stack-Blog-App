import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

export default function SignUp() {
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
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(
        `https://mern-stack-blog-app-server.onrender.com/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    // <div className='min-h-screen mt-20'>
    //   <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
    //     {/* left */}
    //     <div className='flex-1'>
    //       <Link to='/' className='font-bold dark:text-white text-4xl'>
    //         <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
    //         Blogger
    //         </span>
    //         Hunt
    //       </Link>
    //       <p className='text-sm mt-5'>
    //         This is a demo project. You can sign up with your email and password
    //         or with Google.
    //       </p>
    //     </div>
    //     {/* right */}

    //     <div className='flex-1'>
    //       <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
    //         <div>
    //           <Label value='Your username' />
    //           <TextInput
    //             type='text'
    //             placeholder='Username'
    //             id='username'
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div>
    //           <Label value='Your email' />
    //           <TextInput
    //             type='email'
    //             placeholder='name@company.com'
    //             id='email'
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div>
    //           <Label value='Your password' />
    //           <TextInput
    //             type='password'
    //             placeholder='Password'
    //             id='password'
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <Button

    //           type='submit'
    //           disabled={loading}
    //         >
    //           {loading ? (
    //             <>
    //               <Spinner size='sm' />
    //               <span className='pl-3'>Loading...</span>
    //             </>
    //           ) : (
    //             'Sign Up'
    //           )}
    //         </Button>
    //         <OAuth />
    //       </form>
    //       <div className='flex gap-2 text-sm mt-5'>
    //         <span>Have an account?</span>
    //         <Link to='/signin' className='text-blue-500'>
    //           Sign In
    //         </Link>
    //       </div>
    //       {errorMessage && (
    //         <Alert className='mt-5' color='failure'>
    //           {errorMessage}
    //         </Alert>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      {/* Main Signup Container */}
      <div className="flex flex-col md:flex-row w-[90%] md:w-[950px] bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-fadeIn">
        {/* LEFT SIDE IMAGE + TEXT */}
        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

          <div className="relative z-10 text-white text-center px-8 py-10">
            <h1 className="text-3xl font-extrabold mb-4 leading-snug">
              Start Writing Your{" "}
              <span className="text-pink-400">Next Chapter ✨</span>
            </h1>
            <p className="text-gray-200 text-sm leading-relaxed">
              Every great story begins with a single word. Join Blogger Hunt and
              create your space to write, share, and connect with readers who
              believe in the power of words.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10 bg-white dark:bg-gray-900">
          <Link
            to="/"
            className="text-3xl font-bold mb-3 text-gray-800 dark:text-white tracking-tight"
          >
            Blogger<span className="text-pink-500"> Hunt 🖋️</span>
          </Link>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm text-center">
            Sign up for free and start building your voice in the world of
            blogging 🌍
          </p>

          {/* SIGNUP FORM (functionality unchanged) */}
          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div>
              <Label
                value="Username"
                className="text-gray-700 dark:text-gray-300"
              />
              <TextInput
                type="text"
                id="username"
                placeholder="Choose a username"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label
                value="Email"
                className="text-gray-700 dark:text-gray-300"
              />
              <TextInput
                type="email"
                id="email"
                placeholder="you@example.com"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label
                value="Password"
                className="text-gray-700 dark:text-gray-300"
              />
              <TextInput
                type="password"
                id="password"
                placeholder="********"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
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

            {/* Google Auth */}
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
}
