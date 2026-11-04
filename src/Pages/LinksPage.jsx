import HeroIcon from "../Assets/HeroIcon.png";
import { ReactComponent as WaveEmoji } from "../Assets/TwemojiWave.svg";
import { ChatBubble } from "./Home";
import LinkWrapper from "../Components/LinkWrapper";
import "./Home.scss";
import "./LinksPage.scss";

export default function LinksPage() {
	const embedStyle = {
		display: "block",
		width: 500,
		maxWidth: "80vw",
		height: 300,
		maxHeight: "60vw",
		marginTop: 10
	};

	return (
		<div className="HomePage LinksPage">
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
					Hi again! <WaveEmoji />
				</ChatBubble>

				<ChatBubble index={1}>
					I'm glad you want to check out my works!<br />
				</ChatBubble>

				<ChatBubble index={2}>
					<div>
						<div>And if you want to check out my stream on BEAM, I can't wait to see you!</div>

						<a href="https://beamstream.gg/cal">
							beamstream.gg/cal
						</a>

						<iframe
							src="https://beamstream.gg/cal/embed"
							title="BEAM player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							style={embedStyle}
						/>
					</div>
				</ChatBubble>

				<ChatBubble index={3}>
					<div>
						<div>And if you want to check out my YouTube videos, I hope you enjoy them!</div>

						<a href="https://www.youtube.com/channel/UCfaiisKsseJDkRHWEnEIeyQ">
							youtube.com/channel/UCfaiisKsseJDkRHWEnEIeyQ
						</a>
					</div>
				</ChatBubble>

				<ChatBubble index={4}>
					<div>
						<div>If you have some extra cash, any donations are much appreciated!</div>

						<a href="https://www.patreon.com/Calscreations">
							patreon.com/Calscreations
						</a>
					</div>
				</ChatBubble>

				<ChatBubble index={5}>
					<div>
						<div>If you wanna join the community, come on over to Discord!</div>

						<a href="https://discord.gg/3REYaM5cu2">
							discord.gg/3REYaM5cu2
						</a>

						<iframe src="https://discord.com/widget?id=892430922031431761&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style={{ display: "block" }}></iframe>
					</div>
				</ChatBubble>

				<ChatBubble index={6}>
					<span>And if you're done here, you can return to the <LinkWrapper href="/">home page</LinkWrapper>.</span>
				</ChatBubble>
			</div>
		</div>
	);
}