import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddcategory, RouteEditcategory } from '@/helpers/RouteName'
import React, { useState } from 'react'
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
import useFetch from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getenv'
import Loading from '@/components/Loading'
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { deletedata } from '@/helpers/deletedata'
import { showToast } from '@/helpers/showToast'
const GetAllcomments = () => {
    const [refreshdata, setrefreshdata] = useState(false)
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all-comment`, {
        method: "GET",
        credentials: "include"
    },[refreshdata])

    const handledelete = (id) => {
        const response = deletedata(`${getEnv('VITE_API_BASE_URL')}/blog/delete-comment/${id}`)
        if (response) {
            showToast("success", "comment Deleted Successfully")
            setrefreshdata(!refreshdata)
        } else {
            showToast("error", "comment Not Deleted")

        }
    }






    if (!data) return <Loading />
    return (
        <>
            <Card>

                <CardContent>

                    <Table >
                        <TableCaption>A list of All Comments</TableCaption>
                        <TableHeader className='text-center'>
                            <TableRow>
                                <TableHead >Created At</TableHead>
                                <TableHead >Commented By</TableHead>
                                <TableHead>Blog Title</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.comments.length > 0 ?
                                data.comments.map(comment => {
                                    return <TableRow key={comment._id} >
                                        <TableCell >{new Date(comment.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell >{comment.author.name}</TableCell>
                                        <TableCell >{comment.blogid.title}</TableCell>
                                        <TableCell >{comment.comment}</TableCell>
                                        <TableCell className='flex gap-3' >
                                            
                                            <Button onClick={() => handledelete(comment._id)} variant='outline' className='hover:bg-violet-500 hover:text-white' >
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

export default GetAllcomments