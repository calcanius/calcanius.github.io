import React from "react";
import "./LinkWrapper.scss";

export default class extends React.Component {
	handleClick = event => {
		const { href, onClick, target } = this.props;

		// Let external links, new tabs, and modified clicks behave normally.
		if (
			!href ||
			event.button !== 0 ||
			event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
			target === "_blank" ||
			event.defaultPrevented
		) return;

		// Only intercept same-origin navigations.
		const url = new URL(href, window.location.href);
		if (url.origin !== window.location.origin) return;

		event.preventDefault();
		event.stopPropagation();

		// Navigate client-side.
		window.history.pushState({}, "", url);

		// Trigger any explicit onClick handler *after* navigation.
		onClick?.(event);

		// Re-render for the new route (App listens for "popstate").
		window.dispatchEvent(new PopStateEvent("popstate"));
	};

	render() {
		const { children, onClick, ...props } = this.props;

		return (
			<a className="LinkWrapper" {...props} onClick={this.handleClick}>
				{ children }
			</a>
		);
	}
}
