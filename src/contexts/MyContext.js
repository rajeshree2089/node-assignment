import React, { createContext,Component } from "react";
import axios from 'axios';
export const MyContext = createContext();

// Define the base URL
const Axios = axios.create({
    baseURL: 'http://localhost:3000/',
});

class MyContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
    }

    // Root State
    state = {
        showLogin: localStorage.getItem('loginToken') ? false : true,
        isAuth: localStorage.getItem('loginToken') ? true : false,
        theUser: localStorage.getItem('userData') ? localStorage.getItem('userData') : null,
        userList:null
    }
    
    // Toggle between Login & Signup page
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // On Click the Log out button
    logoutUser = () => {
        localStorage.clear();
        this.setState({
            ...this.state,
            isAuth:false,
            theUser:null,
            showLogin: true
        })
    }

    

    loginUser = async (user) => {
        // Sending the user Login request
        const login = await Axios.post('login-api',{
            email:user.email,
            password:user.password
        });        
        return login.data;
    }

    // Checking user logged in or not
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken){
            const userData = localStorage.getItem('userData');
            if(userData){
                this.setState({
                    ...this.state,
                    showLogin:false,
                    isAuth:true,
                    theUser:userData
                });
            }            
        }
    }


    getCurrentUser = async () =>{
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken){
            const userLoginID = JSON.parse(localStorage.getItem('loginuserid'));            
            const userData = await Axios.post('get-user',{id:userLoginID[0].id});
            if (!userData.data) {
                this.logoutUser();
            }else{                
                localStorage.setItem('userData', userData.data.userData);
            }
        }
    }

    getUserList = async () =>{
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken){
            const userList = await Axios.get('get-user-list');              
            if (userList.data) {
                localStorage.setItem('userDataList', userList.data.userDataList);
            }
        }
    }


    render(){        
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser,
            getUserList:this.getUserList,
            getCurrentUser:this.getCurrentUser
        }
        return(
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;