import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
	StyleSheet,
	View,
	StatusBar,
	Dimensions,
	Animated,
	ScrollView,
} from "react-native";
import { keyframes, stagger } from "popmotion";
import * as Location from "expo-location";
import ViewShot from "react-native-view-shot";
import FAB from "./src/Components/FAB";
import Card from "./src/Components/Card";
import NavIcon from "./src/Icons/NavIcon";

const COUNT = 5;
const DURATION = 500;
const INITIAL_PHASE = { scale: 0, opacity: 1 };

export default function App() {
	const [animations, setAnimations] = useState(
		Array(COUNT).map(() => INITIAL_PHASE)
	);
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const viewShotRef = useRef();

	const data = require("./data.json");

	async function captureViewShot() {
		try {
			const imageURI = await viewShotRef.current.capture();
			const image = await {
				uri: imageURI,
				type: "image/jpeg",
				name: "photo.jpg",
			};
			formData = new FormData();
			formData.append("Screenshot", image);
			const response = await fetch("http://3.7.20.173:8503/api/upload/", {
				body: formData,
				method: "PUT",
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			const data = await response.json();
			alert("Image is Successfully uploaded: ", data);
		} catch (error) {
			alert("ERROR " + error);
		}
	}

	const _getLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
	};

	const animate = () => {
		const actions = Array(COUNT).fill(
			keyframes({
				values: [INITIAL_PHASE, { scale: 2, opacity: 0 }],
				duration: DURATION,
				loop: Infinity,
				yoyo: Infinity,
			})
		);
		stagger(actions, DURATION / COUNT).start((animations) => {
			setAnimations(animations);
		});
	};

	useEffect(() => {
		_getLocation();
		animate();
	}, []);

	return (
		<View style={styles.container}>
			<ViewShot
				ref={viewShotRef}
				style={styles.container}
				options={{ format: "jpg", quality: 0.5, result: "base64" }}
			>
				{errorMsg && alert("Restart the app and give location permission")}
				{location && (
					<MapView
						style={styles.map}
						region={{
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
							latitudeDelta: 0.04,
							longitudeDelta: 0.04,
						}}
					>
						<Marker
							coordinate={{
								latitude: location.coords.latitude,
								longitude: location.coords.longitude,
							}}
							title={"You are here"}
							style={styles.mark}
						>
							<View style={styles.markerContainer}>
								{animations.map(({ opacity, scale }, index) => {
									return (
										<Animated.View
											key={index}
											style={[
												styles.circle,
												{
													transform: [{ scale }],
													opacity,
												},
											]}
										/>
									);
								})}
								<View style={styles.marker}>
									<NavIcon />
								</View>
							</View>
						</Marker>
					</MapView>
				)}
				<ScrollView
					horizontal
					scrollEventThrottle={1}
					showsHorizontalScrollIndicator={false}
					height={300}
					style={styles.cardContainer}
				>
					{data.chargers.map((info, idx) => (
						<Card info={info} key={idx} />
					))}
				</ScrollView>
			</ViewShot>
			<FAB onPress={captureViewShot} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height + StatusBar.currentHeight,
	},
	markerContainer: {
		height: 100,
		width: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	marker: {
		backgroundColor: "#E15468",
		height: 32,
		width: 32,
		borderRadius: 32,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		zIndex: 1,
		transform: [{ scaleX: -1 }],
	},
	markerImage: {},
	circle: {
		backgroundColor: "#E15468",
		height: 48,
		width: 48,
		borderRadius: 100,
		alignSelf: "center",
		position: "absolute",
	},
	cardContainer: {
		flex : 1,
		position: "absolute",
		bottom: 8,
		left: 8,
		width: "100%",
		overflow: "hidden",
		flexDirection: "row",
	},
});
