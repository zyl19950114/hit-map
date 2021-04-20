<template>
  <header class="root-header-x">
    <div class="title-x">
      <h2 class="web-title">{{ webTitle }}</h2>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    webTitle() {
      let t = '';
      try {
        t = webConfig.webTitle
      } catch {}

      if (t === '') {
        t = JSON.parse(localStorage.getItem('config')).webTitle
      }
      return t;
    },
  },
}
</script>

<style lang="scss" scoped>
  .root-header-x {
    width: 100%;
    height: 100%;
    padding: 0 60px;
    background: {
      image: linear-gradient(to right, #0f243b, #062844, #061537);
    };
    color: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    box-sizing: border-box;
  }

  .title-x {
    width: 100%;
    background: {
      image: url('../../assets/images/hit_header.jpg');
      repeat: no-repeat;
      size: 100%;
      position: 100% 50%;
    };
    display: flex;
    align-items: center;
    justify-content: center;

    .web-title {
      letter-spacing: 2px;
      font: {
        size: 30px;
        weight: 600;
      };
      display: inline-flex;
      align-items: center;
    }
  }

  .other-x {
    padding-right: 30px;
    display: flex;
    align-items: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .select-x {
      position: relative;
      margin-right: 30px;

      &::after {
        display: block;
        position: absolute;
        content: '';
        left: 0;
        right: 10px;
        bottom: 10px;
        height: 1px;
        background: #eee;
      }
    }

    ::v-deep .el-input {
      .el-input__inner {
        background-color: transparent;
        border: none;
        color: #fff;

        &::placeholder {
          color: #fff;
        }
      }
    }

    .user-portrait {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: hsla(0,0%,100%,.85);
      margin-right: 10px;
    }
  }
</style>