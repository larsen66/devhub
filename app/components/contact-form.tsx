"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function ContactForm({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setResult(null)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      setResult({
        success: response.ok,
        message: result.message || (response.ok ? "Message sent!" : "Something went wrong."),
      })
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      id="contact"
      className={cn("py-24 sm:py-32", className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <h2 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-5xl md:text-6xl whitespace-nowrap bg-clip-text">
              About
            </h2>
            <p className="mt-4 text-lg text-zinc-400 max-w-xl mx-auto md:mx-0">
              We are a passionate team of developers dedicated to building
              high-quality software and contributing to the open-source community.
              Our mission is to create tools and services that empower other
              developers and businesses to innovate and succeed.
            </p>
          </div>

          <div className="w-full">
            <p className="max-w-[600px] text-lg text-zinc-400 mb-4 text-center md:text-left">
              Have a question or want to work with us? Send us a message!
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg space-y-5 mx-auto md:mx-0"
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50 transition-all duration-300"
                  required
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50 transition-all duration-300"
                  required
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50 transition-all duration-300"
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-white py-3 font-semibold text-black transition-colors hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
            {result && (
              <p
                className={`mt-4 text-sm text-center md:text-left ${
                  result.success ? "text-green-400" : "text-red-400"
                }`}
              >
                {result.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
} 