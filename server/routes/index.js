const {
	json
} = require('express');
let express = require('express');
const jwt = require('jsonwebtoken');
//验证码
let code = '';
//接入短信的sdk
var QcloudSms = require("qcloudsms_js");

var router = express.Router();

var connection = require('../db/sql.js');
var user = require('../db/userSql');



router.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	//Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


//修改订单状态
router.post(`/api/submitOrder`, function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	//订单号
	let orderId = req.body.orderId;
	// 选中购物车里的商品
	let checkedItemList = req.body.checkedItemList;

	//获取当前用户
	connection.query(`select * from user where phone =${phone.name}`, function(error, results) {
		let userid = results[0].id;
		connection.query(`select * from store_order where uid = ${userid} and order_id= ${orderId}`,
			function(err, result) {
				//订单的ID 不是订单号
				let order_id = result[0].id

				connection.query(
					`update store_order set order_status = replace(order_status, 1, 2) where id = ${order_id}`,
					function(e, r) {
						checkedItemList.forEach(id => {
							connection.query(`delete from goods_cart where id =${id}`,
								function(ee, rr) {
									res.send({
										data: {
											success: true
										}
									})
								})
						})






					})
			})


	})


})






//生成订单
router.post(`/api/addOrder`, function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	//前端给后端传递的数据 -- 选中的购物车商品
	let selectedOrderitemArr = req.body.orderItemList;
	//生成订单号

	function setTimeDateFmt(s) { // 个位数补齐十位数
		return s < 10 ? '0' + s : s;
	}

	function createordernum() {
		const now = new Date()
		let month = now.getMonth() + 1
		let day = now.getDate()
		let hour = now.getHours()
		let minutes = now.getMinutes()
		let seconds = now.getSeconds()
		month = setTimeDateFmt(month)
		day = setTimeDateFmt(day)
		hour = setTimeDateFmt(hour)
		minutes = setTimeDateFmt(minutes)
		seconds = setTimeDateFmt(seconds)
		let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math
			.round(Math.random() * 1000000)).toString();
		return orderCode;
		//基于年月日时分秒+随机数生成订单编号
	}
	//订单号
	let orderId = createordernum();
	//商品名称
	let goodsName = [];
	//商品总价
	let goodsPrice = 0;
	//商品总数量
	let goodsNum = 0;

	selectedOrderitemArr.forEach(item => {
		goodsName.push(item.name);
		goodsPrice += item.price * item.count;
		goodsNum += parseInt(item.count);
	})


	//获取当前用户
	connection.query(`select * from user where phone =${phone.name}`, function(error, result) {
		let userid = result[0].id;
		// console.log(`insert into store_order (uid,order_id,goods_name,goods_price,goods_num,goods_status) values ('${userid}','${orderId}','${goodsName}','${goodsPrice}','${goodsNum}','1')`);
		connection.query(
			`insert into store_order (uid,order_id,goods_name,goods_price,goods_num,order_status) values ('${userid}','${orderId}','${goodsName}','${goodsPrice}','${goodsNum}','1')`,
			function(err, results) {
				connection.query(
					`select * from store_order where uid = ${userid} and order_id = ${orderId}`,
					function(e, r) {
						res.send({
							data: {
								success: true,
								data: r
							}
						})
					})



			})
	})


})


//删除购物车数据
router.post('/api/deleteCart', function(req, res, next) {
	let goods_id = req.body.goods_id
	console.log(req.body);
	for (var i = 0; i < goods_id.length; i++) {
		console.log(`delete from goods_cart where id = ${goods_id[i]}`);
		connection.query(`delete from goods_cart where id = ${goods_id[i]}`, function(errors, results) {
			res.send({
				data: {
					success: true
				}
			})
		})
	}
})





//加入购物车
router.post('/api/addToCart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	let id = req.body.goods_id;
	let count = req.body.count;
	// console.log(`,${id},${count}`);
	//查询当前用户id
	connection.query(`select * from user where phone = ${phone.name}`, function(errors, results) {
		//当前用户id
		let uid = results[0].id;


		// 查询商品信息
		connection.query(`select * from goods_search where id =${id}`, function(error, result,
			fields) {
			// console.log(result);
			let name = result[0].name;
			let imgUrl = result[0].imgUrl;
			let price = result[0].pprice;
			// console.log(`${name},${imgUrl},${price}`);
			//查询用户购物车是否存在商品
			connection.query(`select * from goods_cart where uid =${uid} and goods_id = ${id}`,
				function(err, ress, ) {
					// console.log(r);
					if (ress.length > 0) {
						let currentCount = Number(count) + Number(ress[0].count);
						let updateSql =
							`update goods_cart set count = replace(count,${ress[0].count},${currentCount}) where id = ${ress[0].id}`
						// console.log(updateSql);
						console.log('exist');
						connection.query(updateSql, function(re, ee) {
							res.send({
								data: {
									success: true
								}
							})
						})
					} else {
						//当前购物车没有此商品，需新增
						let insertSql =
							`insert into goods_cart (uid,goods_id,name,imgUrl,price,count) values ('${uid}',${id},'${name}','${imgUrl}','${price}','${count}')`;
						// console.log(insertSql);
						connection.query(insertSql, function(r, e) {
							res.send({
								data: {
									success: true
								}
							})
						})
					}


				})

		});

	})






})







