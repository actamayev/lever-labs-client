"use client"

import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

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

const pageTransitionInstance = new PageTransitionClass()

const PageTransitionContext = createContext(pageTransitionInstance)

export default function PageTransitionProvider ({ children }: { children: React.ReactNode }) {
	return (
		<PageTransitionContext.Provider value={pageTransitionInstance}>
			{children}
		</PageTransitionContext.Provider>
	)
}

export const usePageTransitionContext = () => useContext(PageTransitionContext)
