import React, { useState } from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteBlogAdd, Routeindex, RouteProfile, RouteSignin } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getenv';
import { removeUser } from '@/redux/user/userAuth';
import { IoSearch } from "react-icons/io5";
import { useSidebar } from './ui/sidebar';
import { MdOutlineMenu } from "react-icons/md";

const Topbar = () => {
    const user = useSelector((state) => state.user)
    const [showserach, setshowserach] = useState(false)
    const { toggleSidebar } = useSidebar()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleserach = () => {
        setshowserach(!showserach)
    }
    const handlelogout = async () => {
        try {
            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
                method: "GET",
                credentials: "include",
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast("error", data.message || "Something went wrong, please try again")

            } else {
                dispatch(removeUser())
                navigate(Routeindex)
                showToast("success", "User logged Out successfully")
            }

        } catch (error) {
            console.error("Error during logOut:", error);
            showToast("error", "An error occurred while logging Out. Please try again later.");

        }
    }
    return (

        <>
            <div className='fixed flex items-center justify-between h-16 z-20 w-full bg-white px-7 py-10 md:px-14'>
                <div className='flex justify-center items-center gap-2'>
                    <MdOutlineMenu onClick={toggleSidebar} size={30} className='md:hidden block' />
                    <img src='/logo.png' className='h-15'  alt='logo'   /></div>
                <div className=" mx-4  w-auto md:w-130">

                    <div className={`md:relative absolute md:block   bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showserach ? 'block' : "hidden"}  `}><SearchBox /> </div>

                </div>
                <div className='flex items-center gap-5'>
                    <div>
                        <IoSearch size={25} onClick={toggleserach} className='md:hidden block' />
                    </div>
                    {user.isLoggedIn === false ? (
                        <Button asChild className='rounded-full z-40 bg-violet-500'>
                            <Link to={RouteSignin} className="flex items-center gap-1 rounded-full">
                                <span className="flex items-center gap-1" ><MdLogin /> Sign In</span>
                            </Link>
                        </Button>
                    ) : <DropdownMenu>
                        <DropdownMenuTrigger><Avatar>
                            <AvatarImage src={user.user.avatar} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <p>{user.user.name}</p>
                                <p>{user.user.email}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className='cursor-pointer' >
                                <Link to={RouteProfile} >  <FaRegUser />  Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className='cursor-pointer'>
                                <Link to={RouteBlogAdd} >  <FaPlus />  Add Blog</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild onClick={handlelogout} className='cursor-pointer'>
                                <Link to='' > <MdLogout color='red' />  LogOut</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    }

                </div>
            </div>

        </>

    )
}

export default Topbar