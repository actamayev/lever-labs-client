import type { Swiper as SwiperType } from "swiper"

export interface MockSwiperInstance {
	activeIndex: number
	allowSlideNext: boolean
	allowSlidePrev: boolean
	slideTo: ReturnType<typeof vi.fn>
	slideNext: ReturnType<typeof vi.fn>
	slidePrev: ReturnType<typeof vi.fn>
	on: ReturnType<typeof vi.fn>
	off: ReturnType<typeof vi.fn>
	destroy: ReturnType<typeof vi.fn>
}

export function createMockSwiper(initialIndex = 0): MockSwiperInstance {
	const mock: MockSwiperInstance = {
		activeIndex: initialIndex,
		allowSlideNext: true,
		allowSlidePrev: true,
		slideTo: vi.fn((index: number, _speed?: number) => {
			mock.activeIndex = index
		}),
		slideNext: vi.fn(() => {
			if (mock.allowSlideNext) {
				mock.activeIndex += 1
			}
		}),
		slidePrev: vi.fn(() => {
			if (mock.allowSlidePrev && mock.activeIndex > 0) {
				mock.activeIndex -= 1
			}
		}),
		on: vi.fn(),
		off: vi.fn(),
		destroy: vi.fn(),
	}

	return mock
}

// Mock the entire Swiper module
vi.mock("swiper/react", () => ({
	Swiper: ({ children, onSwiper, ...props }: any) => {
		const mockSwiper = createMockSwiper(props.initialSlide || 0)

		// Simulate onSwiper callback
		if (onSwiper) {
			setTimeout(() => onSwiper(mockSwiper as unknown as SwiperType), 0)
		}

		return children
	},
	SwiperSlide: ({ children }: any) => children,
}))

// Mock Swiper CSS imports
vi.mock("swiper/css", () => ({}))
