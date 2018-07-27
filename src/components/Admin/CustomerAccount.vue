<template>
  <div class="tableBs">
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md3>
        <!-- <v-flex d-flex xs3 order-xs3> -->
          <div class="selectbox">
            <span>고객사</span> 
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="고객사 전체">고객사 전체</option>
              <option value="블랙야크">블랙야크</option>
              <option value="CJ E&M">CJ E&M</option>
              <option value="브랜드세이퍼">브랜드세이퍼</option>
              <option value="LF">LF</option>
              <option value="아모레퍼시픽">아모레퍼시픽</option>
              <option value="카버코리아">카버코리아</option>
              <option value="엘앤피코스메틱">엘앤피코스메틱</option>
              <option value="파파레서피">파파레서피</option>
              <option value="젬나컴퍼니">젬나컴퍼니</option>
              <option value="(주)차바이오에프앤씨">(주)차바이오에프앤씨</option>
              <option value="AUDIO BANK">AUDIO BANK</option>
              <option value="제이준메딕스㈜">제이준메딕스㈜</option>
              <option value="아이시드">아이시드</option>
              <option value="난수발권테스트">난수발권테스트</option>
              <option value="TWOTSP">TWOTSP</option>
              <option value="엘앤피코스메틱㈜">엘앤피코스메틱㈜</option>
              <option value="(주)노드메이슨">(주)노드메이슨</option>
              <option value="제이준코스메틱㈜">제이준코스메틱㈜</option>
              <option value="BrandSafer">BrandSafer</option>
              <option value="문경오미자">문경오미자</option>
              <option value="문경 테스트">문경 테스트</option>
              <option value="오감 바이오">오감 바이오</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox">
            <span>구분</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="관리자">관리자</option>
              <option value="운영자">운영자</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox">
            <span>상태</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="전체">전체</option>
              <option value="등록">등록</option>
              <option value="일시정지">일시정지</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md3>
          <div class="selectbox select-search">
            <span>검색어</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option selected value="부서">부서</option>
              <option value="아이디">아이디</option>
              <option value="이름">이름</option>
            </select>
          </div>
          <input class="input-text" type="text">
        </v-flex>
      </v-layout>
      <span class="text-xs-center search-btn">
        <v-btn color="primary" dark>검색</v-btn>
      </span>
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
          <span class="item-headers" slot="activator">
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
          <td class="text-xs-left">{{ props.item.number }}</td>
          <td class="text-xs-left">{{ props.item.customer }}</td>
          <td class="text-xs-right">{{ props.item.customer_code }}</td>
          <td class="text-xs-right">{{ props.item.address }}</td>
          <td class="text-xs-right">{{ props.item.exponent }}</td>
          <td class="text-xs-right">{{ props.item.call_number }}</td>
          <td class="text-xs-right">{{ props.item.date }}</td>
        </template>
      </v-data-table>
      <div class="bottom-contents-wrap">
        <span class="bottom-total">전체건수 : <span class="bottom-total-result">{{desserts.length}}</span> 건</span>
        <div class="bottom-btn-wrap">
          <!-- <v-btn color="primary" dark @click.stop="dialog = true">등록</v-btn> -->
          <v-btn color="error" dark>삭제</v-btn>
        </div>
      </div>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      selected: [],
      headers: [
        { text: '번호', align: 'left', value: '번호', sortable: false, },
        { text: '고객사', align: 'left', value: '고객사', sortable: false, },
        { text: '구분', align: 'right', value: '구분', sortable: false, },
        { text: '이름', align: 'right', value: '이름', sortable: false, },
        { text: '부서', align: 'right', value: '부서', sortable: false, },
        { text: '최종로그인', align: 'right', value: '최종로그인', sortable: false, },
        { text: '상태', align: 'right', value: '상태', sortable: false, },
      ],
      desserts: [
        {
          value: false,
          number: "1",
          customer: 159,
          customer_code: 6.0,
          address: 24,
          exponent: 4.0,
          call_number: "1%",
          date: "1%"
        },
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
// .tableBs {
//   &-header {
//     text-align: left;
//     h2 {
//       font-weight: 500;
//       color: #646464;
//     }
//   }
//   &-top {
//     text-align: left;
//     margin: 25px 0;
//     padding: 25px;
//     background-color: #fff;
//     -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
//     box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
//     p, span {
//       color: #646464;
//       font-size: 16px;
//       font-weight: 600;
//     }
//     .sm6 {
//       max-width: 250px;
//       .input-select {
//         width: 50%;
//       }
//     }
//     .selectbox {
//       display: inline-block;
//       position: relative;
//       width: 100px;
//       border: 1px solid #e6e6e6;
//       border-radius: 5px;
//       z-index: 1;
//       margin-left: 10px;
//       &:before {
//         content: "";
//         position: absolute;
//         top: 50%;
//         right: 5px;
//         width: 0;
//         height: 0;
//         margin-top: -1px;
//         border-left: 5px solid transparent;
//         border-right: 5px solid transparent;
//         border-top: 5px solid #999;
//       }
//       select {
//         width: 100%;
//         height: auto;
//         padding: 5px;
//         border-radius: 5px;
//         -webkit-appearance: none;
//         -moz-appearance: none;
//         appearance: none;
//       }
//     }
//     .input-text {
//       border: 1px solid #e6e6e6;
//       padding: 5px;
//       border-radius: 5px;
//       margin-left: 10px;
//     }
//     button {
//       border-radius: 5px;
//       height: 32px;
//       margin: -5px 0 -1px 5px;
//       float: right;
//     }
//   }
//   .inspire {
//     background: #fff;
//     -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
//     box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
//     height: 537px;
//     .elevation-1 {
//       -webkit-box-shadow: none !important;
//       box-shadow: none !important;
//     }
//     .text-xs-center {
//       margin-top: 25px;
//       button {
//         float: right;
//         border-radius: 5px;
//       }
//     }
//   }

//   //=============================== 모달
//   .v-dialog {
//     .card-right {
//       width: 40%;
//       position: absolute;
//       top: 75px;
//       right: 20%;
//       .contract-wrap {
//         > div {
//           height: 45px;
//         }
//       }
//     }
//     .v-list {
//       padding: 0 0 50px 0;
//     }
//     .v-list--three-line {
//       > div {
//         height: 45px;
//       }
//       .input-title {
//         color: #646464;
//         font-size: 14px;
//         text-align: right;
//         width: 120px;
//       }
//       .input-mr {
//         margin-right: 15px;
//       }
//       .text-danger {
//         color: #d26a5c;
//       }
//       .input-text {
//         border: 1px solid #e6e6e6;
//         padding: 5px;
//         border-radius: 5px;
//         margin-left: 25px;
//         width: 350px;
//       }
//       .input-file {
//         font-size: 12px;
//         margin-left: 25px;
//         width: 150px;
//       }
//       .input-tel {
//         width: 110px;
//         margin-left: 10px;
//       }
//       .file-txt {
//         font-size: 10px;
//         margin-left: 20px;
//       }
//       .selectbox {
//         display: inline-block;
//         position: relative;
//         width: 110px;
//         border: 1px solid #e6e6e6;
//         border-radius: 5px;
//         z-index: 1;
//         margin-left: 25px;
//         &:before {
//           content: "";
//           position: absolute;
//           top: 50%;
//           right: 5px;
//           width: 0;
//           height: 0;
//           margin-top: -1px;
//           border-left: 5px solid transparent;
//           border-right: 5px solid transparent;
//           border-top: 5px solid #999;
//         }
//         select {
//           width: 100%;
//           height: auto;
//           padding: 5px;
//           border-radius: 5px;
//           -webkit-appearance: none;
//           -moz-appearance: none;
//           appearance: none;
//         }
//       }
//     }
//   }
// }
</style>
