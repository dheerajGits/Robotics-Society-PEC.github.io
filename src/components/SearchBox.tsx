"use client";

import React, {useState} from 'react';
import { Input } from './ui/input';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    console.log(searchQuery);

    const handleSearch = (e : React.MouseEvent<HTMLButtonElement>) => {
        // TODO Call API for querying
        e.preventDefault();
    };

    return (
        <div className="flex flex-row w-full gap-5 px-[150px] text-4xl">
            <div className="flex text-white bg-purple-100 bg-opacity-50 rounded-[150px] w-full text-2xl">
                <Input
                    placeholder="Search for a project👀"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="placeholder:text-white placeholder:font-alata placeholder:font-bold px-4 border-none placeholder:text-2xl w-full h-auto !text-xl !text-white"
                />
            </div>
            <div className="flex flex-row gap-5 h-full">
                <Button className="flex flex-col rounded-[150px] h-auto bg-purple-100" onClick={handleSearch}>
                    <p className="text-2xl">Search 🔎</p>
                </Button>
                <Button className="flex flex-col rounded-[150px] h-auto bg-green-100" onClick={() => router.push("/projects/create")}>
                    <p className="text-2xl">➕Add New</p>
                </Button>
            </div>
        </div>
    );
};

export default SearchBox;