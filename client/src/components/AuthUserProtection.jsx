import { RouteSignin } from '@/helpers/RouteName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const AuthUserProtection = () => {
    const user = useSelector(state => state.user)
    if (user && user.isLoggedIn === true) {

        return <Outlet />
    }else{
      return   <Navigate to={RouteSignin} />
    }

}

export default AuthUserProtection
