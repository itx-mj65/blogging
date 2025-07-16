import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout/Layout'
import { RouteAddcategory, RouteAllUser, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogdetail, RouteCategorydetail, RouteEditblog, RouteEditcategory, RouteGetAllComment, Routeindex, RouteProfile, RouteSearch, RouteSignin, RouteSignup } from './helpers/RouteName'
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
import Singleblogdetail from './pages/Singleblogdetail'
import BlogBycategory from './pages/Blog/BlogBycategory'
import SearchResult from './pages/SearchResult'
import Allcomments from './components/Allcomments'
import GetAllcomments from './pages/GetAllcomments'
import AllUsers from './pages/AllUsers'
import AuthUserProtection from './components/AuthUserProtection'
import RouteOnlyAdmin from './components/RouteOnlyAdmin'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={Routeindex} element={<Layout />}>

            <Route index element={<Index />} />





            {/* blog routes  */}

            <Route path={RouteBlogdetail()} element={<Singleblogdetail />} />

            <Route path={RouteBlogByCategory()} element={<BlogBycategory />} />
            <Route path={RouteSearch()} element={<SearchResult />} />
            {/* Routes protection  */}
            <Route element={<AuthUserProtection />} >

              <Route path={RouteProfile} element={<Profile />} />
              <Route path={RouteAllUser} element={<AllUsers />} />
              <Route path={RouteEditblog()} element={<Editblog />} />
              <Route path={RouteBlog} element={<Blogdetail />} />
              <Route path={RouteGetAllComment} element={<GetAllcomments />} />
              <Route path={RouteBlogAdd} element={<Addblog />} />
            </Route>
            <Route element={<RouteOnlyAdmin />} >

              {/* category routes  */}
              <Route path={RouteEditcategory()} element={<Editcategory />} />
              <Route path={RouteAddcategory} element={<Addcategory />} />
              <Route path={RouteCategorydetail} element={<Categorydetail />} />
            </Route>

          </Route>
          <Route path={RouteSignin} element={<Signin />} />
          <Route path={RouteSignup} element={<SiginUp />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App