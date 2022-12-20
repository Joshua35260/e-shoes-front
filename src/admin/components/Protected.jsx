import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItem } from '../services/LocalStorage'
import { checkToken } from '../services/AuthApi'

const Protected = props => {
  let navigate = useNavigate()
  const [access, setAccess] = useState(false)
  const protectedRoute = () => {
    const token = getItem('token')
    checkToken(token, setAccess, navigate)
  }

  useEffect(() => {
    protectedRoute()
  }, [])

  return <div>{access ? props.children : null}</div>
}

export default Protected