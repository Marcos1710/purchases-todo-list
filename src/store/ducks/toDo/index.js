export const Types = {
  ADD_TODO: "ADD_TODO",
  ADD_COUNT_TASKS: "ADD_COUNT_TASKS",
};

const INITIAL_STATE = {
	toDo: [],
	tasksFinished: 0
};

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case Types.ADD_TODO:
			return {
				...state,
				toDo: action.payload
			}

		case Types.ADD_COUNT_TASKS:
			return {
				...state,
				tasksFinished: action.payload
			}
		
		default:
			return state;
	}
}

export function addToDo(data) {
  return {
    type: Types.ADD_TODO,
    payload: data,
  };
}

export function count(data) {
	return {
	  type: Types.ADD_COUNT_TASKS,
	  payload: data,
	};
  }
