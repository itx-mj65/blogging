import { RouteSignin } from '@/helpers/RouteName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const RouteOnlyAdmin = () => {
    const user = useSelector(state => state.user)
    if (user && user.isLoggedIn === true && user.user.role == "admin") {

        return <Outlet />
    } else {
        return <Navigate to={RouteSignin} />
    }

}

export default RouteOnlyAdmin
