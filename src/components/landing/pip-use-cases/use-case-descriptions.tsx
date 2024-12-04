// TODO: Confirm each section has a descriptive footer section

/* eslint-disable react/no-unescaped-entities */
export const BalancingDescription = () => (
	<div className="space-y-4">
		<p className="text-lg">
			Ever seen a dog stand on its hind legs? That's what we're teaching Pip to do! Using its IMU and motors,
			Pip can balance upright on two wheels - a classic robotics challenge called the "inverted pendulum."
		</p>

		<div className="mt-4">
			<p className="font-semibold mb-2">You'll learn to use Pip's:</p>
			<ul className="space-y-2 ml-4">
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>IMU for measuring tilt and acceleration</span>
				</li>
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>Motors for dynamic balance control</span>
				</li>
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>Control algorithms for stability</span>
				</li>
			</ul>
		</div>

		<div className="bg-accent/50 p-4 rounded-lg">
			<p className="text-base">
				<span className="font-semibold">New to control theory? No problem!</span>
				&nbsp;We were all beginners once.
				Our step-by-step labs break down this complex challenge into bite-sized concepts, helping you build
				your solution from the ground up.
			</p>
		</div>
	</div>
)

export const ObstacleDescription = () => (
	<div className="space-y-4">
		<p className="text-lg">
            Guide Pip through a mysterious maze to find the golden treasure! Once found, celebrate with
            a victory dance and a dazzling light show. 🎉
		</p>

		<div className="mt-4">
			<p className="font-semibold mb-2">You'll learn to use Pip's:</p>
			<ul className="space-y-2 ml-4">
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>Distance sensors for maze navigation</span>
				</li>
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>Motors for precise movement control</span>
				</li>
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>LEDs for celebratory light patterns</span>
				</li>
			</ul>
		</div>

		<div className="bg-accent/50 p-4 rounded-lg">
			<p className="text-base">
				<span className="font-semibold">Ready for an adventure?</span>
				&nbsp;Start with basic obstacle courses and progress to complex mazes.
                Each challenge teaches you new ways to use Pip's sensors and helps you become a better roboticist!
			</p>
		</div>
	</div>
)

export const LineFollowingDescription = () => (
	<div className="space-y-4">
		<p className="text-lg">
	Watch Pip navigate any path with precision! Using three RGB sensors on it's underside, Pip can follow tracks of any color,
	stay in its lane, and even handle complex intersections - just like a tiny autonomous vehicle.
		</p>

		<div className="mt-4">
			<p className="font-semibold mb-2">You'll learn to use Pip's:</p>
			<ul className="space-y-2 ml-4">
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>RGB sensors for color detection and path following</span>
				</li>
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>PID control for smooth tracking</span>
				</li>
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>Motor control for exact steering</span>
				</li>
			</ul>
		</div>

		<div className="bg-accent/50 p-4 rounded-lg">
			<p className="text-base">
		Start with simple paths and work your way up to complex tracks with intersections,
		curves, and varying line widths. Perfect for learning the basics of autonomous navigation!
			</p>
		</div>
	</div>
)

export const CollaborativeRobotsDescription = () => (
	<div className="space-y-4">
		<p className="text-lg">
            Why use one Pip when you can have many? Discover the exciting world of multi-robot systems
            where Pips work together in various fun and educational scenarios!
		</p>

		<div className="mt-4 w-full">
			<p className="font-semibold mb-2">Popular multi-Pip activities:</p>
			{/* Change from grid to flex with a wrapper */}
			<div className="w-full flex flex-wrap">
				<div className="w-1/2">
					<ul className="space-y-2 ml-4">
						<li className="flex items-center">
							<div className="w-2 h-2 bg-primary rounded-full mr-2" />
							<span>Bumper Cars</span>
						</li>
						<li className="flex items-center">
							<div className="w-2 h-2 bg-primary rounded-full mr-2" />
							<span>Robot Races</span>
						</li>
						<li className="flex items-center">
							<div className="w-2 h-2 bg-primary rounded-full mr-2" />
							<span>Robot Tag</span>
						</li>
					</ul>
				</div>
				<div className="w-1/2">
					<ul className="space-y-2 ml-4">
						<li className="flex items-center">
							<div className="w-2 h-2 bg-primary rounded-full mr-2" />
							<span>City Streets</span>
						</li>
						<li className="flex items-center">
							<div className="w-2 h-2 bg-primary rounded-full mr-2" />
							<span>Team Challenges</span>
						</li>
						<li className="flex items-center">
							<div className="w-2 h-2 bg-primary rounded-full mr-2" />
							<span>Traffic Following</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div className="bg-accent/50 p-4 rounded-lg">
			<p className="text-base">
				<span className="font-semibold">Experience real robotics coordination!</span> Learn how
                robots communicate, coordinate movements, and work together to accomplish tasks - just like
                in modern warehouses and factories.
			</p>
		</div>
	</div>
)
