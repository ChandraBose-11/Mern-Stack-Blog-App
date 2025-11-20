import React from "react";

// --- INLINE SVG ICON REPLACEMENTS ---

// GitHub Icon (BsGithub equivalent)
const GithubIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 496 512" 
    fill="currentColor" 
    className={props.className || "w-5 h-5"}
  >
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2.2-1.6 3.5-3.6 4.2-2.2.8-4.7-.4-5.4-2.5-.2-.9-.1-2.1.2-3.4.1-.7.4-2.4 1.4-4 1.4-2.2 4.4-1.5 5.5.6.7 1.1 1.4 2.5 1.4 4.5zm-30.8 7.3c-2.3 2-2.3 4.2-1.9 6.2.3 1.9.9 3.3 2.5 5.1 1.5 1.7 4.1 2.3 6 1.8 2.1-.5 3.3-2.5 3.1-4.5-.2-2-.5-4.2-2.2-5.6-1.5-1.4-4.2-1.7-6.2-.2zm-2.8 19.3c-3.1 1.4-4.9 2-6.5 2.1-1.6.2-3-.7-3.6-1.8-.8-1.5-1.4-3.5-.8-5.7.5-1.9 2.5-3 4.8-3.4 2.3-.6 5 .2 6.5 1.9 1.4 1.7 1.8 4.2 1.3 6.9zm-13.6-12.8c-1.3 1.5-3.3 1.9-5.1 1.4-1.7-.5-3.1-2.1-3.6-3.7-.6-1.6-.1-3.4 1.4-4.8 1.6-1.3 3.5-1.7 5.2-1.1 1.6.5 3.2 2 3.6 3.6.4 1.4 0 3.1-1.3 4.5zM361 58.7c15 15 15 41.3 0 56.4s-41.3 15-56.4 0c-15-15-15-41.3 0-56.4 15.1-15 41.3-15 56.4 0zM34.5 120.7c-5.7 16.1-5.1 33.6 1.4 49.6 16.3 38.3 42 70.4 75.4 97.4 19.4 16.5 39.8 29.3 58.6 36.3 17 6.4 35.6 9.6 54.4 9.6 18.8 0 37.4-3.2 54.4-9.6 18.8-7 39.2-19.8 58.6-36.3 33.4-27 59.1-59.1 75.4-97.4 6.5-16 7-33.5 1.4-49.6-1.2-3.4-3.7-6.5-7.3-9.5-2.7-2.7-5.8-4.3-9-5.5-3.2-1.2-6.6-1.8-9.9-1.8-7.3 0-14.7 3.3-19.8 9.5-2.9 3.5-5.3 7.1-7 10.9-1.3 2.9-2 5.8-2 8.7 0 2.9.7 5.8 2 8.7 1.7 3.8 4.1 7.4 7 10.9 5.1 6.2 12.5 9.5 19.8 9.5 3.3 0 6.7-.6 9.9-1.8 3.2-1.2 6.3-2.8 9-5.5 3.6-3 6.1-6.1 7.3-9.5 5.7-16.1 5.1-33.6-1.4-49.6-16.3-38.3-42-70.4-75.4-97.4-19.4-16.5-39.8-29.3-58.6-36.3-17-6.4-35.6-9.6-54.4-9.6s-37.4 3.2-54.4 9.6c-18.8 7-39.2 19.8-58.6 36.3-33.4 27-59.1 59.1-75.4 97.4-6.5 16.1-7 33.6-1.4 49.6z"/>
  </svg>
);

// LinkedIn Icon (BsLinkedin equivalent)
const LinkedinIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512" 
    fill="currentColor" 
    className={props.className || "w-5 h-5"}
  >
    <path d="M416 32H32C14.3 32 0 46.3 0 64v384c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32zm-128 320h-72V208h72v144zM192 208h-72v144h72V208zm-36-72a36 36 0 1 0 0 72 36 36 0 1 0 0-72z"/>
  </svg>
);


