import React from 'react'
import { Form, Icon, Input, Button } from 'antd'


const LoginForm = ({ form, login }) => {
    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err)
                login(values)
        })
    }

    return <div style={{ width: '300px' }}>
        <h2>Login</h2>
        <Form className='login-form' onSubmit={handleSubmit}>

            <Form.Item>
                {form.getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                    />,
                )}
            </Form.Item>

            <Form.Item>
                {form.getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default Form.create({ name: 'login' })(LoginForm)