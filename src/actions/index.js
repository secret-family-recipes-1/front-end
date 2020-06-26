import { axiosWithAuth } from "../utils/axiosWithAuth"
// const history = useHistory()
//using axiosWithAuth
export const GET_USER = "GET_USER"
export const LOGIN_ERROR = "LOGIN_ERROR" //payload for the .catch in the axios req for login
export const ADD_RECIPE = "ADD_RECIPE"
export const REMOVE_RECIPE = "REMOVE_RECIPE"
export const GET_RECIPE = "GET_RECIPE"
export const UPDATE_RECIPE = "UPDATE_RECIPE"
//tbd downbellow 
export const FAVORITE_RECIPE = "FAVORITE_RECIPE"
export const AXIOS_ERROR = "AXIOS_ERROR" // testing
export const POSTNEW_USER = "POSTNEW_USER" // sign up
export const LOGIN_USER = "LOGIN_USER" //login
export const GET_SPECIFIC_RECIPE = "GET_SPECIFIC_RECIPE"

//***********Start of user actions ***********
export const getUser = () => dispatch => {
    //not .get set up yet
    axiosWithAuth().get('/:id')
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
            debugger
        })

}

export const loginUser = (formValues, history, setErrors, errors) => dispatch => {
    //set loading to true when action is fired  before axios call fires
    axiosWithAuth()
        .post(`/api/auth/login`, formValues)
        .then((res) => {
            console.log(res)
            window.localStorage.setItem("token", res.data.token)
            window.localStorage.setItem("userID", res.data.user.id)
            history.push("/userdashboard")
            dispatch({ type: LOGIN_USER, payload: res.data.user })
        })
        .catch((err) => {
            console.log(err)
            setErrors({
                ...errors,
                message: "The Username or Password you entered does not exist. Please try again"
            });
            debugger
        })
        .finally(() => {

        })

}

//sign up (axios.post)
export const signupUser = (newUsername, history) => dispatch => {
    axiosWithAuth()
        .post('/api/auth/register', newUsername)
        .then((res) => {
            console.log(res)
            window.localStorage.setItem("token", res.data.token)
            window.localStorage.setItem("userID", res.data.newUser.id)
            // setFormState(initialState)
            history.push("/userdashboard")
        })
        .catch((err) => {
            console.log(err.response)
            // debugger
        })
}

//***********End of user actions ***********

//***********Start of CRUD operations ***********
//.post (Create) add
export const addRecipe = (newRecipe) => dispatch => { //Will pass correct state information once forms are complete
    axiosWithAuth()
        .post('/api/recipes/', newRecipe)
        .then((res) => {
            console.log(res)
            dispatch({type: ADD_RECIPE, payload: res.data.newRecipe})
        })
        .catch((err) => {
            // debugger
            console.log(err.response)
        })
    // .finally(null)
}


//.delete (Delete)
export const removeRecipe = (id) => dispatch => {
    axiosWithAuth()
        .delete(`/api/recipes/${id}`)
        .then((res) => {
            console.log(res)
            dispatch({type: REMOVE_RECIPE, payload: res.data.deletedRecipe})
        })
        .catch((err) => {
            console.log(err) //will fix this after push
        })
}


//.get (Read) 
export const getRecipe = () => dispatch => {
    axiosWithAuth()
        .get('/api/recipes/')
        .then((res) => {
            console.log(res) // waiting to see what the data looks like
            dispatch({ type: GET_RECIPE, payload: res.data.recipes})
        })
        .catch((err) => {
            console.log(err)
            // dispatch({type: AXIOS_ERROR, payload: err.message})
        })
}


//.put (Update) takes and ID and {object} to update
export const editRecipe = (recipeID, editedRecipe) => dispatch => {
    console.log(recipeID)
    // history.push(`/userdashboard/${id}`)
    // console.log(`displaying recipe ID from recipe card`, `${id}`)
    // setIsEditing(true)
    axiosWithAuth()
        .put(`/api/recipes/${recipeID}`, editedRecipe)
        .then((res) => {
            console.log(editedRecipe)
            console.log(recipeID)
            console.log(res) //server returns .updatedRecipe
            dispatch({type: UPDATE_RECIPE, payload: res.data.updatedRecipe})
        })
        .catch((err) => {
            console.log(err.response)
            console.log(err.message)
            console.log(editedRecipe)
            
            // debugger
        })


}
export const getSpecificRecipe = (id) => { //not using rn was testing
    axiosWithAuth().get(`/api/recipes/${id}`)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}




