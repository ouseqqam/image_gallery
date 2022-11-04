import axios from 'axios'
import { useState, useContext } from 'react'
import styles from './styles/login.module.css'
import Router from 'next/router'
import ImageGallery from '../imageGallery/index'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //create context for token  
    const [token, setToken] = useState('')
    //useContext to get token from context   




    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === 'username') {
            setUsername(value)
        }
        else if (name === 'password') {
            setPassword(value)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            username: username,
            password: password
        }
        try {
            const header =  {
                'Content-Type': 'application/json'
            }
            const user = await axios.post('http://localhost:3000/api/login', data, header)
            // setToken(user.data.token)
            console.log(user)
            // if (token) {
            //     Router.push('/imageGallery')
            // }
        } catch (error) {
            console.log(error.response.data)
        }
    }
    if (token) {
        Router.push('/imageGallery')
    }
    else {
    return (
        <div className={styles.flexContainer}>
            <div className={styles.image}></div>
            <div className={styles.login}>
                <h1>Login</h1>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <div className={styles.input}>
                        <input type="text" name="username" placeholder='Username' onChange={handleChange} />
                    </div>
                    <div className={styles.input}>
                        <input type="password" name="password" placeholder='Password' onChange={handleChange} />
                    </div>
                    <div className={styles.btns}>
                        <input className={styles.btn} type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
    }
}
 
export default Login