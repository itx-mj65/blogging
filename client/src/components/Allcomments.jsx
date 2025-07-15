import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import React from 'react'
import Loading from './Loading'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

const Allcomments = ({ props }) => {

    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/all-comment/${props.blogid}`, {
        method: "GET",
        credentials: "include"
    }, [props.blogid, props.newcomment])

    if (!data) return <Loading />
    return (
        <>
            <div className='p-5 flex flex-col gap-3'>
                <h4> {data && data.comments.length}  Comments</h4>
                {data && data.comments.length > 0 ? data.comments.map((comment) => {
                    return (
                        <div className='p-4 border rounded-2xl' key={comment._id} >
                            <div className='flex gap-2 '>
                                <Avatar >
                                    <AvatarImage src={comment.author.avatar} alt="author avatar" />
                                </Avatar>
                                <div className='flex flex-col gap-0'>
                                    <p className='font-bold'>{comment.author.name}</p>
                                    <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                                    <p className='pt-2'>{comment.comment}</p>

                                </div>
                            </div>
                        </div>
                    )
                }) : <p className='text-gray-500'>No comments yet</p>}
            </div>
        </>
    )
}

export default Allcomments