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
  };

  const refreshToken = async () => {
    try {
      console.log('Refresh token not found1.');
      setIsLoading(true);
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.log('Refresh token not found.');
        return
      }
      console.log('Refresh token not found.21312312321');
      const res = await api.authenApi.refreshToken({ refreshToken })
      console.log('Refresh token not found.9999');
      setIsLoading(false);
      const newToken = res.data.accessToken;
      localStorage.setItem('token', newToken);
      setToken(newToken)
      console.log('Token refreshed successfully.');
    } catch (err) {
      console.log('Error refreshing token:', err);
      setIsLoading(false);

    }
  }

  useEffect(() => {
    if (token) {
      checkTokenValidity();
    }
  }, [token])

  return (
    <div>
      <RouteSetup />
    </div>
  )
}