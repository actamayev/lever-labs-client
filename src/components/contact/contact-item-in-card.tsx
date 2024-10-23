import { useCallback } from "react"
import { observer } from "mobx-react"
import { useNotificationsContext } from "../../contexts/notifications-context"

interface Props {
	name: string
	email: string
}

function ContactItemInCard(props: Props) {
	const { name, email } = props
	const notificationsClass = useNotificationsContext()

	const copyToClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(email)
			notificationsClass.setNeutralNotification(`${email} copied to clipboard`)
		} catch (error) {
			console.error(error)
		}
	}, [email, notificationsClass])

	return (
		<div
			className="flex justify-between py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 m-1 rounded-lg cursor-pointer"
			onClick={copyToClipboard}
		>
			<span className="text-left ml-2">{name}</span>
			<span className="text-right font-semibold mr-2">{email}</span>
		</div>
	)
}

export default observer(ContactItemInCard)
