import React from 'react';
import {ProjectCardProps} from "@/types";
import Image from "next/image";
import {timeAgo} from "@/lib/utils";

const ProjectCard = ({data}:ProjectCardProps ) => {
    return (
        <div className="text-white bg-purple-100 rounded-[50px] px-10 max-sm:grid-rows-2 grid sm:grid-cols-2 max-sm:w-full h-auto">
            <div className="py-7 px-10 font-alata w-auto">
                <p className="text-4xl">{data.title}</p>
                <p className="text-xl text-black text-bold">-{data.subtitle}</p>
                <p className="text-xl text-[#2C2C2C]">{timeAgo(data.created)}</p>
                <p className="hidden text-3xl max-sm:block">{data.description.slice(0,20)}...<span className="font-bold text-black">Read More</span></p>
                <p className="text-3xl max-sm:hidden">{data.description.slice(0,150)}...<span className="font-bold text-black">Read More</span></p>
            </div>
            <div className="flex flex-col items-center justify-between w-auto relative">
                <Image
                    src={data.imageUrl}
                    alt={data.title}
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default ProjectCard;