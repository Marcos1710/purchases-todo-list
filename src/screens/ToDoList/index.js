import React from 'react';
import { 
	SafeAreaView, 
	View,
	StyleSheet,
} from 'react-native'

import Header from '../../components/Header'
import Body from '../../components/Body'
import Form from '../../components/Form'

const ToDoList = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
				<Header />
				<Form />
				<Body />
			</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
})

export default ToDoList;