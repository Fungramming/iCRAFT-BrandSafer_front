<template>
  <div class="tableBs">
    <!-- table top menu -->
    <!-- <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md1>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="고객사">회사명</option>
              <option value="이름">이름</option>
              <option value="연락처">연락처</option>
              <option value="푸시토큰">푸시토큰</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <input class="input-text" type="text">
        </v-flex>
      </v-layout>
    </div> -->
    <!-- table wrap -->
    <v-app class="inspire">
      <v-card-title>
        검색조건
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="검색어"
        single-line
        hide-details
      ></v-text-field>
      </v-card-title>


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
        <!-- <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }} 
            </span>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template> -->

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
            <td class="text-xs-left">{{ props.item.idx }}</td>
            <td class="text-xs-left">{{ props.item.companyName }}</td>
            <td class="text-xs-left"><a @click="tagtype_dialog_edit = true">{{ props.item.name }}</a></td>
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
        item-key="number"
        hide-actions
        class="elevation-1"
        select-all
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator" class="item-headers">
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td @click="getSelected">
            <v-checkbox 
              :input-value="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-left">{{ props.item.idx }}</td>
          <td class="text-xs-left">{{ props.item.companyName }}</td>
          <td class="text-xs-left"><a @click="tagtype_dialog_edit = true">{{ props.item.name }}</a></td>
          <td class="text-xs-left">{{ props.item.contact }}</td>
          <td class="text-xs-left">{{ props.item.pushToken }}</td>
          <td class="text-xs-left">{{ props.item.dtRegistered }}</td>
          <td class="text-xs-left">{{ props.item.state }}</td>
          <td class="text-xs-left">{{ props.item.dtModified }}</td>
          <td class="text-xs-left">{{ props.item.modifier }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
        검색결과 "{{ search }}" 을(를) 찾지 못하였습니다.
        </v-alert>
      </v-data-table> -->


      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{apps.length}}</span> 건</span>
      <div class="bottom-contents-wrap">
        <v-layout row wrap btn-group>
          <v-flex d-flex xs12 sm12 md1 offset-md11>
            <v-btn color="error" dark>삭제</v-btn>
          </v-flex>
        </v-layout>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="7"></v-pagination>
        </div>
      </div>
    </v-app>

    <!-- modal edit dialog -->
    <v-flex d-flex xs12 sm12 md12>  
    <v-dialog
      v-model="tagtype_dialog_edit"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <!-- start modal -->
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="tagtype_dialog_edit = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>관리자App 수정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="tagtype_dialog_edit = false">수정</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">회사명</label>
                <input class="input-text" type="text" required="required" placeholder="회사명">
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이름</label>
                <input class="input-text" type="text" required="required" placeholder="이름">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">연락처</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md3>
                <label class="input-title">상태</label>
                <input checked="checked" class="input-radio" type="radio" name="staus" value="등록">등록
                <input class="input-radio" type="radio" name="staus" value="승인">승인
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
      tagtype_dialog_edit: false,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      selected: [],
      headers: [
        { text: "idx", align: "left", value: "idx", sortable: false },
        {
          text: "companyName",
          align: "left",
          value: "companyName",
          sortable: false
        },
        { text: "name", align: "left", value: "name", sortable: false },
        { text: "contact", align: "left", value: "contact", sortable: false },
        {
          text: "pushToken",
          align: "left",
          value: "pushToken",
          sortable: false
        },
        {
          text: "dtRegistered",
          align: "left",
          value: "dtRegistered",
          sortable: false
        },
        {
          text: "state",
          align: "left",
          value: "state",
          sortable: false
        },
        {
          text: "dtModified",
          align: "left",
          value: "dtModified",
          sortable: false
        },
        { text: "modifier", align: "left", value: "modifier", sortable: false }
      ],
      apps: []
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(this.apps.length / this.pagination.rowsPerPage);
    }
  },
  mounted() {
    this.$store.dispatch(Constant.FETCH_ADMIN_APP).then(resp => {
      this.apps = resp.data.apps;
      console.log("apps :", this.apps);
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
