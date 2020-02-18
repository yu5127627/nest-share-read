<template>
	<scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x :scroll-left="scrollLeft">
		<div v-if="!textFlex">
			<div class="wuc-tab-item" :class="[index === tabCur ? selectClass + ' cur':'']" v-for="(item,index) in tabList" :key="index"
			 :id="item.id" @tap="tabSelect(index,$event)">
				<text :class="item.icon"></text>
				<span>{{item.zh_name}}</span>
			</div>
		</div>

		<div class="flex text-center" v-if="textFlex">
			<div class="wuc-tab-item flex-sub" :class="index === tabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList"
			 :key="index" :id="item.id" @tap="tabSelect(index,$event)">
				<text :class="item.icon"></text>
				<span>{{item.zh_name}}</span>
			</div>
		</div>
	</scroll-view>
</template>
<script>
	export default {
		name: 'wuc-tab',
		data() {
			return {
				currentTab: 0
			};
		},
		props: {
			tabList: {
				type: Array,
				default () {
					return [];
				}
			},
			tabCur: {
				type: Number,
				default () {
					return 0;
				}
			},
			tabClass: {
				type: String,
				default () {
					return '';
				}
			},
			tabStyle: {
				type: String,
				default () {
					return '';
				}
			},
			textFlex: {
				type: Boolean,
				default () {
					return false;
				}
			},
			selectClass: {
				type: String,
				default () {
					return 'text-current';
				}
			}
		},
		methods: {
			tabSelect(index, e) {
				const {
					id
				} = e.currentTarget
				if (this.currentTab === index) return false;
				this.currentTab = index
				this.$emit('update:tabCur', index); // 子组件直接修改父组件值
				this.$emit('change', index, id);
			}
		},
		computed: {
			scrollLeft() {
				return (this.tabCur - 1) * 60;
			}
		}
	};
</script>
<style>
	div,
	scroll-view,
	swiper {
		box-sizing: border-box;
	}

	.wuc-tab {
		white-space: nowrap;
		font-size: 30rpx;
	}

	.wuc-tab-item {
		height: 80rpx;
		display: inline-block;
		line-height: 80rpx;
		margin: 0 10rpx;
		padding: 0 20rpx;
	}

	.wuc-tab-item.cur {
		border-bottom: 4rpx solid;
	}

	.wuc-tab.fixed {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.flex {
		display: flex;
	}

	.text-center {
		text-align: center;
	}

	.flex-sub {
		flex: 1;
	}

	.text-blue {
		color: #0081ff;
	}

	.text-current {
		color: #13bfa3;
	}

	.text-white {
		color: #ffffff;
	}

	.bg-white {
		background-color: #ffffff;
	}

	.bg-blue {
		background-color: #0081ff;
	}

	.text-orange {
		color: #f37b1d
	}

	.text-xl {
		font-size: 36rpx;
	}
</style>
