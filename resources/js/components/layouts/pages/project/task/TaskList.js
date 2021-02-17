import Axios from 'axios';
import React, {Component} from 'react'
import { Card,Button } from 'react-bootstrap';
class  TaskList extends Component {


    makeAsCompleted=(task)=>{

        if (task.status===1) {
            task.status=0;
        }else{
            task.status=1
        }
        Axios.put(`http://localhost/myTask/api/tasks/${task.id}`,task).then((response)=>{
            this.props.afterEditTask(response.data);
        })
      
    }
    deleteTask=(id)=>{
        Axios.delete(`http://localhost/myTask/api/tasks/${id}`).then((response)=>{
            this.props.afterEditTask(response.data);
        })
      
    }
    
    render() { 
        return ( 
            this.props.allTask.map((task,index)=>(
                <Card key={index}>
                <Card.Header as="h5">
                { 
                    task.status===0 ? (<span>Not Completed</span>) : ( <span>Completed</span>)
                }
                <Button className="btn btn-danger float-right ml-1" onClick={()=>this.deleteTask(task.id)}>Delete</Button>
                <Button className="btn btn-outline-info btn-warning float-right" onClick={()=>this.makeAsCompleted(task)}>
                {task.status===0 ? <span> ✔ Make As Complete</span> : <span> ✔ Make As Incomplete</span>}
               
                </Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title> {task.name}</Card.Title>
                    <Card.Text>
                      {task.description}
                    </Card.Text>
                   
                </Card.Body>
            </Card>
            ))
         );
    }
}
 
export default TaskList;