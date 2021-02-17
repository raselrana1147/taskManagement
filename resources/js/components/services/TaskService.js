import Axios from "axios";


export const TaskProject= async (data)=>{
   
     return await Axios.post("http://localhost/myTask/api/tasks",data).then((response)=>{
        return response.data;
     })
}

export const update= async (data)=>{
   
   return await Axios.post("http://localhost/myTask/api/tasks",data).then((response)=>{
      return response.data;
   })
}


