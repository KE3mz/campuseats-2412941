import { useEffect, useRef, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const isFirstRender = useRef(true)

  const [value, setValue] = useState(() => {
    if (!key) return initialValue
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // When key changes (guest -> user A, user A -> logout, logout -> user B), load that key
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!key) {
      setValue(initialValue)
      return
    }
    try {
      const saved = localStorage.getItem(key)
      setValue(saved !== null ? JSON.parse(saved) : initialValue)
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      setValue(initialValue)
    }
  }, [key])

  // Save changes only when key is present (signed-in users)
  useEffect(() => {
    if (!key) return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}