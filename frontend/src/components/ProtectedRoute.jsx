// FRONTEND PROTECTION

// protect the different routes on the frontend as well as on the backend
// wrapper for a protected route
// we'll need a authorization token to actually access this route

import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"


// we need to check if we're authorized before we allow someone to access this route
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN) // get the refresh token
        try {
            const res = await api.post("api/token/refresh/", { // send the refresh token to the backend
                refresh: refreshToken
            });
            if (res.status === 200) { // successful
                localStorage.setItem(ACCESS_TOKEN, res.data.access) // set the new access token
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    //check if we need to refresh the token or we're good to go
    const auth = async () => {
        const token = localStorage, getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token) //decode the token and give access to the value and the expiration date
        const tokenExpiration = decoded.exp //
        const now = Date.now() / 1000 // date in seconds

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    // if authorized it's true return whatever the children were that we wrapped
    // otherwise return a component called navigate and is going to go to the login route
    return isAuthorized ? children : <Navigate to="/login/" />
}

export default ProtectedRoute