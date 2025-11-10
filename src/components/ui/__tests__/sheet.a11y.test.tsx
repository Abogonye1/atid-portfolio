import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'

describe('SheetContent accessibility', () => {
  it('inserts a fallback sr-only Title when none is present', () => {
    render(
      <Sheet open>
        <SheetContent accessibleTitle="Test Dialog">
          <div>Body</div>
        </SheetContent>
      </Sheet>
    )

    const fallback = document.querySelector('[data-fallback-title="true"]')
    expect(fallback).toBeTruthy()
    expect(fallback?.textContent).toBe('Test Dialog')
  })

  it('does not insert fallback Title when a Title exists', () => {
    render(
      <Sheet open>
        <SheetContent accessibleTitle="Ignored">
          <SheetTitle className="sr-only">Own Title</SheetTitle>
          <div>Body</div>
        </SheetContent>
      </Sheet>
    )

    const fallback = document.querySelector('[data-fallback-title="true"]')
    expect(fallback).toBeFalsy()

    // Ensure our provided Title exists
    const provided = screen.getByText('Own Title')
    expect(provided).toBeTruthy()
  })
})