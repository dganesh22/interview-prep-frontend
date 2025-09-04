import React from 'react';
import moment from 'moment';

function RoleInfoHeader(props) {
    const { role, topicsToFocus, experience, description, questions, createdAt, updatedAt, _id } = props;
    return (
        <div className={"bg-white relative"}>
            <div className="container mx-auto px-10 md:px-0">
                <div className="h-[200px] flex flex-col justify-center relative z-10">
                    <div className="flex items-start">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-medium"> {role} </h2>
                                    <p className="text-sm text-medium text-gray-900 mt-1">
                                        { topicsToFocus }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <div className="header-item">
                            <strong>Experience: </strong>
                            <span className=""> { experience } { Number(experience) === 1 ? "year" : "years"}  </span>
                        </div>

                        <div className="header-item">
                            <strong>Questions:</strong>
                            <span className=""> { questions?.length } </span>
                        </div>

                        <div className="header-item">
                            <strong className="">Last Updated: </strong>
                            <span>{moment(updatedAt).format("YYYY-MM-DD HH:mm:ss a")}</span>
                        </div>
                    </div>
                </div>

                <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
                    <div className="w-16 h-16 blur-[65px] animate-blob1 bg-lime-400 "/>
                    <div className="w-16 h-16 blur-[65px] animate-blob2 bg-teal-400 "/>
                    <div className="w-16 h-16 blur-[45px] animate-blob3 bg-cyan-300 "/>
                    <div className="w-16 h-16 blur-[45px] animate-blob1 bg-fuchsia-200 "/>
                </div>
            </div>
        </div>
    );
}

export default RoleInfoHeader;