import React from 'react';
import css from './Profile.module.css';
import publicUrl from '../utils/publicUrl';
import PostThumbnail from './PostThumbnail';

function Profile(props) {
  const {store} = props;

  const userObj = findUser(store.currentUserId, store);
  const posts = findPosts(store.currentUserId, store);
  const followers = findFollowers(store.currentUserId, store);

    return (
		<div className={css.allprofile}>
      <div className={css.user}>
          <img src={publicUrl(userObj.photo)} alt="Profile Pic"/>
          <p>{store.currentUserId}</p>
        </div>
      <div className={css.bio}>
          <p>{userObj.name}</p>
          <p>{userObj.bio}</p>
      </div>
      <div className={css.followers}>
        <p>{posts.length}<br></br>posts</p>
        <p>{followers}<br></br>followers</p>
        <p>1<br></br>following</p>
      </div>
      <div className={css.posts}>
        {posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
            .map(post=>
                <PostThumbnail
                    photo={post.photo}
                />)}
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
  return store.followers.filter(follower=>follower.userId===id).length;
}

export default Profile;