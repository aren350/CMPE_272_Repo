import logo from './logo.svg';
import './App.css';
import { Entry } from './page/entry/Entry.page';
import { DefaultLayout } from './layout/DefaultLayout';
import { Dashboard } from './page/entry/dashboard/Dashboard.page';
import { AddTicket } from './page/entry/new-ticket/AddTicket.page';
import { TicketLists } from './page/ticket-listing/TicketLists.page';
import { Ticket } from './page/entry/ticket/Ticket.page';
import Signup from './components/signup/Signup';
import {BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom" 
import React from 'react';
import { PrivateRoute } from './components/private-route/PrivateRoute.comp';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path= "/" element={<Entry/>}/> 
          <Route element={<DefaultLayout/>}>

            <Route exact path= "/dashboard" element ={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
              }/>
            <Route path= "/add-ticket" element ={
              <PrivateRoute>
                <AddTicket/>
              </PrivateRoute>
              
              }/>
            <Route path= "/tickets" element ={
              <PrivateRoute>
              <TicketLists/>
              </PrivateRoute>
              }/>


            <Route path= "/ticket/:tid" element ={
              <PrivateRoute>
              <Ticket/>
              </PrivateRoute>
              }/>

            <Route path= "/signup" element ={
              <PrivateRoute>
              <Signup/>
              </PrivateRoute>
              }/>


          </Route>

          

        </Routes>
    </div>
  );
}

export default App;
