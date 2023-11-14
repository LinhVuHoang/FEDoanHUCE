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
              <th id="header1">Tiết</th>
              <th id="header1" v-for="(day,index) in datelist" v-bind:key="index">{{day.split('-')[2]}}/{{day.split('-')[1]}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, index) in 15" :key="index">
              <td id="cell">{{ index + 1 }}</td>
              <td v-if="index>=0 && index<=2">
                hello
              </td>
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
        NgayBatDau:"2022-11-13",
        NgayKetThuc:"2022-11-25"
      },
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
      const start = new Date(startDate)
      const end = new Date(endDate)
      const dateArray=[]
      let currentDate=start
      while(currentDate<=end){
        dateArray.push(currentDate.toISOString().split('T')[0])
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dateArray
    },
    async getPhongHocLS(){
      await PhongHocService.getLichSuPH(this.params).then(
          rs=>{
            try {
              this.data = []
              this.data = rs.data.records
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