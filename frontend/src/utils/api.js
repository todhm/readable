import axios from 'axios';


const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'whatever-you-want'
}


export const getData = (url)=>{
    return axios(url,{headers})
}

export const addData = (url,body)=>{
    return axios(url,{
            headers,
            method:"post",
            data:body})
}

export const editData = (url,body)=>{
    return axios(url,{
        method:"put",
        data:body,
        headers:headers
    })
}

export const deleteData = (url)=>{
    return axios(url,{
        method:"delete",
        headers:headers
    })
}
