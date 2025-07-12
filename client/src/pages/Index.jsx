import Blogcard from '@/components/Blogcard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import React from 'react'

const Index = () => {
  const { data: blogdata, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/show-all-blog`, {
    method: "GET",
    credentials: "include"
  })

  if (!blogdata) return <Loading />
  if (error) return <div>Error: {error.message}</div>
  return (

    <div className='grid grid-cols-3 gap-3 px-6' >{
      blogdata && blogdata.blogs.length > 0 ? blogdata.blogs.map((blog)=>{
        return <Blogcard key={blog._id}  blog={blog} />
      }) : <div className='text-center text-2xl font-bold'>No Blogs Found</div>
      }
    </div>
  )
}

export default Index

