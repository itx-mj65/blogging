import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import React from 'react'
import Loading from './Loading'
import { Link } from 'react-router'
import { RouteBlogdetail } from '@/helpers/RouteName'

const Relatedblog = ({ props }) => {
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-related-blogs/${props.category.slug}/${props.currentblog}`, {
        method: "GET",
        credentials: "include"
    },[props])
    if (!data) return <Loading />
    return (
        <>
            <div>
                <h1 className='font-bold text-2xl mb-5'>Realted Blogs</h1>

                {data && data.relatedblog.length > 0 ?
                    data.relatedblog.map((rblog) => {
                        return (
                            <Link key={rblog._id} to={RouteBlogdetail(props.category.slug, rblog.slug)} >
                            <div className='flex gap-2 items-center mb-3'>
                                <img className='h-[70px] w-[100px] object-cover rounded-md' src={rblog.featuredImage} alt="" />
                                <h4 className='line-clamp-2 font-semibold text-lg' >{rblog.title}</h4>

                            </div>
                            </Link>
                        )
                    })
                    : <div> No Related Blogs Found </div>
                }



            </div>


        </>
    )
}

export default Relatedblog
