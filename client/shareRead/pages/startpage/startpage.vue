<template>
	<view>
		启动页面
		<button type="primary" @click="handleIndex()">首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			
			async isUpdatee() {
				const appInfo = { //升级检测数据  
					"appid": plus.runtime.appid,
					"version": plus.runtime.version
				};
				let updateInfo = await this.$http.common.isUpdate(appInfo);
				this.update.isUpdate = updateInfo.data.isUpdate;

				if (this.update.isUpdate === 0) return false

				this.update.content = updateInfo.data.content;
				this.update.updateUrl = updateInfo.data.updateUrl;
				this.value = true;
			},
			handleIndex() {
				uni.switchTab({
					url: '../tabbar/bookshelf'
				})
			}
		},
		// onLoad() {
		// 	console.log('1')
		// 	setTimeout(()=>{
		// 		uni.reLaunch({
		// 			url:'../tabbar/bookshelf'
		// 		})
		// 	},3000)
		// }

	}
</script>

<style>

</style>
