<template>
  <div class="tableBs">
    <div class="tableBs-top">
      <p>검색 조건</p>
      <v-layout row wrap>
        <v-flex d-flex>
          <span>푸시토큰</span>
          <input class="input-text" type="text">
        </v-flex>
      </v-layout>
    </div>
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
        <tr>
          <th>App명</th>
          <th>등록일</th>
          <th colspan="2">최초/마지막 인증 일시</th>
          <th>블랙/관리</th>
          <th>OS</th>
          <th>모델명</th>
          <th>언어</th>
          <th colspan="6">인증내역</th>
          <th>제보</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2">app명</td>
          <td rowspan="2">등록일</td>
          <td>최초</td>
          <td>날짜, 시간</td>
          <td rowspan="2">블랙관리</td>
          <td rowspan="2">OS</td>
          <td rowspan="2">모델명</td>
          <td rowspan="2">언어</td>
          <td>정</td>
          <td>가</td>
          <td>재</td>
          <td>초과</td>
          <td>이용</td>
          <td>일반</td>
          <td rowspan="2">제보</td>
        </tr>
        <tr>
          <td>마지막</td>
          <td>날짜, 시간</td>
          <td>정품</td>
          <td>가품</td>
          <td>재인증</td>
          <td>초과</td>
          <td>이용</td>
          <td>일반</td>
        </tr>
      </tbody>
    </table>
    <div class="map">
      <GmapMap
        :center="{lat: 35, lng: 118}"
        :zoom="5"
        map-type-id="roadmap"
        style="height: 750px"
      >
        <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
        />
      </GmapMap>
    </div>
    <div class="card-list">
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-media src="" height=""></v-card-media>
            <v-card-actions>
              <v-btn flat color="orange">정가품</v-btn>
            </v-card-actions>
            <v-card-title>
              <span>날짜</span>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/table";
@import "../../scss/modal";
</style>
