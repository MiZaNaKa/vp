import { useState, useEffect } from "react";
import apiCalling from "../api/apiCalling";
import { useNavigate } from "react-router-dom"
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function Login() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [error, setError] = useState(false);

    useEffect(() => {
        var userInfo = localStorage.getItem('UserInfo')
        if (userInfo) {
            navigate("/")
        }
    }, [])


    const nameOnChange = (event) => {
        setUserInfo(state => ({ ...state, email: event.target.value }));
    }

    const passwordOnChange = (event) => {
        setUserInfo(state => ({ ...state, password: event.target.value }));
    }

    const loginAPI = async (event) => {
        event.preventDefault();
        if (userInfo.email && userInfo.password) {
            setError(false)
            try {
                var result = await apiCalling.login(userInfo)
                if (result.data.status === 1) {
                    localStorage.setItem('UserInfo', JSON.stringify(result.data.body));
                    navigate("/")
                }
                else {
                    setError(result.data.message)
                }
            }
            catch (e) {
                setError(e.message)
            }

        } else {
            setError(true)
        }

    }

    return (<div>
        <Header />
        <div className="width50">
            <Form class="mt-5 w-50  p-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control value={userInfo.email} onChange={nameOnChange} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control onChange={passwordOnChange} value={userInfo.password} type="password" placeholder="Password" />
                </Form.Group>
                
                <Button onClick={loginAPI} as="a" variant="primary">
                    Login
                </Button>
                {error ? <p class="text-danger">{error}</p> : null}
            </Form>
            <br/>
            <p className="loginInfoBox">
                <h3>admin</h3>
                <h5>Email : admin@gmail.com</h5>
                <h5>Password : admin123</h5>
            </p>
        </div>
    </div>);
}

export default Login