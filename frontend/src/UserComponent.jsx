import {useEffect, useState} from 'react'
import axios from 'axios'

const UserComponent = () => {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/users')
        setUsers(response.data)
    }

    const addUser = async () => {
        const response = await axios.post('http://localhost:5000/users', {name, email})
        setUsers([...users, response.data])
        setName('')
        setEmail('')
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:5000/users/${id}`)
        console.log(response.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <input type="text" placeholder='Name'
            calue = {name}
            onChange={(e) => setName(e.target.value)} />

            <input type="text" placeholder='Email'
            calue = {email}
            onChange={(e) => setEmail(e.target.value)} />

            <button onClick={addUser}>Add user</button>

            <ul>

                {users.map(user => (
                    <div  key = {user.id}>
                        <li> {user.name} : {user.email} 
                            <button onClick={() => handleDelete(user.id)}>Delete</button>  
                        </li>                      
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default UserComponent