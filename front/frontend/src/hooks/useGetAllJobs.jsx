import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchJobs = async() => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`,{
                    withCredentials: true,
                  })
                if(res.data.success){
                    dispatch(setAllJobs(res.data.data))
                }
                dispatch(setAllJobs(res.data.data))
                console.log(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobs()
    },[])
}

export default useGetAllJobs