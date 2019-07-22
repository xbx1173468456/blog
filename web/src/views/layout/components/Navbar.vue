<template>

  <el-menu :default-active="rootMenusSelectedCode" class="navbar" mode="horizontal" text-color="#ffffff">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened"/>
    <message :notice-click="noticeFun" :is-notice="sidebar.noticed"/>
    <!--<error-log class="errLog-container left-menu-item hover-effect"/>-->
    <screenfull class="screenfull-container left-menu-item hover-effect"/>
    <div class="menu-first">
      <el-menu-item v-for="(item,index) in rootMenus" :router="true" :index="item.code.toString()" :key="item.id">
        <router-link :to="item.href" class="inlineBlock" @click.native="childrenMenus(item)"> <i :class="item.icon"/>{{ item.title }}</router-link>
      </el-menu-item>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="@/assets/img/layout/20150601143522_4kxuZ.png">
        <div class="user-name">
          <span>您好！</span>
          <span :title="username">{{ username }}</span>
        </div>
        <i class="el-icon-arrow-down"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item> 首页 </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span style="display:block;" @click="logout">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import {
  mapGetters, mapState
} from 'vuex'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import Message from './Message'
export default {
  components: {
    Hamburger,
    ErrorLog,
    Screenfull,
    Message
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'rootMenus',
    ]),
    ...mapState({
      username: state => state.user.login.username,
      imageUrl: state => state.user.login.imageUrl
    }),
    rootMenusSelectedCode() {
      let rootMenusSelected = this.$store.getters.rootMenusSelected;
      this.childrenMenus(rootMenusSelected);
      return rootMenusSelected.code;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut')
        .then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
    },
    noticeFun() {
      this.$message.error('开发中，敬请期待...')
    },
    childrenMenus(menu) {
      this.$store.dispatch('ChildrenMenus', menu).then(() => {
      }).catch(() => {
      })
      //删除tags
      // this.$store.dispatch('delAllViewsProduct',this.$route).then(({ visitedViews }) => {
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    background-color: #2979FF;
    height: 62px;
    line-height: 62px;
    border-radius: 0 !important;
    border-width: 0;
    .left-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      /deep/ .svg-icon{
        width: 24px;
        height: 24px;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    /deep/ .errLog-container,/deep/ .screenfull-container{
      display: inline-block;
      position: relative;
      top: -8px;
      margin-left: 2px;
    }
    &.el-menu--horizontal .el-menu-item {
      height: 42px;
      line-height: 42px;
      border-radius: 4px;
      margin-right: 6px;
      padding-left: 10px;
      padding-right: 18px;
      i{
        &.ka-icon-cooperative-office{
          background: url("../../../assets/img/layout/cooperative-office.png") no-repeat;
        }
        &.ka-icon-business{
          background: url("../../../assets/img/layout/business.png") no-repeat;
        }
        &.ka-icon-construction{
          background: url("../../../assets/img/layout/construction.png") no-repeat;
        }
        &.ka-icon-owner{
          background: url("../../../assets/img/layout/owner.png") no-repeat;
        }
        &.ka-icon-system{
          background: url("../../../assets/img/layout/system.png") no-repeat;
        }
        &.ka{
          background-position: 8px;
        }
      }
    }
    &.el-menu--horizontal .el-menu-item:hover{
      background-color: #0864FF;
    }
    &.el-menu--horizontal .el-menu-item a{
      color: #dde2ff;
      font-size: 16px;
    }
    .el-menu-item.is-active{
      background-color: #0046B8;
    }
    .menu-first {
      float: right;
      margin-right: 210px;
      margin-top: 10px;
      display: inline-flex;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .avatar-container {
      height: 64px;
      display: inline-block;
      position: absolute;
      right: 35px;
      width: 167px;
      border-left: 1px solid rgba(255,255,255,0.4);;
      padding-left: 16px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 10px;
        position: relative;
        width:140px;
        height:100%;
        .user-avatar {
          width: 42px;
          height: 42px;
          border-radius: 6px;
          position: absolute;
          left: 0;
        }
        .user-name {
          width: 80px;
          height: 40px;
          position: absolute;
          right: 0;
          span{
            display: block;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            color: #fff;
            font-size: 12px !important;
            height: 20px;
            line-height: 24px;
          }
        }
        .el-icon-arrow-down {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
  @media screen and (max-width: 1500px){
    .navbar {
      .menu-first {
        margin-right: 210px;
      }
      &.el-menu--horizontal .el-menu-item {
        padding-left: 0;
        margin-right: 6px;
        padding-right: 6px;
        a{
          font-size: 14px;
        }
        i.ka{
          width: 44px;
          background-position: 8px;
        }
      }
    }
  }
  @media screen and (max-width: 1200px){
    .navbar {
      .menu-first {
        margin-right: 210px;
      }
      &.el-menu--horizontal .el-menu-item {
        padding-left: 2px;
        margin-right: 2px;
        padding-right: 8px;
        a{
          font-size: 12px;
        }
        i.ka{
          width: 38px;
          background-position: 6px;
        }
      }
    }
  }
  @media screen and (max-width: 900px){
    .navbar {
      &.el-menu--horizontal .el-menu-item {
        padding-left: 8px;
        i.ka{
          display: none;
        }
      }
    }
  }
</style>
