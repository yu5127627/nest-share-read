<script>
	import {
		getStorage
	} from 'common/utils.js'
	export default {
		globalData: {
			token: null,
			api:'http://localhost:8001/'
		},
		onLaunch() {
			getApp().globalData.token = getStorage('token')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: #f9f9f9;
	}

	@import './uni.scss'
</style>
