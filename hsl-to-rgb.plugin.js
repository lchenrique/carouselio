const plugin = require('tailwindcss/plugin');

function hslToRgb(h, s, l) {
	h /= 360;
	s /= 100;
	l /= 100;
	let r, g, b;

	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

module.exports = plugin(function ({ addBase, theme }) {
	const convertedColors = {};

	Object.entries(theme('colors')).forEach(([key, value]) => {
		if (typeof value === 'string' && value.startsWith('hsl(var(--')) {
			const varName = value.match(/var\((.*?)\)/)[1];
			convertedColors[key] = `rgb(var(--rgb-${varName}))`;
		} else if (typeof value === 'object') {
			convertedColors[key] = {};
			Object.entries(value).forEach(([subKey, subValue]) => {
				if (
					typeof subValue === 'string' &&
					subValue.startsWith('hsl(var(--')
				) {
					const varName = subValue.match(/var\((.*?)\)/)[1];
					convertedColors[key][subKey] = `rgb(var(--rgb-${varName}))`;
				}
			});
		}
	});

	addBase({
		':root': {
			...Object.fromEntries(
				Object.entries(theme('colors'))
					.filter(
						([, value]) =>
							typeof value === 'string' &&
							value.startsWith('hsl(var(--'),
					)
					.map(([key, value]) => {
						const varName = value.match(/var\((.*?)\)/)[1];
						return [`--rgb-${varName}`, `var(--${varName}-rgb)`];
					}),
			),
			...Object.fromEntries(
				Object.entries(theme('colors'))
					.filter(([, value]) => typeof value === 'object')
					.flatMap(([, subValues]) =>
						Object.entries(subValues)
							.filter(
								([, value]) =>
									typeof value === 'string' &&
									value.startsWith('hsl(var(--'),
							)
							.map(([, value]) => {
								const varName = value.match(/var\((.*?)\)/)[1];
								return [
									`--rgb-${varName}`,
									`var(--${varName}-rgb)`,
								];
							}),
					),
			),
		},
	});
});
