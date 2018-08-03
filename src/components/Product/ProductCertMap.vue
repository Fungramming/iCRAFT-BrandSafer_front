<template>
  <div class="tableBs">
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex xs6 md3 lg2>
          <span class="span-without-selectbox">기간조회</span>
          <date-picker v-model="date_start" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs6 md3 lg2>
          <date-picker v-model="date_finish" :lang="lang"></date-picker>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox selectbox-with-date selectbox-top">
            <span>고객사</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="고객사1">고객사1</option>
              <option value="고객사2">고객사2</option>
              <option value="고객사3">고객사3</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox selectbox-top">
            <span>태그타입</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="태그타입1">태그타입1</option>
              <option value="태그타입2">태그타입2</option>
              <option value="태그타입3">태그타입3</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox selectbox-top">
            <span>OS</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="OS1">OS1</option>
              <option value="OS2">OS2</option>
              <option value="OS3">OS3</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox selectbox-top">
            <span>인증결과</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="인증결과1">인증결과1</option>
              <option value="인증결과2">인증결과2</option>
              <option value="인증결과3">인증결과3</option>
            </select>
          </div>
        </v-flex>
        <v-flex d-flex xs12 md6 lg4>
          <div class="selectbox select-search selectbox-top">
            <span>검색어</span>
            <select id="select1" name="searchType" class="form-control" size="1">
              <option value="전체" selected>전체</option>
              <option value="검색어1">검색어1</option>
              <option value="검색어2">검색어2</option>
              <option value="검색어3">검색어3</option>
            </select>
          </div>
          <input class="input-text" type="text">
        </v-flex>
        <!-- <v-checkbox class="app" label="블랙리스트 App" v-model="blist_app"></v-checkbox>
        <v-checkbox class="region" label="블랙리스트 지역" v-model="blist_region"></v-checkbox>
        <v-checkbox class="delete" label="블랙리스트 삭제 포함" v-model="blist_delete"></v-checkbox> -->
      </v-layout>
    </div>
    <div class="map">
      <div class="map-header">
        <div class="total">전체건수 : <span class="total-result">{{markers.length}}</span> 건</div>
        <v-checkbox class="cluster" label="Cluster" v-model="clustering"></v-checkbox>

      </div>
      <GmapMap
        :center="{lat: 35, lng: 118}"
        :zoom="5"
        map-type-id="roadmap"
        style="height: 750px"
      >
          <gmap-cluster v-if="clustering === true" :grid-size="50">
            <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            @click="center=m.position"
            />
          </gmap-cluster>
          <GmapMarker 
          v-else
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="center=m.position"
          />
          
      </GmapMap>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {
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
      clustering: true,
      blist_app: false,
      blist_region: false,
      blist_delete: false,
      markers: [
        {position: {
          lat: 37, 
          lng: 127
          }
        },
        {position: {
          lat: 30, 
          lng: 127
          }
        },
        {position: {
          lat: 34, 
          lng: 127
          }
        },
        {position: {
          lat: 40, 
          lng: 127
          }
        },
        {position: {
          lat: 37, 
          lng: 126.5
          }
        },
        {position: {
          lat: 37, 
          lng: 126
          }
        },
        {position: {
          lat: 37, 
          lng: 125.5
          }
        },
        {position: {
          lat: 37, 
          lng: 125
          }
        },
        {position: {
          lat: 37, 
          lng: 124.5
          }
        },
        {position: {
          lat: 37, 
          lng: 124
          }
        },
        {position: {
          lat: 37, 
          lng: 123.5
          }
        },
        {position: {
          lat: 37, 
          lng: 123
          }
        }
      ]
    };
  }
};  
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
