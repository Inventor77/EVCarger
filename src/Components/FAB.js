import { StyleSheet, Pressable } from "react-native";
import UploadIcon from "../Icons/UploadIcon";

const FAB = (props) => {
	return (
		<Pressable style={FABStyles.container} onPress={props.onPress}>
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
		backgroundColor: "#F00",
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
