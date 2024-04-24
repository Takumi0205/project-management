
<!-- 1.需要有个真实姓名，姓和名字 -->

<template>
  <div id="poster">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="register-container">
    <h3 class="register_title">
        Account Register
    </h3>
    <el-form-item label="" prop="email">
      <el-input type="email" v-model="ruleForm.email" @keyup.enter="appendEmailDomain" @blur="appendEmailDomain" 
      autocomplete="off" placeholder="xxx@taku.com" prefix-icon="fa-regular fa-envelope"></el-input>
    </el-form-item>
    <el-form-item label="" prop="name">
      <el-input v-model.number="ruleForm.name" placeholder="Please enter name" prefix-icon="fa-solid fa-user" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="" prop="phone">
      <el-input v-model.number="ruleForm.phone" placeholder="Please enter your phone number" prefix-icon="fa-solid fa-phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="" prop="password">
      <!--<el-input type="password" v-model="ruleForm.password" placeholder="Please enter password" autocomplete="off" prefix-icon="fa-solid fa-user-lock"></el-input>  -->
      <el-input :type="passwordFieldType" v-model="ruleForm.password" placeholder="Please enter password" autocomplete="off" prefix-icon="fa-solid fa-user-lock">
        <template #suffix>
          <i class="fa-solid" :class="{ 'fa-eye': showPassword, 'fa-eye-slash': !showPassword }" @click="togglePasswordVisibility"></i>
        </template>
      </el-input>
    </el-form-item>

    <!-- <el-form-item label="" prop="checkPassword">
      <el-input type="password" v-model="ruleForm.checkPassword" placeholder="Please enter the confirmation password" autocomplete="off" prefix-icon="fa-solid fa-lock"></el-input>
    </el-form-item> -->
    <el-form-item label="" prop="checkPassword">
      <el-input :type="checkPasswordFieldType" v-model="ruleForm.checkPassword" placeholder="Please enter the confirmation password" autocomplete="off" prefix-icon="fa-solid fa-lock">
        <template #suffix>
          <i class="fa-solid" :class="{ 'fa-eye': showCheckPassword, 'fa-eye-slash': !showCheckPassword }" @click="toggleCheckPasswordVisibility"></i>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="DEPARTMENT" prop="department" class="department-label">
    <el-select v-model="ruleForm.department" placeholder="Select department">
      <el-option v-for="department in departments" :key="department.value" :label="department.label" :value="department.value"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item>
      <el-form-item style="width: 100%;"> 
        <el-button type="primary" @click="resetForm('ruleForm')" style="width: 100%;">Reset Content</el-button>
      </el-form-item>
      <el-form-item style="width: 100%;"> 
        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">Submit</el-button>
      </el-form-item>
      <el-form-item style="width: 100%;">
        <el-button type="primary" v-on:click="toLogin()" style="width: 100%;">Login</el-button>        
      </el-form-item>
    </el-form-item>
    </el-form>
  </div>
</template>
  



  <script>
