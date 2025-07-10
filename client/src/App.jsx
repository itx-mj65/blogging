import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout/Layout'
import { RouteAddcategory, RouteBlog, RouteBlogAdd, RouteCategorydetail, RouteEditblog, RouteEditcategory, Routeindex, RouteProfile, RouteSignin, RouteSignup } from './helpers/RouteName'
import Index from './pages/Index'
import Signin from './pages/Signin'
import SiginUp from './pages/SiginUp'
import Profile from './pages/Profile'
import Editcategory from './pages/category/Editcategory'
import Addcategory from './pages/category/Addcategory'
import Categorydetail from './pages/category/Categorydetail'
import Addblog from './pages/Blog/Addblog'
import Editblog from './pages/Blog/Editblog'
import Blogdetail from './pages/Blog/Blogdetail'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={Routeindex} element={<Layout />}>

            <Route index element={<Index />} />
            <Route path={RouteProfile} element={<Profile />} />


            {/* category routes  */}
            <Route path={RouteEditcategory()} element={<Editcategory />} />
            <Route path={RouteAddcategory} element={<Addcategory />} />
            <Route path={RouteCategorydetail} element={<Categorydetail />} />

            {/* blog routes  */}
            <Route path={RouteBlogAdd} element={<Addblog />} />
            <Route path={RouteEditblog()} element={<Editblog/>} />
            <Route path={RouteBlog} element={<Blogdetail/>} />





          </Route>
          <Route path={RouteSignin} element={<Signin />} />
          <Route path={RouteSignup} element={<SiginUp />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App