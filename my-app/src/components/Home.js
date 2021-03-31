import React from 'react';
import css from './Home.module.css';
import publicUrl from '../utils/publicUrl';
import Post from './Post';
import { useParams } from 'react-router-dom';

function Home(props) {
    const {store} = props;
    let {postId} = useParams();
    let onePost = false;
    if (typeof postId == 'string') {
      onePost = true;
    }

    return (
		<div>
        
            {onePost
            ? store.posts.filter(post=>post.id===postId).map(
              post=>
              <Post
                    key={post.id}
                    user={findUser(post, store)}
                    post={post}
                    comments={findComments(post, store)}
                    likes={findLikes(post, store)}
                    onLike={props.onLike} 
                    onUnlike={props.onUnlike}
                    onComment={props.onComment}
                />)
            
            
            : store.posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
            .map(post=>
                <Post
                    key={post.id}
                    user={findUser(post, store)}
                    post={post}
                    comments={findComments(post, store)}
                    likes={findLikes(post, store)}
                    onLike={props.onLike} 
                    onUnlike={props.onUnlike}
                    onComment={props.onComment}
                />)}
    </div>
	);
}

function findUser(post, store){
    return store.users.find(user=>user.id===post.userId);
  }

function findComments(post, store){
  return store.comments.filter(comment=>comment.postId===post.id);
}

function findLikes(post, store){
  let postLikes = store.likes.filter(like=>like.postId===post.id);
  return {
    self: postLikes.some(like=> like.userId===store.currentUserId),
    count: postLikes.length
  }
}

export default Home;