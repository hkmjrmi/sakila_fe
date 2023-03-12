import { Link } from "react-router-dom";
import { FaBeer} from "react-icons/fa"
import { FaApple} from "react-icons/fa";

function Menu ({logout, role}) {

    const doLogout = () => {
        logout(false);
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-end">
            <h1 className="text-primary mx-5 text-start"> <FaApple /> Sakila Store</h1>
            <Link to={"/"} className="navbar-brand text-decoration-none">Home</Link>
            <Link to={"/actors/list"} className="navbar-brand text-decoration-none">Actor</Link>
            {
                role === "ADMIN" && (
                    <>
                    <Link to={"/films/search"} className="navbar-brand text-decoration-none">Search Film</Link>
                    <Link to={"/rental/search"} className="navbar-brand text-decoration-none">Rental</Link>
                    </>
                )
            }
            < a href="#" className="btn btn-danger" onClick={doLogout}>Logout</a>     
            </nav>
        </div>
      );
}

export default Menu;