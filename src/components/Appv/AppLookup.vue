<template>
  <div class="tableBs">
    <div class="tableBs-top">
      <p>검색 조건</p>
      <form class="form-inline" action="" method="get" enctype="application/json">
        <label class="control-label" for="pushToken">푸시토큰</label>
        <input class="form-control" type="text" name="query-name" id="pushToken" value="입력이 안됨">
        <input class="submit-btn" type="submit" value="검색도 안됨">
      </form>
    </div>
    <div class="table">
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
          <tr height="80" bgcolor="#a1cfec">
            <th class="table-cell">App명</th>
            <th class="table-cell">등록일</th>
            <th class="table-cell" colspan="2">최초/마지막 인증 일시</th>
            <th class="table-cell">블랙/관리</th>
            <th class="table-cell">OS</th>
            <th class="table-cell">모델명</th>
            <th class="table-cell">언어</th>
            <th class="table-cell" colspan="6">인증내역</th>
            <th class="table-cell">제보</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-cell" rowspan="2">app명</td>
            <td class="table-cell" rowspan="2">등록일</td>
            <td class="table-cell" height="45">최초</td>
            <td class="table-cell">날짜, 시간</td>
            <td class="table-cell" rowspan="2">블랙관리</td>
            <td class="table-cell" rowspan="2">OS</td>
            <td class="table-cell" rowspan="2">모델명</td>
            <td class="table-cell" rowspan="2">언어</td>
            <td class="table-cell">정</td>
            <td class="table-cell">가</td>
            <td class="table-cell">재</td>
            <td class="table-cell">초과</td>
            <td class="table-cell">이용</td>
            <td class="table-cell">일반</td>
            <td class="table-cell" rowspan="2">제보</td>
          </tr>
          <tr>
            <td class="table-cell" height="45">마지막</td>
            <td class="table-cell">날짜, 시간</td>
            <td class="table-cell">정품</td>
            <td class="table-cell">가품</td>
            <td class="table-cell">재인증</td>
            <td class="table-cell">초과</td>
            <td class="table-cell">이용</td>
            <td class="table-cell">일반</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs6 md3 lg2>
            <v-card>
              <v-card-media src="https://idc.brandsafer.com/bsrdif/images/cert_sqr/2018/08/09/_SQR_1_6e26ab9f-ff97-408c-b87a-ac5800e83d93.jpeg" height="150px"></v-card-media>
              <v-card-actions class="cert">
                <v-btn flat color="orange">정가품</v-btn>
              </v-card-actions>
              <v-card-title class="cert-date">
                <span>날짜</span>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
