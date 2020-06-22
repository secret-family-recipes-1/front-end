import React from 'react'

function SignupForm (props){

    const { newUser, setNewUser, formValues, setFormValues } = props



    // Form Handlers

    function submitHandler(e){
        e.preventDefault()
        console.log('New user created');
        setNewUser(formValues);
        
        setFormValues({
            email: '',
            password:''
          })
    }

    function changeHandler(e){
        const {name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        })

    }


    return(
        <div>
            <h1>This is the Signup Form</h1>
            <form onSubmit={submitHandler}>
                <label> Email:
                    <input 
                    type='email'
                    name='email'
                    placeholder='Your email'
                    onChange={changeHandler}
                    value={formValues.email}
                    >
                    </input>
                </label>
                <label> Password:
                    <input 
                    type='password'
                    name='password'
                    placeholder='Your password'
                    onChange={changeHandler}
                    value={formValues.password}
                    >
                    </input>
                </label>
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
}


export default SignupForm;