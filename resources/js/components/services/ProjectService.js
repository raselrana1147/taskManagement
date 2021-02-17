import Axios from "axios";
export const storeProject= async (data)=>{
     return await Axios.post("http://localhost/myTask/api/projects",data).then((response)=>{
        return response.data;
     })
}

export const UpdateProject= async (id,data)=>{
  
   return await Axios.put(`http://localhost/myTask/api/projects/${id}`,data).then((response)=>{
      return response.data;
   })
}

export const getProject=()=>{
    Axios.get("http://localhost/myTask/api/projects/").then((response)=>{
       console.log(response);
    })
}