import "@testing-library/jest-dom"

// Mock Next.js router
vi.mock("next/navigation", () => ({
	useRouter: vi.fn((): Record<string, ReturnType<typeof vi.fn>> => ({
		push: vi.fn(),
		replace: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
		prefetch: vi.fn(),
	})),
	usePathname: vi.fn((): string => "/"),
	useSearchParams: vi.fn((): URLSearchParams => new URLSearchParams()),
}))

// Mock window.matchMedia for responsive hooks
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})

// Mock ResizeObserver (used by some UI components)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}))

// Mock Web Serial API (since your app uses it)
global.navigator = {
	...global.navigator,
	serial: {
		requestPort: vi.fn(),
		getPorts: vi.fn((): Promise<unknown[]> => Promise.resolve([])),
	}
} as any
