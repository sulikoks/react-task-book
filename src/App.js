import React, { useState, useEffect } from 'react'
import { Layout, Menu, Spin } from 'antd'
import './App.css'
import { Route } from "react-router"
import { NavLink } from 'react-router-dom'
import TaskTab from './components/TaskTab/TaskTab'
import Login from './components/Login/Login'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

import { initApp } from './store/appReducer'
import { login, logout } from './store/authReducer'
import EditableTable from './components/TaskTab/EditableTable'

const App = ({ initApp, auth, login, logout, isLoadingAuth }) => {
    const { Header, Content, Footer } = Layout
    const [current, setCurrent] = useState('')
    const handleClick = e => {
        console.log('Click ', e.key)
        setCurrent(e.key)
    }
    useEffect(() => {
        initApp()
    }, [initApp])

    return (
        <div className="App">
            <Layout className="layout">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        onClick={handleClick}
                        selectedKeys={current}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="main">
                            <NavLink to="/">Main</NavLink>
                        </Menu.Item>

                        {!auth.isAuth
                            ? <Menu.Item key="login">
                                <NavLink to="/login">Login</NavLink>
                            </Menu.Item>
                            : <Menu.Item key="logout">
                                <NavLink to="/" onClick={logout}>Admin Logout</NavLink>
                            </Menu.Item>}

                        {isLoadingAuth &&
                            <Menu.Item>
                                <Spin />
                            </Menu.Item>}

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>

                        <Route path='/' exact render={() => {
                            setCurrent('main')
                            if (auth.isAuth)
                                return <EditableTable />
                            return <TaskTab />
                        }} />

                        <Route path='/login' render={() => {
                            setCurrent('login')
                            if (auth.isAuth)
                                return <Redirect to='/' />
                            return <Login login={login} />
                        }} />

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Design ©2019 Created by ChinaAlpachinoMokachino=)</Footer>
            </Layout>
        </div>
    )
}

const mstp = (state) => ({
    auth: state.auth,
    app: state.app.isInit,
    isLoadingAuth: state.auth.isLoading,
})
const mdtp = {
    initApp,
    login,
    logout,
}

export default connect(mstp, mdtp)(App);
