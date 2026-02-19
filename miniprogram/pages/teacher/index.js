// index.js
Page({
  data: {
    studentsCount: 15,
    coursesCount: 12,
    materialsCount: 36,
    notificationCount: 3,
    showNotification: false,
    notifications: [
      {
        id: "1",
        title: "新的学生加入班级",
        time: "今天 09:30",
        icon: "👨‍🎓"
      },
      {
        id: "2",
        title: "跨境教育研讨会邀请",
        time: "昨天 14:20",
        icon: "📅"
      },
      {
        id: "3",
        title: "教材更新通知",
        time: "昨天 10:15",
        icon: "📚"
      }
    ],
    recentActivities: [
      {
        id: "1",
        title: "完成了粤港数学三年级教学方案的编写",
        time: "今天 10:30",
        icon: "✅",
        status: "已完成"
      },
      {
        id: "2",
        title: "上传了新的知识点对标表",
        time: "昨天 16:45",
        icon: "📤",
        status: "已发布"
      },
      {
        id: "3",
        title: "批改了学生的跨境适应性测试",
        time: "昨天 11:20",
        icon: "✏️",
        status: "已完成"
      }
    ]
  },

  onLoad: function () {
    this.checkPermission();
  },

  onShow: function () {
    this.checkPermission();
    
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

  // 检查权限
  checkPermission: function () {
    const app = getApp();
    const userType = app.globalData.userType;
    const isLoggedIn = app.globalData.isLoggedIn;

    console.log('教师中心权限检查:', { isLoggedIn, userType });

    if (!isLoggedIn) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false,
        success: () => {
          wx.switchTab({
            url: '/pages/profile/index'
          });
        }
      });
      return;
    }

    if (userType !== 'teacher') {
      wx.showModal({
        title: '权限不足',
        content: '教师中心仅对教师用户开放，请以教师身份登录',
        showCancel: false,
        success: () => {
          wx.switchTab({
            url: '/pages/profile/index'
          });
        }
      });
      return;
    }

    console.log('教师中心初始化数据');
  },

  showNotification: function () {
    this.setData({
      showNotification: true
    });
  },

  hideNotification: function () {
    this.setData({
      showNotification: false
    });
  },

  showSettings: function () {
    wx.showModal({
      title: '设置',
      content: '教师中心设置功能',
      showCancel: true,
      confirmText: '确定',
      cancelText: '取消'
    });
  },

  // 学生管理
  navigateToStudents: function () {
    wx.navigateTo({
      url: '/pages/teacher/students/index'
    });
  },

  // 课程管理
  navigateToCourses: function () {
    wx.navigateTo({
      url: '/pages/teacher/courses/index'
    });
  },

  // 素材中心
  navigateToMaterials: function () {
    wx.navigateTo({
      url: '/pages/teacher/materials/index'
    });
  },

  // 教学统计
  navigateToStatistics: function () {
    wx.navigateTo({
      url: '/pages/teacher/statistics/index'
    });
  },

  // 跨境适配
  navigateToCrossBorder: function () {
    wx.navigateTo({
      url: '/pages/teacher/cross-border/index'
    });
  },

  // 多语言教学
  navigateToMultilingual: function () {
    wx.navigateTo({
      url: '/pages/teacher/multilingual/index'
    });
  },

  // 资源分享
  navigateToResourceShare: function () {
    wx.navigateTo({
      url: '/pages/teacher/resource-share/index'
    });
  },

  // 教师培训
  navigateToTraining: function () {
    wx.navigateTo({
      url: '/pages/teacher/training/index'
    });
  },

  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});