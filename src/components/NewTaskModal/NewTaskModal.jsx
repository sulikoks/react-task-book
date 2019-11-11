import React, { useState } from 'react'
import { Modal, Button } from 'antd'

import AddTask from '../AddTask/AddTask'

const NewTaskModal = ({ isLoading, addTask }) => {
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
    }
    const handleOk = task => {
        addTask(task)
        setVisible(false)
    }
    const handleCancel = e => {
        setVisible(false)
    }
    return <div>
        <Button type="primary" onClick={showModal} disabled={isLoading}>
            Add new Task
        </Button>
        <Modal
            title="Add new Task"
            visible={visible}
            onCancel={handleCancel}
            footer={false}
        >
            <AddTask handleOk={handleOk} />
        </Modal>
    </div>
}
export default NewTaskModal