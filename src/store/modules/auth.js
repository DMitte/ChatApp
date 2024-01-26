import router from '@/router'
let VueCookies = require('vue-cookies')

export default{
    namespaced: true,
    state:{
        token: null,        
    },
    mutations:{
        setToken(state, payload){
            state.token = payload
        },        
    },
    actions: {       
        async login(usuario){
             
            try{                
                const res = await fetch('https://chatapp-back-gr5q.onrender.com/api/chat/auth/signin', {
                    method: 'post',
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify(usuario)
                })
                const response = await res.json()
                if(!response.accessToken){
                    return {res: false}
                }else{       
                    VueCookies.set('accessToken', response.accessToken, '1d')                
                    router.push('/')
                    return {res: true, data: response.dataUser}
                }
                
            }catch(e){
                console.error(e)
                return false
            }
        },
        async registro(usuario) {
            try{
                const res = await fetch('https://chatapp-back-gr5q.onrender.com/api/chat/auth/signup',{
                    method: 'post',
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify(usuario)
                })
                const usuDB = await res.json()
                console.log(usuDB)
                if(!usuDB.message.errors){
                    router.push('/login')
                }else{
                    return false
                }                
            }catch(e) {
                console.log("error: ", e)
            }
        },
        async forgotPassword(usuario) {
            try{
                await fetch('https://chatapp-back-gr5q.onrender.com/api/chat/auth/reset-password', {
                    method: 'post',
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify(usuario)
                })                
                return true
            }catch(e){
                console.log(e)
                return false
            }
            
        }
    }
}