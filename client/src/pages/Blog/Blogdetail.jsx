import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RouteBlogAdd, RouteEditblog } from '@/helpers/RouteName'
import useFetch from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getenv'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import Loading from '@/components/Loading'
import { deletedata } from '@/helpers/deletedata'
import { showToast } from '@/helpers/showToast'

const Blogdetail = () => {
    const [refresh, setrefresh] = React.useState(false)
    const { data: blogdata, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/show-all-blog`, {
        method: "GET",
        credentials: "include"
    }, [refresh])
    const handledelete = async (blogid) => {
        const response = await deletedata(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${blogid}`)
        if (response) {
            setrefresh(!refresh)
            showToast("success", "Blog deleted successfully")
        } else {
            showToast("error", "Something went wrong, please try again")
        }
    }
    if (loading) return <Loading />
    return (
        <>
            <Card>

                <CardHeader>
                    <div>
                        <Button asChild>
                            <Link to={RouteBlogAdd} >Add Blog</Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>

                    <Table >
                        <TableCaption>A list of All Blogs</TableCaption>
                        <TableHeader className='text-center'>
                            <TableRow>
                                <TableHead >Author</TableHead>
                                <TableHead >Title</TableHead>
                                <TableHead >Content</TableHead>
                                <TableHead >Category</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Created At</TableHead>

                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogdata && blogdata.blogs.length > 0 ?
                                blogdata.blogs.map(blog => {
                                    return <TableRow key={blog._id} >
                                        <TableCell >{blog.author.name}</TableCell>
                                        <TableCell >{blog.title}</TableCell>
                                        <TableCell >{blog.blogcontent}</TableCell>
                                        <TableCell >{blog.category.name}</TableCell>
                                        <TableCell >{blog.slug}</TableCell>
                                        <TableCell >{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className='flex gap-3' >
                                            <Button variant='outline' className='hover:bg-violet-500 hover:text-white' asChild >
                                                <Link to={RouteEditblog(blog._id)}  ><FaEdit />  </Link>
                                            </Button>
                                            <Button onClick={() => handledelete(blog._id)} variant='outline' className='hover:bg-violet-500 hover:text-white' >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                })

                                : <TableRow>
                                    <TableCell colSpan="3" >Data Not Found</TableCell>

                                </TableRow>
                            }

                        </TableBody>
                    </Table>

                </CardContent>


            </Card>
        </>
    )
}

export default Blogdetail