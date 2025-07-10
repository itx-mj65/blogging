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
const Categorydetail = () => {
    const [refreshdata, setrefreshdata] = useState(false)
    const { data: categorydata, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: "GET",
        credentials: "include"
    },[refreshdata])

    const handledelete = (id) => {
        const response = deletedata(`${getEnv('VITE_API_BASE_URL')}/category/delete/${id}`)
        if (response) {
            showToast("success", "Data Deleted Successfully")
            setrefreshdata(!refreshdata)
        } else {
            showToast("error", "Data Not Deleted")

        }
    }






    if (!categorydata) return <Loading />
    return (
        <>
            <Card>

                <CardHeader>
                    <div>
                        <Button asChild>
                            <Link to={RouteAddcategory} >Add Category</Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>

                    <Table >
                        <TableCaption>A list of All Categories</TableCaption>
                        <TableHeader className='text-center'>
                            <TableRow>
                                <TableHead >Category</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categorydata && categorydata.category.length > 0 ?
                                categorydata.category.map(category => {
                                    return <TableRow key={category._id} >
                                        <TableCell >{category.name}</TableCell>
                                        <TableCell >{category.slug}</TableCell>
                                        <TableCell className='flex gap-3' >
                                            <Button variant='outline' className='hover:bg-violet-500 hover:text-white' asChild >
                                                <Link to={RouteEditcategory(category._id)}  ><FaEdit />  </Link>
                                            </Button>
                                            <Button onClick={() => handledelete(category._id)} variant='outline' className='hover:bg-violet-500 hover:text-white' >
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

export default Categorydetail