// index.js
Page({
  data: {
    courses: [
      {
        id: 'C001',
        name: '粤港数学三年级跨境适配课程',
        subject: '数学',
        grade: '3',
        type: '跨境适配',
        status: 'active',
        description: '针对粤港两地数学课程标准差异，设计的跨境学生适配课程，涵盖两地核心知识点',
        studentCount: 28,
        startDate: '2024-09-01',
        endDate: '2024-12-31',
        materialsCount: 12,
        crossBorderInfo: {
          guangdongStandards: ['数与代数', '图形与几何', '统计与概率'],
          hongkongStandards: ['Number', 'Shape and Space', 'Data Handling'],
          adaptationLevel: '高'
        }
      },
      {
        id: 'C002',
        name: '英语阅读与写作提升',
        subject: '英语',
        grade: '4',
        type: '常规课程',
        status: 'active',
        description: '提升学生英语阅读和写作能力，融合粤港两地英语教学特点',
        studentCount: 35,
        startDate: '2024-09-01',
        endDate: '2024-12-31',
        materialsCount: 18,
        crossBorderInfo: null
      },
      {
        id: 'C003',
        name: '中文语文素养培养',
        subject: '语文',
        grade: '5',
        type: '常规课程',
        status: 'active',
        description: '培养学生的中文语言素养，包括阅读理解、写作表达等能力',
        studentCount: 32,
        startDate: '2024-09-01',
        endDate: '2024-12-31',
        materialsCount: 20,
        crossBorderInfo: null
      },
      {
        id: 'C004',
        name: '粤港科学四年级知识点对标',
        subject: '科学',
        grade: '4',
        type: '跨境适配',
        status: 'active',
        description: '粤港两地科学课程知识点对标，帮助跨境学生适应不同教学体系',
        studentCount: 25,
        startDate: '2024-09-01',
        endDate: '2024-12-31',
        materialsCount: 15,
        crossBorderInfo: {
          guangdongStandards: ['生命科学', '物质科学', '地球与宇宙'],
          hongkongStandards: ['Living Things', 'Materials', 'Earth and Space'],
          adaptationLevel: '中'
        }
      },
      {
        id: 'C005',
        name: '数学思维训练',
        subject: '数学',
        grade: '6',
        type: '拓展课程',
        status: 'active',
        description: '培养学生的数学思维能力，提升解决问题的能力',
        studentCount: 20,
        startDate: '2024-09-01',
        endDate: '2024-12-31',
        materialsCount: 10,
        crossBorderInfo: null
      }
    ],
    searchKeyword: '',
    selectedSubject: '',
    selectedGrade: '',
    selectedType: '',
    showFilterModal: false,
    filterType: '',
    filterTitle: '',
    filterOptions: [],
    selectedFilterValue: ''
  },

  onLoad: function () {
    // 初始化数据
    this.setData({
      originalCourses: [...this.data.courses]
    });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 添加课程
  addCourse: function () {
    wx.showModal({
      title: '添加课程',
      content: '请选择课程类型',
      cancelText: '常规课程',
      confirmText: '跨境适配课程',
      success: (res) => {
        if (res.confirm) {
          // 跨境适配课程
          wx.showToast({
            title: '跨境适配课程创建功能开发中',
            icon: 'info'
          });
        } else if (res.cancel) {
          // 常规课程
          wx.showToast({
            title: '常规课程创建功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 搜索课程
  onSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.filterCourses();
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
      case 'type':
        title = '课程类型';
        options = [
          { label: '全部', value: '' },
          { label: '常规课程', value: '常规课程' },
          { label: '跨境适配', value: '跨境适配' },
          { label: '拓展课程', value: '拓展课程' }
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

    this.filterCourses();
  },

  // 筛选课程
  filterCourses: function () {
    let filteredCourses = [...this.data.originalCourses];

    // 按关键词搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filteredCourses = filteredCourses.filter(course => 
        course.name.toLowerCase().includes(keyword) ||
        course.subject.toLowerCase().includes(keyword) ||
        course.grade.includes(keyword)
      );
    }

    // 按学科筛选
    if (this.data.selectedSubject && this.data.selectedSubject !== '全部') {
      filteredCourses = filteredCourses.filter(course => 
        course.subject === this.data.selectedSubject
      );
    }

    // 按年级筛选
    if (this.data.selectedGrade && this.data.selectedGrade !== '全部') {
      filteredCourses = filteredCourses.filter(course => 
        course.grade === this.data.selectedGrade.replace('年级', '')
      );
    }

    // 按课程类型筛选
    if (this.data.selectedType && this.data.selectedType !== '全部') {
      filteredCourses = filteredCourses.filter(course => 
        course.type === this.data.selectedType
      );
    }

    this.setData({ courses: filteredCourses });
  },

  // 查看课程详情
  viewCourseDetail: function (e) {
    const courseId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/teacher/courses/detail?id=${courseId}`
    });
  },

  // 编辑课程
  editCourse: function (e) {
    const courseId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '课程编辑功能开发中',
      icon: 'info'
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});