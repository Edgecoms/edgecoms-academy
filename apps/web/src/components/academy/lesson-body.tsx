import type { LessonBlock, LessonInline } from "@/content/types";

/**
 * Keys come from a running character offset rather than the array index, so
 * they stay stable and unique even when a paragraph repeats the same word.
 */
function keyed(nodes: LessonInline[]) {
	let offset = 0;
	return nodes.map((node) => {
		const text = typeof node === "string" ? node : node.label;
		const key = `${offset}:${text}`;
		offset += text.length;
		return { key, node };
	});
}

function Inline({ nodes }: { nodes: LessonInline[] }) {
	return (
		<>
			{keyed(nodes).map(({ key, node }) =>
				typeof node === "string" ? (
					<span key={key}>{node}</span>
				) : (
					<a
						className="underline decoration-border underline-offset-[3px] transition-colors hover:decoration-foreground"
						href={node.href}
						key={key}
						// only send readers off-site in a new tab; in-course links navigate normally
						{...(node.href.startsWith("/")
							? {}
							: { rel: "noopener", target: "_blank" })}
					>
						{node.label}
					</a>
				)
			)}
		</>
	);
}

function blockKey(block: LessonBlock, position: number) {
	if (block.type === "list") {
		return `${position}:list:${block.items.length}`;
	}
	if (block.type === "paragraph") {
		return `${position}:p`;
	}
	return `${position}:${block.type}:${block.text}`;
}

function Block({ block }: { block: LessonBlock }) {
	if (block.type === "heading") {
		return (
			<h2 className="mt-2 font-semibold text-base tracking-tight">
				{block.text}
			</h2>
		);
	}

	if (block.type === "list") {
		return (
			<ul className="ml-5 flex list-disc flex-col gap-2 marker:text-muted-foreground">
				{block.items.map((item) => (
					<li
						className="pl-1 text-base leading-relaxed"
						key={keyed(item)[0]?.key}
					>
						<Inline nodes={item} />
					</li>
				))}
			</ul>
		);
	}

	if (block.type === "quote") {
		return (
			<blockquote className="border-border border-l-2 pl-4 font-semibold text-base italic leading-relaxed">
				{`“${block.text}”`}
			</blockquote>
		);
	}

	return (
		<p className="text-base leading-relaxed">
			<Inline nodes={block.content} />
		</p>
	);
}

export function LessonBody({ blocks }: { blocks: LessonBlock[] }) {
	return (
		<div className="flex flex-col gap-5">
			{blocks.map((block, position) => (
				<Block block={block} key={blockKey(block, position)} />
			))}
		</div>
	);
}
