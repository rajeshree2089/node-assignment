import React, {useContext} from 'react'
import { MyContext } from '../contexts/MyContext'

// Importing the Login & Register Componet
import Login from './Login'
import Userlist from './Userlist'


function Home(){

    const {rootState,logoutUser} = useContext(MyContext);
    const {isAuth,theUser,showLogin} = rootState;
    // If user Logged in   

    if(isAuth)
    {
        let theUserData = JSON.parse(theUser);        
        return(
            <div>
                <div className="userInfo">
                    <div className="_img"><span role="img" aria-label="User Image">👦</span></div>
                    <h1>{theUserData[0].name}</h1>
                    <div className="_email"><span>{theUserData[0].email}</span></div>
                    <div className="_role"><span>({theUserData[0].role})</span></div>
                    <button onClick={logoutUser}>Logout</button>
                </div> 
                <Userlist />
            </div>           
        )
    }
    // Showing Login Or Register Page According to the condition
    else if(showLogin){
        return <Login/>;
    }
    
}

export default Home;