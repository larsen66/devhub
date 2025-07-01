import { Sparkles } from "./sparkles"
import { useTheme } from "next-themes"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import { GridPatternCard, GridPatternCardBody } from "./ui/grid-pattern-card"

export function Demo() {
	const { theme } = useTheme()
	const ref = useRef(null)
	const isInView = useInView(ref, { 
		once: true,
		amount: 0.3
	})

	useEffect(() => {
		if (isInView) {
			// Блокируем скролл на время анимации
			document.body.style.overflow = "hidden"
			
			// Разблокируем через 2 секунды (время анимации)
			const timer = setTimeout(() => {
				document.body.style.overflow = ""
			}, 2000)
			
			return () => clearTimeout(timer)
		}
	}, [isInView])

	return (
		<motion.div 
			ref={ref}
			className="w-full"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={isInView ? { opacity: 1, scale: 1 } : {}}
			transition={{ duration: 2, ease: "easeOut" }}
		>
			<div className="mx-auto mt-32 w-full max-w-3xl text-center">
				<h2 className="text-4xl font-bold text-foreground sm:text-5xl mb-6">
					Our Expertise
				</h2>
				<p className="text-base text-zinc-500 dark:text-zinc-400 mb-12">
					We transform your ideas into high-performance web and mobile applications using a modern, scalable tech stack.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<GridPatternCard>
						<GridPatternCardBody>
							<h3 className="text-xl font-semibold text-foreground mb-4">What We Do</h3>
							<ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 text-left">
								<li><span className="font-semibold">Full-Stack Development:</span> Building robust web apps from front to back.</li>
								<li><span className="font-semibold">Mobile Development:</span> Creating iOS & Android apps with React Native & Expo.</li>
								<li><span className="font-semibold">AI & Automation:</span> Automating processes with Python and AI solutions.</li>
								<li><span className="font-semibold">Cloud & DevOps:</span> Managing scalable infrastructure and CI/CD pipelines.</li>
							</ul>
						</GridPatternCardBody>
					</GridPatternCard>
					<GridPatternCard>
						<GridPatternCardBody>
							<h3 className="text-xl font-semibold text-foreground mb-4">Our Tech Stack</h3>
							<ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 text-left">
								<li><span className="font-semibold">Frontend:</span> React, Next.js, Vue, TypeScript</li>
								<li><span className="font-semibold">Mobile:</span> React Native, Expo</li>
								<li><span className="font-semibold">Backend:</span> Python, Node.js</li>
								<li><span className="font-semibold">AI/ML:</span> TensorFlow, PyTorch, Scikit-learn</li>
								<li><span className="font-semibold">Styling:</span> Tailwind CSS, Framer Motion</li>
								<li><span className="font-semibold">DevOps & Cloud:</span> Vercel, Docker, Terraform, Upstash, Render, AWS</li>
							</ul>
						</GridPatternCardBody>
					</GridPatternCard>
				</div>
			</div>

			<div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
				<div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#000022,transparent_70%)] before:opacity-40" />
				<div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-white dark:bg-zinc-900" />
				<Sparkles
					density={1200}
					className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
					color={theme === "dark" ? "#ffffff" : "#3b82f6"}
				/>
			</div>
		</motion.div>
	)
} 