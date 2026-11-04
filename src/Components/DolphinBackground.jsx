import React from "react";
import { ReactComponent as Dolphin } from "../Assets/Dolphin.svg";
import { useEventListener } from "../Classes/Hooks";
import "./DolphinBackground.scss";

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

	useEventListener("scroll", () => {
		setScroll(document.documentElement.scrollTop);
	});

	return (
		<div className="DolphinBackground">
			{[0, 1, 2, 3, 4, 5].map(index => (
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
