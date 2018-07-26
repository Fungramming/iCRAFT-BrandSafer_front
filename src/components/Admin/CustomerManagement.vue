<template>
  <div class="tableBs">
    <!-- table header -->
    <div class="tableBs-header">
      <h2>고객사 관리</h2>
    </div>
    <!-- table top menu -->
    <div class="tableBs-top">
      <p>검색 조건</p>
      <span>검색어</span>
      <div class="selectbox">
        <select id="select1" name="searchType" class="form-control" size="1">
          <option selected value="고객사">고객사</option>
          <option value="대표자">대표자</option>
        </select>
      </div>
      <input class="input-text" type="text">
      <span class="text-xs-center">
          <v-btn color="primary" dark>검색</v-btn>
      </span>
    </div>
    <!-- table wrap -->
    <v-app class="inspire">
      <div>
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
            <v-tooltip bottom>
              <span slot="activator" class="item-headers">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
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
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          <v-btn color="primary" dark @click.stop="dialog = true">등록</v-btn>
          <v-btn color="error" dark>삭제</v-btn>
        </div>
      </div>
    </v-app>
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
        <!-- 내용이 많을경우 왼쪽, 오른쪽 면 분할 -->
        <!-- left side modal -->
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-list-tile avatar>
                <label class="input-title">고객사코드
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="고객사코드">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">고객사(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="고객사(한국어)">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">고객사(영어)</label>
                <input class="input-text" type="text">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">고객사(중국어)</label>
                <input class="input-text" type="text">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">주소(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="주소(한국어)">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">주소(영어)</label>
                <input class="input-text" type="text">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">주소(중국어)</label>
                <input class="input-text" type="text">
              </v-list-tile>
              <v-list-tile avatar>
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
              </v-list-tile>
              <v-list-tile avatar>
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
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">대표자(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="대표자(한국어)">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">대표자(영어)</label>
                <input class="input-text" type="text" required="required">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">대표자(중국어)</label>
                <input class="input-text" type="text" required="required">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title input-mr">사업자등록번호
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text input-tel" type="tel">
                <input class="input-text input-tel" type="tel">
                <input class="input-text input-tel" type="tel">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">사업자등록증
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">CI
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">URL
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">TnT로고이미지
                  <span class="text-danger">*</span>
                </label>
                <input class="input-file" type="file" required="required">
                <span class="file-txt">(사용가능한 파일 형식 : jpg, gif, png)</span>
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">설명(한국어)
                  <span class="text-danger">*</span>
                </label>
                <input class="input-text" type="text" required="required" placeholder="설명(한국어)">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">설명(영어)</label>
                <input class="input-text" type="text" required="required">
              </v-list-tile>
              <v-list-tile avatar>
                <label class="input-title">설명(중국어)</label>
                <input class="input-text" type="text" required="required">
              </v-list-tile>
            </v-list>
          </v-card-text>
        </div>
        <!-- right side modal -->
        <div class="card-right">
          <v-card-text class="card-text-right">
            <v-list three-line subheader>
                <v-list-tile-content>
                  <v-list-tile-title>계약 정보</v-list-tile-title>
                </v-list-tile-content>
                <div class="contract-wrap">
                  <v-list-tile avatar>
                    <label class="input-title">계약서명
                      <span class="text-danger">*</span>
                    </label>
                    <input class="input-text" type="text" required="required">
                  </v-list-tile>
                  <v-list-tile avatar>
                    <label class="input-title">계약기간
                      <span class="text-danger">*</span>
                    </label>
                    <input class="input-text" type="text" required="required">
                  </v-list-tile>
                  <v-list-tile avatar>
                    <label class="input-title">사업자등록증
                      <span class="text-danger">*</span>
                    </label>
                    <input class="input-file" type="file" required="required">
                    <span class="file-txt">(사용가능한 파일 형식 : pdf)</span>
                  </v-list-tile>
                </div>
            </v-list>
          </v-card-text>
        </div>
        <!-- <div style="flex: 1 1 auto;"></div> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      dialog: false,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "번호", sortable: false },
        { text: "고객사", align: "left", value: "고객사", sortable: false },
        {
          text: "고객사코드",
          align: "right",
          value: "고객사코드",
          sortable: false
        },
        { text: "주소", align: "right", value: "주소", sortable: false },
        { text: "대표자", align: "right", value: "대표자", sortable: false },
        {
          text: "전화번호",
          align: "right",
          value: "전화번호",
          sortable: false
        },
        { text: "가입일자", align: "right", value: "가입일자", sortable: false }
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
        {
          value: false,
          number: "2",
          customer: 237,
          customer_code: 9.0,
          address: 37,
          exponent: 4.3,
          call_number: "1%",
          date: "1%"
        },
        {
          value: false,
          number: "3",
          customer: 262,
          customer_code: 16.0,
          address: 23,
          exponent: 6.0,
          call_number: "7%",
          date: "7%"
        },
        {
          value: false,
          number: "4",
          customer: 305,
          customer_code: 3.7,
          address: 67,
          exponent: 4.3,
          call_number: "8%",
          date: "8%"
        },
        {
          value: false,
          number: "5",
          customer: 356,
          customer_code: 16.0,
          address: 49,
          exponent: 3.9,
          call_number: "16%",
          date: "16%"
        },
        {
          value: false,
          number: "6",
          customer: 375,
          customer_code: 0.0,
          address: 94,
          exponent: 0.0,
          call_number: "0%",
          date: "0%"
        },
        {
          value: false,
          number: "7",
          customer: 392,
          customer_code: 0.2,
          address: 98,
          exponent: 0,
          call_number: "2%",
          date: "2%"
        },
        {
          value: false,
          number: "8",
          customer: 408,
          customer_code: 3.2,
          address: 87,
          exponent: 6.5,
          call_number: "45%",
          date: "45%"
        },
        {
          value: false,
          number: "9",
          customer: 452,
          customer_code: 25.0,
          address: 51,
          exponent: 4.9,
          call_number: "22%",
          date: "22%"
        },
        {
          value: false,
          number: "10",
          customer: 518,
          customer_code: 26.0,
          address: 65,
          exponent: 7,
          call_number: "6%",
          date: "6%"
        },
        {
          value: false,
          number: "11",
          customer: 159,
          customer_code: 6.0,
          address: 24,
          exponent: 4.0,
          call_number: "1%",
          date: "1%"
        },
        {
          value: false,
          number: "12",
          customer: 237,
          customer_code: 9.0,
          address: 37,
          exponent: 4.3,
          call_number: "1%",
          date: "1%"
        },
        {
          value: false,
          number: "13",
          customer: 262,
          customer_code: 16.0,
          address: 23,
          exponent: 6.0,
          call_number: "7%",
          date: "7%"
        },
        {
          value: false,
          number: "14",
          customer: 305,
          customer_code: 3.7,
          address: 67,
          exponent: 4.3,
          call_number: "8%",
          date: "8%"
        },
        {
          value: false,
          number: "15",
          customer: 356,
          customer_code: 16.0,
          address: 49,
          exponent: 3.9,
          call_number: "16%",
          date: "16%"
        },
        {
          value: false,
          number: "16",
          customer: 375,
          customer_code: 0.0,
          address: 94,
          exponent: 0.0,
          call_number: "0%",
          date: "0%"
        },
        {
          value: false,
          number: "17",
          customer: 392,
          customer_code: 0.2,
          address: 98,
          exponent: 0,
          call_number: "2%",
          date: "2%"
        },
        {
          value: false,
          number: "18",
          customer: 408,
          customer_code: 3.2,
          address: 87,
          exponent: 6.5,
          call_number: "45%",
          date: "45%"
        },
        {
          value: false,
          number: "19",
          customer: 452,
          customer_code: 25.0,
          address: 51,
          exponent: 4.9,
          call_number: "22%",
          date: "22%"
        },
        {
          value: false,
          number: "20",
          customer: 518,
          customer_code: 26.0,
          address: 65,
          exponent: 7,
          call_number: "6%",
          date: "6%"
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
