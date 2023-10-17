<template>
  <div>
    <div style="margin-top: 50px" class="col-md-12 container" >
      <label>Lớp: {{this.data[0].MaLopHoc}}</label><br>
      <label>Môn: {{this.data[0].TenMonHoc}}</label><br>
      <label>Sĩ số: {{this.data[0].SiSo}}</label>
      <button type="button" class="download-btn" style="float: right" v-on:click="exportToExcel">
        <a-icon type="file-excel" theme="filled"/>
      </button>
      <div class="table-wrap">
        <table class="table table-bordered" style="--bs-table-bg: dodgerblue; border-right: black">
          <thead>
          <tr>
            <th style="color: white">STT</th>
            <th style="color: white">Mã Sinh Viên</th>
            <th style="color: white">Tên Sinh Viên</th>
            <th style="color: white">Email</th>
            <th style="color: white">Số điện thoại</th>
            <th style="color: white">Lớp Học</th>
            <th style="color: white">Ngày Sinh</th>
          </tr>
          </thead>
          <tbody>
          <template >
              <tr v-for="(sv) in data">
                <td >
                  <span style="color: blue">{{sv.STT}}</span>
                </td>
                <td >
                  <span style="color: blue">{{sv.MaSinhVien}}</span>
                </td>
                <td >
                  <span style="color: blue">{{sv.HoDem}} {{sv.Ten}}</span>
                </td>
                <td  v-if="sv.Email">
                  <span style="color: blue">{{sv.Email}}</span>
                </td>
                <td  v-if="sv.SoDienThoai">
                  <span style="color: blue">{{sv.SoDienThoai}}</span>
                </td>
                <td >
                  <span style="color: blue">{{sv.TenLop}}</span>
                </td>
                <td >
                  <span style="color: blue">{{sv.NgaySinh2}}</span>
                </td>
              </tr>
          </template>
          </tbody>
        </table>

<!--        <div style="padding-top: 15px">-->
<!--          <a-pagination-->
<!--              :default-current="this.params.limit"-->
<!--              :total="this.totalRecords"-->
<!--              show-size-changer-->
<!--              @showSizeChange="onShowSizeChange"-->
<!--              @change="onChange"-->
<!--          />-->
<!--        </div>-->
      </div>
    </div>

  </div>
</template>
<script>
import TKBHocKyService from "@/service/TKBHocKyService";
// import exportFromJSON from "export-from-json";
import ExcelJS from "exceljs";
import * as XLSX from 'xlsx'
export default {
  data(){
    return{
      data:[],
      totalRecords: undefined,
      totalPages:undefined,
      TenPhong:undefined,
      new_data:[],
      datahk:[],
    }
  },
  created() {
    localStorage.setItem('link',this.$route.fullPath);
    this.getDSSV(this.$route.params.MaLopHocPhan,this.$route.params.MaLopHoc,this.$route.params.TenDot)

  },
  methods:{
    async getDSSV(MaLopHocPhan,MaLopHoc,TenDot){
      console.log(TenDot)
      await TKBHocKyService.getdssv(MaLopHocPhan,MaLopHoc,TenDot).then(
          rs=>{
            try{
              this.data=[]
              console.log(rs)
              this.data =  rs.data.result.recordset;
              for (let i = 0; i < this.data.length; i++) {
                this.data[i].STT = i + 1; // Bắt đầu index từ 1 hoặc 0 tùy theo tùy chọn của bạn
              }
              console.log(this.data)
             // this.totalRecords = rs.data.filtered;
            }catch (e){
              console.log(e)
              console.log("Có lỗi")
            }
          }
      )
    },
    // downloadFile() {
    //   const data = this.investorsList;
    //   const fileName = "np-data";
    //   const exportType = exportFromJSON.types.xls;
    //
    //   if (data) exportFromJSON({ data, fileName, exportType });
    // },
//     download(){
//       const data = XLSX.utils.json_to_sheet(this.OrderProperties(this.customizeData(this.data)))
//       const wb = XLSX.utils.book_new()
//       // Tạo nội dung tùy chỉnh
//       XLSX.utils.book_append_sheet(wb, data, 'DanhSachSinhVien')
//       // Tạo một dòng tiêu đề
//     //  const headerRow = ["Danh sách sinh vien", "Sĩ số"];
//
// // Thêm dòng tiêu đề vào worksheet
//       //XLSX.utils.sheet_add_aoa(this.data[0].SiSo, [headerRow], { origin: 'A1' });
//       XLSX.writeFile(wb,'Danh_sach_sinh_vien_'+this.data[0].MaLopHoc+'.xlsx')
//     },
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Danh sách sinh viên");
      const studentData=this.OrderProperties(this.customizeData(this.data))
      console.log(studentData)
      const titleRow = worksheet.addRow(["DANH SÁCH SINH VIÊN LỚP HỌC PHẦN"]);
      titleRow.font = { size: 16, bold: true }; // Đặt kiểu chữ to và in đậm
      const data = [
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        ["Mã học phần:", this.data[0].MaLopHocPhan," "," ","Học kỳ:",this.data[0].TenDot],
        ["Tên học phần:", this.data[0].TenMonHoc," "," ","Lớp học:",this.data[0].MaLopHoc],
        ["Sĩ số:", this.data[0].SiSo],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        [" "," "," "," "," "," "," "," "],
        ["STT","Mã sinh viên","Họ Đệm","Tên","Email","Số điện thoại","Ngày Sinh","Lớp quản lý"]
        // Add more rows as needed
      ];
      for (let i=0;i<studentData.length;i++){
        const studentArray = Object.values(studentData[i])
        data.push(studentArray)
      }

      // Add the data to the worksheet
      data.forEach((row) => {
        worksheet.addRow(row);
      });

      // Create a Blob from the Excel workbook
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
}

</script>

<style lang="scss" scoped>

$color-primary: #4c4c4c;
$color-secondary: #a6a6a6;
$color-highlight: #ff3f40;
.product__search-form{
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
}
/* CSS để thêm border cho các cột */
.table-bordered th {
  border:1px solid black;

}

.table-bordered td {
  border:1px solid black;
}
</style>