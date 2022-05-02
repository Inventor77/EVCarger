import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
	StyleSheet,
	View,
	StatusBar,
	Dimensions,
	ScrollView,
} from "react-native";
import * as Location from "expo-location";
import ViewShot from "react-native-view-shot";
import FAB from "./src/Components/FAB";
import Card from "./src/Components/Card";
import NavIcon from "./src/Icons/NavIcon";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay,
	withRepeat,
	Easing,
	Extrapolate,
	interpolate,
} from "react-native-reanimated";

const Pulse = ({ repeat, delay }) => {
	const animation = useSharedValue(0);
	useEffect(() => {
		animation.value = withDelay(
			delay,
			withRepeat(
				withTiming(1, {
					duration: 1500,
					easing: Easing.linear,
				}),
				repeat ? -1 : 1,
				false
			)
		);
	}, []);
	const animatedStyles = useAnimatedStyle(() => {
		const opacity = interpolate(
			animation.value,
			[0, 1],
			[0.6, 0],
			Extrapolate.CLAMP
		);
		return {
			opacity: opacity,
			transform: [{ scale: animation.value }],
		};
	});
	return <Animated.View style={[styles.circle, animatedStyles]} />;
};

export default function App() {
	const [pulse, setPulse] = useState(Array(3).fill(0));
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const viewShotRef = useRef();

	const data = require("./data.json");

	async function captureViewShot() {
		try {
			const imageURI = await viewShotRef.current.capture();
			console.log(imageURI);
			const image = {
				uri: imageURI,
				type: "image/jpeg",
				name: "photo.jpg",
			};
			formData = new FormData();
			formData.append("file", image);
			const response = await fetch("http://3.7.20.173:8503/api/upload/", {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				method: "POST",
				body: formData,
			});
			const data = await response.json();
			alert("Image is Successfully uploaded: ", data);
		} catch (error) {
			alert("ERROR " + error);
		}
	}

	const getLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
	};

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<View style={styles.container}>
			<ViewShot
				ref={viewShotRef}
				style={styles.container}
				options={{ format: "jpg", quality: 0.1 }}
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
								<View style={styles.marker}>
									<NavIcon />
								</View>
								{pulse.map((item, index) => (
									<Pulse repeat={index === 0} delay={index * 100} key={index} />
								))}
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
		height: 36,
		width: 36,
		borderRadius: 32,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		zIndex: 2,
		transform: [{ scaleX: -1 }],
	},
	markerImage: {},
	circle: {
		backgroundColor: "#E15468",
		height: 96,
		width: 96,
		borderRadius: 100,
		alignSelf: "center",
		position: "absolute",
		zIndex: 1,
	},
	cardContainer: {
		flex: 1,
		position: "absolute",
		bottom: 8,
		left: 8,
		width: "100%",
		overflow: "hidden",
		flexDirection: "row",
	},
});
