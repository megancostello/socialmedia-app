import React, { useState } from 'react';
import css from './Post.module.css';
import publicUrl from '../utils/publicUrl';
import timespan from '../utils/timespan';


function Post(props) {
    function handleLike() {
        console.log('like');
        props.onLike(props.post.id);
      }
    
    function handleUnlike() {
        console.log('unlike');
        props.onUnlike(props.post.id);
      }

    function handleSubmitComment(event){
        props.onComment(props.post.id, comment); // this calls addComment from App.js
        setComment(''); //reset
        setToggleComment(false); //close comment box
        event.preventDefault(); // prevent page refresh
    }

    const [comment, setComment] = useState('');
    const [toggleComment, setToggleComment] = useState(false);

    return (
        <div className={css.allpost}>
            <div className={css.user}>
                <img src={publicUrl(props.user.photo)} alt="Profile Pic"/>
                <p>{props.user.id}</p>
            </div>
            <div className={css.post}>
                <img src={publicUrl(props.post.photo)} alt="Post Photo"/>
            </div>
            <div className={css.icons}>
                <button>
                    {props.likes.self?
                        <img src={publicUrl('/assets/unlike.svg')} onClick={handleUnlike} alt='Unlike Action'/> :
                        <img src={publicUrl('/assets/like.svg')} onClick={handleLike} alt='Like Action'/> 
                    }
                </button>
                <button onClick={e=>setToggleComment(!toggleComment)}>
                    <img src={publicUrl('/assets/comment.svg')} alt='Comment Action'/> 
                </button>
            </div>
            <div className={css.likes}>
                <p>{props.likes.count}</p><p>likes</p>
            </div>
            <div className={css.comments}>
                <div className={css.com}>
                    <p><b>{props.post.userId}</b></p> <p>{props.post.desc}</p>
                </div>
                <div>
                    {props.comments.map((c,idx) => (
                        <div className={css.com} key={idx}>
                            <p><b>{c.userId}</b></p>
                            <p>{c.text}</p>
                        </div>
                    ))}
                </div>
                
            </div>
            <div className={css.time}>
                    <p>{timespan(props.post.datetime)} ago</p>
            </div>
            {toggleComment && 
                <form className={css.addComment} onSubmit={handleSubmitComment}>
                    <input type="text" placeholder="Add a comment…" value={comment} onChange={e=>setComment(e.target.value)}/>
                    <button type="submit">Post</button>
                </form>
            }
        </div>
    );

}




export default Post;