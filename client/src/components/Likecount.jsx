import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { BiLike } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { showToast } from '@/helpers/showToast';
import { BiSolidLike } from "react-icons/bi";

const Likecount = ({ props }) => {
    const [likeCount, setLikeCount] = useState(false);
    const [filled, setFilled] = useState(false);
    const user = useSelector((state) => state.user)
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/like/count-like/${props.blogid}?userid=${user && user.isLoggedIn === true ? user.user._id : ''}`, {
        method: "GET",
        credentials: "include"
    }, [props.blogid, likeCount])

    useEffect(() => {
        if (data && data.isLiked) {
            setFilled(true);
        } else {
            setFilled(false);
        }
    }, [data]);
    
    const handlelike = async () => {
        if (user.isLoggedIn === false) {
            return showToast("error", "Please login to like the blog")
        }
        const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/like/dolike`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogid: props.blogid, author: user.user._id }),
            credentials: "include"
        });
        const resdata = await response.json();
        if (response.ok) {
            setLikeCount(!likeCount);
            setFilled(!filled);
        } else {
            showToast("error", "Something went wrong, please try again");
        }
    }

    if (!data) return <Loading />
    return (
        <div className='flex items-center gap-1 text-gray-500 cursor-pointer hover:text-gray-800 transition-all duration-300'>
            { filled ? <BiSolidLike onClick={handlelike} className='size-6 text-blue-500' /> : <BiLike className='size-6' onClick={handlelike} />}
            <span>{data.count}</span>
        </div>
    )
}

export default Likecount