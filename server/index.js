const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const conn = require('./config/connection.js');
const crypto = require('crypto');
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
const port = 3001

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

//Endpoint 1
app.get('/get-user-list', async (req, res) => {
	const userList = await new Promise((resolve, reject) => {		
		conn.query("SELECT name,email,role FROM user", (err, rows, meta) => {
		  	if (err) 
		  		resolve(false);
		  	else
		  		resolve(rows);
		});
	});
	let sortedUserList = userList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
	res.send({userDataList : JSON.stringify(sortedUserList)})
})

app.post('/get-user', async (req, res) => {
	let user_id  = req.body.id;
	if(user_id){
		const userData = await new Promise((resolve, reject) => {		
			conn.query("SELECT name,email,role FROM user WHERE id = '"+user_id+"'", (err, rows, meta) => {
			  	if (err) 
			  		resolve(false);
			  	else
			  		resolve(rows);
			});
		});
		res.send({userData : JSON.stringify(userData)})
	}
  	res.send(false)
})

app.post('/login-api', async (req, res) => {  	
	let username = req.body.email;
	let password = req.body.password;
	const userData = await new Promise((resolve, reject) => {		
		conn.query("SELECT id,role FROM user WHERE email = '"+username+"' AND password = '"+password+"'", (err, rows, meta) => {
		  	if (err) 
		  		resolve(false);
		  	else
		  		resolve(rows);
		});
	});
	
	if(userData != false && userData.length > 0){		
		const buffer = crypto.randomBytes(48);
		var token = buffer.toString('hex');	
		if(userData[0].role == 'ADMIN'){
			res.send({success : true, token: token, userData : JSON.stringify(userData), isAdmin:true});
		}
		res.send({success : true, token: token, userData : JSON.stringify(userData), isAdmin:false});
	}else{
		res.send({status:false, message : "Please check the credentials & try again."});
	}
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})