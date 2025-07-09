import React from 'react'
import { Button } from './ui/button'
import { Link, useNavigate} from 'react-router'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { Routeindex, RouteProfile, RouteSignin } from '@/helpers/RouteName';
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

const Topbar = () => {
    const user = useSelector((state) => state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handlelogout = async ()=>{
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
            <div className='fixed flex items-center justify-between h-16 z-20 w-full bg-white px-14'>
                <div><h2>Logo</h2></div>
                <div className=" w-130 mx-4"> <SearchBox /> </div>
                <div>
                    {user.isLoggedIn === false ? (
                        <Button asChild className='rounded-full'>
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
                            <DropdownMenuItem asChild   className='cursor-pointer' >
                                <Link to={RouteProfile} >  <FaRegUser/>  Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild  className='cursor-pointer'>
                                <Link to='' >  <FaPlus/>  Add Blog</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild  onClick={handlelogout}  className='cursor-pointer'>
                                <Link to='' > <MdLogout color='red'/>  LogOut</Link>
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