"use client";
import { Github } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-16 border-t border-zinc-800">
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://github.com/larsen66"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
          >
            <Github size={24} />
          </a>
          <a
            href="https://t.me/aisceptic0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
          >
            <FaTelegram size={24} />
          </a>
        </div>
        <p className="text-xs text-zinc-500">
          Created by{" "}
          <a
            href="https://daliagents.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 underline-offset-2 hover:text-zinc-200 hover:underline"
          >
            Dali Agents
          </a>
          {" · daliagents.com"}
        </p>
      </div>
    </footer>
  );
};