import React from 'react';

const OrderConfirmation = ({sandwich, handleOrder, onClose}) => {
    const handleConfirm = () => {
        handleOrder(sandwich);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div>
            <h1>Order Confirmation</h1>
            <p>Are you sure you want to confirm this order?</p>
            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn-update" onClick={handleCancel} style={{ margin: '0 10px' }}>Cancel</button>
                <button className="btn-add" onClick={handleConfirm} style={{ margin: '0 10px' }}>Confirm</button>
            </div>
        </div>
    );
};

export default OrderConfirmation;