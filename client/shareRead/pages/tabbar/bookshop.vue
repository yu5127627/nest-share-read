<template>
	<view class="book-shop">
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		<swiper autoplay="true" indicator-dots="true" indicator-color="#ffffff" indicator-active-color="rgba(255,255,255,.6)"
		 circular="true" style="height: 346rpx;z-index: 999;">
			<swiper-item v-for="(item,index) in info" :key="index">
				<image :src="item.content" style="width: 100%;height: 346rpx;"></image>
			</swiper-item>
		</swiper>
		<view class="category">
			<view v-for="item in categoryData" :key="item.id">
				<view class="title">
					{{item.title}}
				</view>
				<view class="item-row">
					<view class="item-book" v-for="bookitem in item.book" :key="bookitem.id" :data-id="bookitem.id" @click="handleBook(bookitem.id)">
						<view class="book-cover">
							<image class="cover-img" :src="apiUrl+bookitem.cover" mode="aspectFit"></image>
						</view>
						<view class="book-title">
							{{bookitem.zh_name}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
	export default {
		data() {
			return {
				apiUrl:getApp().globalData.api,
				selectClass: '#13bfa3',
				TabCur: 0,
				tabList: null,
				info: [{
					content: 'https://aecpm.alicdn.com/tfscom/TB18SIYvAL0gK0jSZFAXXcA9pXa.jpg_q50.jpg'
				}, {
					content: 'https://aecpm.alicdn.com/tfscom/TB18SIYvAL0gK0jSZFAXXcA9pXa.jpg_q50.jpg'
				}],
				current: 0,
				categoryData: null
			}
		},
		components: {
			WucTab,
			uniSwiperDot
		},
		methods: {
			handleBook(id) {
				uni.navigateTo({
					url: `../book/bookinfo?id=${id}`
				})
			},
			async tabChange(index, id) {
				this.TabCur = index;
				const {
					result
				} = await this.$api.bookshop.categoryBooks(id)
				this.categoryData = result
			},
			change(e) {
				this.current = e.detail.current;
			},
			async getCategory() {
				const {
					result
				} = await this.$api.bookshop.category()
				const {
					result: categoryBooks
				} = await this.$api.bookshop.categoryBooks(result[0].id)
				this.tabList = result;
				this.categoryData = categoryBooks
			}
		},
		onLoad() {
			this.getCategory();
		}
	}
</script>

<style lang="scss">
	.book-shop {
		.selectClass {
			color: $theme-color;
		}

		.category {
			margin-top: 30rpx;

			.title {
				color: #000000;
				background-color: #FFFFFF;
				padding-left: 20rpx;
				font-size: $uni-font-size-lg;
				line-height: 2;
				letter-spacing: 3rpx;
				font-weight: bolder;
			}

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
							width: 170rpx;
							height: 250rpx;
						}
					}

					.book-title {
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
