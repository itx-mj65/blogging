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
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '@/components/ui/avatar'
const AllUsers = () => {
    const [refreshdata, setrefreshdata] = useState(false)
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-all-user`, {
        method: "GET",
        credentials: "include"
    },[refreshdata])

    const handledelete = (id) => {
        const response = deletedata(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`)
        if (response) {
            showToast("success", "User Deleted Successfully")
            setrefreshdata(!refreshdata)
        } else {
            showToast("error", "User Not Deleted")

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
                                <TableHead >Role</TableHead>
                                <TableHead >Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.users.length > 0 ?
                                data.users.map(user => {
                                    return <TableRow key={user._id} >
                                        <TableCell >{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell >{user.role}</TableCell>
                                        <TableCell >{user.name}</TableCell>
                                        <TableCell >{user.email}</TableCell>
                                        <TableCell ><Avatar> <AvatarImage className='size-12 rounded-lg object-cover' src={user.avatar} />  </Avatar></TableCell>
                                        <TableCell className='flex gap-3' >
                                            
                                            <Button onClick={() => handledelete(user._id)} variant='outline' className='hover:bg-violet-500 hover:text-white' >
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

export default AllUsers