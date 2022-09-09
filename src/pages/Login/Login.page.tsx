import styled from "styled-components"
import LoginForm from "./components/LoginForm"

const LoginPage = () => {
    return (
        <LoginWrapper>
            <div className="blurBackground">
                <LoginForm/>
            </div>
        </LoginWrapper>
    )
}

const LoginWrapper = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;

    & .blurBackground {
        position: relative;
        width: 100vw;
        height: 100vh;
        display: grid;
        align-content: center;
        justify-content: center;
        background: rgba( 0, 0, 0, 0.35 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        animation: bluring 1s ease-out;
        @keyframes bluring {
            0% {
                background: rgba( 0, 0, 0, 0 );
                backdrop-filter: blur( 0 );
                -webkit-backdrop-filter: blur( 0 );
            }
            100% {
                background: rgba( 0, 0, 0, 0.35 );
                backdrop-filter: blur( 4px );
                -webkit-backdrop-filter: blur( 4px );
            }
        }
    }
`

export default LoginPage