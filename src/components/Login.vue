<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- :model表单中的数据和 loginForm对象进行绑定  ref设置表单的引用 loginFormRef就代表表单本身可以通过这个名字来找到当前的表单 可以通过这个表单来调用特定的方法完成功能  :rules 设置表单的校验规则  在data中 通过设置 loginFormRules对象来设置规则 需要一一对应-->
      <el-form
        label-width="0"
        class="login_form"
        :rules="loginFormRules"
        ref="loginFormRef"
        :model="loginForm"
      >
        <!-- 用户名区域   如果想要验证规则和表单严肃进行 对应必须通过prop来进行设置，验证规则的prop应该跟绑定的表单元素的属性一致-->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录操作
    login() {
      // validate 对整个表单进行验证的方法若不传入 参数 就返回一个promise
      this.$refs.loginFormRef.validate(async valid => {
        //如果没有通过验证,将return,就不会继续执行后续的代码
        if (!valid) return
        // this就是当前组件对象（vue实例对象）  this.$refs所有挂在Vue 实例对象中的引用集合
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status != 200) {
          // 组件的 方法 进行弹窗
          this.$message.error('登录失败')
        } else {
          this.$message.success('登录成功')
          // 将后台获得的 token 保存到本地
          window.sessionStorage.setItem('token', res.data.token)
          //进行跳转
          this.$router.push('/home')
        }
      })
    },
    // 重置操作
    resetLoginForm() {
      console.log(123)
      // element ui 的方法 就是将表单内容清空
      this.$refs['loginFormRef'].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b5b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
