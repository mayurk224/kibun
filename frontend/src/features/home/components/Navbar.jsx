import React from 'react'

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        Kibun
      </div>
      <div className="flex items-center gap-2">
        <button>Upload</button>
        <div className="flex items-center">
          <div className="mr-2"><img src={user?.avatar} alt={user?.username} className="w-8 h-8 rounded-full" /></div>
          <div className="">
            <div className="">{user?.username}</div>
            <div className="">{user?.email}</div>
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar