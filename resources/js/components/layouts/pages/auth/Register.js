
import React,{ Component } from 'react';
import {Container,Form,Button,Spinner,Alert, ThemeProvider} from 'react-bootstrap';
import Axios from 'axios';
class  Register extends Component {
    state = { 
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        errors:[],
        success:'',
        validated:false,
       
     }
      setInput=(e)=>{
        this.setState({
            [e.target.name] :e.target.value
        })
     }
     CreateAccount=(event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
         
          event.stopPropagation();
        
        }
        this.setState({
            validated:true
        })

        if (form.checkValidity() !==false) {
          
            const data={
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                password_confirmation:this.state.password_confirmation
    
            }
            Axios.post('http://localhost/myTask/api/register',data).then((response)=>{
                console.log('object',response.data)
                if(response.data.success===true){
                    this.setState({
                        success:response.data.message,
                        errors:''
                    })
                    localStorage.setItem('loginData', JSON.stringify(response));
                }else{
                  this.setState({
                    errors:response.data.message
                  })
               }
            })
        }
    
       


     }  
    render() { 
        return ( 

           <React.Fragment>
               <Container >
               <h1>Create An Account</h1>
               {this.state.success && (
                <Alert variant="success">
                 {this.state.success}
               </Alert>
            )}
               <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-8">
                    <Form noValidate validated={this.state.validated} onSubmit={this.CreateAccount} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" onChange={(e)=>this.setInput(e)} required/>
                        {this.state.errors.name && (<p className="text-danger">{this.state.errors.name}</p>)}
                        <Form.Control.Feedback type="invalid">
                             Please give your name.
                       </Form.Control.Feedback>
                       
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={(e)=>this.setInput(e)} required/>
                        {this.state.errors.email && (<p className="text-danger">{this.state.errors.email}</p>)}
                        <Form.Control.Feedback type="invalid">
                             Please give your email address.
                       </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={(e)=>this.setInput(e)} required/>
                        {this.state.errors.password && (<p className="text-danger">{this.state.errors.password}</p>)}
                        <Form.Control.Feedback type="invalid">
                             Please give a good password.
                       </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="password_confirmation" onChange={(e)=>this.setInput(e)} required/>
                        {this.state.errors.password_confirmation && (<p className="text-danger">{this.state.errors.password_confirmation}</p>)}
                        <Form.Control.Feedback type="invalid">
                             Password confirmation does not match.
                       </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Sign Up
                    </Button>

                     </Form>
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
               </Container>
           </React.Fragment>

         );
    }
}
 
export default Register;