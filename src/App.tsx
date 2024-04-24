import { useEffect, useState } from "react"
import RouteSetup from "./routes"
import api from '@services/apis'

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(false)

  const checkTokenValidity = async () => {
    try {
      setIsLoading(true)
      const res = await api.authenApi.checkToken()
      setIsLoading(false)
      console.log('Token is valid:', res.data)
    } catch (err: any) {
      console.log('Error checking token validity:', err)
      setIsLoading(false)
      if (err.response && err.response.status == 504) {
        console.log('Token expired. Refreshing token...')
        await refreshToken()
      } else {
        console.log('Error checking token validity:', err)
      }
    }
  }

  const refreshToken = async () => {
    try {
      setIsLoading(true);
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.log('Refresh token not found.');
        return
      }
      const res = await api.authenApi.refreshToken({ refreshToken })
      setIsLoading(false);
      const newToken = res.data.accessToken;
      localStorage.setItem('token', newToken);
      setToken(newToken)
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      checkTokenValidity()
    }
  }, [token])

  return (
    <div>
      <RouteSetup />
    </div>
  )
}