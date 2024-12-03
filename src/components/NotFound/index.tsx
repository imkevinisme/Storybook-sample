import React from 'react'
import { SearchX } from 'lucide-react'

export const NotFound = ( info : { text : string } ) => {
    return (
        <div className="h-full w-full flex flex-col gap-1 justify-center items-center">
            <SearchX />
            <p>{info.text}</p>
         </div>
    )
}
