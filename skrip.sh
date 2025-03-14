#!/bin/bash

npm install framer-motion react-icons

# 3. Struktur folder
echo "📁 Setting up folder structure..."
mkdir -p app/components app/hooks


# 6. Animations
cat <<EOL > animations.js
export const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export const scaleButton = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

export const parallax = {
  hidden: { y: 0 },
  visible: (i) => ({
    y: i * -30,
    transition: { duration: 1, ease: "easeOut" },
  }),
};
EOL

# 7. Components
# Hero.jsx
cat <<EOL > app/components/Hero.jsx
"use client";

import { motion } from "framer-motion";
import { fadeIn, parallax } from "../../animations";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center p-8 relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="z-10"
      >
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Empower Your Business
        </h1>
        <p className="text-lg max-w-2xl">
          Unlock cloud solutions with top performance and reliability.
        </p>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          className="mt-8 px-8 py-3 rounded-full"
        >
          Get Started
        </motion.button>
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={parallax}
        className="absolute top-20 left-10 w-48 h-48 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-50"
      ></motion.div>

      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={parallax}
        className="absolute bottom-20 right-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-50"
      ></motion.div>
    </section>
  );
}
EOL

# Form.jsx
cat <<EOL > app/components/Form.jsx
"use client";

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({ email: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("Success! We'll contact you soon.");
    } catch {
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 space-y-4">
      <input
        type="email"
        placeholder="Your email"
        value={formData.email}
        onChange={(e) => setFormData({ email: e.target.value })}
        required
      />
      <button type="submit">Submit</button>
      {status && <p className="text-white">{status}</p>}
    </form>
  );
}
EOL

# Cursor.jsx
cat <<EOL > app/components/Cursor.jsx
"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className="fixed w-8 h-8 rounded-full bg-primary mix-blend-difference pointer-events-none"
      style={{
        top: pos.y,
        left: pos.x,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
EOL

# Main Pages
cat <<EOL > app/page.js
import Hero from "./components/Hero";
import Cursor from "./components/Cursor";
import Form from "./components/Form";

export default function Home() {
  return (
    <main className="relative">
      <Cursor />
      <Hero />
      <section className="py-20">
        <h2 className="text-4xl text-center mb-8">Join the Future</h2>
        <Form />
      </section>
    </main>
  );
}
EOL

# Selesai
echo "✅ Project setup complete! Run the following commands to start:"
echo "cd $PROJECT_NAME"
echo "npm run dev"
