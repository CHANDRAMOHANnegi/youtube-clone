import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {

    const { email, password, name, lastname, image } = dataToSubmit;

    const requestBody = `
        mutation{
           createUser(userInput:{email:"${email}",password:"${password}",name:"${name}",lastname:${lastname},image:"${image}"}){
            id
            email
        }
    }`;
    const request = axios.post('http://localhost:4000/api', {
        query: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log(response.data);
        return response.data;
    });

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {

    console.log(dataToSubmit);

    const { email, password } = dataToSubmit;

    const requestBody = `
    query{
       login(email:"${email}",password:"${password}"){
        userId,
        token,
        tokenExp
    }
}`;

    const request = axios.post('http://localhost:4000/api', {
        query: requestBody,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return {
            type: LOGIN_USER,
            payload: request.data.login
        }
        return response.data;
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

    // const request = axios.get(`${USER_SERVER}/auth`)
    //     .then(response => response.data);

    // return {
    //     type: AUTH_USER,
    //     payload: request
    // }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

