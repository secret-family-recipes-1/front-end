//importing my actions, types folder sounds really appealing all of a sudden
import {
    LOGIN_ERROR,
    ADD_RECIPE,
    REMOVE_RECIPE,
    GET_RECIPE,
    FAVORITE_RECIPE,
    AXIOS_ERROR,
    LOGIN_USER,
    UPDATE_RECIPE,
    GET_USER,
    POSTNEW_USER
    
} from "../actions/index"

//InitialState for global State
const initialState = {
    recipes: [],
    error: '',
    users: {},
    userInfo: {},
    favRecipes: []

    
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: 
        case POSTNEW_USER:
        return {
            ...state,
            users: action.payload
        }
        case GET_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case REMOVE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => {
                    return action.payload.id !== recipe.id
                })
            }
        case GET_RECIPE:
            return {
                ...state,
                recipes: action.payload
            }
            case UPDATE_RECIPE:
                return {
                    ...state,
                    recipes: state.recipes.map(recipe => {
                        if (recipe.id === action.payload.id) {
                            return action.payload
                        } else {
                            return recipe
                        }
                    })
                }
        case FAVORITE_RECIPE:
            return {

            }
        case AXIOS_ERROR: 
            return {
            ...state,
            error:''
        }
        case LOGIN_ERROR:
            return {
                ...state,
                // error: action.payload
            }
        default:
            return state
    }

}
export default rootReducer