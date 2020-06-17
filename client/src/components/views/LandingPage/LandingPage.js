import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => {

        console.log("----------------------------Z");
        

        const requestBody = `{

            getVideos{userId,id,
            title,
            description,
            filePath,
            category,
            views,privacy,
            thumbnail,
            updatedAt,
            createdAt
          }}`;

        axios.post('http://localhost:4000/api', {
            query: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data.data.getVideos);
            if (response.data) {
                console.log(response.data.data.getVideos)
                setVideos(response.data.data.getVideos)
            } else {
                alert('Failed to get Videos')
            }
        })
    }, [])


    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return (<Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                    <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:4000/${video.thumbnail}`} />
                    <div className=" duration"
                        style={{
                            bottom: 0, right: 0, position: 'absolute', margin: '4px',
                            color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                            padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px', fontSize: '12px',
                            fontWeight: '500', lineHeight: '12px'
                        }}>
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>)

    });


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />
            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
