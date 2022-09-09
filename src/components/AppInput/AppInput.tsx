import { useState } from "react"
import styled from "styled-components"
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import classNames from "classnames";

interface props {
    label: string,
    value: string,
    type?: 'text' | 'password' | 'number' | undefined,
    name?: string | undefined,
    handleChange: (value: string) => void
    required?: boolean
}

const AppInput = ({ label, value, name, type, handleChange, required=false }: props) => {
    
    const [showPass, setShowPass] = useState(false)
    const [labelMove, setlabelMove] = useState(false)
    
    const handleChangeIn = ( newValue: string ) => {
        handleChange( newValue )
    }

    const handleFocus = () => {
        setlabelMove(true)
    }

    const handleBlur = () => {
        if ( !value ){
            setlabelMove( false )
        }
    }

    const getType = ( t: 'text' | 'password' | 'number' ) => {
        return (t === 'password' && showPass) ? 'text' : t
    }

    return (
        <InputWrapper>
            <label 
                className={ 
                    classNames( 
                        { 'labelMove' : labelMove },
                    )}
                htmlFor={ label.replaceAll( ' ', '' ).toLowerCase() }
            >
                {label}{required? '*' : ''}
            </label>
            <input 
                type={ type ? getType(type) : 'text'} 
                value={value}
                id={ label.replaceAll( ' ', '' ).toLowerCase() } 
                name={ name? name : ''}
                onChange={ e => handleChangeIn( e.target.value ) }
                onFocus={ e => handleFocus() }
                onBlur={ e => handleBlur() }
                required={required}
            />
            { type === 'password' ? (
                <span
                    className="passEye" 
                    onClick={ e => setShowPass(!showPass) }
                >
                    {showPass ? <VscEye/> : <VscEyeClosed/>}
                </span>
            ) : ''}
        </InputWrapper>
    )
}

const InputWrapper = styled.div`

    display: block;
    width: 100%;
    font-size: 16px;
    position: relative;
    padding-bottom: 30px;

    & label {
        position: absolute;
        top: 16px;
        left: 15px;
        transition: all 500ms ease-in-out;
        color: #555;

        &.labelMove {
            color: var(--primary);
            top: -12px;
            padding: 5px;
            background-color: white;
            font-size: 12px;
            font-weight: 600;
        }
    }

    & input {
        width: 100%;
        font-size: 16px;
        padding: 15px;
        outline: 0;
        border: 1px solid var(--primary);
        border-radius: 5px;

        &:active,
        &:focus {
            border-color: transparent;
            box-shadow: 0px 0px 3px var(--primary);
            outline: 0;
        }
    }

    & span.passEye {
        position: absolute;
        cursor: pointer;
        font-size: 20px;
        display: block;
        top: 15px;
        right: 15px;
        color: #555;
    }
    
`

export default AppInput