<template>
	<view>
		<web-view :src="bookUrl"> </web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				bookUrl: '/hybrid/html/pdf.js/web/viewer.html?file='
			}
		},
		onLoad(query) {
			// #ifdef APP-PLUS
			// 删除路径中的 _
			const path = query.path.replace('_', '');
			this.bookUrl = `${this.bookUrl}../../../../../${path}`;
			// console.log(this.bookUrl)
			// 获取页面栈
			const pages = getCurrentPages();
			var page = pages[pages.length - 2];
			// 调用上一个页面栈的方法
			page.$vm.resetData()
			// var currentWebview = page.$getAppWebview();
			// console.log(JSON.stringify(currentWebview)); //获得当前webview的id
			// #endif 
		}
	}
</script>

<style>

</style>