// 1.还没对密码的位数进行设置一般应该不能少于8位
// 2. 可以点击查看密码或者隐藏密码
  export default {
    name: 'Register',
    data() {
      var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Email cannot be empty'));
      }
      const emailPattern = /^[a-zA-Z0-9._-]+@taku.com$/;
      if (!emailPattern.test(value)) {
        return callback(new Error('Please enter a valid @taku.com email address'));
      }
      callback();
    };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter password'));
        } else {
          if (this.ruleForm.checkPassword !== '') {
            this.$refs.ruleForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter password again'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('The password entered twice is inconsistent!'));
        } else {
          callback();
        }
      };
      return {
        showPassword: false,
        showCheckPassword: false,
        passwordFieldType: 'password',
        checkPasswordFieldType: 'password',
        ruleForm: {
          email: '',
          name:'',
          phone:'',
          password: '',
          checkPassword: '',
          department:''
        },
        rules: {
          // 这里想一下需不需要验证码，如果想要验证码那么就必须这个输入框有输入
          // phoneNumber: [
          //   { required: true, message:"请输入你的手机号", trigger: 'blur' },
          // ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 8, max: 15, message:"Please enter 8-15 characters", trigger: 'blur'}
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
          { validator: checkEmail, trigger: 'blur' },
          { min: 14, max: 28, message:"Please enter 5-19 characters", trigger: 'blur'}
          ],
          department: [
            { required: true, message: 'Please select a department', trigger: 'change' }
          ]
        },
        departments: [
            { value: 'hr', label: 'Human Resources' },
            { value: 'it', label: 'IT Department' },
            { value: 'finance', label: 'Finance' },
            { value: 'sales', label: 'Sales' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'customer_service', label: 'Customer Service' },
            { value: 'rnd', label: 'Research and Development' },
            { value: 'production', label: 'Production' },
            { value: 'procurement', label: 'Procurement' },
            { value: 'administration', label: 'Administration' },
            { value: 'legal', label: 'Legal' }
          ]
      };
    },
    methods: {
      submitForm(ruleForm) {
        this.$http.post("http://localhost:2231/email-web/register", this.ruleForm).then((resp) => {
            let data = resp.data;
            if (data.success) {
              this.ruleForm = {};
              this.$message({
                message: 'Register successfully and log in!',
                type: 'success'
              });
              // 当成功显示后，自动跳转页面。
              // this.$router.push({ path: '/' });
            } else {
              // 处理注册不成功的情况，例如显示错误信息
              this.$message.error('Registration failed: ' + data.message);
            }
          })
          .catch((error) => {
            // 处理请求失败的情况，例如显示错误信息
            this.$message.error('Failed to submit registration: ' + error.message);
          });
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
        this.passwordFieldType = this.showPassword ? 'text' : 'password';
        this.$set(this.$refs.ruleForm.fields.find(field => field.prop === 'password'), 'currentValidateType', this.passwordFieldType);
      },
      toggleCheckPasswordVisibility() {
        this.showCheckPassword = !this.showCheckPassword;
        this.checkPasswordFieldType = this.showCheckPassword ? 'text' : 'password';
        this.$set(this.$refs.ruleForm.fields.find(field => field.prop === 'checkPassword'), 'currentValidateType', this.checkPasswordFieldType);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      appendEmailDomain() {
        if (this.ruleForm.email && !this.ruleForm.email.includes('@taku.com')) {
          this.ruleForm.email += '@taku.com';
        }
      },
      toLogin(){
        this.$router.push({path:'/'})
      }
    }
  }
  </script>



<style>
#poster {
    display: flex;
    flex-direction: column;
    justify-content: center; /* 在屏幕足够大时垂直居中 */
    align-items: center;
    height: 100vh;
    width: 100%;
    overflow-y: auto; /* 超出时显示滚动条 */
    background-position: center;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}

/* 当屏幕高度不足以容纳整个内容时的样式 */
@media screen and (max-height: 600px) {
    #poster {
        justify-content: flex-start; /* 防止内容被截断 */
    }
}

.register-container{
  border-radius: 10px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 10px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.register_title{
    margin: 0px auto 20px auto;
    text-align: center;
    color: #505458;
}
.register-container .el-select{
  margin-left: 112px;
}
.register-container .el-button{
    margin-bottom: 10px;
    background: #505458 ;
    border: none;
}
.register-container .el-button:hover{
    color:#505458;
    background-color: #dadada;
}
.department-label label{
  font-family: 'Arial', sans-serif; /* 更换字体 */
  color: #505458; /* 更换颜色 */
  letter-spacing: 2px; /* 增加字母间距使文字更加分散 */
}
/* 为了解决在点击submit按钮后变为蓝色 */
.register-container .el-button:focus {
    background: #505458; /* 按钮原本的背景颜色 */
    color: #FFFFFF; /* 按钮原本的文字颜色 */
    border-color: #505458; /* 如果有边框，指定边框颜色 */
}
/* 隐藏必填字段前的红色星号 */
.department-label .el-form-item__label:before {
    display: none;
}
</style>