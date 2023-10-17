<template>
  <div>
    <a-card>
      <div>
        <a-form @submit="handleSearch" class="product__search-form">
          <a-row>
            <a-col :span="14" style="padding-right: 20px">
              <a-form-item >
                <a-input-search v-model="params.search"  placeholder="Mã môn/ Tên môn/ Mã Lớp">
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
        <div>
          <a-radio-group style="float: right" @change="handleSearch" v-model="params.orderby">
            <a-radio value="TuTiet">Sắp xếp theo thứ tiết</a-radio>
            <a-radio value="MaMonHoc">Sắp xếp môn học</a-radio>
          </a-radio-group>
        </div>
      </div>
    </a-card>
    <div style="margin-top: 50px" class="col-md-12 container" >
      <div class="table-wrap">
        <table class="table table-bordered" style="--bs-table-bg: dodgerblue; border-right: black">
          <thead>
          <tr>
            <th style="color: white">MaMH</th>
            <th style="color: white">Tên MH</th>
            <th style="color: white">Mã lớp</th>
            <th style="color: white">STC</th>
            <th style="color: white">Thứ</th>
            <th style="color: white">Tiết BD</th>
            <th style="color: white">ST</th>
            <th style="color: white">Phòng</th>
            <th style="color: white">Giảng viên</th>
            <th style="color: white">Số điện thoại</th>
            <th style="color: white">Email</th>
            <th style="color: white">Ngày Thi</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(dt, index) in data">
            <template v-for="(dtc, dtcIndex) in dt.items">
              <tr>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                  <span style="color: blue">{{ dt.MaMonHoc }}</span>
                </td>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                  <span style="color: blue">{{ dt.TenMonHoc }}</span>
                </td>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                  <span style="color: blue">{{ dt.MaLopHoc }}</span>
                </td>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                  <span style="color: blue">{{ dt.SoTinChi }}</span>
                </td>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                  <span style="color: blue">{{ dt.Thu }}</span>
                </td>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                  <span style="color: blue">{{ dt.TuTiet }}</span>
                </td>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                  <span style="color: blue">{{ dt.DenTiet - dt.TuTiet + 1 }}</span>
                </td>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
              <span style="color: blue" v-if="dt.MaPhong">
                <span style="color: blue">{{ dt.MaPhong }}</span>
              </span>
                  <span v-else></span>
                </td>
                <td>
                <span style="color: blue" v-if="dtc.HoDem && dtc.Ten">
                <span>
                  {{dtc.HoDem+ " " +dtc.Ten}}
                </span>
              </span>
                  <span v-else></span>
                </td>
                <td>
                <span style="color: blue" v-if="dtc.SoDienThoai">
                <span>
                  {{dtc.SoDienThoai}}
                </span>
              </span>
                  <span v-else></span>
                </td>
                <td>
                <span style="color: blue" v-if="dtc.Email">
                <span>
                  {{dtc.Email}}
                </span>
              </span>
                  <span v-else></span>
                </td>
                <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                  <span style="color: blue">{{ dt.NgayThi.split("T")[0].split("-")[2]+"-"+dt.NgayThi.split("T")[0].split("-")[1]+"-"+dt.NgayThi.split("T")[0].split("-")[0] }}</span>
                </td>
<!--                <td>-->
<!--                  <span style="color: blue" v-if="dtc.HoDem != null && dtc.Ten !=null">{{ dtc.HoDem + ' ' + dtc.Ten }}</span>-->
<!--                </td>-->
<!--                <td>-->
<!--              <span style="color: blue" v-for="(week) in getMaxWeeks(dtc.RankWeekList)">-->
<!--                &lt;!&ndash; Kiểm tra nếu giá trị tồn tại và lớn hơn 10 &ndash;&gt;-->
<!--                <span v-if="week == 10">-</span>-->
<!--                &lt;!&ndash; Nếu không, hiển thị dấu "-" &ndash;&gt;-->
<!--                <span v-else>{{ week }}</span>-->
<!--              </span>-->
<!--                </td>-->

<!--                <td v-if="dtcIndex==0" :rowspan="dt.items.length"><router-link class="button" :to="'/DSSV/' +dt.MaLopHocPhan+'/'+dt.MaLopHoc+'/'+params.hocky">-->

<!--                  <a-icon style="font-size: 25px;color: #007bff" type="unordered-list"/>-->
<!--                </router-link></td>-->

              </tr>

            </template>
          </template>
          </tbody>
        </table>

        <div style="padding-top: 15px">
          <a-pagination
              :default-current="this.params.limit"
              :total="this.totalRecords"
              show-size-changer
              @showSizeChange="onShowSizeChange"
              @change="onChange"
          />
        </div>
      </div>
    </div>

  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.js"></script>
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
      params:{
        page:1,
        limit:10,
        search:"",
        hocky:undefined,
        orderby:"MaMonHoc"
      },
      IDDot:undefined,
      datahk:[]
    }
  },
  created() {
    localStorage.setItem('link',this.$route.fullPath);
    this.getTKBLichThi()

  },
  methods:{

    groupDataByTenMonHocAndMaLop(data) {
      const groupedData = {};

      // Iterate through the data
      for (const item of data) {
        const key = `${item.MaMonHoc}-${item.MaLopHocPhan}-${item.TenMonHoc}-${item.MaLopHoc}-${item.MaPhong}-${item.SoTinChi}-${item.SoTinChi}-${item.Thu}-${item.TuTiet}-${item.DenTiet}-${item.NgayThi}`;
        // If the key doesn't exist in groupedData, create it with an empty object
        if (!groupedData[key]) {
          groupedData[key] = {
            MaMonHoc:item.MaMonHoc,
            MaLopHocPhan:item.MaLopHocPhan,
            TenMonHoc: item.TenMonHoc,
            MaLopHoc: item.MaLopHoc,
            MaPhong:item.MaPhong,
            SoTinChi:item.SoTinChi,
            Thu:item.Thu,
            TuTiet:item.TuTiet,
            DenTiet:item.DenTiet,
            NgayThi:item.NgayThi,
            items: [],
            // Add other properties here as needed
          };
        }

        // Push the item to the corresponding key in groupedData
        groupedData[key].items.push({
          HoDem:item.HoDem,
          Ten:item.Ten,
          SoDienThoai:item.SoDienThoai,
          Email:item.Email
          // Add other properties here as needed
        });
      }
      // Convert the grouped data object to an array
      const result = Object.values(groupedData);
      return result;
    },
    onShowSizeChange(current, pageSize) {
      this.params.limit = pageSize;
      this.params.page = current;
      this.getTKBLichThi();
    },
    onChange(page, pageSize) {
      this.params.page = page;
      this.params.limit = pageSize;
      this.getTKBLichThi();
    },
    handleSearch(e){
      e.preventDefault();
      this.params.page = 1;
      console.log(this.params);
      this.getTKBLichThi();
    },
    async getTKBLichThi(){
      await this.getTKBDotHK()
      if (this.params.hocky ==undefined){
        this.params.hocky = this.datahk[2].TenDot
        console.log(this.params.hocky)
      }
      await TKBHocKyService.getTKBLichThi(this.params).then(
          rs=>{
            try{
              this.data=[]
              this.data =  this.groupDataByTenMonHocAndMaLop(rs.data.records)
              this.totalRecords = rs.data.filtered;
              console.log(this.data)
            }catch (e){
              console.log(e)
              console.log("Có lỗi")
            }
          }
      )
    },
    resetButton(){
      this.params = {
        page:1,
        limit:10,
        search:"",
        hocky:undefined,
        orderby:"MaMonHoc"
      }
      this.getTKBLichThi();
    },

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