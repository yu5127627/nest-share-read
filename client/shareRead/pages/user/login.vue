<template>
	<view class="login">
		<view class="login-form">
			<view class="form-item">
				<view class="iconfont icon-youxiang"></view>
				<input  v-model="loginForm.email" placeholder="请输入邮箱" />
			</view>
			<view class="form-item">
				<view class="iconfont icon-mima"></view>
				<input  password="true" v-model="loginForm.password" placeholder="请输入密码"/>
			</view>
			<button class="login-btn" @click="handleLogin()">
				登录
			</button>
		</view>
		<navigator class="forget-pswd" url="forgetpswd">
		 忘记密码
		</navigator>
		<view class="other-login">
			<view class="title">
				其它方式登录
			</view>
			<view class="login-box">
				<view class="iconfont icon-weixin-denglu weixin"></view>
				<view class="iconfont icon-weibo-denglu weibo"></view>
				<view class="iconfont icon-QQ-denglu qq"></view>
			</view>
		</view>
		<view class="register">
		 还没有账号,前去<navigator style="color: #0081FF;" url="register">注册</navigator>
		</view>
	</view>
</template>

<script>
	import {
		setStorage
	} from '../../common/utils.js'
	export default {
		data() {
			return {
				loginForm: {
					email: '421821209@qq.com',
					password: '123456'
				}
			}
		},
		methods: {
			async handleLogin() {
				const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if (!reg.test(this.loginForm.email)) {
					uni.showToast({
						title: '请输入正确的邮箱地址',
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
				} else {
					const {
						result,
						message
					} = await this.$api.user.login(this.loginForm)
					await setStorage('token', result.token)
					const userinfo = await this.$api.user.getUserinfo()
					uni.showToast({
						title: message,
						duration: 2000,
						position: 'bottom',
						icon: 'none',
						success: async () => {
							await setStorage('user', JSON.stringify(userinfo.result))
							getApp().globalData.token = result.token;
							// 刷新个人中心的信息
							// #ifdef APP-PLUS
							// 获取页面栈
							const pages = getCurrentPages();
							var page = pages[pages.length - 2];
							// 调用上一个页面栈的方法
							page.$vm.getUserinfo()
							// #endif
							setTimeout(() => {
								uni.switchTab({
									url: '../tabbar/mine'
								})
							}, 2000)
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		 // background-image: linear-gradient(rgb(94,116,198), rgb(136,200,216));
		 background-color: #FFFFFF;
	}
	.login{
		min-height: 100%;
		margin-top: 200rpx;
		.login-form{
			padding: 60rpx;
			.form-item{
				border-bottom: 2rpx solid #ccc;
				display: flex;
				height: 80rpx;
				margin-bottom: 30rpx;
				.iconfont{
					width: 80rpx;
					line-height: 80rpx;
					font-size: 40rpx;
					text-align: center;
				}
				input{
					height: 80rpx;
					line-height:80rpx;
					flex: 1;
					margin-left: 20rpx;
				}
			}
			.login-btn{
				border-radius: 50rpx;
				height: 80rpx;
				line-height: 80rpx;
				margin-top: 60rpx;
				background-color: $theme-color;
				color: #FFFFFF;
				box-shadow: 0px 4px 4px rgba(0,0,0,0.2);
			}
		}
		.forget-pswd{
			font-size: 28rpx;
			text-align: right;
			padding: 0 50rpx;
			letter-spacing: 6rpx;
			color: #CCCCCC;
			text-decoration: underline ;
		}
		.other-login{
			margin-top: 100rpx;
			.title{
				text-align: center;
				font-size: 30rpx;
				height: 60rpx;
				line-height: 60rpx;
			}
			.login-box{
				display: flex;
				margin: 0 20%;
				.iconfont{
					flex: 1;
					height: 130rpx;
					line-height: 130rpx;
					text-align: center;
					font-size: 70rpx;
				}
				.weixin{
					color: rgb(9,187,7);
				}
				.weibo{
					color: rgb(216,30,6);
				}
				.qq{
					color: rgb(26,149,243);
				}
			}
		}
		.register{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 200rpx;
			color: #CCCCCC;
			font-size: 28rpx;
		}
	}
	
	
</style>
