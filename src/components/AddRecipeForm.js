import React, { useState, useEffect} from 'react'
//redux
import {addRecipe} from "../actions/index"
import {connect} from "react-redux"
import { useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';

const initialState = {
        title: '',
        // user:'Randy', //will make dynamic with 
        ingredients: '',
        instructions: '',
        category: '',
        // user_id: 1337, //will make user id dynamic by using .get req to fetch user id
}


const AddRecipeForm = (props) => {
    const [newRecipe, setNewRecipe] = useState(initialState)

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}



    const handleChange = (event) => {
        setNewRecipe({...newRecipe, [event.target.name]: event.target.value})
    }
    const history = useHistory()
    const handleSubmit = (event) => {
        
        event.preventDefault()
        props.addRecipe({...newRecipe, user_id: props.userInfo.id, user: props.userInfo.username})
        history.push('/userdashboard')
    }


    return (


        <>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    className='edit-backdrop'
                    variants={backdrop}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                >
                <div className='edit-modal'>
                    <form 
                    className='recipe-form'
                    onSubmit={handleSubmit}>
                        <br/><label className='recipe-form-label'>Title Of Recipe </label>
                        <input 
                            className='recipe-form-input'
                            onChange={handleChange}
                            name='title'
                            value={newRecipe.title}
                            required
                        />
                        <br/> <label className='recipe-form-label'>User: </label>
                        <input 
                            className='recipe-form-input'
                            onChange={handleChange}
                            name='user'
                            value={props.userInfo.username}
                            required
                        />
                            <br/> <label className='recipe-form-label'>ingredients: </label>
                        <input 
                            className='recipe-form-input'
                            onChange={handleChange}
                            name='ingredients'
                            value={newRecipe.ingredients}
                            required
                        />
                                    <br/> <label className='recipe-form-label'> instructions: </label>
                        <input 
                            className='recipe-form-input'
                            onChange={handleChange}
                            name='instructions'
                            value={newRecipe.instructions}
                            required
                        />
                                    <br/> <label className='recipe-form-label'>Category: </label>
                        <input 
                            className='recipe-form-input'
                            onChange={handleChange}
                            name='category'
                            value={newRecipe.category}
                            required
                        />
                        
                    
                        <br/>
                        <button className='form-btn'> Add Recipe </button>
                    </form>
                 </div>
                </motion.div>
            </AnimatePresence>
        </>

    )
}
const MapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(MapStateToProps, {addRecipe})(AddRecipeForm)