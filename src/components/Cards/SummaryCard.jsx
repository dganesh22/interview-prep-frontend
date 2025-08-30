import React from 'react';
import moment from 'moment'
import {LuTrash2} from "react-icons/lu";
import {generateInitials} from "../../util/helper.js";

function SummaryCard(props) {
    const { colors, onSelect, onDelete, role, user, topicsToFocus, questions, experience, description, createdAt, updatedAt} = props
    return (
        <div className={"bg-white border border-gray-300 rounded-xl p-2 overflow-hidden cursor-pointer  hover:shadow-xl shadow-gray-100 relative group"} onClick={onSelect}>
            <div className="rounded-lg p-4 cursor-pointer relative" style={{ background: colors.bgcolor }}>
                <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
                        <span className="text-lg font-semibold text-black">
                            { generateInitials(role)}
                        </span>
                    </div>

                {/*    content container */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                        {/*    title and skills */}
                            <div className="">
                                <h2 className="text-[17px] font-medium capitalize text-purple-700"> { role } </h2>
                                <p className="text-xs text-medium text-gray-800"> { topicsToFocus } </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="hidden group-hover:flex items-center gap-2 text-xs text-rose-600 font-medium bg-rose-50 px-3 py-1  rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0" onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}>
                    <LuTrash2 className="text-sm"/>
                </button>
            </div>

            <div className="px-3 pb-3">
                <div className="flex items-center gap-3 mt-4">
                    <div className="summary-item">
                        <strong>Experience:</strong> <span>{ experience } { Number(experience) === 1? "year": "years"}</span>
                    </div>

                    <div className="summary-item">
                       <strong> Q&A:</strong> <span>{ questions?.length }</span>
                    </div>

                    <div className="summary-item">
                       <strong> Last Updated:</strong> <span>{ moment(updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>
                    </div>
                </div>
                {/*    Description */}
                <p className="mt-3 text-sm text-gray-600 font-medium line-clamp-2">
                    { description }
                </p>
            </div>
        </div>
    );
}

export default SummaryCard;