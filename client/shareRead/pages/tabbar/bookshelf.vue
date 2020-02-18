<template>
	<view class="book-shelf">
		<view class="reading">
			<view class="item-row">
				<view class="item-book">
					<view class="book-cover">
						<image class="cover-img" src="//bookcover.yuewen.com/qdbimg/349573/1735921/180" mode="aspectFit"></image>
					</view>
					<view class="book-title">
						遮天
					</view>
				</view>
				<view class="item-book">
					<view class="book-cover">
						<image class="cover-img" src="//bookcover.yuewen.com/qdbimg/349573/1735921/180" mode="aspectFit"></image>
					</view>
					<view class="book-title">
						遮天
					</view>
				</view>
				<view class="item-book">
					<view class="book-cover">
						<image class="cover-img" src="//bookcover.yuewen.com/qdbimg/349573/1735921/180" mode="aspectFit"></image>
					</view>
					<view class="book-title">
						遮天
					</view>
				</view>
				<view class="item-book">
					<view class="book-cover">
						<image class="cover-img" src="//bookcover.yuewen.com/qdbimg/349573/1735921/180" mode="aspectFit"></image>
					</view>
					<view class="book-title">
						遮天
					</view>
				</view>
				<view class="item-book">
					<view class="book-cover">
						<image class="cover-img" src="//bookcover.yuewen.com/qdbimg/349573/1735921/180" mode="aspectFit"></image>
					</view>
					<view class="book-title">
						遮天
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.book-shelf {
		.reading {
			.item-row {
				background-color: #FFFFFF;
				display: flex;
				flex-wrap: wrap;

				.item-book {
					width: 250rpx;
					display: inline-block;
					border-bottom: 4rpx solid #edf1f2;
					padding-top: 10rpx;
					.book-cover {
						// padding: 20rpx;
						width: 250rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						uni-image {
							width: 200rpx;
							height: 300rpx;
						}
					}
					
					.book-title{
						text-align: center;
						line-height: 1.5;
						font-size: 30rpx;
						padding-bottom: 14rpx;
					}
				}
			}
		}
	}
</style>
