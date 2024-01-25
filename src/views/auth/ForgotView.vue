<template>
    <div class="main">
        <h2>Welcome to <span>ChatterUp</span></h2>

        <div class="navigator">
            <div class="link">
                <router-link to="/login">Login</router-link>
                <div class="dot" v-if="$route.path === '/login'"></div>
            </div>
            
            <hr>
            <div class="link">
                <router-link to="/register">Register</router-link>
                <div class="dot" v-if="$route.path === '/register'"></div>
            </div>
            
        </div>

        <div id="form">
            <input type="email" name="email" placeholder="Email" autocomplete="none" v-model="info.email" @input="validateEmail" :class="{valid: validEmail, invalid: invalidEmail}">            
            
            <p class="sendCode" v-if="sendCode">link to change the password was sent to the email I provided</p>
            <button type="submit" @click="authReset(info)">
                <div class="ld-ripple" v-if="isLoading">
                    <div></div>
                    <div></div>
                </div>
            <span v-if="!isLoading">Search</span> </button>
        </div>

        <div class="forgot">
            <router-link to="/about">Search with Username</router-link>
        </div>
    </div>
</template>
<script>
import validate from 'validator'
import authModule  from '../../store/modules/auth'

export default {
    name: "ForgotView",
    data(){
        return {
            info: {
                email: ""
            },
            sendCode: false,
            validEmail: false,
            invalidEmail: false,
            isLoading: false
        }
    },
    methods: {
        validateEmail(){
            this.validEmail = validate.isEmail(this.info.email);
            this.invalidEmail = !this.validEmail;
        },
        async authReset(info){
            this.isLoading = true

            let res = await authModule.actions.forgotPassword(info)

            if(!res){
                this.isLoading = false
            }else{
                this.isLoading = false
                this.sendCode = true
                this.info.email = ''
            }
        }
    },
    created(){
        
        if(this.$cookies.isKey('accessToken') === true){
            this.$router.push('/')
        }

    }
}
</script>
<style scoped>
    .main{
        width: 100vw;
        height: 100vh;
        background-color: #202020;
        color: white;
    }
    h2{
        padding: 40px 0 0 20px;
        width: 17rem;
        font-size: 38px;
        text-align: start;
        font-weight: 400;
    }
    h2 span{
        font-size: 30px;
        font-weight: 800;
    }
    .navigator{
        display: flex;
        justify-content: center;
        align-content: center;
        gap: 30px;
        margin-top: 50px;
    }
    .navigator a{
        text-decoration: none;
        color: #545353;
    }
    .navigator hr{        
        border-color: #545353;
        border-width: 1px;
    }
    .navigator a.router-link-exact-active{
        color: white;
    }
    .navigator .dot{
        width: 10px;
        height: 10px;
        background-color: #3BD714;
        border-radius: 50%;
        margin: auto;
        margin-top: 3px;
    
    }
    #form{
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 0 20px;
        margin-top: 45px;
    }
    #form input{
        height: 55px;
        padding: 0 20px;
        border: 1.5px solid #4B4B4B;
        background-color: transparent;
        border-radius: 25px;
    }
    #form input.valid{
        color: #3BD714;
        border: 1.5px solid #3BD714;
    }
    #form input.invalid{
        color: red;
        border: 1.5px solid red;
    }
    #form input:focus{
        border: 1px solid #fff;
        color: white;
    }
    #form button{
        width: 200px;
        height: 55px;
        background-color: #3BD714;
        color: white;
        border: none;
        border-radius: 25px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .forgot{
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -70px;
    }
    .forgot a{
        color: white;
        text-decoration: none;
        font-weight: 800;
        font-size: 16px;
        
    }
    .ld-ripple {
    position: relative;
    width: 50px;
    height: 46px;
    }

    .ld-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ld-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .ld-ripple div:nth-child(2) {
    animation-delay: -0.5s;
    }

    @keyframes ld-ripple {
    0% {
        top: 26px;
        left: 26px;
        width: 0;
        height: 0;
        opacity: 0;
    }

    4.9% {
        top: 26px;
        left: 26px;
        width: 0;
        height: 0;
        opacity: 0;
    }

    5% {
        top: 26px;
        left: 26px;
        width: 0;
        height: 0;
        opacity: 1;
    }

    100% {
        top: 0px;
        left: 0px;
        width: 50px;
        height: 50px;
        opacity: 0;
    }
    }
</style>