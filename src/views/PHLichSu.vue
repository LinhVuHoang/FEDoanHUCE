<template style="font-family: Tahoma">
  <div>
    <a-card>
      <a-row type="flex" align="middle">
        <img style="width: 100%" src="/../images/banner.png" alt="Banner"/>
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
                    @change="getDate1"
                    placeholder="Ngày bắt đầu"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3" style="float: right">
              <a-form-item >
                <a-date-picker
                    format="DD-MM-YYYY"
                    v-model="this.params.NgayKetThuc"
                    @change="getDate2"
                    placeholder="Ngày kết thúc"
                />
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
        <a-row>
          <a-col :xs="24" :sm="24" :md="4" :lg="4" class="bar" id="cell6" style="width: 50px; height: 30px;"></a-col>
          <a-col id="chuthich" :xs="24" :sm="24" :md="4" :lg="4" class="bar" style="width: 5%; height: 50px;">Lịch học</a-col>
          <a-col :xs="24" :sm="24" :md="4" :lg="4" class="bar" id="cell5" style="width: 50px; height: 30px;"></a-col>
          <a-col id="chuthich" :xs="24" :sm="24" :md="4" :lg="4" class="bar" style="width: 5%; height: 50px;">Lịch thi</a-col>
          <a-col :xs="24" :sm="24" :md="4" :lg="4" class="bar" id="cell7" style="width: 50px; height: 30px;"></a-col>
          <a-col id="chuthich" :xs="24" :sm="24" :md="4" :lg="4" class="bar" style="width: 15%; height: 50px;">Lịch xin phòng tự do</a-col>
        </a-row>
        <div style="border-bottom: 1px solid #b3b7bb; padding-bottom: 10px;margin-top: 20px">
          <h5 v-if="tenphong" style="vertical-align: baseline; color: #667580; line-height: 18px; font-family: Tahoma !important; margin: 0;">Lịch phòng học {{tenphong}} </h5>
          <h5 v-else style="vertical-align: baseline; color: #667580; line-height: 18px; font-family: Tahoma !important; margin: 0;">Lịch phòng học </h5>
        </div>
        <div class="table-wrap" style="margin-top: 20px">

          <table v-if="this.data.length>0" class="table table-bordered" style="--bs-table-bg: #f3f7f9; text-align: center;line-height:1.42857143;">
            <thead >
            <tr>
              <th style="width: 50px!important; max-width: 50px!important;text-align: center" id="header11">Tiết</th>
              <th id="header1" v-for="(day,index) in datelist" v-bind:key="index">{{day.split('-')[2]}}/{{day.split('-')[1]}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, rowIndex) in 15" :key="rowIndex">
              <td id="cell1">{{ rowIndex + 1 }}</td>
              <template v-for="(column,index) in data">
