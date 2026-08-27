interface LearnTrailProps {
	segments: string[];
}

/** The top-bar breadcrumb: muted ancestors, current page in full contrast. */
export function LearnTrail({ segments }: LearnTrailProps) {
	const last = segments.length - 1;

	return (
		<nav aria-label="Breadcrumb" className="min-w-0">
			<ol className="flex min-w-0 flex-nowrap items-center gap-1.5 text-sm">
				{segments.map((segment, index) => (
					<li className="flex min-w-0 items-center gap-1.5" key={segment}>
						{index > 0 ? (
							<span aria-hidden="true" className="text-muted-foreground/40">
								/
							</span>
						) : null}
						<span
							className={
								index === last
									? "truncate text-foreground"
									: "hidden truncate text-muted-foreground sm:inline"
							}
							{...(index === last ? { "aria-current": "page" } : {})}
						>
							{segment}
						</span>
					</li>
				))}
			</ol>
		</nav>
	);
}
