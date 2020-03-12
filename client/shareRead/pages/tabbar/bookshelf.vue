<template>
	<view class="book-shelf">
		<view class="reading">
			<view class="item-row">
				<view class="item-book" v-for="item in newBooks" :key="item.path" @click="showNkAction(item.path)">
					<view class="book-cover">
						<image class="cover-img" :src="apiUrl+item.cover" mode="aspectFit"></image>
					</view>
					<view class="book-title">
						{{item.zh_name}}
					</view>
				</view>
			</view>
		</view>
		<nkActionSheet :show="nkAction.show" :actions="nkAction.actions" @cancel="handleClose" @close="handleClose" @select="handleSelect"></nkActionSheet>
		<chunLei-modal v-model="updateMask" :mData="update" @onConfirm="handleConfirm" @cancel="hadnleCancel" navMask></chunLei-modal>
	</view>
</template>

<script>
	import TabMask from '@/components/chunLei-modal/tabMask';
	import nkActionSheet from '@/components/nk-action-sheet/nk-action-sheet.vue'; // 底部菜单
	export default {
		data() {
			return {
				update: {
					title: '升级提示',
					content: '我是app升级内容',
					cancelText: '暂不',
					confirmColor: '#3CC51F',
					isUpdate: false,
					updateUrl: null,
					tabMask: null
				},
				updateMask: false,
				apiUrl: getApp().globalData.api,
				saveBooks: null,
				newBooks: null,
				nkAction: {
					// 索引按顺序从 0 开始
					actions: [{
							name: "使用系统应用打开"
						},
						{
							name: "使用APP内置浏览"
						}
					],
					show: false
				},
				openObj: {
					path: null
				}
			};
		},
		components: {
			nkActionSheet
		},
		methods: {
			hadnleCancel() {
				this.updateMask = false;
				this.update.tabMask.hide();
			},
			handleConfirm() {
				switch (this.update.isUpdate) {
					case 1: // 热更新
						this.hotUpdate();
						break;
					case 2: // 整包更新
						plus.runtime.openURL(this.update.updateUrl);
						break;
					case 3: // 大版本更新
						plus.runtime.openURL(this.update.updateUrl);
						break;
				}
			},
			hotUpdate() {
				uni.downloadFile({
					url: this.update.updateUrl,
					success: (downloadResult) => {
						console.log(JSON.stringify(downloadResult))

						if (downloadResult.statusCode === 200) {
							plus.runtime.install(downloadResult.tempFilePath, {
								force: true
							}, function() {
								console.log('install success...');
								plus.runtime.restart();
							}, function(e) {
								console.log(e)
								console.error('install fail...');
							});
						}
					}
				});
			},
			resetData() {
				this.nkAction.show = false;
				this.openObj.path = null;
			},
			showNkAction(path) {
				this.openObj.path = path;
				this.nkAction.show = !this.nkAction.show;
			},
			handleSelect(index) {
				this.handleOpen(index)
			},
			handleClose(val) {
				this.nkAction.show = val;
			},
			// 对比本地图书和缓存图书
			handleReset() {
				let books = uni.getStorageSync('books');
				if (!books) return false;
				let jsonBooks = JSON.parse(books);
				for (let item of jsonBooks) {
					for (let appBook of this.saveBooks) {
						if (item.path == appBook.filePath) {
							item.createTime = appBook.createTime;
							item.size = appBook.size;
						}
					}
				}
				this.newBooks = jsonBooks;
			},
			handleOpen(index) {
				if (index === 0) {
					uni.openDocument({
						filePath: this.openObj.path,
						success: res => {
							console.log('打开文档成功');
						}
					});
				} else {
					uni.navigateTo({
						url: `../bookshelf/readBook?path=${this.openObj.path}`
					})
				}
			},
			async isUpdate() {
				const appInfo = { //升级检测数据  
					"appid": plus.runtime.appid,
					"version": plus.runtime.version
				};
				let {
					result
				} = await this.$api.bookshelf.verifyUpdate(appInfo);
				if (result.isUpdate !== 0) {
					this.update.isUpdate = result.isUpdate;
					this.update.content = result.content;
					this.update.updateUrl = result.updateUrl;
					this.update.tabMask = new TabMask({
						opacity: 0.6
					})
					this.update.tabMask.show(300)
					this.updateMask = true;
				}
			},
			async updateUser(){
				if(!getApp().globalData.token) return false;
				const userinfo = await this.$api.user.getUserinfo();
				uni.setStorage({
					key: 'user',
					data: JSON.stringify(userinfo.result)
				})
			}
		},
		onShow() {
			this.handleReset();
		},
		onLoad() {
			// #ifdef APP-PLUS
			// 检测 app 更新
			// 设置应用退出全屏显示
			plus.navigator.setFullscreen(false);
			this.isUpdate();
			// 获取本地已保存的图书
			uni.getSavedFileList({
				success: res => {
					// console.log(JSON.stringify(res.fileList))
					this.saveBooks = res.fileList
					this.handleReset()
				}
			});
			// #endif
			// 获取最新的用户信息
			this.updateUser()
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

					.book-title {
						text-align: center;
						line-height: 1.5;
						font-size: 30rpx;
						padding-bottom: 14rpx;
						width: 200rpx;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
