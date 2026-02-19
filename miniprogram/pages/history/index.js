Page({
  data: {
    currentType: 'all',
    historyList: []
  },

  onLoad: function () {
    this.loadHistory();
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

  loadHistory: function () {
    const history = wx.getStorageSync('studyHistory') || [];
    this.setData({
      historyList: this.filterHistory(history)
    });
  },

  filterHistory: function (history) {
    const currentType = this.data.currentType;
    if (currentType === 'all') {
      return history;
    }
    return history.filter(item => item.type === currentType);
  },

  switchType: function (e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      currentType: type
    });
    this.loadHistory();
  },

  viewDetail: function (e) {
    const item = e.currentTarget.dataset.item;
    if (item.type === 'material') {
      wx.navigateTo({
        url: '/pages/material/index'
      });
    } else if (item.type === 'test') {
      var detailContent = '年级：' + item.grade + '\n';
      detailContent += '科目：' + item.subject + '\n';
      detailContent += '得分：' + item.score + '分\n';
      detailContent += '掌握率：' + item.masteryRate + '%\n\n';
      detailContent += '评价：' + item.feedback;
      
      if (item.masteryItems && item.masteryItems.length > 0) {
        detailContent += '\n\n知识点掌握情况：\n';
        item.masteryItems.forEach(function(masteryItem) {
          detailContent += '• ' + masteryItem.name + '：' + masteryItem.percent + '%\n';
        });
      }
      
      wx.showModal({
        title: '测试详情',
        content: detailContent,
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#1E88E5'
      });
    } else if (item.type === 'knowledge') {
      wx.navigateTo({
        url: '/pages/knowledge/index'
      });
    }
  },

  clearHistory: function () {
    wx.showModal({
      title: '清空历史记录',
      content: '确定要清空所有学习历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('studyHistory');
          this.setData({
            historyList: []
          });
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  }
});
