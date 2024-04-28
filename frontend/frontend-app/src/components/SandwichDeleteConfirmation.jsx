import React from 'react';

const SandwichDeleteConfirmation = ({sandwich, handleDelete, onClose}) => {
    const handleConfirm = () => {
        handleDelete(sandwich._id);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div>
            <h1>Delete Confirmation</h1>
            <p>Are you sure you want to delete this sandwich?</p>
            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn-add" onClick={handleConfirm}>Confirm</button>
                <button className="btn-update" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default SandwichDeleteConfirmation;