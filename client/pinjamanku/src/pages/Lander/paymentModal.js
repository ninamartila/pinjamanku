import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import Iframe from 'react-iframe'

const PaymentModal = (props) => {
    const { isModalVisible, handleOk, handleCancel, invoiceURL } = props
    return (
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Iframe url={invoiceURL}
                width="450px"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative" />
        </Modal>
    )
}

export default PaymentModal
