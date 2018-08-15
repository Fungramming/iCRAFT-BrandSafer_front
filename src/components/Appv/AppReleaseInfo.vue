<template>
  <div class="tableBs">
    <div class="tableBs-top">    
      <v-layout row wrap>
          <p class="flex md12">검색 조건</p>
          <v-flex d-flex xs6 md3>
            <div class="selectbox selectbox-top">
              <span>고객사</span>
              <select id="select1" name="searchType" class="form-control" size="1">
                <option value="전체" selected>전체</option>
                <option value="고객사1">고객사1</option>
                <option value="고객사2">고객사2</option>
                <option value="고객사3">고객사3</option>
              </select>
            </div>
          </v-flex>
          <v-flex d-flex xs6 md3>
            <div class="selectbox selectbox-top">
              <span>OS</span>
              <select id="select2" name="searchType" class="form-control" size="1">
                <option value="전체" selected>전체</option>
                <option value="OS1">OS1</option>
                <option value="OS2">OS2</option>
                <option value="OS3">OS3</option>
              </select>
            </div>
          </v-flex>
          <v-flex d-flex xs6 md3>
            <div class="selectbox selectbox-top">
              <span>종류</span>
              <select id="select1" name="searchType" class="form-control" size="1">
                <option value="전체" selected>전체</option>
                <option value="종류1">종류1</option>
                <option value="종류2">종류2</option>
                <option value="종류3">종류3</option>
              </select>
            </div>
          </v-flex>
          <v-flex d-flex xs6 md3>
            <div class="selectbox-input">
              <span>버전</span>
              <input class="input-text" type="text">
            </div>
          </v-flex>
        </v-layout>
    </div>
    <!-- table wrap -->
    <v-app class="inspire">
       <v-text-field
        v-model="search"
        append-icon="search"
        label="검색어"
        single-line
        hide-details
      ></v-text-field>      
      <v-data-table
        :headers="headers"
        :items="apps"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="idx"
        select-all
        class="elevation-1"
      >

        <template slot="headers" slot-scope="props">
          <tr>
            <!-- <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.native="toggleAll"
              ></v-checkbox>
            </th> -->
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
            <!-- <td>
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td> -->
            <td class="text-xs-left">{{ total - props.index - (pagination.page -1)* pagination.rowsPerPage }}</td>
            <!-- <td class="text-xs-left">{{ props.item.idx }}</td> -->
            <td class="text-xs-left">{{ props.item.companyName }}</td>
            <td class="text-xs-left"><a @click.stop="showEditModal">{{ props.item.name }}</a></td>
            <td class="text-xs-left">{{ props.item.contact }}</td>
            <td class="text-xs-left">{{ props.item.pushToken }}</td>
            <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
            <td class="text-xs-left">{{ props.item.dtModified }}</td>
            <td class="text-xs-left">{{ props.item.modifier }}</td>
          </tr>
        </template>
      </v-data-table>
      <!-- <v-data-table
        :headers="headers"
        :items="apps"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="idx"        
        select-all
        hide-actions
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <span slot="activator" class="item-headers">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-center">{{ total - props.index - (pagination.page -1)* pagination.rowsPerPage }}</td>
          <td class="text-xs-center">{{ props.item.companyCode }}</td>
          <td class="text-xs-center"><a>{{ props.item.code }}</a></td>
          <td class="text-xs-center">{{ props.item.name_kr }}</td>
          <td class="text-xs-center">{{ props.item.tagType }}</td>
          <td class="text-xs-center">{{ props.item.osType }}</td>
          <td class="text-xs-center">{{ props.item.version }}</td>
          <td class="text-xs-center">{{ props.item.state }}</td>
          <td class="text-xs-center">{{ props.item.limitCertCnt }}</td>
          <td class="text-xs-center">{{ props.item.dtPublished}}</td>
        </template>
      </v-data-table> -->
      <div class="v-datatable__actions">
        <span>per page :</span>
        <div class="v-datatable__actions__select">          
          <select v-model="pagination.rowsPerPage">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <!-- <option value="-1">All</option> -->
          </select>
        </div>
      </div>
      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{total}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <v-layout row wrap btn-group>
          <v-flex d-flex xs12 sm12 md1 offset-md10>
            <v-btn color="error" dark>삭제</v-btn>
          </v-flex>
          <v-flex d-flex xs12 sm12 md1>
            <v-btn color="primary" dark @click.stop="dialog = true">등록</v-btn>
          </v-flex>
        </v-layout>
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
          <v-toolbar-title>App 출시정보</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">고객사
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select id="select1" name="searchType" class="form-control" size="1">
                    <option selected value="홀로태그">선택해 주세요</option>
                    <option value="고객사1">고객사1</option>
                    <option value="하이브리드태그">하이브리드태그</option>
                    <option value="난수태그">난수태그</option>
                    <option value="SQR태그">SQR태그</option>
                  </select>
                </span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">태그타입
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select id="select1" name="searchType" class="form-control" size="1">
                    <option selected value="홀로태그">홀로태그</option>
                    <option value="홀로태그 + QR">홀로태그 + QR</option>
                    <option value="하이브리드태그">하이브리드태그</option>
                    <option value="난수태그">난수태그</option>
                    <option value="SQR태그">SQR태그</option>
                  </select>
                </span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">푸시토큰</label>
                <input class="input-text" type="text" required="required">
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
import { getTotal } from "../CompHelper.js";

export default {
  data() {
    return {
      search: "",
      dialog: false,
      dialog_edit: false,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      total: "",
      selected: [],
      headers: [
        { text: "번호", align: "center", value: "번호", sortable: false },
        { text: "고객사", align: "center", value: "고객사", sortable: false },
        { text: "App코드", align: "center", value: "App코드", sortable: false },
        { text: "App명", align: "center", value: "App명", sortable: false },
        { text: "태그타입", align: "center", value: "태그타입", sortable: false },
        { text: "OS", align: "center", value: "OS", sortable: false },
        { text: "버전", align: "center", value: "버전", sortable: false },
        { text: "상태", align: "center", value: "상태", sortable: false },
        { text: "인증제한 수", align: "center", value: "인증제한 수", sortable: false },
        { text: "배포일", align: "center", value: "배포일", sortable: false }
      ],
      apps: [],
    }
  },
  mounted(){
    this.getDatas()
  },
  updated() {
    getTotal(this);
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
  methods: {
    getDatas() {
      this.$store.dispatch(Constant.FETCH_APP_LELEASE, this.pagination.page).then(resp=>{
        this.apps = resp.data.apps.reverse();
        this.dateFormat();
      })
    },
    dateFormat() {
      let apps = this.apps;
      for (let item in apps) {
        let date = new Date(apps[item].dtPublished);
        let formatDate = date.toLocaleDateString();
        apps[item].dtPublished = formatDate;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
