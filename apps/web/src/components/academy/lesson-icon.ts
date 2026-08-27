import {
	BarChart3,
	Compass,
	CreditCard,
	Image as ImageIcon,
	Landmark,
	Layers,
	type LucideIcon,
	Megaphone,
	PackageSearch,
	Puzzle,
	Rocket,
	Settings,
	ShieldCheck,
	SlidersHorizontal,
	Store,
	Target,
	LayoutTemplate as Template,
	Truck,
} from "lucide-react";

/**
 * Lessons carry no icon field, so the glyph is mapped here by slug. Hand-mapped
 * rather than hashed: a hash over a fixed pool collides, which showed up as the
 * same icon repeating several times down the sidebar.
 */
const LESSON_ICONS: Record<string, LucideIcon> = {
	"choosing-your-niche": Target,
	"configuring-conversion-apps": SlidersHorizontal,
	"ecommerce-business-models": Layers,
	"finding-winning-products": PackageSearch,
	"install-trackproof": ShieldCheck,
	"installing-conversion-apps": Puzzle,
	"introduction-to-dropshipping": Truck,
	"launching-your-first-campaign": Rocket,
	"meta-ads-account-setup": CreditCard,
	"meta-ads-fundamentals": Megaphone,
	"monitor-and-analyze-meta-ads": BarChart3,
	"product-hero-images": ImageIcon,
	"products-and-themes": Template,
	"shopify-account-setup": Store,
	"shopify-backend-setup": Settings,
	"store-build-introduction": Compass,
	"us-business-entity": Landmark,
};

/** Keeps a lesson added later from rendering nothing. */
const FALLBACK_ICON: LucideIcon = Compass;

export function lessonIcon(slug: string): LucideIcon {
	return LESSON_ICONS[slug] ?? FALLBACK_ICON;
}

/** Exported for the content check, which asserts every lesson is mapped. */
export function hasLessonIcon(slug: string): boolean {
	return slug in LESSON_ICONS;
}
