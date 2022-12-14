import { useState } from "react"
import styled from "styled-components"
import { VscGraph, VscExtensions, VscSignOut, VscGear, VscFolderOpened, VscLocation, VscSymbolOperator, VscFile } from "react-icons/vsc";
import AppMenuFooter from "./AppMenuFooter/AppMenuFooter"
import AppMenuHeader from "./AppMenuHeader/AppMenuHeader"
import AppMenuLink from "./AppMenuLink/AppMenuLink"

const AppMenu = () => {

    const itens = [
        {
            name: 'Dashboard',
            path: '/',
            icon: <VscGraph/>
        },
        {
            name: 'Calculadora',
            path: '/calculadora',
            icon: <VscSymbolOperator/>
        },
        {
            name: 'Gráficos de mapa',
            path: '/map-chart',
            icon: <VscLocation/>
        },
        {
            name: 'Documento',
            path: '/gerador-documento',
            icon: <VscFile/>
        },
        {
            name: 'Tela 3',
            path: '/tela3',
            icon: <VscFolderOpened/>
        },
        {
            name: 'Tela 4',
            path: '/tela4',
            icon: <VscExtensions/>
        },
    ]

    const itensRodape = [
        {
            name: 'Configurações',
            path: '/config',
            icon: <VscGear/>
        },
        {
            name: 'Sair',
            path: '/logout',
            icon: <VscSignOut/>
        }
    ]
    
    const [opened, setOpened] = useState(false)
    
    const closeMenu = () => {
        setOpened(false)
    }

    return (
        <AppMenuWrapper 
            onMouseOver={e => setOpened(true)}
            onMouseLeave={e => closeMenu()}
        >
        <div className="top">
            <AppMenuHeader isExpanded={opened}/>
        </div>
        <div className="middle">
            {itens.map( (item, index) => {
                return (
                    <AppMenuLink key={index} isExpanded={opened} item={item}/>
                )
            })}
        </div>
        <div className="bottom">
            <AppMenuFooter>
            {itensRodape.map( (item, index) => {
                return (
                    <AppMenuLink key={index} isExpanded={opened} item={item}/>
                )
            })}
            </AppMenuFooter>
        </div>
            
        </AppMenuWrapper>
    )
}

const AppMenuWrapper = styled.nav`
    color: white;
    display: grid;
    grid-template-rows: auto 1fr auto;
`

export default AppMenu