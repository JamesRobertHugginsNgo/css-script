function process(config = {}) {
	const content = [];

	for (const key in config) {
		let value = config[key];

		if (Array.isArray(value)) {
			if (key === 'font-family') {
				value = value.join(', ');
			} else {
				value = value.join(' ');
			}
		}

		if (typeof value === 'object' && value) {
			content.push(key, '{', ...process(value), '}');
		} else {
			content.push(`${key}: ${value};`);
		}
	}

	return content;
}

export default function (config) {
	return process(config).join(' ');
}

export function prefix(property, value, prefixes = ['-webkit-', '-moz-', '-o-', '-ms-']) {
	const properties = {};

	for (let index = 0, length = prefixes.length; index < length; index++) {
		const prefix = prefixes[index];
		properties[`${prefix}${property}`] = value;
	}

	properties[property] = value;
	return properties;
}

export function merge(target, config) {
	for (const key in config) {
		if (typeof config[key] === 'object' && config[key]) {
			if (!target[key] || typeof target[key] !== 'object') {
				target[key] = {};
			}
			merge(target[key], config[key]);
		} else if (target[key] !== config[key]) {
			target[key] = config[key];
		}
	}

	return target;
}
