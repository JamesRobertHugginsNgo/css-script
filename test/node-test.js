// const fs = import('fs');
import fs from 'fs';

import { default as render, prefix } from '../index.js';

const content = render({
	'@media all': {
		'body': {
			'background-color': '#ffffff',
			'color': '#000000',
			'font-family': [
				'"HelveticaNeue-Light"',
				'"Helvetica Neue Light"',
				'"Helvetica Neue"',
				'Helvetica',
				'Arial',
				'"Lucida Grande"',
				'sans-serif'
			],
			'font-weight': 300
		},
		'body > header': {
			'background-color': '#000000',
			'color': '#ffffff',
			... prefix('border-radius', '5px')
		}
	}
});

fs.writeFile('node-test.css', content, (error) => {
	if (error) {
		console.error(error);
		return;
	}

	console.log(content);
});
