import React, { useContext } from 'react';
import css from './Profile.module.css';
import publicUrl from '../utils/publicUrl';
import PostThumbnail from './PostThumbnail';
import { StoreContext } from '../contexts/StoreContext';
import {
  Link, 
  useParams
} from "react-router-dom";


function Profile(props) {
  const {store} = props;

  let {
     users, currentUserId, addFollower, removeFollower
  } = useContext(StoreContext);

  let {posts:allPosts} = useContext(StoreContext);
  let {followers:allFollowers} = useContext(StoreContext);



  let {userId} = useParams();
  let oneUser = false;
  if (typeof userId == 'string') {
    oneUser = true;
  }

  const userObj = (oneUser ? findUser(userId, store) : findUser(currentUserId, store));
  const posts = (oneUser ? findPosts(userId, store) : findPosts(currentUserId, store));
  const followers = (oneUser ? findFollowers(userId, store) : findFollowers(currentUserId, store));
  const following = (oneUser ? findFollowing(userId, store) : findFollowing(currentUserId, store));
  

  let follow = false;
  if (allFollowers.filter(follower=>(follower.followerId===currentUserId && follower.userId === userObj.id)).length > 0) {
    follow = true;
  }

  function handleFollow() {
    console.log('follow');
    addFollower(userId);
  }

  function handleUnfollow() {
    console.log('unfollow');
    addFollower(userId);
  }


    return (
		<div className={css.allprofile}>
      <div className={css.user}>
          <img src={publicUrl(userObj.photo)} alt="Profile Pic"/>
          <p>{oneUser ? userId : currentUserId}</p> <br></br>
          
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


function findUser(id){
  return users.find(user=>user.id===id);
}

function findPosts(id){
  return allPosts.filter(user=>user.userId===id);
}

function findFollowers(id){
  console.log(allFollowers.filter(follower=>follower.userId===id));
  return allFollowers.filter(follower=>follower.userId===id).length;
}

function findFollowing(id){
  console.log(allFollowers.filter(follower=>follower.userId===id));
  return allFollowers.filter(follower=>follower.followerId===id).length;
}

}

export default Profile;