"use client"
import React from 'react'
import { BlogFillerData } from '@/raw data/blog';
import BlogObject from '@/components/BlogTile';




const Blog = () => {
    return (
        <div className="flex flex-col items-center px-20">
            {BlogFillerData.map((data, index) => (
                <BlogObject key={index} {...data} />
            ))}
        </div>
    );
}

export default Blog
