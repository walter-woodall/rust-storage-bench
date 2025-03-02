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
	if (backend.includes("monkey")) {
		return "#ffffff";
	}
	return "#f472b6"
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

