import { useState, useEffect } from "react";

const useFetchOnce = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);


    
    useEffect(()=>{
        setIsPending(true);
        setError(null);
        setData(null);
        const abortCont = new AbortController();
        fetch(url, { signal: abortCont.signal })
            .then(res=>{
            if(!res.ok) throw Error('Thown an error');
            return res.json();
            })
            .then(data=>{
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err=>{
                if(err.name) console.log("successfully aborted");
                else{
                    setError(err);               
                    setIsPending(null);
                } 
            })
        return () => abortCont.abort();
    },[]);


    return{data, isPending, error};
};

export default useFetchOnce;