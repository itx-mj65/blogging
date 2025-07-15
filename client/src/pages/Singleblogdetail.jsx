
import Comment from '@/components/Comment'
import Commentcount from '@/components/Commentcount'
import Likecount from '@/components/Likecount'
import Loading from '@/components/Loading'
import Relatedblog from '@/components/Relatedblog'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import { decode } from 'entities'
import React from 'react'
import { useParams } from 'react-router'


const Singleblogdetail = () => {
    const { blog, category } = useParams()
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/show/${blog}`, {
        method: "GET",
        credentials: "include"
    },[blog,category])

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
                                <div className='flex flex-col' >
                                    <span className='font-bold' >{data.blog.author.name}</span>
                                    <span className='text-gray-500 text-[14px]' >{new Date(data.blog.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-6' >
                                <Likecount props={{ blogid: data.blog._id }} />
                                <Commentcount props={{ blogid: data.blog._id }} />
                                
                            </div>
                        </div>
                        <div className='my-4' >
                            <img src={data.blog.featuredImage} alt="blog image" className='rounded' />
                        </div>
                        <div className='text-gray-700' dangerouslySetInnerHTML={{ __html: decode(data.blog.blogcontent) || ' ' }} />

                        <div className='pt-5 ' >
                            <Comment blogid={data.blog._id} />
                        </div>



                    </>
                }
            </div>
            <div className=' border rounded  w-[30%] p-5'  >
                <Relatedblog  props={{category:data.blog.category, currentblog:blog}}  />
            </div>
        </div>
    )
}

export default Singleblogdetail