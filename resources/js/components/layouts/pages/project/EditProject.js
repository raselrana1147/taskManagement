import React, { Component } from 'react';
import {Container,Form,Button,Spinner,Alert} from 'react-bootstrap';
import { UpdateProject } from '../../../services/ProjectService';

class  EditProject extends Component {
    state = { 
        name:this.props.project.name,
        description:this.props.project.description,
        status:this.props.project.status,
        id:this.props.project.id,
        isLoading:false,
        errors:'',
     }

     changeInput=(e)=>{
        this.setState({
            [e.target.name] :e.target.value
        })
    }

    editProject= async (e)=>{
        e.preventDefault();
        this.setState({
            isLoading:true,
        })
      
        const data={
                name:this.state.name,
                description:this.state.description,
                status:this.state.status,     
        }
        const response= await UpdateProject(this.state.id,data);
        if (response.success) {
            
            this.setState({
                isLoading:false
            })
            this.props.afterProjectEdit(response.data)

          
        }else{
            this.setState({
                errors:response.message,
                isLoading:false
             })
        }

        console.log(response);
     
    }

    render() { 
        return ( 
            <React.Fragment>
            
            <Container className="p-4">
          
            <h1>Edit Project </h1>
            {this.state.errors && (
                <Alert variant="danger">
                 {this.state.errors}
            </Alert>
            )}
            <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                    <Form onSubmit={this.editProject}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Project Name </Form.Label>
                        <Form.Control type="text" name="name" value={this.state.name} onChange={(e)=> this.changeInput(e)} value={this.state.name}/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} name="description" value={this.state.description} onChange={(e)=> this.changeInput(e)} value={this.state.description}/>
                   </Form.Group>

                   <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Project Status</Form.Label>
                    <Form.Control as="select" name="status" value={this.state.status} onChange={(e)=> this.changeInput(e)} value={this.state.status}>
                        <option value={0}>Pending</option>
                        <option value={1}>Completed</option>
                    </Form.Control>
                  </Form.Group>

                   <Form.Group controlId="exampleForm.ControlTextarea1">
                   {!this.state.isLoading && (
                    <Button variant="primary" type="submit">Save Changes !</Button>
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
                     
                   </Form.Group>
                   
                     </Form>

                    </div>

                 
                </div>
               
                
            </Container>
            </React.Fragment>

         );
    }
}
 
export default EditProject;