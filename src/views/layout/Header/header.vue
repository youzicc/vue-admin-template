<template>
  <div>
    <el-header id="header">
      <div @click="collapse"><i class="el-icon-s-fold"></i></div>
      <div>

        <el-dropdown>
          <span class="el-dropdown-link">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>基本资料</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>登录记录</el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <tabNav></tabNav>
  </div>
</template>
<script>
import { outLogin } from "@/api/api"
import Cookies from "js-cookie"
import tabNav from "./tabNav"
export default {
  name: 'LayoutHeader',
  components: { tabNav },
  data () {
    return {
      userName: localStorage.getItem('userName')
    }
  },
  methods: {

    // 基本资料
    clickbasicInformation () {
      this.$router.replace('/basicInformation');
    },
    // 修改密码
    clickchangePassword () {
      this.$router.replace('/changePassword');
    },
    // 登录记录
    clickloginRecord () {
      this.$router.replace('/loginRecord');
    },
    collapse () {
      this.$store.dispatch('collapse');
    },

    logout () {
      Cookies.remove("token")
      this.$router.push({ path: "/login" });
      location.reload()
    }
  },

}
</script>
<style lang='scss'>
#header {
  background-color: #fff;
  color: #333;
  line-height: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @extend %cursor;
  .el-icon-s-fold {
    font-size: 24px;
    @extend %cursor;
  }
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
.el-container,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}
</style>