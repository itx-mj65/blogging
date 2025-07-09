import { AppSidebar } from '@/components/Appsidebar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <Topbar />
        <AppSidebar />
        <main className='border border-red-400 w-full'>
          <div className='w-full min-h-[calc(100vh-40px)] py-28 border-none'>
            <Outlet />
          </div>
          <Footer />

        </main>
      </SidebarProvider>

    </>
  )
}

export default Layout