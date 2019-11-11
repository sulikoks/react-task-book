import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import NewTaskModal from '../NewTaskModal/NewTaskModal'
import { connect } from 'react-redux'
import { getTasks, addTask } from '../../store/tasksTabReducer'



const TaskTab = ({ tasks, total, currentPage, isLoading, getTasks, addTask }) => {
  const columns = [
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
      key: 'text',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
    },
  ]
  const [sort, setSort] = useState({ field: 'id', dir: 'asc' })

  useEffect(() => {
    if (isLoading)
      getTasks(currentPage, sort.field, sort.dir)
  }, [])
  const addTaskModal = (task) => {
    addTask(task)
    getTasks(currentPage, sort.field, sort.dir)
  }
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
  return <div>

    <h2>Table Task</h2>

    <Button.Group style={{ marginBottom: '10px' }}>
      <Button onClick={() => sorting('id')}>ID</Button>
      <Button onClick={() => sorting('username')}>Name</Button>
      <Button onClick={() => sorting('email')}>Email</Button>
      <Button onClick={() => sorting('status')}>Status</Button>
    </Button.Group>

    <Table
      columns={columns}
      dataSource={tasks}
      pagination={{ pageSize: 3, current: currentPage, total: parseInt(total), onChange: onPageChange }}
      loading={isLoading} />
    <NewTaskModal isLoading={isLoading} addTask={addTaskModal} getTasks={getTasks} />
  </div>
}

const mstp = (state) => ({
  tasks: state.tasksPage.tasks,
  total: state.tasksPage.total,
  currentPage: state.tasksPage.currentPage,
  isLoading: state.tasksPage.isLoading,
})
const mdtp = {
  getTasks,
  addTask
}
export default connect(mstp, mdtp)(TaskTab)