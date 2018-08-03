<template>
  <div class="tableBs">
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
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
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="number"
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
          <td class="text-xs-center">{{ props.item.number }}</td>
          <td class="text-xs-center">{{ props.item.customer }}</td>
          <td class="text-xs-center"><a>{{ props.item.app_code }}</a></td>
          <td class="text-xs-center">{{ props.item.app_name }}</td>
          <td class="text-xs-center">{{ props.item.tag_type }}/td>
          <td class="text-xs-center">{{ props.item.os }}</td>
          <td class="text-xs-center">{{ props.item.version }}</td>
          <td class="text-xs-center">{{ props.item.state }}</td>
          <td class="text-xs-center">{{ props.item.auth_restrict }}</td>
          <td class="text-xs-center">{{ props.item.dist_date}}</td>
        </template>
      </v-data-table>
      <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{desserts.length}}</span> 건</span>
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

      desserts: [
        {
          value: false,
          number: 1,
          customer: '(주)파파레시피',
          app_code: 'AQCA100012',
          app_name: 'paparecipe Q',
          tag_type: 'SQR태그',
          os: 'iOS',
          version: '01.00.00',
          state: '서비스',
          auth_restrict: 50,
          dist_date: '2017.11.13'
        },
        {
          value: false,
          number: 1,
          customer: '(주)파파레시피',
          app_code: 'AQCA100012',
          app_name: 'paparecipe Q',
          tag_type: 'SQR태그',
          os: 'iOS',
          version: '01.00.00',
          state: '서비스',
          auth_restrict: 50,
          dist_date: '2017.11.13'
        }
      ]
    }
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
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
