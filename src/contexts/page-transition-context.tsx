import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class PageTransitionClass {
	public direction: PageTransitionDirections = null

	constructor() {
		makeAutoObservable(this)
	}

	public setDirection = action((newDirection: PageTransitionDirections): void => {
		this.direction = newDirection
	})

	public logout() {
		this.setDirection(null)
	}
}

const PageTransitionContext = createContext(new PageTransitionClass())

export default function PageTransitionProvider ({ children }: { children: React.ReactNode }) {
	const pageTransitionClass = useMemo(() => new PageTransitionClass(), [])

	return (
		<PageTransitionContext.Provider value={pageTransitionClass}>
			{children}
		</PageTransitionContext.Provider>
	)
}

export const usePageTransitionContext = () => useContext(PageTransitionContext)
