/* eslint-disable no-unused-vars */
import * as YUP from "yup"
import {Card,Button} from "react-bootstrap";
import {Formik,Field,Form,ErrorMessage} from "formik"
import axios from "axios";
import React, { useState } from "react";

export default function Register()
{
const [info,setInfo]= useState("")
const createAccount=async (values)=>{
    try{
    let response= await axios.post("https://passwordreset1.herokuapp.com/users/register",{
        userName:values.username,
        email:values.email,
        password:values.password
    })
    console.log(response)
    setInfo(response.data)
    return true
        }
        catch(err)
        {
            console.log(err.response.data)
            setInfo(err.response.data.Error)
            return false
        }
}

    const signInSchema = YUP.object().shape({
        username:YUP.string().required("Please enter Username"),
        email:YUP.string().email().required("Please Enter Your Email"),
        password:YUP.string().min(6,"password should be more than 5 characters").required("Please enter your Password")
    })
    
        return(
            <>
                 <div className="bg-primary card-container">
                        <Card className="card " border="secondary">
                            <Card.Header className="text-center"><h4 className="text-dark">Create Account</h4></Card.Header>
                            <Card.Body>
                                <Formik
                                initialValues={
                                    {
                                        username:"",
                                        email:"",
                                        password:""
                                    }
                                }
                                validationSchema={signInSchema}
                                
                                onSubmit={(values,{resetForm})=>{
                                    console.log(values)
                                     let reset=createAccount(values)
                                        resetForm()                                      
                                }}>
                                    {()=>{ 
                                        return(
                                        <Form>
                                            <div className="form-group mb-3"> 
                                            <label for="email">UserName</label>
                                            <Field className="form-control link " id="username" type="text" name="username"  component="input"/>
                                            <div className="error"><ErrorMessage  name="username"/></div>
                                            </div>

                                            <div className="form-group mb-3"> 
                                            <label for="email">Email</label>
                                            <Field className="form-control link " id="email" type="email" name="email"  component="input"/>
                                            <div className="error"><ErrorMessage  name="email"/></div>
                                            </div>
    
                                            <div className="form-group mb-3"> 
                                            <label for="password">Password</label>
                                            <Field className="form-control inputfield" id="password" type="password" name="password" component="input"/>
                                           <div className="error">  <ErrorMessage  name="password"/></div>
                                            </div>
                                            <div className="d-flex justify-content-center ">
                                            <Button type="Submit" variant="primary" >Create</Button>
                                            </div>
                                        </Form>
                                        )
                                    }}
                                </Formik>
                                <div className="text-success"><h3>{info}</h3></div>
                            </Card.Body>
                        </Card>
                     </div>
            </>
        )
    }
    