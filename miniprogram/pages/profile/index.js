// index.js
Page({
  data: {
    isLoggedIn: false,
    userInfo: {},
    userStats: {
      downloads: 0,
      views: 0,
      tests: 0
    },
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

  onLoad: function () {
    this.checkLoginStatus();
  },

  onShow: function () {
    const loginStatusUpdated = wx.getStorageSync('loginStatusUpdated') || false;
    if (loginStatusUpdated) {
      this.checkLoginStatus();
      wx.removeStorageSync('loginStatusUpdated');
    }

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const tabBar = this.getTabBar();
      if (tabBar.updateTabBar) {
        tabBar.updateTabBar();
      }
      if (tabBar.updateSelected) {
        tabBar.updateSelected();
      }
    }
  },

  // 检查登录状态
  checkLoginStatus: function () {
    // 这里应该从本地存储或服务器检查登录状态
    // 模拟登录状态检查
    const isLoggedIn = wx.getStorageSync('isLoggedIn') || false;
    const userInfo = wx.getStorageSync('userInfo') || {};
    const userStats = wx.getStorageSync('userStats') || {
      downloads: 0,
      views: 0,
      tests: 0
    };

    this.setData({
      isLoggedIn: isLoggedIn,
      userInfo: userInfo,
      userStats: userStats
    });
  },

  // 显示登录表单
  showLoginForm: function () {
    this.setData({
      showLoginModal: true,
      showRegisterModal: false
    });
  },

  // 隐藏登录表单
  hideLoginForm: function () {
    this.setData({
      showLoginModal: false
    });
  },

  // 显示注册表单
  showRegisterForm: function () {
    this.setData({
      showRegisterModal: true,
      showLoginModal: false
    });
  },

  // 隐藏注册表单
  hideRegisterForm: function () {
    this.setData({
      showRegisterModal: false
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  },

  // 绑定用户名输入
  bindUsernameInput: function (e) {
    this.setData({
      'loginForm.username': e.detail.value
    });
  },

  // 绑定密码输入
  bindPasswordInput: function (e) {
    this.setData({
      'loginForm.password': e.detail.value
    });
  },

  // 绑定注册用户名输入
  bindRegUsernameInput: function (e) {
    this.setData({
      'registerForm.username': e.detail.value
    });
  },

  // 绑定注册密码输入
  bindRegPasswordInput: function (e) {
    this.setData({
      'registerForm.password': e.detail.value
    });
  },

  // 绑定注册确认密码输入
  bindRegConfirmPasswordInput: function (e) {
    this.setData({
      'registerForm.confirmPassword': e.detail.value
    });
  },

  // 登录
  login: function () {
    const app = getApp();
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
        this.performLogin(username, password, userType);
      },
      fail: () => {
        wx.showToast({
          title: '请选择用户类型',
          icon: 'none'
        });
      }
    });
  },

  // 执行登录
  performLogin: function (username, password, userType) {
    const app = getApp();

    setTimeout(() => {
      const userInfo = {
        id: '10001',
        nickname: username,
        avatar: '👤'
      };

      app.loginSuccess(userInfo, userType);

      wx.setStorageSync('userStats', {
        downloads: 5,
        views: 23,
        tests: 8
      });

      this.setData({
        isLoggedIn: true,
        userInfo: userInfo,
        userStats: {
          downloads: 5,
          views: 23,
          tests: 8
        },
        showLoginModal: false
      });

      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });

      // 立即更新底部导航栏
      if (typeof this.getTabBar === 'function') {
        const tabBar = this.getTabBar();
        if (tabBar && tabBar.updateTabBar) {
          tabBar.updateTabBar();
        }
        if (tabBar && tabBar.updateSelected) {
          tabBar.updateSelected();
        }
      }
    }, 1000);
  },

  // 微信登录
  wechatLogin: function (e) {
    const app = getApp();

    wx.showActionSheet({
      itemList: ['学生', '教师'],
      success: (actionRes) => {
        const userType = actionRes.tapIndex === 0 ? 'student' : 'teacher';

        wx.login({
          timeout: 5000,
          success: loginRes => {
            const code = loginRes.code;

            wx.getSetting({
              success: settingRes => {
                if (!settingRes.authSetting['scope.userInfo']) {
                  wx.authorize({
                    scope: 'scope.userInfo',
                    success: () => {
                      this.getUserInfo(code, userType);
                    },
                    fail: () => {
                      wx.showToast({
                        title: '需要授权才能登录',
                        icon: 'none'
                      });
                    }
                  });
                } else {
                  this.getUserInfo(code, userType);
                }
              }
            });
          },
          fail: err => {
            console.error('微信登录失败', err);
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            });
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

  // 获取用户信息
  getUserInfo: function (code, userType) {
    wx.getUserInfo({
      withCredentials: true,
      success: (userRes) => {
        const user = userRes.userInfo;
        this.completeLogin(code, user, userType);
      },
      fail: err => {
        console.error('获取用户信息失败', err);
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        });
      }
    });
  },

  // 完成登录流程
  completeLogin: function (code, user, userType) {
    const app = getApp();

    setTimeout(() => {
      const userInfo = {
        id: '10002',
        nickname: user.nickName,
        avatar: user.avatarUrl
      };

      app.loginSuccess(userInfo, userType);

      wx.setStorageSync('userStats', {
        downloads: 5,
        views: 23,
        tests: 8
      });

      this.setData({
        isLoggedIn: true,
        userInfo: userInfo,
        userStats: {
          downloads: 5,
          views: 23,
          tests: 8
        }
      });

      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });

      // 立即更新底部导航栏
      if (typeof this.getTabBar === 'function') {
        const tabBar = this.getTabBar();
        if (tabBar && tabBar.updateTabBar) {
          tabBar.updateTabBar();
        }
        if (tabBar && tabBar.updateSelected) {
          tabBar.updateSelected();
        }
      }
    }, 1000);
  },

  // 注册
  register: function () {
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
        title: '两次输入的密码不一致',
        icon: 'none'
      });
      return;
    }

    // 模拟注册请求
    setTimeout(() => {
      // 注册成功
      wx.showToast({
        title: '注册成功，请登录',
        icon: 'success'
      });

      this.setData({
        showRegisterModal: false,
        showLoginModal: true,
        'loginForm.username': username
      });
    }, 1000);
  },

  // 退出登录
  logout: function () {
    const app = getApp();

    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 调用app的退出登录方法
          app.logout();

          // 清除用户统计信息
          wx.removeStorageSync('userStats');

          this.setData({
            isLoggedIn: false,
            userInfo: {},
            userStats: {
              downloads: 0,
              views: 0,
              tests: 0
            }
          });

          // 更新底部导航栏
          if (typeof this.getTabBar === 'function') {
            const tabBar = this.getTabBar();
            if (tabBar && tabBar.updateTabBar) {
              tabBar.updateTabBar();
            }
            if (tabBar && tabBar.updateSelected) {
              tabBar.updateSelected();
            }
          }

          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  },

  // 导航到学习历史
  navigateToHistory: function () {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 导航到收藏夹
  navigateToFavorites: function () {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 导航到设置
  navigateToSettings: function () {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // tabBar 更新回调
  onTabBarUpdate: function () {
    this.checkLoginStatus();
  }
});