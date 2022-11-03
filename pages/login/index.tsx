import axios from 'axios'
import { useState } from 'react'
import styles from './styles/login.module.css'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'




const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const router = useRouter()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        if (name === 'username') {
            setUsername(value)
        }
        else if (name === 'password') {
            setPassword(value)
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            username: username,
            password: password
        }
        try {
            const user = await axios.post('http://localhost:3000/api/login', data)
           setToken(user.data.token)
            if (token) {
                router.push(
                    {
                        pathname: '/photoGallery',

                        query: { token: token }
                    }
                )
            }
        } catch (error) {
            console.log(error)
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
            </div>
        </div>
    );
}
 
export default Login