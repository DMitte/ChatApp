<template>
    <div class="chat">
        <div class="messages">
            <ul>                
                <li v-for="(message,index) in this.messages" :key="index" :class="{sendmsg: message.my}">
                    {{ message.content }}
                </li>                
            </ul>
            <hr>
        </div>
        
        <div class="send">
            <input type="text" placeholder="Message" v-model="msg" @keyup.enter="sendMessages">
            <button type="submit" @click.enter="sendMessages" ><img src="../assets/icons/send.svg" alt=""></button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg: '',
            msgSend: {},
            
        }
    },
    name: "Chat",
    props: {        
        socketio: Object,
        messages: []
    },
    mounted() {    
        
    },
    methods: {        
        sendMessages(){
            try {
                if(this.msg !== ''){
                    this.socketio.emit('emitMessage', {
                    username: 'username1',
                    content: this.msg
                    })

                    this.msgSend = {
                        username: 'mi usuario',
                        content: this.msg,
                        my: true
                    }
                    this.messages.push(this.msgSend);
                    this.msg = ''
                }
                
                
            } catch (error) {
                console.log('error al mandar el mensaje')
            }

        },
    }

}
</script>
<style scoped>
    .chat{
        background-color: #202020;
        height: 76vh;
        border-radius: 50px 50px 0 0;
        color: #fff;
        padding: 20px;
    }
    .send{
        display: flex;
        position: absolute;
        bottom: 20px;
        width: 90%;
        gap: 20px;
    }
    .send input{
        background-color: #4B4B4B;
        border: none;
        height: 50px;
        border-radius: 20px;
        color: #fff;
        padding-left: 20px;
        width: 80%;
    }
    .send button{
        width: 50px;
        height: 50px;
        background-color: #4B4B4B;
        border: none;
        border-radius: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .messages{
        display: flex;
        flex-direction: column;        
        justify-content: end;
        height: 89%;
        overflow: scroll;
    }
    hr{
        border: .5px solid #838383;
    }
    .messages ul{
        list-style: none;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
    }
    .messages ul li{
        background-color: #636262;
        margin-bottom: 10px;
        padding: 10px 20px;
        min-width: auto;
        max-width: 70%;
        border-radius: 15px 15px 15px 0;
        text-align: start;
        z-index: 0;
        align-self: flex-start;
    }
    .messages ul li.sendmsg{
        background-color: #22A13E;
        align-self: flex-end;
        border-radius: 15px 15px 0 15px;
    }

</style>