import { useEffect, useState, useRef, memo } from 'react'
import { motion } from 'framer-motion'

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
  [key: string]: any; // for ...props
}

function DecryptedText({
  text,
  speed = 80,
  maxIterations = 5,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  const containerRef = useRef<HTMLSpanElement>(null)
  const animationFrameRef = useRef<number>()
  const lastUpdateTimeRef = useRef<number>(0)
  const revealedIndicesRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length
      switch (revealDirection) {
        case 'start':
          return revealedSet.size
        case 'end':
          return textLength - 1 - revealedSet.size
        case 'center': {
          const middle = Math.floor(textLength / 2)
          const offset = Math.floor(revealedSet.size / 2)
          const nextIndex =
            revealedSet.size % 2 === 0
              ? middle + offset
              : middle - offset - 1

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i
          }
          return 0
        }
        default:
          return revealedSet.size
      }
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ' && char !== '\n')
      : characters.split('')

    const shuffleText = (originalText: string, currentRevealed: Set<number>) => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split('').map((char, i) => ({
          char,
          isWhitespace: char === ' ' || char === '\n',
          index: i,
          isRevealed: currentRevealed.has(i),
        }))

        const nonWhitespaceChars = positions
          .filter((p) => !p.isWhitespace && !p.isRevealed)
          .map((p) => p.char)

        for (let i = nonWhitespaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
            ;[nonWhitespaceChars[i], nonWhitespaceChars[j]] = [nonWhitespaceChars[j], nonWhitespaceChars[i]]
        }

        let charIndex = 0
        return positions
          .map((p) => {
            if (p.isWhitespace) return p.char
            if (p.isRevealed) return originalText[p.index]
            return nonWhitespaceChars[charIndex++]
          })
          .join('')
      } else {
        return originalText
          .split('')
          .map((char, i) => {
            if (char === ' ' || char === '\n') return char
            if (currentRevealed.has(i)) return originalText[i]
            return availableChars[Math.floor(Math.random() * availableChars.length)]
          })
          .join('')
      }
    }

    let currentIteration = 0
    const animate = (time: number) => {
      if (!lastUpdateTimeRef.current) lastUpdateTimeRef.current = time
      const deltaTime = time - lastUpdateTimeRef.current

      if (deltaTime > speed) {
        if (sequential) {
          if (revealedIndicesRef.current.size < text.length) {
            const nextIndex = getNextIndex(revealedIndicesRef.current)
            revealedIndicesRef.current.add(nextIndex)
            setDisplayText(shuffleText(text, revealedIndicesRef.current))
          } else {
            setIsScrambling(false)
            setDisplayText(text)
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
            return
          }
        } else {
          setDisplayText(shuffleText(text, revealedIndicesRef.current))
          currentIteration++
          if (currentIteration >= maxIterations) {
            setIsScrambling(false)
            setDisplayText(text)
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
            return
          }
        }
        lastUpdateTimeRef.current = time
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    if (isHovering) {
      setIsScrambling(true)
      revealedIndicesRef.current = new Set()
      lastUpdateTimeRef.current = 0
      currentIteration = 0
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      setIsScrambling(false)
      setDisplayText(text)
      revealedIndicesRef.current = new Set()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
  ])

  useEffect(() => {
    if (animateOn !== 'view' || window.innerWidth < 768) return

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true)
          setHasAnimated(true)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [animateOn, hasAnimated])

  const hoverProps =
    animateOn === 'hover'
      ? {
        onMouseEnter: () => setIsHovering(true),
        onMouseLeave: () => setIsHovering(false),
      }
      : {}

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone =
            revealedIndicesRef.current.has(index) || !isScrambling || !isHovering

          return (
            <span
              key={index}
              className={isRevealedOrDone ? className : encryptedClassName}
            >
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}

export default memo(DecryptedText) 