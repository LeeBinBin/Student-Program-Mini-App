Page({
  data: {
    currentType: 'all',
    favoritesList: []
  },

  onLoad: function () {
    this.loadFavorites();
  },

  onShow: function () {
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

  loadFavorites: function () {
    let favorites = wx.getStorageSync('favorites') || [];
    
    if (favorites.length === 0) {
      favorites = [
        {
          id: '1',
          title: '粤港数学三年级分数知识点对比',
          type: 'material',
          typeName: '辅导资料',
          time: '2024/1/15 14:30:25'
        },
        {
          id: '3',
          title: '知识点对标 - 数学分数',
          type: 'knowledge',
          typeName: '知识点对标',
          time: '2024/1/14 16:45:18'
        },
        {
          id: '4',
          title: '粤港语文四年级阅读理解技巧',
          type: 'material',
          typeName: '辅导资料',
          time: '2024/1/14 09:20:33'
        }
      ];
      wx.setStorageSync('favorites', favorites);
    }
    
    this.setData({
      favoritesList: this.filterFavorites(favorites)
    });
  },

  filterFavorites: function (favorites) {
    const currentType = this.data.currentType;
    if (currentType === 'all') {
      return favorites;
    }
    return favorites.filter(item => item.type === currentType);
  },

  switchType: function (e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      currentType: type
    });
    this.loadFavorites();
  },

  viewDetail: function (e) {
    const item = e.currentTarget.dataset.item;
    if (item.type === 'material') {
      wx.navigateTo({
        url: '/pages/material/index'
      });
    } else if (item.type === 'test') {
      wx.navigateTo({
        url: '/pages/test/index'
      });
    } else if (item.type === 'knowledge') {
      wx.navigateTo({
        url: '/pages/knowledge/index'
      });
    }
  },

  removeFavorite: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '取消收藏',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          let favorites = wx.getStorageSync('favorites') || [];
          favorites = favorites.filter(item => item.id !== id);
          wx.setStorageSync('favorites', favorites);
          this.loadFavorites();
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          });
        }
      }
    });
  }
});
