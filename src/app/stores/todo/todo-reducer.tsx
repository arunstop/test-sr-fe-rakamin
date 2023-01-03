import {
  ITodoContextState,
  TTodoContextActionTypes,
} from "../../types/stores/types-todo"

export const todoReducer = (
  state: ITodoContextState,
  action: TTodoContextActionTypes,
): ITodoContextState => {
  switch (action.type) {
    case "ADD_TODO": {
      return { data: [...state.data, action.payload] }
    }
    case "INIT_TODO": {
        return { data:action.payload }
      }
    default: {
      return state
    }
  }
}
