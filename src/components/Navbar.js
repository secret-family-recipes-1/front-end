import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//setting up redux incase I have time to play with new things like dynamic username displaying on nav + misc
import { connect } from 'react-redux'
import { loginUser } from "../actions/index"

import Modal from './Modal'
import '../App.scss'


const Navbar = ({ users }) => {
    const [isloggedin, setIsLoggedin] = useState(false)
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedin(true)
        }
    }, [users])


    const logout = () => {
        const token = window.localStorage.getItem("token")

        if (token) {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("userID")
            setShowModal(true)
            setIsLoggedin(false)
            setTimeout(() => {
                setShowModal(false)
            }, 2000)
        }

    }

    return (
        <>
            <Modal showModal={showModal} setShowModal={setShowModal} title='You have been logged out' />
            <nav className='navbar'>
                <h1> Secret Family Recipes </h1>
                {isloggedin && <h2> Welcome back, {users.username}</h2>}
                {/* I'll try to use localStorage to store the value incase user causes component to rerender/refresh */}
                <div className='navbar-links'>
                    <Link to="/addrecipe"> Add a new recipe</Link>
                    <br />
                    <Link to="/userdashboard"> UserDashboard</Link>
                    <br />
                    <Link to="/" onClick={logout} >{isloggedin ? "Logout" : "Login"}</Link>
                    {/* <Link to="/">Login</Link> */}



                </div>
            </nav>
        </>
    )
}

const mapStateToProps = state => {
    return {
        //setting up component to be ready to take in state
        users: state.users
    }
}

export default connect(mapStateToProps, { loginUser })(Navbar)