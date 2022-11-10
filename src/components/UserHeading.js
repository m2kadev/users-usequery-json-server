import React from 'react'

const UserHeading = ({setShowForm}) => {
  return (
    <div className='user-header-wrapper'>
        <p>Users List</p>
        <button className='add-btn' onClick={() => setShowForm(prev => !prev)}>Add User</button>
    </div>
  )
}

export default UserHeading