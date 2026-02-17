Page({
  data: {
    type: '',
    title: ''
  },

  onLoad: function(options) {
    const type = options.type || 'agreement';
    this.setData({
      type: type,
      title: type === 'agreement' ? '用户协议' : '隐私政策'
    });
  },

  navigateBack: function() {
    wx.navigateBack({
      delta: 1
    });
  }
});
