import React, {createContext, useState, useEffect} from 'react';
import initialStore from '../utils/initialStore';
import uniqueId from '../utils/uniqueId';

// export the context so that other components can import
export const StoreContext = createContext(); 


function StoreContextProvider(props){
    const [store, setStore] = useState(()=>{
        return JSON.parse(window.localStorage.getItem('store')) || initialStore;
    });
    
    useEffect(()=>{
        window.localStorage.setItem('store', JSON.stringify(store));
    }, [store]);

	return (
        <StoreContext.Provider value = {{...store, addComment, addLike, removeLike, addPost, addFollower, removeFollower}}>
            {props.children}
        </StoreContext.Provider>
    )



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
}

export default StoreContextProvider; // export this component as default