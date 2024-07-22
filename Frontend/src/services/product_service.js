import { myAxios } from "./helper";

export const getProduct=(id)=>{
    return myAxios
    .get(`/api/products/${id}`)
    .then((response)=>response.data)
}
export const checkoutProduct=(isSingleProductCheckout,productId,token)=>{
    return myAxios
    .get(`/api/getProductDetails/${isSingleProductCheckout}/${productId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response)=>response.data)
}

export const searchProductByName = (keyword) => {
    return myAxios
        .get(`/api/products/search?keyword=${keyword}`)
        .then((response) => response.data);
}