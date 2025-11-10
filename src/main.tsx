import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'

// Global error logging: capture unexpected errors and unhandled rejections
window.addEventListener('error', (event) => {
  console.error('[GlobalError] Uncaught error:', {
    message: event.error?.message ?? String(event.message),
    name: event.error?.name,
    stack: event.error?.stack,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  })
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('[GlobalError] Unhandled rejection:', {
    reason: event.reason,
  })
})

// Dev-only: monitor Dialogs for missing Title to catch a11y issues
function attachA11yDialogMonitor() {
  const checkDialogs = () => {
    const dialogs = document.querySelectorAll('[role="dialog"]')
    dialogs.forEach((dlg) => {
      const el = dlg as HTMLElement
      const labelledBy = el.getAttribute('aria-labelledby')
      const hasFallback = el.querySelector('[data-fallback-title="true"]')
      if (hasFallback) return
      if (!labelledBy) {
        console.warn('[A11y] DialogContent missing aria-labelledby; ensure a Title is provided.')
        return
      }
      const titleEl = labelledBy ? document.getElementById(labelledBy) : null
      const titleText = titleEl?.textContent?.trim()
      if (!titleEl || !titleText) {
        console.warn('[A11y] Dialog has aria-labelledby but title element is missing or empty.')
      }
    })
  }
  const observer = new MutationObserver(() => {
    checkDialogs()
  })
  observer.observe(document.body, { childList: true, subtree: true })
  // Initial check
  checkDialogs()
}

if (import.meta.env.DEV) {
  // Monitor only in development builds
  attachA11yDialogMonitor()
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
