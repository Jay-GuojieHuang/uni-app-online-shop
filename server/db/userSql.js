var User = {
	//查询用户名
	queryUserName(userObj){
		return `select * from user where userName = '${userObj.userName}' or phone = '${userObj.userName}'`;
	},
	//验证用户名和密码
	queryUserPwd(userObj){
		// return `select * from user where userName = '${userObj.userName}' or phone = '${userObj.userName}' and userPwd = ${userObj.userPwd}`;
	return "select * from user where userName = ('"+userObj.userName+"' or phone = '"+userObj.userName+"')and userPwd = '"+userObj.userPwd+"' ";
	},
	//增加一条用户数据
	createUser(userObj){
		return `insert into user (userName,userPwd,phone,imgUrl,nickName,token) values ('','','','','','')`;
	}
}

module.exports = User;