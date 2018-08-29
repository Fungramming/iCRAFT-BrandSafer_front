<template>
  <div class="tableBs">
    <v-app class="inspire">    
      <v-card-title>
        <label class="search-label" for="">검색어</label>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="pushToken"
        class="search-field"
        label="푸시토큰"
        hide-details
        @keydown.enter="getDatas"
      ></v-text-field>
      <div class="search-btn" @click="getDatas">
        <v-icon>search</v-icon>
      </div>
      </v-card-title>
      <div v-if="results.length > 0" class="table">
        <table style="width: 100%;">
          <colgroup>
            <col width="11%"/>
            <col width="9%"/>
            <col width="7%"/>
            <col width="12%"/>
            <col width="10%"/>
            <col width="5%"/>
            <col width="9%"/>
            <col width="4%"/>
            <col width="5%"/>
            <col width="3%"/>
            <col width="3%"/>
            <col width="4%"/>
            <col width="4%"/>
            <col width="4%"/>
            <col width="3%"/>
          </colgroup>
          <thead>
            <tr height="80" bgcolor="#a1cfec">
              <th class="table-cell">App명</th>
              <th class="table-cell">등록일</th>
              <th class="table-cell" colspan="2">최초/마지막 인증 일시</th>
              <th class="table-cell">블랙/관리</th>
              <th class="table-cell">OS</th>
              <th class="table-cell">모델명</th>
              <th class="table-cell">언어</th>
              <th class="table-cell" colspan="6">인증내역</th>
              <th class="table-cell">제보</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table-cell" rowspan="2">{{state.appName}}</td>
              <td class="table-cell" rowspan="2">{{state.dtRegistered}}</td>
              <td class="table-cell" height="45">최초</td>
              <td class="table-cell">{{state.firstDtCertificate}}</td>
              <td class="table-cell" rowspan="2">{{prodBlType(state.blackListState)}}/N</td>
              <td class="table-cell" rowspan="2">{{state.osType}}</td>
              <td class="table-cell" rowspan="2">{{state.model}}</td>
              <td class="table-cell" rowspan="2">{{state.language}}</td>
              <td class="table-cell">정</td>
              <td class="table-cell">가</td>
              <td class="table-cell">재</td>
              <td class="table-cell">초과</td>
              <td class="table-cell">이용</td>
              <td class="table-cell">일반</td>
              <td class="table-cell" rowspan="2">{{state.count_cert.Report}}</td>
            </tr>
            <tr>
              <td class="table-cell" height="45">마지막</td>
              <td class="table-cell">{{state.lastDtCertificate}}</td>
              <td class="table-cell">{{state.count_cert.Genuine}}</td>
              <td class="table-cell">{{state.count_cert.Counterfeit}}</td>
              <td class="table-cell">{{state.count_cert.Revalidation}}</td>
              <td class="table-cell">{{state.count_cert.OverCert}}</td>
              <td class="table-cell">{{state.count_cert.Genuine}}</td>
              <td class="table-cell">{{state.count_cert.Genuine}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="results.length == 0" class="no-result">조회된 결과가 없습니다.</p>
      <div v-show="results.length > 0" class="map">
        <GmapMap
          :center="{lat: 35, lng: 118}"
          :zoom="5"
          map-type-id="roadmap"
          style="height: 750px"
        >
          <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="center=m.position"
          />
        </GmapMap>
      </div>
      <div class="card-list">
        <v-container v-if="results.length > 0" fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="item in results" xs6 md3 lg2>
              <v-card>
                <v-card-media :src="prodImage(item.image)" height="150px"></v-card-media>
                <v-card-actions class="cert">
                  <v-btn flat color="orange">{{item.result}}</v-btn>
                </v-card-actions>
                <v-card-title class="cert-date">
                  <span>{{item.dtCertificate}}</span>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <p v-if="results.length == 0" class="no-result">조회된 결과가 없습니다.</p>
      </div>
      <v-layout d-flex justify-end class="bottom-side">
        <v-flex d-flex align-center>
          <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{total}}</span> 건</span>
        </v-flex>
        <v-flex d-flex align-center >
          <v-btn color="red lighten-1" dark @click.stop="deleteDatas">블랙리스트-과다인증 등록</v-btn>
          <v-btn color="red lighten-1" dark @click.stop="showModal">블랙리스트-가품제조 등록</v-btn>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import Constant from "../../constant.js";
