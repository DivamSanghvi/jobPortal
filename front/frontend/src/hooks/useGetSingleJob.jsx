import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (ID) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const getSingleJob = async() => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${ID}`,{
                    withCredentials: true,
                })
                if(res.data.success){
                    dispatch(setSingleJob(res.data.data))
                }
            } catch (error) {
                console.log(error)
            }
        }
        getSingleJob();
    },[])
}

export default useGetSingleJob