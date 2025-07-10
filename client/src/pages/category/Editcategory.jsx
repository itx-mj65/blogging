
import Googlelogin from '@/components/Googlelogin'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getEnv } from '@/helpers/getenv'
import { showToast } from '@/helpers/showToast'
import useFetch from '@/hooks/useFetch'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router'
import slugify from 'slugify'
import { z } from 'zod'

const Editcategory = () => {
    const { category_id } = useParams()
    const { data: categorydata, loading, error } = useFetch(`${getEnv(`VITE_API_BASE_URL`)}/category/show/${category_id}`, {
        method: "get",
        credentials: "include"
    }, [category_id])

    const formSchema = z.object({
        name: z.string().min(4, "Name should be at least 4 characters"),
        slug: z.string().min(4, "Slug should be at least 4 characters"),

    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            slug: "",
        },
    })

    const CategoryName = form.watch('name')
    useEffect(() => {
        if (CategoryName) {
            const slug = slugify(CategoryName, { lower: true })
            form.setValue('slug', slug)
        }
    }, [CategoryName])


    useEffect(() => {
        if (categorydata && categorydata.category) {
            form.setValue('name', categorydata.category.name)
            form.setValue('slug', categorydata.category.slug)
        }
    }, [categorydata])



    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/category/update/${category_id}`, {
                method: "PUT",
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
                showToast("success", "Category Updated successfully")
            }

        } catch (error) {
            console.error("Error during login:", error);
            showToast("error", "An error occurred while Update. Please try again later.");

        }
    }

    return (
        <>
            <Card className='max-w-screen-md p-5 mx-auto' >
                <CardContent>
                    <h2 className='text-2xl font-bold mb-4 text-center'>Add Category</h2>




                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Name</FormLabel>
                                            <FormControl>
                                                <Input type='text' placeholder="Enter Category Name" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter Slug" {...field} />
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
                    </Form>
                </CardContent>
            </Card>


        </>
    )
}

export default Editcategory