import React, { useState, useContext } from 'react'
import { Typography, Button, Form, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
 import { AuthContext } from '../../../_context/authContext';

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const Catogory = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
];

function UploadVideoPage(props) {
    const context = useContext(AuthContext);
    console.log(context);

    const { userData, isAuthenticated } = context.authData;

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0);
    const [Categories, setCategories] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value);
        setDescription(event.currentTarget.value);
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value);
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!isAuthenticated) {
            return alert('Please Log in First');
        }

        if (title === "" || Description === "" || Categories === "" || FilePath === "" || Duration === "" || Thumbnail === "") {
            return alert('Please first fill all the fields');
        }

        const variables = {
            userId: userData.userId,
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        };

        console.log(variables);
        axios.post('http://localhost:4000/video/uploadVideo', variables)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    alert('video Uploaded Successfully');
                    props.history.push('/');
                } else {
                    alert('Failed to upload video');
                }
            }).catch(err => console.log(err));
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])
        axios.post('http://localhost:4000/video/uploadfiles', formData, config)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)
                    axios.post('http://localhost:4000/video/thumbnail', variable)
                        .then(response => {
                            console.log(response);
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })
                } else {
                    alert('failed to save the video in server')
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>
                    {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:4000/${Thumbnail}`} alt="haha" />
                        </div>
                    }
                </div>
                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title} />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDecsription}
                    value={Description} />
                <br /><br />
                <select onChange={handleChangeOne}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />
                <select onChange={handleChangeTwo}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
            </Button>
            </Form>
        </div>
    )
}

export default UploadVideoPage
