import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

//Logout function
function Logout() {
  localStorage.clear() //clear refresh and access token
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear() //if someone is registering we first clear the local storage so we don't end up submiting access token to the register route
  return <Register /> // return Register without old tokens
}

function App() {
  //you can't access the component Home unless you have the access token and it's valid
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App
