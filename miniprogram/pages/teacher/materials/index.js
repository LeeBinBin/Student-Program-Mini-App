// index.js
Page({
  data: {
    materials: [
      {
        id: 'M001',
        name: '粤港数学三年级知识点对标表',
        subject: '数学',
        grade: '3',
        type: '文档',
        fileSize: '2.3MB',
        description: '详细对比粤港两地三年级数学课程知识点，帮助跨境学生适应不同教学体系',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=educational%20math%20document%20thumbnail%20with%20comparison%20chart&image_size=square',
        uploadDate: '2024-09-15',
        downloadCount: 128,
        crossBorder: true,
        url: '#'
      },
      {
        id: 'M002',
        name: '英语阅读训练课件',
        subject: '英语',
        grade: '4',
        type: '课件',
        fileSize: '5.7MB',
        description: '针对四年级学生的英语阅读训练课件，融合粤港两地英语教学特点',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20reading%20lesson%20ppt%20thumbnail&image_size=square',
        uploadDate: '2024-09-10',
        downloadCount: 95,
        crossBorder: false,
        url: '#'
      },
      {
        id: 'M003',
        name: '中文作文指导视频',
        subject: '语文',
        grade: '5',
        type: '视频',
        fileSize: '15.2MB',
        description: '五年级中文作文写作指导视频，帮助学生提高写作能力',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20composition%20teaching%20video%20thumbnail&image_size=square',
        uploadDate: '2024-09-05',
        downloadCount: 87,
        crossBorder: false,
        url: '#'
      },
      {
        id: 'M004',
        name: '粤港科学四年级实验手册',
        subject: '科学',
        grade: '4',
        type: '文档',
        fileSize: '3.1MB',
        description: '粤港两地四年级科学实验对比手册，包含实验步骤和注意事项',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20experiment%20manual%20thumbnail&image_size=square',
        uploadDate: '2024-08-28',
        downloadCount: 64,
        crossBorder: true,
        url: '#'
      },
      {
        id: 'M005',
        name: '数学思维训练题集',
        subject: '数学',
        grade: '6',
        type: '文档',
        fileSize: '1.8MB',
        description: '六年级数学思维训练题集，包含详细解答',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=math%20problem%20set%20thumbnail&image_size=square',
        uploadDate: '2024-08-20',
        downloadCount: 112,
        crossBorder: false,
        url: '#'
      },
      {
        id: 'M006',
        name: '粤港历史文化对比课件',
        subject: '历史',
        grade: '5',
        type: '课件',
        fileSize: '8.4MB',
        description: '粤港两地历史文化对比课件，帮助学生了解两地历史文化差异',
        thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=history%20culture%20comparison%20ppt%20thumbnail&image_size=square',
        uploadDate: '2024-08-15',
        downloadCount: 73,
        crossBorder: true,
        url: '#'
      }
    ],
    searchKeyword: '',
    selectedSubject: '',
    selectedGrade: '',
    selectedType: '',
    showFilterModal: false,
    filterType: '',
    filterTitle: '',
    filterOptions: [],
    selectedFilterValue: ''
  },

  onLoad: function () {
    // 初始化数据
    this.setData({
      originalMaterials: [...this.data.materials]
    });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 上传素材
  uploadMaterial: function () {
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success: (res) => {
        const tempFilePaths = res.tempFiles;
        console.log('选择的文件:', tempFilePaths);
        
        // 模拟上传成功
        wx.showToast({
          title: '素材上传功能开发中',
          icon: 'info'
        });
      },
      fail: (err) => {
        console.error('选择文件失败', err);
      }
    });
  },

  // 搜索素材
  onSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.filterMaterials();
  },

  // 显示筛选弹窗
  showFilter: function (type) {
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
          { label: '科学', value: '科学' },
          { label: '历史', value: '历史' },
          { label: '其他', value: '其他' }
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
      case 'type':
        title = '素材类型';
        options = [
          { label: '全部', value: '' },
          { label: '文档', value: '文档' },
          { label: '课件', value: '课件' },
          { label: '视频', value: '视频' },
          { label: '音频', value: '音频' },
          { label: '图片', value: '图片' }
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

    this.filterMaterials();
  },

  // 筛选素材
  filterMaterials: function () {
    let filteredMaterials = [...this.data.originalMaterials];

    // 按关键词搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filteredMaterials = filteredMaterials.filter(material => 
        material.name.toLowerCase().includes(keyword) ||
        material.description.toLowerCase().includes(keyword) ||
        material.subject.toLowerCase().includes(keyword)
      );
    }

    // 按学科筛选
    if (this.data.selectedSubject && this.data.selectedSubject !== '全部') {
      filteredMaterials = filteredMaterials.filter(material => 
        material.subject === this.data.selectedSubject
      );
    }

    // 按年级筛选
    if (this.data.selectedGrade && this.data.selectedGrade !== '全部') {
      filteredMaterials = filteredMaterials.filter(material => 
        material.grade === this.data.selectedGrade.replace('年级', '')
      );
    }

    // 按素材类型筛选
    if (this.data.selectedType && this.data.selectedType !== '全部') {
      filteredMaterials = filteredMaterials.filter(material => 
        material.type === this.data.selectedType
      );
    }

    this.setData({ materials: filteredMaterials });
  },

  // 下载素材
  downloadMaterial: function (e) {
    const materialId = e.currentTarget.dataset.id;
    const material = this.data.materials.find(m => m.id === materialId);
    
    if (material) {
      // 模拟下载
      wx.showToast({
        title: `正在下载${material.name}`,
        icon: 'loading',
        duration: 1000
      });
      
      setTimeout(() => {
        wx.showToast({
          title: '下载成功',
          icon: 'success'
        });
        
        // 更新下载次数
        const updatedMaterials = this.data.materials.map(m => {
          if (m.id === materialId) {
            return { ...m, downloadCount: m.downloadCount + 1 };
          }
          return m;
        });
        
        this.setData({ materials: updatedMaterials });
      }, 1000);
    }
  },

  // 预览素材
  previewMaterial: function (e) {
    const materialId = e.currentTarget.dataset.id;
    const material = this.data.materials.find(m => m.id === materialId);
    
    if (material) {
      wx.showToast({
        title: `预览${material.name}`,
        icon: 'info'
      });
    }
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});