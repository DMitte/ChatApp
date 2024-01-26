<template>
    <div class="private">
        <nav>          
            <router-link to="/" class="close"><img src="../../assets/icons/close.svg" alt="close icon"></router-link>
            <div><h1>ChatterUp</h1></div>
            <div class="delete"><img src="../../assets/icons/trash.svg" alt="trash icon"></div>
        </nav>
        <section class="info">
            <img :src="anotherUser.imgUrl" :alt="anotherUser.imgName">
            <div class="infoUser">
                <div class="general">
                    <h3>{{anotherUser.username}}</h3>
                    <p>27</p>
                    <!-- TODO hacer que se muestre si esta conectada o no una persona -->
                    <!-- <div class="connect"></div> -->
                </div>
                <div class="descrip">
                    <p>My name is kate, i’m look netfilx would you like to accompany me</p>
                </div>
            </div>
        </section>
        <ChatComponent :socketio="socketio" :messages="messages"/>
    </div>
</template>
<script>
import { io } from 'socket.io-client';
import ChatComponent from '../../components/Chat'
import userModule  from '../../store/modules/user'
import { mapActions} from 'vuex'
export default {
  data(){
    return{
      socketio: Object,
      messages: [],      
      myuser: {},
      anotherUser: {},
    }
  },
    name: "PrivateChatView",
    components: {
        ChatComponent
    },
    computed: {      
      ...mapActions('user', ['getMyUser','getOneUser'])
      
    },
    methods: {
      async preload(){
        const res = await this.getMyUser


        const res2 = await userModule.actions.getOneUser({id: this.$route.params.id})



        this.anotherUser = res2.data
        this.myuser = res

        
      },
      conectionSocket(){
          if(this.$cookies.isKey('accessToken')){
       
          this.socketio = io("https://chatapp-back-gr5q.onrender.com", {
          withCredentials: true,
          });
          let username2 = this.$route.params.id

          if(this.myuser._id === undefined){
            console.log(username2)            
          }else{
            this.socketio.emit('join', `${this.myuser._id}--with--${username2}`)
            
          }
          this.socketio.on("onMessage", (msg) => {                   
              this.messages.push(msg);
            });
        }
      }
    },
    mounted(){
      
    },
    async created() {  
      await this.preload()
      this.conectionSocket()
           
      
      
    },
}
</script>
<style scoped>
.private{
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
nav .delete{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 0, 0, .20);
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.info{
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  gap: 20px;
}
.info h3{
  font-size: 32px;
  font-weight: 400;
}
.info img{
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 15px;
}
.info .general{
    display: flex;
    align-items: center;
}

.info .general p{
    color: #949494;
    font-size: 32px;
    font-weight: 400;
    padding-left: 10px;
}
.info .descrip p {
    text-align: start;
    font-size: 12px;
}
.connect{
    width: 15px;
    height: 15px;
    background-color: #52CF16;
    border-radius: 100%;
    margin-left: 20px;
}
</style>