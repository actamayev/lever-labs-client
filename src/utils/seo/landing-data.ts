/* eslint-disable max-len */
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

		// 1. Price validity (fixes the warning)
		"priceValidUntil": "2026-12-31",

		"availabilityStarts": "2026-01-01",

		// 3. Return policy (NEW - fixes warning)
		"hasMerchantReturnPolicy": {
			"@type": "MerchantReturnPolicy",
			"returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
			"merchantReturnDays": 30,
			"returnMethod": "https://schema.org/ReturnByMail",
			"returnFees": "https://schema.org/FreeReturn",
			"applicableCountry": "US"
		}
	},
	"aggregateRating": {
		"@type": "AggregateRating",
		"ratingValue": "4.8",
		"reviewCount": "151", // Update with actual data
		"bestRating": "5",
		"worstRating": "2"
	}
}

// Complete FAQ Schema using your FAQ items
const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	"mainEntity": [
		{
			"@type": "Question",
			"name": "Who is Pip for?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Pip is designed for kids ages 8 and up who want to learn robotics and coding. That said, adults love Pip too - if you're curious about STEM and want hands-on learning, age is just a number!"
			}
		},
		{
			"@type": "Question",
			"name": "What does Pip do?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Like all robots, Pip has a job. Pip's job is to help you improve your understanding of robotics and coding through hands-on, interactive learning experiences."
			}
		},
		{
			"@type": "Question",
			"name": "Are there recurring subscription fees?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Nope. Buy Pip once, then use it, along with our web portal, for free, forever."
			}
		},
		{
			"@type": "Question",
			"name": "Does Pip work wirelessly or with a cable?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Pip works completely wirelessly! After a quick initial setup where you connect Pip to your Wi-Fi, you can control and program Pip from anywhere without any cables."
			}
		},
		{
			"@type": "Question",
			"name": "How much does Pip cost?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Customers pay a one-time $200 fee to buy a Pip, then get lifetime access to software updates. No hidden fees, no surprises."
			}
		},
		{
			"@type": "Question",
			"name": "What comes included with Pip?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Your Pip comes ready to use right out of the box with a USB-C charging cable, quick start guide, and lifetime access to our complete learning platform."
			}
		},
		{
			"@type": "Question",
			"name": "What is your return policy?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "We offer a 30-day return policy. If Pip isn't the right fit, simply contact our support team to initiate a return. Products must be in their original condition."
			}
		},
		{
			"@type": "Question",
			"name": "How can I contact customer support?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Our support team is here to help! You can reach us via email at hello@leverlabs.com. We try our best to respond within a couple hours."
			}
		}
	]
}

// Then add to your existing structuredData @graph:
export const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		organizationSchema,
		websiteSchema,
		productSchema,
		faqSchema
	]
}
