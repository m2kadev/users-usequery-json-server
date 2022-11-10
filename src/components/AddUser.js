import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { postUser } from '../api/users'
import { useQueryClient } from 'react-query'

const AddUser = ({setShowForm}) => {

  const [user, setUser] = useState({})
  const queryClient = useQueryClient()

  const addUserMutation = useMutation(postUser, {
    onSuccess: () => {
        queryClient.invalidateQueries('users')
    }
  })

  const handleForm = (e) => {
    e.preventDefault()
    addUserMutation.mutate(user)
    setShowForm(false)
  }

  return (
    <div className='user-form-wrapper'>
        <button className='remove-form-btn' onClick={() => setShowForm(prev => !prev)}>X</button>
        <form className='user-form' onSubmit={handleForm}>
            <div className="form-control">
                <label>Username</label>
                <input type='text' onChange={e => setUser({...user, username: e.target.value})} autoFocus required />
            </div>
            <div className="form-control">
                <label>Email</label>
                <input type='email' onChange={e => setUser({...user, email: e.target.value})} required />
            </div>
            <div className="form-control">
                <label>Bio</label>
                <textarea onChange={e => setUser({...user, bio: e.target.value})} required />
            </div>
            <div className="form-control">
                <button type='submit' className='user-btn'>Add User</button>
            </div>
        </form>
    </div>
  )
}

export default AddUser