<!--                cố định các ô chưa có dữ liệu trước-->
                <td v-bind:key="index" v-if="!column.isRowUsed.has(rowIndex)" id="cell"></td>
                <template v-for="(item) in column.items">
                  <template v-if="rowIndex === item.TuTiet">
                  <!-- Check if the current row index is within the range of TuTiet and DenTiet -->
                  <td v-if="item.IsType==0" style="background-color: yellow" :rowspan="item.DenTiet - item.TuTiet+1" id="cell2">
                    <span>Tiết: {{item.TuTiet+1}} - {{item.DenTiet+1}}</span><br>
                    <span>Khoá: {{item.TenKhoaHoc}}</span><br>
                    <span>Mã Môn: {{item.MaMonHoc}}</span><br>
                    <span>Tên Môn: {{item.TenMonHoc}}</span><br>
                    <span>Tên Lớp: {{item.TenLopHoc}}</span><br>

                  </td>
                    <td v-else-if="item.IsType==1" style="background-color: green" :rowspan="item.DenTiet - item.TuTiet+1" id="cell3">
                      <span>Tiết: {{item.TuTiet+1}} - {{item.DenTiet+1}}</span><br>
                      <span>Khoá: {{item.TenKhoaHoc}}</span><br>
                      <span>Mã Môn: {{item.MaMonHoc}}</span><br>
                      <span>Tên Môn: {{item.TenMonHoc}}</span><br>
                      <span>Tên Lớp: {{item.TenLopHoc}}</span><br>

                    </td>
                    <td v-else-if="item.IsType==2" style="background-color: cornflowerblue" :rowspan="item.DenTiet - item.TuTiet+1" id="cell4">
                      <span>Tiết: {{item.TuTiet+1}} - {{item.DenTiet+1}}</span><br>
                      <span>Khoá: {{item.TenKhoaHoc}}</span><br>
                      <span>Mô tả: {{item.TenMonHoc}}</span><br>
                      <span>Chi Tiết: {{item.TenLopHoc}}</span><br>

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
import moment from 'moment-timezone';
export default {
  data(){
    return{
      data:[],
      totalRecords: undefined,
      totalPages:undefined,
      TenPhong:undefined,
      new_data:[],
      params:{
        MaPhong:"",
        NgayBatDau:"",
        NgayKetThuc:""
      },
      StartDay:undefined,
      EndDay:undefined,
      IDDot:undefined,
      datahk:[],
      Hoten:undefined,
      count:0,
      datelist:[],
      tenphong:undefined
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
    readlData(data,datelist){
      const resultArray=[]
      for (const item of datelist){
        const dayObject = {}
        const key=`${item}`
        dayObject[key]={
          NgayBatDau:item,
          NgayKetThuc:item,
          NgayBatDauHoc:item,
          NgayKetThuchoc:item,
          isRowUsed:new Set()
        }
        for (const [index,item1] of data.entries()){
          if(item1.NgayBatDau == item){
              resultArray.push(item1)
            break;
          }else if (index === data.length-1 && item1.NgayBatDau !=item){
              resultArray.push(Object.values(dayObject)[0])
            break;
          }
        }
      }
      console.log(resultArray)
      return resultArray;
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
              this.tenphong=this.data[0].MaPhong
              this.datelist=this.generateDateList(this.params.NgayBatDau,this.params.NgayKetThuc)
              this.data= this.readlData(this.data,this.datelist)
              console.log(this.tenphong)
              console.log(this.data)
            }catch (e) {
              console.log(e)
              console.log("co loi")
              this.data=[]
              console.log(this.data)
            }
          }
      )
    },
    handleSearch(e){
      e.preventDefault();
      console.log(this.params);
      this.getPhongHocLS();
    },
    resetButton(){
      this.params = {
          MaPhong:"",
          NgayBatDau:"",
          NgayKetThuc:""
      }
      this.tenphong=undefined;
      this.getPhongHocLS();
    },
    getDate1(date) {
      var event = moment(date._d).format('YYYY-MM-DDTHH:mm:ss.sssZ');
      var timez = moment.utc(event).tz("Asia/Ho_Chi_Minh").format('YYYY-MM-DD');
      this.params.NgayBatDau = timez;
      console.log(this.params.ngaythi);
    },
    getDate2(date) {
      var event = moment(date._d).format('YYYY-MM-DDTHH:mm:ss.sssZ');
      var timez = moment.utc(event).tz("Asia/Ho_Chi_Minh").format('YYYY-MM-DD');
      this.params.NgayKetThuc = timez;
      console.log(this.params.ngaythi);
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
#chuthich{
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  margin-left: 10px;
}
#header1{
  color:#1da1f6;vertical-align:middle;white-space: nowrap;
  min-width: 180px !important;
}
#header11{
  color:#1da1f6;vertical-align:center;white-space: nowrap;
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
  //width: 100px!important;
  //height: 50px!important;
  //max-width: 500px !important;
  //max-height: 250px !important;
  padding:5px;
  text-align: center;
  vertical-align: center;
  border:1px solid #bdd6e9;
  white-space: nowrap;
  background-image: linear-gradient(to bottom, #fcfdef 0%, #fcfdef 100%), linear-gradient(to bottom, #eff5a2 0%, #eff5a2 100%);
  background-clip: content-box, padding-box;
}
#cell5{
  //width: 100px!important;
  //height: 50px!important;
  //max-width: 500px !important;
  //max-height: 250px !important;
  padding:5px;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  background-image: linear-gradient(to bottom, #fcfdef 0%, #fcfdef 100%), linear-gradient(to bottom, #eff5a2 0%, #eff5a2 100%);
  background-clip: content-box, padding-box;
}
#cell3{
  //width: 100px!important;
  //height: 50px!important;
  //max-width: 500px !important;
  //max-height: 250px !important;
  padding:5px;
  text-align: center;
  vertical-align: center;
  border:1px solid #bdd6e9;
  white-space: nowrap;
  background-image: linear-gradient(to bottom, #eefefc 0%, #eefefc 100%), linear-gradient(to bottom, #71b19d 0%, #71b19d 100%);
  background-clip: content-box, padding-box;
}
#cell6{
  //width: 100px!important;
  //height: 50px!important;
  //max-width: 500px !important;
  //max-height: 250px !important;
  padding:5px;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;
  background-image: linear-gradient(to bottom, #eefefc 0%, #eefefc 100%), linear-gradient(to bottom, #71b19d 0%, #71b19d 100%);
  background-clip: content-box, padding-box;
}
#cell4{
  //width: 100px!important;
  //height: 50px!important;
  //max-width: 500px !important;
  //max-height: 250px !important;
  padding:5px;
  text-align: center;
  vertical-align: center;
  border:1px solid #bdd6e9;
  white-space: nowrap;
  background-image: linear-gradient(to bottom, #f0f9ff 0%, #f0f9ff 100%), linear-gradient(to bottom, #98caeb 0%, #98caeb 100%);
  background-clip: content-box, padding-box;
}
#cell7{
  //width: 100px!important;
  //height: 50px!important;
  //max-width: 500px !important;
  //max-height: 250px !important;
  padding:5px;
  text-align: center;
  vertical-align: center;
  border:1px solid #bdd6e9;
  white-space: nowrap;
  background-image: linear-gradient(to bottom, #f0f9ff 0%, #f0f9ff 100%), linear-gradient(to bottom, #98caeb 0%, #98caeb 100%);
  background-clip: content-box, padding-box;
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
.row {
  display: flex;
  overflow: auto; /* Tự động cuộn ngang nếu cần */
}

.bar {
  text-align: center;
  vertical-align: middle;
  padding-top: 5px;
  flex: 0 0 auto; /* Không thay đổi kích thước của item */
  white-space: nowrap; /* Ngăn chặn xuống dòng */
}

</style>