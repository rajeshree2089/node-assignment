import React, { useState } from "react";


export default function Userlist() {
	let theUserDataList = localStorage.getItem('userDataList');	
    if(theUserDataList != null){
        theUserDataList = JSON.parse(theUserDataList);
    }    
    if(theUserDataList != null && theUserDataList.length > 0){
    	return (
			<div className="container">
				<h1 className="user-list-title">All User list</h1>
				<table border="1" className="table-bordered">
					<tbody>
	                    {theUserDataList.map((user, index) => {
	                        return(
	                        	<tr key={index}>
		                            <td>{(index+1)}</td>
		                            <td>{user.name}</td>
		                            <td>{user.email}</td>
		                            <td>{user.role}</td>                            
		                        </tr>
		                    )
	                    })}
	                </tbody>
                </table>
			</div>
		);
    }else{
    	return (<div />);
    }
	
}