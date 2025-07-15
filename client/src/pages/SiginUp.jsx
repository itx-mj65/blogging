import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getEnv } from '@/helpers/getenv'
import { RouteSignin, RouteSignup } from '@/helpers/RouteName'
import { showToast } from '@/helpers/showToast'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'
import Googlelogin from '@/components/Googlelogin'

const SignUp = () => {
    const navigate = useNavigate()

    const formSchema = z.object({
        name: z.string().min(4, "Name must be at least 4 characters long"),
        email: z.string().email(),
        password: z.string().min(4, "Password must be at least 4 characters long"),
        confirmpassword: z.string()
    }).refine((data) => data.password === data.confirmpassword, {
        message: "Passwords should be the same",
        path: ["confirmpassword"],
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmpassword: ""
        },
    })

    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            const data = await response.json()
            if (!response.ok) {
                showToast("error", data.message || "Something went wrong, please try again")

            } else {
                navigate(RouteSignin)
                showToast("success", "Account created successfully, please login")
            }

        } catch (error) {
            console.error("Error during registration:", error);
            showToast("error", "An error occurred while creating your account. Please try again later.");

        }
    }
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Card className='w-100 p-5' >
                <h2 className='text-2xl font-bold mb-4 text-center'>Create Account</h2>
                <div>
                    <Googlelogin />
                </div>
                {/* Separator */}
                <div className='flex items-center justify-center'>
                    <div className='w-full h-[1px] bg-gray-300'></div>
                    <span className='px-2 text-gray-500'>Or</span>
                    <div className='w-full h-[1px] bg-gray-300'></div>
                 </div>
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
                                            <Input placeholder="Enter your Name" {...field} />
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
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="confirmpassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mt-5'>

                            <Button type="submit" className='w-full'>Sign Up</Button>
                            <div className='mt-5 text-center text-sm flex justify-center items-center gap-2'>
                                <p>Already have an account? </p>
                                <Link to={RouteSignin} className='text-blue-500 hover:underline'>Sign In</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default SignUp