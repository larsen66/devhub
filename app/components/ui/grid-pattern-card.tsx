"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { GlowingEffect } from "./glowing-effect"

interface GridPatternCardProps {
	children: React.ReactNode
	className?: string
	isDesktop?: boolean
}

export function GridPatternCard({
	children,
	className,
	isDesktop,
}: GridPatternCardProps) {
	return (
		<div
			className={cn(
				"border w-full rounded-md overflow-hidden",
				"bg-black/10 dark:bg-white/5 backdrop-blur-xl",
				"border-white/10",
				"p-6",
				className,
			)}
		>
			<div className="relative h-full rounded-lg border border-white/10 p-1 md:rounded-xl md:p-2">
				<GlowingEffect
					spread={40}
					glow={true}
					disabled={!isDesktop}
					autoplay={!isDesktop}
					proximity={64}
					inactiveZone={0.01}
					borderWidth={3}
				/>
				<div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-lg border bg-black/10 backdrop-blur-xl p-4 shadow-sm">
					{children}
				</div>
			</div>
		</div>
	)
}

export function GridPatternCardBody({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("text-left", className)}
			{...props}
		/>
	);
} 