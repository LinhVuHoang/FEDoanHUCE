<template>
  <div>

    <div style="margin-top: 50px" class="col-md-12 container" >
      <label>Lớp: {{this.data[0].MaLopHocPhan}}</label><br>
      <label>Môn: {{this.data[0].TenMonHoc}}</label>
      <div class="table-wrap">
        <table class="table table-bordered" style="--bs-table-bg: dodgerblue; border-right: black">
          <thead>
          <tr>
            <th style="color: white">Mã Sinh Viên</th>
            <th style="color: white">Tên Sinh Viên</th>
            <th style="color: white">Lớp Học</th>
            <th style="color: white">Ngày Sinh</th>
          </tr>
          </thead>
          <tbody>
          <template >
              <tr v-for="sv in data">
                <td >
                  <span style="color: blue">{{sv.MaSinhVien}}</span>
                </td>
                <td >
                  <span style="color: blue">{{sv.HoDem}} {{sv.Ten}}</span>
                </td>
                <td >
                  <span style="color: blue">{{sv.TenLopHoc}}</span>
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
export default {
  data(){
    return{
      data:[],
      totalRecords: undefined,
      totalPages:undefined,
      TenPhong:undefined,
      new_data:[],
      datahk:[]
    }
  },
  created() {
    this.getDSSV(this.$route.params.MaLopHocPhan)

  },
  methods:{
    async getDSSV(MaLopHocPhan){
      await TKBHocKyService.getdssv(MaLopHocPhan).then(
          rs=>{
            try{
              this.data=[]
              this.data =  rs.data.result.recordset;
              console.log(this.data)
             // this.totalRecords = rs.data.filtered;
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
  border:1px solid black;

}

.table-bordered td {
  border:1px solid black;
}
</style>