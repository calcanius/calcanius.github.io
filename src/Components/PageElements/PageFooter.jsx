import React from "react";
import "./PageFooter.scss";

import Icon from "../../Assets/icon.png";
import Heart from "../../Assets/TwemojiHeart.svg";

export default function PageFooter() {
	return (
		<footer>
			<div className="Flex">
				<div className="LeftSections">
					<div className="HeadSection FlexCenter">
						<img className="Logo" src={Icon} alt="Logo" />

						<div>
							site originally made by RIVÆROS with <img src={Heart} alt="♥" width={15} height={15} />
						</div>
					</div>
				</div>

				<div className="MiddleSection">
					{/*  TODO add some shit here.  */}
				</div>

				<div className="RightSections FlexCenter">
					<div className="LinksSection">
						<a href="https://feathericons.com/">Icons Used</a>

						<div className="Copyright">
							Copyright © {new Date().getFullYear()} Cal's Creations
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
