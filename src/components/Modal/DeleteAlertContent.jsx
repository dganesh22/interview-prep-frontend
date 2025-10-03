import React from 'react';
import toast from "react-hot-toast";

function DeleteAlertContent(props) {
    const { content, onDelete, onClose } = props


    const cancelDelete = () => {
        onClose()
        toast.error("delete operation cancelled")
    }

    return (
        <div className={"p-5"}>
            <p className="text-[14px]"> { content } </p>

            <div className="flex justify-end mt-6">
                <button className="btn-success max-w-fit" onClick={onDelete}>
                    Confirm
                </button>
                <button className="btn-danger max-w-fit ms-2" onClick={cancelDelete}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DeleteAlertContent;