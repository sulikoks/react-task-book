import React, { useState, useEffect } from 'react'
import { Table, Input, Popconfirm, Form, Button, Checkbox } from 'antd'
import { connect } from 'react-redux'

import { getTasks, updateTask } from '../../store/tasksTabReducer'

const EditableContext = React.createContext()

const EditableCell = (props) => {
    const getInput = () => {
        if (props.inputType === 'checkbox') {
            if(props.record.status === 'Ready')
                return <Checkbox defaultChecked/>
            return <Checkbox />
        }
        return <Input />
      }
    const renderCell = ({ getFieldDecorator }) => {
        const { editing, dataIndex, title, inputType,
            record, index, children, ...restProps } = props

        return <td {...restProps}>
            {editing
                ? <Form.Item style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                        rules: [
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ],
                        initialValue: record[dataIndex],
                    })(getInput())}
                </Form.Item>
                : children}
        </td>
    }

    return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>;
}

const EditableTable = (props) => {
    const { total, currentPage, isLoading, getTasks, token } = props
    const [editingKey, setEditingKey] = useState('')
    const [sort, setSort] = useState({ field: 'id', dir: 'asc' })

    let columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
        },
        {
            title: 'Task',
            dataIndex: 'text',
            width: '40%',
            key: 'text',
            ellipsis: true,
            editable: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <EditableContext.Consumer>
                            {form => (
                                <Button
                                    size="small"
                                    onClick={() => save(form, record.key)}
                                    style={{ marginRight: 8 }}
                                >
                                    Save
                                </Button>
                            )}
                        </EditableContext.Consumer>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
                            <Button size="small">Cancel</Button>
                        </Popconfirm>
                    </span>
                ) : (
                        <Button
                            size="small"
                            disabled={editingKey !== ''}
                            onClick={() => edit(record.key)}
                        >
                            Edit
                        </Button>
                    )
            },
        },
    ]

    useEffect(() => {
        if (isLoading)
            getTasks(currentPage, sort.field, sort.dir)
    }, [])

    const onPageChange = (e) => {
        getTasks(e, sort.field, sort.dir)
    }

    const sorting = (field) => {
        if (field === sort.field) {
          if (sort.dir === 'asc') {
            getTasks(currentPage, field, 'desc')
            setSort({ ...sort, dir: 'desc' })
          } else {
            getTasks(currentPage, field, 'asc')
            setSort({ ...sort, dir: 'asc' })
          }
        } else {
            getTasks(currentPage, field, 'asc')
            setSort({ field, dir: 'asc' })
        }
      }

    const isEditing = record => record.key === editingKey

    const cancel = () => {
        setEditingKey('')
    }
    const save = (form, key) => {
        form.validateFields((error, row) => {
            if (error) {
                return
            }
            const newData = [...props.tasks];
            const index = newData.findIndex(item => key === item.key)
            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                })
                props.updateTask({ key, ...row, token })
                setTimeout(() => getTasks(currentPage, sort.field, sort.dir), 100)
                setEditingKey('')
            } else {
                setEditingKey('')
            }
        });
    }
    const edit = key => {
        setEditingKey(key)
    }

    const components = {
        body: {
            cell: EditableCell,
        },
    }
    columns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'status' ? 'checkbox' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    })

    return (
        <EditableContext.Provider value={props.form}>
            <h2>Admin Panel</h2>
            <Button.Group style={{ marginBottom: '10px' }}>
                <Button onClick={() => sorting('id')}>ID</Button>
                <Button onClick={() => sorting('username')}>Name</Button>
                <Button onClick={() => sorting('email')}>Email</Button>
                <Button onClick={() => sorting('status')}>Status</Button>
            </Button.Group>
            <Table
                components={components}
                bordered
                dataSource={props.tasks}
                columns={columns}
                rowClassName="editable-row"
                pagination={{ pageSize: 3, current: currentPage, total: parseInt(total), onChange: onPageChange }}
                loading={props.isLoading}
            />
        </EditableContext.Provider>
    )
}

const EditableFormTable = Form.create()(EditableTable);

const mstp = (state) => ({
    tasks: state.tasksPage.tasks,
    isLoading: state.tasksPage.isLoading,
    total: state.tasksPage.total,
    currentPage: state.tasksPage.currentPage,
    token: state.auth.token
})
const mdtp = {
    getTasks,
    updateTask,
}

export default connect(mstp, mdtp)(EditableFormTable)