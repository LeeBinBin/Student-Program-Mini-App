// index.js
Page({
  data: {
    // 当前激活的标签页
    activeTab: 'credit',
    
    // 学分互认数据
    creditCourses: [
      {
        id: 'CR001',
        courseName: '数学基础与应用',
        subject: '数学',
        level: '中级',
        status: '已认证',
        statusColor: '#4CAF50',
        guangdongCredit: 4,
        hongkongCredit: 3,
        description: '粤港两地数学基础课程，涵盖数与代数、图形与几何等核心知识点，已完成学分互认认证。',
        requirements: {
          guangdong: '完成所有课程单元和期末考试',
          hongkong: '完成所有课程单元、小组作业和期末考试'
        }
      },
      {
        id: 'CR002',
        courseName: '英语听说与读写',
        subject: '英语',
        level: '初级',
        status: '已认证',
        statusColor: '#4CAF50',
        guangdongCredit: 3,
        hongkongCredit: 3,
        description: '粤港两地英语基础课程，注重听说读写综合能力培养，已完成学分互认认证。',
        requirements: {
          guangdong: '完成所有课程单元和期末考试',
          hongkong: '完成所有课程单元、口语考试和期末考试'
        }
      },
      {
        id: 'CR003',
        courseName: '科学探究与实践',
        subject: '科学',
        level: '中级',
        status: '认证中',
        statusColor: '#FF9800',
        guangdongCredit: 4,
        hongkongCredit: 3.5,
        description: '粤港两地科学课程，注重实验探究和实践能力培养，正在进行学分互认认证。',
        requirements: {
          guangdong: '完成所有课程单元、实验报告和期末考试',
          hongkong: '完成所有课程单元、实验报告、小组项目和期末考试'
        }
      },
      {
        id: 'CR004',
        courseName: '中国语文与文化',
        subject: '语文',
        level: '高级',
        status: '已认证',
        statusColor: '#4CAF50',
        guangdongCredit: 5,
        hongkongCredit: 4,
        description: '粤港两地语文课程，涵盖语言文字运用、文学作品欣赏和文化传承等内容，已完成学分互认认证。',
        requirements: {
          guangdong: '完成所有课程单元、作文和期末考试',
          hongkong: '完成所有课程单元、作文、演讲和期末考试'
        }
      }
    ],
    
    // 评价体系数据
    evaluationStandards: [
      {
        id: 'ES001',
        title: '数学课程评价标准',
        subject: '数学',
        type: '课程评价',
        guangdongStandard: '采用百分制评价，包括平时成绩(40%)、期中考试(30%)和期末考试(30%)。评价内容包括知识掌握、解题能力、思维方法和学习态度。',
        hongkongStandard: '采用等级制评价(A-F)，包括课堂参与(20%)、作业(20%)、项目作业(20%)和考试(40%)。评价内容包括知识理解、应用能力、探究能力和沟通能力。',
        mappingRelation: '广东百分制与香港等级制对应关系：90-100分对应A，80-89分对应B，70-79分对应C，60-69分对应D，60分以下对应E-F。'
      },
      {
        id: 'ES002',
        title: '英语课程评价标准',
        subject: '英语',
        type: '课程评价',
        guangdongStandard: '采用百分制评价，包括平时成绩(30%)、期中考试(30%)和期末考试(40%)。评价内容包括听力、口语、阅读和写作四个方面。',
        hongkongStandard: '采用等级制评价(A-F)，包括持续评估(60%)和总结性评估(40%)。评价内容包括听力、口语、阅读、写作和综合运用能力。',
        mappingRelation: '广东百分制与香港等级制对应关系：90-100分对应A，80-89分对应B，70-79分对应C，60-69分对应D，60分以下对应E-F。'
      },
      {
        id: 'ES003',
        title: '学生综合素质评价标准',
        subject: '综合',
        type: '综合素质',
        guangdongStandard: '包括道德品质、公民素养、学习能力、交流与合作、运动与健康、审美与表现六个维度，采用等级制评价(优秀、良好、合格、不合格)。',
        hongkongStandard: '包括学业表现、共通能力、价值观与态度三个维度，采用等级制评价(优异、良好、满意、需要改善)。',
        mappingRelation: '广东综合素质评价等级与香港对应关系：优秀对应优异，良好对应良好，合格对应满意，不合格对应需要改善。'
      }
    ],
    
    // 搜索和筛选
    creditSearchKeyword: '',
    selectedCreditSubject: '',
    selectedCreditLevel: '',
    evaluationSearchKeyword: '',
    selectedEvaluationSubject: '',
    selectedEvaluationType: '',
    showFilterModal: false,
    filterType: '',
    filterTitle: '',
    filterOptions: [],
    selectedFilterValue: '',
    
    // 添加弹窗
    showAddModal: false,
    addModalType: 'credit',
    addForm: {
      courseName: '',
      title: '',
      subject: '',
      level: '',
      type: '',
      guangdongCredit: '',
      hongkongCredit: '',
      description: '',
      guangdongStandard: '',
      hongkongStandard: '',
      mappingRelation: ''
    }
  },

  onLoad: function () {
    // 初始化数据
    this.setData({
      originalCreditCourses: [...this.data.creditCourses],
      originalEvaluationStandards: [...this.data.evaluationStandards]
    });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 切换标签页
  switchTab: function (tab) {
    this.setData({ activeTab: tab });
  },

  // 学分互认搜索
  onCreditSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ creditSearchKeyword: keyword });
    this.filterCreditCourses();
  },

  // 评价体系搜索
  onEvaluationSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ evaluationSearchKeyword: keyword });
    this.filterEvaluationStandards();
  },

  // 显示学分互认筛选
  showCreditFilter: function (type) {
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
          { label: '科学', value: '科学' }
        ];
        break;
      case 'level':
        title = '级别';
        options = [
          { label: '全部', value: '' },
          { label: '初级', value: '初级' },
          { label: '中级', value: '中级' },
          { label: '高级', value: '高级' }
        ];
        break;
    }

    this.setData({
      showFilterModal: true,
      filterType: type,
      filterTitle: title,
      filterOptions: options,
      selectedFilterValue: this.data[`selectedCredit${type.charAt(0).toUpperCase() + type.slice(1)}`] || ''
    });
  },

  // 显示评价体系筛选
  showEvaluationFilter: function (type) {
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
          { label: '综合', value: '综合' }
        ];
        break;
      case 'type':
        title = '类型';
        options = [
          { label: '全部', value: '' },
          { label: '课程评价', value: '课程评价' },
          { label: '综合素质', value: '综合素质' }
        ];
        break;
    }

    this.setData({
      showFilterModal: true,
      filterType: type,
      filterTitle: title,
      filterOptions: options,
      selectedFilterValue: this.data[`selectedEvaluation${type.charAt(0).toUpperCase() + type.slice(1)}`] || ''
    });
  },

  // 隐藏筛选弹窗
  hideFilterModal: function () {
    this.setData({ showFilterModal: false });
  },

  // 选择筛选选项
  selectFilterOption: function (e) {
    const value = e.currentTarget.dataset.value;
    const label = e.currentTarget.dataset.label;
    const type = e.currentTarget.dataset.type;

    if (this.data.activeTab === 'credit') {
      this.setData({
        [`selectedCredit${type.charAt(0).toUpperCase() + type.slice(1)}`]: value ? label : '',
        showFilterModal: false
      });
      this.filterCreditCourses();
    } else {
      this.setData({
        [`selectedEvaluation${type.charAt(0).toUpperCase() + type.slice(1)}`]: value ? label : '',
        showFilterModal: false
      });
      this.filterEvaluationStandards();
    }
  },

  // 筛选学分互认课程
  filterCreditCourses: function () {
    let filteredCourses = [...this.data.originalCreditCourses];

    // 按关键词搜索
    if (this.data.creditSearchKeyword) {
      const keyword = this.data.creditSearchKeyword.toLowerCase();
      filteredCourses = filteredCourses.filter(course => 
        course.courseName.toLowerCase().includes(keyword) ||
        course.description.toLowerCase().includes(keyword) ||
        course.subject.toLowerCase().includes(keyword)
      );
    }

    // 按学科筛选
    if (this.data.selectedCreditSubject && this.data.selectedCreditSubject !== '全部') {
      filteredCourses = filteredCourses.filter(course => 
        course.subject === this.data.selectedCreditSubject
      );
    }

    // 按级别筛选
    if (this.data.selectedCreditLevel && this.data.selectedCreditLevel !== '全部') {
      filteredCourses = filteredCourses.filter(course => 
        course.level === this.data.selectedCreditLevel
      );
    }

    this.setData({ creditCourses: filteredCourses });
  },

  // 筛选评价标准
  filterEvaluationStandards: function () {
    let filteredStandards = [...this.data.originalEvaluationStandards];

    // 按关键词搜索
    if (this.data.evaluationSearchKeyword) {
      const keyword = this.data.evaluationSearchKeyword.toLowerCase();
      filteredStandards = filteredStandards.filter(standard => 
        standard.title.toLowerCase().includes(keyword) ||
        standard.description.toLowerCase().includes(keyword) ||
        standard.subject.toLowerCase().includes(keyword)
      );
    }

    // 按学科筛选
    if (this.data.selectedEvaluationSubject && this.data.selectedEvaluationSubject !== '全部') {
      filteredStandards = filteredStandards.filter(standard => 
        standard.subject === this.data.selectedEvaluationSubject
      );
    }

    // 按类型筛选
    if (this.data.selectedEvaluationType && this.data.selectedEvaluationType !== '全部') {
      filteredStandards = filteredStandards.filter(standard => 
        standard.type === this.data.selectedEvaluationType
      );
    }

    this.setData({ evaluationStandards: filteredStandards });
  },

  // 添加学分互认或评价标准
  addRecognition: function () {
    this.setData({
      showAddModal: true,
      addModalType: this.data.activeTab,
      addForm: {
        courseName: '',
        title: '',
        subject: '',
        level: '',
        type: '',
        guangdongCredit: '',
        hongkongCredit: '',
        description: '',
        guangdongStandard: '',
        hongkongStandard: '',
        mappingRelation: ''
      }
    });
  },

  // 隐藏添加弹窗
  hideAddModal: function () {
    this.setData({ showAddModal: false });
  },

  // 添加表单输入
  onAddInput: function (e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`addForm.${field}`]: value
    });
  },

  // 选择学分互认学科
  selectCreditSubject: function () {
    wx.showActionSheet({
      itemList: ['数学', '英语', '语文', '科学', '其他'],
      success: (res) => {
        const subjects = ['数学', '英语', '语文', '科学', '其他'];
        this.setData({
          'addForm.subject': subjects[res.tapIndex]
        });
      }
    });
  },

  // 选择学分互认级别
  selectCreditLevel: function () {
    wx.showActionSheet({
      itemList: ['初级', '中级', '高级'],
      success: (res) => {
        const levels = ['初级', '中级', '高级'];
        this.setData({
          'addForm.level': levels[res.tapIndex]
        });
      }
    });
  },

  // 选择评价标准学科
  selectEvaluationSubject: function () {
    wx.showActionSheet({
      itemList: ['数学', '英语', '语文', '综合', '其他'],
      success: (res) => {
        const subjects = ['数学', '英语', '语文', '综合', '其他'];
        this.setData({
          'addForm.subject': subjects[res.tapIndex]
        });
      }
    });
  },

  // 选择评价标准类型
  selectEvaluationType: function () {
    wx.showActionSheet({
      itemList: ['课程评价', '综合素质', '其他'],
      success: (res) => {
        const types = ['课程评价', '综合素质', '其他'];
        this.setData({
          'addForm.type': types[res.tapIndex]
        });
      }
    });
  },

  // 提交添加表单
  submitAddForm: function () {
    if (this.data.addModalType === 'credit') {
      // 添加学分互认
      const form = this.data.addForm;
      if (!form.courseName || !form.subject || !form.level || !form.guangdongCredit || !form.hongkongCredit) {
        wx.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }

      const newCourse = {
        id: `CR${Date.now()}`,
        courseName: form.courseName,
        subject: form.subject,
        level: form.level,
        status: '认证中',
        statusColor: '#FF9800',
        guangdongCredit: parseFloat(form.guangdongCredit),
        hongkongCredit: parseFloat(form.hongkongCredit),
        description: form.description || '新添加的学分互认课程',
        requirements: {
          guangdong: '完成所有课程单元和期末考试',
          hongkong: '完成所有课程单元和期末考试'
        }
      };

      const creditCourses = [newCourse, ...this.data.creditCourses];
      this.setData({
        creditCourses: creditCourses,
        originalCreditCourses: creditCourses,
        showAddModal: false
      });

      wx.showToast({ title: '添加成功', icon: 'success' });
    } else {
      // 添加评价标准
      const form = this.data.addForm;
      if (!form.title || !form.subject || !form.type || !form.guangdongStandard || !form.hongkongStandard) {
        wx.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }

      const newStandard = {
        id: `ES${Date.now()}`,
        title: form.title,
        subject: form.subject,
        type: form.type,
        guangdongStandard: form.guangdongStandard,
        hongkongStandard: form.hongkongStandard,
        mappingRelation: form.mappingRelation || '待建立对应关系'
      };

      const evaluationStandards = [newStandard, ...this.data.evaluationStandards];
      this.setData({
        evaluationStandards: evaluationStandards,
        originalEvaluationStandards: evaluationStandards,
        showAddModal: false
      });

      wx.showToast({ title: '添加成功', icon: 'success' });
    }
  },

  // 查看学分互认详情
  viewCreditDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    const course = this.data.creditCourses.find(c => c.id === id);
    if (course) {
      wx.showModal({
        title: course.courseName,
        content: `学科：${course.subject}\n级别：${course.level}\n状态：${course.status}\n广东学分：${course.guangdongCredit}\n香港学分：${course.hongkongCredit}\n\n课程描述：${course.description}\n\n广东要求：${course.requirements.guangdong}\n香港要求：${course.requirements.hongkong}`,
        confirmText: '确定',
        cancelText: '关闭'
      });
    }
  },

  // 编辑学分互认
  editCredit: function (e) {
    const id = e.currentTarget.dataset.id;
    const course = this.data.creditCourses.find(c => c.id === id);
    if (course) {
      wx.showToast({ title: '编辑功能开发中', icon: 'info' });
    }
  },

  // 查看评价标准详情
  viewEvaluationDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    const standard = this.data.evaluationStandards.find(s => s.id === id);
    if (standard) {
      wx.showModal({
        title: standard.title,
        content: `学科：${standard.subject}\n类型：${standard.type}\n\n广东标准：${standard.guangdongStandard}\n\n香港标准：${standard.hongkongStandard}\n\n对应关系：${standard.mappingRelation}`,
        confirmText: '确定',
        cancelText: '关闭'
      });
    }
  },

  // 编辑评价标准
  editEvaluation: function (e) {
    const id = e.currentTarget.dataset.id;
    const standard = this.data.evaluationStandards.find(s => s.id === id);
    if (standard) {
      wx.showToast({ title: '编辑功能开发中', icon: 'info' });
    }
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});