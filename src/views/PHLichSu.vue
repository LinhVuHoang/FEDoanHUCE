<template>
  <div>
    <a-card>
      <a-row type="flex" align="middle">
        <img style="width: 100%" src="/images/banner.png" alt="Banner"/>
      </a-row>
      <div>
        <a-form @submit="handleSearch" class="product__search-form">
          <a-row>
            <a-col :span="18" style="padding-right: 20px">
              <a-form-item >
                <a-input-search v-model="params.MaPhong"  placeholder="Mã Phòng">
                  <a-icon type="search"/>
                </a-input-search>
              </a-form-item>
            </a-col>
            <a-col :span="3" style="padding-right: 20px">
              <a-form-item >
                <a-date-picker
                    format="DD-MM-YYYY"
                    v-model="this.params.NgayBatDau"
                    @change="getDate"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3" style="float: right">
              <a-form-item >
                <a-date-picker
                    format="DD-MM-YYYY"
                    v-model="this.params.NgayKetThuc"
                    @change="getDate"
                />
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
        <div class="table-wrap" style="margin-top: 20px">

          <table class="table table-bordered" style="--bs-table-bg: #f3f7f9; text-align: center;line-height:1.42857143;">
            <thead >
            <tr>
              <th style="width: 50px!important; max-width: 50px!important;" id="header11">Tiết</th>
              <th id="header1" v-for="(day,index) in datelist" v-bind:key="index">{{day.split('-')[2]}}/{{day.split('-')[1]}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, rowIndex) in 15" :key="rowIndex">
              <td id="cell1">{{ rowIndex + 1 }}</td>
              <template v-for="(column,index) in data">
<!--                cố định các ô chưa có dữ liệu trước-->
                <td v-bind:key="index" v-if="!column.isRowUsed.has(rowIndex)" id="cell2"></td>
                <template v-for="(item) in column.items">
                  <template v-if="rowIndex === item.TuTiet">
                  <!-- Check if the current row index is within the range of TuTiet and DenTiet -->
                  <td v-if="item.IsType==0" style="background-color: yellow" :rowspan="item.DenTiet - item.TuTiet+1" id="cell2">
                    <span>Tiết: {{item.TuTiet+1}} - {{item.DenTiet+1}}</span><br>
                    <span>Khoá: {{item.TenKhoaHoc}}</span><br>
                    <span>Mã Môn: {{item.MaMonHoc}}</span><br>
                    <span>Tên Môn: {{item.TenMonHoc}}</span><br>
                    <span>Tên Lớp: {{item.TenLopHoc}}</span><br>
                    <span>Tên Lớp: {{column.NgayBatDau}}</span><br>
                  </td>
                    <td v-else-if="item.IsType==1" style="background-color: green" :rowspan="item.DenTiet - item.TuTiet+1" id="cell2">
                      <span>Tiết: {{item.TuTiet+1}} - {{item.DenTiet+1}}</span><br>
                      <span>Khoá: {{item.TenKhoaHoc}}</span><br>
                      <span>Mã Môn: {{item.MaMonHoc}}</span><br>
                      <span>Tên Môn: {{item.TenMonHoc}}</span><br>
                      <span>Tên Lớp: {{item.TenLopHoc}}</span><br>
                      <span>Tên Lớp: {{column.NgayBatDau}}</span><br>
                    </td>
                    <td v-else-if="item.IsType==2" style="background-color: cornflowerblue" :rowspan="item.DenTiet - item.TuTiet+1" id="cell2">
                      <span>Tiết: {{item.TuTiet+1}} - {{item.DenTiet+1}}</span><br>
                      <span>Khoá: {{item.TenKhoaHoc}}</span><br>
                      <span>Mã Môn: {{item.MaMonHoc}}</span><br>
                      <span>Tên Môn: {{item.TenMonHoc}}</span><br>
                      <span>Tên Lớp: {{item.TenLopHoc}}</span><br>
                      <span>Tên Lớp: {{column.NgayBatDau}}</span><br>
                    </td>
                  </template>
                </template>

                </template>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import PhongHocService from "@/service/PhongHocService";
