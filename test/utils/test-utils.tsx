import React, { ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"

// Custom render function that includes any providers you need
const AllTheProviders = ({ children }: { children: React.ReactNode }): JSX.Element => {
	// Add any global providers here (themes, contexts, etc.)
	return <>{children}</>
}

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }

// Helper to wait for MobX reactions to complete
export const waitForMobXReaction = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 0))

// Helper to create a clean test environment for each test
export function setupTestEnvironment(): void {
	// Reset any global state, clear timers, etc.
	vi.clearAllTimers()
	vi.clearAllMocks()
}
