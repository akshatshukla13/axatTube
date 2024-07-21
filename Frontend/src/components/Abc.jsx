import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Abc() {

    const logedin = false
    const uname = false
    const navigate = useNavigate()


    useEffect(() => {
      
        navigate('/'+uname)
        
    }, [uname])
    

  return (
    <div>
      hii
    </div>
  )
}

export default Abc
