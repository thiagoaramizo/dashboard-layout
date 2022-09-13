import styled from "styled-components"

interface props {
    children: React.ReactNode
    component?: 'h1' | 'h2' | 'h3' | 'h4' | undefined
    color?: string
}

const AppTitle = ( {children, component, color} : props ) => {
    
    return (
        <AppTitleWrapper>
            {children}
        </AppTitleWrapper>
    )
}

const AppTitleWrapper = styled.h1`
    font-weight: 600;
    font-size: 30px;
    color: var(--primary-darker);
    margin-bottom: 20px;
`

export default AppTitle