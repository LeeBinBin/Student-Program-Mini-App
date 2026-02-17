// index.js
Page({
  data: {
    students: [
      {
        id: 'S001',
        name: '张明',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港中文大学附属学校',
        grade: '3',
        subjects: ['数学', '英语', '语文'],
        crossBorderInfo: {
          mainlandSchool: '深圳外国语学校',
          adaptationLevel: '良好',
          needsAttention: false
        }
      },
      {
        id: 'S002',
        name: '李华',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳实验学校',
        grade: '4',
        subjects: ['数学', '英语', '语文'],
        crossBorderInfo: null
      },
      {
        id: 'S003',
        name: '王芳',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港浸会大学附属学校',
        grade: '2',
        subjects: ['数学', '英语', '语文'],
        crossBorderInfo: {
          mainlandSchool: '广州执信中学',
          adaptationLevel: '一般',
          needsAttention: true
        }
      },
      {
        id: 'S004',
        name: '陈强',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳中学',
        grade: '5',
        subjects: ['数学', '英语', '语文'],
        crossBorderInfo: null
      },
      {
        id: 'S005',
        name: '赵静',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港大学附属学校',
        grade: '3',
        subjects: ['数学', '英语', '语文'],
        crossBorderInfo: {
          mainlandSchool: '深圳南山外国语学校',
          adaptationLevel: '优秀',
          needsAttention: false
        }
      }
    ],
    searchKeyword: '',
    selectedType: '',
    selectedSchool: '',
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
      originalStudents: [...this.data.students]
    });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 添加学生
  addStudent: function () {
    wx.showModal({
      title: '添加学生',
      content: '请选择添加方式',
      cancelText: '手动录入',
      confirmText: '批量导入',
      success: (res) => {
        if (res.confirm) {
          // 批量导入
          wx.showToast({
            title: '批量导入功能开发中',
            icon: 'info'
          });
        } else if (res.cancel) {
          // 手动录入
          wx.showToast({
            title: '手动录入功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 搜索学生
  onSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.filterStudents();
  },

  // 显示筛选弹窗
  showFilter: function (type) {
    let title = '';
    let options = [];

    switch (type) {
      case 'type':
        title = '学生类型';
        options = [
          { label: '全部', value: '' },
          { label: '跨境学生', value: 'cross-border' },
          { label: '本地学生', value: 'local' }
        ];
        break;
      case 'school':
        title = '学校';
        options = [
          { label: '全部', value: '' },
          { label: '香港中文大学附属学校', value: '香港中文大学附属学校' },
          { label: '深圳实验学校', value: '深圳实验学校' },
          { label: '香港浸会大学附属学校', value: '香港浸会大学附属学校' },
          { label: '深圳中学', value: '深圳中学' },
          { label: '香港大学附属学校', value: '香港大学附属学校' }
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

    this.filterStudents();
  },

  // 筛选学生
  filterStudents: function () {
    let filteredStudents = [...this.data.originalStudents];

    // 按关键词搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filteredStudents = filteredStudents.filter(student => 
        student.name.toLowerCase().includes(keyword) ||
        student.id.toLowerCase().includes(keyword) ||
        student.school.toLowerCase().includes(keyword)
      );
    }

    // 按学生类型筛选
    if (this.data.selectedType && this.data.selectedType !== '全部') {
      filteredStudents = filteredStudents.filter(student => 
        student.type === (this.data.selectedType === '跨境学生' ? 'cross-border' : 'local')
      );
    }

    // 按学校筛选
    if (this.data.selectedSchool && this.data.selectedSchool !== '全部') {
      filteredStudents = filteredStudents.filter(student => 
        student.school === this.data.selectedSchool
      );
    }

    // 按年级筛选
    if (this.data.selectedGrade && this.data.selectedGrade !== '全部') {
      filteredStudents = filteredStudents.filter(student => 
        student.grade === this.data.selectedGrade.replace('年级', '')
      );
    }

    this.setData({ students: filteredStudents });
  },

  // 查看学生详情
  viewStudentDetail: function (e) {
    const studentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/teacher/students/detail?id=${studentId}`
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});