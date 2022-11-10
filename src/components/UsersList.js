import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { getUsers, deleteUser } from '../api/users'
import UserHeading from './UserHeading'
import AddUser from './AddUser'
import { useQueryClient } from 'react-query'

const UsersList = () => {
  const { data: users, isLoading, isError, error } = useQuery('users', getUsers)
  const [showForm, setShowForm] = useState(false)
  const queryClient = useQueryClient()

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
        queryClient.invalidateQueries()
    }
  })

  const handleDelete = (user) => {
    deleteUserMutation.mutate(user)
  }

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = <p>{error.message}</p>
  } else {
    content = users.map(user => (
        <div className="user" key={user.id}>
            <div className='user-info'>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <span>{user.bio}</span>
            </div>
            <button className='remove-btn' onClick={() => handleDelete(user)}>Remove</button>
        </div>
    ))
  }

  return (
    <div className='users-wrapper' style={{overflow: showForm ? 'hidden': null}}>
        <UserHeading setShowForm={setShowForm} />
        {content}
        {showForm ? <AddUser setShowForm={setShowForm} />: null}
    </div>  
  )
}

export default UsersList