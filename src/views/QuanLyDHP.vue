<template style="font-family: Tahoma">
  <div>
    <!-- Authors Table Card -->
    <a-card>
      <a-row type="flex" align="middle">
        <img style="width: 100%" src="/../images/banner.png" alt="Banner"/>
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
        <button v-if="data.length>0" type="button" class="download-btn" style="float: right" v-on:click="exportToExcel">
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
            <input type="checkbox"  :id="'uncheckedbox_' + record.Id"  @change="updateStatus(record.Id,1)"/>
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
      data1:[],
      columns:columns,
      totalRecords: undefined,
      totalPages:undefined,
      TenPhong:undefined,
      new_data:[],
      params:{
        page:1,
        limit:10,
        search:undefined,
        hocky:undefined,
        orderby:"MaMonHoc"
      },
      params1:{
        page:1,
        limit:10000000,
        search:undefined,
        hocky:undefined,
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
      this.GetQuanLyDHP1();
      console.log(this.params);

    },
    async GetQuanLyDHP1(){
      this.params1.search= this.params.search
      this.params1.hocky=this.params.hocky
      await QuanLyDiemHPService.getAll(this.params1).then(
          rs=>{
            try{
              this.data1=[]
              console.log(rs)
              if(rs.data.records != undefined) {
                this.data1 = rs.data.records.filter(item =>
                    item.IsDaNopBanGiay === null ||
                    item.IsDaNopBanGiay === false ||
                    item.IsDaNopBanGiay === 0
                );
                for (let i=0;i<this.data1.length;i++){
                  this.data1[i]['STT'] = i+1;
                  const text= this.data1[i]['NgayThi']
                  this.data1[i]['NgayThi']=text.split('T')[0].split('-')[2]+"-"+text.split('T')[0].split('-')[1]+"-"+text.split('T')[0].split('-')[0]
                  const MGV = Array.from(new Set(this.data1[i]['MaGiangVien'].split(', ')))
                  const TGV =Array.from(new Set(this.data1[i]['TenGiangVien'].split(', ')))
                  console.log(MGV)
                  console.log(TGV)
                  this.data1[i]['GiangVien']=""
                  for ( let j=0;j<MGV.length;j++){
                    this.data1[i]['GiangVien']+=MGV[j]+"-"+TGV[j]
                    if( j!=MGV.length-1){
                      this.data1[i]['GiangVien'] += ", "
                    }
                  }
                }
              }else {
                this.data1=[]
              }
              console.log(this.data1)
            }catch (e){
              console.log(e)
              console.log("Có lỗi")
            }
          }
      )
    },
    updateStatus(Id,status){

      if(status==1) {
        console.log(Id)
        this.$confirm({
          title: 'Xác nhận đã nộp bản giấy',
          onOk: () => {
            QuanLyDiemHPService.Update(Id,'1').then(
                rs => {
                  for (let i=0;i<this.data.length;i++){
                    if(this.data[i]['Id'] == Id){
                      this.data[i]['checked']=true
                    }
                  }
                  console.log(rs.data)
                  this.getQuanLyDHP()
                  this.GetQuanLyDHP1();
                }
            )
          },
          onCancel: () => {
            QuanLyDiemHPService.Update(Id,'0').then(
                rs => {
                  console.log(rs.data)
                  document.getElementById("uncheckedbox_"+id).checked = false;
                  for (let i=0;i<this.data.length;i++){
                    if(this.data[i]['Id'] == Id){
                      this.data[i]['checked']=false
                      console.log(this.data[i]['checked'])
                    }
                  }
                  this.isChecked=false

                  this.getQuanLyDHP()
                  this.GetQuanLyDHP1();
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
      this.GetQuanLyDHP1();
    },
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Danh sách lớp học phần chưa nộp điểm");
      const studentData=this.OrderProperties(this.customizeData(this.data1))
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


      // Merge cells for the title
      worksheet.mergeCells('A1:K1');
      worksheet.getCell('A1').value = "Danh sách lớp học phần chưa nộp điểm";
      worksheet.getCell('A1').style = titleStyle;
      worksheet.mergeCells('A2:K2');
      worksheet.getCell('A2').value = this.data1[0].TenDot;
      worksheet.getCell('A2').style = titleStyle;
      // Set data values for the information cells
      // Apply the border style to hide gridlines in the range A1 to H4
      // const shadingStyle = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: 'FFFFFFFF' }, // Adjust the color as needed
      // };
      // Apply the shading style to the range A1 to H4
      // Add the title for the student data
      worksheet.getCell('A4').value = "STT";
      worksheet.getCell('A4').alignment ={wrapText:true}
      worksheet.getCell('A4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('B4').value = "Mã lớp học phần";
      worksheet.getCell('B4').alignment ={wrapText:true}
      worksheet.getCell('B4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('C4').value = "Mã môn học";
      worksheet.getCell('C4').alignment ={wrapText:true}
      worksheet.getCell('C4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('D4').value = "Tên môn học";
      worksheet.getCell('D4').alignment ={wrapText:true}
      worksheet.getCell('D4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('E4').value = "Số tín chỉ";
      worksheet.getCell('E4').alignment ={wrapText:true}
      worksheet.getCell('E4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('F4').value = "Lớp môn học";
      worksheet.getCell('F4').alignment ={wrapText:true}
      worksheet.getCell('F4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('G4').value = "Sĩ số sinh viên";
      worksheet.getCell('G4').alignment ={wrapText:true}
      worksheet.getCell('G4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('H4').value = "Ngày thi";
      worksheet.getCell('H4').alignment ={wrapText:true}
      worksheet.getCell('H4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('I4').value = "Giảng viên";
      worksheet.getCell('I4').alignment ={wrapText:true}
      worksheet.getCell('I4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('J4').value = "Tổ bộ môn";
      worksheet.getCell('J4').alignment ={wrapText:true}
      worksheet.getCell('J4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('K4').value = "Khoa chủ quản";
      worksheet.getCell('K4').alignment ={wrapText:true}
      worksheet.getCell('K4').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('L4').border = {

        left: { style: 'thin', color: { argb: '00000000' } },
      };
      for (let i=0;i<studentData.length;i++){
        const studentArray = Object.values(studentData[i])
        data.push(studentArray)
      }

      // Add the data to the worksheet
      data.forEach((row) => {
        const excelRow = worksheet.addRow(row);
        row.forEach((column, index) => {
          excelRow.getCell(index + 1).border = {
            top: { style: 'thin', color: { argb: '00000000' } },
            left: { style: 'thin', color: { argb: '00000000' } },
            bottom: { style: 'thin', color: { argb: '00000000' } },
            right: { style: 'thin', color: { argb: '00000000' } },
          };

          excelRow.getCell(index+1).alignment={wrapText:true}
        });
      });

      const blob = await workbook.xlsx.writeBuffer();

      // Create a Blob URL and trigger a download
      const blobURL = URL.createObjectURL(new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
      const a = document.createElement("a");
      a.href = blobURL;
      a.download = "DanhSachChuaNopDiem_" +this.data1[0].TenDot+"_"+this.params1.search+".xlsx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    customizeData(data){
      return data.map((dssv)=>{
        // eslint-disable-next-line no-unused-vars
        const{DaKhoaDiemKetThuc,DaKhoaDiemQuaTrinh,Email,IDDot,TenDot,TenHeDaoTao,IDLopHocPhan,IDLopXepLichThi,Id,IsDaNopBanGiay,MaGiangVien,TenGiangVien,IsKhoaTH,IsKhoaTL,IsXacNhan,NgayCapNhat,NgayNopBanGiay,NgayTao,NguoiCapNhat,NguoiTao,Nhom,SoDienThoai,TenNganh,TenNghe,...rest} = dssv;
        return rest
      });
    },
    OrderProperties(data){
      const newOrder = ["STT", "MaLopHocPhan", "MaMonHoc", "TenMonHoc", "SoTinChi", "MaLopHoc", "SiSo", "NgayThi","GiangVien","TenBoMon","TenPhongBan"];
      const newData = data.map((item) => Object.assign({}, ...newOrder.map((key) => ({ [key]: item[key] }))))
      console.log(newData)
      return newData;
    },
  }
})

</script>


<style lang="scss">
</style>

