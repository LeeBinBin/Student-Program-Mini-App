// index.js
Page({
  data: {
    // 资源数据
    resources: [
      {
        id: 'R001',
        title: '粤港数学三年级知识点对标经验分享',
        description: '分享我在粤港数学三年级知识点对标过程中的经验和方法，包括两地课程标准差异分析、知识点映射方法和教学策略调整建议。希望能帮助更多跨境教育教师。',
        category: '经验分享',
        subject: '数学',
        crossBorder: true,
        publishTime: '2024-09-15 10:30',
        teacher: {
          id: 'T001',
          name: '陈老师',
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20teacher%20avatar%20portrait&image_size=square',
          school: '深圳外国语学校'
        },
        materials: [
          {
            id: 'M001',
            name: '粤港数学三年级知识点对标表.xlsx',
            type: '文档',
            size: '2.3MB'
          },
          {
            id: 'M002',
            name: '跨境数学教学策略.pptx',
            type: '课件',
            size: '5.7MB'
          }
        ],
        likeCount: 45,
        commentCount: 12,
        shareCount: 28,
        liked: false,
        comments: [
          {
            id: 'C001',
            name: '李老师',
            avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=female%20teacher%20avatar%20portrait&image_size=square',
            time: '2024-09-15 11:20',
            text: '非常实用的分享，对我帮助很大！'
          },
          {
            id: 'C002',
            name: '王老师',
            avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=male%20teacher%20avatar%20portrait&image_size=square',
            time: '2024-09-15 12:30',
            text: '请问有没有四年级的对标资料？'
          }
        ]
      },
      {
        id: 'R002',
        title: '跨境学生英语适应教学资源包',
        description: '为跨境学生准备的英语适应教学资源包，包含词汇表、练习题和教学课件，帮助学生适应粤港两地英语教学差异。',
        category: '教学资源',
        subject: '英语',
        crossBorder: true,
        publishTime: '2024-09-14 16:45',
        teacher: {
          id: 'T002',
          name: '林老师',
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20teacher%20avatar%20portrait&image_size=square',
          school: '香港中文大学附属学校'
        },
        materials: [
          {
            id: 'M003',
            name: '跨境学生英语词汇表.docx',
            type: '文档',
            size: '1.8MB'
          },
          {
            id: 'M004',
            name: '英语适应练习题.pdf',
            type: '文档',
            size: '3.2MB'
          },
          {
            id: 'M005',
            name: '英语适应教学课件.pptx',
            type: '课件',
            size: '8.5MB'
          }
        ],
        likeCount: 38,
        commentCount: 8,
        shareCount: 22,
        liked: true,
        comments: [
          {
            id: 'C003',
            name: '张老师',
            avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=young%20teacher%20avatar%20portrait&image_size=square',
            time: '2024-09-14 17:20',
            text: '资源非常丰富，谢谢分享！'
          }
        ]
      },
      {
        id: 'R003',
        title: '语文教学中文化差异的处理方法',
        description: '探讨在跨境教育中，如何处理语文教学中的文化差异问题，包括教材选择、教学方法调整和学生文化认同培养等方面的经验。',
        category: '经验分享',
        subject: '语文',
        crossBorder: true,
        publishTime: '2024-09-13 09:15',
        teacher: {
          id: 'T003',
          name: '黄老师',
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20teacher%20avatar%20portrait&image_size=square',
          school: '广州执信中学'
        },
        materials: [],
        likeCount: 29,
        commentCount: 15,
        shareCount: 18,
        liked: false,
        comments: [
          {
            id: 'C004',
            name: '吴老师',
            avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=middle%20aged%20teacher%20avatar%20portrait&image_size=square',
            time: '2024-09-13 10:00',
            text: '文化差异确实是跨境语文教学的难点，感谢分享经验！'
          },
          {
            id: 'C005',
            name: '郑老师',
            avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=female%20chinese%20teacher%20avatar&image_size=square',
            time: '2024-09-13 11:30',
            text: '请问如何平衡两地文化内容的教学比例？'
          }
        ]
      },
      {
        id: 'R004',
        title: '科学实验教学资源包（粤港通用）',
        description: '为跨境教育教师准备的科学实验教学资源包，包含实验教案、操作视频和学生工作表，符合两地科学课程标准要求。',
        category: '教学资源',
        subject: '科学',
        crossBorder: true,
        publishTime: '2024-09-12 14:20',
        teacher: {
          id: 'T004',
          name: '吴老师',
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20teacher%20avatar%20portrait&image_size=square',
          school: '香港浸会大学附属学校'
        },
        materials: [
          {
            id: 'M006',
            name: '科学实验教案集.docx',
            type: '文档',
            size: '4.5MB'
          },
          {
            id: 'M007',
            name: '实验操作视频.mp4',
            type: '视频',
            size: '15.2MB'
          }
        ],
        likeCount: 42,
        commentCount: 10,
        shareCount: 25,
        liked: false,
        comments: []
      }
    ],
    
    // 搜索和筛选
    searchKeyword: '',
    selectedCategory: '',
    selectedSubject: '',
    showFilterModal: false,
    filterType: '',
    filterTitle: '',
    filterOptions: [],
    selectedFilterValue: '',
    
    // 发布资源
    showPublishModal: false,
    publishForm: {
      title: '',
      description: '',
      category: '',
      subject: '',
      materials: [],
      crossBorder: false
    }
  },

  onLoad: function () {
    // 初始化数据
    this.setData({
      originalResources: [...this.data.resources]
    });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 搜索资源
  onSearch: function (e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.filterResources();
  },

  // 显示筛选弹窗
  showFilter: function (type) {
    let title = '';
    let options = [];

    switch (type) {
      case 'category':
        title = '资源分类';
        options = [
          { label: '全部', value: '' },
          { label: '经验分享', value: '经验分享' },
          { label: '教学资源', value: '教学资源' },
          { label: '培训资料', value: '培训资料' }
        ];
        break;
      case 'subject':
        title = '学科';
        options = [
          { label: '全部', value: '' },
          { label: '数学', value: '数学' },
          { label: '英语', value: '英语' },
          { label: '语文', value: '语文' },
          { label: '科学', value: '科学' },
          { label: '其他', value: '其他' }
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

    this.filterResources();
  },

  // 筛选资源
  filterResources: function () {
    let filteredResources = [...this.data.originalResources];

    // 按关键词搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filteredResources = filteredResources.filter(resource => 
        resource.title.toLowerCase().includes(keyword) ||
        resource.description.toLowerCase().includes(keyword) ||
        resource.teacher.name.toLowerCase().includes(keyword) ||
        resource.teacher.school.toLowerCase().includes(keyword)
      );
    }

    // 按分类筛选
    if (this.data.selectedCategory && this.data.selectedCategory !== '全部') {
      filteredResources = filteredResources.filter(resource => 
        resource.category === this.data.selectedCategory
      );
    }

    // 按学科筛选
    if (this.data.selectedSubject && this.data.selectedSubject !== '全部') {
      filteredResources = filteredResources.filter(resource => 
        resource.subject === this.data.selectedSubject
      );
    }

    this.setData({ resources: filteredResources });
  },

  // 发布资源
  publishResource: function () {
    this.setData({
      showPublishModal: true,
      publishForm: {
        title: '',
        description: '',
        category: '',
        subject: '',
        materials: [],
        crossBorder: false
      }
    });
  },

  // 隐藏发布弹窗
  hidePublishModal: function () {
    this.setData({ showPublishModal: false });
  },

  // 发布表单输入
  onPublishInput: function (e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`publishForm.${field}`]: value
    });
  },

  // 选择发布分类
  selectPublishCategory: function () {
    wx.showActionSheet({
      itemList: ['经验分享', '教学资源', '培训资料'],
      success: (res) => {
        const categories = ['经验分享', '教学资源', '培训资料'];
        this.setData({
          'publishForm.category': categories[res.tapIndex]
        });
      }
    });
  },

  // 选择发布学科
  selectPublishSubject: function () {
    wx.showActionSheet({
      itemList: ['数学', '英语', '语文', '科学', '其他'],
      success: (res) => {
        const subjects = ['数学', '英语', '语文', '科学', '其他'];
        this.setData({
          'publishForm.subject': subjects[res.tapIndex]
        });
      }
    });
  },

  // 切换跨境教育选项
  toggleCrossBorder: function () {
    this.setData({
      'publishForm.crossBorder': !this.data.publishForm.crossBorder
    });
  },

  // 上传素材
  uploadMaterials: function () {
    wx.chooseMessageFile({
      count: 3,
      type: 'all',
      success: (res) => {
        const tempFiles = res.tempFiles;
        const materials = tempFiles.map(file => ({
          id: `M${Date.now() + Math.random()}`,
          name: file.name,
          type: this.getFileType(file.name),
          size: this.formatFileSize(file.size)
        }));

        this.setData({
          'publishForm.materials': [...this.data.publishForm.materials, ...materials]
        });
      }
    });
  },

  // 获取文件类型
  getFileType: function (fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['doc', 'docx', 'pdf', 'txt', 'xlsx', 'xls'].includes(extension)) {
      return '文档';
    } else if (['ppt', 'pptx'].includes(extension)) {
      return '课件';
    } else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) {
      return '视频';
    } else if (['mp3', 'wav', 'm4a'].includes(extension)) {
      return '音频';
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
      return '图片';
    } else {
      return '其他';
    }
  },

  // 格式化文件大小
  formatFileSize: function (bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  // 移除素材
  removeMaterial: function (e) {
    const index = e.currentTarget.dataset.index;
    const materials = [...this.data.publishForm.materials];
    materials.splice(index, 1);
    this.setData({
      'publishForm.materials': materials
    });
  },

  // 提交发布
  submitPublish: function () {
    const form = this.data.publishForm;
    
    if (!form.title || !form.description || !form.category || !form.subject) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 模拟发布成功
    const newResource = {
      id: `R${Date.now()}`,
      title: form.title,
      description: form.description,
      category: form.category,
      subject: form.subject,
      crossBorder: form.crossBorder,
      publishTime: new Date().toLocaleString('zh-CN'),
      teacher: {
        id: 'T001',
        name: '陈老师',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20teacher%20avatar%20portrait&image_size=square',
        school: '深圳外国语学校'
      },
      materials: form.materials,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      liked: false,
      comments: []
    };

    const resources = [newResource, ...this.data.resources];
    this.setData({
      resources: resources,
      originalResources: resources,
      showPublishModal: false
    });

    wx.showToast({
      title: '发布成功',
      icon: 'success'
    });
  },

  // 点赞资源
  likeResource: function (e) {
    const resourceId = e.currentTarget.dataset.id;
    const resources = this.data.resources.map(resource => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          liked: !resource.liked,
          likeCount: resource.liked ? resource.likeCount - 1 : resource.likeCount + 1
        };
      }
      return resource;
    });

    this.setData({ resources: resources });
  },

  // 评论资源
  commentResource: function (e) {
    const resourceId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '发表评论',
      content: '请输入您的评论',
      editable: true,
      placeholderText: '写下您的想法...',
      success: (res) => {
        if (res.confirm && res.content) {
          const resources = this.data.resources.map(resource => {
            if (resource.id === resourceId) {
              const newComment = {
                id: `C${Date.now()}`,
                name: '我',
                avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait&image_size=square',
                time: new Date().toLocaleTimeString('zh-CN'),
                text: res.content
              };
              return {
                ...resource,
                comments: [newComment, ...resource.comments],
                commentCount: resource.commentCount + 1
              };
            }
            return resource;
          });

          this.setData({ resources: resources });
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 分享资源
  shareResource: function (e) {
    const resourceId = e.currentTarget.dataset.id;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });

    // 更新分享次数
    const resources = this.data.resources.map(resource => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          shareCount: resource.shareCount + 1
        };
      }
      return resource;
    });

    this.setData({ resources: resources });
  },

  // 下载素材
  downloadMaterial: function (e) {
    const materialId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '下载功能开发中',
      icon: 'info'
    });
  },

  // 查看更多评论
  viewMoreComments: function (e) {
    const resourceId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看更多评论功能开发中',
      icon: 'info'
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});