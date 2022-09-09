import classNames from "classnames"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

interface props {
    children: React.ReactNode
}

const AppMenuFooter = ({ children }:props) => {

    return (
        <AppMenuFooterWrapper>
            {children}
        </AppMenuFooterWrapper>
        
    )
}

const AppMenuFooterWrapper = styled.div`
    padding: 20px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 20px;
`

export default AppMenuFooter