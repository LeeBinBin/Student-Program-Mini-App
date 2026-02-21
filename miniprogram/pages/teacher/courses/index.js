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
        startDate: '2026-02-01',
        endDate: '2026-10-31',
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
    ],
    searchKeyword: '',
    selectedSubject: '',
    selectedGrade: '',
    selectedType: '',
    showSubjectFilter: false,
    showGradeFilter: false,
    showTypeFilter: false,
    originalCourses: [],
    showAddModal: false,
    showEditModal: false,
    editForm: {
      id: '',
      name: '',
      subject: '',
      grade: '',
      type: '',
      description: '',
      startDate: '',
      endDate: '',
      studentCount: 0,
      materialsCount: 0
    },
    addForm: {
      name: '',
      subject: '',
      grade: '',
      type: '',
      description: '',
      startDate: '',
      endDate: ''
    },
    searchTimeout: null
  },

  onLoad: function () {
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
    wx.showActionSheet({
      itemList: ['常规课程', '跨境适配课程', '拓展课程'],
      itemColor: '#3B82F6',
      success: (res) => {
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:
              this.createRegularCourse();
              break;
            case 1:
              this.createCrossBorderCourse();
              break;
            case 2:
              this.createExtensionCourse();
              break;
          }
        }
      },
      fail: (res) => {
        console.log(res.errMsg);
      }
    });
  },

  // 创建常规课程
  createRegularCourse: function () {
    const newCourse = {
      id: 'C' + (this.data.courses.length + 1).toString().padStart(3, '0'),
      name: '新建常规课程',
      subject: '数学',
      grade: '3',
      type: '常规课程',
      status: 'inactive',
      description: '新创建的常规课程',
      startDate: '2026-02-01',
      endDate: '2026-10-31',
      studentCount: 0,
      materialsCount: 0,
      crossBorderInfo: null
    };

    this.data.courses.unshift(newCourse);
    this.data.originalCourses.unshift(newCourse);
    this.setData({ courses: this.data.courses });

    wx.showToast({
      title: '常规课程创建成功',
      icon: 'success'
    });
  },

  // 创建跨境适配课程
  createCrossBorderCourse: function () {
    const newCourse = {
      id: 'C' + (this.data.courses.length + 1).toString().padStart(3, '0'),
      name: '新建跨境适配课程',
      subject: '数学',
      grade: '3',
      type: '跨境适配',
      status: 'inactive',
      description: '新创建的跨境适配课程',
      startDate: '2026-02-01',
      endDate: '2026-10-31',
      studentCount: 0,
      materialsCount: 0,
      crossBorderInfo: {
        guangdongStandards: ['数与代数', '图形与几何'],
        hongkongStandards: ['Number', 'Shape and Space'],
        adaptationLevel: '中'
      }
    };

    this.data.courses.unshift(newCourse);
    this.data.originalCourses.unshift(newCourse);
    this.setData({ courses: this.data.courses });

    wx.showToast({
      title: '跨境适配课程创建成功',
      icon: 'success'
    });
  },

  // 创建拓展课程
  createExtensionCourse: function () {
    const newCourse = {
      id: 'C' + (this.data.courses.length + 1).toString().padStart(3, '0'),
      name: '新建拓展课程',
      subject: '数学',
      grade: '3',
      type: '拓展课程',
      status: 'inactive',
      description: '新创建的拓展课程',
      startDate: '2026-02-01',
      endDate: '2026-10-31',
      studentCount: 0,
      materialsCount: 0,
      crossBorderInfo: null
    };

    this.data.courses.unshift(newCourse);
    this.data.originalCourses.unshift(newCourse);
    this.setData({ courses: this.data.courses });

    wx.showToast({
      title: '拓展课程创建成功',
      icon: 'success'
    });
  },

  // 搜索课程（带防抖）
  onSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });

    // 清除之前的定时器
    if (this.data.searchTimeout) {
      clearTimeout(this.data.searchTimeout);
    }

    // 设置新的定时器，实现防抖
    this.data.searchTimeout = setTimeout(() => {
      this.filterCourses();
      this.setData({ searchTimeout: null });
    }, 300);
  },

  // 显示学科筛选弹窗
  showFilter: function () {
    this.setData({ showSubjectFilter: true });
  },

  // 隐藏学科筛选弹窗
  hideSubjectFilter: function () {
    this.setData({ showSubjectFilter: false });
  },

  // 显示年级筛选弹窗
  showGradeFilter: function () {
    this.setData({ showGradeFilter: true });
  },

  // 隐藏年级筛选弹窗
  hideGradeFilter: function () {
    this.setData({ showGradeFilter: false });
  },

  // 显示课程类型筛选弹窗
  showTypeFilter: function () {
    this.setData({ showTypeFilter: true });
  },

  // 隐藏课程类型筛选弹窗
  hideTypeFilter: function () {
    this.setData({ showTypeFilter: false });
  },

  // 选择学科
  selectSubject: function (e) {
    const subject = e.currentTarget.dataset.value;
    this.setData({ 
      selectedSubject: subject,
      showSubjectFilter: false 
    });
    this.filterCourses();
  },

  // 选择年级
  selectGrade: function (e) {
    const grade = e.currentTarget.dataset.value;
    this.setData({ 
      selectedGrade: grade,
      showGradeFilter: false 
    });
    this.filterCourses();
  },

  // 选择课程类型
  selectType: function (e) {
    const type = e.currentTarget.dataset.value;
    this.setData({ 
      selectedType: type,
      showTypeFilter: false 
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
        course.grade.includes(keyword) ||
        course.type.toLowerCase().includes(keyword) ||
        course.description.toLowerCase().includes(keyword)
      );
    }

    // 按学科筛选
    if (this.data.selectedSubject) {
      filteredCourses = filteredCourses.filter(course => 
        course.subject === this.data.selectedSubject
      );
    }

    // 按年级筛选
    if (this.data.selectedGrade) {
      filteredCourses = filteredCourses.filter(course => 
        course.grade === this.data.selectedGrade
      );
    }

    // 按课程类型筛选
    if (this.data.selectedType) {
      filteredCourses = filteredCourses.filter(course => 
        course.type === this.data.selectedType
      );
    }

    this.setData({ courses: filteredCourses });

    // 添加搜索结果提示
    if (this.data.searchKeyword || this.data.selectedSubject || this.data.selectedGrade || this.data.selectedType) {
      const count = filteredCourses.length;
      if (count === 0) {
        wx.showToast({
          title: '未找到匹配的课程',
          icon: 'none',
          duration: 1500
        });
      } else {
        wx.showToast({
          title: `找到 ${count} 个匹配课程`,
          icon: 'none',
          duration: 1500
        });
      }
    }
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
    const course = this.data.courses.find(c => c.id === courseId);
    
    if (course) {
      // 填充编辑表单
      this.setData({
        editForm: {
          id: course.id,
          name: course.name,
          subject: course.subject,
          grade: course.grade,
          type: course.type,
          description: course.description,
          startDate: course.startDate,
          endDate: course.endDate,
          studentCount: course.studentCount,
          materialsCount: course.materialsCount
        },
        showEditModal: true
      });
    }
  },

  // 保存编辑
  saveEdit: function () {
    const editedCourse = this.data.editForm;
    const courseIndex = this.data.courses.findIndex(c => c.id === editedCourse.id);
    const originalIndex = this.data.originalCourses.findIndex(c => c.id === editedCourse.id);
    
    if (courseIndex !== -1 && originalIndex !== -1) {
      // 更新课程列表
      const updatedCourses = [...this.data.courses];
      updatedCourses[courseIndex] = {
        ...updatedCourses[courseIndex],
        name: editedCourse.name,
        subject: editedCourse.subject,
        grade: editedCourse.grade,
        type: editedCourse.type,
        description: editedCourse.description,
        startDate: editedCourse.startDate,
        endDate: editedCourse.endDate,
        studentCount: editedCourse.studentCount,
        materialsCount: editedCourse.materialsCount
      };
      
      // 更新原始课程列表
      const updatedOriginalCourses = [...this.data.originalCourses];
      updatedOriginalCourses[originalIndex] = {
        ...updatedOriginalCourses[originalIndex],
        name: editedCourse.name,
        subject: editedCourse.subject,
        grade: editedCourse.grade,
        type: editedCourse.type,
        description: editedCourse.description,
        startDate: editedCourse.startDate,
        endDate: editedCourse.endDate,
        studentCount: editedCourse.studentCount,
        materialsCount: editedCourse.materialsCount
      };
      
      this.setData({
        courses: updatedCourses,
        originalCourses: updatedOriginalCourses,
        showEditModal: false
      });
      
      wx.showToast({
        title: '课程编辑成功',
        icon: 'success'
      });
    }
  },

  // 取消编辑
  cancelEdit: function () {
    this.setData({ showEditModal: false });
  },

  // 处理编辑表单输入变化
  onEditFormChange: function (e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    this.setData({
      [`editForm.${field}`]: value
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
  }
});
