var User = {
	//查询用户名
	queryUserName(userObj){
		
		if(userObj.userName){
			return `select * from user where userName = '${userObj.userName}' or phone = '${userObj.userName}'`;
		}else{
			//第三方登陆
			return `select * from user where provider = '${userObj.provider}' and openid = '${userObj.openid}'`;
		}

	},
	//验证用户名和密码
	queryUserPwd(userObj){
		// return `select * from user where userName = '${userObj.userName}' or phone = '${userObj.userName}' and userPwd = ${userObj.userPwd}`;
	return "select * from user where  (userName ='"+userObj.userName+"' or phone = '"+userObj.userName+"')and userPwd = '"+userObj.userPwd+"' ";
	},
	//增加一条用户数据
	insertUser(userObj){
		let userName = userObj.userName || userObj.openid
		const jwt = require('jsonwebtoken');
		let payload = {name: userName};
		let secret = "jjjayisme";
		let token = jwt.sign(payload,secret);
		let nickName = userObj.nickName || '默认昵称';
		let provider = userObj.provider || '';
		let avatarUrl =  userObj.avatarUrl || '../../static/img/commodity1.jpg';
		let openid = userObj.openid || '';
		return `insert into user (userName,userPwd,phone,imgUrl,nickName,token,provider,openid) values ('${userName}','','${userName}','${avatarUrl}','${nickName}','${token}','${provider}','${openid}')`;
	}
}

module.exports = User;