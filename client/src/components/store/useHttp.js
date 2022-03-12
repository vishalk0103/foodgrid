import React,{useState, useCallback} from 'react'

const useHttp = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState(null)
  
    const sendRequest= useCallback(async (requestConfig,applyData) => {
      setIsLoading(true);
      setError(null)
        try {
          const response = await fetch(
            requestConfig.url,{
              method:requestConfig.method ? requestConfig.method : 'GET',
              headers:requestConfig.headers ? requestConfig.headers : {},
              body:requestConfig.body ? JSON.stringify(requestConfig.body) : null
              
            }
          );
          const responseData = await response.json();
          if(!response.ok){
            throw new Error(responseData.message)
          }
          applyData(responseData)
        } catch (err) {
          setError(err.message)
        }
        setIsLoading(false);
  
    },[])
  
    return{
      sendRequest,
      isLoading,
      error
    }
  }
  
  export default useHttp