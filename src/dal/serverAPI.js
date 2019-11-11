import * as axios from "axios"

const instance = axios.create({
    crossDomain: true,
    baseURL: `https://uxcandy.com/~shapoval/test-task-backend/v2/`
})

const myName = '?developer=Suliko'

export const authAPI = {
    setAuthUser: () => {
        debugger
        console.log('==========================')
        //return instance.post(`create${myName}`).then(res => res.data)
    },
    login: (username, password) => {
        const form = new FormData()
        form.append("username", username)
        form.append("password", password)
        return instance.post(`/login${myName}`, form).then(res => res.data)
    },
    logout: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ resCode: 0 })
            }, 1000)
        })
    },
}
export const tasksAPI = {
    getTasks: (currentPage = 1, sortField = 'id', sortDirection = 'asc') =>
        instance.get(`${myName}&page=${currentPage}&sort_field=${sortField}&sort_direction=${sortDirection}`)
            .then(res => res.data),
    putTasks: ({key, status, text, token}) => {
        const form = new FormData()
        form.append("token", token)
        form.append("status", status ? 10 : 0)
        form.append("text", text)
        return instance.post(`/edit/${key+myName}`, form).then(res => res.data)
    },
    addTask: ({ email, text, username }) => {
        const form = new FormData()
        form.append("username", username)
        form.append("email", email)
        form.append("text", text)
        return instance.post(`create${myName}`, form).then(res => res.data)
    },
}
