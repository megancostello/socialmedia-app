import React, { useContext } from 'react';
import css from './Home.module.css';
import publicUrl from '../utils/publicUrl';
import Post from './Post';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../contexts/StoreContext';

function Home(props) {
    let {
      posts, users, comments, likes, currentUserId, 
      addComment, addLike, removeLike
    } = useContext(StoreContext);

    const {store} = props;
    let {postId} = useParams();
    let onePost = false;
    if (typeof postId == 'string') {
      onePost = true;
    }

    return (
		<div>
        
            {onePost
            ? posts.filter(post=>post.id===postId).map(
              post=>
              <Post
                    key={post.id}
                    user={findUser(post, store)}
                    post={post}
                    comments={findComments(post, store)}
                    likes={findLikes(post, store)}
                    onLike={addLike} 
                    onUnlike={removeLike}
                    onComment={addComment}
                />)
            
            
            : posts.sort((a,b)=>new Date(b.datetime) - new Date(a.datetime))
            .map(post=>
                <Post
                    key={post.id}
                    user={findUser(post, store)}
                    post={post}
                    comments={findComments(post, store)}
                    likes={findLikes(post, store)}
                    onLike={addLike} 
                    onUnlike={removeLike}
                    onComment={addComment}
                />)}
    </div>
	);


  function findUser(post){
      return users.find(user=>user.id===post.userId);
    }

  function findComments(post){
    return comments.filter(comment=>comment.postId===post.id);
  }

  function findLikes(post){
    let postLikes = likes.filter(like=>like.postId===post.id);
    return {
      self: postLikes.some(like=> like.userId===currentUserId),
      count: postLikes.length
    }
  }
}
export default Home;