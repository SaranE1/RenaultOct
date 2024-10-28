import { useState } from 'react'
import './App.css'
import UserComponent from './UserComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserComponent/>
  )
}

export default App
