import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from 'react-icons/fc'
import { Auth, provider } from '@/helpers/firebase'
import { signInWithPopup } from 'firebase/auth'
import { Routeindex } from '@/helpers/RouteName'
import { useNavigate } from 'react-router'
import { getEnv } from '@/helpers/getenv'
import { showToast } from '@/helpers/showToast'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/userAuth'

const Googlelogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleLogin = async () => {

        try {
            const googleresponse = await signInWithPopup(Auth, provider)
            const User = googleresponse.user
            const bodydata = {
                name: User.displayName,
                email: User.email,
                avatar: User.photoURL,
            }

            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/google-login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodydata),
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast("error", data.message || "Something went wrong, please try again")

            } else {
                dispatch(setUser(data.user))
                navigate(Routeindex)
                showToast("success", "User logged in successfully")
            }

        } catch (error) {
            console.error("Error during login:", error);
            showToast("error", "An error occurred while logging in. Please try again later.");

        }
    }
    return (
        <>
            <Button onClick={handleGoogleLogin} variant="outline" className='w-full'>
                <FcGoogle />
                <span>Continue with Google</span>
            </Button>

        </>
    )
}

export default Googlelogin