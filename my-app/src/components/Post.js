import React from 'react';
import css from './Post.module.css';
import publicUrl from '../utils/publicUrl';
import timespan from '../utils/timespan';

function Post(props) {

    return (
        <div className={css.post}>
            <div className={css.user}>
                <img src={props.user.photo} alt="Profile Pic"/>
                <p>{props.user.id}</p>
            </div>
            <div className={css.post}>
                <img src={props.post.photo} alt="Post Photo"/>
            </div>
            <div className={css.icons}>
                <img src={publicUrl('/assets/like.svg')} alt="Like"/>
                <img src={publicUrl('/assets/comment.svg')} alt="Comment"/>
                
            </div>
            <div className={css.likes}>
                <p>{props.likes.count}</p><p>likes</p>
            </div>
            <div className={css.comments}>
                <div className={css.com}>
                    <p><b>{props.post.userId}</b></p> <p>{props.post.desc}</p>
                </div>
                <div className={css.com}>
                    <p><b>{props.comments[0].userId}</b></p> <p>{props.comments[0].text}</p>
                </div>
                <div className={css.com}>
                    <p><b>{props.comments[1].userId}</b></p> <p>{props.comments[1].text}</p>
                </div>
                
            </div>
            <div className={css.time}>
                    <p>{timespan("March 3 2021")} ago</p>
            </div>
        </div>
    );
}

export default Post;