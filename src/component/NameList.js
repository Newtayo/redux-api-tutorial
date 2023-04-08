import React from 'react'
import Name from './Name'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import { getUser } from '../user/userSlice';
const NameList = () => {
    const {userlist, isLoading, error} = useSelector((state)=> state.user)
    const dispatch = useDispatch();

    useEffect(()=> {
        
        dispatch(getUser());

    }, [dispatch])

    if(isLoading){
        return(
            <h1> Loading ...</h1>

        )
            
        }

        if(error !== undefined){
            return(
                <h1> {error}</h1>
    
            )
                
            }
  
  return (
    <div>
        {
         userlist.map((nameNo) => (<Name key={nameNo.id} homer ={nameNo} />))   
        
        }
    </div>
  )
}

export default NameList