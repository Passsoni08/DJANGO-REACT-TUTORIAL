import Form from "../components/Form"

//set the route and specify the method
function Register() {
    return <Form route="/api/user/register/" method="register" />
}

export default Register