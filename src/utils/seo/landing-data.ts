// Comprehensive Organization Schema
const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"name": "Lever Labs",
	"alternateName": "Lever Labs Robotics",
	"url": "https://www.leverlabs.com",
	"logo": {
		"@type": "ImageObject",
		"url": "https://www.leverlabs.com/logo512.png",
		"width": 512,
		"height": 512
	},
	// eslint-disable-next-line max-len
	"description": "Duolingo for Robotics. Educational robotics platform designed to make learning coding and robotics fun, engaging, and accessible for learners of all ages.",
	"slogan": "Like Duolingo, for robotics",
	"foundingDate": "2025", // Update with actual founding year

	// Contact information
	"email": "hello@leverlabs.com", // Update with actual email
	"contactPoint": {
		"@type": "ContactPoint",
		"contactType": "Customer Support",
		"email": "hello@leverlabs.com", // Update with actual email
		"url": "https://www.leverlabs.com/contact",
		"availableLanguage": ["English"]
	},

	// Social media profiles
	"sameAs": [
		"https://twitter.com/lever_labs",
		"https://www.linkedin.com/company/lever-labs",
		"https://www.instagram.com/lever_labs",
		"https://www.youtube.com/@lever_labs",
		"https://github.com/lever-labs"
	],

	// What you offer
	"offers": {
		"@type": "Offer",
		"category": "Educational Robotics",
		"description": "Interactive robotics learning platform with Pip robot"
	},

	// Target audience
	"audience": {
		"@type": "EducationalAudience",
		"educationalRole": "student",
		"audienceType": "Students, Educators, Parents"
	},

	// Business categories
	"knowsAbout": [
		"Robotics Education",
		"STEM Learning",
		"Programming Education",
		"Educational Technology",
		"Coding for Kids"
	],

	// Geographic area served
	"areaServed": {
		"@type": "Country",
		"name": "United States"
	}
}

// WebSite schema for search box and site navigation
const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"name": "Lever Labs",
	"url": "https://www.leverlabs.com",
	"description": "Duolingo for Robotics",
	"publisher": {
		"@type": "Organization",
		"name": "Lever Labs"
	},
	// Enables Google to show a search box in search results
	"potentialAction": {
		"@type": "SearchAction",
		"target": {
			"@type": "EntryPoint",
			"urlTemplate": "https://www.leverlabs.com/search?q={search_term_string}"
		},
		"query-input": "required name=search_term_string"
	}
}

// Product schema for Pip robot
const productSchema = {
	"@context": "https://schema.org",
	"@type": "Product",
	"name": "Pip Educational Robot",
	"description": "Educational robot designed to make learning robotics fun and seamless. Perfect for students ages 8 and up.",
	"brand": {
		"@type": "Brand",
		"name": "Lever Labs"
	},
	"image": "https://www.leverlabs.com/pip_square_1200.jpg", // Square, 1200×1200px
	"category": "Educational Robotics",
	"audience": {
		"@type": "PeopleAudience",
		"suggestedMinAge": 8
	},
	"offers": {
		"@type": "Offer",
		"price": "200.00", // Your actual price
		"priceCurrency": "USD",
		"availability": "https://schema.org/PreOrder", // ✅ Use this for pre-orders
		"url": "https://www.leverlabs.com/preorder", // Or wherever pre-order form is
	},
	"aggregateRating": {
		"@type": "AggregateRating",
		"ratingValue": "4.8",
		"reviewCount": "150", // Update with actual data
		"bestRating": "5",
		"worstRating": "1"
	}
}

// Combine all schemas
export const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		organizationSchema,
		websiteSchema,
		productSchema
	]
}
