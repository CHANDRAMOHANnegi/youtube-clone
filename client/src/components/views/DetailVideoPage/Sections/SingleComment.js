import React, { useState, useContext } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from '../../../../axios';
import LikeDislikes from './LikeDislikes';
import { AuthContext } from '../../../../_context/authContext';
import { ThemeContext } from '../../../../_context/themeContext';
const { TextArea } = Input;


function SingleComment(props) {

    // const user = useSelector(state => state.user);
    const context = useContext(AuthContext);
    const { userData } = context.authData;


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

        const requestBody = `
        mutation{
           createComment(commentInput:{
           content:"${CommentValue}",
           userId:"${userData.userId}",
           videoId:"${props.videoId}",
           commentId:"${props.comment.id}"}){
            id,
            content,
            createdAt
            }
        }`;

        axios.post('/', {
            query: requestBody,
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
        // <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]

    return (

        <ThemeContext.Consumer>{
            (context) => {
                const { isLightTheme, light, dark } = context;
                const theme = isLightTheme ? light : dark;

                return <div>
                    <Comment
                        actions={actions}
                        author={<p style={{ color: theme.color }}>{props.comment.writer.firstname + " " + props.comment.writer.lastname}</p>}
                        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                        content={<p style={{ color: theme.color }}>{props.comment.content}</p>}
                    ></Comment>
                    {
                        OpenReply &&
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
            }}
        </ThemeContext.Consumer>
    )
}

export default SingleComment
