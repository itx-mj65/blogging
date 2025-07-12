import React from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FaRegComments } from "react-icons/fa6";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getenv';
import { useSelector } from 'react-redux';
import { RouteSignin } from '@/helpers/RouteName';
import { Link } from 'react-router';
const Comment = (props) => {
    const user=useSelector((state) => state.user)
    console.log(localStorage.getItem("user"))
    const formSchema = z.object({
        comment: z.string().min(4, "Comment should be at least 4 characters"),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    })

    async function onSubmit(values) {
        values.blogid = props.blogid; // Add blogid to the comment data
        values.author = user.user._id; // Get the user ID from the Redux store
     
        try {
            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/comment`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast("error", data.message || "Something went wrong, please try again")

            } else {
                showToast("success", "Comment Added successfully")
                form.reset()
            }

        } catch (error) {
            console.error("Error during comment submission:", error);
            showToast("error", "An error occurred while submitting your comment. Please try again later.");

        }
    }



    return (
        <div>

            <div className='flex  items-center gap-2' >
                <FaRegComments className='text-violet-500' />
                <h4 className='text-gray-700 font-bold text-2xl'> Comments</h4>
            </div>

            { user.isLoggedIn ?
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className='mb-3'>
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Textarea type='text' placeholder="Enter Comment" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='mt-5'>

                        <Button type="submit" className='w-full'> Save</Button>

                    </div>
                </form>
            </Form>: <Button className='mt-5'  ><Link to={RouteSignin}  >Login to Comment</Link></Button>
            }

        </div>
    )
}

export default Comment
