<template>
  <div id="app">
    <el-container class="root-container">
      <!-- <transition name="el-fade-in-linear">
      <iframe v-if="loading" class="root-iframe" src="word/index.html" frameborder="0"></iframe>
    </transition> -->
      <el-header height="80px" class="app-header-x">
        <root-header />
      </el-header>
      <el-container class="root-main-container">
        <el-aside class="root-nav-l" width="auto">
          <root-nav />
        </el-aside>
        <el-main class="root-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import RootNav from "./components/RootNav";
import RootHeader from "./components/RootHeader";
export default {
  name: "App",
  components: {
    RootNav,
    RootHeader,
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style>
.root-container {
  height: 100%;
  overflow: hidden;
}

.app-header-x {
  padding: 0 !important;
}

.root-main-container {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.root-nav-l {
  height: 100%;
  overflow-y: hidden;
  box-sizing: border-box;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
}

.root-main {
  padding: 0 !important;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  overflow: hidden;
}

.root-iframe {
  height: 100%;
  width: 100%;
  z-index: 999;
  position: fixed;
}
</style>
