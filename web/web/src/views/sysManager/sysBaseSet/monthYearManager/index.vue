<template>
  <basic-split-pane class="monthYearManager-container-index">
    <template slot="leftContainer">
      <year-plate></year-plate>
    </template>
    <template slot="rightContainer">
      <monthPlate></monthPlate>
    </template>
  </basic-split-pane>
</template>

<script>
  import monthPlate from './month'
  import yearPlate from './year'

  export default {
    components: {
      monthPlate,
      yearPlate
    }
  }
</script>
