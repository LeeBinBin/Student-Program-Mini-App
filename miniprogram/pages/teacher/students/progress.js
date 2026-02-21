Page({
  data: {
    studentId: '',
    student: {},
    progressData: [],
    showModal: false,
    modalTitle: '添加学习进度',
    editingId: null,
    progressForm: {
      subject: '',
      completion: 0,
      masteryLevel: 'good',
      masteryText: '良好',
      date: '',
      remark: ''
    },
    subjectOptions: ['数学', '语文', '英语', '科学', '物理', '化学', '生物'],
    masteryOptions: {
      'excellent': '优秀',
      'good': '良好',
      'average': '一般'
    },
    stats: {
      totalSubjects: 0,
      totalRecords: 0,
      avgCompletion: 0,
      masteryCount: 0
    }
  },

  onLoad: function (options) {
    const studentId = options.id;
    this.setData({ studentId });
    this.loadStudentData(studentId);
    this.loadProgressData(studentId);
  },

  loadStudentData: function (studentId) {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];

    if (prevPage) {
      let student = null;

      if (prevPage.data.students) {
        const students = prevPage.data.students;
        student = students.find(s => s.id === studentId);
      } else if (prevPage.data.student && prevPage.data.student.id === studentId) {
        student = prevPage.data.student;
      }

      if (student) {
        this.setData({
          student: student
        });
      } else {
        wx.showToast({
          title: '学生信息不存在',
          icon: 'none'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    } else {
      wx.showToast({
        title: '无法获取学生信息',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  loadProgressData: function (studentId) {
    const progressKey = `progress_${studentId}`;
    let savedProgress = wx.getStorageSync(progressKey);

    if (!savedProgress || savedProgress.length === 0) {
      savedProgress = this.generateMockProgressData(studentId);
      wx.setStorageSync(progressKey, savedProgress);
    }

    const progressData = savedProgress.map(item => ({
      ...item,
      masteryText: this.data.masteryOptions[item.masteryLevel] || '良好'
    }));

    this.setData({
      progressData
    });

    this.calculateStats();
  },

  generateMockProgressData: function (studentId) {
    const mockData = {
      'S001': [
        { id: 'P001', subject: '数学', completion: 85, masteryLevel: 'good', date: '2026-02-15', remark: '基础知识点掌握较好' },
        { id: 'P002', subject: '英语', completion: 78, masteryLevel: 'average', date: '2026-02-16', remark: '词汇量需要加强' },
        { id: 'P003', subject: '语文', completion: 92, masteryLevel: 'excellent', date: '2026-02-17', remark: '阅读理解能力强' }
      ],
      'S002': [
        { id: 'P004', subject: '数学', completion: 90, masteryLevel: 'excellent', date: '2026-02-14', remark: '计算能力突出' },
        { id: 'P005', subject: '英语', completion: 88, masteryLevel: 'good', date: '2026-02-15', remark: '听说能力均衡' },
        { id: 'P006', subject: '科学', completion: 75, masteryLevel: 'average', date: '2026-02-16', remark: '实验操作需要练习' }
      ],
      'S003': [
        { id: 'P007', subject: '数学', completion: 70, masteryLevel: 'average', date: '2026-02-13', remark: '需要加强练习' },
        { id: 'P008', subject: '语文', completion: 85, masteryLevel: 'good', date: '2026-02-14', remark: '作文水平稳定' },
        { id: 'P009', subject: '英语', completion: 80, masteryLevel: 'good', date: '2026-02-15', remark: '口语表达流畅' }
      ],
      'S004': [
        { id: 'P010', subject: '数学', completion: 95, masteryLevel: 'excellent', date: '2026-02-12', remark: '逻辑思维强' },
        { id: 'P011', subject: '科学', completion: 88, masteryLevel: 'good', date: '2026-02-13', remark: '科学兴趣浓厚' },
        { id: 'P012', subject: '英语', completion: 82, masteryLevel: 'good', date: '2026-02-14', remark: '阅读能力良好' }
      ],
      'S005': [
        { id: 'P013', subject: '数学', completion: 88, masteryLevel: 'good', date: '2026-02-11', remark: '解题思路清晰' },
        { id: 'P014', subject: '英语', completion: 90, masteryLevel: 'excellent', date: '2026-02-12', remark: '发音标准' },
        { id: 'P015', subject: '语文', completion: 78, masteryLevel: 'average', date: '2026-02-13', remark: '古诗文需要加强' }
      ],
      'S006': [
        { id: 'P016', subject: '数学', completion: 75, masteryLevel: 'average', date: '2026-02-10', remark: '计算速度需提升' },
        { id: 'P017', subject: '语文', completion: 92, masteryLevel: 'excellent', date: '2026-02-11', remark: '写作能力强' },
        { id: 'P018', subject: '英语', completion: 85, masteryLevel: 'good', date: '2026-02-12', remark: '语法掌握扎实' }
      ],
      'S007': [
        { id: 'P019', subject: '数学', completion: 80, masteryLevel: 'good', date: '2026-02-09', remark: '基础扎实' },
        { id: 'P020', subject: '英语', completion: 78, masteryLevel: 'average', date: '2026-02-10', remark: '听力需加强' },
        { id: 'P021', subject: '科学', completion: 88, masteryLevel: 'good', date: '2026-02-11', remark: '实验动手能力强' }
      ],
      'S008': [
        { id: 'P022', subject: '数学', completion: 93, masteryLevel: 'excellent', date: '2026-02-08', remark: '解题准确率高' },
        { id: 'P023', subject: '语文', completion: 85, masteryLevel: 'good', date: '2026-02-09', remark: '阅读理解好' },
        { id: 'P024', subject: '科学', completion: 82, masteryLevel: 'good', date: '2026-02-10', remark: '科学思维活跃' }
      ],
      'S009': [
        { id: 'P025', subject: '数学', completion: 88, masteryLevel: 'good', date: '2026-02-07', remark: '应用题能力强' },
        { id: 'P026', subject: '英语', completion: 92, masteryLevel: 'excellent', date: '2026-02-08', remark: '词汇量丰富' },
        { id: 'P027', subject: '物理', completion: 78, masteryLevel: 'average', date: '2026-02-09', remark: '概念理解需加强' }
      ],
      'S010': [
        { id: 'P028', subject: '数学', completion: 85, masteryLevel: 'good', date: '2026-02-06', remark: '计算速度快' },
        { id: 'P029', subject: '英语', completion: 88, masteryLevel: 'good', date: '2026-02-07', remark: '口语表达好' },
        { id: 'P030', subject: '化学', completion: 80, masteryLevel: 'good', date: '2026-02-08', remark: '实验操作规范' }
      ],
      'S011': [
        { id: 'P031', subject: '数学', completion: 90, masteryLevel: 'excellent', date: '2026-02-05', remark: '逻辑推理强' },
        { id: 'P032', subject: '英语', completion: 85, masteryLevel: 'good', date: '2026-02-06', remark: '阅读能力强' },
        { id: 'P033', subject: '生物', completion: 88, masteryLevel: 'good', date: '2026-02-07', remark: '生物兴趣浓厚' }
      ],
      'S012': [
        { id: 'P034', subject: '数学', completion: 82, masteryLevel: 'good', date: '2026-02-04', remark: '解题思路清晰' },
        { id: 'P035', subject: '语文', completion: 90, masteryLevel: 'excellent', date: '2026-02-05', remark: '作文水平高' },
        { id: 'P036', subject: '英语', completion: 78, masteryLevel: 'average', date: '2026-02-06', remark: '语法需加强' }
      ],
      'S013': [
        { id: 'P037', subject: '数学', completion: 88, masteryLevel: 'good', date: '2026-02-03', remark: '基础扎实' },
        { id: 'P038', subject: '英语', completion: 92, masteryLevel: 'excellent', date: '2026-02-04', remark: '发音标准' },
        { id: 'P039', subject: '物理', completion: 75, masteryLevel: 'average', date: '2026-02-05', remark: '实验需多练习' }
      ],
      'S014': [
        { id: 'P040', subject: '数学', completion: 95, masteryLevel: 'excellent', date: '2026-02-02', remark: '计算能力强' },
        { id: 'P041', subject: '英语', completion: 85, masteryLevel: 'good', date: '2026-02-03', remark: '阅读理解好' },
        { id: 'P042', subject: '化学', completion: 88, masteryLevel: 'good', date: '2026-02-04', remark: '化学兴趣高' }
      ],
      'S015': [
        { id: 'P043', subject: '数学', completion: 82, masteryLevel: 'good', date: '2026-02-01', remark: '解题方法好' },
        { id: 'P044', subject: '英语', completion: 90, masteryLevel: 'excellent', date: '2026-02-02', remark: '词汇量丰富' },
        { id: 'P045', subject: '语文', completion: 85, masteryLevel: 'good', date: '2026-02-03', remark: '古诗文掌握好' }
      ]
    };

    return mockData[studentId] || [];
  },

  calculateStats: function () {
    const progressData = this.data.progressData;
    
    if (progressData.length === 0) {
      this.setData({
        stats: {
          totalSubjects: 0,
          totalRecords: 0,
          avgCompletion: 0,
          masteryCount: 0
        }
      });
      return;
    }

    const uniqueSubjects = [...new Set(progressData.map(item => item.subject))];
    const totalCompletion = progressData.reduce((sum, item) => sum + item.completion, 0);
    const masteryCount = progressData.filter(item => item.masteryLevel === 'excellent' || item.masteryLevel === 'good').length;

    this.setData({
      stats: {
        totalSubjects: uniqueSubjects.length,
        totalRecords: progressData.length,
        avgCompletion: Math.round(totalCompletion / progressData.length),
        masteryCount: masteryCount
      }
    });
  },

  navigateBack: function () {
    wx.navigateBack();
  },

  showAddProgressModal: function () {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    this.setData({
      showModal: true,
      modalTitle: '添加学习进度',
      editingId: null,
      progressForm: {
        subject: '',
        completion: 0,
        masteryLevel: 'good',
        masteryText: '良好',
        date: dateStr,
        remark: ''
      }
    });
  },

  editProgress: function (e) {
    const id = e.currentTarget.dataset.id;
    const progressItem = this.data.progressData.find(item => item.id === id);

    if (progressItem) {
      this.setData({
        showModal: true,
        modalTitle: '编辑学习进度',
        editingId: id,
        progressForm: {
          subject: progressItem.subject,
          completion: progressItem.completion,
          masteryLevel: progressItem.masteryLevel,
          masteryText: progressItem.masteryText,
          date: progressItem.date,
          remark: progressItem.remark || ''
        }
      });
    }
  },

  deleteProgress: function (e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条学习进度记录吗？',
      success: (res) => {
        if (res.confirm) {
          const progressData = this.data.progressData.filter(item => item.id !== id);
          
          this.setData({
            progressData
          });

          this.saveProgressData();
          this.calculateStats();

          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  catchTap: function () {
  },

  onSubjectChange: function (e) {
    const index = e.detail.value;
    this.setData({
      'progressForm.subject': this.data.subjectOptions[index]
    });
  },

  onCompletionChange: function (e) {
    this.setData({
      'progressForm.completion': e.detail.value
    });
  },

  onMasteryChange: function (e) {
    const level = e.currentTarget.dataset.level;
    this.setData({
      'progressForm.masteryLevel': level,
      'progressForm.masteryText': this.data.masteryOptions[level]
    });
  },

  onDateChange: function (e) {
    this.setData({
      'progressForm.date': e.detail.value
    });
  },

  onRemarkChange: function (e) {
    this.setData({
      'progressForm.remark': e.detail.value
    });
  },

  validateForm: function () {
    const form = this.data.progressForm;

    if (!form.subject) {
      wx.showToast({
        title: '请选择科目',
        icon: 'none'
      });
      return false;
    }

    if (!form.date) {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

  submitProgress: function () {
    if (!this.validateForm()) {
      return;
    }

    const form = this.data.progressForm;
    const progressItem = {
      id: this.data.editingId || Date.now().toString(),
      subject: form.subject,
      completion: form.completion,
      masteryLevel: form.masteryLevel,
      masteryText: form.masteryText,
      date: form.date,
      remark: form.remark
    };

    let progressData = [...this.data.progressData];

    if (this.data.editingId) {
      const index = progressData.findIndex(item => item.id === this.data.editingId);
      if (index !== -1) {
        progressData[index] = progressItem;
      }
    } else {
      progressData.unshift(progressItem);
    }

    progressData.sort((a, b) => new Date(b.date) - new Date(a.date));

    this.setData({
      progressData
    });

    this.saveProgressData();
    this.calculateStats();
    this.hideModal();

    wx.showToast({
      title: this.data.editingId ? '更新成功' : '添加成功',
      icon: 'success'
    });
  },

  saveProgressData: function () {
    const progressKey = `progress_${this.data.studentId}`;
    wx.setStorageSync(progressKey, this.data.progressData);
  }
});
