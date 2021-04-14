import React, { useState } from 'react';
import css from './App.module.css';
import Header from './Header.js';
import Home from './Home.js';
import Navbar from './Navbar.js';
import Explore from './Explore';
import NewPost from './NewPost';
import Activity from './Activity';
import Profile from './Profile';
import initialStore from '../utils/initialStore';
import uniqueId from '../utils/uniqueId';
import StoreContextProvider from '../contexts/StoreContext';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

function App(){
    
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <StoreContextProvider>
            <div className={css.container}>
            <Header/>
            <main className={css.content}>
            <Switch>
                <Route path="/profile/:userId?">
                    <Profile/>
                </Route>
                <Route path="/activity">
                    <Activity/>
                </Route>
                <Route path="/newpost">
                    <NewPost/>
                </Route>
                <Route path="/explore">
                    <Explore/>
                </Route>
                <Route path="/:postId?">
                    <Home/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>     
            </main>
            <Navbar/>
            </div>
            </StoreContextProvider>
        </Router>
    );
    
    

}



export default App;
