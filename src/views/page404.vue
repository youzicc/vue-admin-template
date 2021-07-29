<template>
  <div class="Pages404Warper">
    <div class="Centers404">

      <div>
        <p class="Nub404">404!</p>
        <p class="tip404">很抱歉<span>!</span>您的访问页面可能被删除或者不存在</p>
        <div class="Btn404"
             @click="handleClick404()">点我返回首页</div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'page404',
  data () {
    return {}
  },
  methods: {
    handleClick404 () {
      sessionStorage.removeItem("addTab");
      this.$router.replace('/index')

    },
  }
}
</script>
<style lang="scss">
.Pages404Warper {
  background: #fff;
  height: 100vh;
  .Centers404 {
    background: #fff;
    display: flex;
    justify-content: center;
    padding-top: 200px;
    height: 100vh;
    .Nub404 {
      font-size: 120px;
    }
    .tip404 {
      // color: dodgerblue;
      font-size: 18px;
    }
    .Btn404 {
      margin-top: 30px;
      // background: dodgerblue;
      width: 120px;
      // border: 1px solid dodgerblue;
      font-size: 18px;
      text-align: center;
      color: dodgerblue;
      padding: 5px 5px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>