<template>
	<view class="login">
		<view class="content">
			<view class="logo" style="height:200rpx;">
				<!-- <image src="/static/login/logo.png" mode="widthFix"></image> -->
			</view>
			<view class="login-form">
				<view class="item phone">
					<image class="icon left" src="/static/login/icon_phone.png" mode="widthFix"></image>
					<input class="uni-input" v-model="loginForm.email" focus placeholder="邮箱" placeholder-class="input-placeholder" />
					<image class="icon right" src="/static/login/icon_phone_right.png" mode="widthFix"></image>
				</view>
				<view class="item password">
					<image class="icon left" src="/static/login/icon_pwd.png" mode="widthFix"></image>
					<input class="uni-input" password="true" v-model="loginForm.password" placeholder="密码" placeholder-class="input-placeholder" />
					<image class="icon right" src="/static/login/icon_pwd_right.png" mode="widthFix"></image>
				</view>
				<button class="btn" @click="handleLogin()">
					<text>登录</text>
				</button>
				<view class="forgot-pwd"><text>忘记密码？</text></view>
			</view>

			<view class="login-third">
				<view class="text">
					<image src="/static/login/icon_line.png" mode="widthFix"></image>
				</view>
				<view class="flex">
					<image src="/static/login/icon_weibo.png" mode="widthFix"></image>
					<image src="/static/login/icon_wechat.png" mode="widthFix"></image>
					<image src="/static/login/icon_qq.png" mode="widthFix"></image>
				</view>
			</view>
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
						icon: 'none'
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
	.login {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color:$theme-color ;

		.content {
			position: absolute;
			top: 0;
			width: 100%;
		}

		.logo {
			text-align: center;
			margin: 96rpx auto 73rpx auto;

			image {
				width: 50%;
			}
		}

		.login-form {
			width: 630rpx;
			margin: auto;

			.item {
				width: 630rpx;
				height: 84rpx;
				border-radius: 6rpx;
				margin-bottom: 33rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				background-color: #4781e2;

				.icon {
					width: 36rpx;
					height: 40rpx;
				}

				.input-placeholder {
					color: #fff;
					line-height: 84rpx;
					height: 84rpx;
					margin: auto;
				}
			}

			input {
				color: #fff;
				height: 84rpx;
				line-height: 84rpx;
			}

			.btn {
				margin: 43rpx auto 22rpx auto;
				text-align: center;
				height: 84rpx;
				line-height: 84rpx;
				border-radius: 6rpx;
				background-color: #6ea0f8;
			}


			.forgot-pwd {
				text-align: right;
			}

		}

		.login-third {
			.text {
				margin: 137rpx auto 106rpx auto;
				text-align: center;
			}

			.flex {
				text-align: center;
				display: flex;
				justify-content: space-around;
			}

			.flex image {
				width: 88rpx;
				height: 88rpx;
			}

			.text {
				height: 30rpx;
				font-family: PingFang-SC-Regular;
				font-size: 32rpx;
				font-weight: bold;
				font-stretch: normal;
				line-height: 40rpx;
				letter-spacing: 3rpx;
				color: #ffffff;
			}
		}
	}
</style>
