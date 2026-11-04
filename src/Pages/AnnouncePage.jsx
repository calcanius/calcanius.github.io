import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";
import React from "react";
import { Trash2 } from "react-feather/dist";
import InlineLoading from "../Components/InlineLoading";
import { openBoolModal } from "../Components/Modals";
import Toasts from "../Components/Toasts";
import "./AnnouncePage.scss";

const firebaseConfig = {
	apiKey: "AIzaSyCtMOQlv_fQjGV8oCEkz9xzUrcm3OLKsmI",
	authDomain: "cals-creations.firebaseapp.com",
	projectId: "cals-creations",
	storageBucket: "cals-creations.appspot.com",
	messagingSenderId: "417031892034",
	appId: "1:417031892034:web:7e08c0d2980baa6fbf91db",
	measurementId: "G-CVG7BV8H61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function callFirebaseFunction(functionName, data) {
	return getAuth(app).currentUser.getIdToken(true).then(token => {
		return fetch(`https://us-central1-cals-creations.cloudfunctions.net/${functionName}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			},
			body: JSON.stringify({ data }),
		}).then(response => response.json()).then(({ result }) => result);
	});
}

export default function AnnouncePage() {
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		getAuth(app).onAuthStateChanged(user => {
			if (user) {
				setUser(
					Object.assign(
						{},
						user,
						{
							signedIn: true
						}
					)
				);
			}
			else {
				setUser({
					signedIn: false
				});
			}
		});
	}, []);

	function signIn() {
		const auth = getAuth(app);
		signInWithPopup(auth, new GoogleAuthProvider()).then(result => {
			const user = result.user;

			setUser(
				Object.assign(
					{},
					user,
					{
						signedIn: true
					}
				)
			);
		}).catch(err => {
			console.error(err);

			Toasts.showToast(
				"There was an error signing in - check console for details",
				"Failure",
				10
			);
		});
	}

	const [webhooks, setWebhooks] = React.useState(null);

	React.useEffect(() => {
		if (user?.signedIn) {
			const ref = collection(getFirestore(app), "webhooks");

			onSnapshot(ref, snapshot => {
				setWebhooks(snapshot.docs.map(doc => doc && ({
					...doc.data(),
					id: doc.id
				})).filter(Boolean));
			});
		}
	}, [user]);

	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [busy, setBusy] = React.useState(false);

	return user ? (
		user?.signedIn ? (
			<div className="AnnouncePage FlexCenter">
				<h1>Make Announcement</h1>

				<h2>Title</h2>
				<input
					placeholder="Default: Live now! Come join the fun!"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<h2>Description</h2>
				<input
					placeholder="Default: Playing games and chilling with my viewers."
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

				<div
					className="Button AnnounceButton"
					onClick={() => {
						setBusy(true);

						callFirebaseFunction("makeAnnouncement", {
							title: title.trim() || "Live now! Come join the fun!",
							description: description.trim() || "Playing games and chilling with my viewers.",
						}).then(data => {
							setBusy(false);

							// @ts-ignore
							const { err, errors } = data;

							if (err) {
								console.error(err);

								Toasts.showToast(
									"There was an error making the announcement - check console for details",
									"Failure",
									10
								);

								return;
							}

							if (errors?.length) {
								console.error(errors);

								Toasts.showToast(
									`Announcements made with ${errors.length} errors!`,
									"Warning"
								);
							}
							else {
								Toasts.showToast(
									"Announcements made!",
									"Success"
								);
							}
						}).catch(err => {
							setBusy(false);
							console.error(err);

							Toasts.showToast(
								"There was an error making the announcements - check console for details",
								"Failure",
								10
							);
						});
					}}
				>{busy ? <InlineLoading /> : "Announce!"}</div>

				<h1>Webhooks</h1>

				{webhooks ? (
					<div className="WebhooksList FlexCenter">
						{webhooks.map(webhook => (
							<div className="Flex" key={webhooks.length}>
								<input
									className="Webhook AddWebhookUri WhName"
									disabled
									value={webhook.name}
									key={webhooks.length + "name"}
								/>

								<input
									className="Webhook AddWebhookUri WhUrl"
									disabled
									value={webhook.uri}
									key={webhooks.length + "uri"}
								/>

								<div className="Button" onClick={() => {
									const ref = doc(getFirestore(app), "webhooks", webhook.id);

									openBoolModal({
										title: "Are you sure?",
										description: `Delete "${webhook.name}"?`
									}).then(r => {
										if (r) {
											setWebhooks(
												webhooks.filter(w => w.id !== webhook.id)
											);

											deleteDoc(ref).then(() => {
												Toasts.showToast(
													"Webhook removed",
													"Success"
												);
											});
										}
									});
								}}><Trash2 /></div>
							</div>
						))}

						<div className="AddWebhook">
							<div className="Flex">
								<input
									className="Webhook AddWebhookUri WhName"
									placeholder="New webhook name"
									key={webhooks.length + 1}
								/>

								<input
									className="Webhook AddWebhookUri WhUrl"
									placeholder="New webhook URL"
									key={webhooks.length + 2}
								/>
							</div>

							<div className="Button AnnounceButton" onClick={() => {
								const [name, url] = [...document.getElementsByClassName("AddWebhookUri")].map(e => e.value);

								if (!url) {
									return;
								}

								if (!url.startsWith("https://")) {
									return Toasts.showToast(
										"Webhooks must be a valid link",
										"Failure"
									);
								}

								[...document.getElementsByClassName("AddWebhookUri")].map(e => e.value = "");

								const ref = collection(getFirestore(app), "webhooks");

								setWebhooks([
									...webhooks,
									{ name, uri: url }
								]);

								addDoc(ref, {
									name,
									uri: url
								}).then(() => {
									Toasts.showToast(
										"Webhook added",
										"Success"
									);
								});
							}}>Add</div>
						</div>
					</div>
				) : <InlineLoading />}
			</div>
		) : (
			<div className="AnnouncePage FlexCenter">
				<h1>You are not signed in.</h1>

				<div className="Button" onClick={signIn}>
					Sign in with Google
				</div>
			</div>
		)
	) : null;
}