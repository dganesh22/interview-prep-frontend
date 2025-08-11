import React from 'react'
import { LuCircleX } from 'react-icons/lu'

function Modal(props) {
    const { children, isOpen, onClose, hideHeader, title } = props

    if(!isOpen) return null;

    return (
        <div className={"fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black-40"}>
            {/* modal content */}
            <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
            {/*    modal header */}
                {
                    !hideHeader && (
                        <div className={"flex items-center justify-between p-4 border-b border-gray-200"}>
                            <h3 className="md:text-lg font-medium text-gray-900"> { title } </h3>
                        </div>
                    )
                }

                <button type={"button"} className={"text-red-400 bg-transparent hover:bg-red-400 hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"} onClick={onClose}>
                    <LuCircleX/>
                </button>

                {/* modal body (scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    { children }
                </div>
            </div>
        </div>
    )
}

export  default  Modal