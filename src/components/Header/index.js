import React from 'react';
import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from 'react-native';

const Header = () => {
	const toDo = useSelector((state) => state.toDo.toDo);
	const count = useSelector((state) => state.toDo.tasksFinished);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Lista de compras</Text>
			<Text style={styles.count}>{count}/{toDo.length}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		marginTop: 20
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		flex: 1
	},
	count: {
		marginLeft: 5,
	}
})

export default Header;