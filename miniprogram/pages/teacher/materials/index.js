Page({
  data: {
    searchKeyword: '',
    currentCategory: 'all',
    categories: [
      { id: 'all', name: '全部', icon: '📚' },
      { id: 'ppt', name: '课件', icon: '📊' },
      { id: 'video', name: '视频', icon: '🎬' },
      { id: 'document', name: '文档', icon: '📄' },
      { id: 'exercise', name: '练习', icon: '✏️' },
      { id: 'reference', name: '参考资料', icon: '📖' }
    ],
    uploadCategories: [
      { id: 'ppt', name: '课件' },
      { id: 'video', name: '视频' },
      { id: 'document', name: '文档' },
      { id: 'exercise', name: '练习' },
      { id: 'reference', name: '参考资料' }
    ],
    subjects: ['数学', '语文', '英语', '科学', '物理', '化学', '生物'],
    grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级'],
    materials: [],
    filteredMaterials: [],
    showUploadModal: false,
    showDetailModal: false,
    currentMaterial: {},
    uploadForm: {
      title: '',
      categoryId: 'ppt',
      subject: '数学',
      grade: '一年级',
      description: '',
      fileName: ''
    },
    uploadCategoryIndex: 0,
    uploadSubjectIndex: 0,
    uploadGradeIndex: 0
  },

  onLoad: function () {
    this.loadMaterials();
  },

  onPullDownRefresh: function () {
    this.loadMaterials();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  loadMaterials: function () {
    const savedMaterials = wx.getStorageSync('teacher_materials') || [];
    
    if (savedMaterials.length === 0) {
      const mockMaterials = this.generateMockMaterials();
      this.setData({
        materials: mockMaterials,
        filteredMaterials: mockMaterials
      });
      wx.setStorageSync('teacher_materials', mockMaterials);
    } else {
      this.setData({
        materials: savedMaterials,
        filteredMaterials: savedMaterials
      });
    }
    
    this.filterMaterials();
  },

  generateMockMaterials: function () {
    return [
      {
        id: 'M001',
        title: '粤港数学三年级知识点对比',
        icon: '📊',
        categoryId: 'ppt',
        categoryName: '课件',
        subject: '数学',
        grade: '三年级',
        description: '详细对比粤港两地数学三年级教材的知识点差异，帮助教师更好地进行跨版本教学。',
        author: '陈老师',
        uploadTime: '2026-02-18',
        views: 156,
        isFavorite: false,
        fileSize: '2.5MB'
      },
      {
        id: 'M002',
        title: '跨境学生英语口语训练视频',
        icon: '🎬',
        categoryId: 'video',
        categoryName: '视频',
        subject: '英语',
        grade: '四年级',
        description: '针对跨境学生设计的英语口语训练视频，包含日常对话和情景模拟。',
        author: '李老师',
        uploadTime: '2026-02-17',
        views: 234,
        isFavorite: true,
        fileSize: '15.8MB'
      },
      {
        id: 'M003',
        title: '粤港语文古诗文教学指南',
        icon: '📄',
        categoryId: 'document',
        categoryName: '文档',
        subject: '语文',
        grade: '五年级',
        description: '整理了粤港两地语文教材中的古诗文篇目，提供教学建议和重点解析。',
        author: '王老师',
        uploadTime: '2026-02-16',
        views: 189,
        isFavorite: false,
        fileSize: '1.2MB'
      },
      {
        id: 'M004',
        title: '科学实验操作手册',
        icon: '✏️',
        categoryId: 'exercise',
        categoryName: '练习',
        subject: '科学',
        grade: '六年级',
        description: '包含多个适合小学科学课程的实验操作步骤和注意事项。',
        author: '张老师',
        uploadTime: '2026-02-15',
        views: 145,
        isFavorite: false,
        fileSize: '3.6MB'
      },
      {
        id: 'M005',
        title: '物理概念教学参考资料',
        icon: '📖',
        categoryId: 'reference',
        categoryName: '参考资料',
        subject: '物理',
        grade: '七年级',
        description: '收集了多个版本的物理教材，对比分析不同版本对同一概念的讲解方式。',
        author: '刘老师',
        uploadTime: '2026-02-14',
        views: 178,
        isFavorite: true,
        fileSize: '4.2MB'
      },
      {
        id: 'M006',
        title: '化学实验安全规范',
        icon: '📄',
        categoryId: 'document',
        categoryName: '文档',
        subject: '化学',
        grade: '八年级',
        description: '详细说明化学实验室的安全规范和应急处理措施。',
        author: '赵老师',
        uploadTime: '2026-02-13',
        views: 167,
        isFavorite: false,
        fileSize: '0.8MB'
      },
      {
        id: 'M007',
        title: '生物细胞结构教学课件',
        icon: '📊',
        categoryId: 'ppt',
        categoryName: '课件',
        subject: '生物',
        grade: '七年级',
        description: '使用图文并茂的方式讲解细胞结构，包含多个高清图片和动画演示。',
        author: '周老师',
        uploadTime: '2026-02-12',
        views: 198,
        isFavorite: false,
        fileSize: '5.3MB'
      },
      {
        id: 'M008',
        title: '数学应用题解题技巧',
        icon: '🎬',
        categoryId: 'video',
        categoryName: '视频',
        subject: '数学',
        grade: '五年级',
        description: '讲解小学数学应用题的常见类型和解题技巧，帮助学生提高解题能力。',
        author: '吴老师',
        uploadTime: '2026-02-11',
        views: 212,
        isFavorite: true,
        fileSize: '18.5MB'
      },
      {
        id: 'M009',
        title: '英语语法练习题集',
        icon: '✏️',
        categoryId: 'exercise',
        categoryName: '练习',
        subject: '英语',
        grade: '六年级',
        description: '包含小学英语重点语法点的练习题，适合课堂练习和课后作业。',
        author: '郑老师',
        uploadTime: '2026-02-10',
        views: 176,
        isFavorite: false,
        fileSize: '2.1MB'
      },
      {
        id: 'M010',
        title: '语文阅读理解教学策略',
        icon: '📖',
        categoryId: 'reference',
        categoryName: '参考资料',
        subject: '语文',
        grade: '四年级',
        description: '总结语文阅读理解的教学方法和策略，提供多个教学案例。',
        author: '孙老师',
        uploadTime: '2026-02-09',
        views: 193,
        isFavorite: false,
        fileSize: '3.8MB'
      }
    ];
  },

  filterMaterials: function () {
    let filtered = [...this.data.materials];

    if (this.data.currentCategory !== 'all') {
      filtered = filtered.filter(item => item.categoryId === this.data.currentCategory);
    }

    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.subject.toLowerCase().includes(keyword)
      );
    }

    this.setData({
      filteredMaterials: filtered
    });
  },

  onSearchInput: function (e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  onSearch: function () {
    this.filterMaterials();
  },

  onCategoryChange: function (e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      currentCategory: categoryId
    });
    this.filterMaterials();
  },

  showUpload: function () {
    this.setData({
      showUploadModal: true,
      uploadForm: {
        title: '',
        categoryId: 'ppt',
        subject: '数学',
        grade: '一年级',
        description: '',
        fileName: ''
      },
      uploadCategoryIndex: 0,
      uploadSubjectIndex: 0,
      uploadGradeIndex: 0
    });
  },

  hideUploadModal: function () {
    this.setData({
      showUploadModal: false
    });
  },

  onUploadTitleChange: function (e) {
    this.setData({
      'uploadForm.title': e.detail.value
    });
  },

  onUploadCategoryChange: function (e) {
    const index = e.detail.value;
    this.setData({
      uploadCategoryIndex: index,
      'uploadForm.categoryId': this.data.uploadCategories[index].id
    });
  },

  onUploadSubjectChange: function (e) {
    const index = e.detail.value;
    this.setData({
      uploadSubjectIndex: index,
      'uploadForm.subject': this.data.subjects[index]
    });
  },

  onUploadGradeChange: function (e) {
    const index = e.detail.value;
    this.setData({
      uploadGradeIndex: index,
      'uploadForm.grade': this.data.grades[index]
    });
  },

  onUploadDescChange: function (e) {
    this.setData({
      'uploadForm.description': e.detail.value
    });
  },

  chooseFile: function () {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const file = res.tempFiles[0];
        this.setData({
          'uploadForm.fileName': file.name
        });
        wx.showToast({
          title: '文件已选择',
          icon: 'success'
        });
      }
    });
  },

  submitUpload: function () {
    const form = this.data.uploadForm;

    if (!form.title.trim()) {
      wx.showToast({
        title: '请输入素材标题',
        icon: 'none'
      });
      return;
    }

    if (!form.fileName) {
      wx.showToast({
        title: '请选择文件',
        icon: 'none'
      });
      return;
    }

    const category = this.data.uploadCategories.find(c => c.id === form.categoryId);
    const categoryIcons = {
      'ppt': '📊',
      'video': '🎬',
      'document': '📄',
      'exercise': '✏️',
      'reference': '📖'
    };

    const newMaterial = {
      id: 'M' + Date.now(),
      title: form.title,
      icon: categoryIcons[form.categoryId] || '📄',
      categoryId: form.categoryId,
      categoryName: category.name,
      subject: form.subject,
      grade: form.grade,
      description: form.description || '暂无描述',
      author: '陈老师',
      uploadTime: this.formatDate(new Date()),
      views: 0,
      isFavorite: false,
      fileSize: '未知'
    };

    const materials = [newMaterial, ...this.data.materials];
    this.setData({
      materials: materials
    });

    wx.setStorageSync('teacher_materials', materials);

    this.filterMaterials();
    this.hideUploadModal();

    wx.showToast({
      title: '上传成功',
      icon: 'success'
    });
  },

  viewMaterialDetail: function (e) {
    const materialId = e.currentTarget.dataset.id;
    const material = this.data.materials.find(m => m.id === materialId);

    if (material) {
      this.setData({
        currentMaterial: material,
        showDetailModal: true
      });

      const materials = this.data.materials.map(m => {
        if (m.id === materialId) {
          return { ...m, views: m.views + 1 };
        }
        return m;
      });

      this.setData({
        materials: materials
      });

      wx.setStorageSync('teacher_materials', materials);
    }
  },

  hideDetailModal: function () {
    this.setData({
      showDetailModal: false
    });
  },

  downloadMaterial: function (e) {
    const materialId = e.currentTarget.dataset.id;
    const material = this.data.materials.find(m => m.id === materialId);

    if (material) {
      wx.showModal({
        title: '下载素材',
        content: `确定要下载"${material.title}"吗？`,
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '下载成功',
              icon: 'success'
            });
          }
        }
      });
    }
  },

  downloadMaterialFromDetail: function () {
    const material = this.data.currentMaterial;
    wx.showModal({
      title: '下载素材',
      content: `确定要下载"${material.title}"吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '下载成功',
            icon: 'success'
          });
          this.hideDetailModal();
        }
      }
    });
  },

  toggleFavorite: function (e) {
    const materialId = e.currentTarget.dataset.id;
    const materials = this.data.materials.map(m => {
      if (m.id === materialId) {
        return { ...m, isFavorite: !m.isFavorite };
      }
      return m;
    });

    this.setData({
      materials: materials
    });

    wx.setStorageSync('teacher_materials', materials);
    this.filterMaterials();

    const material = materials.find(m => m.id === materialId);
    if (material && material.isFavorite) {
      wx.showToast({
        title: '已收藏',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      });
    }
  },

  stopPropagation: function () {
    // 阻止事件冒泡
  },

  navigateBack: function () {
    wx.navigateBack();
  },

  formatDate: function (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
});
