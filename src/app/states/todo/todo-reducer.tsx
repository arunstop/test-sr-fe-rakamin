import {
  ITodoContextState,
  TTodoContextActionTypes,
} from "../../types/states/types-todo"

export const todoReducer = (
  state: ITodoContextState,
  action: TTodoContextActionTypes,
): ITodoContextState => {
  switch (action.type) {
    case "ADD_TODO": {
      return { data: [...state.data, action.payload.todo] }
    }
    default: {
      return state
    }
  }
}
