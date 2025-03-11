const thousandsFormatter = Intl.NumberFormat(undefined, {
	maximumFractionDigits: 1,
});

export const formatThousands = (n: number) => thousandsFormatter.format(n);

export function formatNano(nanos: number): string {
	if (nanos < 1_000) {
		return `${formatThousands(nanos)}ns`;
	}
	return `${(nanos / 1_000).toFixed(1)}µs`;
}

export function chooseColor(backend: string): string {
	// Define a diverse color palette with visually distinct colors
	const colorPalette = [
		"#f472b6", // Original pink
		"#3b82f6", // Blue
		"#10b981", // Green
		"#f59e0b", // Amber
		"#ef4444", // Red
		"#8b5cf6", // Purple
		"#14b8a6", // Teal
		"#f97316", // Orange
		"#6366f1", // Indigo
		"#84cc16", // Lime
		"#ec4899", // Fuchsia
		"#06b6d4", // Cyan
		"#a855f7", // Violet
		"#64748b", // Slate
	];

	// Use a simple hash function to select a color based on the backend name
	let hash = 0;
	for (let i = 0; i < backend.length; i++) {
		hash = ((hash << 5) - hash) + backend.charCodeAt(i);
		hash = hash & hash; // Convert to 32bit integer
	}

	// Ensure positive index by using Math.abs and select a color from the palette
	const colorIndex = Math.abs(hash) % colorPalette.length;
	return colorPalette[colorIndex];
}

export function isLsm(backend: string): boolean {
	if (backend.includes("redb")) {
		return false;
	}
	if (backend.includes("sled")) {
		return false;
	}
	if (backend.includes("localfjall")) {
		return true;
	}
	if (backend.includes("fjall")) {
		return true;
	}
	if (backend.includes("rocksdb")) {
		return true;
	}
	if (backend.includes("heed")) {
		return false;
	}
	if (backend.includes("sqlite")) {
		return false;
	}
	return false;
}

