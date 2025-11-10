import '@testing-library/jest-dom'

// Silence React DOM createRoot warnings in jsdom when using portals
// Use a typed override to satisfy lint rules and preserve behavior.
const originalError = console.error
console.error = (...args: Parameters<typeof console.error>) => {
  const [first, ...rest] = args
  const msg = String(first ?? '')
  if (msg.includes('Warning:')) return
  originalError(first, ...rest)
}