import React from "react";
import { ReactComponent as Dolphin } from "../Assets/Dolphin.svg";
import "./DolphinBackground.scss";

// Number of dolphins rendered in the original design.
const DOLPHINS_PER_ROW = 6;
// Vertical spacing between dolphin pivots; sized so the fan looks continuous.
const ROW_HEIGHT = 420;

function clamp(value, from, to) {
	if (value > to)
		return to;
	if (value < from)
		return from;
	return value;
}

export default function DolphinBackground() {
	const [scroll, setScroll] = React.useState(
		document.documentElement.scrollTop
	);

	// How many dolphin rows we need so the fan covers the entire page.
	const [rows, setRows] = React.useState(1);

	React.useEffect(() => {
		let frame;

		const measure = () => {
			cancelAnimationFrame(frame);

			frame = requestAnimationFrame(() => {
				const height = Math.max(
					document.documentElement.scrollHeight,
					document.body.scrollHeight
				);

				setRows(clamp(Math.ceil(height / ROW_HEIGHT), 1, 40));
			});
		};

		measure();

		window.addEventListener("resize", measure);

		// Re-measure when content changes size (images, embeds loading, etc).
		const observer = new MutationObserver(measure);
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("resize", measure);
			observer.disconnect();
		};
	}, []);

	React.useEffect(() => {
		const onScroll = () => setScroll(document.documentElement.scrollTop);

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div className="DolphinBackground">
			{Array.from({ length: rows * DOLPHINS_PER_ROW }, (_, index) => (
				<div className="Dolphin" key={index}>
					<Dolphin
						className="Vector"
						style={{
							transform: `rotateZ(
								${clamp((scroll / 20) - (index * 15), -90, 90)}deg
							)`
						}}
					/>
				</div>
			))}
		</div>
	);
}
