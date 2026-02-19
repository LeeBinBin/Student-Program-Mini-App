// app.js
App({
  globalData: {
    // env 参数说明：
    // env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会请求到哪个云环境的资源
    // 此处请填入环境 ID, 环境 ID 可在微信开发者工具右上顶部工具栏点击云开发按钮打开获取
    env: "cloud1-4g5k684112030b04",
    // 微信小程序 AppID 和 AppSecret
    // 实际使用时需要替换为真实的 AppID 和 AppSecret
    appid: "your_app_id",
    appSecret: "your_app_secret",
    // 用户信息
    userInfo: null,
    // 用户类型：student 或 teacher
    userType: null,
    // 登录状态
    isLoggedIn: false,
    // 是否显示教师中心 tab
    showTeacherTab: false,
    // 学号计数器
    studentIdCounter: 15
  },
  
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
    // 检查登录状态
    this.checkLoginStatus();
  },
  
  // 检查登录状态
  checkLoginStatus: function () {
    const isLoggedIn = wx.getStorageSync('isLoggedIn') || false;
    const userInfo = wx.getStorageSync('userInfo') || null;
    const userType = wx.getStorageSync('userType') || null;
    
    this.globalData.isLoggedIn = isLoggedIn;
    this.globalData.userInfo = userInfo;
    this.globalData.userType = userType;
    
    // 更新底部导航栏
    this.updateTabBar();
  },
  
  // 更新底部导航栏
  updateTabBar: function () {
    const userType = this.globalData.userType;
    
    // 使用自定义 tabBar 时，通过 globalData 控制显示
    this.globalData.showTeacherTab = userType === 'teacher';
    
    // 通知所有页面更新
    const pages = getCurrentPages();
    pages.forEach(page => {
      if (page.onTabBarUpdate) {
        page.onTabBarUpdate();
      }
    });
  },
  
  // 登录成功后调用
  loginSuccess: function (userInfo, userType) {
    this.globalData.isLoggedIn = true;
    this.globalData.userInfo = userInfo;
    this.globalData.userType = userType;
    
    // 存储到本地
    wx.setStorageSync('isLoggedIn', true);
    wx.setStorageSync('userInfo', userInfo);
    wx.setStorageSync('userType', userType);
    
    // 更新底部导航栏
    this.updateTabBar();
    
    // 通知其他页面登录状态已更新
    wx.setStorageSync('loginStatusUpdated', true);
    
    // 强制更新自定义tabbar
    setTimeout(() => {
      const pages = getCurrentPages();
      pages.forEach(page => {
        if (typeof page.getTabBar === 'function') {
          const tabBar = page.getTabBar();
          if (tabBar && tabBar.updateTabBar) {
            tabBar.updateTabBar();
          }
        }
      });
    }, 100);
  },
  
  // 退出登录
  logout: function () {
    this.globalData.isLoggedIn = false;
    this.globalData.userInfo = null;
    this.globalData.userType = null;
    
    // 清除本地存储
    wx.removeStorageSync('isLoggedIn');
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('userType');
    
    // 更新底部导航栏
    this.updateTabBar();
    
    // 通知其他页面登录状态已更新
    wx.setStorageSync('loginStatusUpdated', true);
  }
});