//修改当前用户的购物车数据库的商品数量
router.post('/api/updateNumberCart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	let goodsId = req.body.goodsId;
	let count = req.body.count
	connection.query(`select * from user where phone = ${phone.name}`, function(errors, results) {
		let userid = results[0].id;

		connection.query(`select * from goods_cart where uid = ${userid} and goods_id = ${goodsId}`,
			function(err, result) {
				let goods_num = result[0].count;
				let cid = result[0].id;
				console.log(
					`update goods_cart set count = replace(count,${count},${goods_num}) where id = ${cid}`
				);
				connection.query(
					`update goods_cart set count = replace(count,${goods_num},${count}) where id = ${cid}`,
					function(e, r) {
						// console.log(r);
						res.send({
							data: {
								success: true,

							}
						})
					})
			})
	})
})




//获取当前用户的购物车数据
router.post('/api/getcart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);

	connection.query(`select * from user where phone = ${phone.name}`, function(errors, results) {
		let userid = results[0].id;

		connection.query(`select * from goods_cart where uid = ${userid}`, function(e, r) {
			// console.log(r);
			res.send({
				data: r
			})

		})
	})


})




//更新收货地址
router.post('/api/updateAddress', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	let name = req.body.name;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let tel = req.body.phone;
	let address = req.body.address;
	let isDefault = req.body.isDefault;
	let id = req.body.id;

	connection.query(`select * from user where phone = ${phone.name}`, function(errors, results) {
		let userid = results[0].id;
		if (isDefault == "1") {
			connection.query(
				`update address set isDefault = 0 where (userid = ${userid} and id != ${id})`,
				function(e, re) {})
		}
		let updateSql =
			`update address set name = ?,phone = ?,province = ?,city = ?,district = ?,address = ?,isDefault = ?,userid = ? where id = ${id}`
		connection.query(updateSql, [name, tel, province, city, district, address, isDefault, userid],
			function(err, result) {
				res.send({
					data: {
						success: '成功'
					}
				})
			})

	})
})




//新增收货地址 

router.post('/api/addAddress', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	let name = req.body.name;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let tel = req.body.phone;
	let address = req.body.address;
	let isDefault = req.body.isDefault;

	connection.query(`select * from user where phone = ${phone.name}`, function(errors, results) {
		let id = results[0].id;

		if (isDefault == "1") {
			connection.query(
				`update address set isDefault = 0 where (userid = ${id} and isDefault = 1)`,
				function(e, re) {})
		}

		let sqlInsert =
			`insert into address (name,phone,province,city,district,address,isDefault,userid) values ('${name}','${tel}','${province}','${city}','${district}','${address}','${isDefault}','${id}')`;
		connection.query(sqlInsert, function(err, r) {
			res.send({
				data: {
					success: true
				}
			})
		})

	})

});




//查询当前用户的收货地址
router.post('/api/getAddress', function(req, res, next) {
	let token = req.headers.token;
	let decodedToken = jwt.decode(token);
	let phone = decodedToken.name;

	connection.query(`select * from user where phone = ${phone}`, function(error, result, fields) {
		// console.log(result);
		let id = result[0].id
		connection.query(`select * from address where userid = ${id}`, function(e, r) {
			// console.log(r);
			res.send({
				data: r
			})
		})

	})

})






//第三方登陆
router.post('/api/loginThirdParty', function(req, res, next) {

	let params = {
		provider: req.body.provider,
		openid: req.body.openId,
		nickName: req.body.nickName,
		avatarUrl: req.body.avatarUrl
	}

	connection.query(user.queryUserName(params), function(error, result, fields) {
		if (result.length > 0) {
			// 数据库中存在用户，则读取信息
			res.send({
				data: {
					success: false,
					msg: "用户已存在",
					data: result[0]
				}
			})
		} else {
			//用户不存在，先写入后读取
			connection.query(user.insertUser(params), function(err, result) {
				connection.query(user.queryUserName(params), function(e, r) {
					console.log(user.queryUserName(params));
					console.log(r[0]);
					res.send({
						data: {
							success: true,
							data: r[0]
						}

					})
				});

			})

		}

	})





})













