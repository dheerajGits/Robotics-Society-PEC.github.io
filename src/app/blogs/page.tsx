"use client"
import React, { useEffect, useState } from 'react'
import { BlogFillerData } from '@/raw data/blog';
import BlogObject, { BlogType } from '@/components/BlogTile';




const Blog = () => {
  const [Data, setData] = useState<BlogType[]>([])
  useEffect(()=>{
    setData(BlogFillerData);
  },[])
  
  return (
    <div className='flex flex-col items-center px-20'>
      {Data.map((data,index)=><BlogObject key={index} {...data}  />)}
    </div>
  )
}

export default Blog
