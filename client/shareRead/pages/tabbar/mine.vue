<template>
	<view class="box">
		<view class="zhanwei"></view>
		<view class="header">
			<view class="userinfo">
				<view class="face">
					<image v-if="userinfo!=null" :src="userinfo.avatar"></image>
					<image v-else src="../../static/avatar.jpg"></image>
				</view>
				<!-- 已登录 -->
				<view class="info" v-if="userinfo!=null">
					<view class="username">{{userinfo.username}}</view>
					<view class="integral">{{userinfo.email}}</view>
				</view>
				<!-- 未登录 -->
				<view class="info" v-else @click="goLogin()">
					<view class="username"></view>
					<view class="integral">登录/注册</view>
				</view>
				<view class="setting" @click="goSetting()">
					<view class="iconfont iconsettings_light"></view>
				</view>
			</view>
		</view>
		<view class="content">
			<navigator url="" hover-class="none" class="list">
				<view class="left"><text class="iconfont iconyanzhengmatianchong" style="color:#ffd200;"></text></view>
				<view class="right">
					<view>积分明细</view>
					<text class="iconfont iconyou"></text>
				</view>
			</navigator>
		</view>

		<view class="content contBot">
			<navigator url="../mine/bookfav" hover-class="none" class="list">
				<view class="left"><text class="iconfont iconyanzhengmatianchong" style="color:#ffa700;"></text></view>
				<view class="right">
					<view>书籍收藏</view>
					<text class="iconfont iconyou"></text>
				</view>
			</navigator>
		</view>

		<view class="content contBot">
			<navigator url="../mine/editpswd" hover-class="none" class="list">
				<view class="left"><text class="iconfont iconyanzhengmatianchong" style="color: #6b89c2;"></text></view>
				<view class="right">
					<view>修改密码</view>
					<text class="iconfont iconyou"></text>
				</view>
			</navigator>
		</view>

		<view class="btn" @click="logout" v-if="userinfo!=null">退出登录</view>
	</view>
</template>

<script>
	import {
		getStorage,
		removeStorage
	} from '../../common/utils.js'
	export default {
		data() {
			return {
				userinfo: null
			};
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: '../user/login'
				});
			},
			async logout() {
				await removeStorage('token');
				await removeStorage('user');
				getApp().globalData.token = null;
				uni.showToast({
					title: '退出成功！',
					icon: 'none',
					duration: 2000,
					success: () => {
						setTimeout(()=>{
							uni.navigateTo({
								url:'../user/login'
							})
						},2000)
					}
				})
			},
			getUserinfo(){
				const userinfo = uni.getStorageSync('user');
				if(userinfo){
					this.userinfo = JSON.parse(userinfo);
				}
			}
		},
		onLoad() {
			this.getUserinfo()
		}
	};
</script>

<style lang="scss">
	.box {
		width: 100%;

		.zhanwei {
			width: 100%;
			height: var(--status-bar-height);
			background: $theme-color;
		}

		.header {
			background: $theme-color;
			width: 92%;
			height: 36vw;
			padding: 0 4%;
			display: flex;
			align-items: center;

			.userinfo {
				width: 100%;
				display: flex;

				.face {
					flex-shrink: 0;
					width: 120rpx;
					height: 120rpx;
					border: 2rpx solid #2d88d5;
					border-radius: 50%;

					image {
						width: 100%;
						height: 100%;
						border-radius: 100%
					}
				}

				.info {
					display: flex;
					flex-flow: wrap;
					padding-left: 30rpx;
					width: calc(100% - 240rpx);

					.username {
						width: 100%;
						color: #fff;
						font-size: 34rpx;
						font-weight: normal;
					}

					.integral {
						display: flex;
						align-items: center;
						padding: 0 20rpx;
						height: 40rpx;
						color: #fff;
						background-color: #2d88d5;
						border-radius: 20rpx;
						font-size: 24rpx
					}
				}

				.setting {
					color: #fff;
					font-size: 28rpx;
					margin-right: 10rpx;
					margin-left: 10rpx;

					.iconfont {
						font-size: 40rpx;
					}
				}
			}
		}

		.content {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			background: #fff;

			.list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 105rpx;

				.left {
					width: 68rpx;
					height: 100%;
					display: flex;
					align-items: center;

					.iconfont {
						font-size: 56rpx;
						width: 40rpx;
					}
				}

				.right {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					border-bottom: 1rpx solid #eaeaea;

					view:nth-child(1) {
						font-size: 30rpx;
						color: #424242;
					}

					.iconfont {
						font-size: 30rpx;
						color: #999;
					}
				}
			}

			.list:last-child {
				.right {
					border-bottom: none;
				}
			}
		}

		.contBot {
			margin-top: 20rpx;
		}

		.btn {
			width: 100%;
			height: 105rpx;
			background: #fff;
			margin-top: 20rpx;
			text-align: center;
			line-height: 105rpx;
			color: #000;
			font-size: 30rpx;
		}
	}
</style>
