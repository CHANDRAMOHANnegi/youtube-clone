import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class UploadVideoPage extends Component {

    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '' };
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    _handleSubmit(e) {
        e.preventDefault();
        const image = this.state.file;

        const{name:filename,type:mimetype}=image

        console.log('////////////////////////',  this.state.file);

        const requestBody = `
            mutation {
                addPhoto(file: {filename:"${filename}",mimetype:"${mimetype}"}) {

                  fileLocation
            }}
   `;
        axios.post('http://localhost:4000/api', {
            query: requestBody,
            variables: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibW1AbW0ubW0iLCJpYXQiOjE1OTE0NjYxMjQsImV4cCI6MTU5MTQ2OTcyNH0.LGPVYNxHYTiHfOafYKAtFbQzPKslSlkV40y0E9Y-7cw'
            }
        }).then(response => {
            console.log(response);
            return response.data;
        }).catch(err => console.log(err));

    }


    render() {
        return (
            <div>
                upload videos
                <form onSubmit={(e) => this._handleSubmit(e)}>
                    <input className="fileInput"
                        type="file"
                        onChange={(e) => this._handleImageChange(e)} />
                    <button className="submitButton"
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                </form>
            </div>
        );
    }
}


UploadVideoPage.propTypes = {

};


export default UploadVideoPage;
