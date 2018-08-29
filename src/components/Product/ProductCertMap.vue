<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs6 md3 lg2>
          <span class="span-without-selectbox">기간조회</span>
          <date-picker v-model="start_date" :lang="lang" @change="changeSdate(`${start_date}`)"></date-picker>
        </v-flex>
        <v-flex d-flex xs6 md3 lg2>
          <date-picker v-model="end_date" :lang="lang" @change="changeEdate(`${end_date}`)"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox selectbox-with-date selectbox-top">
            <span>고객사</span>
            <select id="select1" name="searchType" v-model="company" class="form-control" size="1">
              <option value="all" selected>전체</option>
              <option v-for="company in companys" :key="company.code" :value="company.code">{{company.name_kr}}</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox selectbox-top">
            <span>태그타입</span>
            <select id="select1" name="searchType" v-model="tag_type" class="form-control" size="1">
              <option value="all" selected>전체</option>
              <option v-for="tag_type in tag_types" :key="tag_type.name_en" :value="tag_type.name_en">{{tag_type.name_kr}}</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox selectbox-top">
            <span>OS</span>
            <select id="select1" name="searchType" v-model="oss" class="form-control" size="1">
              <option value="all" selected>전체</option>
              <option v-for="o in os" :key="o.name_en" :value="o.name_en">{{o.name_kr}}</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox selectbox-top">
            <span>인증결과</span>
            <select id="select1" name="searchType" v-model="cert" class="form-control" size="1">
              <option value="all" selected>전체</option>
              <option v-for="cert in certs" :key="cert.name_kr" :value="cert.name_en">{{cert.name_kr}}</option>
            </select>
          </div>
        </v-flex>
      </v-layout>
      <div class="search-wrapper">
        <v-btn color="primary" @click="searchQuery()">검색</v-btn>
      </div>
    </div>
    <div class="map">
      <div class="map-header">
        <v-checkbox class="cluster" label="Cluster" v-model="clustering"></v-checkbox>
        <div class="v-datatable__actions">
          <span>per page :</span>
          <div class="v-datatable__actions__select">          
            <select v-model="pagination.rowsPerPage" @change="firstPageData()">
              <option value="500">500</option>
              <option value="1000">1,000</option>
              <option value="2000">2,000</option>
              <option value="5000">5,000</option>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
            </select>
          </div>
        </div>
      </div>
      <GmapMap
        :center="{lat: 35, lng: 118}"
        :zoom="5"
        map-type-id="roadmap"
        style="height: 750px"
      >
          <gmap-cluster v-if="clustering === true" :grid-size="50">
            <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            @click="center=m.position"
            />
          </gmap-cluster>
          <GmapMarker 
          v-else
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="center=m.position"
          />
          
      </GmapMap>
      <div class="map-bottom">
        <div class="total">전체건수 : <span class="total-result">{{pagination.total}}</span> 건</div>
        <div class="map-page">
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="6" @input="getDatas()"></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constant from "../../constant.js";

