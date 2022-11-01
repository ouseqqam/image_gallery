import { useState } from 'react'
import styles from './styles/login.module.css'

interface Login {
    username: string
    password: string
}




const Login = () => {
    const [login, setLogin] = useState<any>()
    const [error, setError] = useState<any>()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setLogin({ ...login, [name]: value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        console.log(login)


        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        if (res.status === 200) {
            console.log('success')
        } 
        else if(res.status === 403) {
            console.log('you\'are blocked')
        }
        else if(res.status === 401) {
            console.log('wrong username or password')
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