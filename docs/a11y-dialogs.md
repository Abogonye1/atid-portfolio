# Dialog Accessibility: Title Requirement & Prevention

## Error Summary
- Log observed: `DialogContent requires a DialogTitle for the component to be accessible for screen reader users.`
- Root cause: `@radix-ui/react-dialog` requires `Dialog.Title` for accessible naming of the content element (`role="dialog"`). Without a title, screen readers cannot announce the dialog context.

## Root Cause Analysis
- Our `Sheet` component wraps `Radix Dialog`. `SheetContent` is implemented via `Dialog.Content`.
- In `Navigation` and `Sidebar` mobile panes we rendered `SheetContent` without a corresponding `SheetTitle`, triggering Radix’s runtime warning and harming accessibility.

## Fix Overview
1. `SheetContent` now auto-injects an `sr-only` title when none is present.
   - Prop: `accessibleTitle?: string` allows specifying a descriptive name.
   - Fallback DOM annotated with `data-fallback-title="true"` to enable monitoring and testing.
2. Updated usages:
   - `Navigation.tsx` supplies `accessibleTitle="Mobile Menu"`.
   - `sidebar.tsx` supplies `accessibleTitle="Sidebar Navigation"`.
3. Tests: Added Vitest + React Testing Library and a unit test to verify fallback behavior.
4. Monitoring: Dev-only MutationObserver warns for dialogs missing a valid title.

## Files Changed
- `src/components/ui/sheet.tsx`: inject fallback `SheetPrimitive.Title` and support `accessibleTitle`.
- `src/components/Navigation.tsx`: pass `accessibleTitle` to mobile menu sheet.
- `src/components/ui/sidebar.tsx`: pass `accessibleTitle` to mobile sidebar sheet.
- `src/main.tsx`: dev-only a11y monitor for dialog titles.
- `vite.config.ts`: configure Vitest (`jsdom`, setup file).
- `src/test/setup.ts`: Testing setup (`@testing-library/jest-dom`).
- `src/components/ui/__tests__/sheet.a11y.test.tsx`: Unit tests for fallback title injection.
- `package.json`: add testing scripts and devDependencies.

## How It Works
- On render, `SheetContent` checks descendants for an existing `SheetPrimitive.Title`.
- If not found, it injects a visually-hidden title (`sr-only`) to satisfy Radix a11y.
- Consumers can still provide a visible `SheetTitle`; the fallback is skipped.
- Monitoring runs in development and logs warnings for any dialog without a valid title.

## Usage Guidance
- Prefer explicit titles: add `<SheetTitle>…</SheetTitle>` inside `SheetContent`.
- For non-visual titles (e.g., menus), use `accessibleTitle` to provide a screen-reader name.
- Keep titles concise and descriptive.

## Testing
- Run `npm run test:run` to execute unit tests.
- Tests verify fallback title insertion and that it’s skipped when a title exists.

## Security & Stability Considerations
- No external runtime code added beyond dev-only monitor; production bundles unaffected.
- Fallback title is semantic and non-visual (`sr-only`), preserving UI and minimizing risk.
- The change does not alter interaction semantics or introduce event handlers.

## Future Monitoring
- The dev monitor checks all `role="dialog"` elements and warns when `aria-labelledby` is missing or invalid.
- Consider adding CI a11y checks (e.g., `@axe-core/react` or `vitest-axe`) for broader coverage.