
import Googlelogin from '@/components/Googlelogin'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { getEnv } from '@/helpers/getenv'
import { showToast } from '@/helpers/showToast'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import slugify from 'slugify'
import { z } from 'zod'
import useFetch from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'
import { useSelector } from 'react-redux'
import { RouteBlog } from '@/helpers/RouteName'


const Addblog = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [filepreview, setpreview] = useState()
  const [file, setfile] = useState()
  const { data: categorydata, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: "GET",
    credentials: "include"
  })







  const formSchema = z.object({
    title: z.string().min(4, "Title should be at least 4 characters"),
    category: z.string().min(4, "Category should be at least 4 characters"),
    blogcontent: z.string().min(4, "Blog content should be at least 4 characters"),
    slug: z.string().min(4, "Slug should be at least 4 characters"),

  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      blogcontent: "",
      slug: "",
    },
  })

  const Title = form.watch('title')
  useEffect(() => {
    if (Title) {
      const slug = slugify(Title, { lower: true })
      form.setValue('slug', slug)
    }
  }, [Title])

  const handleEditorData = (event, editor) => {
    const data = editor.getData()
    form.setValue('blogcontent', data)
  }

  async function onSubmit(values) {
    console.log(values)
    try {
      const newvalues = { ...values, author: user.user._id }
      const formdata = new FormData()
      formdata.append("file", file)
      formdata.append("data", JSON.stringify(newvalues))
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/add`, {
        method: "POST",
        credentials: "include",
        body: formdata
      })

      const resdata = await response.json()

      if (!response.ok) {
        return showToast("error", resdata.message || "Something went wrong, please try again")
      } else {
        // navigate(Routeindex)
        form.reset()
        setfile(null)
        setpreview(null)
        showToast("success", "Blog added successfully")
        navigate(RouteBlog)
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

  if (loading) return <Loading />
  if (error) return <div>Error: {error.message}</div>
  return (
    <>
      <Card className='max-w-screen-md p-5 mx-auto' >
        <CardContent>
          <h2 className='text-2xl font-bold mb-4 text-center'>Add Blog</h2>




          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                          <SelectTrigger className='w-full'  >
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categorydata?.category?.length > 0 ? (
                              categorydata.category.map((category) => (
                                <SelectItem key={category._id} value={category._id}>
                                  {category.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem key="no-category" disabled>No Category Found</SelectItem>
                            )}
                          </SelectContent>

                        </Select>

                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder="Enter Title" {...field} />
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

              <div className='mb-3'>
                <span className='block mb-2'>Upload Image</span>
                <Dropzone onDrop={acceptedFiles => handlefileselection(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (

                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className='flex items-center justify-center h-36 w-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer'>
                        <img src={filepreview} />
                      </div>

                    </div>

                  )}
                </Dropzone>
              </div>
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="blogcontent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <Editor initialData={""} onChange={handleEditorData} />

                        {/* <Editor props={{ initialData: "", onChange: handleEditorData }} /> */}
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

export default Addblog