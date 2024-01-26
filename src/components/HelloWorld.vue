<template>
  <div class="hello">
    <h3>Chats</h3>
    <div class="chats">
      <router-link class="chat" v-for="(user, index) in allUserData.users" :key="index" :to="`/user/chat/${user._id}`" v-show="user._id !== this.userData._id">
        <div class="infoUser">
          <img :src="user.imgUrl" >
          <div class="texts">
            <h3>{{ user.username }}</h3>
            <p>FullStack Developer</p>
          </div>
        </div>
        <div class="infoCon">
          <p>3 am</p>
          <!-- <div class="online"></div> -->
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
import { mapState} from 'vuex';
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    userId: String
  },
  computed: {
    ...mapState('user', ['userData','allUserData']),
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: #202020;
  height: 100%;
  border-radius: 50px 50px 0 0;
  color: #fff;
  padding: 20px;
}

h3 {
  font-size: 24px;
  font-weight: 400;
  padding: 10px 0;
}
.chats{
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
.chat {
  display: flex;
  color: #fff;
  text-decoration: none;
  justify-content: space-between;
  align-items: center;
}

.chat .infoUser {
  display: flex;
  gap: 25px;
}

.chat .infoUser .texts {
  text-align: start;
  font-size: 16px;
  font-weight: 300;
  color: #908A8A;
}

.chat .infoUser .texts h3 {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.chat .infoCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  align-content: space-between;
  gap: 15px;
  font-size: 12px;
  font-weight: 100;
  color: #888686;
}

.chat .infoCon .online {
  width: 15px;
  height: 15px;
  background-color: #767776;
  border-radius: 50%;
}
.chat .infoCon .online.con{
  background-color: #52CF16;
}

a img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 15px;
}</style>
