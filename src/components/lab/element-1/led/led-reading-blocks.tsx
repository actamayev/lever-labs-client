const ledReadingBlocks: ContentBlock[] = [
	{
		id: "led-intro",
		text: (
			<div>
				<h2 className="text-3xl font-bold mb-4">Introduction to Photosynthesis</h2>
				<p className="mb-4 text-2xl">
					Photosynthesis is one of nature&apos;s most remarkable processes. It&apos;s how plants convert sunlight
					into energy, producing oxygen as a byproduct. This process is essential for all life on Earth.
				</p>
				<img
					src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
					alt="Overview of photosynthesis"
					className="w-1/4 rounded-lg mb-4 shadow-lg"
				/>
				<p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 italic">
					Figure 1: Overview diagram of the photosynthesis process
				</p>
			</div>
		),
		action: { type: "continue" },
	},
	{
		id: "led-process-overview",
		text: (
			<div>
				<h3 className="text-3xl font-bold mb-3">The Process Overview</h3>
				<p className="mb-4 text-2xl">
					During photosynthesis, plants take in carbon dioxide from the air and water from the soil.
					Using sunlight as energy, they convert these ingredients into glucose and oxygen.
				</p>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "What are the main ingredients needed for photosynthesis?",
						choices: [
							{
								text: "Oxygen and water",
								correct: false,
								explanation: "While water is needed, oxygen is actually a product of photosynthesis, not an ingredient.",
								answerChoiceId: 1
							},
							{
								text: "Carbon dioxide and water",
								correct: true,
								explanation: "Correct! Plants use carbon dioxide from the air \
								and water from the soil as the main ingredients.",
								answerChoiceId: 2
							},
							{
								text: "Glucose and oxygen",
								correct: false,
								explanation: "These are actually the products of photosynthesis, not the ingredients.",
								answerChoiceId: 3
							},
							{
								text: "Test text",
								correct: false,
								explanation: "Test explanation.",
								answerChoiceId: 4
							}
						],
						questionUUID: "102929393" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "led-light-reaction",
		text: (
			<div>
				<h3 className="text-xl font-bold mb-3">The Light-Dependent Reaction</h3>
				<p className="mb-4 text-2xl">
					The first stage of photosynthesis is the light-dependent reaction. This occurs in the
					thylakoid membrane of the chloroplast, where chlorophyll molecules capture sunlight.
				</p>
			</div>
		),
		action: {
			type: "continue"
		},
	},
	{
		id: "led-dark-reaction",
		text: (
			<div>
				<h3 className="text-xl font-bold mb-3">The Calvin Cycle (Dark Reaction)</h3>
				<p className="mb-4 text-2xl">
					The second stage is the Calvin Cycle, also known as the dark reaction. This process doesn&apos;t
					require direct sunlight and uses the products from the light-dependent reaction to produce glucose.
				</p>
			</div>
		),
		action: {
			type: "quiz",
			quiz: {
				questions: [
					{
						question: "Why is the Calvin Cycle called the dark reaction?",
						choices: [
							{
								text: "Because it can only happen at night",
								correct: false,
								explanation: "The Calvin Cycle can occur any time, not just at night.",
								answerChoiceId: 1
							},
							{
								text: "Because it happens in dark areas of the plant",
								correct: false,
								explanation: "The location of the reaction isn't related to its name.",
								answerChoiceId: 2
							},
							{
								text: "Because it doesn't directly require sunlight",
								correct: true,
								explanation: "Correct! While it uses products from the light-dependent reaction,\
								the Calvin Cycle itself doesn't require direct sunlight.",
								answerChoiceId: 3
							},
							{
								text: "Test text",
								correct: false,
								explanation: "Test explanation.",
								answerChoiceId: 4
							},
						],
						questionUUID: "u19230123910" as QuestionUUID
					},
					{
						question: "What is the main product of the Calvin Cycle?",
						choices: [
							{
								text: "Glucose",
								correct: true,
								explanation: "Correct! The Calvin Cycle produces glucose as its main product.",
								answerChoiceId: 1
							},
							{
								text: "Oxygen",
								correct: false,
								explanation: "Oxygen is produced during the light-dependent reaction, not the Calvin Cycle.",
								answerChoiceId: 2
							},
							{
								text: "Carbon dioxide",
								correct: false,
								explanation: "Carbon dioxide is an ingredient used in the Calvin Cycle, not a product.",
								answerChoiceId: 3
							},
							{
								text: "Test text",
								correct: false,
								explanation: "Test explanation.",
								answerChoiceId: 4
							},
						],
						questionUUID: "29031230123" as QuestionUUID
					}
				]
			}
		}
	},
	{
		id: "led-conclusion",
		text: (
			<div>
				<h3 className="text-xl font-bold mb-3">Conclusion</h3>
				<p className="mb-4 text-2xl">
					Understanding photosynthesis helps us appreciate how plants sustain life on Earth. This
					process not only provides food for plants but also produces the oxygen we breathe.
				</p>
			</div>
		),
		action: { type: null }
	}
]

export default ledReadingBlocks