const FooterComp = () => {
  // Simple component replacements for structure (mimicking Flowbite components)
  const FooterLinkItem = ({ href, children, target = "_self" }) => (
    <li className="mb-2">
      <a href={href} target={target} className="text-gray-600 dark:text-gray-400 hover:underline">
        {children}
      </a>
    </li>
  );

  const FooterTitle = ({ title }) => (
    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
      {title}
    </h2>
  );
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-8 border-teal-500 bg-white dark:bg-gray-900 shadow-lg rounded-t-lg mt-10">
      <div className="mx-auto w-full max-w-7xl p-4 md:py-8">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-3">
          
          {/* 1. Logo Section (FooterBrand equivalent) */}
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                src="https://i.pinimg.com/originals/bc/6d/ba/bc6dba1583b51782a61bdfc2b2daf181.jpg"
                alt="Logo"
                className="h-8 rounded-full"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/32x32/14b8a6/ffffff?text=BH"; }} // Fallback
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Blogger-Hunt
              </span>
            </a>
          </div>

          {/* 2. Link Groups Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 mt-4 sm:mt-0">
            
            {/* Column 1: Frontend Libraries */}
            <div>
              <FooterTitle title="Frontend Libraries" />
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">
                <FooterLinkItem href="https://flowbite.com/" target="_blank">Flowbite</FooterLinkItem>
                <FooterLinkItem href="https://tailwindcss.com/" target="_blank">Tailwind CSS</FooterLinkItem>
                <FooterLinkItem href="https://reactjs.org/" target="_blank">React</FooterLinkItem>
                <FooterLinkItem href="https://redux.js.org/" target="_blank">Redux</FooterLinkItem>
                <FooterLinkItem href="https://firebase.google.com/" target="_blank">Firebase</FooterLinkItem>
                <FooterLinkItem href="https://ant.design/" target="_blank">Ant Design</FooterLinkItem>
                <FooterLinkItem href="https://www.npmjs.com/package/jspdf" target="_blank">jsPDF</FooterLinkItem>
                <FooterLinkItem href="https://react-icons.github.io/react-icons/" target="_blank">React Icons</FooterLinkItem>
                <FooterLinkItem href="https://reactrouter.com/" target="_blank">React Router DOM</FooterLinkItem>
              </ul>
            </div>

            {/* Column 2: Frontend Packages */}
            <div>
              <FooterTitle title="Frontend Packages" />
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">
                <FooterLinkItem href="https://www.npmjs.com/package/axios" target="_blank">Axios</FooterLinkItem>
                <FooterLinkItem href="https://www.npmjs.com/package/file-saver" target="_blank">File Saver</FooterLinkItem>
                <FooterLinkItem href="https://www.npmjs.com/package/react-circular-progressbar" target="_blank">React Circular Progressbar</FooterLinkItem>
                <FooterLinkItem href="https://www.npmjs.com/package/react-csv" target="_blank">React CSV</FooterLinkItem>
                <FooterLinkItem href="https://www.npmjs.com/package/react-toastify" target="_blank">React Toastify</FooterLinkItem>
              </ul>
            </div>

            {/* Column 3: Backend Packages */}
            <div>
              <FooterTitle title="Backend Packages" />
              <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">
                <FooterLinkItem href="https://www.npmjs.com/package/bcryptjs" target="_blank">bcryptjs</FooterLinkItem>
                <FooterLinkItem href="https://expressjs.com/" target="_blank">Express</FooterLinkItem>
                <FooterLinkItem href="https://mongoosejs.com/" target="_blank">Mongoose</FooterLinkItem>
                <FooterLinkItem href="https://www.npmjs.com/package/cors" target="_blank">Cors</FooterLinkItem>
                <FooterLinkItem href="https://www.npmjs.com/package/jsonwebtoken" target="_blank">JWT</FooterLinkItem>
              </ul>
            </div>

          </div>
        </div>
        
        {/* 3. Divider */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        
        {/* 4. Copyright and Social Icons */}
        <div className="sm:flex sm:items-center sm:justify-between">
          
          {/* Copyright (FooterCopyright equivalent) */}
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-bold">
            <a href="#" className="hover:underline">Blogger-Hunt™</a> Copyright {currentYear}. All Rights Reserved by ChandraBose™.
          </span>

          {/* Social Icons */}
          <div className="flex space-x-6 sm:mt-0 mt-4 sm:justify-center">
            <a 
              href="https://github.com/ChandraBose-11" 
              target="_blank" 
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-200"
              aria-label="GitHub profile"
            >
              <GithubIcon className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/chandra-bose-b838142a1/" 
              target="_blank" 
              className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-500 transition duration-200"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComp;
