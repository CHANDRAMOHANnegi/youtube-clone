import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {

    console.log('ReplyCommentProps----->', props);

    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.forEach((comment) => {
            if (comment.id === props.parentCommentId) {
                commentNumber++
            }
        });

        setChildCommentNumber(commentNumber);
    }, [props.CommentLists, props.parentCommentId]);

    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} videoId={props.videoId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment.id} videoId={props.videoId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
             </p>}
            {OpenReplyComments && renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
