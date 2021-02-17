import Axios from 'axios';
import React, { Component } from 'react';
import {Container,Card,Button,Badge,Spinner, Form, InputGroup,FormControl} from 'react-bootstrap';

import { Link } from "react-router-dom";
import { PUBLIC_PATH } from '../../../Constant';

class ProjectList extends Component{
    state={
        projectList:[],
        count:0,
        isLoading:false,
        searchProjectData:[],
    }

    componentDidMount=()=>{
        this.getAllProject();
    }

    getAllProject=()=>{
        this.setState({isLoading:true});
        Axios.get("http://localhost/myTask/api/projects/").then((response)=>{
            const projectList=response.data.data;
            const searchProjectData=response.data.data;
            this.setState({
                projectList,
                isLoading:false,
                searchProjectData,
            })
        })
    }

    deleteProject=(id)=>{
        Axios.delete(`http://localhost/myTask/api/projects/${id}`).then((response)=>{
           if(response.data.success===true){
            this.getAllProject();
           }
        })
    }

    // Search option by filtering
    searchProjectDom=(e)=>{
        const searchText=e.target.value;
        this.setState({
            isLoading:true,
        });
        if (searchText.length >0) {
           const searchData=this.state.projectList.filter(function(item){
                const itemData=item.name +' '+item.description;
                const TextData=searchText.trim().toLowerCase();
                return itemData.trim().toLowerCase().indexOf(TextData) !== -1;
           });

           this.setState({
             searchProjectData:searchData,
             isLoading:false,
          });
           
        }else{
            this.setState({
                isLoading:false,
            });
           //this.getAllProject();
        }
       
    }

    searchProject=(e)=>{
        const search=e.target.value;
        if (search.length >0) {
            Axios.get(`http://localhost/myTask/api/projects/search/${search}`).then((response)=>{
                this.setState({
                    projectList:response.data.data
                })
             })
        }else{
            this.getAllProject();
        }
       
    }

    render(){
        return(
            <React.Fragment>
           
            <Container className="p-4">

            { this.state.isLoading && 
                <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>   
              }
              <h2>Project List {this.state.searchProjectData.length}</h2>

              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                  Username
                </Form.Label>
                <InputGroup className="mb-2">
                    <FormControl  placeholder="Search Project"  name="search" type="search" onChange={(e)=>this.searchProjectDom(e)}/>
              </InputGroup>
         
             <Link to={`${PUBLIC_PATH}create/project`} className="text-white btn btn-danger float-right">+ Create New</Link> <br/><br/>
             {this.state.searchProjectData.length ===0 && (
                <span>No Data found</span>
             )}
             
              {
                  this.state.searchProjectData.map((project, index)=>(
                    <Card key={index}>
                    <Card.Header as="h5">{project.name}  <Badge variant="danger">{project.tasks_count}</Badge></Card.Header>
                    <Card.Body>
                        <Card.Title>{project.name}</Card.Title>
                        <Card.Text>
                        {project.description}
                        </Card.Text>
                        <Button variant="success" className="m-1" onClick={()=>{this.deleteProject(project.id)}}>Delete</Button>
                        <Link to={`${PUBLIC_PATH}view/project/${project.id}`} className="text-white btn btn-danger">View And Edit</Link>
                    </Card.Body>
                </Card>
             

                  ))
              }
              
            </Container>
            </React.Fragment>
        )
    }
}

export default ProjectList;

