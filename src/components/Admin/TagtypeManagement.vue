<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex mb0 d-flex xs12 sm12 md4>
          <div class="selectbox">
            <span>제품 타입</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="홀로태그">홀로태그</option>
              <option value="홀로태그 + QR">홀로태그 + QR</option>
              <option value="하이브리드태그">하이브리드태그</option>
              <option value="난수태그">난수태그</option>
              <option value="SQR태그">SQR태그</option>
            </select>
          </div>
        </v-flex>
        <v-flex mb0 d-flex xs12 sm12 md4>
          <div class="selectbox">
            <span>상태</span>
            <select id="select2" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="서비스">서비스</option>
              <option value="삭제">삭제</option>
            </select>
          </div>
        </v-flex>
        <v-flex mb0 d-flex xs12 sm12 md4>
          <div class="selectbox-input">
            <span>유통업체명</span>
            <input class="input-text" type="text">
          </div>
        </v-flex>
      </v-layout>
      <!-- <v-flex d-flex xs12 sm12 md1 offset-md11>
        <v-btn class="search-btn" color="primary" dark>검색</v-btn>
      </v-flex> -->
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
          <td class="text-xs-center"><a @click="dialog_edit = true"> {{ props.item.version }} </a></td>
          <td class="text-xs-center">{{ props.item.distributor }}</td>
          <td class="text-xs-center">{{ props.item.customer_code }}</td>
          <td class="text-xs-center">{{ props.item.address }}</td>
          <td class="text-xs-center">{{ props.item.status }}</td>
          <td class="text-xs-center">{{ props.item.account }}</td>
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

    <!-- modal dialog -->
    <v-flex d-flex xs12 sm12 md12>
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
          <v-toolbar-title>태그타입 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">버전
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
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
                <label class="input-title">사이즈
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text input-size" type="text" placeholder="width">
                <input class="input-text input-size" type="text" placeholder="height">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">노트</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md3>
                <label class="input-title">상태</label>
                <input checked="checked" class="input-radio" type="radio" name="staus" value="서비스">서비스
                <input class="input-radio" type="radio" name="staus" value="사용정지">사용정지
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
    </v-flex>

    <!-- modal dialog -->
    <v-flex d-flex xs12 sm12 md12>
    <v-dialog
      v-model="dialog_edit"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <!-- start modal -->
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="dialog_edit = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>태그타입 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog_edit = false">수정</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">버전
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
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
                <label class="input-title">사이즈
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text input-size" type="text" placeholder="width">
                <input class="input-text input-size" type="text" placeholder="height">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">설명</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">노트</label>
                <input class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md3>
                <label class="input-title">상태</label>
                <input checked="checked" class="input-radio" type="radio" name="staus" value="서비스">서비스
                <input class="input-radio" type="radio" name="staus" value="사용정지">사용정지
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
        { text: "버전", align: "center", value: "버전", sortable: false },
        { text: "태그타입", align: "center", value: "태그타입", sortable: false },
        { text: "사이즈", align: "center", value: "사이즈", sortable: false },
        { text: "상태", align: "center", value: "상태", sortable: false },
        { text: "작성자", align: "center", value: "작성자", sortable: false },
        { text: "등록일", align: "center", value: "등록일", sortable: false }
      ],
      desserts: [
        {
          value: false,
          number: "1",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 6.0,
          address: 24,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "2",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 9.0,
          address: 37,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "3",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 16.0,
          address: 23,
          status: '등록',
          account: 'newAccount',
          call_number: "7%",
        },
        {
          value: false,
          number: "4",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 3.7,
          address: 67,
          status: '등록',
          account: 'newAccount',
          call_number: "8%",
        },
        {
          value: false,
          number: "5",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 16.0,
          address: 49,
          status: '등록',
          account: 'newAccount',
          call_number: "16%",
        },
        {
          value: false,
          number: "6",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 0.0,
          address: 94,
          status: '등록',
          account: 'newAccount',
          call_number: "0%",
        },
        {
          value: false,
          number: "7",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 0.2,
          address: 98,
          status: '등록',
          account: 'newAccount',
          call_number: "2%",
        },
        {
          value: false,
          number: "8",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 3.2,
          address: 87,
          status: '등록',
          account: 'newAccount',
          call_number: "45%",
        },
        {
          value: false,
          number: "9",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 25.0,
          address: 51,
          status: '등록',
          account: 'newAccount',
          call_number: "22%",
        },
        {
          value: false,
          number: "10",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 26.0,
          address: 65,
          status: '등록',
          account: 'newAccount',
          call_number: "6%",
        },
        {
          value: false,
          number: "11",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 6.0,
          address: 24,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "12",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 9.0,
          address: 37,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "13",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 16.0,
          address: 23,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "14",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 3.7,
          address: 67,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "15",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 16.0,
          address: 49,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "16",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 0.0,
          address: 94,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "17",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 0.2,
          address: 98,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "18",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 3.2,
          address: 87,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "19",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 25.0,
          address: 51,
          status: '등록',
          account: 'newAccount',
        },
        {
          value: false,
          number: "20",
          version: '4.0',
          distributor: '오감바이오',
          customer_code: 26.0,
          address: 65,
          status: '등록',
          account: 'newAccount',
        }
      ]
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
