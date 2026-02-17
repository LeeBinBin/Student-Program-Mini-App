Page({
  data: {
    showLoginModal: false,
    showRegisterModal: false,
    loginForm: {
      username: '',
      password: ''
    },
    registerForm: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },

  // 微信快捷登录
  wechatLogin() {
    wx.showActionSheet({
      itemList: ['学生', '教师'],
      success: (actionRes) => {
        const userType = actionRes.tapIndex === 0 ? 'student' : 'teacher';

        wx.login({
          success: (res) => {
            if (res.code) {
              console.log('登录凭证', res.code);

              this.loginSuccess({
                nickname: '微信用户',
                avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SYiaiba5faera757d3aW75Qx9jR90R9z9jR90R9z9jR90R9z9jR90/0'
              }, userType);
            } else {
              console.log('登录失败', res.errMsg);
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              });
            }
          }
        });
      },
      fail: () => {
        wx.showToast({
          title: '请选择用户类型',
          icon: 'none'
        });
      }
    });
  },

  // 显示登录表单
  showLoginForm() {
    this.setData({
      showLoginModal: true
    });
  },

  // 隐藏登录表单
  hideLoginForm() {
    this.setData({
      showLoginModal: false
    });
  },

  // 显示注册表单
  showRegisterForm() {
    this.setData({
      showRegisterModal: true
    });
  },

  // 隐藏注册表单
  hideRegisterForm() {
    this.setData({
      showRegisterModal: false
    });
  },

  // 捕获点击，防止冒泡
  catchTap() {
    // 空函数，防止点击表单内容时触发关闭
  },

  // 绑定登录用户名输入
  bindUsernameInput(e) {
    this.setData({
      'loginForm.username': e.detail.value
    });
  },

  // 绑定登录密码输入
  bindPasswordInput(e) {
    this.setData({
      'loginForm.password': e.detail.value
    });
  },

  // 绑定注册用户名输入
  bindRegUsernameInput(e) {
    this.setData({
      'registerForm.username': e.detail.value
    });
  },

  // 绑定注册密码输入
  bindRegPasswordInput(e) {
    this.setData({
      'registerForm.password': e.detail.value
    });
  },

  // 绑定注册确认密码输入
  bindRegConfirmPasswordInput(e) {
    this.setData({
      'registerForm.confirmPassword': e.detail.value
    });
  },

  // 账号登录
  login() {
    const { username, password } = this.data.loginForm;
    
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      });
      return;
    }

    wx.showActionSheet({
      itemList: ['学生', '教师'],
      success: (actionRes) => {
        const userType = actionRes.tapIndex === 0 ? 'student' : 'teacher';

        this.loginSuccess({
          nickname: username,
          avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/SYiaiba5faera757d3aW75Qx9jR90R9z9jR90R9z9jR90R9z9jR90/0'
        }, userType);
      },
      fail: () => {
        wx.showToast({
          title: '请选择用户类型',
          icon: 'none'
        });
      }
    });
  },

  // 注册
  register() {
    const { username, password, confirmPassword } = this.data.registerForm;
    
    if (!username || !password || !confirmPassword) {
      wx.showToast({
        title: '请填写完整注册信息',
        icon: 'none'
      });
      return;
    }

    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      });
      return;
    }

    // 模拟注册成功
    wx.showToast({
      title: '注册成功',
      icon: 'success'
    });

    // 关闭注册表单
    this.hideRegisterForm();
  },

  // 登录成功处理
  loginSuccess(userInfo, userType) {
    const app = getApp();
    
    userInfo.userType = userType;
    
    app.loginSuccess(userInfo, userType);
    
    wx.setStorageSync('userInfo', userInfo);
    
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    });
    
    this.hideLoginForm();
    
    // 设置登录状态更新标志，让 tab 页面更新
    wx.setStorageSync('loginStatusUpdated', true);
    
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 500);
  },

  // 跳转到用户协议
  navigateToAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/index?type=agreement'
    });
  },

  // 跳转到隐私政策
  navigateToPrivacy() {
    wx.navigateTo({
      url: '/pages/agreement/index?type=privacy'
    });
  }
});
