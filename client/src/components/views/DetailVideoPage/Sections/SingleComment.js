import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
const { TextArea } = Input;


function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    console.log('--------------->', props);

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // const variables = {
        //     writer: user.userData.userId,
        //     videoId: props.videoId,
        //     parentcommentId: props.comment.id,
        //     content: CommentValue
        // };


        const requestBody = `
        mutation{
           createComment(commentInput:{
           content:"${CommentValue}",
           userId:"${user.userData.userId}",
           videoId:"${props.videoId}",
           commentId:"${props.comment.id}"}){
            id,
            content,
            createdAt
            }
        }`;

        Axios.post('http://localhost:4000/api', {
            query: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            if (response.data) {
                setCommentValue("")
                setOpenReply(!OpenReply)
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        });
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment.id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.firstname + " " + props.comment.writer.lastname}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={<p>{props.comment.content}</p>}
            ></Comment>

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write reply"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }
        </div>
    )
}

export default SingleComment