// router.post('/api/test', function(req, res, next) {
// 	res.send({
// 		data: {
// 			a: 1
// 		}
// 	})
// })


//注册==》增加一条数据
router.post('/api/addUser', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName: req.body.userName,
		userCode: req.body.code
	};
	if (params.userCode == code) {
		console.log(params);
		console.log(user.insertUser(params));
		connection.query(user.insertUser(params), function(error, results, fields) {
			connection.query(user.queryUserName(params), function(err, result) {
				if (result.length > 0) {
					res.send({
						data: {
							success: true,
							msg: '注册成功!',
							data: result[0]
						}
					})
				}

			})

		})
	}
})


//发送验证码
router.post('/api/code', function(req, res, next) {
	let params = {
		phone: req.body.phone
	};
	//接入skd
	// 短信应用 SDK AppID
	var appid = 1400187558; // SDK AppID 以1400开头
	// 短信应用 SDK AppKey
	var appkey = "dc9dc3391896235ddc2325685047edc7";
	// 需要发送短信的手机号码
	var phoneNumbers = [params.phone];
	// 短信模板 ID，需要在短信控制台中申请
	var templateId = 298000; // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
	// 签名
	var smsSign = "测试信息"; // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
	// 实例化 QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
	function callback(err, ress, resData) {
		if (err) {
			console.log("err: ", err);
		} else {
			code = ress.req.body.params[0];
			res.send({
				data: {
					success: true,
					code: code
				}
			})
		}
	}
	var ssender = qcloudsms.SmsSingleSender();
	var paramss = [Math.floor(Math.random() * (9999 - 1000)) + 1000]; //发送的验证码
	ssender.sendWithParam("86", phoneNumbers[0], templateId,
		paramss, smsSign, "", "", callback);
})







//验证手机号是否存在
router.post('/api/register', function(req, res, next) {

	let params = {
		userName: req.body.phone

	}
	console.log(user.queryUserName(params));
	//查询手机号是否存在
	connection.query(user.queryUserName(params), function(error, result, fields) {
		if (result.length > 0) {
			res.send({
				data: {
					success: false,
					msg: "手机号已存在",
					data: {}
				}
			})
		} else {
			res.send({

				data: {
					success: true
				}
			})
		}
	})
})




//用户登录
router.post('/api/login', function(req, res, next) {

	//前端给后端的数据
	let params = {
		"userName": req.body.userName,
		"userPwd": req.body.userPwd
	}
	console.log(user.queryUserName(params))
	// 查询用户名或者手机号存在不存在
	// console.log(123);
	connection.query(user.queryUserName(params), function(error, results, fields) {
		if (results.length > 0) {
			console.log(user.queryUserPwd(params))
			connection.query(user.queryUserPwd(params), function(err, result) {
				if (result.length > 0) {
					res.send({
						data: {
							success: true,
							msg: "登录成功",
							data: result[0]
						}
					})
				} else {
					res.send({
						data: {
							success: false,
							msg: "密码不正确"
						}
					})
				}
			})
		} else {
			res.send({
				data: {
					success: false,
					msg: "用户名或手机号不存在"
				}
			})
		}
	})
});





router.get('/api/goods/id', function(req, res, next) {
	let id = req.query.id;
	connection.query("select * from goods_search where id =" + id + "", function(error, results,
		fields) {
		if (error) throw error;
		// console.log('The solution is: ', results);

		res.send({
			code: "0",
			data: results
		})


	});
})

