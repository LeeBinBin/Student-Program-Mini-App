// index.js
Page({
  data: {
    // 培训课程数据
    courses: [
      {
        id: 'C001',
        title: '粤港跨境教育教学策略与方法',
        description: '深入探讨粤港两地教育体系差异，学习如何设计适合跨境学生的教学策略和方法，提升跨境教育教学质量。',
        category: '教学策略',
        level: '中级',
        crossBorder: true,
        tag: '推荐',
        tagColor: '#FF6B6B',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cross%20border%20education%20teaching%20strategy%20course%20thumbnail&image_size=landscape_16_9',
        instructor: '张教授',
        institution: '香港教育大学',
        duration: '8小时',
        students: 156,
        rating: 4.8,
        enrolled: true,
        lessons: [
          { id: 'L001', title: '粤港教育体系差异分析', duration: '1小时' },
          { id: 'L002', title: '跨境学生学习需求分析', duration: '1小时' },
          { id: 'L003', title: '跨境教学策略设计', duration: '2小时' },
          { id: 'L004', title: '教学方法实操演练', duration: '2小时' },
          { id: 'L005', title: '案例分析与讨论', duration: '2小时' }
        ]
      },
      {
        id: 'C002',
        title: '多语言教学能力提升',
        description: '提升中、英、粤三语教学能力，学习多语言教学技巧和策略，满足跨境学生的语言学习需求。',
        category: '语言教学',
        level: '初级',
        crossBorder: true,
        tag: '热门',
        tagColor: '#4ECDC4',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=multilingual%20teaching%20course%20thumbnail&image_size=landscape_16_9',
        instructor: '李老师',
        institution: '深圳外国语学校',
        duration: '6小时',
        students: 203,
        rating: 4.6,
        enrolled: false,
        lessons: [
          { id: 'L001', title: '多语言教学理论基础', duration: '1小时' },
          { id: 'L002', title: '中、英、粤三语教学技巧', duration: '2小时' },
          { id: 'L003', title: '语言转换与翻译策略', duration: '1小时' },
          { id: 'L004', title: '多语言教学资源开发', duration: '2小时' }
        ]
      },
      {
        id: 'C003',
        title: '跨境学生心理适应与辅导',
        description: '了解跨境学生的心理特点和适应挑战，学习如何进行有效的心理辅导和支持，帮助学生顺利适应跨境学习生活。',
        category: '学生辅导',
        level: '中级',
        crossBorder: true,
        tag: '新课',
        tagColor: '#45B7D1',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cross%20border%20student%20psychological%20counseling%20course&image_size=landscape_16_9',
        instructor: '王心理师',
        institution: '香港心理学会',
        duration: '5小时',
        students: 89,
        rating: 4.9,
        enrolled: false,
        lessons: [
          { id: 'L001', title: '跨境学生心理特点分析', duration: '1小时' },
          { id: 'L002', title: '适应挑战与应对策略', duration: '1小时' },
          { id: 'L003', title: '心理辅导方法与技巧', duration: '2小时' },
          { id: 'L004', title: '案例分析与实践', duration: '1小时' }
        ]
      },
      {
        id: 'C004',
        title: '粤港课程标准对标与整合',
        description: '深入分析粤港两地课程标准差异，学习如何进行课程内容对标和整合，设计符合两地要求的课程方案。',
        category: '课程设计',
        level: '高级',
        crossBorder: true,
        tag: '专业',
        tagColor: '#96CEB4',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=curriculum%20standard%20alignment%20course%20thumbnail&image_size=landscape_16_9',
        instructor: '陈博士',
        institution: '华南师范大学',
        duration: '10小时',
        students: 124,
        rating: 4.7,
        enrolled: true,
        lessons: [
          { id: 'L001', title: '粤港课程标准分析', duration: '2小时' },
          { id: 'L002', title: '知识点对标方法', duration: '2小时' },
          { id: 'L003', title: '课程内容整合策略', duration: '3小时' },
          { id: 'L004', title: '课程方案设计实践', duration: '3小时' }
        ]
      },
      {
        id: 'C005',
        title: '教学资源开发与管理',
        description: '学习如何开发和管理适合跨境教育的教学资源，包括教材、教案、课件等，提升教学资源的质量和利用效率。',
        category: '资源开发',
        level: '初级',
        crossBorder: false,
        tag: '实用',
        tagColor: '#FECA57',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=teaching%20resource%20development%20course%20thumbnail&image_size=landscape_16_9',
        instructor: '刘老师',
        institution: '深圳教育研究院',
        duration: '6小时',
        students: 187,
        rating: 4.5,
        enrolled: false,
        lessons: [
          { id: 'L001', title: '教学资源开发基础', duration: '1小时' },
          { id: 'L002', title: '教材设计与编写', duration: '2小时' },
          { id: 'L003', title: '多媒体课件制作', duration: '2小时' },
          { id: 'L004', title: '教学资源管理策略', duration: '1小时' }
        ]
      }
    ],
    
    // 我的课程
    myCourses: [
      {
        id: 'C001',
        title: '粤港跨境教育教学策略与方法',
        progress: 60
      },
      {
        id: 'C004',
        title: '粤港课程标准对标与整合',
        progress: 30
      }
    ],
    
    // 搜索和筛选
    searchKeyword: '',
    selectedCategory: '',
    selectedLevel: '',
    showFilterModal: false,
    filterType: '',
    filterTitle: '',
    filterOptions: [],
    selectedFilterValue: '',
    
    // 我的课程弹窗
    showMyCoursesModal: false
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
      case 'category':
        title = '课程分类';
        options = [
          { label: '全部', value: '' },
          { label: '教学策略', value: '教学策略' },
          { label: '语言教学', value: '语言教学' },
          { label: '学生辅导', value: '学生辅导' },
          { label: '课程设计', value: '课程设计' },
          { label: '资源开发', value: '资源开发' }
        ];
        break;
      case 'level':
        title = '课程级别';
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
        course.title.toLowerCase().includes(keyword) ||
        course.description.toLowerCase().includes(keyword) ||
        course.instructor.toLowerCase().includes(keyword) ||
        course.category.toLowerCase().includes(keyword)
      );
    }

    // 按分类筛选
    if (this.data.selectedCategory && this.data.selectedCategory !== '全部') {
      filteredCourses = filteredCourses.filter(course => 
        course.category === this.data.selectedCategory
      );
    }

    // 按级别筛选
    if (this.data.selectedLevel && this.data.selectedLevel !== '全部') {
      filteredCourses = filteredCourses.filter(course => 
        course.level === this.data.selectedLevel
      );
    }

    this.setData({ courses: filteredCourses });
  },

  // 报名课程
  enrollCourse: function (e) {
    const courseId = e.currentTarget.dataset.id;
    const courses = this.data.courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          enrolled: true
        };
      }
      return course;
    });

    this.setData({ courses: courses });

    // 更新我的课程
    const course = this.data.courses.find(c => c.id === courseId);
    if (course) {
      const myCourses = [...this.data.myCourses];
      if (!myCourses.find(c => c.id === courseId)) {
        myCourses.push({
          id: course.id,
          title: course.title,
          progress: 0
        });
        this.setData({ myCourses: myCourses });
      }
    }

    wx.showToast({
      title: '报名成功',
      icon: 'success'
    });
  },

  // 预览课程
  previewCourse: function (e) {
    const courseId = e.currentTarget.dataset.id;
    const course = this.data.courses.find(c => c.id === courseId);
    
    if (course) {
      wx.showModal({
        title: course.title,
        content: `课程简介：${course.description}\n\n讲师：${course.instructor}\n机构：${course.institution}\n时长：${course.duration}\n学习人数：${course.students}人\n评分：${course.rating}分`,
        confirmText: '查看课程详情',
        cancelText: '关闭',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '课程详情页面开发中',
              icon: 'info'
            });
          }
        }
      });
    }
  },

  // 查看我的课程
  myCourses: function () {
    this.setData({ showMyCoursesModal: true });
  },

  // 隐藏我的课程弹窗
  hideMyCoursesModal: function () {
    this.setData({ showMyCoursesModal: false });
  },

  // 继续学习
  continueCourse: function (e) {
    const courseId = e.currentTarget.dataset.id;
    const course = this.data.courses.find(c => c.id === courseId);
    
    if (course) {
      wx.showToast({
        title: `继续学习：${course.title}`,
        icon: 'info'
      });
    }
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});