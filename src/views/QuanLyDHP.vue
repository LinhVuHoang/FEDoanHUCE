<template>
  <div>
    <!-- Authors Table Card -->
    <a-card>
      <a-row type="flex" align="middle">
        <img style="width: 100%" src="/images/banner.png" alt="Banner"/>
      </a-row>
      <div>
        <a-form @submit="handleSearch" class="product__search-form">
          <a-row>
            <a-col :span="14" style="padding-right: 20px">
              <a-form-item >
                <a-input-search  v-model="params.search" placeholder="Mã môn/Tên môn">
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
      <a-table :columns="columns" :data-source="data" :pagination="false">
<!--        <template slot="TrangThaiDangKy" slot-scope="text">-->
<!--          <div class="author-info"  v-if="text=='Đăng ký mới'">-->
<!--            <p class="m-0 font-regular" style="color: green" >{{ text }}</p>-->
<!--          </div>-->
<!--          <div class="author-info"  v-else-if="text=='Đăng ký học lại'">-->
<!--            <p class="m-0 font-regular" style="color: dodgerblue">{{ text }}</p>-->
<!--          </div>-->
<!--          <div class="author-info"  v-else>-->
<!--            <p class="m-0 font-regular" style="color: red">{{ text }}</p>-->
<!--          </div>-->
<!--        </template>-->
        <template slot="DaKhoaDiemQuaTrinh" slot-scope="text">
          <div class="author-info" v-if="text">
            <p class="m-0 font-regular" style="color: green" >Đã khóa</p>
          </div>
          <div class="author-info" v-else>
            <p class="m-0 font-regular" style="color: dodgerblue" >Chưa khóa</p>
          </div>
        </template>
        <template slot="DaKhoaDiemKetThuc" slot-scope="text">
          <div class="author-info" v-if="text">
            <p class="m-0 font-regular" style="color: green" >Đã khóa</p>
          </div>
          <div class="author-info" v-else>
            <p class="m-0 font-regular" style="color: dodgerblue" >Chưa khóa</p>
          </div>
        </template>
        <template slot="IsDaNopBanGiay" slot-scope="text">
          <div class="author-info" v-if="text">
            <p class="m-0 font-regular" style="color: green" >Đã khóa</p>
          </div>
          <div class="author-info" v-else>
            <p class="m-0 font-regular" style="color: dodgerblue" >Chưa khóa</p>
          </div>
        </template>
        <template slot="NgayThi" slot-scope="text">
          <div class="author-info"  >
            <p class="m-0 font-regular"  >{{ text.split('T')[0].split('-')[2]+"-"+text.split('T')[0].split('-')[1]+"-"+text.split('T')[0].split('-')[0] }}</p>
          </div>
        </template>
        <template slot="NgayNopBanGiay" slot-scope="text">
          <div class="author-info"  >
            <p class="m-0 font-regular"  >{{ text.split('T')[0].split('-')[2]+"-"+text.split('T')[0].split('-')[1]+"-"+text.split('T')[0].split('-')[0] }}</p>
          </div>
        </template>
        <template slot="editBtn" slot-scope="text">
          <div>
            <a class="button" :href="'/DSSV_LHP_SiSo/'+ text.MaMonHoc+'/'+text.LopDuKien+'/'+text.TenDot ">
              <a-icon style="font-size: 25px;color: #007bff" type="info-circle"/>
            </a>
          </div>
        </template>
      </a-table>
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
import QuanLyDiemHPService from "@/service/QuanLyDiemHPService";
import TKBHocKyService from "@/service/TKBHocKyService";
const columns = [
  {
    title: 'Mã môn học',
    dataIndex: 'MaMonHoc',
    scopedSlots: { customRender: 'MaMonHoc' },
  },
  {
    title: 'Tên môn học',
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
    dataIndex: 'MaLopHoc',
    scopedSlots: { customRender: 'MaLopHoc' },
  },
  {
    title: 'Giảng viên',
    dataIndex: 'TenGiangVien',
    scopedSlots: { customRender: 'TenGiangVien' },
  },
  {
    title: 'Ngày thi',
    dataIndex: 'NgayThi',
    scopedSlots: { customRender: 'NgayThi' },
  },
  {
    title: 'Khóa DQT',
    dataIndex: 'DaKhoaDiemQuaTrinh',
    scopedSlots: { customRender: 'DaKhoaDiemQuaTrinh' },
  },
  {
    title: 'Khóa điểm KT',
    dataIndex: 'DaKhoaDiemKetThuc',
    scopedSlots: { customRender: 'DaKhoaDiemKetThuc' },
  },
  {
    title: 'Đã nộp bản giấy',
    dataIndex: 'IsDaNopBanGiay',
    scopedSlots: { customRender: 'IsDaNopBanGiay' },
  },
  {
    title: 'Ngày nộp bản giấy',
    dataIndex: 'NgayNopBanGiay',
    scopedSlots: { customRender: 'NgayNopBanGiay' },
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
        search:"608818",
        hocky:"HK1 2022-2023",
        orderby:"MaMonHoc"
      },
      IDDot:undefined,
      datahk:[]
    }
  },
  created(){
    localStorage.setItem('link',this.$route.fullPath);
    this.getTKBDotHK()
    this.getQuanLyDHP()
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
    async getQuanLyDHP(){
      await QuanLyDiemHPService.getAll(this.params).then(
          rs=>{
            try{
              this.data=[]
              console.log(rs)
              if(rs.data.records != undefined) {
                this.data = rs.data.records
              }else {
                this.data=[]
              }
              console.log(this.data)
              if(rs.data.filtered>0) {
                this.totalRecords = rs.data.filtered;
              }else {
                this.totalRecords=0
              }
              console.log(this.data)
            }catch (e){
              console.log(e)
              console.log("Có lỗi")
              this.totalRecords=0
            }
          }
      )
    },
    onShowSizeChange(current, pageSize) {
      this.params.limit = pageSize;
      this.params.page = current;
      this.getQuanLyDHP();
    },
    onChange(page, pageSize) {
      this.params.page = page;
      this.params.limit = pageSize;
      this.getQuanLyDHP();
    },
    handleSearch(e){
      e.preventDefault();
      this.params.page = 1;
      if (this.params.hocky ==undefined){
        console.log(this.datahk[0].TenDot)
        this.params.hocky = this.datahk[0].TenDot
        console.log(this.params.hocky)
      }
      this.getQuanLyDHP();
      console.log(this.params);

    },
    resetButton(){
      this.params = {
        page:1,
        limit:10,
        search:"",
        hocky:this.datahk[0].TenDot,
        orderby:"MaMonHoc"
      }
      this.getQuanLyDHP();
    },
  }
})

</script>


<style lang="scss">
</style>

