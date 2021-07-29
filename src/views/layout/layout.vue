<template>
  <el-container>
    <layout-aside></layout-aside>
    <el-container class="elContaintFlex loading-area">
      <layout-header></layout-header>
      <el-main class="">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <!-- <router-view /> -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import { mapMutations } from 'vuex'
import LayoutHeader from './Header/header'
import LayoutAside from './Aside/aside'
export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutAside
  },
  data () {
    return {
      // url: process.env.VUE_APP_URL
    }
  },
  methods: {
    // ...mapMutations([
    //   //约定将mutation里的方法名为大写，并且导入时要给其加上引号
    //   'ADD',
    //   'DELETED'
    // ])
  },
  created () {
    // console.log(this.$route.meta.keepAlive)
    // this.$router.push('/index')
  }
}
</script>
<style>
.elContaintFlex {
  flex-direction: column;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 10px 20px 20px 20px;
  /* overflow: inherit; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #f2f2f2;
  font-size: 14px;
  color: #333333;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#loyout,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}
</style>

