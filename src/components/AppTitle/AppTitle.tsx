import styled from "styled-components"

interface props {
    children: React.ReactNode
    component?: 'h1' | 'h2' | 'h3' | 'h4' | undefined
    color?: string
}

const AppTitle = ( {children, component, color} : props ) => {
    
    return (
        <>
        </>
    )
}

const AppTitleWrapper = styled.h1`
    
`

export default AppTitle