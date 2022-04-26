import {
	StyleSheet,
	View,
	Text,
} from "react-native";

export default function Card({ info }) {
	return (
		<View style={cardStyles.container}>
			<Text style={cardStyles.header}>
				{info.name.toUpperCase().split("-")[0]}...
			</Text>
			<Text style={cardStyles.subHeader}>{info.address}</Text>
			<Text style={cardStyles.title}>SUPPORTED CONNECTORS</Text>
			<View>
				{info.connector_types.map((connector, idx) => (
					<View style={cardStyles.slots} key={idx}>
						<View>
							<Text style={cardStyles.connector}>
								{connector[0] === "l"
									? `Level ${connector.split("-")[0][3]} ${connector
											.split("-")[0]
											.substring(connector.split("-")[0].length - 2)
											.toUpperCase()}`
									: `Normal ${connector
											.split("-")[0]
											.substring(connector.split("-")[0].length - 2)
											.toUpperCase()}`}
							</Text>
							<Text style={cardStyles.watt}>
								{connector[0] === "l" ? "15kW Fast Charging" : "3kW Charging"}
							</Text>
						</View>
						<Text style={cardStyles.connectorCnt}>
							{" "}
							X{connector.split("-")[1]}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}

const cardStyles = StyleSheet.create({
	container: {
		height: 280,
		width: 256,
		backgroundColor: "#000",
		borderRadius: 16,
		padding: 16,
		marginRight: 16,
	},
	header: {
		fontSize: 14,
		color: "#fff",
		marginBottom: 8,
	},
	subHeader: {
		textTransform: "capitalize",
		color: "#bababa",
		fontSize: 12,
		marginBottom: 16,
	},
	title: {
		textTransform: "uppercase",
		color: "#68BFA1",
	},
	connector: {
		fontSize: 16,
		color: "#fff",
	},
	connectorCnt: {
		color: "#fff",
		fontSize: 18,
	},
	slots: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		paddingVertical: 4,
	},
	watt: {
		color: "#68bfa1",
		fontSize: 10,
	},
});