import { dateFormat } from "../CompHelper.js";

export default {
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      pushToken: this.$store.state.pushToken,
      state: {},
      results: [],
      total: "",
      markers: [
        {
          position: {
            lat: 37,
            lng: 127
          }
        },
        {
          position: {
            lat: 30,
            lng: 127
          }
        },
        {
          position: {
            lat: 34,
            lng: 127
          }
        },
        {
          position: {
            lat: 40,
            lng: 127
          }
        },
        {
          position: {
            lat: 37,
            lng: 126.5
          }
        },
        {
          position: {
            lat: 37,
            lng: 126
          }
        },
        {
          position: {
            lat: 37,
            lng: 125.5
          }
        },
        {
          position: {
            lat: 37,
            lng: 125
          }
        },
        {
          position: {
            lat: 37,
            lng: 124.5
          }
        },
        {
          position: {
            lat: 37,
            lng: 124
          }
        },
        {
          position: {
            lat: 37,
            lng: 123.5
          }
        },
        {
          position: {
            lat: 37,
            lng: 123
          }
        }
      ],

      submitData: {
        pushToken: ""
      }
    };
  },
  mounted() {
    if (this.pushToken) {
      this.getDatas();
    }
  },
  methods: {
    getDatas() {
      this.$store
        .dispatch(Constant.FETCH_PUSH_TOKEN, this.pushToken)
        .then(resp => {
          this.total = resp.data.total;
          this.results = resp.data.app;

          dateFormat(this.results, "dtCertificate");
          dateFormat(this.results, "dtRegistered");
          this.getState(resp);
          this.defineResult();
        });
    },
    getState(resp) {
      this.state = {
        appName: this.results[0].appname,
        dtRegistered: this.results[0].dtRegistered,
        firstDtCertificate: this.results[0].dtCertificate,
        lastDtCertificate: this.results[this.results.length - 1].dtCertificate,
        blackListState: this.results[0].dlType,
        osType: this.results[0].osType,
        model: this.results[0].model,
        language: this.results[0].language,
        count_cert: resp.data.count_cert
      };
    },
    defineResult() {
      for (let item in this.results) {
        let result = this.results[item].result;
        if (result == "Genuine") {
          this.results[item].result = "진품";
        } else if (result == "Counterfeit") {
          this.results[item].result = "가품";
        } else if (result == "CommonQR") {
          this.results[item].result = "일반 QR";
        } else if (result == "Revalidation") {
          this.results[item].result = "재입증";
        } else if (result == "OverCert") {
          this.results[item].result = "인증초과";
        }
      }
    },
    prodImage(src) {
      let imgSrc = src.replace(".png", ".jpeg");
      return "https://idc.brandsafer.com" + imgSrc;
    },
    prodBlType(type) {
      if (type == null) {
        return "N";
      } else if (type == "C") {
        return "C";
      } else if (type == "O") {
        return "O";
      }
    },
    editBlacklist() {
      let blType = this.state.blackListState;
      if (blType == null) {
        this.$store.dispatch(Constant.ADD_BLACKLIST).then(() => {});
      } else if (blType == "C" || blType == "O") {
        this.$store.dispatch(Constant.UPDA).then(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
tbody {
  background-color: #fdfdfd;
}
.search-label {
  color: #646464;
  display: inline-block;
}
.search-field {
  margin: 0 0 0 10px;
}
.search-btn {
  margin: 0;
}
.card-list {
  margin-top: 0px !important;
  padding: 20px;
  padding-bottom: 20px !important;
}
.bottom-side {
  width: 100%;
  max-height: 100px;
  overflow: hidden;
}
.bottom-total {
  margin-top: 0 !important;
  height: 20px;
}
.no-result {
  border: 1px solid #e6e6e6;
  background-color: #f9f9f9;
  color: #ff812d;
  padding: 10px;
  margin-bottom: 0;
}
.v-card__title {
  padding: 5px;
}
</style>
