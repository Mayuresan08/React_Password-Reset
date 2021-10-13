
import { useContext } from "react"
import { AppContext } from "../../App"
import {Link} from "react-router-dom"
import { Button } from "react-bootstrap"
export default function Protected()
{
    const [log] =useContext(AppContext)
    return(
        <>
        {
            log ?
            <div className="container justify-content-center">
                <div className="row">
                    <div className="col">
                        <h1>Welcome to Protected Page</h1>
                    </div>
                </div>
            </div>
            :
            <>
            <div className="d-flex  justify-content-center align-items-center">
            <p>Please Log in to view this page </p><br/>
           <Link to="/login"><Button variant="primary">Login</Button></Link>
            </div>
            </>
        }

        </>
    )
}