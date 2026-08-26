import type { Course } from "../types";

export const shopifyEcommerce: Course = {
	description:
		"A free, practical course covering how to find products worth selling, build a Shopify store that converts, and run Meta Ads that acquire customers.",
	modules: [
		{
			blurb:
				"Find products worth selling and prove demand before you spend money on inventory or ads.",
			lessons: [
				{
					// PLACEHOLDER CONTENT. Replace body, takeaways, chapters, resources and the
					// video id with the real lesson once the Tella recordings are wired up.
					body: [
						"This course is the process Edgecoms uses when we build a Shopify store for a client, cut down to what one person can run alone. It is deliberately ordered. Module 01 finds a product worth selling, Module 02 turns it into a store, and Module 03 buys the traffic. Running those out of order is the most common way new stores lose money.",
						"You do not need a product, a store, or an ad budget to start. You need a way to take notes and a willingness to throw away your first few product ideas.",
					],
					chapters: [
						{ at: "00:00", label: "What this course is" },
						{ at: "01:12", label: "Who it is for" },
						{ at: "02:40", label: "How the modules fit together" },
						{ at: "04:05", label: "What you need before starting" },
					],
					resources: [
						{ href: "https://edgecoms.com", kind: "link", label: "Edgecoms" },
					],
					slug: "introduction",
					summary:
						"What this course covers, how the three modules fit together, and what you need before you start.",
					takeaways: [
						"The order of the modules is the point. Traffic sent to an unvalidated product loses money faster, not slower.",
						"Validation is about spending as little as possible to learn whether people will buy.",
						"Most product ideas fail on margin, not on demand. Learn to check margin first.",
					],
					title: "Introduction",
					video: { id: "REPLACE_WITH_TELLA_VIDEO_ID", provider: "tella" },
				},
				{
					slug: "choosing-a-niche",
					summary:
						"How to pick a market you can actually compete in, and the niches that quietly kill new stores.",
					title: "Choosing a Niche",
				},
				{
					slug: "finding-products",
					summary:
						"Where product ideas actually come from, and how to build a shortlist worth researching.",
					title: "Finding Products",
				},
				{
					slug: "product-research",
					summary:
						"Reading demand, competition, and margin before you commit money to a product.",
					title: "Product Research",
				},
				{
					slug: "product-validation",
					summary:
						"Cheap tests that tell you whether people will buy, before you order inventory.",
					title: "Product Validation",
				},
				{
					slug: "supplier-research",
					summary:
						"Finding suppliers who can deliver on time, and the questions that expose the ones who cannot.",
					title: "Supplier Research",
				},
				{
					slug: "pricing",
					summary:
						"Building a price that survives ad costs, shipping, and returns, and still leaves you a margin.",
					title: "Pricing",
				},
				{
					slug: "preparing-for-launch",
					summary:
						"Turning a validated product into something you are ready to put a store and a budget behind.",
					title: "Preparing for Launch",
				},
			],
			number: "01",
			slug: "find-validate-products",
			title: "Find & Validate Products",
		},
		{
			blurb:
				"Build a Shopify store that reads as a real business and converts the traffic you send it.",
			lessons: [
				{
					slug: "shopify-setup",
					summary:
						"Creating your store, the settings that matter on day one, and the ones you can safely ignore.",
					title: "Shopify Setup",
				},
				{
					slug: "store-structure",
					summary:
						"Collections, products, and pages arranged so customers find things without thinking.",
					title: "Store Structure",
				},
				{
					slug: "theme-selection",
					summary:
						"Choosing a theme you can live with, and why the expensive one is usually not the answer.",
					title: "Theme Selection",
				},
				{
					slug: "homepage",
					summary:
						"What belongs above the fold, what belongs below it, and what belongs nowhere.",
					title: "Homepage",
				},
				{
					slug: "product-pages",
					summary:
						"The page that does the selling: images, copy, options, and objection handling.",
					title: "Product Pages",
				},
				{
					slug: "navigation",
					summary:
						"Menus, search, and filtering that shorten the path from landing to cart.",
					title: "Navigation",
				},
				{
					slug: "branding",
					summary:
						"Building a look that reads as a real business without hiring a design agency.",
					title: "Branding",
				},
				{
					slug: "trust-elements",
					summary:
						"Reviews, policies, and signals that answer 'is this a real store' before the customer asks.",
					title: "Trust Elements",
				},
				{
					slug: "conversion-optimization",
					summary:
						"Finding where visitors drop off, and fixing the causes in order of impact.",
					title: "Conversion Optimization",
				},
				{
					slug: "checkout",
					summary:
						"Shipping, payments, and taxes configured so the last step does not lose the sale.",
					title: "Checkout",
				},
				{
					slug: "launch-preparation",
					summary:
						"The checks to run before you send your first paid visitor to the store.",
					title: "Launch Preparation",
				},
			],
			number: "02",
			slug: "build-shopify-store",
			title: "Build Your Shopify Store",
		},
		{
			blurb:
				"Acquire customers with Meta Ads, from account setup through to scaling what works.",
			lessons: [
				{
					slug: "meta-business-manager",
					summary:
						"Setting up Business Manager properly so you never lose access to your own assets.",
					title: "Meta Business Manager",
				},
				{
					slug: "ad-account-setup",
					summary:
						"Ad accounts, payment methods, and permissions, configured to survive growth.",
					title: "Ad Account Setup",
				},
				{
					slug: "pixel-and-tracking",
					summary:
						"Installing the Pixel and Conversions API so Meta can see what it is optimizing for.",
					title: "Pixel & Tracking",
				},
				{
					slug: "campaign-structure",
					summary:
						"Laying out campaigns and ad sets so results stay readable and budgets stay controllable.",
					title: "Campaign Structure",
				},
				{
					slug: "creative-strategy",
					summary:
						"The ads that do the work: angles, formats, and how many you need before judging anything.",
					title: "Creative Strategy",
				},
				{
					slug: "targeting",
					summary:
						"Audiences, broad targeting, and how much of this Meta now decides for you.",
					title: "Targeting",
				},
				{
					slug: "launching-campaigns",
					summary:
						"Budgets, bidding, and getting through the first days of a campaign calmly.",
					title: "Launching Campaigns",
				},
				{
					slug: "reading-results",
					summary:
						"Which metrics mean something, which are noise, and when you have enough data to act.",
					title: "Reading Results",
				},
				{
					slug: "optimization",
					summary:
						"Cutting what fails and feeding what works, without resetting learning every week.",
					title: "Optimization",
				},
				{
					slug: "scaling",
					summary:
						"Increasing spend while keeping the underlying economics intact.",
					title: "Scaling",
				},
			],
			number: "03",
			slug: "run-meta-ads",
			title: "Run Meta Ads",
		},
	],
	slug: "shopify-ecommerce",
	tagline: "Build your Shopify business from zero.",
	title: "Shopify Ecommerce",
};
