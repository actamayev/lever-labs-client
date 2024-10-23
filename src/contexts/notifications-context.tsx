import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { useContext, useMemo, createContext } from "react"

class NotificationsClass {
	public notification: string | null = null
	private timer: NodeJS.Timeout | null = null
	public notificationBoxClasses: string = "bg-white dark:bg-black text-black dark:text-white"

	constructor() {
		makeAutoObservable(this)
	}

	public setSuperPositiveNotification = action((notificationMessage: string): void => {
		this.setNotification(notificationMessage)
		this.notificationBoxClasses = "bg-green-500 dark:bg-green-500 text-white dark:text-white"
	})

	public setPositiveNotification = action((notificationMessage: string): void => {
		this.setNotification(notificationMessage)
		this.notificationBoxClasses = "bg-blue-500 dark:bg-blue-500 text-white dark:text-white"
	})

	public setNeutralNotification = action((notificationMessage: string): void => {
		this.setNotification(notificationMessage)
		this.notificationBoxClasses = "bg-white dark:bg-black text-black dark:text-white"
	})

	public setNegativeNotification = action((notificationMessage: string): void => {
		this.setNotification(notificationMessage)
		this.notificationBoxClasses = "bg-red-500 dark:bg-red-500 text-white dark:text-white"
	})

	private setNotification = action((newNotification: string): void => {
		this.notification = newNotification
		this.resetTimer()
	})

	private setNotificationNull = action((): void => {
		this.notification = null
		this.clearTimer()
	})

	private resetTimer() {
		this.clearTimer()
		this.timer = setTimeout(() => {
			this.setNotificationNull()
		}, 3000)
	}

	private clearTimer() {
		if (_.isNull(this.timer)) return
		clearTimeout(this.timer)
		this.timer = null
	}

	public logout() {
		this.notification = null
		this.clearTimer()
	}
}

const NotificationsContext = createContext(new NotificationsClass())

export default function NotificationsProvider({ children }: { children: React.ReactNode }) {
	const notificationsClass = useMemo(() => new NotificationsClass(), [])

	return (
		<NotificationsContext.Provider value={notificationsClass}>
			{children}
		</NotificationsContext.Provider>
	)
}

export const useNotificationsContext = () => useContext(NotificationsContext)
