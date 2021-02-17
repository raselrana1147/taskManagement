
export const CheckAuthenticated=()=>{
    const getToken=localStorage.getItem('loginData')
    if (getToken !=null) {
        const getData=JSON.parse(getToken);
       
      if (getData.data.success && getData.data.token !==null) {
          return getData.data.user;
      }else{
        return false;
      }
    }else{
        return false;
    }
    
}