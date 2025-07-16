import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getEnv } from '@/helpers/getenv'
import { showToast } from '@/helpers/showToast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import useFetch from '@/hooks/useFetch'
import { IoCameraOutline } from "react-icons/io5";
import Loading from '@/components/Loading'
import Dropzone from 'react-dropzone'
import { Routeindex } from '@/helpers/RouteName'
import { setUser } from '@/redux/user/userAuth'

const Profile = () => {

    const [filepreview, setpreview] = useState()
    const [file, setfile] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)




    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`, {
        method: "get",
        credentials: "include"
    })


    const formSchema = z.object({
        name: z.string().min(4, "Name should be at least 4 characters"),
        bio: z.string().min(4, "Bio should be at least 4 characters"),
        email: z.string().email(),
        password: z.string().optional(),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            bio: "",
            password: "",
        },
    })

    useEffect(() => {
        if (data?.user) {
            form.reset({
                name: data.user.name || "",
                email: data.user.email || "",
                bio: data.user.bio || "",
                password: "",
            })
        }
    }, [data])


    async function onSubmit(values) {
        try {
            const userid=data.user._id 
            const formdata = new FormData()
            formdata.append("file", file)
            formdata.append("data", JSON.stringify(values))
            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/update-user/${userid}`, {
                method: "PUT",
                credentials: "include",
                body: formdata
            })

            const resdata = await response.json()

            if (!response.ok) {
                return showToast("error", resdata.message || "Something went wrong, please try again")
            } else {
                dispatch(setUser(resdata.user)) // ✅ FIXED
                // navigate(Routeindex)
                showToast("success", "User updated successfully")
            }

        } catch (error) {
            console.error("Error during login:", error)
            showToast("error", "An error occurred while updating the data. Please try again later.")
        }
    }

    const handlefileselection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setpreview(preview)
        setfile(file)
    }
    if (loading || !data?.user) return <Loading />

    return (
        <>
            <Card className='border-none max-w-screen-md mx-auto' >

                <CardContent >

                    <div className='flex justify-center items-center'>
                        <Dropzone onDrop={acceptedFiles => handlefileselection(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (

                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Avatar className='size-28 relative group'>
                                        <AvatarImage className='object-cover' src={filepreview ? filepreview : data?.user.avatar} />
                                        <div className='h-full w-full absolute top-1/2 left-1/2  z-50 -translate-x-1/2 -translate-y-1/2 bg-black/10 border-blue-500 rounded-full cursor-pointer   justify-center items-center group-hover:flex hidden '>
                                            <IoCameraOutline color='#7c3aed' />
                                        </div>
                                    </Avatar>

                                </div>

                            )}
                        </Dropzone>


                    </div>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} >
                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Your Name" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="shadcn@example.com" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter Your Bio"  {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mt-5'>

                                    <Button type="submit" className='w-full'>Update Profile</Button>

                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>


            </Card>



        </>
    )
}

export default Profile