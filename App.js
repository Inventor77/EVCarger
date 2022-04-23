import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
// import NavigationIcon from "./src/Icons/NavigationIcon";
import {
	StyleSheet,
	View,
	StatusBar,
	Dimensions,
	Animated,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { keyframes, stagger } from "popmotion";

const COUNT = 3;
const DURATION = 4000;
const INITIAL_PHASE = { scale: 0, opacity: 1 };

export default function App() {
	const [animations, setAnimations] = useState(
		Array(COUNT).map(() => INITIAL_PHASE)
	);

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

	useEffect(() => animate(), []);

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				region={{
					latitude: 21.251385,
					longitude: 81.629639,
					latitudeDelta: 0.055,
					longitudeDelta: 0.05,
				}}
			>
				<Marker
					coordinate={{
						latitude: 21.251385,
						longitude: 81.629639,
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
							{/* <NavigationIcon style={styles.markerImage} /> */}
							<Svg
								xmlns="http://www.w3.org/2000/svg"
								width={18}
								height={20}
								viewBox="0 0 24 24"
								fill="#fff"
								// {...props}
							>
								<Path d="M10.8 6.2C6.5 7.9 3 9.8 3 10.6c0 .7 1.5 1.8 3.4 2.5 2.3.8 3.7 2.2 4.5 4.5.7 1.9 1.8 3.4 2.5 3.4C14.5 21 21 6.4 21 3.9c0-1.4-1.8-1-10.2 2.3z" />
							</Svg>
						</View>
					</View>
				</Marker>
			</MapView>
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
	},
	markerImage: {},
	circle: {
		backgroundColor: "#E15468",
		height: 52,
		width: 52,
		borderRadius: 100,
		alignSelf: "center",
		position: "absolute",
	},
});
