<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template style="font-family: Tahoma">
	<div class="sign-in">

		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h1 class="mb-15">Sign In</h1>
				<h5 class="font-regular text-muted">Enter your email and password to sign in</h5>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
          :form="form"
					class="login-form"
					@submit="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="Email" :colon="false">
						<a-input v-model="form.Username"
						placeholder="Email" />
            <span id="error-username" style="color: red"></span>
					</a-form-item>
					<a-form-item class="mb-5" label="Password" :colon="false">
						<a-input
                v-model="form.Password" type="password" placeholder="Password" />
            <span id="error-password" style="color: red"></span>
					</a-form-item>
					<a-form-item class="mb-10">
            <a-switch v-model="rememberMe" /> Remember Me
					</a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							SIGN IN
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign In Form -->

				<p class="font-semibold text-muted">Don't have an account? <router-link to="/sign-up" class="font-bold text-dark">Sign Up</router-link></p>
			</a-col>
			<!-- / Sign In Form Column -->

			<!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <div class="image-container">
          <img src="images/anhnen1.jpg" style="width: 100%; height: auto; " />
          <img src="images/1.png" style="width: 100%; height:auto;margin-top: 5px " />
        </div>
        <div style="margin-left: -15px" class="image-container">
          <img src="images/anhnenhuce.jpg" style="width: 100%; height:auto;" />
          <img src="images/NUCE1.png" style="width: 100%; height:auto;margin-top: 5px" />
        </div>
      </a-col>
			<!-- Sign In Image Column -->

		</a-row>

	</div>
</template>
<script src="js/jquery-3.6.0.min.js"></script>
<script src="js/common_scripts_min.js"></script>
<script src="js/functions.js"></script>
<script src="https://unpkg.com/vue-agile"></script>
<script>

	import LoginService from "@/service/LoginService";

  export default ({
		data() {
			return {
				// Binded model property for "Sign In Form" switch button for "Remember Me" .
				rememberMe: true,
        form:{
          Username:"" || localStorage.getItem('rememberedUsername'),
          Password:"" || localStorage.getItem('rememberedPassword')
        }
			}
		},
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });

		},
		methods: {
			// Handles input validation after submission.
			async handleSubmit(e) {
				e.preventDefault();
        if(!this.validate()){
          console.log("Lỗi validate")
          return
        }
        if (this.rememberMe) {
          localStorage.setItem('rememberedUsername', this.form.Username);
          localStorage.setItem('rememberedPassword', this.form.Password);
        } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
        }
        var errorrole =document.getElementById('error-password')
        const data = await LoginService.authenticate(this.form)
        console.log(data)
        console.log(data.data)
        if(data.status===200){
          console.log(data.status)
          localStorage.setItem('access_token',data.data.accessToken);
          let jwt = localStorage.getItem('access_token')
          console.log(jwt.split('.')[1])
          let jwtData = jwt.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          let decodedJwtData = JSON.parse(decodedJwtJsonData)
          console.log(decodedJwtData);

          if(decodedJwtData.data.user !=undefined){
            localStorage.setItem('username',decodedJwtData.data.user.TaiKhoan);
            localStorage.setItem('password',decodedJwtData.data.user.MatKhau);
            localStorage.setItem('hoten',decodedJwtData.data.user.HoDem+" "+decodedJwtData.data.user.Ten);
            localStorage.setItem('SoCMND',decodedJwtData.data.user.SoCMND);
            localStorage.setItem('SoDienThoai',decodedJwtData.data.user.SoDienThoai);
            localStorage.setItem('Role',decodedJwtData.data.user.Role);
            let rou = localStorage.getItem('link');
            console.log(rou);
            if(rou ==null) {
              if(localStorage.getItem('Role')==1) {
                this.$router.push({name: 'TKBHocKy'})
              }else if (localStorage.getItem('Role')==2){
                this.$router.push({name: 'TKBHocKy'})
              }else {
                this.$router.push({name:'TKBGiangDay'})
              }
            }else {
              if(localStorage.getItem('Role')==1) {
                this.$router.push(rou)
              }else if (localStorage.getItem('Role')==2){
                const UnacceptRouter =['/TKBGiangDay']
                console.log(UnacceptRouter)
                const hasPermission = UnacceptRouter.some(role => rou.includes(role));
                if(!hasPermission){
                  this.$router.push(rou)
                }else{
                  this.$router.push({name: 'TKBHocKy'})
                }
              }else {
                const  AcceptRouter = ['/LichSuPH','/TKBGiangDay']
                console.log(AcceptRouter)
                const hasPermission = AcceptRouter.some(role => rou.includes(role));
                console.log(hasPermission)
                if(hasPermission){
                  this.$router.push(rou)
                }else{
                  this.$router.push({name:'TKBGiangDay'})
                }
              }
            }
          }else{
            this.$router.push({name:'Sign-In'})
            errorrole.innerText = "Sai tài khoản hoặc mật khẩu"
          }
        }
			},
      validate(){
        var errorusername = document.getElementById('error-username')
        var errorpassword =document.getElementById('error-password')
        let checknumber =0;
        if(this.form.Username === ""){
          errorusername.innerText = "Xin mời nhập tài khoản"
          checknumber++;
        }else {
          errorusername.innerText=""
        }
        if(this.form.Password === ""){
          errorpassword.innerText = "Xin mời nhập mật khẩu"
          checknumber++;
        }else {
          errorpassword.innerText=""
        }
        if(checknumber ==0){
          return true;
        }else {
          return false;
        }
      }
		},
	})

</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
  .col-img {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .image-container {
    width: 50%; /* Mỗi ảnh chiếm 50% chiều rộng của col */
    text-align: center; /* Căn giữa nội dung trong mỗi image-container */
    padding: 10px; /* Khoảng cách giữa các ảnh */
  }

  .image-container img {
    max-width: 100%; /* Đảm bảo ảnh không vượt quá kích thước của image-container */
  }
  .agile__nav-button {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 24px;
    height: 100%;
    position: absolute;
    top: 0;
    transition-duration: 0.3s;
    width: 80px;
  }
  .agile__nav-button:hover {
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
  }
  .agile__nav-button--prev {
    left: 0;
  }
  .agile__nav-button--next {
    right: 0;
  }
  .agile__dots {
    bottom: 10px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
  .agile__dot {
    margin: 0 10px;
  }
  .agile__dot button {
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: 10px;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    transition-duration: 0.3s;
    width: 10px;
  }
  .agile__dot--current button, .agile__dot:hover button {
    background-color: #fff;
  }
  .slide {
    display: block;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    width: 100%;
  }
  .image-container {
    display: flex;
    margin-right: 0px;
    flex-direction: column;
  }

  .image-container img {
    width: 100%; /* Đảm bảo ảnh chiếm toàn bộ chiều rộng của container */
    height: auto; /* Tính chiều cao dựa trên tỷ lệ tự động */
  }
</style>