import { useEffect, useRef } from "react"

function useOutsideClick(elRef: any, callback: any) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!elRef.current.contains(e.target) && callbackRef.current) {
        callbackRef.current(e)
      }
    }
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [callbackRef, elRef])
}

export default useOutsideClick