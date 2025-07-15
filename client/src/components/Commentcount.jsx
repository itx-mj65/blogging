import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import React from 'react'
import Loading from './Loading'
import { FaRegComment } from 'react-icons/fa6'

const Commentcount = ({ props }) => {
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/count-comment/${props.blogid}`, {
        method: "GET",
        credentials: "include"
    },[props])
    
    if (!data) return <Loading />
    return (
        <div className='flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-800 transition-all duration-300'>
            <FaRegComment  className='size-6' />
            <span>{data.count}</span>
        </div>
    )
}

export default Commentcount