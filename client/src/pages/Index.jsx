import AboutSection from '@/components/AboutSection'
import Blogcard from '@/components/Blogcard'
import CenteredSection from '@/components/CenteredSection'
import FeatureSection from '@/components/FeatureSection'
import HeroCarousel from '@/components/HeroCarousel'
import LatestBlogsHeader from '@/components/LatestBlogsHeader'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getenv'
import useFetch from '@/hooks/useFetch'
import React from 'react'

const Index = () => {
  const { data: blogdata, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/blogs`, {
    method: "GET",
    credentials: "include"
  })

  if (!blogdata) return <Loading />
  if (error) return <div>Error: {error.message}</div>
  return (
    <>
      <div>
        <HeroCarousel />
      </div>
      <div className='mb-4 px-4 mt-[-15px]'>
        <LatestBlogsHeader props={{ title: "Welcome to Mind Drape", desc: " Unfolding inspiration, one meaningful post at a time — weaving stories that spark ideas and leave a lasting impression." }} />
      </div>



      <FeatureSection   />
      <div className='my-8'>
        <LatestBlogsHeader  props={{title:" Latest from Mind Drape", desc:" Fresh stories, insights, and inspiration — crafted thoughtfully, just for you."}} />
      </div>

      <div className='grid md:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-3 px-6' >{
        blogdata && blogdata.blogs.length > 0 ? blogdata.blogs.map((blog) => {
          return <Blogcard key={blog._id} blog={blog} />
        }) : <div className='text-center text-2xl font-bold'>No Blogs Found</div>
      }
      </div>

      <div>
        <AboutSection />
      </div>

    </>

  )
}

export default Index

