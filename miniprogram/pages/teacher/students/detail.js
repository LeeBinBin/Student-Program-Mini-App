Page({
  data: {
    studentId: '',
    student: {},
    learningRecords: [],
    suggestions: []
  },

  onLoad: function (options) {
    const studentId = options.id;
    this.setData({ studentId });
    this.loadStudentDetail(studentId);
  },

  loadStudentDetail: function (studentId) {
    const students = [
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
    ];

    const student = students.find(s => s.id === studentId);

    if (student) {
      // 确保student对象有subjects字段，并且是一个数组
      if (!student.subjects || !Array.isArray(student.subjects)) {
        student.subjects = [];
      }
      this.setData({ student });
      this.loadLearningRecords(studentId);
      this.loadSuggestions(student);
    } else {
      wx.showToast({
        title: '学生信息不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  loadLearningRecords: function (studentId) {
    const records = [
      {
        id: 'R001',
        icon: '📝',
        title: '数学知识点测试',
        time: '2026-02-18 14:30',
        score: 85
      },
      {
        id: 'R002',
        icon: '📚',
        title: '英语词汇量测试',
        time: '2026-02-17 10:15',
        score: 92
      },
      {
        id: 'R003',
        icon: '✍️',
        title: '语文作文练习',
        time: '2026-02-16 16:45',
        score: 88
      },
      {
        id: 'R004',
        icon: '🔍',
        title: '知识点对标查询',
        time: '2026-02-15 09:20',
        score: null
      },
      {
        id: 'R005',
        icon: '📖',
        title: '辅导资料下载',
        time: '2026-02-14 11:30',
        score: null
      }
    ];

    this.setData({ learningRecords: records });
  },

  loadSuggestions: function (student) {
    let suggestions = [];

    if (student.type === 'cross-border') {
      if (student.crossBorderInfo.adaptationLevel === '优秀') {
        suggestions = [
          '继续保持优秀的学习状态，可以尝试更高难度的学习内容',
          '鼓励学生参与跨境学习交流活动，拓展视野',
          '建议定期与内地学校老师沟通，了解学习进展'
        ];
      } else if (student.crossBorderInfo.adaptationLevel === '良好') {
        suggestions = [
          '加强粤港教材差异点的学习，重点关注知识点对标',
          '建议增加三语辅导资料的学习时间',
          '定期进行学业诊断，及时发现薄弱环节'
        ];
      } else if (student.crossBorderInfo.adaptationLevel === '一般') {
        suggestions = [
          '重点关注粤港教材差异，加强知识点对标学习',
          '建议制定个性化学习计划，逐步提高适应能力',
          '增加与内地学校学生的交流，了解学习差异',
          '定期进行辅导和跟进，确保学习进度'
        ];
      }

      if (student.crossBorderInfo.needsAttention) {
        suggestions.push('需要重点关注学生的学习状态，及时提供帮助');
      }
    } else {
      suggestions = [
        '继续保持良好的学习状态',
        '鼓励学生参与多样化的学习活动',
        '定期与家长沟通，了解学生在家学习情况'
      ];
    }

    this.setData({ suggestions });
  },

  navigateBack: function () {
    wx.navigateBack();
  },

  editStudent: function () {
    const studentId = this.data.studentId;
    wx.navigateTo({
      url: `/pages/teacher/students/edit?id=${studentId}`
    });
  },

  deleteStudent: function () {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该学生信息吗？此操作不可恢复。',
      confirmText: '删除',
      confirmColor: '#EF4444',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      }
    });
  },

  contactStudent: function () {
    const phone = this.data.student.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    });
  },

  viewProgress: function () {
    const studentId = this.data.studentId;
    wx.navigateTo({
      url: `/pages/teacher/students/progress?id=${studentId}`
    });
  }
});