export default {
  mounted() {
    this.dateSet()
    this.query.date_start = this.start_date;
    this.query.date_finish = this.end_date;
    this.getDatas()
    this.getCompanys()
    // this.getTagTypes()
  },

  data() {
    return {
      // date picker
      start_date: '',
      end_date: '',
      company: 'all',
      tag_type: 'all',
      oss: 'all',
      cert: 'all',
      query: {
        company: 'all',
        tag_type: 'all',
        os: 'all',
        cert: 'all',
        search: '',
        date_start: '',
        date_finish: ''
      },
      lang: {
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        pickers: [
          "next 7 days",
          "next 30 days",
          "previous 7 days",
          "previous 30 days"
        ],
        placeholder: {
          date: "Select Date",
          dateRange: "Select Date Range"
        }
      },

      companys: [],
      tag_types: [
        {
          name_en: 'HOLOTAG_ONLY',
          name_kr: '홀로태그'
        },
        {
          name_en: 'HYBRIDTAG',
          name_kr: '하이브리드태그'
        },
        {
          name_en: 'RANDOMTAG',
          name_kr: '난수태그'
        },
        {
          name_en: 'SQRTAG',
          name_kr: 'SQR태그'
        },
      ],
      os: [
        {
          name_en: 'Android',
          name_kr: '안드로이드'
        },
        {
          name_en: 'iOS',
          name_kr: 'iOS'
        }
      ],
      certs: [
        {
          name_en: 'Genuine',
          name_kr: '정품'
        },
        {
          name_en: 'Counterfeit',
          name_kr: '가품'
        },
        {
          name_en: 'Revalidation',
          name_kr: '재인증'
        },
        {
          name_en: 'Exprired',
          name_kr: '기간만료'
        },
        {
          name_en: 'Invalid',
          name_kr: '무효한코드'
        },
        {
          name_en: 'Retry',
          name_kr: '재촬영'
        },
        {
          name_en: 'OverCert',
          name_kr: '인증초과'
        },
        {
          name_en: 'DifferentQR',
          name_kr: '이용안내 QR'
        },
        {
          name_en: 'CommonQR',
          name_kr: '일반 QR'
        },
        {
          name_en: 'NotiOverCert',
          name_kr: '과다인증알림'
        }
      ],

      clustering: true,
      blist_app: false,
      blist_region: false,
      blist_delete: false,
      markers: [
        {position: {
          lat: 37, 
          lng: 127
          }
        }
      ],
      pagination: {
        page: 1,
        rowsPerPage: "5000",
        total: 0
      }
    };
  },

  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.total === 0
      )
        return 0;

      return Math.ceil(
        this.pagination.total / this.pagination.rowsPerPage
      );
    }
  },

  methods: {
    getDatas() {
      let query_data = this.query;
      query_data.page = this.pagination.page;
      query_data.perPage = this.pagination.rowsPerPage;
      this.$store.dispatch(Constant.FETCH_PRODUCT_CERIT, query_data)
      .then(resp => {
        // this.desserts = resp.data.certs;
        this.pagination.total = resp.data.total;
      });
    },
    getCompanys() {
      this.$store.dispatch(Constant.FETCH_COMPANY)
      .then(resp => 
      {
        this.companys = resp.data.company;
      });
    },
    dateSet() {
      let now = new Date();
      // let yesterday = new Date();
      let today_date = now.getDate();
      let yesterday_date = today_date - 1;
      let this_month = now.getMonth() + 1;
      let this_year = now.getFullYear();

      if (today_date < 10) {
        today_date = "0" + today_date;
      }

      if (yesterday_date < 10) {
        yesterday_date = "0" + yesterday_date;
      }

      if (this_month < 10) {
        this_month = "0" + this_month;
      }

      this.start_date = this_year + "-" + this_month + "-" + yesterday_date;
      this.end_date = this_year + "-" + this_month + "-" + today_date;
    },
    searchQuery() {
      this.pagination.page = 1;
      this.setQuery();
      this.getDatas();
    },
    setQuery() {
      this.query.date_start = this.start_date;
      this.query.date_finish = this.end_date;
      this.query.company = this.company;
      this.query.tag_type = this.tag_type;
      this.query.os = this.oss;
      this.query.cert = this.cert;
    },
    changeSdate(d) {
      this.start_date = this.formatDate(d);
    },
    changeEdate(d) {
      this.end_date = this.formatDate(d);
    },
    formatDate(date) { 
      var d = new Date(date), 
      month = '' + (d.getMonth() + 1), 
      day = '' + d.getDate(), 
      year = d.getFullYear(); 
      
      if (month.length < 2) month = '0' + month; 
      if (day.length < 2) day = '0' + day; 
      
      return [year, month, day].join('-'); 
    },
    firstPageData() {
      this.pagination.page = 1;
      this.getDatas();
    }
  }
};  
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
