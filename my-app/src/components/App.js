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
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

function App(){
    
	
    const [page, setPage] = useState('home');
    const [store, setStore] = useState(initialStore);
    
	
	// function renderMain(page){
    //     switch(page){
    //         case "home": return <Home store={store} onLike={addLike} onUnlike={removeLike} onComment={addComment} />;
    //         case "explore": return <Explore/>;
    //         case "newpost": return <NewPost  store={store} onPost={addPost} onCancel={cancelPost}/>;
    //         case "activity": return <Activity/>;
    //         case "profile": return <Profile store={store} />;
    //         default: return <Home/>;
    //     }
    // }

    function addLike(postId){
        const like = {
            userId: store.currentUserId, 
            postId,
            datetime: new Date().toISOString()
        };
        
        setStore({
          ...store,
          likes: store.likes.concat(like)
        });
    }

    function removeLike(postId){
        // use filter and currentUserId to remove the like from the likes array

        setStore({
            ...store,// spread props. make sure you understand this
            likes: store.likes.filter(like=>!(like.userId===store.currentUserId && like.postId===postId))
        });
        
    }

    function addComment(postId, text){
        const comment = {
          userId: store.currentUserId, 
          postId,
          text,
          datetime: new Date().toISOString()
        };
        setStore({
          ...store,
            comments:store.comments.concat(comment)
        });
      }

      function addPost(photo, desc){
		// TODO:
		// 1. Create a new post object (use uniqueId('post') to create an id)
		// 2. Update the store 
		// 3. Call setPage to come back to the home page
        const post = { // 1. Create a new post object (use uniqueId('post') to create an id)
            id: uniqueId('post'),
            userId: store.currentUserId,
            photo,
            desc,
            datetime: new Date().toISOString()     
          }
          setStore({
            ...store,
              posts:store.posts.concat(post) // 2. Update the store 
          });
        //setPage('home');  3. Call setPage to come back to the home page
        }
	function cancelPost(){
		// TODO:
		// 1. Call setPage to come back to the home page (we will use Router to improve this)
        //setPage('home'); 
  
        }
        // TODO: Pass "store", "addPost", "cancelPost" to <NewPost/>	

    function addFollower(userId){
        console.log('followers before ', store.followers);
        const newFollow = { // 1. Create a new post object (use uniqueId('post') to create an id)
            userId:userId,
            followerId:store.currentUserId
          }

        console.log('new follower ', newFollow)
        // use concat
        setStore({
            ...store,
              followers: store.followers.concat(newFollow)
          });

          console.log('followers after ', store.followers);
    }
    function removeFollower(userId){
        console.log('followers before ', store.followers);
        // use filter

        //console.log('new list ', store.followers.filter(follower=>!(follower.userId===userId && follower.followerId===followerId)));
        setStore({
            ...store,// spread props. make sure you understand this
            followers: store.followers.filter(follower=>!(follower.userId===userId && follower.followerId===store.currentUserId))
        });

        console.log('list now ', store.followers.filter(follower=>!(follower.userId===userId && follower.followerId===store.currentUserId)));

        //console.log('followers after ', store.followers);
    }
    

   
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className={css.container}>
            <Header/>
            <main className={css.content}>
            <Switch>
                <Route path="/profile/:userId?">
                    <Profile store={store} onFollow={addFollower} onUnfollow={removeFollower}/>
                </Route>
                <Route path="/activity">
                    <Activity/>
                </Route>
                <Route path="/newpost">
                    <NewPost  store={store} onPost={addPost} onCancel={cancelPost}/>
                </Route>
                <Route path="/explore">
                    <Explore/>
                </Route>
                <Route path="/:postId?">
                    <Home store={store}
                            onLike={addLike}
                            onUnlike={removeLike}
                            onComment={addComment}/>
                </Route>
                <Route path="/">
                    <Home store={store}
                        onLike={addLike}
                        onUnlike={removeLike}
                        onComment={addComment}/>
                </Route>
            </Switch>     
            </main>
            <Navbar/>
            </div>
        </Router>
    );
    
    

}



export default App;
