<template>
<div>
  <a-card>
    <a-row type="flex" align="middle">
      <img style="width: 100%" src="/images/banner.png" alt="Banner"/>
    </a-row>
    <div>
      <a-form @submit="handleSearch" class="product__search-form">
        <a-row>
          <a-col style="padding-right: 0px">
            <a-form-item >
              <a-input-search v-model="params.MaSinhVien"  placeholder="Mã Sinh Viên">
                <a-icon type="search"/>
              </a-input-search>
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
    <div style="margin-top: 50px" class="col-md-12 container" >
      <div style="border-bottom: 1px solid #b3b7bb; padding-bottom: 10px;">
        <h5 style="vertical-align: baseline; color: #667580; line-height: 18px; font-family: Tahoma !important; margin: 0;">Kết quả học tập</h5>
      </div>
      <div class="table-wrap" style="margin-top: 20px">

        <table class="table table-bordered" style="--bs-table-bg: #f3f7f9; text-align: center;line-height:1.42857143;">
          <thead >
          <tr>
            <th rowspan="2" id="header1">STT</th>
            <th rowspan="2" id="header2">Mã học phần</th>
            <th rowspan="2" id="header2">Tên môn/học phần</th>
            <th rowspan="2" id="header2">Lớp học phần</th>
            <th rowspan="2" id="header3">Số tín chỉ</th>
            <th rowspan="2" id="header1">ĐQT</th>
            <th colspan="2" id="header1">Thường xuyên</th>
            <th rowspan="2" id="header3">TB thường kỳ</th>
            <th rowspan="2" id="header3">Được dự thi</th>
            <th colspan="2" id="header1">ĐKT</th>
            <th rowspan="2" id="header3">Vắng thi</th>
            <th rowspan="2" id="header3">Điểm tổng kết</th>
            <th rowspan="2" id="header3">Thang điểm 4</th>
            <th rowspan="2" id="header3">Điểm chữ</th>
            <th rowspan="2" id="header3">Xếp loại</th>
            <th rowspan="2" id="header3">Ghi chú</th>
            <th rowspan="2" id="header1">Đạt</th>
          </tr>
          <tr>
            <th rowspan="1" id="header1">1</th>
            <th rowspan="1" id="header1">2</th>
            <th rowspan="1" id="header1">1</th>
            <th rowspan="1" id="header1">2</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="hk in datahk">
          <template v-for="(dt) in data">
