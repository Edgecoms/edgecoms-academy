import type { Metadata } from "next";
import { AcademyHero } from "@/components/academy/academy-hero";
import { EnrollmentCtaSection } from "@/components/academy/enrollment-cta-section";
import { FAQSection } from "@/components/academy/faq-section";
import { FeaturesShowcaseSection } from "@/components/academy/features-showcase-section";
import { MentorsSection } from "@/components/academy/mentors-section";
import { SuccessStoriesSection } from "@/components/academy/success-stories-section";
import { TheModelSection } from "@/components/academy/the-model-section";
import { ValuePillarsSection } from "@/components/academy/value-pillars-section";
import { getCourseTotals } from "@/content";

const COURSE_SLUG = "shopify-ecommerce";
const AUDIT_URL = "https://calendly.com/anurag-edgecoms/book-a-free-call";

export const metadata: Metadata = {
	alternates: { canonical: "/academy" },
	description:
		"Free, practical ecommerce education covering how to find products worth selling, build a Shopify store, and run Meta Ads. No payment, no credit card.",
	title: "Build your Shopify business from zero | Edgecoms Academy",
};

export default function AcademyPage() {
	const totals = getCourseTotals(COURSE_SLUG);

	return (
		<main className="flex-1">
			{/* 1. Hero Section */}
			<AcademyHero
				auditUrl={AUDIT_URL}
				totalLessons={totals.lessons}
				totalModules={totals.modules}
			/>

			{/* 2. Mentors & Operator Track Record Section */}
			<MentorsSection />

			{/* 3. Success Stories & Proof Wall */}
			<SuccessStoriesSection />

			{/* 4. What's Inside & Platform Features */}
			<FeaturesShowcaseSection />

			{/* 5. Unlock True Potential & Value Pillars */}
			<ValuePillarsSection />

			{/* 6. The Model (Sell first. Buy second. - Redesigned with new design system) */}
			<TheModelSection />

			{/* 7. Frequently Asked Questions */}
			<FAQSection />

			{/* 8. Final Enrollment CTA */}
			<EnrollmentCtaSection />
		</main>
	);
}
