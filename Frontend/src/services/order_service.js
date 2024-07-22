import {myAxios} from './helper'

export const placeOrder=(orderInput,token,isSingleProductCheckout)=>{
    return myAxios.post(`/api/placeOrder/${isSingleProductCheckout}`,orderInput,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
}
export const getOrder=(userId)=>{
    return myAxios.get(`/api/orders/get/${userId}`).then(response=>response.data)
}