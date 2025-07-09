import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout/Layout'
import { Routeindex, RouteProfile, RouteSignin, RouteSignup } from './helpers/RouteName'
import Index from './pages/Index'
import Signin from './pages/Signin'
import SiginUp from './pages/SiginUp'
import Profile from './pages/Profile'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes> 
            <Route path={Routeindex} element={<Layout />}>
            <Route index element={<Index />} />
            <Route path={RouteProfile} element={<Profile />} />
          </Route>
          <Route path={RouteSignin} element={<Signin />} />
          <Route path={RouteSignup} element={<SiginUp />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App