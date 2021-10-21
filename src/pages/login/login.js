import "./login.css"
import { Button,Card} from "react-bootstrap";
import {Link,useHistory} from "react-router-dom"
import {Formik,Field,Form,ErrorMessage} from "formik";
import * as YUP from "yup";
import axios from "axios";
import {AppContext} from "../../App";
import {useContext} from "react"
function Login()
{
const history= useHistory()
const [log,setLog] =useContext(AppContext)
const sendLogin =async(values)=>{
    let response = await axios.post("https://passwordreset1.herokuapp.com/users/login",
    {
        email:values.email,
        password:values.password
    })
    console.log(response)
    if(response.status === 200)
    {
    window.localStorage.setItem("auth-token",response.data)
    return true
    }
   else return false

}

const signInSchema = YUP.object().shape({
    email:YUP.string().email().required("Please Enter Your Email"),
    password:YUP.string().min(6,"password should be more than 5 characters").required("Please enter your Password")
})

    return(
        <>
             <div className="bg-primary card-container">
                    <Card className="card " border="secondary">
                        <Card.Header className="text-center"><h4 className="text-dark">Login</h4></Card.Header>
                        <Card.Body>
                            <Formik
                            initialValues={
                                {
                                    email:"",
                                    password:""
                                }
                            }
                            validationSchema={signInSchema}
                            
                            onSubmit={values=>{
                                console.log(values)
                                let reset=sendLogin(values)
                                    if(reset)
                                    console.log(log)
                                    setLog(true)
                                    history.push("/protected")
                            }}>
                                {()=>{ 
                                    return(
                                    <Form>
                                        <div className="form-group mb-3"> 
                                        <label for="email">Email</label>
                                        <Field className="form-control link " id="email" type="email" name="email"  component="input"/>
                                        <div className="error"><ErrorMessage  name="email"/></div>
                                        </div>

                                        <div className="form-group mb-3"> 
                                        <label for="password">Password</label><Link to="/forgot"> <p  className="fogotPass">forgot Password?</p></Link>
                                        <Field className="form-control inputfield" id="password" type="password" name="password" component="input"/>
                                       <div className="error">  <ErrorMessage  name="password"/></div>
                                        </div>
                                        <div className="d-flex justify-content-center ">
                                        <Button type="Submit" variant="primary" >Log In</Button>
                                        </div>
                                    </Form>
                                    )
                                }}
                            </Formik>
                            <div  className="mt-3">
                                <Link  to="/register" className="ac link" > New Here? Create Account</Link>
                            </div>
                        </Card.Body>
                    </Card>
                 </div>
        </>
    )
}

export default Login