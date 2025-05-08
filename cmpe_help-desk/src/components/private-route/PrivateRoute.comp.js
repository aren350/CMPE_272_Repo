import React from 'react'
import { Route, Redirect, Navigate } from 'react-router-dom'

//fake variable replace with JWT auth
const isAuth = true 

export const PrivateRoute = ({children, ...rest}) => {
  return ( isAuth ? children: <Navigate to="/" replace />


        // <Route
        //     render= {() => 
        //         (isAuth ? children : <Navigate to='/'/>)
        //     }
        
        // />
  )
}
