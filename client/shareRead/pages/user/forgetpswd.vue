<template>
	<view class="forgetpswd">
		<view class="forgetpswd-form">
			<view class="form-item">
				<view class="iconfont icon-youxiang"></view>
				<input v-model="forgetpswd.email" placeholder="请输入邮箱" />
			</view>
			<view class="form-item">
				<view class="iconfont icon-mima"></view>
				<input v-model="forgetpswd.code" placeholder="请输入验证码" />
				<view class="send-code" @click="handleSendCode()">
					{{verifyCode.isSend? verifyCode.timing+'秒后重发':verifyCode.text}}
				</view>
			</view>
			<button class="register-btn" @click="handleForgetpswd()">
				重置密码
			</button>
		</view>
		<view class="tip" v-if="resetpswd">
			温馨提示: 重置后密码为 <text style="color: #13bfa3;">{{resetpswd}}</text>!
		</view>
	</view>
</template>

<script>
	var timer;
	export default {
		data() {
			return {
				forgetpswd: {
					email: '421821209@qq.com',
					code: '',
					emailId: 'null'
				},
				verifyCode: {
					timing: 120,
					text: '获取验证码',
					isSend: false,
					timer: null
				},
				resetpswd: null
			};
		},
		methods: {
			async handleSendCode() {
				if (this.verifyCode.isSend) return false
				this.verifyCode.isSend = true;
				const {
					message,
					result
				} = await this.$api.user.forgetpswdcode({
					email: this.forgetpswd.email
				});
				this.forgetpswd.emailId = result.id;
				uni.showToast({
					title: message,
					duration: 2000,
					icon: 'none'
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
			async handleForgetpswd() {
				const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if (!reg.test(this.forgetpswd.email)) {
					uni.showToast({
						title: '请输入正确的邮箱地址',
						duration: 2000,
						icon: 'none'
					});
				} else if (!this.forgetpswd.code) {
					uni.showToast({
						title: '请输入验证码',
						duration: 2000,
						icon: 'none'
					});
				} else {
					const {
						message,
						result
					} = await this.$api.user.forgetpswd(this.forgetpswd);
					uni.showToast({
						title: message,
						duration: 2000,
						icon: 'none'
					});
					this.resetpswd = result.default_pswd;
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.forgetpswd {
		min-height: 100%;
		margin-top: 200rpx;

		.forgetpswd-form {
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

		.tip {
			margin-top: 100rpx;
			color: #CCCCCC;
			text-align: center;
			font-size: 28rpx;
		}
	}
</style>
