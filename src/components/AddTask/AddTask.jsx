import React from 'react'
import {
    Form, Input, Button
} from 'antd'
import TextArea from 'antd/lib/input/TextArea';

const AddTaskForm = ({ handleOk, form }) => {
    const handleSubmit = e => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                handleOk(values)
            }
        })
    }
    const { getFieldDecorator } = form
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }
    return <Form {...formItemLayout} onSubmit={handleSubmit}>

        <Form.Item label='Name'>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(<Input />)}
        </Form.Item>

        <Form.Item label="E-mail">
            {getFieldDecorator('email', {
                rules: [
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ],
            })(<Input />)}
        </Form.Item>

        <Form.Item label='Task'>
            {getFieldDecorator('text', {
                rules: [{ required: true, message: 'Please input your task!', whitespace: true }],
            })(<TextArea />)}
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Add Task
                    </Button>
        </Form.Item>
    </Form>
}

const WrappedAddTaskForm = Form.create({ name: 'register' })(AddTaskForm);

export default WrappedAddTaskForm