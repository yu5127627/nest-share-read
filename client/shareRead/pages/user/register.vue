<template>
	<view class="register">
		<view class="register-form">
			<view class="form-item">
				<view class="iconfont icon-youxiang"></view>
				<input v-model="register.email" placeholder="请输入邮箱" />
			</view>
			<view class="form-item">
				<view class="iconfont icon-mima"></view>
				<input password="true" v-model="register.code" placeholder="请输入验证码" />
				<view class="send-code" @click="handleSendCode()">
					{{verifyCode.isSend? verifyCode.timing+'秒后重发':verifyCode.text}}
				</view>
			</view>
			<view class="form-item">
				<view class="iconfont icon-mima"></view>
				<input password="true" v-model="register.firstPswd" placeholder="请输入密码" />
			</view>
			<view class="form-item">
				<view class="iconfont icon-mima"></view>
				<input password="true" v-model="register.password" placeholder="请再次输入密码" />
			</view>
			<button class="register-btn" @click="handleRegister()">
				注册
			</button>
		</view>
		<view class="login">
			已有账号,前去<navigator style="color: #0081FF;" url="login">登录</navigator>
		</view>
	</view>
</template>

<script>
	var timer;
	export default {
		data() {
			return {
				register: {
					email: 'sxczykn@163.com',
					firstPswd: '',
					password: '',
					code: '',
					emailId: ''
				},
				verifyCode: {
					timing: 120,
					text: '获取验证码',
					isSend: false,
					timer: null
				}
			};
		},
		methods: {
			async handleSendCode() {
				if (this.verifyCode.isSend) return false
				const {
					message,
					result
				} = await this.$api.user.registercode({
					email: this.register.email
				});
				this.verifyCode.isSend = true;
				this.register.emailId = result.id;
				uni.showToast({
					title: message,
					duration: 2000,
					icon: 'none',
					position: 'bottom'
				});
				// 发送成功  开始倒计时
				this.verifyCode.timer = setInterval(() => {
					if (this.verifyCode.timing === 0) {
						clearInterval(this.verifyCode.timer);
						this.verifyCode.text = `重新发送`;
						this.verifyCode.isSend = false;
						this.verifyCode.timing = 120;
						return
					}
					this.verifyCode.timing--;
				}, 1000)
			},
			async handleRegister() {
				const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if (!reg.test(this.register.email)) {
					uni.showToast({
						title: '请输入正确的邮箱地址',
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
				} else if (!this.register.code) {
					uni.showToast({
						title: '请输入验证码',
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
				} else if (this.register.firstPswd !== this.register.password) {
					uni.showToast({
						title: '两次密码输入不一致',
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
				} else if (this.register.firstPswd.length < 6 || this.register.firstPswd.length > 16) {
					uni.showToast({
						title: '密码长度至少为6位，至多为16位',
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
				} else {
					const {
						firstPswd,
						...registerDto
					} = this.register;
					const {
						message
					} = await this.$api.user.register(registerDto);
					uni.showToast({
						title: message,
						duration: 2000,
						icon: 'none',
						mask: true,
						position: 'bottom'
					});
					setTimeout(() => {
						uni.redirectTo({
							url: './login'
						})
					}, 2000)
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.register {
		min-height: 100%;
		margin-top: 200rpx;

		.register-form {
			padding: 60rpx;

			.form-item {
				border-bottom: 2rpx solid #ccc;
				display: flex;
				height: 80rpx;
				margin-bottom: 30rpx;

				.iconfont {
					width: 80rpx;
					line-height: 80rpx;
					font-size: 40rpx;
					text-align: center;
				}

				input {
					height: 80rpx;
					line-height: 80rpx;
					flex: 1;
					margin-left: 20rpx;
				}

				.send-code {
					width: 160rpx;
					font-size: 20rpx;
					background-color: #FFFFFF;
					margin: 14rpx;
					color: rgb(253, 39, 93);
					text-align: center;
					line-height: 52rpx;
					border: 1rpx solid rgb(253, 39, 93);
					border-radius: 8rpx;
					box-sizing: border-box;
				}
			}

			.register-btn {
				border-radius: 50rpx;
				height: 80rpx;
				line-height: 80rpx;
				margin-top: 60rpx;
				background-color: $theme-color;
				color: #FFFFFF;
				box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
			}
		}

		.login {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 200rpx;
			color: #CCCCCC;
			font-size: 28rpx;
		}
	}
</style>
