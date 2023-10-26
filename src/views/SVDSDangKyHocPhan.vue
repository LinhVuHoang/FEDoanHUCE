<template>

  <!-- Authors Table Card -->
  <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
    <template #title>
      <a-row type="flex" align="middle">
        <img style="width: 100%" src="/images/banner.png" alt="Banner"/>
        <a-col :span="24" :md="12" :lg="12" style="position: relative;">

          <h5 class="font-semibold m-0" v-if="data.length >0">Danh sách môn học đăng ký sinh viên {{data[0].HoTen}}</h5>
          <h5 class="font-semibold m-0" v-else>Danh sách môn học đăng ký</h5>
        </a-col>
      </a-row>
      <div>
        <a-form @submit="handleSearch" class="product__search-form">
          <a-row>
            <a-col :span="13" style="padding-right: 20px">
              <a-form-item >
                <a-input-search  v-model="params.search" placeholder="Họ tên/ Mã sinh viên">
                  <a-icon type="search"/>
                </a-input-search>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item>
                <a-select v-model="params.hocky"  :placeholder="datahk[0].TenDot">
                  <a-select-option v-for="(item, index) in datahk" :value="item.TenDot" :key="index">{{ item.TenDot }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-button type="primary" @click="handleSearch" html-type="submit">
          Search
        </a-button>
        <a-button type="primary" html-type="submit" @click="resetButton"  style="margin-left: 20px">
          Reset
        </a-button>
      </div>
    </template>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <template slot="TrangThaiDangKy" slot-scope="text">
        <div class="author-info"  v-if="text=='Đăng ký mới'">
          <p class="m-0 font-regular" style="color: green" >{{ text }}</p>
        </div>
        <div class="author-info"  v-else-if="text=='Đăng ký học lại'">
          <p class="m-0 font-regular" style="color: dodgerblue">{{ text }}</p>
        </div>
        <div class="author-info"  v-else>
          <p class="m-0 font-regular" style="color: grey">{{ text }}</p>
        </div>
      </template>
      <template slot="NgayDangKy" slot-scope="text">
        <div class="author-info"  >
          <p class="m-0 font-regular"  >{{ text.split('T')[0].split('-')[2]+"-"+text.split('T')[0].split('-')[1]+"-"+text.split('T')[0].split('-')[0] }}</p>
        </div>
      </template>
      <template slot="HocPhi" slot-scope="text">
        <div class="author-info">
          <p class="m-0 font-regular"> {{new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'VND' }).format(text)}}</p>
        </div>
      </template>
    </a-table>
    <div>
    <h5 class="font-semibold m-0" style="float: right;padding-right: 50px" v-if="hocphi>0">Tổng học phí {{new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'VND' }).format(hocphi)}}</h5>
      <h5 v-else></h5>
    </div>
    <div style="padding-top: 15px;padding-left: 15px">
      <a-pagination
          :default-current="this.params.limit"
          :total="this.totalRecords"
          show-size-changer
          @showSizeChange="onShowSizeChange"
          @change="onChange"
      />
    </div>
  </a-card>
  <!-- / Authors Table Card -->

</template>
<script>
import DangKyHocPhanService from "@/service/DangKyHocPhanService";
import TKBHocKyService from "@/service/TKBHocKyService";
const columns = [
  {
    title: 'Mã Môn Học',
    dataIndex: 'MaMonHoc',
    scopedSlots: { customRender: 'MaMonHoc' },
  },
  {
    title: 'Tên Môn Học',
    dataIndex: 'TenMonHoc',
    scopedSlots: { customRender: 'TenMonHoc' },
  },
  {
    title: 'STC',
    dataIndex: 'SoTinChi',
    scopedSlots: { customRender: 'SoTinChi' },
  },
  {
    title: 'Lớp Học Phần',
    dataIndex: 'LopDuKien',
    scopedSlots: { customRender: 'LopDuKien' },
  },
  {
    title: 'Trạng Thái Đăng Ký',
    dataIndex: 'TrangThaiDangKy',
    scopedSlots: { customRender: 'TrangThaiDangKy' },
  },
  {
    title: 'Học phí',
    dataIndex: 'MucHocPhi',
    scopedSlots: { customRender: 'HocPhi' },
  },
  {
    title: 'Ngày Đăng Ký',
    dataIndex: 'NgayDangKy',
    scopedSlots: { customRender: 'NgayDangKy' },
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
      TenPhong:undefined,
      new_data:[],
      params:{
        page:1,
        limit:10,
        search:"",
        hocky:undefined,
        orderby:"MaMonHoc"
      },
      hocphi:undefined,
      params1:{
        page:1,
        limit:10,
        search:"",
        hocky:undefined,
        orderby:"MaMonHoc"
      },
      IDDot:undefined,
      datahk:[],
      datahp:[]
    }
  },
  created(){
    localStorage.setItem('link',this.$route.fullPath);
    this.getTKBDotHK()
    this.getHocPhi()
  },
  methods:{
    async getTKBDotHK(){
      await  TKBHocKyService.getDotHocKy().then(
          rs=>{
            try{
              this.datahk = rs.data.result.recordset;
              console.log(this.datahk)
            }catch (e){
              console.log(e);
              console.log("Có lỗi ở đợt học kỳ");
            }
          }
      )
    },
    async getDangKyMonHoc(){

      await DangKyHocPhanService.getSVDSDangKyHocPhan(this.params).then(
          rs=>{
            try{
              this.data=[]
              if(rs.data.records != undefined) {
                this.data = rs.data.records
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
    async getHocPhi(){
      this.params1.hocky=this.params.hocky
      this.params1.search = this.params.search
      this.params1.limit=10000
      let price=0;
      await DangKyHocPhanService.getSVDSDangKyHocPhan(this.params1).then(
          rs => {
            try {
              this.data1 = rs.data.records;
              if (this.data1.length > 0) {
                for (let i = 0; i < this.data1.length; i++) {
                  price = price + this.data1[i].MucHocPhi;
                  console.log(price)
                }
                this.hocphi = price;
              }
            } catch (e) {
              console.log(e)
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
      if (this.params.hocky ===undefined){
          this.params.hocky = this.datahk[0].TenDot
          console.log(this.params.hocky)
      }
      if(this.params.search !=="") {
        this.getDangKyMonHoc();
        this.getHocPhi()
      }
      console.log(this.params);

    },
    resetButton(){
      this.params = {
        page:0,
        limit:0,
        search:"",
        hocky:this.datahk[0].TenDot,
        orderby:"MaMonHoc"
      }
      this.hocphi=undefined
      this.data=[]
    },
  }
})

</script>


<style lang="scss">
</style>

