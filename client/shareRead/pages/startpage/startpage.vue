<template>
	<view class="load">
		<view class="banner" v-if="first=='1'">
			<image :src="adimg.url" mode="" class="banner-img"></image>
			<view class="tip" @click="handleGoIndex()">
				{{timer}}&nbsp;跳过
			</view>
		</view>
		<swiper class="swiper lead-imgs" v-else>
			<swiper-item>
				<view class="swiper-item">
					<image src="/upload/images/adimg/1583240180724.jpeg" mode="" class="banner-img"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="/upload/images/adimg/1583240180724.jpeg" mode="" class="banner-img"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="/upload/images/adimg/1583240180724.jpeg" mode="" class="banner-img"></image>
					<view class="go-index" @click="handleGoIndex()"></view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: 5,
				first: '0',
				countdown: null,
				adimg: null
			};
		},
		created() {
			this.getStartAdimg()
			// #ifdef APP-PLUS
			// 设置应用全屏显示
			plus.navigator.setFullscreen(true);
			// #endif
			// uni.getStorage({
			// 	key: 'first',
			// 	success: res => {
			// 		// console.log(res);
			// 		this.first = res.data;
			// 	},
			// 	fail: err => {
			// 		// console.log(err);
			// 	}
			// });
			// if (this.first == '1') {
			// 	this.countdown = setInterval(() => {
			// 		this.timer--;
			// 		if (this.timer === 0) {
			// 			clearInterval(this.countdown);
			// 			uni.switchTab({
			// 				url: '../tabbar/bookshelf'
			// 			})
			// 		}
			// 	}, 1000)
			// } else {

			// }

		},
		methods: {
			handleGoIndex() {
				if (this.first) {
					uni.setStorage({
						key: 'first',
						data: '1',
						success: res => {
							// console.log(res);
						}
					});
				}
				clearInterval(this.countdown);
				uni.switchTab({
					url: '../tabbar/bookshelf'
				})
			},
			async getStartAdimg() {
				const {
					result
				} = await this.$api.bookshelf.startAdimg();
				this.adimg = result;
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.load {
		width: 100%;
		height: 100%;

		.banner,
		.lead-imgs {
			width: 100%;
			height: 100%;

			.banner-img {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
			}

			.tip {
				background-color: rgba(0, 0, 0, .5);
				position: absolute;
				right: 20upx;
				top: 30upx;
				min-width: 100upx;
				height: 60upx;
				color: #fff;
				z-index: 2;
				border-radius: 26upx;
				padding: 0 20upx;
				line-height: 60upx;
				font-size: 32upx;
				text-align: center;
			}

			.go-index {
				position: absolute;
				width: 260upx;
				height: 80upx;
				left: 50%;
				bottom: 60upx;
				margin-left: -130upx;
				background-color: rgba(0, 0, 0, .4);
				z-index: 2;
			}
		}
	}
</style>
