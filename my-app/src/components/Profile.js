import React from 'react';
import css from './Profile.module.css';
import publicUrl from '../utils/publicUrl';
import PostThumbnail from './PostThumbnail';
import {
  Link, 
  useParams
} from "react-router-dom";


function Profile(props) {
  const {store} = props;



  let {userId} = useParams();
  let oneUser = false;
  if (typeof userId == 'string') {
    oneUser = true;
  }

  const userObj = (oneUser ? findUser(userId, store) : findUser(store.currentUserId, store));
  const posts = (oneUser ? findPosts(userId, store) : findPosts(store.currentUserId, store));
  const followers = (oneUser ? findFollowers(userId, store) : findFollowers(store.currentUserId, store));
  const following = (oneUser ? findFollowing(userId, store) : findFollowing(store.currentUserId, store));
  

  let follow = false;
  if (store.followers.filter(follower=>(follower.followerId===store.currentUserId && follower.userId === userObj.id)).length > 0) {
    follow = true;
  }

  function handleFollow() {
    console.log('follow');
    props.onFollow(userId);
  }

  function handleUnfollow() {
    console.log('unfollow');
    props.onUnfollow(userId);
  }


    return (
		<div className={css.allprofile}>
      <div className={css.user}>
          <img src={publicUrl(userObj.photo)} alt="Profile Pic"/>
          <p>{oneUser ? userId : store.currentUserId}</p> <br></br>
          
          {follow?
              <button className={css.unfollowBtn} onClick={handleUnfollow}>Unfollow</button> :
              <button className={css.followBtn} onClick={handleFollow}>Follow</button> 
          }
          
        </div>
      <div className={css.bio}>
          <p>{userObj.name}</p>
          <p>{userObj.bio}</p>
      </div>
      <div className={css.followers}>
        <p>{posts.length}<br></br>posts</p>
        <p>{followers}<br></br>followers</p>
        <p>{following}<br></br>following</p>
      </div>
      <div className={css.posts}>
        {posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
            .map(post=>
              <Link key={post.id} to={`/${post.id}`}>
                <PostThumbnail
                    post={post}
                />
                </Link>)}
                
      </div>
      
    </div>
	);
}

function findUser(id, store){
  return store.users.find(user=>user.id===id);
}

function findPosts(id, store){
  return store.posts.filter(user=>user.userId===id);
}

function findFollowers(id, store){
  console.log(store.followers.filter(follower=>follower.userId===id));
  return store.followers.filter(follower=>follower.userId===id).length;
}

function findFollowing(id, store){
  console.log(store.followers.filter(follower=>follower.userId===id));
  return store.followers.filter(follower=>follower.followerId===id).length;
}

export default Profile;