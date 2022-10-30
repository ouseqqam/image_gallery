import { useState } from 'react'
import styles from './styles/login.module.css'

interface Login {
    username: string
    password: string
}




const Login = () => {
    const [login, setLogin] = useState<Login>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(login)
    }


    return (
        <div className={styles.flexContainer}>
            <div className={styles.image}></div>
            <div className={styles.login}>
                <h1>Login</h1>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <div className={styles.input}>
                        <input type="text" name="username" placeholder='Username' />
                    </div>
                    <div className={styles.input}>
                        <input type="password" name="password" placeholder='Password' />
                    </div>
                    <div className={styles.btns}>
                        <input className={styles.btn} type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Login;