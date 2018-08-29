<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs6 md3 lg2>
          <span class="span-without-selectbox">기간조회</span>
          <date-picker v-model="start_date" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs6 md3 lg2>
          <date-picker v-model="end_date" :lang="lang"></date-picker>
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
    <!-- table wrap -->
    <v-app class="inspire">
      <!-- <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="query.search"
          append-icon="search"
          label="검색어"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title> -->
      <v-data-table
        :headers="headers"
        :items="desserts"
        :total-items="pagination.total"
        :pagination.sync="pagination"
        item-key="number"
        hide-actions
        class="elevation-1 table"
      >
        <template slot="headerCell" slot-scope="props">
          <span slot="activator" class="item-headers">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ pagination.total - props.index - (pagination.page -1)* pagination.rowsPerPage }}</td>
          <td class="text-xs-center">{{ props.item.company_name }}</td>
          <td class="text-xs-center">{{ tagToKor(props.item.tagType) }}</td>
          <td class="text-xs-center">
            <img :src="checkImage(props.item.image, props.item.tagType)" alt="image" height="120">
          </td>
          <td class="text-xs-center">{{ props.item.tag_name }}</td>
          <td class="text-xs-center">{{ props.item.osType }}</td>
          <td class="text-xs-center">{{ props.item.randomCnt }}</td>
          <td class="text-xs-center">{{ props.item.distributor }}</td>
          <td class="text-xs-center">{{ dateFormat(props.item.dtCertificate) }}</td>
          <td class="text-xs-center">
            <v-chip :color="badgeColor(props.item.result)" :dark="true" :small="true" text-color="white" disabled>
              {{ certToKor(props.item.result) }}
            </v-chip>
          </td>
          <td class="text-xs-center">
            <v-btn icon @click.native="showSpotModal">
              <v-icon>location_on</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <!-- <div class="v-datatable__actions" :style="pstyle">
        <span>per page :</span>
        <div class="v-datatable__actions__select">          
          <select v-model="pagination.rowsPerPage" @change="firstPageData()">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
      </div> -->

      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{pagination.total}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="6" @input="getDatas()"></v-pagination>
        </div>
      </div>

      <!-- spot modal -->
      <v-flex d-flex xs12 sm12 md12>
        <modal :width="modal_size" :height="modal_size_height" name="spot" transition="pop-out" @closed="closeSpotModal()">
          <v-card tile>
            <v-toolbar card dark color="primary">
              <v-toolbar-title>위치 정보</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="closeSpotModal()">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <GmapMap
              :center="modal_data.location"
              :zoom="5"
              map-type-id="roadmap"
              style="height: 350px; width: 100%;"
            >
              <GmapMarker
                :position="modal_data.location"
                :clickable="true"
                :draggable="false"
                @click="center=modal_data.location"
              />
            </GmapMap>
            <div class="spot-content-wrapper">
              <div class="spot-content">
                <img v-for="image in modal_data.images" :key="image" :src="image" alt="image">
                <ul>
                  <li><span>제품명:</span> {{modal_data.prod}}</li>
                  <li><span>인증결과:</span> {{modal_data.cert}}</li>
                  <li><span>인증일시:</span> {{modal_data.date}}</li>
                  <li><span>푸시토큰:</span> <a @click="linkPushToken()">{{modal_data.push_token}}</a></li>
                </ul>
              </div>
            </div>
            <div class="modal-footer">
              <v-btn color="success">가품제조 등록</v-btn>
            </div>
          </v-card>
        </modal>
      </v-flex>

    </v-app>
  </div>
</template>

<script>
import Constant from "../../constant.js";
// import _ from 'lodash';

