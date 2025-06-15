"use client"

import { action, makeAutoObservable } from "mobx"

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

const pageTransitionClass = new PageTransitionClass()

export default pageTransitionClass
