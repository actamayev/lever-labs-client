import isEmpty from "lodash-es/isEmpty"

export default function OrderedList ({ items } : { items: string[] }) {
	if (isEmpty(items)) return null

	return (
		<ol className={"list-decimal list-inside"}>
			{items.map((item, index) => (
				<li key={index}>
					{item}
				</li>
			))}
		</ol>
	)
}