<!--            <template v-for="(dtc, dtcIndex) in dt.items">-->
            <template v-if="hk==dt.TenDot">
            <tr >
                  <td id="cell" colspan="19" style="text-align: left;background-color: #f5f5f5;color:#578ebe;font-weight: 600;cursor: pointer;"><span>{{dt.TenDot}}</span></td>
            </tr>
            <tr>
              <td id="cell" colspan="19" style="text-align: left"><span>Điểm trung bình học kỳ hệ 10: {{dt.DiemTBHocLuc}}</span></td>
            </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Điểm trung bình học kỳ hệ 4: {{dt.DiemTBTinChi}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Điểm trung bình tích luỹ: {{dt.DiemTBHocLucTichLuy}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Điểm trung bình tích luỹ (hệ 4): {{dt.DiemTBTinChiTichLuy}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Tổng số tín chỉ đã đăng ký: {{dt.TongSoTCDangKy}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Tổng số tín chỉ tích luỹ: {{dt.SoTCTichLuy}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Tổng số tín chỉ đạt: {{dt.STCDatHocKy}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Tổng số tín chỉ nợ tính đến hiện tại: {{dt.SoTCKhongDat}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Xếp loại học lực tính luỹ: {{dt.XepLoaiTichLuy}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Xếp loại học lực học kỳ: {{dt.XepLoaiHocKy}}</span></td>
              </tr>
            </template>
              </template>
<!--            </template>-->

          </template>
          </tbody>
        </table>
      </div>
    </div>
  </a-card>
</div>
</template>

<script>
import KetQuaHocTapService from "@/service/KetQuaHocTapService";
export default {
  data(){
    return{
      data:[],
      totalRecords: undefined,
      totalPages:undefined,
      TenPhong:undefined,
      new_data:[],
      params:{
        MaSinhVien:'120364'
      },
      IDDot:undefined,
      datahk:[]
    }
  },
  created() {
    localStorage.setItem('link',this.$route.fullPath);
    this.getKetQuaHocTap()
  },
  methods:{
    groupData(data){
      const groupedData={};// create new object
      // Iterate through the data
      var count=0;
      for (const item of data){
         const key=`${item.GioiTinh}-${item.HoDem}-${item.Ten}-${item.IDDot}-`+
         `${item.IDSinhVien}-${item.DiemTBHocLuc}-${item.MaSinhVien}-${item.NgaySinh2}-${item.TenDot}`
        // If the key doesn't exist in groupedData, create it with an empty object
        if(!groupedData[key]) {
          groupedData[key] = {
            GioiTinh: item.GioiTinh,
            HoDem: item.HoDem,
            Ten: item.Ten,
            IDDot: item.IDDot,
            IDSinhVien: item.IDSinhVien,
            DiemTBHocLuc: item.DiemTBHocLuc,
            DiemTBHocLucTichLuy: item.DiemTBHocLucTichLuy,
            DiemTBThuongKy: item.DiemTBThuongKy,
            DiemTBTinChi: item.DiemTBTinChi,
            DiemTBTinChiTichLuy: item.DiemTBTinChiTichLuy,
            HocKy: item.HocKy,
            IDXepLoaiHocLuc: item.IDXepLoaiHocLuc,
            IDXepLoaiHocLucTichLuy: item.IDXepLoaiHocLucTichLuy,
            MaSinhVien: item.MaSinhVien,
            NamThu: item.NamThu,
            NgaySinh2: item.NgaySinh2,
            STCDangKyHocKy: item.STCDangKyHocKy,
            STCDatHocKy: item.STCDatHocKy,
            SoTCKhongDat: item.SoTCKhongDat,
            SoTCTichLuy: item.SoTCTichLuy,
            TenDot: item.TenDot,
            TongSoTCDangKy: item.TongSoTCDangKy,
            XepLoaiHocKy: item.XepLoaiHocKy,
            XepLoaiTichLuy: item.XepLoaiTichLuy,
            items: []
          }
        }
            groupedData[key].items.push({
              DiemChu:item.DiemChu,
              DiemChuyenCan1:item.DiemChuyenCan1,
              DiemThi:item.DiemThi,
              DiemThi1:item.DiemThi1,
              DiemTieuLuan1:item.DiemTieuLuan1,
              DiemTinChi:item.DiemTinChi,
              DiemTongKet:item.DiemTongKet,
              DiemTongKet1:item.DiemTongKet1,
              DuocDuThiGiuaKy:item.DuocDuThiGiuaKy,
              DuocDuThiKetThuc:item.DuocDuThiKetThuc,
              IDLopHocPhan:item.IDLopHocPhan,
              IDTrangThaiDangKy:item.IDTrangThaiDangKy,
              IDTrangThaiDangKyBanDau:item.IDTrangThaiDangKyBanDau,
              IsDat:item.IsDat,
              MaHocPhan:item.MaHocPhan,
              MaLopChu:item.MaLopChu,
              MaLopHoc:item.MaLopHoc,
              MaLopHocPhan:item.MaLopHocPhan,
              MaMonHoc:item.MaMonHoc,
              STT:count+1,
              SoTinChi:item.SoTinChi,
              TenMonHoc:item.TenMonHoc,
              VangThi:item.VangThi
            })
      }
      // Convert the grouped data object to an array
      const result = Object.values(groupedData);
      return result
    },
    async getKetQuaHocTap(){
      await KetQuaHocTapService.getKetQuaHocTap(this.params).then(
          rs=>{
            try{
              this.data=[]
              this.data =this.groupData(rs.data.records)
              for (let i=0;i<this.data.length;i++){
                  this.new_data[i] = this.data[i].TenDot
              }
              console.log(this.new_data)
              const sortedData = this.new_data.sort((a,b)=>{
                  const[termA,yearA] = a.split(" ")
                  const[termB,yearB] = b.split(" ")
                if(yearA<yearB) return -1;
                if(yearA>yearB) return 1;
                if(termA <termB) return -1;
                if(termA>termB) return 1;
                return 0;
              });
              this.datahk=sortedData;
              console.log(this.datahk)
             // this.totalRecords = rs.data.filtered;
              console.log(this.data)
            }catch (e){
              console.log(e)
              console.log("Có lỗi")
            }
          }
      )
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
  border:1px solid #bdd6e9;

}
.table thead tr th {
  font-size: 14px;
  font-weight: 600;
  vertical-align: middle;
  text-align: center;
  padding: 16px;
  min-width: 48px !important;
  vertical-align: middle !important;
  cursor: pointer;

}
.table-custom tbody .row-head {
  color: #578ebe;
  font-weight: 600;
  background: #f5f5f5;

}
.text-left {
  text-align: left;
}
//.table-bordered td {
//  border:1px solid black;
//}
.table {
  //width: 100%;
  //max-width: 100%;
  margin-bottom: 20px;
}
.table-bordered {
  border: 1px solid #ddd;
}
.text-center {
  text-align: center;
}
body{
  font-family: Tahoma !important;
}
#header1{
  color:#1da1f6;vertical-align:middle;white-space: nowrap;
}
#header2{
  color:#1DA1F6;vertical-align:middle;white-space: nowrap;
}
#header3{
  color: #1DA1F6;vertical-align:middle;white-space: nowrap;
}
#cell{
  padding: 10px;
  border:1px solid #bdd6e9;
}
</style>