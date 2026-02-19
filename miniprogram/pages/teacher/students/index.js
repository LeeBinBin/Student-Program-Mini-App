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
        grade: '三年级',
        subjects: ['数学', '英语', '语文'],
        subjectsText: '数学、英语、语文',
        phone: '13812345678',
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
        grade: '四年级',
        subjects: ['数学', '英语', '科学'],
        subjectsText: '数学、英语、科学',
        phone: '13923456789',
        crossBorderInfo: null
      },
      {
        id: 'S003',
        name: '王芳',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港浸会大学附属学校',
        grade: '二年级',
        subjects: ['数学', '语文', '英语'],
        subjectsText: '数学、语文、英语',
        phone: '13734567890',
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
        grade: '五年级',
        subjects: ['数学', '科学', '英语'],
        subjectsText: '数学、科学、英语',
        phone: '13645678901',
        crossBorderInfo: null
      },
      {
        id: 'S005',
        name: '赵静',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港大学附属学校',
        grade: '三年级',
        subjects: ['数学', '英语', '语文'],
        subjectsText: '数学、英语、语文',
        phone: '13556789012',
        crossBorderInfo: {
          mainlandSchool: '深圳南山外国语学校',
          adaptationLevel: '优秀',
          needsAttention: false
        }
      },
      {
        id: 'S006',
        name: '刘洋',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳外国语学校',
        grade: '六年级',
        subjects: ['数学', '语文', '英语'],
        subjectsText: '数学、语文、英语',
        phone: '13467890123',
        crossBorderInfo: null
      },
      {
        id: 'S007',
        name: '周婷',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港培正中学',
        grade: '四年级',
        subjects: ['数学', '英语', '科学'],
        subjectsText: '数学、英语、科学',
        phone: '13378901234',
        crossBorderInfo: {
          mainlandSchool: '广州外国语学校',
          adaptationLevel: '良好',
          needsAttention: false
        }
      },
      {
        id: 'S008',
        name: '吴磊',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳高级中学',
        grade: '五年级',
        subjects: ['数学', '语文', '科学'],
        subjectsText: '数学、语文、科学',
        phone: '13289012345',
        crossBorderInfo: null
      },
      {
        id: 'S009',
        name: '郑伟',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港培侨中学',
        grade: '七年级',
        subjects: ['数学', '英语', '物理'],
        subjectsText: '数学、英语、物理',
        phone: '13190123456',
        crossBorderInfo: {
          mainlandSchool: '深圳实验学校',
          adaptationLevel: '良好',
          needsAttention: false
        }
      },
      {
        id: 'S010',
        name: '孙丽',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳红岭中学',
        grade: '八年级',
        subjects: ['数学', '英语', '化学'],
        subjectsText: '数学、英语、化学',
        phone: '13001234567',
        crossBorderInfo: null
      },
      {
        id: 'S011',
        name: '马超',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港圣公会林护纪念中学',
        grade: '九年级',
        subjects: ['数学', '英语', '生物'],
        subjectsText: '数学、英语、生物',
        phone: '12912345678',
        crossBorderInfo: {
          mainlandSchool: '广州第二中学',
          adaptationLevel: '优秀',
          needsAttention: false
        }
      },
      {
        id: 'S012',
        name: '朱晓',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳翠园中学',
        grade: '七年级',
        subjects: ['数学', '语文', '英语'],
        subjectsText: '数学、语文、英语',
        phone: '12823456789',
        crossBorderInfo: null
      },
      {
        id: 'S013',
        name: '林峰',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港圣保罗男女中学',
        grade: '八年级',
        subjects: ['数学', '英语', '物理'],
        subjectsText: '数学、英语、物理',
        phone: '12734567890',
        crossBorderInfo: {
          mainlandSchool: '深圳外国语学校',
          adaptationLevel: '一般',
          needsAttention: true
        }
      },
      {
        id: 'S014',
        name: '徐敏',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳宝安中学',
        grade: '九年级',
        subjects: ['数学', '英语', '化学'],
        subjectsText: '数学、英语、化学',
        phone: '12645678901',
        crossBorderInfo: null
      },
      {
        id: 'S015',
        name: '何强',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港拔萃男书院',
        grade: '七年级',
        subjects: ['数学', '英语', '语文'],
        subjectsText: '数学、英语、语文',
        phone: '12556789012',
        crossBorderInfo: {
          mainlandSchool: '深圳中学',
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
    // 页面加载时不需要特殊处理，直接使用data中的students数据
  },

  onShow: function () {
    // 页面显示时不需要特殊处理
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 添加学生
  addStudent: function () {
    wx.navigateTo({
      url: '/pages/teacher/students/add'
    });
  },

  // 搜索学生
  onSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.filterStudents();
  },

  // 显示筛选弹窗
  showFilter: function (e) {
    const type = e.currentTarget.dataset.type;
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
          { label: '一年级', value: '一年级' },
          { label: '二年级', value: '二年级' },
          { label: '三年级', value: '三年级' },
          { label: '四年级', value: '四年级' },
          { label: '五年级', value: '五年级' },
          { label: '六年级', value: '六年级' },
          { label: '七年级', value: '七年级' },
          { label: '八年级', value: '八年级' },
          { label: '九年级', value: '九年级' }
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
    // 直接使用原始students数据进行筛选
    // 首先获取所有学生数据
    const allStudents = [
      {
        id: 'S001',
        name: '张明',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港中文大学附属学校',
        grade: '三年级',
        subjects: ['数学', '英语', '语文'],
        phone: '13812345678',
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
        grade: '四年级',
        subjects: ['数学', '英语', '科学'],
        phone: '13923456789',
        crossBorderInfo: null
      },
      {
        id: 'S003',
        name: '王芳',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港浸会大学附属学校',
        grade: '二年级',
        subjects: ['数学', '语文', '英语'],
        phone: '13734567890',
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
        grade: '五年级',
        subjects: ['数学', '科学', '英语'],
        phone: '13645678901',
        crossBorderInfo: null
      },
      {
        id: 'S005',
        name: '赵静',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港大学附属学校',
        grade: '三年级',
        subjects: ['数学', '英语', '语文'],
        phone: '13556789012',
        crossBorderInfo: {
          mainlandSchool: '深圳南山外国语学校',
          adaptationLevel: '优秀',
          needsAttention: false
        }
      },
      {
        id: 'S006',
        name: '刘洋',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳外国语学校',
        grade: '六年级',
        subjects: ['数学', '语文', '英语'],
        phone: '13467890123',
        crossBorderInfo: null
      },
      {
        id: 'S007',
        name: '周婷',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港培正中学',
        grade: '四年级',
        subjects: ['数学', '英语', '科学'],
        phone: '13378901234',
        crossBorderInfo: {
          mainlandSchool: '广州外国语学校',
          adaptationLevel: '良好',
          needsAttention: false
        }
      },
      {
        id: 'S008',
        name: '吴磊',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳高级中学',
        grade: '五年级',
        subjects: ['数学', '语文', '科学'],
        phone: '13289012345',
        crossBorderInfo: null
      },
      {
        id: 'S009',
        name: '郑伟',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港培侨中学',
        grade: '七年级',
        subjects: ['数学', '英语', '物理'],
        phone: '13190123456',
        crossBorderInfo: {
          mainlandSchool: '深圳实验学校',
          adaptationLevel: '良好',
          needsAttention: false
        }
      },
      {
        id: 'S010',
        name: '孙丽',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳红岭中学',
        grade: '八年级',
        subjects: ['数学', '英语', '化学'],
        phone: '13001234567',
        crossBorderInfo: null
      },
      {
        id: 'S011',
        name: '马超',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港圣公会林护纪念中学',
        grade: '九年级',
        subjects: ['数学', '英语', '生物'],
        phone: '12912345678',
        crossBorderInfo: {
          mainlandSchool: '广州第二中学',
          adaptationLevel: '优秀',
          needsAttention: false
        }
      },
      {
        id: 'S012',
        name: '朱晓',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳翠园中学',
        grade: '七年级',
        subjects: ['数学', '语文', '英语'],
        phone: '12823456789',
        crossBorderInfo: null
      },
      {
        id: 'S013',
        name: '林峰',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港圣保罗男女中学',
        grade: '八年级',
        subjects: ['数学', '英语', '物理'],
        phone: '12734567890',
        crossBorderInfo: {
          mainlandSchool: '深圳外国语学校',
          adaptationLevel: '一般',
          needsAttention: true
        }
      },
      {
        id: 'S014',
        name: '徐敏',
        avatar: '',
        type: 'local',
        status: 'active',
        school: '深圳宝安中学',
        grade: '九年级',
        subjects: ['数学', '英语', '化学'],
        phone: '12645678901',
        crossBorderInfo: null
      },
      {
        id: 'S015',
        name: '何强',
        avatar: '',
        type: 'cross-border',
        status: 'active',
        school: '香港拔萃男书院',
        grade: '七年级',
        subjects: ['数学', '英语', '语文'],
        phone: '12556789012',
        crossBorderInfo: {
          mainlandSchool: '深圳中学',
          adaptationLevel: '优秀',
          needsAttention: false
        }
      }
    ];

    // 确保每个学生都有subjects字段，并且是一个数组
    const studentsWithSubjects = allStudents.map(student => {
      if (!student.subjects || !Array.isArray(student.subjects)) {
        return {
          ...student,
          subjects: [],
          subjectsText: ''
        };
      }
      return {
        ...student,
        subjectsText: student.subjects.join('、')
      };
    });

    let filteredStudents = [...studentsWithSubjects];

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
        student.grade === this.data.selectedGrade
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

  // 联系学生
  contactStudent: function (e) {
    const phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});