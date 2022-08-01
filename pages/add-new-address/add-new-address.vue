<template>
	<view class="add-address">
		<view class="address-item">
			<view class="name">收件人</view>
			<input type="text" value="" placeholder="请输入姓名" v-model="addressObj.name" />
		</view>
		<view class="address-item">
			<view class="phone">手机号</view>
			<input type="text" value="" placeholder="请输入手机号" v-model="addressObj.phone" />
		</view>
		<view class="address-item">
			<view class="name">地址所在地</view>
			<view class="" @tap="showCityPicker">{{ selectedCity }} ></view>
		</view>
		<view class="address-item">
			<view class="name">详细地址</view>
			<textarea value="" placeholder="请输入5-60个字符" auto-height v-model="addressObj.address" />
		</view>
		<view class="address-item">
			<view class="phone">设置为默认地址</view>
			<label class="radio" @tap="RadioChange">
				<radio value="" color="#49bdfb" :checked="addressObj.isDefault == '1'" />
				<text></text>
			</label>
		</view>
		<mpvueCityPicker
			ref="mpvueCityPicker"
			:pickerValueDefault="pickerValueDefault"
			@onChange="onChange"
			@onCancel="onCancel"
			@onConfirm="onConfirm"
			themeColor="#49bdfb"
		></mpvueCityPicker>
	</view>
</template>

<script>
import $http from '@/common/api/request.js';
import { mapActions } from 'vuex';
import mpvueCityPicker from '../../components/uni/mpvue-citypicker/mpvueCityPicker.vue';
export default {
	components: {
		mpvueCityPicker
	},
	onLoad(e) {
		if (e.data) {
			// console.log(res);
			uni.setNavigationBarTitle({
				title: '修改地址'
			});
			let res = JSON.parse(e.data);
			this.addressObj = res.item;
			this.index = res.index;
			this.isEdit = true;
		}
	},
	onNavigationBarButtonTap() {
		if (this.isEdit) {
			//修改数据
			
			$http.request({
					header: {
						token: true
					},
					url: '/updateAddress',
					method: 'post',
					data:{
						...this.addressObj
					}
				})
				.then(res => {
					console.log(res);
					uni.showToast({
						title: res.success,
						icon: 'none'
					});
				})
				.catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'error'
					});
					return;
				});
			
			
			
			
			
			
			
			//修改vuex里的数据
			this.EDITADDRESS({
				index: this.index,
				item: this.addressObj
			});
		} else {
			//新增

			$http
				.request({
					header: {
						token: true
					},
					url: '/addAddress',
					method: 'post',
					data:{
						...this.addressObj
					}
				})
				.then(res => {
					console.log(res);
					
				})
				.catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'error'
					});
					return;
				});

			this.ADDADDRESS(this.addressObj);
		}

		uni.showToast({
			title: '保存成功'
		});
		uni.navigateBack();
	},

	data() {
		return {
			pickerValueDefault: [0, 0, 1],
			addressObj: {
				name: '',
				province: '',
				city: '请选择',
				district: '',
				phone: '',
				address: '',
				isDefault: false
			},
			index: -1,
			isEdit: false
		};
	},
	methods: {
		showCityPicker() {
			this.$refs.mpvueCityPicker.show();
		},
		onChange(e) {
			console.log(e);
		},
		onCancel(e) {
			console.log(e);
		},
		onConfirm(e) {
			// console.log(e);
			let arr = e.label.split('-');
			this.addressObj.province = arr[0];
			this.addressObj.city = arr[1];
			this.addressObj.district = arr[2];
		},
		...mapActions(['ADDADDRESS', 'EDITADDRESS']),
		RadioChange() {
			console.log(this.addressObj.isDefault);
			this.addressObj.isDefault = this.addressObj.isDefault == '1'?'0':'1';
		}
	},
	computed: {
		selectedCity() {
			if (this.addressObj.province) {
				return `${this.addressObj.province} ${this.addressObj.city} ${this.addressObj.district}`;
			} else {
				return '请点击选择';
			}
		}
	}
};
</script>

<style scoped>
.add-address {
	padding: 20rpx;
}

.address-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx 0;
	width: 100%;
	border-bottom: 2rpx solid #f3f2f3;
}

.address-item input {
	flex: 1;
	text-align: left;
	padding-left: 20rpx;
}

.add-address textarea {
	border: 2rpx solid #f3f2f3;
}
</style>
