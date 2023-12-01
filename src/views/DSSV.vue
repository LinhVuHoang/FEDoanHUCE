<template style="font-family: Tahoma">
  <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
  <div>
    <a-row type="flex" align="middle">
      <img style="width: 100%" src="/images/banner.png" alt="Banner"/>
    </a-row>
    <div style="margin-top: 50px" class="col-md-12 container" >
      <label>Lớp: {{this.data[0].MaLopHoc}}</label><br>
      <label>Môn: {{this.data[0].TenMonHoc}}</label><br>
      <label>Sĩ số: {{this.data[0].SiSo}}</label>
      <button type="button" class="download-btn" style="float: right" v-on:click="exportToExcel">
        <a-icon type="file-excel" theme="filled"/>
      </button>
      <div class="table-wrap">
        <table class="table table-bordered" style="--bs-table-bg: #2a8ecd; border-right: #5c5d62">
          <thead>
          <tr>
            <th style="color: #f6fffa">STT</th>
            <th style="color: #f6fffa">Mã Sinh Viên</th>
            <th style="color: #f6fffa">Tên Sinh Viên</th>
            <th style="color: #f6fffa">Email</th>
            <th style="color: #f6fffa">Số điện thoại</th>
            <th style="color: #f6fffa">Lớp Học</th>
            <th style="color: #f6fffa">Ngày Sinh</th>
          </tr>
          </thead>
          <tbody>
          <template >
              <tr v-for="(sv) in data">
                <td >
                  <span style="color: #002a5c">{{sv.STT}}</span>
                </td>
                <td >
                  <span style="color: #002a5c">{{sv.MaSinhVien}}</span>
                </td>
                <td >
                  <span style="color: #002a5c">{{sv.HoDem}} {{sv.Ten}}</span>
                </td>
                <td  v-if="sv.Email">
                  <span style="color: #002a5c">{{sv.Email}}</span>
                </td>
                <td v-else></td>
                <td  v-if="sv.SoDienThoai">
                  <span style="color: #002a5c">{{sv.SoDienThoai}}</span>
                </td>
                <td v-else></td>
                <td >
                  <span style="color: #002a5c">{{sv.TenLop}}</span>
                </td>
                <td >
                  <span style="color: #002a5c">{{sv.NgaySinh2}}</span>
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
  </a-card>
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
        border:{
          left:{ style: 'thin', color: { argb: '00000000' } }
        }
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
      worksheet.mergeCells('A1:I1');
      worksheet.getCell('A1').value = "DANH SÁCH SINH VIÊN LỚP HỌC PHẦN";
      worksheet.getCell('A1').style = titleStyle;

      // Set data values for the information cells
      worksheet.getCell('B2').value = "Mã học phần: "+this.data[0].MaLopHocPhan;
      worksheet.getCell('F2').value = "Học kỳ: "+this.data[0].TenDot;;
      worksheet.getCell('B3').value = "Tên học phần: " +this.data[0].TenMonHoc;;
      worksheet.getCell('F3').value = "Lớp học: "+this.data[0].MaLopHoc;;
      worksheet.getCell('B4').value = "Sĩ số: " +this.data[0].SiSo;

      // Apply data cell style to information cells
      worksheet.getCell('B2').style = dataCellStyle;
      worksheet.getCell('F2').style = dataCellStyle;
      worksheet.getCell('B3').style = dataCellStyle;
      worksheet.getCell('F3').style = dataCellStyle;
      worksheet.getCell('B4').style = dataCellStyle;
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
      worksheet.getCell('A6').alignment ={wrapText:true}
      worksheet.getCell('A6').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('B6').value = "Mã sinh viên";
      worksheet.getCell('B6').alignment ={wrapText:true}
      worksheet.getCell('B6').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('C6').value = "Họ Đệm";
      worksheet.getCell('C6').alignment ={wrapText:true}
      worksheet.getCell('C6').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('D6').value = "Tên";
      worksheet.getCell('D6').alignment ={wrapText:true}
      worksheet.getCell('D6').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('E6').value = "Email";
      worksheet.getCell('E6').alignment ={wrapText:true}
      worksheet.getCell('E6').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('F6').value = "Số điện thoại";
      worksheet.getCell('F6').alignment ={wrapText:true}
      worksheet.getCell('F6').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('G6').value = "Ngày Sinh";
      worksheet.getCell('G6').alignment ={wrapText:true}
      worksheet.getCell('G6').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
      };
      worksheet.getCell('H6').value = "Lớp quản lý";
      worksheet.getCell('H6').alignment ={wrapText:true}
      worksheet.getCell('H6').border = {
        top: { style: 'thin', color: { argb: '00000000' } },
        left: { style: 'thin', color: { argb: '00000000' } },
        bottom: { style: 'thin', color: { argb: '00000000' } },
        right: { style: 'thin', color: { argb: '00000000' } },
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