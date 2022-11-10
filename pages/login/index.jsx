import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import styles from './styles/login.module.css'
import router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../redux/slice'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    useEffect(() => {
        const tokenLocal = localStorage.getItem('token')
        if (tokenLocal) {
            router.push('/imageGallery')
        }
    }, []);

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
            const token = user.data.token
            if (token) {
                localStorage.setItem('token', user.data.token)
                router.push('/imageGallery')
            }
        } catch (error) {
            setError(error.response?.data.message)
        }
    }
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
                    {
                        error &&
                        <div className={styles.error}>
                            <p>{error}</p>
                        </div>
                    }
                </div>
            </div>
        );
}
 
export default Login