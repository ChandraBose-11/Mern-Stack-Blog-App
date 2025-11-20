import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const About = () => {
  const [counters, setCounters] = useState({
    posts: 0,
    tutorials: 0,
    followers: 0,
  });

  useEffect(() => {
    const target = { posts: 250, tutorials: 80, followers: 1200 };
    const interval = setInterval(() => {
      setCounters((prev) => {
        const updated = { ...prev };
        let done = true;
        for (let key in prev) {
          if (prev[key] < target[key]) {
            updated[key] = prev[key] + 1;
            done = false;
          }
        }
        if (done) clearInterval(interval);
        return updated;
      });
    }, 10);
  }, []);

  return (
    <div
      className="
        min-h-screen py-10 px-6 relative overflow-hidden
        bg-white text-gray-900
        dark:bg-[#0f172a] dark:text-gray-100
      "
    >
      {/* 🌌 Decorative glows only in dark mode */}
      <div className="hidden dark:block absolute top-10 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="hidden dark:block absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="
          max-w-6xl mx-auto rounded-3xl shadow-2xl p-10 relative z-10
          bg-white border border-gray-200
          hover:shadow-purple-200
          dark:bg-[#1e293b] dark:border-gray-700 dark:hover:shadow-purple-800/30
        "
      >
        {/* Header */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="
            text-5xl font-extrabold text-center mb-10
            text-purple-700 dark:text-purple-300
          "
        >
          About <span className="text-pink-500">Blogger Hunt</span>
        </motion.h1>

        {/* Who We Are */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="
            mb-10 p-6 rounded-2xl shadow-lg border-l-4
            bg-purple-50 border-purple-400
            dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700 dark:border-purple-500
          "
        >
          <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              Blogger Hunt
            </span>{" "}
            is a next-generation blogging platform built for creators,
            developers, and learners. Founded by{" "}
            <span className="font-medium text-pink-500 dark:text-pink-400">
              Chandra Bose
            </span>
            , our goal is to create a digital ecosystem where anyone can learn,
            share, and grow through technology and storytelling.
          </p>
        </motion.section>

        {/* Our Story */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            p-6 rounded-2xl border-l-4 shadow-md mb-10
            bg-purple-50 border-purple-400
            dark:bg-gradient-to-r dark:from-purple-900 dark:to-purple-700 dark:border-purple-400
          "
        >
          <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-200 mb-3">
            Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-100 text-lg">
            It all started as a passion project — a simple idea to document and
            share coding experiences. Over time, Blogger Hunt evolved into a
            thriving platform where readers from across the globe exchange ideas
            and tutorials about software, design, and innovation.
          </p>
        </motion.section>

        {/* Mission */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            p-6 rounded-2xl border-l-4 shadow-md mb-10
            bg-pink-50 border-pink-400
            dark:bg-gradient-to-r dark:from-pink-900 dark:to-pink-700 dark:border-pink-400
          "
        >
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-200 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-100 text-lg">
            To make technology accessible to everyone by offering high-quality
            tutorials, honest insights, and real-world experiences — encouraging
            everyone to learn, build, and share their journey.
          </p>
        </motion.section>

        {/* Vision */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            p-6 rounded-2xl border-l-4 shadow-md mb-10
            bg-blue-50 border-blue-400
            dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-700 dark:border-blue-400
          "
        >
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-200 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-100 text-lg">
            Our vision is to become the go-to destination for developers and
            tech enthusiasts who want to stay ahead in the digital age — a space
            where passion meets innovation.
          </p>
        </motion.section>

        {/* Stats */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mt-16 mb-16"
        >
          <h2 className="text-3xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
            Blogger Hunt Growth Stats
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Posts", value: counters.posts, color: "purple" },
              { label: "Tutorials", value: counters.tutorials, color: "pink" },
              { label: "Followers", value: counters.followers, color: "blue" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`
                  rounded-2xl p-8 shadow-xl border transition-all duration-500
                  bg-white border-${stat.color}-200 hover:shadow-2xl
                  dark:bg-slate-800 dark:border-${stat.color}-500
                `}
              >
                <h3
                  className={`text-5xl font-bold text-${stat.color}-500 dark:text-${stat.color}-400`}
                >
                  {stat.value}
                </h3>
                <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            p-6 rounded-2xl shadow-lg border-l-4 mb-10
            bg-gradient-to-r from-purple-100 to-pink-100 border-teal-400
            dark:bg-gradient-to-r dark:from-teal-900 dark:to-teal-700 dark:border-teal-400
          "
        >
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-200 mb-3">
            Why Choose Blogger Hunt?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-100">
            <li>Practical, developer-focused content — no fluff.</li>
            <li>Written by real developers with hands-on experience.</li>
            <li>Engaging discussions and community insights.</li>
            <li>Modern, interactive UI and seamless reading experience.</li>
            <li>Fresh updates on modern frameworks and technologies.</li>
          </ul>
        </motion.section>

        {/* Core Values */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            p-6 rounded-2xl shadow-lg mt-10 border-l-4
            bg-white border-yellow-400
            dark:bg-gradient-to-r dark:from-yellow-900 dark:to-yellow-700 dark:border-yellow-400
          "
        >
          <h2 className="text-2xl font-semibold text-yellow-600 dark:text-yellow-200 mb-3">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-lg text-gray-700 dark:text-gray-100">
            {[
              {
                title: "🌍 Knowledge Sharing",
                text: "We believe learning is best when shared. Every post sparks curiosity and growth.",
              },
              {
                title: "💡 Innovation",
                text: "We explore the latest technologies and trends to keep our readers inspired and informed.",
              },
              {
                title: "🤝 Community",
                text: "We value connection, feedback, and collaboration among creators and readers alike.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="
                  p-4 rounded-xl shadow-inner
                  bg-yellow-50 hover:shadow-md
                  dark:bg-yellow-800
                "
              >
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Join Us */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            mt-10 p-6 rounded-2xl shadow-lg
            bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100
            dark:bg-gradient-to-r dark:from-pink-900 dark:via-purple-800 dark:to-blue-800
          "
        >
          <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-200 mb-3">
            Join the Blogger Hunt Community!
          </h2>
          <p className="text-gray-700 dark:text-gray-100 text-lg">
            Ready to start your journey? Create an account, explore our blogs,
            and share your own thoughts. Together, we can build a creative
            community where ideas transform into action.
          </p>
        </motion.section>

        {/* Inspirational Quote */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            mt-10 text-center p-6 rounded-2xl shadow-inner
            bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200
            dark:bg-gradient-to-r dark:from-purple-900 dark:via-pink-800 dark:to-blue-900
          "
        >
          <p className="italic text-lg font-semibold text-purple-700 dark:text-purple-200">
            “Every great developer you know was once a beginner who never gave
            up.”
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
