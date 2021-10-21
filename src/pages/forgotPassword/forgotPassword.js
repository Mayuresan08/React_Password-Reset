import{Button, Card} from "react-bootstrap"
import React from "react";
import axios from "axios";
function ForgotPassWord()
{ 
    let [email,setEmail] =React.useState("")
    const [err,setErr]=React.useState("")
    const [info,setInfo]=React.useState("")
   
    const handleChange=({target:{value}})=>{
        console.log(value)
         setEmail(value)
    }
    
    const handleSubmit= async(event)=>{
        event.preventDefault()
        console.log(email)
         if(email.length === 0) setErr("Please enter Email")
        try{
        const response = await axios.post("https://passwordreset1.herokuapp.com/resetPassword",{
            email:email
        })
        console.log(response)
        setEmail("")
        setErr("")
        setInfo("Please check your Email for Activation link")
        }
        catch(err)
        {
            console.log(err.response.data)
            setErr(err.response.data)
        }
    }
    return(
        <>
        
        <div className="bg-primary card-container">
                    <Card className="card " border="secondary">
                        <Card.Header className="text-center"><h4 className="text-dark">Forgot Password</h4></Card.Header>
                        <Card.Body>
                            <form >
                                <div className="form-group">
                                <label for="email">Email</label>
                                <input type="email" className="form-control" name="email"  value={email} onChange={handleChange}/>
                                <p className="error" >{err}</p>
                                </div>
                                <div>
                                    <Button type="submit" onClick={handleSubmit} >Send Email</Button>
                                </div>
                            </form>
                            <h5 className="text-success">{info}</h5>
                        </Card.Body>
                        </Card>
        </div>
        </>
    )


}
export default ForgotPassWord