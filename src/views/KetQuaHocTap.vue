<template style="font-family: Tahoma">
<div>
  <a-card>
    <a-row type="flex" align="middle">
      <img style="width: 100%" src="/../images/banner.png" alt="Banner"/>
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
        Tìm kiếm
      </a-button>
      <a-button type="primary" html-type="submit" @click="resetButton"  style="margin-left: 20px">
        Làm mới
      </a-button>
    </div>
    <div style="margin-top: 50px" class="col-md-12 container" >
      <div style="border-bottom: 1px solid #b3b7bb; padding-bottom: 10px;">
        <h5 v-if="Hoten" style="vertical-align: baseline; color: #667580; line-height: 18px; font-family: Tahoma !important; margin: 0;">Kết quả học tập sinh viên {{Hoten}} </h5>
        <h5 v-else style="vertical-align: baseline; color: #667580; line-height: 18px; font-family: Tahoma !important; margin: 0;">Kết quả học tập </h5>
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
          <template v-for="(dt,dtIndex) in data">
            <template v-if="hk==dt.TenDot">

            <tr >
                  <td id="cell" colspan="19" style="text-align: left;background-color: #f5f5f5;color:#578ebe;font-weight: 600;cursor: pointer;"><span>{{dt.TenDot}}</span></td>
            </tr>
              <template v-for="(dtc, dtcIndex) in dt.items">
              <tr>
                <td id="cell"><span>{{dtcIndex+1 + getPreviousItemsCount(dtIndex)}}</span></td>
                <td id="cell"><span>{{dtc.MaHocPhan}}</span></td>
                <td  id="cell"><span>{{dtc.TenMonHoc}}</span></td>
                <td id="cell"><span>{{dtc.MaLopHoc}}</span></td>
                <td id="cell"><span>{{dtc.SoTinChi}}</span></td>
                <td id="cell" ><span v-if="dtc.DiemChuyenCan1 >5">{{parseFloat(dtc.DiemChuyenCan1).toFixed(2)}}</span>
                  <span v-else-if="dtc.DiemChuyenCan1 <=5 && dtc.DiemChuyenCan1 !==null" style="color: red">{{parseFloat(dtc.DiemChuyenCan1).toFixed(2)}}</span>
                  <span v-else></span>
<!--                  <span v-else-if="dtc.DiemChuyenCan1 ===null && dtc.DiemTBThuongKy >5">{{parseFloat(dtc.DiemTBThuongKy).toFixed(2)}}</span>-->
<!--                  <span v-else-if="dtc.DiemChuyenCan1 ===null && dtc.DiemTBThuongKy<=5 && dtc.DiemTBThuongKy !==null" style="color: red">{{parseFloat(dtc.DiemTBThuongKy).toFixed(2)}}</span>-->
                </td>
                <td id="cell" ><span v-if="dtc.DiemThuongKy1 >5">{{parseFloat(dtc.DiemThuongKy1).toFixed(2)}}</span>
                  <span v-else-if="dtc.DiemThuongKy1<=5 && dtc.DiemThuongKy1 !==null" style="color: red">{{parseFloat(dtc.DiemThuongKy1).toFixed(2)}}</span>
                  <span v-else></span>
                </td>
                <td id="cell" ><span v-if="dtc.DiemThuongKy2 >5">{{parseFloat(dtc.DiemThuongKy2).toFixed(2)}}</span>
                  <span v-else-if="dtc.DiemThuongKy2<=5 && dtc.DiemThuongKy2 !==null" style="color: red">{{parseFloat(dtc.DiemThuongKy2).toFixed(2)}}</span>
                  <span v-else></span>
                </td>
                <td id="cell" ><span v-if="dtc.DiemTBThuongKy >5">{{parseFloat(dtc.DiemTBThuongKy).toFixed(2)}}</span>
                  <span v-else-if="dtc.DiemTBThuongKy<=5 && dtc.DiemTBThuongKy !==null" style="color: red">{{parseFloat(dtc.DiemTBThuongKy).toFixed(2)}}</span>
                  <span v-else></span>
