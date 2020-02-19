<template>
	<view class="book-info">
		<view class="book-box">
			<view class="book-cover">
				<image :src="apiUrl+book.cover" mode=""></image>
			</view>
			<view class="book-des">
				<view class="title">
					{{book.zh_name}}
				</view>
			</view>
		</view>
		<view class="book-statistics">
			<view class="item">
				<view class="count">
					3892人
				</view>
				<view class="name">
					点赞
				</view>
			</view>
			<view class="item">
				<view class="count">
					3892人
				</view>
				<view class="name">
					点赞
				</view>
			</view>
			<view class="item">
				<view class="count">
					3892人
				</view>
				<view class="name">
					点赞
				</view>
			</view>
		</view>
		<view class="other-info">
			<view class="other-item">
				<view class="item-title">
					图书简介
				</view>
				<view class="item-content">
					<rich-text :nodes="book.description"></rich-text>
				</view>
			</view>
			<view class="other-item">
				<view class="item-title">
					图书特点
				</view>
				<view class="item-content">
					<rich-text :nodes="book.feature"></rich-text>
				</view>
			</view>
			<view class="other-item">
				<view class="item-title">
					作者相关
				</view>
				<view class="item-content">
					<rich-text :nodes="book.about_author"></rich-text>
				</view>
			</view>
		</view>
		<view class="progress-box" v-if="progress.isShow">
			<progress :percent="progress.percent" show-info stroke-width="3" active />
		</view>
		<view class="comment">
			<view class="comment-title">
				<view class="title">
					评论区
				</view>
				<view class="desc">
					<view class="count">
						3787条评论
					</view>
					<view class="operating">
						写评论
					</view>
				</view>
			</view>
			<view class="comment-list">
				评论列表
			</view>
		</view>

		<view class="zhanwei" style="height: 120rpx;background-color: #CCCCCC;"></view>
		<view class="fixed-module">
			<view class="add-book">
				<view class="icon"></view>
				<view class="text">
					加入书架
				</view>
			</view>
			<view class="down-book">
				<view class="btn-book" @click="handleDownload(book.book)">
					下载图书
				</view>
			</view>
			<view class="add-book">
				<view class="icon"></view>
				<view class="text">
					加入书架
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				apiUrl: getApp().globalData.api,
				book: null,
				progress: {
					percent: 0,
					isShow: false
				},
				savedFilePath: null,
				currentBook: null
			};
		},
		methods: {
			handleShowModal() {
				uni.showModal({
					title: '提示',
					content: '下载已完成，是否开始阅读?',
					success: res => {
						if (res.confirm) {
							uni.openDocument({
								filePath: this.savedFilePath,
								success: function(res) {
									console.log('打开文档成功');
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			handleSetStorage() {
				let newBooks = [];
				newBooks.push(this.currentBook)
				console.log(JSON.stringify(newBooks))
				uni.setStorage({
					key: 'books',
					data: JSON.stringify(newBooks),
					success: (res) => {
						console.log(JSON.stringify(res))
						this.handleShowModal()
					},
					fail: (err) => {
						console.log(err)
					}
				});
			},
			handleDownload(url) {
				this.progress.isShow = true;
				const downloadTask = uni.downloadFile({
					url: this.apiUrl + url,
					success: res => {
						if (res.statusCode === 200) {
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: fileres => {
									this.savedFilePath = fileres.savedFilePath;
									const {
										cover,
										id,
										zh_name
									} = this.book;
									this.currentBook = {
										path: this.savedFilePath,
										id,
										cover,
										zh_name
									}
									this.handleSetStorage()
								}
							});
						}
					}
				});

				downloadTask.onProgressUpdate((res) => {
					this.progress.percent = res.progress
					// console.log('下载进度' + res.progress);
					// console.log('已经下载的数据长度' + res.totalBytesWritten);
					// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);

					// // 测试条件，取消下载任务。
					// if (res.progress == 100) {
					// 	this.handleSetStorage()
					// }
				});
			},
			async getBook(id) {
				const {
					result
				} = await this.$api.bookshop.book(id);
				this.book = result
			}
		},
		onLoad(op) {
			this.getBook(op.id)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.book-info {
		.book-box {
			height: 400rpx;
			display: flex;

			.book-cover {
				width: 375rpx;

				// display: flex;
				// align-items: center;
				// justify-content: center;
				uni-image {
					width: 240rpx;
					height: 300rpx;
					border-radius: 10rpx;
					margin-left: 67rpx;
					margin-top: 50rpx;
				}
			}

			.book-des {
				width: 375rpx;
				margin-top: 50rpx;

				.title {
					font-size: 34rpx;
					letter-spacing: 1rpx;
					color: #000000;
				}
			}
		}

		.book-statistics {
			display: flex;
			justify-content: space-between;

			.item {
				flex: 1;
				font-size: 30rpx;

				.count {
					text-align: center;
					line-height: 1.5;
				}

				.name {
					text-align: center;
					line-height: 1.1;
					font-size: 28rpx;
					font-weight: 600;
					color: #000000;
				}
			}
		}

		.other-info {
			margin-top: 100rpx;

			.other-item {
				margin: 20rpx 0;

				.item-title {
					padding-left: 30rpx;
					color: #000000;
					font-size: 32rpx;
					line-height: 2;
					letter-spacing: 3rpx;
					font-weight: 600;
				}

				.item-content {
					color: $uni-color-paragraph;
					padding: 0 30rpx;
					font-size: $uni-font-size-base;
					line-height: 1.5;
				}
			}
		}

		.progress-box {
			margin: 20rpx 20rpx;
		}

		.comment {
			margin-top: 100rpx;

			.comment-title {
				padding: 0 40rpx;

				.title {
					font-size: 32rpx;
					line-height: 2;
					color: $uni-color-title;
				}

				.desc {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28rpx;
					letter-spacing: 2rpx;

					.count {
						color: $uni-text-color-grey;
					}

					.operating {
						color: $theme-color;
					}
				}
			}
		}

		.fixed-module {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 100rpx;
			width: 100%;
			background-color: #FFFFFF;
			border-top: 2rpx solid #CCCCCC;
		}
	}
</style>
