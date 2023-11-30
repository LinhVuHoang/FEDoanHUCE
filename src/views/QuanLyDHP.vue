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
        <button type="button" class="download-btn" style="float: right" v-on:click="exportToExcel">
          <a-icon type="file-excel" theme="filled"/>
        </button>
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
        <template slot="IsDaNopBanGiay" slot-scope="text,record">
          <div class="author-info" v-if="text==1">
            <p class="m-0 font-regular" style="color: green" >Đã nộp</p>
          </div>
          <div class="author-info" v-else style="white-space: nowrap">
            <input type="checkbox"  :id="'uncheckedbox_' + record.IDLopHocPhan"  @change="updateStatus(record.IDLopHocPhan,1)"/>
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
import ExcelJS from "exceljs";
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
        search:"6088",
        hocky:"HK1 2022-2023",
        orderby:"MaMonHoc"
      },
      isChecked: false,
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
                for (let i=0;i<this.data.length;i++){
                  this.data[i]['checked']=false
                  this.data[i]['STT'] = i+1;
                }
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
    updateStatus(idlophocphan,status){

      if(status==1) {
        console.log(idlophocphan)
        this.$confirm({
          title: 'Xác nhận đã nộp bản giấy',
          onOk: () => {
            QuanLyDiemHPService.Update(idlophocphan,'1').then(
                rs => {
                  for (let i=0;i<this.data.length;i++){
                    if(this.data[i]['IDLopHocPhan'] == idlophocphan){
                      this.data[i]['checked']=true
                    }
                  }
                  console.log(rs.data)
                  this.getQuanLyDHP()
                }
            )
          },
          onCancel: () => {

            QuanLyDiemHPService.Update(idlophocphan,'0').then(
                rs => {
                  console.log(rs.data)
                  document.getElementById("uncheckedbox_"+idlophocphan).checked = false;
                  for (let i=0;i<this.data.length;i++){
                    if(this.data[i]['IDLopHocPhan'] == idlophocphan){
                      this.data[i]['checked']=false
                      console.log(this.data[i]['checked'])
                    }
                  }
                  this.isChecked=false

                  this.getQuanLyDHP()
                }
            )
          }
        })
      }
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
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Danh sách lớp học phần chưa nộp điểm");
      const studentData=this.OrderProperties(this.customizeData(this.data))
      console.log(studentData)
      // Tạo các dòng dữ liệu
      const data = [];

      // Create a cell style for the title
      const titleStyle = {
        font: {
          size: 16,
          bold: true,
        },
        alignment: {
          horizontal: 'center',
        },
      };

      // Create a cell style for data
      const dataCellStyle = {
        font: {
          size: 12,
          bold: false, // Adjust as needed
        },
        alignment: {
          horizontal: 'left',
        },
      };

      // Merge cells for the title
      worksheet.mergeCells('A1:H1');
      worksheet.getCell('A1').value = "Danh sách lớp học phần chưa nộp điểm";
      worksheet.getCell('A1').style = titleStyle;

      // Set data values for the information cells

      worksheet.getCell('B2').value = "Học kỳ: "+this.data[0].TenDot;;

      // Apply data cell style to information cells
      worksheet.getCell('B2').style = dataCellStyle;

      // Apply the border style to hide gridlines in the range A1 to H4
      const shadingStyle = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' }, // Adjust the color as needed
      };

      // Apply the shading style to the range A1 to H4
      for (let row = 2; row <= 5; row++) {
        for (let col = 1; col <= 8; col++) {
          worksheet.getCell(row, col).fill = shadingStyle;
        }
      }
      // Add the title for the student data
      worksheet.getCell('A6').value = "STT";
      worksheet.getCell('B6').value = "Mã sinh viên";
      worksheet.getCell('C6').value = "Họ Đệm";
      worksheet.getCell('D6').value = "Tên";
      worksheet.getCell('E6').value = "Email";
      worksheet.getCell('F6').value = "Số điện thoại";
      worksheet.getCell('G6').value = "Ngày Sinh";
      worksheet.getCell('H6').value = "Lớp quản lý";
      for (let i=0;i<studentData.length;i++){
        const studentArray = Object.values(studentData[i])
        data.push(studentArray)
      }

      // Add the data to the worksheet
      data.forEach((row) => {
        worksheet.addRow(row);
      });
      const blob = await workbook.xlsx.writeBuffer();

      // Create a Blob URL and trigger a download
      const blobURL = URL.createObjectURL(new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
      const a = document.createElement("a");
      a.href = blobURL;
      a.download = "DanhSachSinhVien" +this.data[0].MaLopHoc+".xlsx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    customizeData(data){
      return data.map((dssv)=>{
        // eslint-disable-next-line no-unused-vars
        const{IDLopHocDanhNghia,IDLopHocPhan,TenDot,IDDot,MaLopHocPhan,MaLopHoc,TenMonHoc,IDLopHocphan,IDSinhVien,SiSo,...rest} = dssv;
        return rest
      });
    },
    OrderProperties(data){
      const newOrder = ["STT", "MaSinhVien", "HoDem", "Ten", "Email", "SoDienThoai", "NgaySinh2", "TenLop"];
      const newData = data.map((item) => Object.assign({}, ...newOrder.map((key) => ({ [key]: item[key] }))))
      console.log(newData)
      return newData;
    },
  }
})

</script>


<style lang="scss">
</style>

