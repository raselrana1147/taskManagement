
import React,{ Component } from 'react';
import {Container,Form,Button,Spinner,Alert, ThemeProvider} from 'react-bootstrap';
import Axios from 'axios';
import { withRouter } from "react-router-dom";
import { PUBLIC_PATH } from '../../../Constant';
class  Login extends Component {
    state = {
        email:'',
        password:'',
        errors:[],
        success:'',
        validated:false,
        invalided:'',
     
       
     }
      setInput=(e)=>{
        this.setState({
            [e.target.name] :e.target.value
        })
     }
     CreateAccount=(event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        const { history }=this.props;
        if (form.checkValidity() === false) {
         
          event.stopPropagation();
        
        }
        this.setState({
            validated:true
        })

        if (form.checkValidity() !==false) {
          
            const data={
                email:this.state.email,
                password:this.state.password, 
    
            }
            Axios.post('http://localhost/myTask/api/login',data).then((response)=>{
                if(response.data.success===true){
                    this.setState({
                        success:response.data.message,
                        errors:''
                    })
                    localStorage.setItem('loginData', JSON.stringify(response));
                    window.location.href= PUBLIC_PATH
                }else{
                  this.setState({
                    invalided:response.data.message,
                    success:'',
                  })
                  localStorage.setItem('loginData', null);
               }
            })
        }

     }  
    render() { 
        return ( 

           <React.Fragment>
               <Container >
               <h1>Login With Your Account</h1>
               {this.state.success && (
                <Alert variant="success" onClose={() => this.setState({success:''})} dismissible>
                 {this.state.success}
               </Alert>
            )}

            {this.state.invalided && (
                <Alert variant="danger" onClose={() => this.setState({invalided:''})} dismissible>
                 {this.state.invalided}
               </Alert>
            )}
               <div className="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-8">
                    <Form noValidate validated={this.state.validated} onSubmit={this.CreateAccount} >
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

                    
                    <Button variant="primary" type="submit" >
                        Sign IN
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
 
export default withRouter(Login);