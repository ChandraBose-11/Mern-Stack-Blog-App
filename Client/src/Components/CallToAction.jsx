import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex border border-teal-500 p-5 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center bg-white/5 dark:bg-black/20 backdrop-blur-xl shadow-lg">
      
      {/* TEXT SECTION */}
      <div className="flex-1 justify-center flex flex-col px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ready to Become a Better Blogger?
        </h2>

        <p className="text-gray-600 dark:text-gray-300 my-3 text-sm sm:text-base leading-relaxed">
          Learn how to write compelling articles, grow your audience, and turn your ideas 
          into powerful content. Explore expert tips, real blogging strategies, and 
          hands-on guides to take your writing journey to the next level.
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">
          (Free guides, real examples, step-by-step learning)
        </p>

        <a
          href="https://blog.hubspot.com/marketing/how-to-start-a-blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="rounded-tl-xl rounded-br-xl rounded-bl-none w-full shadow-md hover:shadow-lg transition">
            Explore Blogging Guides
          </Button>
        </a>
      </div>

      {/* IMAGE SECTION */}
      <div className="flex-1 p-7 flex justify-center">
        <img
          src="./assets/blog.webp"
          alt="Blogging illustration"
          className="rounded-xl shadow-lg border border-white/20"
        />
      </div>
    </div>
  );
}
