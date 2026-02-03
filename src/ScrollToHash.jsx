import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    // If there's a hash (e.g. /#contact), try to scroll to that element
    if (hash) {
      const id = hash.replace('#', '')

      // Try to find the element immediately
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      // If element isn't present yet (render delay), try shortly after
      const t = setTimeout(() => {
        const el2 = document.getElementById(id)
        if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)

      return () => clearTimeout(t)
    }

    // No hash -> optional: scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}
