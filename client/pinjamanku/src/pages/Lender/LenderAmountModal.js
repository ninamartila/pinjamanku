import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import Iframe from 'react-iframe'

const LenderAmountModal = (props) => {
    const { isModalVisible, handleOk, handleCancel, data } = props
    return (
        <Modal title="Borrower Pay Loan" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <h3>Your fund is now being processed</h3>
            <p>We will notify you via email once the payment has been completed</p>
        </Modal>
    )
}

export default LenderAmountModal
