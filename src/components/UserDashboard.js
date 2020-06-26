import React from 'react'
// import AddRecipeForm from './AddRecipeForm'
import RecipeList from './RecipeList'
// import EditRecipe from './EditRecipe'
// redux
import { connect } from 'react-redux'


import '../App.scss'


const UserDashboard = (props) => {
    /*const users = props.users made this for dynamic user, moving to navbar
    // const [userLoginInfo, setUserLoginInfo] = useState(user)
    console.log(users) // gave the state.users name 'users'
    console.log(props.users)// props.users is redux state*/
    return (
        <>
            <div className='dashboard'>
                <h1>  UserDashboard </h1>
                <div className='recipe-list'> <RecipeList /></div>        
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(UserDashboard)
