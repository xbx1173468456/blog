<template>
	<div class="hamburger-container">
    <i class="ka ka-icon-top-nav" @click="toggleClick" :class="{'is-active':isActive}"></i>
	</div>
</template>

<script>
  export default {
    name: 'hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .hamburger-container {
    margin-top: 8px;
    display: inline-block;
    cursor: pointer;
    i {
      &.ka-icon-top-nav {
        background: url("../../assets/img/layout/top-nav.png") no-repeat;
        background-position: 8px;
        transform: rotate(0deg);
        transition: .38s;
        transform-origin: 50% 50%;
        &.is-active {
          transform: rotate(90deg);
        }
      }
    }
  }

</style>
