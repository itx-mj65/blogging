import Blogcard from '@/components/Blogcard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { useParams } from 'react-router'

const BlogBycategory = () => {
    const { category } = useParams()
    const { data: blogdata, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blogs-by-category/${category}`, {
        method: "GET",
        credentials: "include"
    }, [category])

    if (!blogdata) return <Loading />
    if (error) return <div>Error: {error.message}</div>
    return (<>
        <div className='flex justify-baseline mx-6 py-3 text-xl mb-6 text-violet-500 border-b items-center gap-3'><BiCategory />
        {blogdata && blogdata.categorydata?.name}
        </div>
        <div className='grid grid-cols-3 gap-3 px-6' >{
            blogdata && blogdata.blogs.length > 0 ? blogdata.blogs.map((blog) => {
                return <Blogcard key={blog._id} blog={blog} />
            }) : <div className='text-center text-2xl font-bold'>No Blogs Found</div>
        }
        </div>
    </>
    )
}

export default BlogBycategory