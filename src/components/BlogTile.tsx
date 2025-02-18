import { timeAgo } from "@/lib/utils";
import Image from "next/image";

export interface BlogType {
    blog_title: string;
    blog_sub_title: string;
    blog_text: string;
    blog_img_url: string;
    timestamp: number;
}

interface TimeAgoProps {
    timestamp: string | number | Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
    return (
        <span className="text-gray-400">{timeAgo(new Date(timestamp))}</span>
    );
};

const BlogObject: React.FC<BlogType> = ({
    blog_img_url,
    blog_sub_title,
    blog_text,
    blog_title,
    timestamp,
}) => (
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
export default BlogObject;
