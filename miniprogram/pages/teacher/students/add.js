Page({
  data: {
    formData: {
      name: '',
      id: '',
      phone: '',
      school: '',
      grade: '',
      type: 'local',
      subjects: [],
      subjectSelected: {
        'math': false,
        'chinese': false,
        'english': false,
        'science': false,
        'physics': false,
        'chemistry': false,
        'biology': false
      },
      status: 'active',
      crossBorderInfo: {
        mainlandSchool: '',
        adaptationLevel: '',
        needsAttention: false
      }
    },
    gradeOptions: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级'],
    gradeIndex: -1,
    adaptationOptions: ['优秀', '良好', '一般'],
    adaptationIndex: -1
  },

  onLoad: function () {
    this.generateStudentId();
  },

  generateStudentId: function () {
    const app = getApp();
    const counter = app.globalData.studentIdCounter + 1;
    const id = 'S' + String(counter).padStart(3, '0');
    
    app.globalData.studentIdCounter = counter;
    
    this.setData({
      'formData.id': id
    });
  },

  navigateBack: function () {
    wx.navigateBack();
  },

  onInput: function (e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`formData.${field}`]: value
    });
  },

  onGradeChange: function (e) {
    const index = e.detail.value;
    this.setData({
      gradeIndex: index,
      'formData.grade': this.data.gradeOptions[index]
    });
  },

  onTypeChange: function (e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      'formData.type': type
    });
  },

  toggleSubject: function (e) {
    const subjectKey = e.currentTarget.dataset.subject;
    const subjectNames = {
      'math': '数学',
      'chinese': '语文',
      'english': '英语',
      'science': '科学',
      'physics': '物理',
      'chemistry': '化学',
      'biology': '生物'
    };
    
    const subjectName = subjectNames[subjectKey];
    const subjects = this.data.formData.subjects || [];
    const subjectSelected = this.data.formData.subjectSelected || {};
    const index = subjects.indexOf(subjectName);
    const isSelected = !subjectSelected[subjectKey];

    if (index > -1) {
      subjects.splice(index, 1);
    } else {
      subjects.push(subjectName);
    }

    subjectSelected[subjectKey] = isSelected;

    this.setData({
      'formData.subjects': subjects,
      'formData.subjectSelected': subjectSelected
    });
  },

  onCrossBorderInput: function (e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`formData.crossBorderInfo.${field}`]: value
    });
  },

  onAdaptationChange: function (e) {
    const index = e.detail.value;
    this.setData({
      adaptationIndex: index,
      'formData.crossBorderInfo.adaptationLevel': this.data.adaptationOptions[index]
    });
  },

  onNeedsAttentionChange: function (e) {
    this.setData({
      'formData.crossBorderInfo.needsAttention': e.detail.value
    });
  },

  onStatusChange: function (e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      'formData.status': status
    });
  },

  validateForm: function () {
    const formData = this.data.formData;

    if (!formData.name.trim()) {
      wx.showToast({
        title: '请输入学生姓名',
        icon: 'none'
      });
      return false;
    }

    if (!formData.id.trim()) {
      wx.showToast({
        title: '请输入学号',
        icon: 'none'
      });
      return false;
    }

    if (!formData.phone.trim()) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return false;
    }

    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return false;
    }

    if (!formData.school.trim()) {
      wx.showToast({
        title: '请输入学校名称',
        icon: 'none'
      });
      return false;
    }

    if (!formData.grade) {
      wx.showToast({
        title: '请选择年级',
        icon: 'none'
      });
      return false;
    }

    if (formData.subjects.length === 0) {
      wx.showToast({
        title: '请至少选择一个科目',
        icon: 'none'
      });
      return false;
    }

    if (formData.type === 'cross-border') {
      if (!formData.crossBorderInfo.mainlandSchool.trim()) {
        wx.showToast({
          title: '请输入内地学校名称',
          icon: 'none'
        });
        return false;
      }

      if (!formData.crossBorderInfo.adaptationLevel) {
        wx.showToast({
          title: '请选择适应水平',
          icon: 'none'
        });
        return false;
      }
    }

    return true;
  },

  submitForm: function () {
    if (!this.validateForm()) {
      return;
    }

    const formData = this.data.formData;
    
    const studentData = {
      ...formData,
      subjectsText: formData.subjects.join('、'),
      avatar: '',
      crossBorderInfo: formData.type === 'cross-border' ? formData.crossBorderInfo : null
    };

    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];

    if (prevPage) {
      const currentStudents = prevPage.data.students || [];
      const newStudents = [studentData, ...currentStudents];
      
      prevPage.setData({
        students: newStudents
      });

      console.log('学生数据已添加:', studentData);
      console.log('更新后的学生列表:', newStudents);
    }

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
