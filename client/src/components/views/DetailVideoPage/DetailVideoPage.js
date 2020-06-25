import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])


    useEffect(() => {

        const requestBody = `{
            getVideo(videoId:"${videoId}"){
                    title
                    description
                    filePath
                    category
                    views
                    privacy
                    duration
                    thumbnail
                    createdAt
                    updatedAt
                    userId
                    writer{
                        firstname
                        lastname
                        image
                    }
                    Comments{
                            id
                            content 
                            createdAt
                            writer{
                                firstname
                                lastname
                                image
                            }
                        }
        }}`;

        axios.post('http://localhost:4000/api', {
            query: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data.data.getVideo);
            setVideo(res.data.data.getVideo);
            setCommentLists(res.data.data.getVideo.Comments)
        }).catch(err => {
            console.log(err)
            alert('Failed to get video Info')
        });

    }, [])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    };

    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:4000/${Video.filePath}`} controls></video>
                        <List.Item
                            actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')} />, <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>
                        <Comments CommentLists={CommentLists} videoId={videoId}
                            refreshFunction={updateComment} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }


}

export default DetailVideoPage

