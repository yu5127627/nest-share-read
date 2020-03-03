<template>
	<view class="editpswd">
		<view class="editpswd-form">
			<view class="form-item">
				<view class="iconfont icon-youxiang"></view>
				<input password="true" v-model="editpswd.oldPswd" placeholder="请输入当前密码" />
			</view>
			<view class="form-item">
				<view class="iconfont icon-youxiang"></view>
				<input password="true" v-model="editpswd.firstPswd" placeholder="请输入新密码" />
			</view>
			<view class="form-item">
				<view class="iconfont icon-youxiang"></view>
				<input password="true" v-model="editpswd.secondPswd" placeholder="请再次输入新密码" />
			</view>
			<button class="editpswd-btn" @click="handleEditPswd()">
				立即修改
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				editpswd: {
					oldPswd: '',
					firstPswd: '',
					secondPswd: ''
				}
			};
		},
		methods: {
			async handleEditPswd() {
				if (this.editpswd.oldPswd === this.editpswd.firstPswd) {
					uni.showToast({
						title: '新密码不能与当前密码相同',
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
				} else if (this.editpswd.firstPswd !== this.editpswd.secondPswd) {
					uni.showToast({
						title: '两次新密码输入不一致',
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
				}else if (this.editpswd.firstPswd.length<6||this.editpswd.firstPswd.length>16) {
					uni.showToast({
						title: '密码长度至少为6位，至多为16位',
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
				} else {
					const {
						message,
						result
					} = await this.$api.user.editpswd(this.editpswd);
					uni.showToast({
						title: message,
						duration: 2000,
						icon: 'none',
						position: 'bottom'
					});
					uni.removeStorageSync('token');
					uni.removeStorageSync('user');
					getApp().globalData.token = null;
					setTimeout(() => {
						uni.redirectTo({
							url: '../user/login'
						});
					}, 2000)
				}
			}
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.editpswd {
		min-height: 100%;
		margin-top: 200rpx;

		.editpswd-form {
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
			}

			.editpswd-btn {
				border-radius: 50rpx;
				height: 80rpx;
				line-height: 80rpx;
				margin-top: 60rpx;
				background-color: $theme-color;
				color: #FFFFFF;
				box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
			}
		}
	}
</style>
