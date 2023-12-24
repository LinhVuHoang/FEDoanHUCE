<template style="font-family: Tahoma">
  <div>
    <!-- Authors Table Card -->
    <a-card >
      <a-row type="flex" align="middle">
        <img style="width: 100%" src="/../images/banner.png" alt="Banner"/>
<!--        <a-col :span="24" :md="12" :lg="12" style="position: relative;">-->
<!--          <h5 class="font-semibold m-0">Danh sách tài khoản</h5>-->
<!--        </a-col>-->
      </a-row>
      <div>
        <a-form @submit="handleSearch" class="product__search-form">
          <a-row>
            <a-col :span="24">
              <a-form-item >
                <a-input-search  v-model="params.search" placeholder="Email/ Họ đệm/ Tên">
                  <a-icon type="search"/>
                </a-input-search>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-button type="primary" @click="handleSearch" html-type="submit">
          Tìm kiếm
        </a-button>
        <a-button type="primary" html-type="submit" @click="resetButton"  style="margin-left: 20px">
          Làm mới
        </a-button>
      </div>
      <a-table :columns="columns" :data-source="data" :pagination="false">
          <template slot="Role" slot-scope="text,record">
            <a-select  style="width: 120px" v-model="roleNames[record.Email]" @change="updateRole(record.Email, $event)" >
              <a-select-option v-for="(item, index) in RoleAccount" :value="item" :key="index" ><span v-if="index==0" style="color: red">{{ item }}</span>
                <span v-if="index==1" style="color: dodgerblue">{{ item }}</span>
                <span v-if="index==2" style="color: green">{{ item }}</span>
              </a-select-option>
            </a-select>
          </template>
      </a-table>
      <div>
        <h5 class="font-semibold m-0" style="float: right;padding-right: 50px" v-if="hocphi>0">Tổng học phí {{new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'VND' }).format(hocphi)}}</h5>
        <h5 v-else></h5>
      </div>
      <div style="padding-top: 15px;padding-left: 15px">
        <a-pagination
            :current="this.params.page"
            :default-current="this.params.limit"
            :total="this.totalRecords"
            show-size-changer
            @showSizeChange="onShowSizeChange"
            @change="onChange"
        />
      </div>

    </a-card>
    <!-- / Authors Table Card -->
  </div>
</template>
<script>
import LoginService from "@/service/LoginService";
const columns = [
  {
    title: 'Email',
    dataIndex: 'Email',
    scopedSlots: { customRender: 'Email' },
  },
  {
    title: 'Họ đệm',
    dataIndex: 'HoDem',
    scopedSlots: { customRender: 'HoDem' },
  },
  {
    title: 'Tên',
    dataIndex: 'Ten',
    scopedSlots: { customRender: 'Ten' },
  },
  {
    title: 'Số CMND',
    dataIndex: 'SoCMND',
    scopedSlots: { customRender: 'SoCMND' },
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'SoDienThoai',
    scopedSlots: { customRender: 'SoDienThoai' },
  },
  {
    title: 'Chức quyền',
    dataIndex: 'Role',
    scopedSlots: { customRender: 'Role' },
  },
];
//Trong Vue.js, a-table hoặc các thành phần tương tự sẽ ưu tiên sử dụng dữ liệu từ data() nếu có. Nếu data() không chứa dữ liệu cụ thể, thì nó sẽ thử tìm dữ liệu từ props.
// "Authors" table list of rows and their properties.
const table1Data = [
];
export default ({
  data() {
    return {
      // Active button for the "Authors" table's card header radio button group.
      authorsHeaderBtns: 'all',
      data:[],
      columns:columns,
      totalRecords: undefined,
      totalPages:undefined,
      new_data:[],
      params:{
        page:1,
        limit:10,
        search:"",
        orderby:"Id"
      },
      RoleAccount: ["Admin", "Lãnh đạo", "Giảng viên"], // Các giá trị role
      roleNames: {},
      IDDot:undefined
    }
  },
  created(){
    localStorage.setItem('link',this.$route.fullPath);
    this.getListAccount()
  },
  methods:{
    getRoleName(role) {
      return this.roleNames[role] || role;
    },
    async getListAccount(){

      await LoginService.getAccount(this.params).then(
          rs=>{
            try{
              this.data=[]
              if(rs.data.records != undefined) {
                this.data = rs.data.records
                this.data = this.data.filter(item => item.Email !== localStorage.getItem("username"));
                this.data = this.data.filter(item => item.Email !== 'admin');
                for (let i=0;i<this.data.length;i++){
                  if(this.data[i]['Role'] ==1){
                    this.data[i]['CRole'] = 'Admin'
                  }else if(this.data[i]['Role'] ==2){
                    this.data[i]['CRole'] = 'Lãnh đạo'
                  }else {
                    this.data[i]['CRole'] = 'Giảng viên'
                  }
                }
                for (const item of this.data) {
                  this.$set(this.roleNames, item.Email, item.CRole);
                }
                console.log(this.roleNames)
              }else {
                this.data=[]
              }
              console.log(this.data)
              this.totalRecords = rs.data.filtered;
              console.log(this.data)
            }catch (e){
              console.log(e)
              console.log("Có lỗi")
            }
          }
      )
    },
    onShowSizeChange(current, pageSize) {
      this.params.limit = pageSize;
      this.params.page = current;
      this.getDangKyMonHoc();
    },
    onChange(page, pageSize) {
      this.params.page = page;
      this.params.limit = pageSize;
      this.getDangKyMonHoc();
    },
    handleSearch(e){
      e.preventDefault();
      this.params.page = 1;
      if(this.params.search !=="") {
        this.getListAccount();
      }
      console.log(this.params);

    },
    updateRole(Email,Role){
      if(Role == "Admin"){
        Role=1
      }else if(Role == "Lãnh đạo") {
        Role=2
      }else {
        Role=3
      }
      console.log(Email)
      console.log(Role)
      this.$confirm({
        title: 'Xác nhận cập nhật quyền cho '+Email,
        onOk: () => {
          LoginService.UpdateAccount(Email,Role).then(
             rs=> {
               if (rs.data.error) {
                 this.$toast.open({
                   message: 'Cập nhật quyền thất bại',
                   type: 'error',
                   // all of other options may go here
                 })
                 this.getListAccount()
               } else {
                 this.$toast.open({
                   message: 'Cập nhật thành công',
                   type: 'success',
                   // all of other options may go here
                 })
                 this.getListAccount()
               }
             }
          )
        },
        onCancel: ()=>{
          this.getListAccount()
        }
      })
    },
    resetButton(){
      this.params = {
        page:0,
        limit:10,
        search:"",
        orderby:"Id"
      }
      this.getListAccount();
      this.data=[]
    },
  }
})

</script>


<style lang="scss">
</style>

