<template>
	<view>
		<view v-for="(item,index) in books" :key="index">
			{{item.zh_name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				books: []
			}
		},
		methods: {
			async getFavBooks() {
				const {
					result
				} = await this.$api.user.favBooks();
				this.books = result;
			}
		},
		onLoad() {
			this.getFavBooks()
		}
	}
</script>

<style>

</style>
