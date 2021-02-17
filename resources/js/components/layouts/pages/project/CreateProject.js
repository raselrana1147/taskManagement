
import React, { Component } from 'react';
import {Container,Form,Button,Spinner,Alert} from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_PATH } from '../../../Constant';
import { storeProject } from '../../../services/ProjectService';


class CreateProject extends Component{

    state={
        name:'',
        description:'',
        isLoading:false,
        errors:''
    }

    changeInput=(e)=>{
        this.setState({
            [e.target.name] :e.target.value
        })
    }

    storeProject= async (e)=>{
        e.preventDefault();
        const { history }=this.props;
   
        this.setState({
            isLoading:true
        })
        const data={
            name:this.state.name,
            description:this.state.description
        }
        const response= await storeProject(data);
        if (response.success) {
            
            this.setState({
                name:'',
                description:'',
                isLoading:false
            })

            history.push(`${PUBLIC_PATH}projectList`);
          
        }else{
           
            this.setState({
                errors:response.message,
                isLoading:false
             })
        }
    } 

    render(){
        return(
            <React.Fragment>
            
            <Container className="p-4">
            <h1>Create A New Project </h1>
        
            <Link to={`${PUBLIC_PATH}projectList`} className="btn btn-danger text-white float-right" >See All Project</Link> <br/><br/>
            {this.state.errors && (
                <Alert variant="danger">
                 {this.state.errors}
            </Alert>
            )}
            
                <div className="row">
                    <div className="col-lg-2">
                    </div>
                      
                    <div className="col-lg-8">
                    <Form  onSubmit={this.storeProject}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Project Name </Form.Label>
                        <Form.Control type="text" name="name" onChange={(e)=> this.changeInput(e)} value={this.state.name}/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} name="description" onChange={(e)=> this.changeInput(e)} value={this.state.description}/>
                   </Form.Group>

                   
                   {!this.state.isLoading && (
                    <Button variant="primary" type="submit" >
                        Create
                    </Button>
                   )}

                   {this.state.isLoading && (
                    <Button variant="primary" type="button" disabled>
                    <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div> 
                    </Button>
                   )}

                     </Form>
                    </div>

                    <div className="col-lg-2">
                    
                    </div>
                </div>
               
              
            </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(CreateProject);

