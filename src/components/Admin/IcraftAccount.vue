<template>
  <div class="tableBs">
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
        :items="account"
        :search="search"
        :pagination.sync="pagination"
        v-model="selected"
        item-key="name"
        select-all
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
            <td class="text-xs-left">{{ total - props.index - (pagination.page -1)* pagination.rowsPerPage }}</td>
            <td class="text-xs-left">{{ props.item.role }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left"><a @click.stop="showEditModal">{{ props.item.id }}</a></td>
            <td class="text-xs-left">{{ props.item.department }}</td>
            <td class="text-xs-left">{{ props.item.dtLastConnected }}</td>
            <td class="text-xs-left">{{ props.item.state }}</td>
          </tr>
        </template>
      </v-data-table>
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
            <v-btn color="error" dark @click.stop="deleteDatas">삭제</v-btn>
          </v-flex>
          <v-flex d-flex xs12 sm12 md1>
            <v-btn color="primary" dark @click.stop="showModal">등록</v-btn>
          </v-flex>
        </v-layout>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="7"></v-pagination>
        </div>
      </div>
    </v-app>

    <!-- modal -->
    <v-flex v-if="modal" d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size" name="account" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>iCraft 계정관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="addDatas">저장</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">권한
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox_arrow"></span>
                <select id="telephone1" v-model="submitData.role" class="form-control selectbox selectbox-100 require-input" name="telephone1">
                  <option selected value="10">iCraft 관리자</option>
                  <option value="11">iCraft 사용자</option>
                  <option value="1">iCraft Super Admin</option>
                </select>
                <span class="required-notice">*필수 입력사항입니다.</span>                
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이름
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.name" class="input-text require-input" type="text" required="required">
                <span class="required-notice">*필수 입력사항입니다.</span>

              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">아이디
                  <span class="text-danger">*</span>
                </label>
                <input v-model="submitData.id" class="input-text require-input" type="text">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">비밀번호
                  <span class="text-danger">*</span>
                </label>
                <input ref="pwd1" v-model="pwd" class="input-text require-input" type="password" placeholder="( * 5~15자 이내의 영/숫자 조합 )" maxlangth="15">
                <span class="required-notice">*필수 입력사항입니다.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">비밀번호 확인
                  <!-- <span class="text-danger">*</span> -->
                </label>
                <input ref="pwd2" v-model="repwd" class="input-text require-input" type="password" maxlangth="15">
                <span ref="pwdNotice" class="required-notice-pwd">*비밀번호를 확인하세요.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이메일</label>
                <input v-model="first_mail" class="input-text input-mail" type="mail">
                <span class="selectbox selectbox-mail">
                  <select id="mail1" v-model="last_mail" class="form-control" name="mail1">
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option>
                  </select>
                </span>
                <input v-model="last_mail" class="input-text input-mail" type="mail">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">전화번호</label>
                <span class="selectbox">
                  <select id="telephone1" v-model="firstNum_tel" class="form-control" name="telephone1">
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
                <input v-model="midNum_tel" class="input-text input-tel" type="tel" maxlength="4">
                <input v-model="lastNum_tel" class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">핸드폰번호</label>
                <span class="selectbox">
                  <select id="telephone1" v-model="firstNum_phone" class="form-control" name="telephone1">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                </span>
                <input v-model="midNum_phone" class="input-text input-tel" type="tel" maxlength="4">
                <input v-model="lastNum_phone" class="input-text input-tel" type="tel" maxlength="4">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">직위</label>
                <input v-model="submitData.position" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">부서</label>
                <input v-model="submitData.department" class="input-text" type="text" required="required">
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
      </modal>
    </v-flex>

    <!-- modal edit -->
    <v-flex d-flex xs12 sm12 md12>
      <modal :width="modal_size" :height="modal_size_height" name="account_edit" transition="pop-out">
        <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="closeModal">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>iCraft 수정</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.stop="updateDatas">수정</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="card-left">
          <v-card-text>
            <v-list three-line subheader>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">권한
                  <span class="text-danger">*</span>
                </label>
                <span class="selectbox selectbox-100">
                  <select id="telephone1" ref="roleAuth" v-model="updateData.role" class="form-control" name="telephone1">
                    <option selected value="10">iCraft 관리자</option>
                    <option value="11">iCraft 사용자</option>
                    <option value="1">iCraft Super Admin</option>
                  </select>
                </span>
              </v-flex>    
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이름
                  <span class="text-danger">*</span>
                </label>
                <input ref="name" v-model="updateData.name" class="input-text not-allowed" type="text" required="required" disabled>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">아이디
                  <span class="text-danger">*</span>
                </label>
                <input ref="id" v-model="updateData.id" class="input-text not-allowed" type="text" disabled>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">비밀번호
                  <span class="text-danger">*</span>
                </label>
                <input ref="pwd1_u" v-model="updateData.pwd" class="input-text" type="password" placeholder="( * 5~15자 이내의 영/숫자 조합 )" maxlength="15">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">비밀번호 확인
                  <!-- <span class="text-danger">*</span> -->
                </label>
                <input ref="pwd2_u" v-model="repwd" class="input-text" type="password" placeholder="* 비밀번호 확인" maxlength="15">
                <span ref="pwdNotice" class="required-notice-pwd">*비밀번호를 확인하세요.</span>
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">이메일</label>
                <input v-model="updateData.email" class="input-text" type="mail">
                <!-- <span class="selectbox selectbox-mail">
                  <select id="mail1" class="form-control" name="mail1">
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option>
                  </select>
                </span>
                <input v-model="selected_email_2" class="input-text input-mail" type="mail"> -->
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">전화번호</label>
                <!-- <span class="selectbox">
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
                <input v-model="selected_telephone_1" class="input-text input-tel" type="tel" maxlength="4">
                <input v-model="selected_telephone_2" class="input-text input-tel" type="tel" maxlength="4"> -->
                <input v-model="updateData.telephone" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">핸드폰번호</label>
                <!-- <span class="selectbox">
                  <select id="telephone1" class="form-control" name="telephone1">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                </span>
                <input v-model="selected_phone_1" class="input-text input-tel" type="tel" maxlength="4">
                <input v-model="selected_phone_2" class="input-text input-tel" type="tel" maxlength="4"> -->
                <input v-model="updateData.phone" class="input-text" type="text">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">직위</label>
                <input v-model="updateData.position" class="input-text" type="text" required="required">
              </v-flex>
              <v-flex d-flex xs12 sm12 md5>
                <label class="input-title">부서</label>
                <input v-model="updateData.department" class="input-text" type="text" required="required">
              </v-flex>
            </v-list>
          </v-card-text>
        </div>
      </v-card>
      </modal>
    </v-flex>
  </div>
</template>

<script>
import Constant from "../../constant.js";
import { checkRequired } from "../CompHelper.js";

export default {
  data() {
    return {
      modal: true,
      search: "",
      modal_size: Constant.MODAL_SIZE,
      modal_size_height: Constant.MODAL_SIZE_HEIGHT,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      total: "",
      total_index: "",
      selected: [],
      headers: [
        { text: "번호", align: "left", value: "idx", sortable: false },
        { text: "구분", align: "left", value: "role", sortable: false },
        { text: "이름", align: "left", value: "name", sortable: false },
        { text: "아이디", align: "left", value: "id", sortable: false },
        { text: "부서", align: "left", value: "department", sortable: false },
        {
          text: "최종 로그인",
          align: "left",
          value: "dtLastConnected",
          sortable: false
        },
        { text: "상태", align: "left", value: "state", sortable: false }
      ],
      account: [],

      // For edit modal
      selected_index: "",
      // selected_email: "",
      // selected_email_1: "",
      // selected_email_2: "",
      // selected_phone: "",
      // selected_phone_1: "",
      // selected_phone_2: "",
      // selected_telephone: "",
      // selected_telephone_1: "",
      // selected_telephone_2: "",
      // selected_position: "",
      // selected_role: "",
      // selected_name: "",
      // selected_id: "",
      // selected_department: "",
      // selected_state: "",

      // For submit
      firstNum_tel: "",
      midNum_tel: "",
      lastNum_tel: "",
      firstNum_phone: "",
      midNum_phone: "",
      lastNum_phone: "",
      first_mail: "",
      last_mail: "",
      pwd: "",
      repwd: "",
      checkPwdValue: false,

      // add
      submitData: {
        department: "",
        // ?
        dtLastConnected: "",
        dtModified: "",
        dtRegistered: this.$store.state.submitTime,
        email: "",
        failCount: 0,
        id: "",
        modifier: "",
        name: "",
        note: "",
        phone: "",
        position: "",
        // ?
        pwd: "",
        registrant: this.$store.state.user.modifier,
        role: "",
        state: "Registered",
        telephone: ""
      },

      // update
      updateIndex: "",
      updateData: {
        department: "",
        // ?
        dtLastConnected: "",
        dtModified: this.$store.state.submitTime,
        dtRegistered: "",
        email: "",
        failCount: 0,
        id: "",
        modifier: this.$store.state.user.modifier,
        name: "",
        note: "",
        phone: "",
        position: "",
        // ?
        pwd: "",
        registrant: "",
        role: "",
        state: "Registered",
        telephone: ""
      }
    };
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) {
        return 0;
      }
      return Math.ceil(this.total / this.pagination.rowsPerPage);
    }
  },
  watch: {
    pwd: function() {
      this.submitData.pwd = this.pwd;
      this.checkPassword();
    },
    repwd: function() {
      this.checkPassword();
    }
  },
  updated() {
    checkRequired();
    if (this.firstNum_tel && this.midNum_tel && this.lastNum_tel) {
      this.submitData.telephone =
        this.firstNum_tel + "-" + this.midNum_tel + "-" + this.lastNum_tel;
    }
    if (this.firstNum_phone && this.midNum_phone && this.lastNum_phone) {
      this.submitData.phone =
        this.firstNum_phone +
        "-" +
        this.midNum_phone +
        "-" +
        this.lastNum_phone;
    }
    if (this.first_mail && this.last_mail) {
      this.submitData.email = this.first_mail + "@" + this.last_mail;
    }
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    getDatas() {
      this.$store.dispatch(Constant.FETCH_ICRAFT_USER).then(resp => {
        this.account = resp.data["icrf-users"].reverse();
        this.total = this.account.length;
      });
    },
    addDatas() {
      this.checkPassword();
      checkRequired();
      if (
        this.submitData.role &&
        this.submitData.name &&
        this.submitData.id &&
        this.submitData.pwd &&
        this.checkPwdValue == true
      ) {
        this.$store
          .dispatch(Constant.ADD_ICRAFT_USER, this.submitData)
          .then(resp => {
            console.log("resp :", resp);
            this.getDatas();
            this.closeModal();
            this.$store.commit(Constant.SHOW_MODAL, {
              isModal: true,
              modalText: "등록 되었습니다."
            });
          })
          .catch(err => {
            console.log("err :", err);
          });
      }
    },
    deleteDatas() {
      for (let item in this.selected) {
        this.$store
          .dispatch(Constant.DELETE_ICRAFT_USER, this.selected[item].idx)
          .then(() => {
            this.getDatas();
          });
      }
      this.$store.commit(Constant.SHOW_MODAL, {
        isModal: true,
        modalText: "삭제 되었습니다."
      });
    },
    updateDatas({ idx, user }) {
      this.checkPassword();
      idx = this.updateIndex;
      user = this.updateData;
      if (
        this.updateData.role &&
        this.updateData.name &&
        this.updateData.id &&
        this.updateData.pwd &&
        this.checkPwdValue == true
      ) {
        this.$store
          .dispatch(Constant.UPDATE_ICRAFT_USER, {
            uid: idx,
            user: user
          })
          .then(() => {
            this.getDatas();
            this.closeModal();
            this.$store.commit(Constant.SHOW_MODAL, {
              isModal: true,
              modalText: "수정 되었습니다."
            });
          })
          .catch(err => {
            console.log("err :", err);
          });
      }
    },
    showModal() {
      this.$modal.show("account");
    },
    closeModal() {
      let vModal = this.$children[1];
      let vModalEdit = this.$children[2];

      if (vModal.visible) vModal.visible = false;
      else if (vModalEdit.visible) vModalEdit.visible = false;
    },
    checkPassword() {
      let checkNotice = document.getElementsByClassName(
        "required-notice-pwd"
      )[0];
      let rePwdInput = checkNotice.parentNode;
      if (this.submitData.pwd == this.repwd) {
        checkNotice.style.opacity = 0;
        this.checkPwdValue = true;
      } else if (this.updateData.pwd == this.repwd) {
        checkNotice.style.opacity = 0;
        this.checkPwdValue = true;
      } else if (this.submitData.pwd !== this.repwd) {
        console.log("required :", rePwdInput);
        console.log("123123123 :", 123123123);
        rePwdInput.classList.add("warn");
        checkNotice.style.opacity = 1;
        this.checkPwdValue = false;
      } else if (this.updateData.pwd !== this.repwd) {
        rePwdInput.classList.add("warn");
        checkNotice.style.opacity = 1;
        this.checkPwdValue = false;
      }
    },
    showEditModal(e) {
      this.$modal.show("account_edit");
      this.repwd = "";
      this.selected_index = e.target.parentNode.parentNode["sectionRowIndex"];

      this.updateData.state = e.path[2].children[7].innerText;
      this.updateData.department = e.path[2].children[5].innerText;
      this.updateData.id = e.path[2].children[4].innerText;
      this.updateData.name = e.path[2].children[3].innerText;
      this.updateData.role = e.path[2].children[2].innerText;

      this.updateData.email = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].email;
      this.updateData.pwd = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].pwd;
      // let email = this.selected_email.split("@");
      // this.selected_email_1 = email[0];
      // this.selected_email_2 = email[1];

      this.updateData.phone = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].phone;
      // let phone = this.selected_phone.split("-");
      // this.selected_phone_1 = phone[1];
      // this.selected_phone_2 = phone[2];

      this.updateData.telephone = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].telephone;
      // let telephone = this.selected_telephone.split("-");
      // this.selected_telephone_1 = telephone[1];
      // this.selected_telephone_2 = telephone[2];

      this.updateData.position = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].position;
      this.updateData.dtRegistered = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].dtRegistered;
      // this.updateData.dtModified = this.$children[0].$children[1].filteredItems[
      //   this.selected_index
      // ].dtModified;
      this.updateData.dtLastConnected = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].dtLastConnected;
      this.updateData.registrant = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].registrant;
      // this.updateData.modifier = this.$children[0].$children[1].filteredItems[
      //   this.selected_index
      // ].modifier;

      // find index
      this.updateIndex = this.$children[0].$children[1].filteredItems[
        this.selected_index
      ].idx;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.account.slice();
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
