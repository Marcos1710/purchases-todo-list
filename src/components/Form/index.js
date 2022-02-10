import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { 
	View,
	Text, 
	TextInput, 
	TouchableWithoutFeedback, 
	StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { addTask } from '../../store/ducks/task'
import { addToDo } from '../../store/ducks/toDo'

const Form = () => {
	const task = useSelector((state) => state.task.task);
	const toDo = useSelector((state) => state.toDo.toDo);

	const dispatch = useDispatch();

	const handleAddTask = () => {
		if (!task) {
			// retornar uma mensagem em tela
			console.log(task)
			return
		}

		dispatch(addToDo([...toDo, task]))
		dispatch(addTask(''))
	}

  return (
		<View style={styles.form}>
			<TextInput 
				value={task} 
				onChangeText={(text) => dispatch(addTask(text))}
				autoCapitalize="none"
				autoCorrect={false}
				style={styles.field}
			/>
			<TouchableWithoutFeedback onPress={handleAddTask}>
				<View style={styles.button}>
					<Ionicons name="add-outline" size={24} color="white" />
				</View>
			</TouchableWithoutFeedback>
		</View>
  )
}

const styles = StyleSheet.create({
	field: {
		borderWidth: 1,
		borderColor: '#dcdcdc',
		padding: 10,
		fontSize: 15,
		color: '#333',
		borderRadius: 5,
		flex: 1,
		marginRight: 10
	},
	button: {
		backgroundColor: '#00cc',
		padding: 5,
		paddingHorizontal: 15,
		borderRadius: 5,
		justifyContent: 'center'
	},
	form: {
		marginTop: 15,
		flexDirection: 'row'
	}
})

export default Form;