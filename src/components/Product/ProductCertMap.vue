<template>
  <GmapMap
    :center="{lat: 35, lng: 118}"
    :zoom="5"
    map-type-id="roadmap"
    style="height: 750px"
  >
      <gmap-cluster :grid-size="50">
        <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
      />
      </gmap-cluster>
  </GmapMap>
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
    };
  }
};  
</script>

<style>

</style>
