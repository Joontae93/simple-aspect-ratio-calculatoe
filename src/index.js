import React from 'react';
import { createRoot } from 'react-dom/client';
function myFunction() {
	// Get the text field
	var copyText = document.getElementById('myInput');

	// Select the text field
	copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices

	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText.value);

	// Alert the copied text
	alert('Copied the text: ' + copyText.value);
}
const root = document.getElementById('app');
function App() {
	const [width, setWidth] = React.useState(16);
	const [height, setHeight] = React.useState(9);
	function handleChange({ target }) {
		if ('width' === target.name) {
			setWidth(target.value);
		} else if ('height' === target.name) {
			setHeight(target.value);
		} else {
			console.error("Something's not working...");
		}
	}
	const [aspectRatio, setAspectRatio] = React.useState('16 / 9');
	function calculateAspectRatio() {
		const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)); // helper function to calculate greatest common divisor
		const divisor = gcd(width, height); // calculate the greatest common divisor of width and height
		const numerator = width / divisor; // calculate the numerator of the fraction
		const denominator = height / divisor; // calculate the denominator of the fraction
		setAspectRatio(`${numerator} / ${denominator}`); // return the aspect ratio as a string in fraction form
	}
	React.useEffect(calculateAspectRatio, [width, height]);
	return (
		<main>
			<form action="#">
				<label htmlFor="width">Width</label>
				<input
					type="number"
					name="width"
					id="width"
					placeholder="width"
					value={width}
					onChange={handleChange}
				/>
				<label htmlFor="height">Height</label>
				<input
					type="number"
					name="height"
					id="height"
					placeholder="height"
					value={height}
					onChange={handleChange}
				/>
			</form>
			<span className="output">aspect-ratio: {aspectRatio} </span>
		</main>
	);
}
createRoot(root).render(<App />);