router.get('/api/goods/list', function(req, res, next) {
	res.json({
		code: 0,
		data: [{
				id: 1,
				name: "家居家纺",
				data: [{
						name: "家纺",
						list: [{
								id: 1,
								name: "毛巾/浴巾",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "枕头",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					},
					{
						name: "生活用品",
						list: [{
								id: 1,
								name: "浴室用品",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "洗晒",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					}
				]
			},
			{
				id: 2,
				name: "女装",
				data: [{
						name: "裙装",
						list: [{
								id: 1,
								name: "半身裙",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "连衣裙",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					},
					{
						name: "上衣",
						list: [{
								id: 1,
								name: "T恤",
								imgUrl: "../../static/img/list1.jpg"
							},
							{
								id: 2,
								name: "衬衫",
								imgUrl: "../../static/img/list1.jpg"
							}
						]
					}
				]
			}
		]
	})
});


//搜索商品接口
router.get("/api/goods/search", function(req, res, next) {
	let [goodName, orderName] = Object.keys(req.query);
	let name = req.query[goodName];
	let order = req.query[orderName];
	// console.log(name,order);


	connection.query("select * from goods_search where name like '%" + name + "%' order by " +
		orderName + " " +
		order + "",
		function(error, results, fields) {
			if (error) throw error;
			// console.log('The solution is: ', results);

			res.send({
				code: "0",
				data: results
			})


		});
});

// 首页第一次触底的信息
router.get("/api/index_list/1/data/1", function(req, res, next) {
	res.json({
		code: "0",
		data: [{
			type: "commodityList",
			data: [{
					id: 1,
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 2,
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 3,
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 4,
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			],
		}]

	})
})

//首页(推荐)的数据首次加载
router.get("/api/index_list/data", function(req, res, next) {
	res.send({
		"code": 0,
		"data": {
			topBar: [{
					id: 1,
					name: '推荐'
				},
				{
					id: 2,
					name: '运动户外'
				},
				{
					id: 3,
					name: '服饰内衣'
				},
				{
					id: 4,
					name: '鞋靴箱包'
				},
				{
					id: 5,
					name: '美妆个护'
				},
				{
					id: 6,
					name: '家居数码'
				},
				{
					id: 7,
					name: '食品母婴'
				}
			],
			data: [{
					type: "swiperList",
					data: [{
							imgUrl: '../../static/img/swiper1.jpg'
						},
						{
							imgUrl: '../../static/img/swiper2.jpg'
						},
						{
							imgUrl: '../../static/img/swiper3.jpg'
						}
					]
				},
				{
					type: "recommendList",
					data: [{
							bigUrl: "../../static/img/Children.jpg",
							data: [{
									imgUrl: "../../static/img/Children1.jpg"
								},
								{
									imgUrl: "../../static/img/Children2.jpg"
								},
								{
									imgUrl: "../../static/img/Children3.jpg"
								}
							]
						},
						{
							bigUrl: "../../static/img/Furnishing.jpg",
							data: [{
									imgUrl: "../../static/img/Furnishing1.jpg"
								},
								{
									imgUrl: "../../static/img/Furnishing2.jpg"
								},
								{
									imgUrl: "../../static/img/Furnishing3.jpg"
								}
							]
						}
					]
				},
				{
					type: "commodityList",
					data: [{
							id: 1,
							imgUrl: "../../static/img/commodity1.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 2,
							imgUrl: "../../static/img/commodity2.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 3,
							imgUrl: "../../static/img/commodity3.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 4,
							imgUrl: "../../static/img/commodity4.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						}
					]
				}
			]
		}
	})
});


// 运动户外第二次触底的信息
router.get("/api/index_list/2/data/3", function(req, res, next) {
	res.json({
		code: "0",
		data: [{
			type: "commodityList",
			data: [{
					id: 1,
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 2,
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 3,
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 4,
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			],
		}]

	})
})


//运动户外第一次加载的数据
router.get('/api/index_list/2/data/2', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
			type: "commodityList",
			data: [{
					id: 1,
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 2,
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 3,
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: 4,
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]
	})
});

//运动户外首次加载的数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "bannerList",
				imgUrl: "../../static/img/banner1.jpg"
			},
			{
				type: "iconsList",
				data: [{
						imgUrl: "../../static/img/icons1.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons2.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons3.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons4.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons5.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons6.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons7.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/img/icons8.png",
						name: "运动户外"
					}
				]
			},
			{
				type: "hotList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/hot1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/hot2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/hot3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			},
			{
				type: "shopList",
				data: [{
						bigUrl: "../../static/img/shop.jpg",
						data: [{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 5,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 6,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 7,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 8,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					},
					{
						bigUrl: "../../static/img/shop.jpg",
						data: [{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 5,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 6,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 7,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 8,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					}
				]
			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		]
	})
});
//服饰内衣第一次加载的数据
router.get('/api/index_list/3/data/1', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "bannerList",
				imgUrl: "../../static/img/banner1.jpg"
			},
			{
				type: "iconsList",
				data: [{
						imgUrl: "../../static/img/icons1.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons2.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons3.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons4.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons5.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons6.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons7.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/img/icons8.png",
						name: "服饰内衣"
					}
				]
			},
			{
				type: "hotList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/hot1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/hot2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/hot3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			},
			{
				type: "shopList",
				data: [{
						bigUrl: "../../static/img/shop.jpg",
						data: [{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 5,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 6,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 7,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 8,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					},
					{
						bigUrl: "../../static/img/shop.jpg",
						data: [{
								id: 1,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 5,
								imgUrl: "../../static/img/shop1.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 6,
								imgUrl: "../../static/img/shop2.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 7,
								imgUrl: "../../static/img/shop3.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 8,
								imgUrl: "../../static/img/shop4.jpg",
								name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					}
				]
			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		]
	})
});
module.exports = router;
