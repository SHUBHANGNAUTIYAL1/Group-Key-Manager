import { useState } from "react"
import { useEffect } from "react";
import axios from "axios"

const usefe=(url)=>{
    const [data1,setData]=useState([])
    const [loading1,setLoading]=useState(true)
    const [error1,setError]=useState(false)

    useEffect(()=>{
        const fetchData=async ()=>{
            setLoading(true)
            try {
                const res=await axios.get(url);
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false)
        };
        fetchData();
    
    },[url])


const refe=async ()=>{
    setLoading(true)
    try {
        const res=await axios.get(url);
        setData(res.data);
    } catch (err) {
        setError(err);
    }
    setLoading(false)
};

return {data1,loading1,error1,refe};

};
export default usefe;