import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import Iframe from 'react-iframe'

const BorrowerPayModal = (props) => {
    const { isModalVisible, handleOk, handleCancel, data } = props
    return (
        <Modal title="Borrower Pay Loan" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>{data?.toString()}</p>
        </Modal>
    )
}

export default BorrowerPayModal
