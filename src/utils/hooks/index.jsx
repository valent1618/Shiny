// import { ThemeContext } from '../context/index'
import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return

    async function fetchData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log('=== error === ', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    setLoading(true)

    fetchData()
  }, [url])

  return { isLoading, data, error }
}

// export function useTheme() {
//   const { theme } = useContext(ThemeContext)

//   return theme
// }
