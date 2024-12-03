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
				<span className="font-semibold">New to control theory? No problem!</span> We were all beginners once.
		Our step-by-step labs break down this complex challenge into bite-sized concepts, helping you build
		your solution from the ground up.
			</p>
		</div>
	</div>
)

// For the obstacle detection description
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
	</div>
)

export const LineFollowingDescription = () => (
	<div className="space-y-4">
		<p className="text-lg">
	Watch Pip navigate any path with precision! Using its line sensors, Pip can follow tracks,
	stay in its lane, and even handle complex intersections - just like a tiny autonomous vehicle.
		</p>

		<div className="mt-4">
			<p className="font-semibold mb-2">You'll learn to use Pip's:</p>
			<ul className="space-y-2 ml-4">
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>Line sensors for path detection</span>
				</li>
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>PID control for smooth tracking</span>
				</li>
				<li className="flex items-center">
					<div className="w-2 h-2 bg-primary rounded-full mr-2" />
					<span>Motor control for precise steering</span>
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

		<div className="mt-4">
			<p className="font-semibold mb-2">Popular multi-Pip activities:</p>
			<ul className="space-y-2 ml-4 grid grid-cols-2 gap-x-4">
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

		<div className="bg-accent/50 p-4 rounded-lg">
			<p className="text-base">
				<span className="font-semibold">Experience real robotics coordination!</span> Learn how
		robots communicate, coordinate movements, and work together to accomplish tasks - just like
		in modern warehouses and factories.
			</p>
		</div>
	</div>
)

export const SensorSuiteDescription = () => (
	<div className="space-y-4">
		<p className="text-lg">
	Pip comes packed with professional-grade sensors that you'd find in real robots!
	From precise motion tracking to advanced distance sensing, Pip has everything you need
	to explore the world of robotics.
		</p>

		<div className="mt-4">
			<p className="font-semibold mb-2">Pip's complete sensor suite:</p>
			<ul className="space-y-3 ml-4">
				<li className="flex items-start">
					<div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2" />
					<div>
						<span className="font-medium">9-Axis IMU (BNO085)</span>
						<p className="text-muted-foreground">Track orientation, acceleration, and motion with professional precision</p>
					</div>
				</li>
				<li className="flex items-start">
					<div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2" />
					<div>
						<span className="font-medium">2× Time of Flight Sensors (VL53L5CX)</span>
						<p className="text-muted-foreground">Measure distances with millimeter accuracy for precise navigation</p>
					</div>
				</li>
				<li className="flex items-start">
					<div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2" />
					<div>
						<span className="font-medium">3× Color Sensor (VEML6040A30G)</span>
						<p className="text-muted-foreground">Detect RGBW colors for advanced environmental interaction</p>
					</div>
				</li>
				<li className="flex items-start">
					<div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2" />
					<div>
						<span className="font-medium">2× Dual Hall Effect Encoders + Motors</span>
						<p className="text-muted-foreground">98RPM motors with precise position tracking for controlled movement</p>
					</div>
				</li>
				<li className="flex items-start">
					<div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2" />
					<div>
						<span className="font-medium">5× RGB LEDs</span>
						<p className="text-muted-foreground">Create dazzling light displays and visual indicators</p>
					</div>
				</li>
				<li className="flex items-start">
					<div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2" />
					<div>
						<span className="font-medium">2× Programmable Buttons</span>
						<p className="text-muted-foreground">Add custom controls and interactions to your robot</p>
					</div>
				</li>
			</ul>
		</div>

		<div className="bg-accent/50 p-4 rounded-lg">
			<p className="text-base">
				<span className="font-semibold">Expandable Capabilities:</span> Add optional modules
				like cameras and laser pointers to extend Pip's functionality even further!
			</p>
		</div>
	</div>
)
