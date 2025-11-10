import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock Navigation to keep the test lightweight
vi.mock('@/components/Navigation', () => ({ default: () => <div data-testid="nav" /> }))

// Hoisted mocks to satisfy Vitest's module mocking constraints
const hoisted = vi.hoisted(() => ({
  mockToast: { error: vi.fn(), success: vi.fn() },
  invoke: vi.fn(),
}))
vi.mock('@/components/ui/sonner', () => ({ toast: hoisted.mockToast }))
vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    functions: { invoke: hoisted.invoke },
  },
}))

import Contact from '@/pages/Contact'

// Polyfill requestSubmit in JSDOM if missing
if (!('requestSubmit' in HTMLFormElement.prototype)) {
  Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', {
    value: function(this: HTMLFormElement) {
      const event = new Event('submit', { bubbles: true, cancelable: true })
      this.dispatchEvent(event)
    },
    configurable: true,
  })
}

describe('Contact form', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('blocks submission when required fields are empty and shows error toast', async () => {
    render(<Contact />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    const form = submitButton.closest('form') as HTMLFormElement
    fireEvent.submit(form)

    expect(hoisted.mockToast.error).toHaveBeenCalledWith('Please fill out all required fields.')
    expect(hoisted.invoke).not.toHaveBeenCalled()
  })

  it('trims whitespace-only values and still blocks with error toast', async () => {
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText('Message')
    const submitButton = screen.getByRole('button', { name: /send message/i })
    const form = submitButton.closest('form') as HTMLFormElement

    await userEvent.type(nameInput, '   ')
    await userEvent.type(emailInput, '   ')
    await userEvent.type(messageInput, '   ')
    fireEvent.submit(form)

    expect(hoisted.mockToast.error).toHaveBeenCalledWith('Please fill out all required fields.')
    expect(hoisted.invoke).not.toHaveBeenCalled()
  })

  it('submits with trimmed values, shows success toast, and clears inputs', async () => {
    hoisted.invoke.mockResolvedValueOnce({ data: { id: 1 }, error: null })
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /send message/i })
    const form = submitButton.closest('form') as HTMLFormElement

    await userEvent.type(nameInput, '  Jane Doe  ')
    await userEvent.type(emailInput, '  jane@example.com  ')
    await userEvent.type(messageInput, '  Hello there  ')
    fireEvent.submit(form)

    expect(hoisted.invoke).toHaveBeenCalledTimes(1)
    const args = hoisted.invoke.mock.calls[0][1]
    // Body should be a JSON string with trimmed values
    const payload = JSON.parse(args.body)
    expect(payload).toEqual({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' })

    await waitFor(() => {
      expect(hoisted.mockToast.success).toHaveBeenCalledWith('Message sent successfully!')
    })

    // After success, inputs should be cleared
    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(messageInput.value).toBe('')
  })

  it('shows error toast when backend returns error and retains values', async () => {
    hoisted.invoke.mockResolvedValueOnce({ data: null, error: { message: 'Server error' } })
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /send message/i })
    const form = submitButton.closest('form') as HTMLFormElement

    await userEvent.type(nameInput, 'Jane Doe')
    await userEvent.type(emailInput, 'jane@example.com')
    await userEvent.type(messageInput, 'Hello there')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(hoisted.mockToast.error).toHaveBeenCalledWith('Failed to send message.')
    })

    // Inputs should remain since only success path clears them
    expect(nameInput.value).toBe('Jane Doe')
    expect(emailInput.value).toBe('jane@example.com')
    expect(messageInput.value).toBe('Hello there')
  })

  it('quick-submit card triggers form submission and success flow', async () => {
    hoisted.invoke.mockResolvedValueOnce({ data: { id: 42 }, error: null })
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement

    await userEvent.type(nameInput, '  Jane Doe  ')
    await userEvent.type(emailInput, '  jane@example.com  ')
    await userEvent.type(messageInput, '  Hello there  ')

    const quickSubmit = screen.getByRole('button', { name: /submit your inquiry/i })
    await userEvent.click(quickSubmit)

    await waitFor(() => {
      expect(hoisted.invoke).toHaveBeenCalledTimes(1)
    })
    const args = hoisted.invoke.mock.calls[0][1]
    const payload = JSON.parse(args.body)
    expect(payload).toEqual({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' })

    await waitFor(() => {
      expect(hoisted.mockToast.success).toHaveBeenCalledWith('Message sent successfully!')
    })

    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(messageInput.value).toBe('')
  })

  it('quick-submit card is keyboard accessible with Enter', async () => {
    hoisted.invoke.mockResolvedValueOnce({ data: { id: 7 }, error: null })
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement

    await userEvent.type(nameInput, '  Jane Doe  ')
    await userEvent.type(emailInput, '  jane@example.com  ')
    await userEvent.type(messageInput, '  Hello there  ')

    const quickSubmit = screen.getByRole('button', { name: /submit your inquiry/i })
    quickSubmit.focus()
    await userEvent.keyboard('{Enter}')

    await waitFor(() => {
      expect(hoisted.invoke).toHaveBeenCalledTimes(1)
    })
    const args = hoisted.invoke.mock.calls[0][1]
    const payload = JSON.parse(args.body)
    expect(payload).toEqual({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' })

    await waitFor(() => {
      expect(hoisted.mockToast.success).toHaveBeenCalledWith('Message sent successfully!')
    })

    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(messageInput.value).toBe('')
  })

  it('quick-submit card is keyboard accessible with Space', async () => {
    hoisted.invoke.mockResolvedValueOnce({ data: { id: 8 }, error: null })
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement

    await userEvent.type(nameInput, '  Jane Doe  ')
    await userEvent.type(emailInput, '  jane@example.com  ')
    await userEvent.type(messageInput, '  Hello there  ')

    const quickSubmit = screen.getByRole('button', { name: /submit your inquiry/i })
    quickSubmit.focus()
    // Space keydown triggers the handler; userEvent.keyboard(' ') may not always fire keydown
    fireEvent.keyDown(quickSubmit, { key: ' ', code: 'Space' })

    await waitFor(() => {
      expect(hoisted.invoke).toHaveBeenCalledTimes(1)
    })
    const args = hoisted.invoke.mock.calls[0][1]
    const payload = JSON.parse(args.body)
    expect(payload).toEqual({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there' })

    await waitFor(() => {
      expect(hoisted.mockToast.success).toHaveBeenCalledWith('Message sent successfully!')
    })

    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(messageInput.value).toBe('')
  })

  it('shows timeout toast and retains inputs when invoke hangs', async () => {
    hoisted.invoke.mockImplementation(() => new Promise(() => {}))
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /send message/i })
    const form = submitButton.closest('form') as HTMLFormElement

    await userEvent.type(nameInput, 'Jane Doe')
    await userEvent.type(emailInput, 'jane@example.com')
    await userEvent.type(messageInput, 'Hello there')
    fireEvent.submit(form)

    // The component uses a short timeout during tests; wait for the toast
    await waitFor(() => {
      expect(hoisted.mockToast.error).toHaveBeenCalledWith('Request timed out. Please try again.')
    })
    expect(hoisted.mockToast.error).toHaveBeenCalledWith('Request timed out. Please try again.')

    // Inputs should remain since there was no success
    expect(nameInput.value).toBe('Jane Doe')
    expect(emailInput.value).toBe('jane@example.com')
    expect(messageInput.value).toBe('Hello there')

  })

  it('skips backend when honeypot is filled and still shows success', async () => {
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /send message/i })
    const form = submitButton.closest('form') as HTMLFormElement

    // Fill honeypot directly (hidden input)
    const hp = document.querySelector('input[name="hp"]') as HTMLInputElement | null
    expect(hp).toBeTruthy()
    if (hp) hp.value = 'bot-value'

    await userEvent.type(nameInput, 'Spam Bot')
    await userEvent.type(emailInput, 'spam@bot.dev')
    await userEvent.type(messageInput, 'Automated submission.')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(hoisted.mockToast.success).toHaveBeenCalledWith('Message sent successfully!')
    })

    // Inputs should be cleared
    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(messageInput.value).toBe('')

    // Backend should not have been invoked
    expect(hoisted.invoke).not.toHaveBeenCalled()
  })

  it('disables submit button while invoking and re-enables after success', async () => {
    // Type the mocked invoke result to avoid explicit-any while matching call sites
    type InvokeResult = { data: { ok: boolean } | null; error: Error | null }
    let resolveInvoke: (v: InvokeResult) => void
    const pending = new Promise<InvokeResult>((resolve) => { resolveInvoke = resolve })
    hoisted.invoke.mockImplementationOnce(() => pending)

    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /send message/i })
    const form = submitButton.closest('form') as HTMLFormElement

    await userEvent.type(nameInput, 'Jane Doe')
    await userEvent.type(emailInput, 'jane@example.com')
    await userEvent.type(messageInput, 'Testing loading state.')
    fireEvent.submit(form)

    // Immediately disabled while request is in flight
    expect(submitButton).toBeDisabled()

    // Resolve the pending invocation with success quickly
    resolveInvoke!({ data: { ok: true }, error: null })

    await waitFor(() => {
      expect(hoisted.mockToast.success).toHaveBeenCalledWith('Message sent successfully!')
    })
    expect(submitButton).not.toBeDisabled()
  })
})