export default {
  updated() {
    this.start_date = this.$children[0].text;
    this.end_date = this.$children[1].text;
  },

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

      // date picker
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

      pagination: {
        page: 1,
        total: 0,
        rowsPerPage: '10'
      },
      headers: [
        { text: "번호", align: "center", value: "number", sortable: false },
        { text: "고객사", align: "center", value: "customer", sortable: false },
        {
          text: "태그타입",
          align: "center",
          value: "tag_type",
          sortable: false
        },
        { text: "이미지", align: "center", value: "image", sortable: false },
        { text: "제품명", align: "center", value: "product", sortable: false },
        { text: "OS", align: "center", value: "OS", sortable: false },
        {
          text: "인증수",
          align: "center",
          value: "cert_count",
          sortable: false
        },
        {
          text: "유통업체",
          align: "center",
          value: "distributor",
          sortable: false
        },
        { text: "시간", align: "center", value: "time", sortable: false },
        {
          text: "인증결과",
          align: "center",
          value: "cert_result",
          sortable: false
        },
        {
          text: "위치보기",
          align: "center",
          value: "location",
          sortable: false
        }
      ],
      desserts: [],
      
      modal_size: '60%',
      modal_size_height: '700px',
      modal_data: {
        location: {
          lat: 35,
          lng: 118
        },
        images: [],
        prod: '',
        cert: '',
        date: '',
        push_token: ''
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
    // pstyle() {
    //   let data_len = this.desserts.length;
    //   let per_page = this.pagination.rowsPerPage;
    //   let pstylee = '';
    //   if (!data_len) {
    //     pstylee = 'height: 100px; top: -91px;';
    //   } else if (per_page === '5') {
    //     pstylee = 'height: 320px; top: -101px;';
    //   } else if (per_page === '10') {
    //     pstylee = 'height: 320px; top: -91px;'; 
    //   } else if (per_page === '25') {
    //     pstylee = 'height: 320px; top: -80px;';
    //   } else {
    //     pstylee = '';
    //   }

    //   return pstylee
    // }
  },

  methods: {
    getDatas() {
      let query_data = this.query;
      query_data.page = this.pagination.page;
      query_data.perPage = this.pagination.rowsPerPage;
      this.$store.dispatch(Constant.FETCH_PRODUCT_CERIT, query_data)
      .then(resp => {
        this.desserts = resp.data.certs;
        this.pagination.total = resp.data.total;
      });
    },
    prodImage: function(src) {
      var imgSrc = src.replace('.png', '.jpeg')
      return 'https://idc.brandsafer.com' + imgSrc
    },

    sqrImage: function(src) {
      return 'https://idc.brandsafer.com' + src
    },

    checkImage(src, tag) {
      let imgSrc = src;
      if (tag === 'SQRTAG') {
        imgSrc = this.prodImage(imgSrc);
      } else {
        imgSrc = this.sqrImage(imgSrc);
      }

      return imgSrc
    },

    getCompanys() {
      this.$store.dispatch(Constant.FETCH_COMPANY)
      .then(resp => 
      {
        this.companys = resp.data.company;
      });
    },
    getTagTypes() {
      this.$store.dispatch(Constant.FETCH_TAG_TYPE)
      .then(resp => 
      {
        this.tag_types = resp.data.tag_type;
      })
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
    showSpotModal(e) {
      this.$modal.show("spot");
      let index = e.target.parentNode.parentNode.parentNode.parentNode["sectionRowIndex"];
      let {image: image, tagType: tag, tag_name: prod, result: cert, dtCertificate: date, deviceID: push_token, latitude: lat, longitude: lng } 
        = this.$children[3].$children[0].filteredItems[index];
      
      this.modal_data.prod = prod || '-';
      this.modal_data.cert = this.certToKor(cert);
      this.modal_data.date = this.dateFormat(date);
      this.modal_data.push_token = push_token;
      // ----------------------------------------------------
      // lat, lng 서버에서 정보를 주면 모달 지도에 마커 찍히게 만들어야 함
      // modal_data.location에 {lat: num, lng: num} 데이터 매핑
      // ----------------------------------------------------
      let images = new Array();
      images.push(this.sqrImage(image));
      if (tag === 'SQRTAG') {
        images.push(this.prodImage(image));
      }
      this.modal_data.images = images;
    },
    closeSpotModal() {
      this.modal_data.prod = '';
      this.modal_data.cert = '';
      this.modal_data.date = '';
      this.modal_data.push_token = '';
      this.modal_data.images = [];
      this.$modal.hide("spot");
    },

    tagToKor(tag_en) {
      let tags = new Map();
      tags.set('HOLOTAG_ONLY', '홀로태그'); tags.set('HYBRIDTAG', '하이브리드태그');
      tags.set('RANDOMTAG', '난수태그'); tags.set('SQRTAG', 'SQR태그');

      return tags.get(tag_en) || tag_en
    },

    certToKor(cert_en) {
      let certs = new Map();
      certs.set('Genuine', '정품'); certs.set('Counterfeit', '가품'); certs.set('Revalidation', '재인증'); certs.set('Exprired', '기간만료');
      certs.set('Invalid', '무효한코드'); certs.set('Retry', '재촬영'); certs.set('OverCert', '인증초과'); certs.set('DifferentQR', '이용안내QR');
      certs.set('CommonQR', '일반QR'); certs.set('NotiOverCert', '과다인증알림');

      return certs.get(cert_en) || cert_en
    },

    dateFormat(date_str) {
      let date = new Date(date_str);
      return date.toLocaleString();
    },

    badgeColor(cert) {
      let colors = new Map();
      colors.set('Genuine', 'green'); colors.set('Counterfeit', 'red'); colors.set('Revalidation', 'yellow');
      colors.set('Exprired', 'yellow'); colors.set('Invalid', 'blue'); colors.set('Retry', 'yellow');
      colors.set('OverCert', 'primary'); colors.set('DifferentQR', 'secondary'); colors.set('CommonQR', 'pink');
      colors.set('NotiOverCert', 'purple');

      return colors.get(cert)
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

    firstPageData() {
      this.pagination.page = 1;
      this.getDatas();
    },

    linkPushToken() {
      let _this = this;
      function test() {
        _this.$router.push({ name: "lookup" });
        redirectTabFunc(_this);
        return _this.$store.commit(Constant.PUSH_APP, _this.modal_data.push_token);
      }
      setTimeout(test, 10);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
