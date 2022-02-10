export const Types = {
  ADD: "ADD",
};

const INITIAL_STATE = {
  task: ''
};

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case Types.ADD:
			return {
				...state,
				task: action.payload
			}
		
		default:
			return state;
	}
}

export function addTask(data) {
  return {
    type: Types.ADD,
    payload: data,
  };
}
