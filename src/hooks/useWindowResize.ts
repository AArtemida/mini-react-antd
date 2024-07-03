import { useEffect } from "react";

export function useWindowResize(callback: (event: UIEvent) => void) {
  useEffect(() => {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [callback])
}

