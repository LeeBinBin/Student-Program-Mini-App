Component({
  data: {
    selected: 0,
    color: "#666666",
    selectedColor: "#1E88E5",
    list: [],
    showTeacherTab: false
  },

  lifetimes: {
    attached() {
      this.updateTabBar();
    }
  },

  pageLifetimes: {
    show() {
      this.updateTabBar();
    }
  },

  methods: {
    updateTabBar() {
      const app = getApp();
      const showTeacherTab = app.globalData.showTeacherTab;

      const baseList = [
        {
          pagePath: "/pages/index/index",
          text: "首页",
          iconPath: "/images/tab/home.png",
          selectedIconPath: "/images/tab/home-active.png"
        },
        {
          pagePath: "/pages/knowledge/index",
          text: "知识点对标",
          iconPath: "/images/tab/knowledge.png",
          selectedIconPath: "/images/tab/knowledge-active.png"
        },
        {
          pagePath: "/pages/material/index",
          text: "辅导资料",
          iconPath: "/images/tab/material.png",
          selectedIconPath: "/images/tab/material-active.png"
        }
      ];

      const teacherTab = {
        pagePath: "/pages/teacher/index",
        text: "教师中心",
        iconPath: "/images/tab/teacher.png",
        selectedIconPath: "/images/tab/teacher-active.png"
      };

      const profileTab = {
        pagePath: "/pages/profile/index",
        text: "我",
        iconPath: "/images/tab/my.png",
        selectedIconPath: "/images/tab/my-active.png"
      };

      let list = [...baseList];
      if (showTeacherTab) {
        list.push(teacherTab);
      }
      list.push(profileTab);

      this.setData({ list, showTeacherTab });
      
      // 检查当前页面是否在新的 tabBar 列表中
      const pages = getCurrentPages();
      if (pages && pages.length > 0) {
        const currentPage = pages[pages.length - 1];
        if (currentPage) {
          const route = currentPage.route;
          
          // 定义所有 tabBar 页面路径
          const tabPages = [
            'pages/index/index',
            'pages/knowledge/index',
            'pages/material/index',
            'pages/teacher/index',
            'pages/profile/index'
          ];
          
          // 只有当前页面是 tabBar 页面时，才检查是否在列表中
          const isTabPage = tabPages.includes(route);
          
          if (isTabPage) {
            const isInList = list.some(item => item.pagePath === `/${route}`);
            
            // 如果当前页面不在 tabBar 列表中（例如教师中心被隐藏时），跳转到首页
            if (!isInList && route !== 'pages/index/index') {
              wx.switchTab({
                url: '/pages/index/index'
              });
            }
          }
        }
      }
      
      this.updateSelected();
    },

    updateSelected() {
      const pages = getCurrentPages();
      if (!pages || pages.length === 0) return;
      
      const currentPage = pages[pages.length - 1];
      if (!currentPage) return;
      
      const route = currentPage.route;
      const list = this.data.list;
      const selected = list.findIndex(item => item.pagePath === `/${route}`);

      if (selected !== -1) {
        this.setData({ selected });
      } else {
        // 如果当前页面不在 tabBar 列表中（例如教师中心被隐藏时），默认选中首页
        this.setData({ selected: 0 });
      }
    },

    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      const index = data.index;
      
      this.setData({ selected: index });
      
      wx.switchTab({ url });
    }
  }
});
