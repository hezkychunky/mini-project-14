import React from "react";


export default function Wrapper({ children,}:{children: React.ReactNode} ) {
   return(
      <div className="w-full h-auto flex flex-col justify-center items-center gap-4 font-sans font-medium">{children}</div>
   )
}