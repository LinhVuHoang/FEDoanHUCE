<!-- 
	This is the sign up page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template style="font-family: Tahoma">
	<div style="width: 100%">

		<!-- Sign Up Image And Headings -->
		<div class="sign-up-header" style="background-image: url('images/anhnenhuceintech.jpg')">

		</div>
		<!-- / Sign Up Image And Headings -->
		
		<!-- Sign Up Form -->
		<a-card :bordered="false" class="card-signup header-solid h-full" :bodyStyle="{paddingTop: 0}">
			<template #title >
				<h5 class="font-semibold text-center">Đăng ký</h5>
        <div class="content">
          <p class="text-lg" style="white-space:pre-wrap;word-wrap: break-word;text-align: center">Chào mừng đến với hệ thống thông tin phục vụ công tác  quản lý đào tạo Đại học Xây dựng Hà Nội.</p>
        </div>
			</template>
<!--			<div class="sign-up-gateways">-->
<!--    			<a-button>-->
<!--					<img src="images/logos/logos-facebook.svg" alt="">-->
<!--				</a-button>-->
<!--    			<a-button>-->
<!--					<img src="images/logos/logo-apple.svg" alt="">-->
<!--				</a-button>-->
<!--    			<a-button>-->
<!--					<img src="images/logos/Google__G__Logo.svg.png" alt="">-->
<!--				</a-button>-->
<!--			</div>-->
<!--			<p class="text-center my-25 font-semibold text-muted">Or</p>-->
			<a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="handleSubmit"
			>
				<a-form-item class="mb-10">
					<a-input
						v-decorator="[
						'HoDem',
						{ rules: [{ required: true, message: 'Vui lòng nhập họ của bạn!' }] },
						]"
						placeholder="Họ Đệm"
					>
					</a-input>
				</a-form-item>
        <a-form-item class="mb-10">
          <a-input
              v-decorator="[
						'Ten',
						{ rules: [{ required: true, message: 'Vui lòng nhập tên của bạn!' }] },
						]"
              placeholder="Tên"
          >
          </a-input>
        </a-form-item>
        <a-form-item class="mb-10">
          <a-input
              v-decorator="[
						'SoCMND',
						{ rules: [{ required: true, message: 'Vui lòng nhập số chứng minh hoặc căn cước của bạn!' }] },
						]"
              placeholder="CMND/CCCD"
          >
          </a-input>
        </a-form-item>
        <a-form-item class="mb-10">
          <a-input
              v-decorator="[
						'SoDienThoai',
						{ rules: [{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }] },
						]"
              placeholder="Số điện thoại"
          >
          </a-input>
        </a-form-item>
				<a-form-item class="mb-10">
					<a-input
						v-decorator="[
						'Email',
						{ rules: [{ required: true, message: 'Vui lòng nhập email của bạn!' }] },
						]"
						placeholder="Email"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-5">
					<a-input
						v-decorator="[
						'Password',
						{ rules: [{ required: true, message: 'Vui lòng nhập password của bạn!' }] },
						]"
						type="password"
						placeholder="Mật khẩu"
					>
					</a-input>
				</a-form-item>

				<a-form-item class="mb-10">
					<a-checkbox
						v-decorator="[
						'remember',
						{
							valuePropName: 'checked',
							initialValue: true,
						},
						]"
					>
						Tôi đồng ý với <a href="#" class="font-bold text-dark">các điều khoản và điều kiện</a>
					</a-checkbox>
				</a-form-item>
        <p v-if="this.showError" style="color: red" class="text-red-500">Thông tin không hợp lệ. Vui lòng kiểm tra lại.</p>
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
						Đăng ký
					</a-button>
				</a-form-item>
			</a-form>
			<p class="font-semibold text-muted text-center">Bạn đã có tài khoản? <router-link to="/sign-in" class="font-bold text-dark">Đăng nhập</router-link></p>
		</a-card>
		<!-- / Sign Up Form -->

	</div>
</template>

<script>
import loginService from "@/service/LoginService";
	export default ({
		data() {
			return {
        datacheck:[],
        datakey:[],
        showError: false,
			}
		},
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });

		},
    created() {
      this.getCheck()
    },
    methods: {
			// Handles input validation after submission.
     handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if ( !err ) {
						console.log('Received values of form: ', values) ;
            if (values.SoDienThoai.length >= 10 && !values.SoDienThoai.includes(' ')) {
              const part1 = values.SoDienThoai.slice(0, 4);
              const part2 = values.SoDienThoai.slice(4, 7);
              const part3 = values.SoDienThoai.slice(7);
              values.SoDienThoai = `${part1} ${part2} ${part3}`;
            }
            const key = `${values.Email}-${values.HoDem}-${values.Ten}-${values.SoCMND}-${values.SoDienThoai}`
            if(this.datakey.includes(key)) {
             loginService.signin(values).then(
                 rs=> {
                   if(rs.data.error){
                     this.showError = false;
                     this.$toast.open({
                       message: 'Tài khoản đã tồn tại',
                       type: 'error',
                       // all of other options may go here
                     })

                   }else {
                     this.$toast.open({
                       message: 'Đăng ký thành công',
                       type: 'success',
                       // all of other options may go here
                     })
                     this.$router.push("/")
                   }

                 }
              )
            }else {
              this.showError = true;
            }
					}else {
            this.showError = false;
          }
				});
			},
      async getCheck(){
        await loginService.getcheckall().then(
            rs=>{
              try{
                this.datacheck = rs.data.result.recordset;
                for (const item of this.datacheck) {
                  const key = `${item.Email}-${item.HoDem}-${item.Ten}-${item.SoCMND}-${item.SoDienThoai}`;
                  this.datakey.push(key)
                }
              }catch (e){
                console.log(e);
                console.log("co loi o getcheckall")
              }
            }
        )
      }
		},
	})

</script>

<style lang="scss">
</style>