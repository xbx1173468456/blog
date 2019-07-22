import {mapState} from 'vuex'

/**
 * 公共混合类
 */
export default {
  computed: {
    ...mapState({
      app: state => state.app,
      screenHeight: state => state.app.screenHeight,
      userLogin: state => state.user.login,
      menus: state => state.user.login.menus,
      elements: state => state.user.login.elements,
      dataEnum: state => state.common.dataEnum
    })
  }
}
