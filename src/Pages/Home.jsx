import React from "react";
import { Box, Heart, Radio, Youtube } from "react-feather";
import GameDevelopmentBackground from "../Assets/GameDevelopmentBackground.jpeg";
import HeroIcon from "../Assets/HeroIcon.png";
import MoreBackground from "../Assets/MoreBackground.jfif";
import StreamBackground from "../Assets/StreamBackground.jpg";
import { ReactComponent as PointDownEmoji } from "../Assets/TwemojiPointDown.svg";
import { ReactComponent as WaveEmoji } from "../Assets/TwemojiWave.svg";
import YouTubeBackground from "../Assets/YouTubeBackground.png";
import { useEventListener } from "../Classes/Hooks";
import InlineLoading from "../Components/InlineLoading";
import LinkWrapper from "../Components/LinkWrapper";
import "./Home.scss";

function clamp(value, from, to) {
	if (value > to)
		return to;
	if (value < from)
		return from;
	return value;
}

export default function HomePage() {
	const [scroll, setScroll] = React.useState([
		document.documentElement.scrollTop,
		document.documentElement.scrollHeight
	]);

	useEventListener("scroll", () => {
		setScroll([
			document.documentElement.scrollTop,
			document.documentElement.scrollHeight
		]);
	});

	return (
		<div className="HomePage">
			<div className="HeroSection">
				<div className="UserSection Flex">
					<img
						src={HeroIcon}
						alt="Icon"
						className="Icon"
					/>

					<h1 className="Name">Cal Crehan</h1>
				</div>

				<ChatBubble index={0}>
					<span>
						Welcome to my creations!
					</span>
					<WaveEmoji />
				</ChatBubble>

				<ChatBubble index={1}>
					Overall, I'm a content creator; right now, my focus<br />
					is live streaming, which I do from 1pm to 5pm every Monday, Wednesday, and Friday.<br />
				</ChatBubble>

				<ChatBubble index={2}>
					My streams involve a variety of things,<br />
					from games to game development, and more.
				</ChatBubble>

				<ChatBubble index={3}>
					I also upload YouTube videos 3x a week,<br />
					and I'm working on a game using the Unity Engine.
				</ChatBubble>

				<ChatBubble index={4}>
					<PointDownEmoji />
					<span>
						Scroll down to see the details of what I do.
					</span>
				</ChatBubble>

				<ChatBubble index={5}>
					Or see my links page <LinkWrapper href="/links">here</LinkWrapper>.
				</ChatBubble>
			</div>

			<Section
				title="Streaming"
				icon={<Radio />}
				background={StreamBackground}
				scroll={scroll}
				index={0}
			>
				I am a variety streamer, and I firmly believe
				the stream should be about the viewers.<br /><br />
				The content I stream varies; but the focus is
				always <b>you</b>, and conversations with <b>you</b>.
			</Section>

			<Section
				title="YouTube"
				icon={<Youtube />}
				background={YouTubeBackground}
				scroll={scroll}
				index={1}
			>
				With my YouTube channels, I strive to bring
				everyone together; to build a community together.<br /><br />
				I want to capture memorable moments with my viewers,
				where we can always re-live the memories, and shed
				light on them for newer viewers.
			</Section>

			<Section
				title="Game Development"
				icon={<Box />}
				background={GameDevelopmentBackground}
				scroll={scroll}
				index={2}
			>
				It has always been my dream to make a game,
				with the feel of a living world.<br /><br />
				I strive to create, not a toy, but a universe.
				Currently, I am mostly focusing on creating a community
				to help build this idea.
			</Section>

			{/* <Section
				title="Writing"
				icon={<Feather />}
				background={GameDevelopmentBackground}
				scroll={scroll}
				index={3}
			>
				Your mom.
			</Section> */}

			<Section
				title="More To Come"
				icon={<Heart />}
				background={MoreBackground}
				scroll={scroll}
				index={3}
			>
				This is all very new, with much more to come.<br /><br />
				Now is the best time to become a part of the community,
				and be a part of the foundation for great things.<br /><br />
				<b>P.S.</b> I brought Coke and KitKats.
			</Section>
		</div>
	);
}

export function ChatBubble({ children, index }) {
	const ref = React.useRef();
	const [isTyping, setTyping] = React.useState(true);

	const lastDelay = (2 + ((index - 1) * 1.5)) * 1000;
	const delay = (2 + (index * 1.5)) * 1000;

	React.useEffect(() => {
		if (index > 0) {
			setTimeout(() => {
				ref.current.classList.add("IsTyping");
			}, lastDelay);
		}
		else ref.current.classList.add("IsTyping");

		setTimeout(() => {
			setTyping(false);
		}, delay);
	}, []);

	return (
		<div
			ref={ref}
			className="ChatBubble Flex"
			style={{
				animationDelay: `${delay}ms`
			}}
		>
			{isTyping
				? <h3 className="Typing">
					<InlineLoading />
				</h3>
				: <h3>
					{children}
				</h3>}
		</div>
	);
}

function Section({ title, children, background, scroll, icon, index = 0 }) {
	const ref = React.useRef();
	const [rect, setRect] = React.useState(null);

	React.useEffect(() => {
		setRect(ref.current.getBoundingClientRect());
	}, [scroll]);

	const margin = rect ? clamp(
		((rect.bottom / window.innerHeight) - 1) * 3,
		0, 100
	) * 200 : null;

	return (
		<div
			ref={ref}
			className="Section Flex"
			style={rect !== null ? {
				opacity: clamp(1.75 - (rect.bottom / window.innerHeight), 0, 1),
				transform: `scale(
						${clamp(rect.bottom / window.innerHeight, 1, 1.2)}
					)`
			} : null}
		>
			<img
				src={background}
				alt="Background"
				className="Background"
				style={rect !== null ? {
					transform: `rotateZ(
						${clamp((rect.bottom / window.innerHeight) / 5, -5, 2) * 50}deg
					) translateX(${index % 2 ? "" : "-"}${margin}px)`
				} : null}
			/>

			<div
				className="RightSection"
				style={rect !== null ? {
					transform: `translateX(${index % 2 ? "-" : ""}${margin}px)`
				} : null}
			>
				<h1 className="Flex">{icon} {title}</h1>

				<h4>
					{children}
				</h4>
			</div>
		</div>
	);
}