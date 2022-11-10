import axios from "axios"

const userApi = axios.create({
    baseURL: 'http://localhost:3500'
})

export const getUsers = async () => {
    const response = await userApi.get('/users')
    const data = await response.data
    return data
}

export const postUser = async (user) => {
    return await userApi.post('/users', user)
}

export const deleteUser = async (user) => {
    return await userApi.delete(`/users/${user.id}`, user.id)
}

export const updateUser = async (user) => {
    return await userApi.patch(`/users/${user.id}`, user)
}

export default userApi