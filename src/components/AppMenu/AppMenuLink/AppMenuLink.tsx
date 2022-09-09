import classNames from "classnames"
import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

interface props {
    isExpanded: boolean
    item: itemType
}

interface itemType {
        name: string;
        path: string;
        icon: JSX.Element;
}

const AppMenuLink = ({ isExpanded, item }:props) => {

    const [classControl, setClassControl] = useState<boolean>(false)
    const [hiddenText, setHiddenText] = useState<boolean>(false)
    const [hoverItem, setHoverItem] = useState<boolean>(false)

    const location = useLocation().pathname.split('/');
    let active = location[1] === item.path.replace('/', '')
    const navigate = useNavigate()

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

    const handleClick: React.MouseEventHandler<HTMLDivElement> = ( e ) => {
        if( !hoverItem ){
            setHoverItem( true )
            navigate(item.path)
            setTimeout( () =>{
               setHoverItem( false )
            } , 1000 )
        }
    }

    return (
        <AppMenuLinkWrapper onClick={e => handleClick(e)} className={classNames(
            { 'active' : active }
        )}>
            <div className={ 
                classNames(
                    { 'icon' : true },
                    { 'animationHover' : hoverItem }
                )
            }>  
                {item.icon}
            </div>
            <LinkWrapper className={ 
                classNames(
                    { 'animationHidden' : classControl },
                    { 'hidden' : hiddenText }
                )
            }>
                <span>{item.name}</span>
            </LinkWrapper>
        </AppMenuLinkWrapper>
        
    )
}

const AppMenuLinkWrapper = styled.div`
    display: block;
    max-height: calc(1rem + 40px);
    overflow-y: hidden;
    font-weight: 400;
    color: white;
    cursor: pointer;

    &.active,
    &:hover {
        background-color: rgba(0,0,0,0.3); 
    }

    &.active {
        font-weight: 600;
        color: var(--primary-light);
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

    & span {
        text-decoration: none;
        display: block;
        font-size: 14px;
    }

`

export default AppMenuLink