<template style="font-family: Tahoma">
  <div>
    <a-card>
      <div>
        <a-row type="flex" align="middle">
          <img style="width: 100%" src="/../images/banner.png" alt="Banner"/>
        </a-row>
        <a-form @submit="handleSearch" class="product__search-form">
          <a-row>
            <a-col :span="14" style="padding-right: 20px">
              <a-form-item >
                <a-input-search v-model="params.search"  placeholder="Mã môn/ Tên môn/ Mã Lớp">
                  <a-icon type="search"/>
                </a-input-search>
              </a-form-item>
            </a-col>
            <a-col :span="7" style="padding-right: 20px">
              <a-form-item>
                <a-select v-model="params.hocky"  :placeholder="datahk[0].TenDot">
                  <a-select-option v-for="(item, index) in datahk" :value="item.TenDot" :key="index">{{ item.TenDot }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="3" style="float: right">
              <a-form-item >
                <a-date-picker
                    format="DD-MM-YYYY"
                    v-model="this.params.ngaythi"
                    @change="getDate"
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
        <div>
          <a-radio-group style="float: right" @change="handleSearch" v-model="params.orderby">
            <a-radio value="TuTiet">Sắp xếp theo thứ tiết</a-radio>
            <a-radio value="MaMonHoc">Sắp xếp môn học</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div style="margin-top: 50px" class="col-md-12 container" >
        <div class="table-wrap">
          <table class="table table-bordered" style="--bs-table-bg: #2a8ecd; border-right: #5c5d62;font-family: Tahoma">
            <thead>
            <tr>
              <th style="color: #f6fffa">MaMH</th>
              <th style="color: #f6fffa">Tên MH</th>
              <th style="color: #f6fffa">Mã lớp</th>
              <th style="color: #f6fffa">STC</th>
              <th style="color: #f6fffa">Thứ</th>
              <th style="color: #f6fffa">Tiết BD</th>
              <th style="color: #f6fffa">ST</th>
              <th style="color: #f6fffa">Phòng</th>
              <th style="color: #f6fffa">Giảng viên</th>
              <th style="color: #f6fffa">Ngày Thi</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="(dt, index) in data">
              <template v-for="(dtc, dtcIndex) in dt.items">
                <tr>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                    <span style="color: #002a5c">{{ dt.MaMonHoc }}</span>
                  </td>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                    <span style="color: #002a5c">{{ dt.TenMonHoc }}</span>
                  </td>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                    <span style="color: #002a5c">{{ dt.MaLopHoc }}</span>
                  </td>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                    <span style="color: #002a5c">{{ dt.SoTinChi }}</span>
                  </td>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                    <span style="color: #002a5c">{{ dt.Thu }}</span>
                  </td>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                    <span style="color: #002a5c">{{ dt.TuTiet }}</span>
                  </td>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                    <span style="color: #002a5c">{{ dt.DenTiet - dt.TuTiet + 1 }}</span>
                  </td>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
              <span style="color: #002a5c" v-if="dt.MaPhong">
                <span style="color: #002a5c">{{ dt.MaPhong }}</span>
              </span>
                    <span v-else></span>
                  </td>
<!--                  <td>-->
<!--                    <a-tooltip  class="ant-tooltip-open">-->
<!--                      <template slot="title">-->
<!--                        <div id="tooltip1">-->
<!--                          <p id="tooltip1"><strong>Tên Giảng viên:</strong> {{ dtc.HoDem && dtc.Ten ? dtc.HoDem + ' ' + dtc.Ten : '' }} ahahahaha</p>-->
<!--                          <p id="tooltip1"><strong >Số điện thoại:</strong> {{ dtc.SoDienThoai || '' }}</p>-->
<!--                          <p id="tooltip1"><strong>Email:</strong> {{ dtc.Email || ''}}</p>-->
<!--                        </div>-->
<!--                      </template>-->
<!--                <span style="color: blue" v-if="dtc.HoDem && dtc.Ten">-->
<!--                <span>-->
<!--                  {{dtc.HoDem+ " " +dtc.Ten}}-->
<!--                </span>-->
<!--              </span>-->
<!--                    <span v-else></span>-->
<!--                    </a-tooltip>-->
<!--                  </td>-->
                  <td>
                    <a-popover>
                      <template slot="title">
                        <p style="padding-top: 15px">
                          <svg width="15px" height="15px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>profile_round [#1346]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-380.000000, -2119.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M338.083123,1964.99998 C338.083123,1962.79398 336.251842,1960.99998 334,1960.99998 C331.748158,1960.99998 329.916877,1962.79398 329.916877,1964.99998 C329.916877,1967.20599 331.748158,1968.99999 334,1968.99999 C336.251842,1968.99999 338.083123,1967.20599 338.083123,1964.99998 M341.945758,1979 L340.124685,1979 C339.561214,1979 339.103904,1978.552 339.103904,1978 C339.103904,1977.448 339.561214,1977 340.124685,1977 L340.5626,1977 C341.26898,1977 341.790599,1976.303 341.523154,1975.662 C340.286989,1972.69799 337.383888,1970.99999 334,1970.99999 C330.616112,1970.99999 327.713011,1972.69799 326.476846,1975.662 C326.209401,1976.303 326.73102,1977 327.4374,1977 L327.875315,1977 C328.438786,1977 328.896096,1977.448 328.896096,1978 C328.896096,1978.552 328.438786,1979 327.875315,1979 L326.054242,1979 C324.778266,1979 323.773818,1977.857 324.044325,1976.636 C324.787453,1973.27699 327.107688,1970.79799 330.163906,1969.67299 C328.769519,1968.57399 327.875315,1966.88999 327.875315,1964.99998 C327.875315,1961.44898 331.023403,1958.61898 334.733941,1959.04198 C337.422678,1959.34798 339.650022,1961.44698 340.05323,1964.06998 C340.400296,1966.33099 339.456073,1968.39599 337.836094,1969.67299 C340.892312,1970.79799 343.212547,1973.27699 343.955675,1976.636 C344.226182,1977.857 343.221734,1979 341.945758,1979 M337.062342,1978 C337.062342,1978.552 336.605033,1979 336.041562,1979 L331.958438,1979 C331.394967,1979 330.937658,1978.552 330.937658,1978 C330.937658,1977.448 331.394967,1977 331.958438,1977 L336.041562,1977 C336.605033,1977 337.062342,1977.448 337.062342,1978" id="profile_round-[#1346]"> </path> </g> </g> </g> </g></svg>
                          <strong>Thông tin giảng viên</strong></p>
                      </template>
                      <template slot="content">
                      <p><strong>Tên giảng viên:</strong> {{ dtc.HoDem && dtc.Ten ? dtc.HoDem + ' ' + dtc.Ten : '-' }}</p>
                      <p><strong>Số điện thoại:</strong> {{ dtc.SoDienThoai || '-' }}</p>
                      <p><strong>Email:</strong> {{ dtc.Email || '-' }}</p>
                      </template>
                <span style="color: #002a5c" v-if="dtc.HoDem && dtc.Ten">
                   <span>
                   {{ dtc.HoDem + ' ' + dtc.Ten }}
                  </span>
      </span>

                    </a-popover>
                  </td>
                  <td v-if="dtcIndex==0" :rowspan="dt.items.length">
                    <span style="color: #002a5c">{{ dt.NgayThi.split("T")[0].split("-")[2]+"-"+dt.NgayThi.split("T")[0].split("-")[1]+"-"+dt.NgayThi.split("T")[0].split("-")[0] }}</span>
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
                :current="this.params.page"
                :default-current="this.params.limit"
                :total="this.totalRecords"
                show-size-changer
                @showSizeChange="onShowSizeChange"
                @change="onChange"
            />
          </div>
        </div>
      </div>
    </a-card>


  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.js"></script>
<script>
import TKBHocKyService from "@/service/TKBHocKyService";
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
        page:1,
        limit:10,
        search:"",
        hocky:undefined,
        orderby:"MaMonHoc",
        ngaythi:undefined,
      },
      IDDot:undefined,
      datahk:[],
      TenDayDuDot:undefined
    }
  },
  created() {
    localStorage.setItem('link',this.$route.fullPath);
    this.getTKBLichThi()
  },
  methods:{
    // disabledDate(current) {
    //   const startDate = moment('2024-01-01', 'YYYY-MM-DD');
    //   const endDate = moment('2024-06-30', 'YYYY-MM-DD');
    //
    //   // Ẩn các ngày trước ngày bắt đầu hoặc sau ngày kết thúc
    //   return current && (current < startDate || current > endDate);
    // },
    // getDateDayDu(){
    //   for(let i=0;i<this.datahk.length;i++){
    //     if(this.datahk[i].TenDot==this.params.hocky){
    //       this.TenDayDuDot=this.datahk[i].TenDayDu
    //     }
    //   }
    //   console.log(this.TenDayDuDot)
    // },
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
    getDate(date) {
      var event = moment(date._d).format('YYYY-MM-DDTHH:mm:ss.sssZ');
      var timez = moment.utc(event).tz("Asia/Ho_Chi_Minh").format('YYYY-MM-DD');
      this.params.ngaythi = timez;
      this.params.hocky=undefined
      console.log(this.params.ngaythi);
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
      if (this.params.hocky !=undefined){
        this.params.ngaythi=undefined
      }
      if(this.params.hocky==undefined && this.params.ngaythi==undefined) {
        this.params.hocky = this.datahk[0].TenDot
        console.log(this.params.hocky)
      }
      await TKBHocKyService.getTKBLichThi(this.params).then(
          rs=>{
            try{
              this.data=[]
              this.data =  this.groupDataByTenMonHocAndMaLop(rs.data.records)
              console.log(this.data)
              if(rs.data.filtered >0) {
                this.totalRecords = rs.data.filtered;
              }else {
                this.totalRecords=0

              }
              console.log(this.data)
            }catch (e){
              console.log(e)
              console.log("Có lỗi")
              this.$toast.open({
                message: 'Không có dữ liệu',
                type: 'warning',
                // all of other options may go here
              });
              this.totalRecords=0
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
        orderby:"MaMonHoc",
        ngaythi:undefined
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
#tooltip1{
  max-width: 600px !important;
  // overflow: hidden !important; /* Điều chỉnh kích thước theo ý muốn */
  white-space: nowrap !important;
}

</style>