// index.js
Page({
  data: {
    comparisons: [
      {
        id: 'CB001',
        name: '粤港数学三年级知识点对标',
        subject: '数学',
        grade: '3',
        status: 'completed',
        createDate: '2024-09-15',
        knowledgePoints: [
          {
            guangdong: '万以内的加法和减法',
            hongkong: 'Addition and Subtraction within 10000',
            similarity: 'high'
          },
          {
            guangdong: '多位数乘一位数',
            hongkong: 'Multiplication of multi-digit numbers by one-digit numbers',
            similarity: 'high'
          },
          {
            guangdong: '分数的初步认识',
            hongkong: 'Introduction to fractions',
            similarity: 'medium'
          },
          {
            guangdong: '长方形和正方形的周长',
            hongkong: 'Perimeter of rectangles and squares',
            similarity: 'high'
          },
          {
            guangdong: '时、分、秒',
            hongkong: 'Hours, minutes, seconds',
            similarity: 'high'
          }
        ]
      },
      {
        id: 'CB002',
        name: '粤港英语四年级知识点对标',
        subject: '英语',
        grade: '4',
        status: 'completed',
        createDate: '2024-09-10',
        knowledgePoints: [
          {
            guangdong: '一般现在时',
            hongkong: 'Simple present tense',
            similarity: 'high'
          },
          {
            guangdong: '可数名词和不可数名词',
            hongkong: 'Countable and uncountable nouns',
            similarity: 'high'
          },
          {
            guangdong: '形容词的比较级',
            hongkong: 'Comparative form of adjectives',
            similarity: 'medium'
          }
        ]
      },
      {
        id: 'CB003',
        name: '粤港科学四年级知识点对标',
        subject: '科学',
        grade: '4',
        status: 'in_progress',
        createDate: '2024-09-05',
        knowledgePoints: [
          {
            guangdong: '声音的产生和传播',
            hongkong: 'Production and propagation of sound',
            similarity: 'medium'
          },
          {
            guangdong: '电路的组成',
            hongkong: 'Components of electric circuits',
            similarity: 'high'
          }
        ]
      },
      {
        id: 'CB004',
        name: '粤港语文五年级知识点对标',
        subject: '语文',
        grade: '5',
        status: 'completed',
        createDate: '2024-08-28',
        knowledgePoints: [
          {
            guangdong: '记叙文的写作',
            hongkong: 'Narrative writing',
            similarity: 'medium'
          },
          {
            guangdong: '古诗的理解与背诵',
            hongkong: 'Understanding and reciting ancient poetry',
            similarity: 'high'
          },
          {
            guangdong: '词语的理解与运用',
            hongkong: 'Understanding and using vocabulary',
            similarity: 'high'
          }
        ]
      }
    ],
    searchKeyword: '',
    selectedSubject: '',
    selectedGrade: '',
    showFilterModal: false,
    filterType: '',
    filterTitle: '',
    filterOptions: [],
    selectedFilterValue: ''
  },

  onLoad: function () {
    // 初始化数据
    this.setData({
      originalComparisons: [...this.data.comparisons]
    });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 添加知识点对标
  addComparison: function () {
    wx.showModal({
      title: '添加知识点对标',
      content: '请选择学科',
      cancelText: '数学',
      confirmText: '其他学科',
      success: (res) => {
        if (res.confirm) {
          // 其他学科
          wx.showToast({
            title: '其他学科对标创建功能开发中',
            icon: 'info'
          });
        } else if (res.cancel) {
          // 数学
          wx.showToast({
            title: '数学对标创建功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 搜索知识点
  onSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.filterComparisons();
  },

  // 显示筛选弹窗
  showFilter: function (type) {
    let title = '';
    let options = [];

    switch (type) {
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

    this.filterComparisons();
  },

  // 筛选知识点对标
  filterComparisons: function () {
    let filteredComparisons = [...this.data.originalComparisons];

    // 按关键词搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filteredComparisons = filteredComparisons.filter(comparison => 
        comparison.name.toLowerCase().includes(keyword) ||
        comparison.subject.toLowerCase().includes(keyword) ||
        comparison.knowledgePoints.some(point => 
          point.guangdong.toLowerCase().includes(keyword) ||
          point.hongkong.toLowerCase().includes(keyword)
        )
      );
    }

    // 按学科筛选
    if (this.data.selectedSubject && this.data.selectedSubject !== '全部') {
      filteredComparisons = filteredComparisons.filter(comparison => 
        comparison.subject === this.data.selectedSubject
      );
    }

    // 按年级筛选
    if (this.data.selectedGrade && this.data.selectedGrade !== '全部') {
      filteredComparisons = filteredComparisons.filter(comparison => 
        comparison.grade === this.data.selectedGrade.replace('年级', '')
      );
    }

    this.setData({ comparisons: filteredComparisons });
  },

  // 查看知识点对标详情
  viewComparison: function (e) {
    const comparisonId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/teacher/cross-border/detail?id=${comparisonId}`
    });
  },

  // 编辑知识点对标
  editComparison: function (e) {
    const comparisonId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '知识点对标编辑功能开发中',
      icon: 'info'
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});