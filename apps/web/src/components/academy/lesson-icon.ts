import {
	BarChart3,
	Boxes,
	Compass,
	CreditCard,
	Layers,
	type LucideIcon,
	Megaphone,
	PackageSearch,
	Palette,
	Rocket,
	ShoppingCart,
	Target,
	Truck,
} from "lucide-react";

const LESSON_ICONS: LucideIcon[] = [
	Compass,
	PackageSearch,
	Target,
	Layers,
	ShoppingCart,
	Palette,
	CreditCard,
	Truck,
	Megaphone,
	BarChart3,
	Boxes,
	Rocket,
];

/**
 * Cards need a glyph each and the content has no icon field, so derive one from
 * the slug. Hashing rather than indexing keeps a lesson's icon stable when
 * lessons are reordered or inserted.
 */
export function lessonIcon(slug: string): LucideIcon {
	let hash = 0;
	for (const character of slug) {
		hash = (hash * 31 + character.charCodeAt(0)) % 100_000;
	}
	// biome-ignore lint/style/noNonNullAssertion: modulo of a non-empty array is always in range
	return LESSON_ICONS[hash % LESSON_ICONS.length]!;
}
