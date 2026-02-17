// index.js
Page({
  data: {
    isLoggedIn: false,
    userInfo: {},
    showLoginPopup: true
  },

  onLoad: function () {
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus: function () {
    const isLoggedIn = wx.getStorageSync('isLoggedIn') || false;
    const userInfo = wx.getStorageSync('userInfo') || {};
    
    this.setData({
      isLoggedIn: isLoggedIn,
      userInfo: userInfo
    });
  },

  // 导航到知识点对标页面
  navigateToKnowledge: function () {
    wx.navigateTo({
      url: '/pages/knowledge/index'
    })
  },

  // 导航到双语辅导资料页面
  navigateToMaterial: function () {
    wx.navigateTo({
      url: '/pages/material/index'
    })
  },

  // 导航到学业诊断小测页面
  navigateToTest: function () {
    wx.navigateTo({
      url: '/pages/test/index'
    })
  },

  // 导航到教师备课素材页面
  navigateToTeacher: function () {
    wx.switchTab({
      url: '/pages/teacher/index'
    })
  },

  // 了解更多按钮点击事件
  learnMore: function () {
    // 可以导航到详情页面或显示更多信息
    wx.showModal({
      title: '关于粤港通学',
      content: '粤港通学是专为大湾区跨境中小学生设计的学业适配辅导系统，旨在打通粤港教育资源，帮助学生更好地适应跨境学习环境。',
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#1E88E5'
    })
  },

  // 页面切换控制
  switchTab: function (e) {
    var tab = e.currentTarget.dataset.tab;
    switch (tab) {
      case 'home':
        // 已在首页，无需导航
        break;
      case 'knowledge':
        wx.navigateTo({
          url: '/pages/knowledge/index'
        });
        break;
      case 'tutorial':
        wx.navigateTo({
          url: '/pages/material/index'
        });
        break;
      case 'test':
        wx.navigateTo({
          url: '/pages/test/index'
        });
        break;
      case 'teacher':
        wx.navigateTo({
          url: '/pages/teacher/index'
        });
        break;
    }
  },

  // 导航到个人中心页面
  navigateToProfile: function () {
    wx.switchTab({
      url: '/pages/profile/index'
    })
  },

  // 关闭登录弹窗
  closePopup: function () {
    this.setData({
      showLoginPopup: false
    });
  },

  // 页面显示时检查登录状态
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

  // tabBar 更新回调
  onTabBarUpdate: function () {
    this.checkLoginStatus();
  }
})
