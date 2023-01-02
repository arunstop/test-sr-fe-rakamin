import React from "react"

function TextInput({...props}:React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`bg-white text-[#404040] border-[#EDEDED] px-4 py-2 rounded-lg border-2 ${props.className}`} />
}

export default TextInput
