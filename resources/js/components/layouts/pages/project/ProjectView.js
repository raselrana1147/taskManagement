import Axios from 'axios';
import React, {Component} from 'react';
import { Container,Spinner,Badge,Button,InputGroup,FormControl,Form } from 'react-bootstrap';
import { PUBLIC_PATH } from '../../../Constant';
import { Link } from "react-router-dom";
import CreateTask from './task/CreateTask';
import TaskListCom from './task/TaskList';
import EditProject from './EditProject';

class ProjectView extends Component{

    state={
        ProjectId:'',
        SingleProject:{},
        taskList:[],
        isLoading:false,
        toggleAddTask:false,
        toggleEditProject:false,
        searchTaskList:[],
    }
    componentDidMount=()=>{
        const ProjectId=this.props.match.params.id;
            this.setState({
                isLoading:true,
                ProjectId
            })
     this.getProjectDetails();
    }

    getProjectDetails=()=>{
        Axios.get(`http://localhost/myTask/api/projects/${this.props.match.params.id}`).then((response)=>{
            this.setState({
                SingleProject:response.data.data,
                taskList:response.data.data.tasks,
                isLoading:false,
                searchTaskList:response.data.data.tasks
                
            })
      }).catch((errors)=>{

      })
    }
     addTaskSection=()=>{

        this.setState({
            toggleAddTask: !this.state.toggleAddTask,
            toggleEditProject:false
        })
    }

    addProjectEditSection=()=>{
        this.setState({
            toggleEditProject: !this.state.toggleEditProject,
            toggleAddTask:false
        })
    }

    afterCompleteTaskCreation=(newTask)=>{
        this.addTaskSection();
        let currentTask=this.state.taskList;
        currentTask.unshift(newTask);
        this.setState({
            taskList:currentTask
        });
    }
  
    afterCompleteProjectEdit=(newPro)=>{
        this.addProjectEditSection();
       this.setState({
           SingleProject:newPro
       })
    }

    getProDetail=()=>{
      this.getProjectDetails();
    }

    searchTaskDom=(e)=> {
        const searchValue=e.target.value;

        if (searchValue.length >0) {
            const searchData=this.state.taskList.filter(function(item){
                 const itemData=item.name +' '+item.description;
                 const TextData=searchValue.trim().toLowerCase();
                 return itemData.trim().toLowerCase().indexOf(TextData) !== -1;
            });
 
            this.setState({
                searchTaskList:searchData,
                isLoading:false,
           }); 
         }else{
             this.setState({
                isLoading:false,
             })
             this.getProjectDetails();
         }
        
        
    }

    render(){
        return(
            <React.Fragment>
             <Container>
                    <h1>{this.state.SingleProject.name}  <Badge variant="danger">Total Task : {this.state.searchTaskList.length}</Badge></h1>
                    <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                  Username
                </Form.Label>
                <InputGroup className="mb-2">
                    <FormControl  placeholder="Search Task"  name="search" type="search" onChange={(e)=>this.searchTaskDom(e)}/>
              </InputGroup><br/><br/>
                         <Button className={`text-white btn btn-outline-${this.state.SingleProject.status===1  ? 'success' : 'info'} btn-warning ml-1`}>
                         {this.state.SingleProject.status===1 ? <span> ✔ Completed</span> : <span>Pending...</span>}
                        
                         </Button>
                         <Button className="text-white btn btn-success ml-1" onClick={this.addProjectEditSection}>

                         {!this.state.toggleEditProject && (<span>Edit Project</span>)}
                         {this.state.toggleEditProject && (<span>Cancel Edit</span>)}
                         </Button>


                        <Button className="text-white btn btn-danger ml-1" onClick={this.addTaskSection}>
                            {!this.state.toggleAddTask && (<span>+Add New Task</span>)}
                            {this.state.toggleAddTask && (<span>Cancel Task Section</span>)}
                        </Button><br/><br/>
                    {!this.state.toggleAddTask===false &&(

                       <CreateTask project_id={this.props.match.params.id} afterCompleteTaskCreation={this.afterCompleteTaskCreation}/>
                    )}

                    {this.state.toggleEditProject  && (
                            <EditProject project={this.state.SingleProject} afterProjectEdit={this.afterCompleteProjectEdit} />
                    )}


                     { this.state.isLoading && 
                        <div className="text-center mt-5">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                   </div>   
                  }

                  {this.state.searchTaskList.length ===0 && (
                    <span>No Data found</span>
                 )}
                 
                    <TaskListCom allTask={this.state.searchTaskList}  afterEditTask={this.getProDetail}/>
                  
            </Container>
            </React.Fragment>
        )
    }
}

export default ProjectView;