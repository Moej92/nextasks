"use client";

import Image from "next/image";
import Searchbar from "./Searchbar";

import { useState } from "react";

const Search = ({ userId }: { userId: string }) => {
    const [showSearchbar, setShowSearchbar] = useState(false); 

    const hideSearchbar = () => setShowSearchbar(false);

    return (
        <div className="flex">
            <label 
                htmlFor="search"
                className="md:hidden bg-blue-500 rounded-md transition-transform cursor-pointer hover:scale-105"
                onClick={() => setShowSearchbar(true)}    
            >
                <Image 
                    src="/search.svg"
                    alt="search icon"
                    width={30}
                    height={30}
                />
            </label>
            

            <Searchbar 
                userId={userId}
                showSearchbar={showSearchbar}
                hideSearchbar={hideSearchbar}
            />
        </div>
    );
}
 
export default Search;