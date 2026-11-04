import React from "react";
import "./App.scss";
import ContextMenu from "./Components/ContextMenuHandler";
import DolphinBackground from "./Components/DolphinBackground";
import { Modals } from "./Components/Modals";
import PageFooter from "./Components/PageElements/PageFooter";
import Toasts from "./Components/Toasts";
import AnnouncePage from "./Pages/AnnouncePage";
import HomePage from "./Pages/Home";
import LinksPage from "./Pages/LinksPage";

// Handle SPA fallback redirects (e.g. from 404.html on GitHub Pages):
// a "#/links"-style hash means the user was bounced from that path.
(() => {
	const [, redirect] = window.location.hash.match(/^#([^#?]+)/) ?? [];
	if (redirect && redirect !== "/") {
		history.replaceState({}, "", redirect);
	}
})();

window.addEventListener("popstate", () => {
	App.forceUpdate?.();
	PageElement.forceUpdate?.();
});

function PageElement() {
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);
	PageElement.forceUpdate = forceUpdate;

	// Store the formatted hash in a variable.
	const [hash, ...args] = (window.location.pathname
		.split("/")[1] ?? "")
		.split("?")[0]
		.split("/");

	// Set the app hash value.
	App.hash = hash;

	console.log(hash, args);

	// Zhu Li, do the thing!
	switch (hash) {
		default: return <HomePage />;
		case "links":
			return <LinksPage />;
		case "announce":
			return <AnnouncePage />;
	}
}

export default function App() {
	return (
		<div className="App">
			<div className="Main">
				<DolphinBackground />
				<PageElement />
			</div>

			<PageFooter />

			<Modals />
			<Toasts />
			<ContextMenu.Handler />
		</div>
	);
}