<!--                  <span v-else-if="!dtc.DiemTBThuongKy && dtc.DiemTBThuongKy <=5" style="color: red">{{parseFloat(dtc.DiemChuyenCan1).toFixed(2)}}</span>
                  <span v-else-if="!dtc.DiemTBThuongKy && dtc.DiemTBThuongKy >5">{{parseFloat(dtc.DiemChuyenCan1).toFixed(2)}}</span>-->
                </td>
                <td id="cell"><span v-if="dtc.DuocDuThiKetThuc">
                  <svg style="width: 20px;height: 20px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" version="1.1"  fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(0 -1028.4)"> <path d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1029.4)" fill="#27ae60"></path> <path d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1028.4)" fill="#2ecc71"></path> <path d="m16 1037.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z" fill="#27ae60"></path> <path d="m16 1036.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z" fill="#ecf0f1"></path> </g> </g></svg>
                </span></td>
                <td id="cell"><span v-if="dtc.DiemThi>5">{{parseFloat(dtc.DiemThi).toFixed(2)}}</span>
                  <span v-else-if="dtc.DiemThi<=5 && dtc.DiemThi>0" style="color: red">{{parseFloat(dtc.DiemThi).toFixed(2)}}</span>
                  <span v-else-if="!dtc.DiemThi && dtc.DiemThi1>5">{{parseFloat(dtc.DiemThi1).toFixed(2)}}</span>
                  <span v-else-if="!dtc.DiemThi && dtc.DiemThi1<=5 && dtc.DiemThi1>0" style="color: red">{{parseFloat(dtc.DiemThi1).toFixed(2)}}</span>
                  <span v-else-if="dtc.DiemThi ===0 || dtc.DiemThi1 ===0" style="color: red">0,00</span>
                </td>
                <td id="cell"><span v-if="dtc.DiemThi2">{{parseFloat(dtc.DiemThi2).toFixed(2)}}</span></td>
                <td id="cell"><span v-if="dtc.VangThi">
                                    <svg style="width: 20px;height: 20px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" version="1.1"  fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(0 -1028.4)"> <path d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1029.4)" fill="#27ae60"></path> <path d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1028.4)" fill="#2ecc71"></path> <path d="m16 1037.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z" fill="#27ae60"></path> <path d="m16 1036.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z" fill="#ecf0f1"></path> </g> </g></svg>
                </span></td>
                <td id="cell">
                  <span v-if="dtc.DiemTongKet>5 && dtc.DiemTongKet !==null">{{parseFloat(dtc.DiemTongKet).toFixed(2)}}</span>
                  <span v-else-if="dtc.DiemTongKet<=5 && dtc.DiemTongKet !==null" style="color: red">{{parseFloat(dtc.DiemTongKet).toFixed(2)}}</span>
                </td>
                <td id="cell"><span v-if="dtc.DiemTinChi !==null">{{parseFloat(dtc.DiemTinChi).toFixed(2)}}</span></td>
                <td id="cell"><span v-if="!dtc.IsDat" style="color: red">{{dtc.DiemChu}}</span>
                  <span v-else>{{dtc.DiemChu}}</span>
                </td>
                <td id="cell">
                  <span v-if="dtc.IsDat && dtc.DiemTongKet !==null">Đạt</span>
                  <span v-else-if="!dtc.IsDat && dtc.DiemTongKet !==null">Không đạt</span>
                </td>
                <td id="cell"><span></span></td>

                <td id="cell"><span v-if="dtc.IsDat">
                  <svg style="width: 20px;height: 20px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" version="1.1"  fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g transform="translate(0 -1028.4)"> <path d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1029.4)" fill="#27ae60"></path> <path d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" transform="translate(0 1028.4)" fill="#2ecc71"></path> <path d="m16 1037.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z" fill="#27ae60"></path> <path d="m16 1036.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z" fill="#ecf0f1"></path> </g> </g></svg>
                </span>
                  <span v-else>
                    <svg v-if="dtc.DiemTongKet>0" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 297 297" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <g> <circle style="fill:#C0392B;" cx="148.5" cy="148.5" r="148.5"></circle> </g> </g> </g> <path style="fill:#C0392B;" d="M223.53,86.581L85.344,222.292l74.293,74.293c73.135-5.423,131.525-63.813,136.948-136.948 L223.53,86.581z"></path> <polygon style="fill:#ffffff;" points="231.823,94.875 202.125,65.177 148.5,118.802 94.875,65.177 65.177,94.875 118.802,148.5 65.177,202.125 94.875,231.823 148.5,178.198 202.125,231.823 231.823,202.125 178.198,148.5 "></polygon> </g> </g></svg>
                </span>
                </td>

              </tr>
              </template>
              <template v-if="dt.DiemTBHocLuc>0">
            <tr>
              <td id="cell" colspan="19" style="text-align: left"><span>Điểm trung bình học kỳ hệ 10: {{parseFloat(dt.DiemTBHocLuc).toFixed(2)}}</span></td>
            </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Điểm trung bình học kỳ hệ 4: {{parseFloat(dt.DiemTBTinChi).toFixed(2)}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Điểm trung bình tích luỹ: {{parseFloat(dt.DiemTBHocLucTichLuy).toFixed(2)}}</span></td>
              </tr>
              <tr>
                <td id="cell" colspan="19" style="text-align: left"><span>Điểm trung bình tích luỹ (hệ 4): {{parseFloat(dt.DiemTBTinChiTichLuy).toFixed(2)}}</span></td>
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
            </template>

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
        MaSinhVien:""
      },
      IDDot:undefined,
      datahk:[],
      Hoten:undefined,
      count:0
    }
  },
  created() {
    localStorage.setItem('link',this.$route.fullPath);
  },

  methods:{
    countnumber(){
      let dem=this.count;
      this.count = dem+1;
      dem=this.count
      return dem;
    },
    getPreviousItemsCount(dtIndex) {
      let count = 0;
      for (let i = 0; i < dtIndex; i++) {
        count += this.data[i].items.length;
      }
      return count;
    },
    groupData(data){
      const groupedData={};// create new object
      // Iterate through the data

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
              DiemTBThuongKy: item.DiemTBThuongKy,
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
              STT:this.countnumber(),
              DiemThi2:item.DiemThi2,
              MaLopHocPhan:item.MaLopHocPhan,
              MaMonHoc:item.MaMonHoc,
              SoTinChi:item.SoTinChi,
              TenMonHoc:item.TenMonHoc,
              DiemThuongKy1:item.DiemThuongKy1,
              DiemThuongKy2:item.DiemThuongKy2,
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
              this.data =rs.data.records
              const sortedMaHocPhan = this.data.sort((a,b)=>{
                const termA= a.MaHocPhan
                const termB = b.MaHocPhan
                if(termA <termB) return -1;
                if(termA>termB) return 1;
                return 0;
              });
              this.data=sortedMaHocPhan
              this.Hoten = this.data[0].HoDem + " " + this.data[0].Ten
              console.log(this.data)
              this.data =this.groupData(this.data)
              for (let i=0;i<this.data.length;i++){
                  this.new_data[i] = this.data[i].TenDot
              }
              console.log(this.data)
              const sortedDatare = this.data.sort((a,b)=>{
                const[termA,yearA] = a.TenDot.split(" ")
                const[termB,yearB] = b.TenDot.split(" ")
                if(yearA<yearB) return -1;
                if(yearA>yearB) return 1;
                if(termA <termB) return -1;
                if(termA>termB) return 1;
                return 0;
              });
              this.data=sortedDatare;
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
    handleSearch(e){
      e.preventDefault();
      this.data=[]
      this.datahk=[]
      this.new_data=[]
      this.Hoten=undefined
      if(this.params.MaSinhVien !=="") {
        this.getKetQuaHocTap();
      }
      console.log(this.params);
    },
    resetButton(){
      this.params = {
        MaSinhVien:"",
      }
      this.data=[]
      this.datahk=[]
      this.new_data=[]
      this.Hoten=undefined
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