import Comment from '@/components/Comment'
import Loading from '@/components/Loading'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import { decode } from 'entities'
import React from 'react'
import { useParams } from 'react-router'


const Singleblogdetail = () => {
    const { blog } = useParams()
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/show/${blog}`, {
        method: "GET",
        credentials: "include"
    })

    if (!data) return <Loading />
    return (
        <div className='flex justify-between gap-20 px-12' >
            <div className=' border rounded  w-[70%] p-5' >
                {data && data.blog &&
                    <>
                        <h1 className='mb-4 text-2xl font-bold'>{data.blog.title}</h1>
                        <div className='flex justify-between' >
                            <div className='flex items-center gap-3' >
                                <Avatar >
                                    <AvatarImage src={data.blog.author.avatar} />
                                </Avatar>
                                <span>{data.blog.author.name}</span>
                            </div>
                        </div>
                        <div className='my-4' >
                            <img src={data.blog.featuredImage} alt="blog image" className='rounded' />
                        </div>
                        <div className='text-gray-700' dangerouslySetInnerHTML={{ __html: decode(data.blog.blogcontent) || ' ' }} />

                        <div className='pt-5 border' >
                            <Comment  blogid={data.blog._id}  />
                        </div>

                    </>
                }
            </div>
            <div className=' border rounded  w-[30%]' ></div>
        </div>
    )
}

export default Singleblogdetail