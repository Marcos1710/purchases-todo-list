import { combineReducers } from "redux";

import task from './task'
import toDo from './toDo'

export default combineReducers({
    task,
    toDo
})