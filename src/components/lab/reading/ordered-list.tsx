import isEmpty from "lodash-es/isEmpty"

export function NumberedList ({ items } : { items: string[] }) {
	if (isEmpty(items)) return null

	return (
		<ol className="list-decimal list-inside">
			{items.map((item, index) => (
				<li key={index}>
					{item}
				</li>
			))}
		</ol>
	)
}

export function BulletedList ({ items } : { items: string[] }) {
	if (isEmpty(items)) return null

	return (
		<ul className="list-disc list-inside">
			{items.map((item, index) => (
				<li key={index}>
					{item}
				</li>
			))}
		</ul>
	)
}
