// detail.js
Page({
  data: {
    course: {
      id: '',
      name: '',
      subject: '',
      grade: '',
      type: '',
      status: '',
      description: '',
      startDate: '',
      endDate: '',
      studentCount: 0,
      materialsCount: 0,
      crossBorderInfo: null
    }
  },

  onLoad: function (options) {
    const courseId = options.id;
    this.loadCourseDetail(courseId);
  },

  // 加载课程详情
  loadCourseDetail: function (courseId) {
    // 模拟从课程列表中获取课程详情
    const courseList = [
      {
        id: 'C001',
        name: '粤港数学三年级跨境适配课程',
        subject: '数学',
        grade: '3',
        type: '跨境适配',
        status: 'active',
        description: '针对粤港两地数学课程标准差异，设计的跨境学生适配课程，涵盖两地核心知识点',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 28,
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
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 35,
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
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 32,
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
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 25,
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
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 20,
        materialsCount: 10,
        crossBorderInfo: null
      },
      {
        id: 'C006',
        name: '物理基础概念与实验',
        subject: '物理',
        grade: '6',
        type: '常规课程',
        status: 'active',
        description: '物理基础概念讲解与实验操作指导，培养学生科学探究能力',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 18,
        materialsCount: 25,
        crossBorderInfo: null
      },
      {
        id: 'C007',
        name: '化学元素周期表与化学反应',
        subject: '化学',
        grade: '5',
        type: '拓展课程',
        status: 'active',
        description: '元素周期表学习与基础化学反应实验，激发学生化学学习兴趣',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 15,
        materialsCount: 30,
        crossBorderInfo: null
      },
      {
        id: 'C008',
        name: '历史文化与社会发展',
        subject: '历史',
        grade: '4',
        type: '常规课程',
        status: 'active',
        description: '中国历史与世界历史文化学习，培养学生历史思维能力',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 22,
        materialsCount: 16,
        crossBorderInfo: null
      },
      {
        id: 'C009',
        name: '地理环境与可持续发展',
        subject: '地理',
        grade: '5',
        type: '常规课程',
        status: 'active',
        description: '地理环境认知与可持续发展教育，培养学生环保意识',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 20,
        materialsCount: 14,
        crossBorderInfo: null
      },
      {
        id: 'C010',
        name: '音乐欣赏与基础乐理',
        subject: '音乐',
        grade: '3',
        type: '拓展课程',
        status: 'active',
        description: '音乐欣赏与基础乐理知识学习，培养学生音乐素养',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 12,
        materialsCount: 18,
        crossBorderInfo: null
      },
      {
        id: 'C011',
        name: '美术基础与创意表达',
        subject: '美术',
        grade: '4',
        type: '拓展课程',
        status: 'active',
        description: '美术基础技法学习与创意表达训练，培养学生艺术创造力',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 14,
        materialsCount: 22,
        crossBorderInfo: null
      },
      {
        id: 'C012',
        name: '体育健康与运动技能',
        subject: '体育',
        grade: '3',
        type: '常规课程',
        status: 'active',
        description: '体育健康知识与基础运动技能训练，促进学生身心健康',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 25,
        materialsCount: 10,
        crossBorderInfo: null
      },
      {
        id: 'C013',
        name: '信息技术基础与应用',
        subject: '信息技术',
        grade: '5',
        type: '常规课程',
        status: 'active',
        description: '计算机基础操作与信息素养培养，提升学生数字化学习能力',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 22,
        materialsCount: 20,
        crossBorderInfo: null
      },
      {
        id: 'C014',
        name: '道德与法治',
        subject: '道德与法治',
        grade: '4',
        type: '常规课程',
        status: 'active',
        description: '培养学生道德品质与法治意识，促进正确价值观形成',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 30,
        materialsCount: 15,
        crossBorderInfo: null
      },
      {
        id: 'C015',
        name: '综合实践活动',
        subject: '综合实践',
        grade: '6',
        type: '拓展课程',
        status: 'active',
        description: '跨学科实践活动，培养学生创新思维与解决问题能力',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 18,
        materialsCount: 12,
        crossBorderInfo: null
      },
      {
        id: 'C016',
        name: '粤港英语五年级词汇对标',
        subject: '英语',
        grade: '5',
        type: '跨境适配',
        status: 'active',
        description: '粤港两地英语词汇标准对标，帮助跨境学生适应不同英语教学要求',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 28,
        materialsCount: 25,
        crossBorderInfo: {
          guangdongStandards: ['词汇运用', '阅读理解', '口语表达'],
          hongkongStandards: ['Vocabulary', 'Reading Comprehension', 'Oral Communication'],
          adaptationLevel: '高'
        }
      },
      {
        id: 'C017',
        name: '粤港中文写作技巧对比',
        subject: '语文',
        grade: '6',
        type: '跨境适配',
        status: 'active',
        description: '粤港两地中文写作教学方法对比，提升学生写作能力',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 25,
        materialsCount: 22,
        crossBorderInfo: {
          guangdongStandards: ['记叙文写作', '议论文写作', '应用文写作'],
          hongkongStandards: ['Narrative Writing', 'Argumentative Writing', 'Practical Writing'],
          adaptationLevel: '中'
        }
      },
      {
        id: 'C018',
        name: 'STEM跨学科融合课程',
        subject: 'STEM',
        grade: '5',
        type: '拓展课程',
        status: 'active',
        description: '科学、技术、工程、数学跨学科融合课程，培养学生综合应用能力',
        startDate: '2026-02-01',
        endDate: '2026-10-31',
        studentCount: 15,
        materialsCount: 30,
        crossBorderInfo: null
      }
    ];

    const course = courseList.find(c => c.id === courseId) || {
      id: courseId,
      name: '未知课程',
      subject: '未知',
      grade: '0',
      type: '常规课程',
      status: 'inactive',
      description: '课程信息加载失败',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      studentCount: 0,
      materialsCount: 0,
      crossBorderInfo: null
    };

    // 为课程对象添加适配难度颜色属性
    if (course.crossBorderInfo && course.crossBorderInfo.adaptationLevel) {
      const colorMap = {
        '高': '#10B981',
        '中': '#F59E0B',
        '低': '#EF4444'
      };
      course.adaptationColor = colorMap[course.crossBorderInfo.adaptationLevel] || '#6B7280';
    }
    
    this.setData({ course });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 编辑课程
  editCourse: function () {
    wx.showModal({
      title: '编辑课程',
      content: '请选择编辑内容',
      cancelText: '基本信息',
      confirmText: '跨境适配信息',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '跨境适配信息编辑功能开发中',
            icon: 'info'
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '基本信息编辑功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 管理学生
  manageStudents: function () {
    wx.showModal({
      title: '学生管理',
      content: `当前课程共有 ${this.data.course.studentCount} 名学生`,
      confirmText: '查看学生列表',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '学生列表功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 管理课程资料
  manageMaterials: function () {
    wx.showModal({
      title: '课程资料',
      content: `当前课程共有 ${this.data.course.materialsCount} 份资料`,
      confirmText: '查看资料列表',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '资料管理功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 管理课程作业
  manageAssignments: function () {
    wx.showToast({
      title: '作业管理功能开发中',
      icon: 'info'
    });
  },

  // 查看学习统计
  viewStatistics: function () {
    wx.showToast({
      title: '学习统计功能开发中',
      icon: 'info'
    });
  },

  // 开始课程
  startCourse: function () {
    wx.showModal({
      title: '开始课程',
      content: '确定要开始此课程吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            'course.status': 'active'
          });
          wx.showToast({
            title: '课程已开始',
            icon: 'success'
          });
        }
      }
    });
  },

  // 结束课程
  endCourse: function () {
    wx.showModal({
      title: '结束课程',
      content: '确定要结束此课程吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            'course.status': 'inactive'
          });
          wx.showToast({
            title: '课程已结束',
            icon: 'success'
          });
        }
      }
    });
  },

  // 删除课程
  deleteCourse: function () {
    wx.showModal({
      title: '删除课程',
      content: '确定要删除此课程吗？删除后不可恢复。',
      confirmText: '删除',
      cancelText: '取消',
      confirmColor: '#FF4D4F',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '课程删除成功',
            icon: 'success'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1000);
        }
      }
    });
  },

  // 获取适配难度对应的颜色
  getAdaptationColor: function (level) {
    const colorMap = {
      '高': '#10B981',
      '中': '#F59E0B',
      '低': '#EF4444'
    };
    return colorMap[level] || '#6B7280';
  }
});
