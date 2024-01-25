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
            <input type="text" name="username" placeholder="Username" v-model="Info.username" @input="validateUsername" :class="{valid: validUsername, invalid: invalidUsername}">
            <input type="email" name="email" placeholder="Email" autocomplete="off" v-model="Info.email" @input="validateEmail" :class="{valid: validEmail, invalid: invalidEmail}">
            <input type="password" name="password" placeholder="Password" v-model="Info.password" @input="validatePassword" :class="{valid: validPassword, invalid: invalidPassword}">
            <input type="password" name="confirmpass" placeholder="Confirm Password" v-model="Info.confirmpass" @input="validConfirmPass" :class="{valid: validConfirPass, invalid: invalidConfirmPass}">

            <div class="check">
                <input type="checkbox" name="checkbox" id="checkbox" v-model="checkTerms" :class="{error: errorCheck}" @click="changeError()">
                <label for="checkbox">Agree with <span>Terms and Conditions</span></label>
            </div>
            <button type="submit" @click="authRegister(Info)">
                <span class="loadingspan" v-if="isLoading"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
      <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"/>
        </path>
                </svg></span>
                <span class="namespan" v-if="!isLoading">Register</span>
            </button>
        </div>

    </div>
</template>
<script>
import validate from 'validator'
import authModule  from '../../store/modules/auth'
export default {
    name: "RegisterView",
    data(){
        return{
            Info: {
                username: "",
                email: "",
                password: "",
                confirmpass: "",
            },
            validEmail: false,
            invalidEmail: false,
            validConfirPass: false,
            invalidConfirmPass: false,
            validPassword: false,
            invalidPassword: false,
            validUsername: false,
            invalidUsername: false,
            checkTerms: false,
            errorCheck: false,
            isLoading: false
        }
    },
    methods: {
        validateEmail(){
            this.validEmail = validate.isEmail(this.Info.email);
            this.invalidEmail = !this.validEmail;
        },
        validatePassword(){
            this.validPassword = validate.isStrongPassword(this.Info.password, { minSymbols: 0})
            this.invalidPassword = !this.validPassword
        },
        validConfirmPass(){
            this.validConfirPass = validate.equals(this.Info.password, this.Info.confirmpass)                
            this.invalidConfirmPass = !this.validConfirPass
        },
        validateUsername(){
            this.validUsername = validate.isLength(this.Info.username)
            this.invalidUsername = !this.validUsername
        },
        async authRegister(usu){
            if(this.checkTerms){
                this.isLoading = true

                const res = await authModule.actions.registro(usu)
                if(!res){
                    this.isLoading = false
                }
            }else{
                this.errorCheck = true
            }
        },
        changeError(){
            if(this.errorCheck){
                this.errorCheck = false
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
        gap: 20px;
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
    }
    .check{
        margin: -5px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .check label{
        font-weight: 600;
        font-size: 16px;
    }
    .check label span{
        color: #3BD714;
    }
    .check input[type="checkbox"]#checkbox.error{
        border: 1px solid red;
    }
    .check input[type="checkbox"]#checkbox{
        width: 20px;
        height: 20px;        
        border-radius: 50%;
        appearance: none;
        background-color: #D9D9D9;
        cursor: pointer;
        padding: 0;
    }
    .check input[type="checkbox"]#checkbox:checked::before{
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #3BD714;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>