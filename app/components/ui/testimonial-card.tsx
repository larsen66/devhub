import Link from "next/link"
import { cn } from "@/lib/utils"

export interface TestimonialAuthor {
  name: string
  handle: string
  href?: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const authorContent = (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <p className="font-semibold text-foreground text-xs whitespace-normal">{author.name}</p>
        <p className="text-muted-foreground text-xs whitespace-normal">{author.handle}</p>
      </div>
    </div>
  )

  const cardContent = (
    <div className="flex h-full flex-col justify-between rounded-lg border bg-transparent p-4 text-card-foreground">
      <p className="text-sm font-medium whitespace-normal">{`"${text}"`}</p>
      <div className="mt-4">
        {author.href && !href ? (
          <Link href={author.href} className="inline-block">
            {authorContent}
          </Link>
        ) : (
          authorContent
        )}
      </div>
    </div>
  )

  return (
    <div className={cn("w-[300px] shrink-0", className)}>
      {href ? (
        <Link href={href} className="inline-block h-full w-full">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  )
} 