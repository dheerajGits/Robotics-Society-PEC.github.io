"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns';

interface BlogType {
  blog_title:string,
  blog_sub_title:string,
  blog_text:string,
  blog_img_url:string,
  timestamp:number,
}


interface TimeAgoProps {
  timestamp: string | number | Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  return <span className='text-gray-400'>{timeAgo}</span>;
};


const BlogObject:React.FC<BlogType> = ({blog_img_url,blog_sub_title,blog_text,blog_title,timestamp}) => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-800 text-white rounded-xl overflow-hidden shadow-lg my-10">
      <div className="flex flex-col bg-[#6157C966] p-6 justify-center">
        <h2 className="text-2xl font-bold mb-2">{blog_title}</h2>
        <span className="text-sm text-black mb-2">- {blog_sub_title}</span>
        <TimeAgo timestamp={timestamp} />
        <p className="text-gray-100 mt-4 leading-relaxed">{blog_text}</p>
      </div>

      <div className="w-full md:w-40 flex-shrink-0">
        <Image
          className="w-full h-full object-cover rounded-tr-xl rounded-br-xl"
          width={160}
          height={160}
          src={blog_img_url}
          alt="blog image"
        />
      </div>
    </div>
  );
}
const Blog = () => {
  const [Data, setData] = useState<BlogType[]>([])
  useEffect(()=>{
    setData([
      {
        blog_title: "Title",
        blog_sub_title: "Sub Title",
        blog_text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nobis sequi fugit magni esse sapiente amet quia, quos at laborum officiis dignissimos et perspiciatis harum, vero odit mollitia, animi minima.",
        blog_img_url:
          "https://imagekit.io/blog/content/images/size/w100/2019/12/rahul-linkedin_1-100x100.jpg",
        timestamp: 170825,
      },
      {
        blog_title: "Title",
        blog_sub_title: "Sub Title",
        blog_text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nobis sequi fugit magni esse sapiente amet quia, quos at laborum officiis dignissimos et perspiciatis harum, vero odit mollitia, animi minima.",
        blog_img_url:
          "https://imagekit.io/blog/content/images/size/w100/2019/12/rahul-linkedin_1-100x100.jpg",
        timestamp: 170825,
      },
      {
        blog_title: "Title",
        blog_sub_title: "Sub Title",
        blog_text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nobis sequi fugit magni esse sapiente amet quia, quos at laborum officiis dignissimos et perspiciatis harum, vero odit mollitia, animi minima.",
        blog_img_url:
          "https://imagekit.io/blog/content/images/size/w100/2019/12/rahul-linkedin_1-100x100.jpg",
        timestamp: 170825,
      },
    ]);

  },[])
  return (
    <div className='flex flex-col items-center px-20'>
      {Data.map((data,index)=><BlogObject key={index} {...data}  />)}
    </div>
  )
}

export default Blog
