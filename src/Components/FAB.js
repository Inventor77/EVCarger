import { StyleSheet, Pressable } from "react-native";
import UploadIcon from "../Icons/UploadIcon";

const FAB = ({onPress}) => {
	return (
		<Pressable style={FABStyles.container} onPress={() => onPress()}>
			<UploadIcon />
		</Pressable>
	);
};

const FABStyles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
		position: "absolute",
		top: 50,
		right: 30,
		backgroundColor: "#E15468",
		paddingHorizontal: 20,
		paddingVertical: 20,
		elevation: 10,
		shadowColor: "#000",
	},
	title: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
	},
});

export default FAB;
