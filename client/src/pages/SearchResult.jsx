import Blogcard from '@/components/Blogcard'
import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import React from 'react'
import { BiCategory, BiSearch } from 'react-icons/bi'
import { useSearchParams } from 'react-router'
const SearchResult = () => {
    const [searchParams]=useSearchParams()
    const q=searchParams.get("q")
      const { data: blogdata, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
            method: "GET",
            credentials: "include"
        },[q])
    console.log(blogdata)
  return (
   <>
        <div className='flex justify-baseline mx-6 py-3 text-xl mb-6 text-violet-500 border-b items-center gap-3'><BiSearch />
        {q}
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

export default SearchResult