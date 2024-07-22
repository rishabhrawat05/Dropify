import { myAxios } from "./helper";

export const signUp=(user)=>{
    return myAxios
    .post('/api/user/register',user)
    .then((response)=>response.data)
}

export const loginUser=(loginDetail)=>{
    return myAxios
    .post('/api/auth/signin',loginDetail)
    .then((response)=>response.data)
}

export const getUser=(id)=>{
 return myAxios
 .get(`/api/user/${id}`)
 .then((response)=>response.data)
}