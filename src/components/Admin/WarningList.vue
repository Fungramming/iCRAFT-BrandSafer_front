<template>
  <div class="tableBs">
    <!-- table top menu -->
    <!-- <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md2>
          <span class="span-without-selectbox">기간조회</span>
          <date-picker v-model="date_start" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <date-picker v-model="date_finish" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4>
          <div class="selectbox selectbox-with-date">
            <span>제품 타입</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="홀로태그">홀로태그</option>
              <option value="하이브리드태그">하이브리드태그</option>
              <option value="난수태그">난수태그</option>
              <option value="SQR태그">SQR태그</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md4>
          <div class="selectbox-input">
            <span>푸시토큰</span>
            <input class="input-text input-with-date" type="text">
          </div>
        </v-flex>
      </v-layout>
    </div> -->
    <!-- table wrap -->
    <v-app class="inspire">
      <v-card-title>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md5>
          <span class="span-without-selectbox">기간조회</span>
          <date-picker v-model="date_start" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 sm6 md5>
          <date-picker v-model="date_finish" :lang="lang"></date-picker>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="검색어"
        hide-details
      ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="oversert"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="idx"
        hide-actions
        class="elevation-1"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.native="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              {{ header.text }}
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-left">{{ props.item.number }}</td>
            <td class="text-xs-left">{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.app_name }}</td>
            <td class="text-xs-left">{{ props.item.tag_type }}</td>
            <td class="text-xs-left"><a>{{ props.item.push_token }}</a></td>
            <td class="text-xs-left">{{ props.item.tiems }}</td>
            <td class="text-xs-left">{{ props.item.date_update }}</td>
            <td class="text-xs-left">{{ props.item.date_last }}</td>
            <td class="text-xs-left">{{ props.item.customer_code }}</td>
            <td class="text-xs-left">{{ props.item.os }}</td>
            <td class="text-xs-left">{{ props.item.model }}</td>
            <td class="text-xs-left">{{ props.item.language_set }}</td>
          </tr>
        </template>
      </v-data-table>


      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{total}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </div>
    </v-app>

    <v-flex d-flex xs12 sm12 md12>
    <!-- modal dialog -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <!-- start modal -->
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>고객사 등록</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사코드
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="고객사코드">
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="고객사(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(영어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사(중국어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="주소(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(영어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">주소(중국어)</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">전화번호</label>
                <span class="selectbox">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="02">02</option>
                    <option value="031">031</option>
                    <option value="032">032</option>
                    <option value="033">033</option>
                    <option value="041">041</option>
                    <option value="042">042</option>
                    <option value="043">043</option>
                    <option value="044">044</option>
                    <option value="051">051</option>
                    <option value="052">052</option>
                    <option value="053">053</option>
                    <option value="054">054</option>
                    <option value="055">055</option>
                    <option value="061">061</option>
                    <option value="062">062</option>
                    <option value="063">063</option>
                    <option value="064">064</option>
                    <option value="070">070</option>
                    <option value="080">080</option>
                  </select>
                </span>
                <input class="input-text input-tel" type="tel">
                <input class="input-text input-tel" type="tel">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">팩스번호</label>
                <span class="selectbox">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="02">02</option>
                    <option value="031">031</option>
                    <option value="032">032</option>
                    <option value="033">033</option>
                    <option value="041">041</option>
                    <option value="042">042</option>
                    <option value="043">043</option>
                    <option value="044">044</option>
                    <option value="051">051</option>
                    <option value="052">052</option>
                    <option value="053">053</option>
                    <option value="054">054</option>
                    <option value="055">055</option>
                    <option value="061">061</option>
                    <option value="062">062</option>
                    <option value="063">063</option>
                    <option value="064">064</option>
                    <option value="070">070</option>
                    <option value="080">080</option>
                  </select>
                </span>
                <input class="input-text input-tel" type="tel">
                <input class="input-text input-tel" type="tel">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="대표자(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(영어)</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">대표자(중국어)</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title input-mr">사업자등록번호
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text input-tel" type="tel">
                <input class="input-text input-tel" type="tel">
                <input class="input-text input-tel" type="tel">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사업자등록증
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">CI
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">URL
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">TnT로고이미지
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="설명(한국어)">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(영어)</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명(중국어)</label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-divider></v-divider>
              <v-subheader>계약 정보</v-subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">계약서명
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">계약기간
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">사업자등록증
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : pdf)</span>
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
    </v-flex>
  </div>
</template>

<script>
import Constant from "../../constant.js";
import { getSelectedFunc } from "../CompHelper.js";

export default {
  data() {
    return {
      search: "",
      dialog: false,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },

      // date picker
      date_start: "",
      date_finish: "",
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
      total: "",
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "번호", sortable: false },
        {
          text: "관제일자",
          align: "left",
          value: "관제일자",
          sortable: false
        },
        { text: "App명", align: "left", value: "App명", sortable: false },
        {
          text: "태그타입",
          align: "left",
          value: "태그타입",
          sortable: false
        },
        {
          text: "푸시토큰",
          align: "left",
          value: "푸시토큰",
          sortable: false
        },
        {
          text: "인증횟수",
          align: "left",
          value: "인증횟수",
          sortable: false
        },
        {
          text: "관제갱신일시",
          align: "left",
          value: "관제갱신일시",
          sortable: false
        },
        // { text: "블랙리스트유형", align: "left", value: "블랙리스트유형", sortable: false },
        {
          text: "마지막 인증일시",
          align: "left",
          value: "마지막 인증일시",
          sortable: false
        },
        { text: "App등록", align: "left", value: "App등록", sortable: false },
        { text: "OS", align: "left", value: "OS", sortable: false },
        { text: "모델명	", align: "left", value: "모델명	", sortable: false },
        { text: "언어셋", align: "left", value: "언어셋", sortable: false }
      ],
      oversert: []
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  updated() {
    let update_total = this.$children[0].$children[1].searchLength;
    // console.log(this.$children[0].$children[1].searchLength);
    // console.log(update_total);
    this.total = update_total;
  },
  mounted() {
    this.$store.dispatch(Constant.FETCH_OVER_CERT).then(resp => {
      this.oversert = resp.data;
      console.log("oversert :", this.oversert);
      this.total = this.oversert.length;
    });
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.apps.slice();
    },
    getSelected: function(e) {
      getSelectedFunc(e);
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
