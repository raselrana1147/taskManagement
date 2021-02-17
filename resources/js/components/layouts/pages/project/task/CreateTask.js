import React from 'react'
import { Component } from 'react';
import {Container,Form,Button,Alert} from 'react-bootstrap';
import { TaskProject } from '../../../../services/TaskService';

 class  CreateTask extends Component{

     state={
         name:'',
         description:'',
         isLoading:false,
         project_id:this.props.project_id,
         errors:'',
     }

     changeInput=(e)=>{
        this.setState({
            [e.target.name] :e.target.value
        })
    }

    storeTask= async (e)=>{
        e.preventDefault();

        this.setState({
            isLoading:true
        })
        const data={
            name:this.state.name,
            description:this.state.description,
            project_id:parseInt(this.state.project_id)

        }
        const response= await TaskProject(data);
        if (response.success) {
            this.setState({
                name:'',
                description:'',
                isLoading:false
            })

            this.props.afterCompleteTaskCreation(response.data)
          
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
            <Container>
            {this.state.errors && (
                <Alert variant="danger">
                 {this.state.errors}
            </Alert>
            )}
          
            <Form onSubmit={this.storeTask}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Task Name </Form.Label>
                    <Form.Control type="text" name="name" onChange={(e)=> this.changeInput(e)} value={this.state.name}/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} name="description" onChange={(e)=> this.changeInput(e)} value={this.state.description}/>
            </Form.Group>
                <Button variant="primary" type="Submit">
                    Add New Task
                </Button>

                </Form>
            </Container>
        </React.Fragment>
        )
    }
 }

 export default CreateTask;