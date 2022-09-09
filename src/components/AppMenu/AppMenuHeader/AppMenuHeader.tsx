import classNames from "classnames"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { VscAccount } from "react-icons/vsc";

interface props {
    isExpanded: boolean
}

const AppMenuHeader = ({ isExpanded }:props) => {

    const [classControl, setClassControl] = useState<boolean>(false)
    const [hiddenText, setHiddenText] = useState<boolean>(false)
    const [hoverItem, setHoverItem] = useState<boolean>(false)

    useEffect( () => {
        if ( isExpanded ) {
            setClassControl( !isExpanded )
            setHiddenText(!isExpanded )
        } else {
            setTimeout( () => {
                setClassControl( !isExpanded )
                setTimeout( () => setHiddenText(!isExpanded ), 400 )
            }, 300)
             
        }
        
    }, [isExpanded])

    const handleHover: React.MouseEventHandler<HTMLDivElement> = ( e ) => {
        if( !hoverItem ){
            setHoverItem( true )
            setTimeout( () =>{
               setHoverItem( false ) 
            } , 1000 )
        }
    }

    return (
        <AppMenuHeaderWrapper>
            <AppMenuLinkWrapper onClick={e => handleHover(e)}>
                <div className={ 
                    classNames(
                        { 'icon' : true },
                        { 'animationHover' : hoverItem }
                    )
                }>
                    <VscAccount />
                </div>
                <LinkWrapper className={ 
                    classNames(
                        { 'animationHidden' : classControl },
                        { 'hidden' : hiddenText }
                    )
                }>
                    <NavLink to='/'>Nome do usuário</NavLink>
                </LinkWrapper>
            </AppMenuLinkWrapper>
        </AppMenuHeaderWrapper>
        
    )
}

const AppMenuHeaderWrapper = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
`

const AppMenuLinkWrapper = styled.div`
    display: block;
    max-height: calc(1rem + 40px);
    overflow-y: hidden;
    cursor: pointer;

    &:hover {
        background-color: rgba(0,0,0,0.3);
    }

    & .icon {
        padding: 20px;
        display: inline-block;
        vertical-align: top;
    }

    & .animationHover {
        animation: jello 1s ease-out;
        @keyframes jello {
            0% {
                transform: scale3d(1, 1, 1);
            }

            30% {
                transform: scale3d(1.25, 0.75, 1);
            }

            40% {
                transform: scale3d(0.75, 1.25, 1);
            }

            50% {
                transform: scale3d(1.15, 0.85, 1);
            }

            65% {
                transform: scale3d(0.95, 1.05, 1);
            }

            75% {
                transform: scale3d(1.05, 0.95, 1);
            }

            100% {
                transform: scale3d(1, 1, 1);
            }
        }
    }
`

const LinkWrapper = styled.div`
    vertical-align: top;
    display: inline-block;
    width: 150px;
    overflow: hidden;
    animation: fadeInLeft 400ms ease;
    padding: 20px 10px 20px;
    color: white;
    @keyframes fadeInLeft {
        0% {
            opacity: 0;    
            width: 0;
        }
        30% {
            opacity: 0;
            transform: translateX(-10px);
            width: 150px;
        }

        100% {
            opacity: 1;
            transform: translateX(0);
            width: 150px;
        }
    }
    
    &.animationHidden {
        width: 0;
        opacity: 0;
        animation: fadeOutLeft 500ms ease;
        @keyframes fadeOutLeft {
            0% {
                opacity: 1;
                transform: translateX(0);
                width: 150px;
            }
            50% {
                opacity: 0;
                transform: translateX(-10px);
                width: 150px;
            }
            100% {
                opacity: 0;
                transform: translateX(-10px);
                width: 0;
            }
        }   
    }

    &.hidden {
        display: none;
    }

    & a,
    & a:visited {
        color: currentColor;
        text-decoration: none;
        display: block;
        font-weight: 200;
        font-size: 14px;
    }

`

export default AppMenuHeader