import moment from 'moment'
export default {
  data(){
    return{
      data:[],
      totalRecords: undefined,
      totalPages:undefined,
      TenPhong:undefined,
      new_data:[],
      params:{
        MaPhong:"209.H1",
        NgayBatDau:"2022-11-1",
        NgayKetThuc:"2022-11-5"
      },
      StartDay:undefined,
      EndDay:undefined,
      IDDot:undefined,
      datahk:[],
      Hoten:undefined,
      count:0,
      datelist:[]
    }
  },
  created() {
    localStorage.setItem('link',this.$route.fullPath);
    this.getPhongHocLS()
  },
  methods:{
    // tạo ra một list date từ ngày bắt đầu đến ngày kết thúc
    generateDateList(startDate,endDate){
      const start = moment(startDate)
      const end = moment(endDate)
      const dateArray=[]
      let currentDate=start
      console.log(currentDate)
      while(currentDate<=end){
        dateArray.push(currentDate.format('YYYY-MM-DD'))
        currentDate.add(1,'days')
      }
      console.log(dateArray)
      return dateArray
    },
    groupData(data){
      const groupedData={};// create new object
      // Iterate through the data

      for (const item of data){
        const key=`${item.MaPhong}-${item.TenPhong}-${item.NgayBatDau}-${item.NgayKetThuc}-${item.NgayBatDauHoc}-${item.NgayKetThucHoc}`
        // If the key doesn't exist in groupedData, create it with an empty object
        if(!groupedData[key]) {
          groupedData[key] = {
            MaPhong:item.MaPhong,
            TenPhong:item.TenPhong,
            NgayBatDau:item.NgayBatDau.split('T')[0],
            NgayKetThuc: item.NgayKetThuc.split('T')[0],
            NgayBatDauHoc:item.NgayBatDauHoc.split('T')[0],
            NgayKetThucHoc:item.NgayKetThucHoc.split('T')[0],
            isRowUsed:new Set(),
            items: []
          }
        }
        for (let i=item.TuTiet-1;i<item.DenTiet;i++){
          groupedData[key].isRowUsed.add(i)
        }
        groupedData[key].items.push({
          DenTiet:item.DenTiet-1,
          IDKhoaHoc:item.IDKhoaHoc,
          IsType:item.IsType,
          MaHocPhan:item.MaHocPhan,
          MaLopHoc:item.MaLopHoc,
          MaLopHocPhan:item.MaLopHocPhan,
          MaMonHoc:item.MaMonHoc,
          TenKhoaHoc:item.TenKhoaHoc,
          TenLopHoc:item.TenLopHoc,
          TenMonHoc:item.TenMonHoc,
          Thu:item.Thu,
          TuTiet:item.TuTiet-1
        })
      }
      // Convert the grouped data object to an array
      const result = Object.values(groupedData);
      return result
    },
    async getPhongHocLS(){
      await PhongHocService.getLichSuPH(this.params).then(
          rs=>{
            try {
              this.data = []
              this.data = this.groupData(rs.data.records)
              this.StartDay=this.params.NgayBatDau;
              this.EndDay=this.params.NgayKetThuc;
              this.datelist=this.generateDateList(this.params.NgayBatDau,this.params.NgayKetThuc)
              console.log(this.data)
            }catch (e) {
              console.log(e)
              console.log("co loi")
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
td {
  border-right: 1px solid #ddd;
}
#header1{
  color:#1da1f6;vertical-align:middle;white-space: nowrap;
}
#header11{
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
#cell2{
  //width: 50px!important;
  //height: 50px!important;
  //max-width: 500px !important;
  //max-height: 250px !important;
  padding:5px;
  text-align: center;
  vertical-align: center;
  border:1px solid #bdd6e9;
  white-space: nowrap;
}
#cell1{
  //width: 50px!important;
  //max-width: 50px!important;
  padding: 10px;
  border:1px solid #bdd6e9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}
.limited-width {
  width: 50px!important;
  max-width: 100px!important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>