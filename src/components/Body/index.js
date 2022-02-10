import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { 
	Text,
	View,
	FlatList,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native'

import Tooltip from 'react-native-walkthrough-tooltip';
import Checkbox from 'expo-checkbox';

import { AntDesign  } from '@expo/vector-icons';
import { addToDo, count } from '../../store/ducks/toDo';
import { addTask } from '../../store/ducks/task';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Body = () => {
	const toDo = useSelector((state) => state.toDo.toDo);
	const tasksFinished = useSelector((state) => state.toDo.tasksFinished);

	const dispatch = useDispatch();

	const [isSelected, setSelection] = useState([]);
	const [toolTipVisible, setToolTipVisible] = useState(null);

	const handleRemoveTask = (task) => {
		const newToDo = toDo.filter(value => value !== task)
		dispatch(addToDo(newToDo))
		AsyncStorage.removeItem(task)
		
		if (tasksFinished > 0) {
			dispatch(count(tasksFinished - 1))
		}
	}

	const handleUpdateTask = (task) => {
		dispatch(addTask(task))
		handleRemoveTask(task)
	}

	const checkedValue = (item) => {
		const isChecked = isSelected.filter(value => value.item === item)
		return isChecked.length === 0 ? false : true
	}

	const handleChangeSelected = (index, item) => {
		let select;
		let newArray = [];

		if (isSelected.length === 0) {
			select = {
				index,
				item
			}

			newArray.push(select)
		} else {
			const checkSelect = isSelected.filter(value => value.index === index)

			if (checkSelect.length === 0) {
				select = {
					index,
					item
				}

				newArray = [...isSelected]
				newArray.push(select)
			} else {
				newArray = [...isSelected]
				newArray = newArray.filter(value => value.index !== index)
			}
		}

		setSelection(newArray)
		dispatch(count(newArray.length))
	}

	const checkedTooltip = (index) => toolTipVisible === index ? true : false

	const handleRender = ({ item, index }) => (
		<View key={item} style={[styles.itemBody, checkedValue(item) ? styles.itemColorCheckd : styles.itemColor]}>
			<View style={styles.item}>
				<Checkbox
					key={item}
					value={checkedValue(item)}
					onValueChange={() => handleChangeSelected(index, item)}
				/>
				<Text style={checkedValue(item) ? styles.itemTextChecked : styles.itemText}>{item}</Text>
			</View>
			<View style={styles.item}>
				<View style={styles.edit}>
					<TouchableWithoutFeedback onPress={() => handleUpdateTask(item)} >
						<AntDesign name="edit" size={25} color="blue" />
					</TouchableWithoutFeedback>
				</View>
				<View>
				<Tooltip
          animated={true}
          arrowSize={{width: 16, height: 8}}
          backgroundColor="rgba(0,0,0,0.5)"
          isVisible={checkedTooltip(index)}
          content={
					<View style={styles.tooltip}>
						<Text>Deseja remover o item da lista ?</Text>
						<View style={styles.button}>
							<Text style={styles.buttonText} onPress={() => handleRemoveTask(item)}>sim</Text>
						</View>
					</View>}
          placement="bottom"
          onClose={() => setToolTipVisible(null)}
        >
					{/*  */}
					<TouchableWithoutFeedback onPress={() => setToolTipVisible(index)}> 
						<AntDesign name="closecircleo" size={25} color="red" />
					</TouchableWithoutFeedback>
				</Tooltip>
				</View>
			</View>
		</View>
	)

  return (
		<View>
			{toDo.length === 0 ? <Text style={styles.text} >Nenhum item na lista</Text> :
			<FlatList 
				data={toDo} 
				keyExtractor={item => item} 
				renderItem={handleRender}
			/> }
		</View>
  )
}

const styles = StyleSheet.create({
	itemBody: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: '#dcdcdc',
		padding: 20,
		marginTop: 15,
		borderRadius: 5
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	itemColor: {
		backgroundColor: '#FFFFFF',
	},
	itemColorCheckd: {
		backgroundColor: 'rgba(5, 143, 69, 0.3)',
	},
	itemText: {
		marginLeft: 25,
		fontSize: 18,
		color: '#000',
	},
	itemTextChecked: {
		marginLeft: 25,
		color: '#058F45',
		textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "#058F45",
		fontSize: 18
	},
	text: {
		textAlign: 'center',
		marginTop: 20,
		fontSize: 18
	},
	edit: {
		marginRight: 20
	},
	tooltip: {
		width: 300,
	},
	button: {
		padding: 20,
		paddingBottom: 5
	},
	buttonText: {
		backgroundColor: '#00cc',
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 5,
		paddingHorizontal: 15,
		borderRadius: 5,
	}
})

export default Body;