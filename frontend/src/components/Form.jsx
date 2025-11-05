import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

//FORM:
//route that we wanna go when we submit the form
//method = are we register or logging?
function Form({ route, method }) {
    const [username, setUsername] = useState("") //store username
    const [password, setPassword] = useState("")//store password
    const [loading, setLoading] = useState(false)//loading or not
    const navigate = useNavigate()

    //if method is = login render login otherwise render register
    const name = method === "login" ? "login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault(); //prevent to actually submit the form

        try {
            const res = await api.post(route, { username, password }) //send the request
            if (method === "login") { //if the access was the login, get the ACCESS TOKEN and the REFRESH token and set then
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/") //navigate to home
            } else {
                navigate("/login")
            }
        }
        catch (error) { //if there's an error
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    //calling the const name
    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            valeu={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />

        <input
            className="form-input"
            type="password"
            valeu={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />

        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form