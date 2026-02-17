// index.js
Page({
  data: {
    // 统计概览数据
    totalStudents: 45,
    crossBorderStudents: 15,
    totalCourses: 12,
    totalMaterials: 36,
    
    // 筛选条件
    selectedTimeRange: '',
    selectedSubject: '',
    selectedGrade: '',
    showFilterModal: false,
    filterType: '',
    filterTitle: '',
    filterOptions: [],
    selectedFilterValue: '',
    
    // 学习数据
    learningData: {
      averageScores: [85, 86, 84, 87, 88, 89],
      subjects: ['数学', '英语', '语文', '科学', '历史', '地理'],
      scores: [88, 85, 87, 84, 89, 86]
    },
    
    // 跨境学生适应数据
    adaptationData: {
      levels: [
        { name: '优秀', count: 12, percentage: 40 },
        { name: '良好', count: 10, percentage: 35 },
        { name: '一般', count: 6, percentage: 20 },
        { name: '需关注', count: 2, percentage: 5 }
      ],
      problems: [
        { name: '语言障碍', count: 8 },
        { name: '课程差异', count: 6 },
        { name: '学习习惯', count: 4 },
        { name: '文化差异', count: 3 }
      ]
    },
    
    // 教学资源使用数据
    resourcesData: {
      downloads: [128, 95, 87, 64, 112, 73],
      types: [
        { name: '文档', count: 18 },
        { name: '课件', count: 10 },
        { name: '视频', count: 4 },
        { name: '音频', count: 2 },
        { name: '图片', count: 2 }
      ]
    }
  },

  onLoad: function () {
    // 初始化数据
    console.log('教学统计页面加载');
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 导出数据
  exportData: function () {
    wx.showModal({
      title: '导出数据',
      content: '请选择导出格式',
      cancelText: 'Excel',
      confirmText: 'PDF',
      success: (res) => {
        if (res.confirm) {
          // PDF格式
          wx.showToast({
            title: 'PDF格式导出功能开发中',
            icon: 'info'
          });
        } else if (res.cancel) {
          // Excel格式
          wx.showToast({
            title: 'Excel格式导出功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 显示筛选弹窗
  showFilter: function (type) {
    let title = '';
    let options = [];

    switch (type) {
      case 'timeRange':
        title = '时间范围';
        options = [
          { label: '全部', value: '' },
          { label: '本周', value: 'week' },
          { label: '本月', value: 'month' },
          { label: '本学期', value: 'semester' },
          { label: '本年度', value: 'year' }
        ];
        break;
      case 'subject':
        title = '学科';
        options = [
          { label: '全部', value: '' },
          { label: '数学', value: '数学' },
          { label: '英语', value: '英语' },
          { label: '语文', value: '语文' },
          { label: '科学', value: '科学' },
          { label: '其他', value: '其他' }
        ];
        break;
      case 'grade':
        title = '年级';
        options = [
          { label: '全部', value: '' },
          { label: '1年级', value: '1' },
          { label: '2年级', value: '2' },
          { label: '3年级', value: '3' },
          { label: '4年级', value: '4' },
          { label: '5年级', value: '5' },
          { label: '6年级', value: '6' }
        ];
        break;
    }

    this.setData({
      showFilterModal: true,
      filterType: type,
      filterTitle: title,
      filterOptions: options,
      selectedFilterValue: this.data[`selected${type.charAt(0).toUpperCase() + type.slice(1)}`] || ''
    });
  },

  // 隐藏筛选弹窗
  hideFilter: function () {
    this.setData({ showFilterModal: false });
  },

  // 选择筛选条件
  selectFilter: function (e) {
    const value = e.currentTarget.dataset.value;
    const label = e.currentTarget.dataset.label;
    const type = this.data.filterType;

    this.setData({
      [`selected${type.charAt(0).toUpperCase() + type.slice(1)}`]: value ? label : '',
      showFilterModal: false
    });

    // 根据筛选条件更新数据
    this.updateStatsData();
  },

  // 更新统计数据
  updateStatsData: function () {
    // 模拟数据更新
    console.log('更新统计数据', {
      timeRange: this.data.selectedTimeRange,
      subject: this.data.selectedSubject,
      grade: this.data.selectedGrade
    });
    
    // 这里可以根据筛选条件从服务器获取真实数据
    // 目前使用模拟数据
  },

  // 查看详情
  viewDetail: function (type) {
    wx.showModal({
      title: '查看详情',
      content: `查看${type === 'learning' ? '学习数据' : type === 'adaptation' ? '适应情况' : '资源使用'}详细分析`,
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          // 跳转到详情页面
          wx.showToast({
            title: '详情页面功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});