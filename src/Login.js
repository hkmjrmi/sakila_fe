import { useRef, useState } from "react";
import Button from '@mui/material/Button';

function Login({ doAuth, doRole }) {

    let userId = useRef();
    let password = useRef();
    let [msg, setMsg] = useState();

    function doLogin(event){
        event.preventDefault();
        console.log(userId.current.value);
        console.log(password.current.value);
        if (userId.current.value === "user" && password.current.value === "1234"){
            
            doAuth(true);
            doRole('USER');
            
        } else if (userId.current.value === "admin" && password.current.value === "1234"){
            
            doAuth(true);
            doRole('ADMIN');
            
        }   else {
            
            setMsg("Wrong username/password")
        }
    }
    
    return ( 
        <div id="login">
            <div className="card">
                <div className="card-header">Login</div>
                <div className="card-body">
                { msg && <div className="alert alert-danger">{ msg }</div>}
                <form onSubmit={doLogin}>
                <div className="row">
                    <div className="col-md-12 p-2">
                        <label>User ID</label>
                        <input type="text" className="form-control" placeholder="Enter User ID" ref={userId}/>
                    </div>
                    <div className="col-md-12 p-2">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password" ref={password}/>
                    </div>
                    <div className="col-md-12 p-2">
                        <Button type="submit" variant="contained">Login</Button>
                    </div>
                </div>
                </form>
                </div>
            </div>
            
        </div>
     );
}

export default Login;