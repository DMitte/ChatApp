<template>
  <div class="home">    
    <nav>
      <div class="close"><img src="../assets/icons/close.svg" alt="close icon"></div>
      <div><h1>ChatterUp</h1></div>
      <div class="search"><img src="../assets/icons/search.svg" alt="search icon"></div>
    </nav>
    <section class="info">
      <h3>Friends</h3>
      <div class="online"><p>3/3 Online</p></div>
    </section>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {mapActions} from 'vuex'
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  computed: {
    ...mapActions('user', ['getMyUser', 'getAllUser'])
  },
  created(){
    this.getMyUser
    this.getAllUser
  }
};
</script>
<style scoped>
.home{
  background-color: #020202;
  height: 100vh;
  width: 100vw;
}
nav{
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  font-size: 24px;
}
nav h1{
  font-size: 24px;
  font-weight: 500;
}
nav .close{
  background-color: rgba(71, 71, 71, .51);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
nav .search{
  display: flex;
  justify-content: center;
  align-items: center;
}
.info{
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}
.info h3{
  font-size: 36px;
  font-weight: 300;
}

</style>
