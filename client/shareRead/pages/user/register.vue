<template>
	<view class="rlout_box">
		<image src="../../static/images/outtopbg.png" mode="widthFix" class="top_img"></image>
		<view class="inn_box">
			<view class="inn_tab">
				<view class="inn_tabbtn" @click="goTo('../login/login')">登录</view>
				<view class="inn_tabbtn active">注册</view>
			</view>
			<view class="inn_con">
				<view class="inn_li">
					<view class="iconfont icon44"></view>
					<input type="text" class="inn_input" v-model="name" placeholder="请输入账号"/>
					<view class="iconfont iconguanbi" v-show="nameFlag" @click="clearFun('name')"></view>
				</view>
				<view class="inn_li">
					<view class="iconfont iconyanzhengmatianchong"></view>
					<input type="text" class="inn_input" v-model="yzm" placeholder="请输入验证码"/>
					<view class="iconfont iconguanbi" v-show="yzmFlag" @click="clearFun('yzm')"></view>
					<view class="inn_fbtn" @click="fsFun">{{fsyzm}}</view>
				</view>
				<view class="inn_li">
					<view class="iconfont icontongyong-xiugaimimatubiao"></view>
					<input type="password" class="inn_input" v-model="password" placeholder="请输入密码"/>
					<view class="iconfont iconguanbi" v-show="passFlag" @click="clearFun('password')"></view>
				</view>
				<view class="inn_li">
					<view class="iconfont icontongyong-xiugaimimatubiao"></view>
					<input type="password" class="inn_input" v-model="rpassword" placeholder="请确认密码"/>
					<view class="iconfont iconguanbi" v-show="rpassFlag" @click="clearFun('rpassword')"></view>
				</view>
				<view class="inn_dl">
					<view class="inn_a" @click="goTo('../login/login')">已有账户，立即登录</view>
				</view>
				<view class="inn_btn">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	var timer;
	export default {
		data() {
			return {
				fsyzm:"发送验证码",
				fsFlag:true,
				nameFlag:false,
				yzmFlag:false,
				passFlag:false,
				rpassFlag:false,
				name:"",
				yzm:"",
				password:"",
				rpassword:""
			};
		},
		watch:{
			name(val){
				if(val == ""){
					this.nameFlag=false;
				}else{
					this.nameFlag=true;
				}
			},
			yzm(val){
				if(val == ""){
					this.yzmFlag=false;
				}else{
					this.yzmFlag=true;
				}
			},
			password(val){
				if(val == ""){
					this.passFlag=false;
				}else{
					this.passFlag=true;
				}
			},
			rpassword(val){
				if(val == ""){
					this.rpassFlag=false;
				}else{
					this.rpassFlag=true;
				}
			}
		},
		methods:{
			goTo(url){
				if(timer){
					clearInterval(timer);
				}
				uni.reLaunch({
					url:url
				})
			},
			clearFun(type){
				var that=this;
				switch (type){
					case 'name':
						that.name="";
						break;
					case 'yzm':
						that.yzm="";
						break;
					case 'password':
						that.password="";
						break;
					case 'rpassword':
						that.rpassword="";
						break;
					default:
						break;
				}
			},
			fsFun(){
				var that=this;
				if(that.fsFlag){
					that.fsFlag=false;
					var time=60;
					timer=setInterval(function(){
						console.log(time);
						time=time-1;
						that.fsyzm=time+"S";
						if(time < 0){
							that.fsFlag=true;
							clearInterval(timer);
							that.fsyzm="重新发送";
						}
					},1000)
				}
			}
		},
		onBackPress(){
			if(timer){
				clearInterval(timer);
			}
		}
	}
</script>

<style lang="scss">
	page{
		background:#fff;
	}
</style>
