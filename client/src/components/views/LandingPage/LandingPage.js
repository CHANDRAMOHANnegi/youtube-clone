import React, { useEffect, useState, useContext } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { ThemeContext } from '../../../_context/themeContext';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Videos, setVideos] = useState([])

    const context = useContext(ThemeContext);
    const { isLightTheme, light, dark } = context;
    const theme = isLightTheme ? light : dark;

    useEffect(() => {
        const requestBody = `{
        getVideos{
            id
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
            }
        }`;

        axios.post('http://localhost:4000/api', {
            query: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
            if (response.data.data.getVideos) {
                console.log(response.data)
                setVideos(response.data.data.getVideos)
            } else {
                alert('Failed to get Videos')
            }
        }).catch(err => {
            console.log('//////////////', err);
        })
    }, [])

    console.log(Videos);

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/video/${video.id}`} >
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
                <Meta avatar={<Avatar src={video.writer.image} />} title={video.title} />
                <span>{video.writer.firstname + "" + video.writer.lastname} </span><br />
                <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
            </Col>
        )
    });

    return (
        <div style={{
            width: '85%', margin: '3rem auto',
            backgroundColor: theme.ui,
            color: theme.syntax
        }}>
            <Title level={2} > Recommended </Title>
            <hr />
            <Row gutter={16}>{renderCards}</Row>
        </div>
    )
}

export default LandingPage
