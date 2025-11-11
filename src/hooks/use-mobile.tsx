import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => {
      setPrefersReducedMotion(mql.matches)
    }
    mql.addEventListener("change", onChange)
    setPrefersReducedMotion(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return prefersReducedMotion
}

export function useShouldReduceAnimations() {
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()

  return isMobile || prefersReducedMotion
}
