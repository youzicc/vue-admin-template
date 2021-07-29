<template>
  <el-aside width="300px"
            id="asideNav">
    <div class="logo-name"
         v-if="$store.getters.logoShow">
      <img @click="dolist"
           :src="logoImg" />
    </div>
    <div class="logo-name"
         v-else>
      <img @click="dolist"
           :src="logoImg" />
      <p>vue-admin-template</p>
    </div>
    <el-menu class="el-menu-vertical"
             :collapse-transition="true"
             @select="selectmenu"
             :collapse="$store.getters.isCollapse"
             :router="$store.getters.uniquerouter"
             :unique-opened="$store.getters.uniquerouter"
             :default-active="$route.path"
             background-color="#03152A"
             text-color="rgba(255,255,255,.7)"
             active-text-color="#ffffff">

      <template v-for="(item,index) in $store.getters.routers"
                v-if="!item.hidden">
        <el-submenu v-if="!item.alone&&item.children.length>0"
                    :index="index+''"
                    :key='index'>
          <template slot="title">
            <i :class="item.iconCls?item.iconCls:[fa,fa-server]"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <menu-tree :menuData="item.children"></menu-tree>
        </el-submenu>
        <el-menu-item :index="item.path"
                      v-else
                      :key="item.path">
          <i :class="item.iconCls?item.iconCls:[fa,fa-file]"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import menuTree from './menuTree'
import { LoadNavigationBar } from "@/api/api"

export default {
  name: "LayoutAside",
  data () {
    return {
      logoImg: require('@/assets/loginBg.png'),
    }
  },
  components: {
    menuTree,
  },
  watch: {
    '$router.path': function (val) {
      this.selectmenu(val)
    }
  },
  created () {
    sessionStorage.setItem("path", this.$route.path)
    // this.LoadNavigationBar()
  },
  methods: {
    // LoadNavigationBar () {
    //   LoadNavigationBar().then((res) => {
    //     if (res.data.StatusCode == 'Ok') {
    //       console.log(res, 2292929)
    //     }
    //   })
    // },
    dolist () {
      let router = this.$store.getters.routers
      console.log(router);
    },

    selectmenu (key, indexpath) {
      // this.$router.push(indexpath.join("/"))
      let router = this.$store.getters.routers
      let name = ""
      let navTitle = function (path, routerARR) {
        for (let i = 0; i < routerARR.length; i++) {
          if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
            if (routerARR[i].path === path && routerARR[i].children.length < 1) {
              name = routerARR[i].name
              break
            }
            navTitle(path, routerARR[i].children)
          }
        }
        return name
      }
      // sessionStorage.setItem("path", key)
      this.$store.dispatch("addTab", {
        title: navTitle(key, router),
        path: key,
      })
    }
  }
}
</script>

<style lang='scss'>
#asideNav {
  width: auto !important;
  display: flex;
  flex-direction: column;
  // width: auto !important;
  // display: flex;
  // flex-direction: column;
  // border-right: solid 1px #e6e6e6;
  .logo-name {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #03152a;
    @extend %w100;
    font-weight: 300;
    z-index: 999;
    @extend %cursor;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    img {
      width: 37px;
      height: 33px;
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    @extend %h100;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .el-menu {
    flex: 1;
    overflow: inherit;
    border-right: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-menu-item {
    // background-color: #020f1d !important;
    // border-bottom: 1px solid #020f1d;
    &:hover {
      color: #ffffff !important;
      background-color: #375573 !important;
    }
  }
  .el-menu-item.is-active {
    background-color: #56a9ff !important;
  }
  .is-opened > .el-submenu__title > .el-icon-arrow-down {
    color: #ffffff;
    font-weight: 500;
    font-size: 18px;
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


