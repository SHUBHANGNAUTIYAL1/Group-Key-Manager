
import "./login.css"
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function Login() {

  localStorage.clear()
     
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate=useNavigate()

    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleClick = async (e) => {
      e.preventDefault();
    
      try {
        const res = await axios.post("http://localhost:8100/api/auth/login", credentials);
      localStorage.setItem('user',JSON.stringify(res.data))
        console.log(res.data)

        if(res.data.username=="Admin"){
          navigate("/admin")
        }
        else{
        navigate("/about")
        }
      } catch (err) {
        console.log(err)
      }
    };


  return (
    <div className="container">
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleClick}>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    id="email"
                    name="email"  onChange={handleChange}
                    placeholder="john@gmail.com"
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"  onChange={handleChange}
                    placeholder="***********"
                    required
                />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>New user? <Link to="/register"> signup now</Link> </p>
        </div>
    </div>
  )
}

export default Login