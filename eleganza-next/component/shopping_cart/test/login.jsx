import { useState } from 'react'
import axios from 'axios'
import useAuth from '@/hooks/useAuth'
import eleganza from '../test/log.module.css'

const Login = () => {
  const { toggleAuth } = useAuth()
  const [user_account, setUserAccount] = useState('')
  const [user_password, setUserPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth/login',
        {
          user_account,
          user_password,
        },
      )

      if (response.data.status === 'success') {
        toggleAuth()
        setLoginError('')
        // 使用window.location跳转
        window.location.href = 'http://localhost:3000/shopping_cart'
      } else {
        setLoginError(response.data.message || '登录失败')
      }
    } catch (error) {
      setLoginError('网络错误，请稍后再试')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="用户名"
        value={user_account}
        onChange={(e) => setUserAccount(e.target.value)}
      />
      <input
        type="password"
        placeholder="密码"
        value={user_password}
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <button onClick={handleLogin}>登录</button>

      {loginError && <p>{loginError}</p>}
    </div>
  )
}

export default Login
