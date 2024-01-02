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
        <h5 class="font-semibold text-center">Thay đổi mật khẩu</h5>
<!--        <div class="content">-->
<!--          <p class="text-lg" style="white-space:pre-wrap;word-wrap: break-word;text-align: center">Chào mừng đến với hệ thống thông tin phục vụ công tác  quản lý đào tạo Đại học Xây dựng Hà Nội.</p>-->
<!--        </div>-->
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
        <a-form-item class="mb-5">
          <a-input
              v-decorator="[
						'Password',
						{ rules: [{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }] },
						]"
              type="password"
              placeholder="Mật khẩu"
          >
          </a-input>
        </a-form-item>
        <a-form-item class="mb-5">
          <a-input
              v-decorator="[
						'Passwordnew',
						{ rules: [{ required: true, message: 'Vui lòng nhập mật khẩu mới của bạn!' }] },
						]"
              type="password"
              placeholder="Mật khẩu mới"
          >
          </a-input>
        </a-form-item>
        <a-form-item class="mb-5">
          <a-input
              v-decorator="[
						'Passwordnewcf',
						{ rules: [{ required: true, message: 'Vui lòng nhập lại mật khẩu mới của bạn!' }] },
						]"
              type="password"
              placeholder="Xác nhận mật khẩu mới"
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
            Thay đổi mật khẩu
          </a-button>
          <a-button type="primary" block html-type="submit" class="login-form-button" @click="$router.go(-1)">Trở về trang trước</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <!-- / Sign Up Form -->

  </div>
</template>

<script>
import loginService from "@/service/LoginService";
const crypto = require('crypto');
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
          const hashedPassword = crypto.createHash('md5').update(values.Password).digest('hex');
          if(hashedPassword == localStorage.getItem('password') && values.Passwordnew == values.Passwordnewcf) {
            console.log(localStorage.getItem('username'))
            loginService.UpdateAccountPass(localStorage.getItem('username'),values.Passwordnew).then(
                rs=> {
                  if(rs.data.error){
                    this.showError = false;
                    this.$toast.open({
                      message: 'Đổi mật khẩu thất bại',
                      type: 'error',
                      // all of other options may go here
                    })

                  }else {
                    this.$toast.open({
                      message: 'Đổi mật khẩu thành công',
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
    // async getCheck(){
    //   await loginService.getcheckall().then(
    //       rs=>{
    //         try{
    //           this.datacheck = rs.data.result.recordset;
    //           for (const item of this.datacheck) {
    //             const key = `${item.Email}-${item.HoDem}-${item.Ten}-${item.SoCMND}-${item.SoDienThoai}`;
    //             this.datakey.push(key)
    //           }
    //         }catch (e){
    //           console.log(e);
    //           console.log("co loi o getcheckall")
    //         }
    //       }
    //   )
    // }
  },
})

</script>

<style lang="scss">
</style>