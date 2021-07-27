import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import * as URL from '../constants/config'
import * as CFG from '../utils/FuntionConfig'

export const ProtectedRoute = ({ ROLE: roles, component: Component, ...rest }) => {
    const location = useLocation()
    const isLogin = localStorage.getItem('isLogin')
    const curentUser = CFG.Role()
    let compare = roles.includes(curentUser)
    if (!compare) {
        return <Redirect to={
            {
                pathname: URL.PATH.DEVICES
            }
        }
        />
    }
    return (
        <Route {...rest} render={props => {
            if (isLogin) {
                return <Component {...props} />
            } else {
                return <Redirect to={
                    {
                        pathname: URL.PATH.LOGIN,
                        state: {
                            from: location
                        }
                    }
                }
                />
            }
        }} />
    )
}



