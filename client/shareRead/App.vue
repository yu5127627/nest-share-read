<script>
	import {
		getStorage
	} from 'common/utils.js'
	export default {
		globalData: {
			token: null,
			// api:'http://localhost:8001/'
			api:'http://read.sxczykn.top/'
		},
		onLaunch() {
			getApp().globalData.token = uni.getStorageSync('token')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './uni.scss';
	@import url("http://at.alicdn.com/t/font_1659851_xv7tv7yptc.css");
	page {
		background-color: #f9f9f9;
	}
</style>
