import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import AppInput from "../../../components/AppInput/AppInput"

const LoginForm = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        console.log( {
            username: username,
            password: password
        } )
        navigate('/')
    }


    return (
        <LoginFormWrapper>
            <form onSubmit={ e => handleSubmit(e)}>
                <AppInput
                    type="text"
                    label='Nome de usuário'
                    value={username}
                    handleChange={setUsername} 
                    required={true}                
                />
                <AppInput
                    type="password"
                    label='Senha'
                    value={password}
                    handleChange={setPassword} 
                    required={true}                 
                />
                <button type="submit">Enviar</button>
            </form>

            
        </LoginFormWrapper>
    )
}

const LoginFormWrapper = styled.section`
    width: 600px;
    height: auto;
    min-height: 400px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
    padding: 30px;
`

export default LoginForm