import React from 'react';
import {projectsCardData} from "@/raw data/projectsData";
import ProjectCard from "@/components/ProjectCard";
import Link from 'next/link';

const ProjectsPage = () => {
    return (
        <div className="flex flex-col gap-10 px-[150px] h-auto mt-10">
            {projectsCardData.map((projectData,index) => (
                <Link href={`/projects/${projectData.id}`} className="flex flex-col gap-10" key={index}>
                    <ProjectCard data={projectData} />
                </Link>
            ))}
        </div>
    );
};

export default ProjectsPage;