import { useCallback, useEffect, useRef, useState } from "react"

export function useIntersectionObserver({
  enterOnly,
  callback,
}: {
  enterOnly?: boolean
  callback?(isIntersecting?: boolean): void | Promise<void>
}) {
  // ref for observer
  const obs = useRef<IntersectionObserver | null>(null)
  // ref for element
  const ref = useRef(null)
  // intersecting state
  const [isIntersecting, setIsIntersecting] = useState(false)

  async function onIntersect(entries: IntersectionObserverEntry[]) {
    const entry = entries[0]
    const intersecting = entry.isIntersecting
    await callback?.(intersecting)
    setIsIntersecting(intersecting)
  }

  const setRef = useCallback((newRef: any) => {
    ref.current = newRef
  }, [])

  // setting up refs when initiated
  useEffect(() => {
    if (!obs.current) obs.current = new IntersectionObserver(onIntersect)
    if (ref.current) obs.current.observe(ref.current)
    return () => {
      if (ref.current && obs.current) obs.current.unobserve(ref.current)
    }
  }, [])

  // check if enter only
  // then unobserve
  useEffect(() => {
    if (enterOnly && isIntersecting && ref.current && obs.current)
      obs.current.unobserve(ref.current)
    return () => {}
  }, [isIntersecting])

  return { ref, setRef, isIntersecting }
}
