"use client";
import { Github } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-16 border-t border-zinc-800">
      <div className="flex justify-center items-center gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
        >
          <Github size={24} />
        </a>
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
        >
          <FaTelegram size={24} />
        </a>
      </div>
    </footer>
  );
};