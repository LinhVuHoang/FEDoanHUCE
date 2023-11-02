<template>

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

<style scoped>

</style>