import React from 'react'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Badge } from './ui/badge'
import { SlCalender } from "react-icons/sl";
import { Link } from 'react-router'
import { RouteBlogdetail } from '@/helpers/RouteName'

const Blogcard = (props) => {
    const user = useSelector((state) => state.user)
    return (
        <Link to={RouteBlogdetail(props.blog.category.slug, props.blog.slug)} >
            <Card>
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Avatar >
                                <AvatarImage src={props.blog.author.avatar} alt="admin img" />
                            </Avatar>
                            <p>{props.blog.author.name}</p>
                        </div>

                        {user.user?.role === 'admin' && 
                            <Badge variant='outline' className='bg-violet-500' >Admin</Badge>}
                    </div>

                    <div className='my-3'>
                        <img src={props.blog.featuredImage} className='rounded' alt="blog image here" />
                    </div>

                    <div>
                        <p className='flex items-center gap-2 text-sm text-gray-500'>
                            <SlCalender />
                            <span>{new Date(props.blog.createdAt).toLocaleDateString()}</span>
                        </p>
                        <h2 className='text-2xl font-bold line-clamp-2'>{props.blog.title}</h2>
                    </div>


                </CardContent>
            </Card>
        </Link>
    )
}

export default Blogcard