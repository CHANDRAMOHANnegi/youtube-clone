import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {

    const { email, password, firstname, lastname } = dataToSubmit;
    const requestBody = `
        mutation{
           createUser(userInput:{email:"${email}",password:"${password}",firstname:"${firstname}",lastname:"${lastname}"}){
            email
        }
    }`;
    axios.post('http://localhost:4000/api', {
        query: requestBody,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log(response.data);
        return {
            type: REGISTER_USER,
            payload: response.data
        }
    }).catch(err => {
        console.log(err);
    });
}

export function loginUser(dataToSubmit) {

    const { email, password } = dataToSubmit;
    console.log(dataToSubmit);

    const requestBody = `{
                login(email:"${email}",password:"${password}"){
                    userId,
                    token,
                    tokenExp,
                    firstname,
                    lastname,role,
                    image,
                    email
            }}
            `;

    axios.post('http://localhost:4000/api', {
        query: requestBody,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log(response);
        return {
            type: LOGIN_USER,
            payload: response.data.login
        }
    }).catch(err => console.log(err));
}

export function auth() {

    // const requestBody = {
    //     query: `
    //     query{
    //        createUser(userInput:{email:"${email}",password:"${password}",name:"${name}",lastname:${lastname},image:"${image}"}){
    //         id
    //         email
    //     }
    // }
    // `};

    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }

}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

