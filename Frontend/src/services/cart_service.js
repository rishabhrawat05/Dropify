import { myAxios } from "./helper";

export const getCart=(id)=>{
    return myAxios
    .get(`/get/cart/${id}`)
    .then((response)=>response.data)
}

export const newCart=(productId,token)=>{
    return myAxios
    .get(`/cart/add/${productId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response)=>response.data)
    
}
export const removeFromCart = (itemId) => {
    return myAxios
    .delete(`/cart/delete/${itemId}`);
  };

export const getCartByUser=(token)=>{
    return myAxios.get('/cart/get/user',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response)=>response.data);
}
export const deleteProductFromCart=(productId)=>{
    return myAxios.delete(`/cart/delete/product/${productId}`);
}