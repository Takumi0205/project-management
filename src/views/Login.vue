<template>
    <div>
        <body id="poster">
            <el-form class="login-container" label-position="left" label-width="0px">
                <h3 class="login_title">
                    Account Login
                </h3>
                <el-form-item label="">
                    <el-input type="email" v-model="loginForm.emailName" autocomplete="off" placeholder="email"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="password"></el-input>
                </el-form-item>
                <el-form-item style="width: 100%;">
                    <el-button type="primary" v-on:click="Login()" style="width: 100%;">Login</el-button>        
                </el-form-item>
                <el-form-item style="width: 100%;"> 
                    <el-button type="primary" @click="toRegister()" style="width: 100%;">Register</el-button>
                </el-form-item>
            </el-form>
        </body>
    </div>
  </template>
  
  <script>

  
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
            emailName: '',
            password: ''
        }
      }
    },
    methods: {
        Login() {
            this.axios.post('http://localhost:2233/sys-user/login',this.loginForm).then((resp) =>{
            let data = resp.data;
            if(data.success){
                this.loginForm= {};
                this.$message({
                    message: 'Log in successfully',
                    type: 'success'
                });
                // 当成功显示后，自动跳转页面。
                this.$router.push({path:'/Home'}) 
            }
        })

      },
      toRegister(){
        this.$router.push({path:'/Register'})
      }
    }
  }

  
  </script>

  <style>
    #poster{
        background-position:center;
        height:100%;
        width:100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0px;
        padding: 0px;
    }
    .login-container{
        border-radius: 10px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 35px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title{
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login-container .el-button{
        background: #505458 ;
        border: none;
    }
    .login-container .el-button:hover{
        color:#505458;
        background-color: #dadada;
    }
    /* 为了解决在点击submit按钮后变为蓝色 */
    .login-container .el-button:focus {
        background: #505458; /* 按钮原本的背景颜色 */
        color: #FFFFFF; /* 按钮原本的文字颜色 */
        border-color: #505458; /* 如果有边框，指定边框颜色 */
    }
  </style>