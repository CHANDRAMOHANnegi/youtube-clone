import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
 const { TextArea } = Input;

function Comments(props) {
    const user = useSelector(state => state.user)

    console.log('====================>', user);

    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // const variables = {
        //     content: Comment,
        //     writer: user.userData.userId,
        //     videoId: props.videoId
        // }

        const requestBody = `
        mutation{
           createComment(commentInput:{content:"${Comment}",userId:"${user.userData.userId}",videoId:"${props.videoId}"}){
            content
            }
        }`;

        axios.post('http://localhost:4000/api', {
            query: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            if (response.data.data) {
                setComment("")
                props.refreshFunction(response.data.data)
            } else {
                alert('Failed to save Comment')
            }
        })
    }

    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}



            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comments
