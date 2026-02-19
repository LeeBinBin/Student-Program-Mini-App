// index.js
Page({
  data: {
    subjects: ['全部', '数学', '语文', '英语', '物理', '化学', '生物'],
    grades: ['全部年级', '小学低年级', '小学高年级', '初中'],
    gradeIndex: 0,
    languages: ['全部语言', '中文', '英文', '粤语', '三语'],
    languageIndex: 0,
    types: ['全部类型', 'PDF', '视频', '音频', 'PPT'],
    typeIndex: 0,
    currentSubject: '全部',
    currentGrade: '全部年级',
    materials: [],
    innerAudioContext: null,
    currentPage: 1,
    totalPages: 3,
    showAudioPlayer: false,
    currentAudio: {},
    isPlaying: false,
    audioProgress: 0,
    currentTime: 0,
    duration: 0
  },

  onLoad: function () {
    this.initData();
    this.initAudioContext();
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const tabBar = this.getTabBar();
      if (tabBar.updateTabBar) {
        tabBar.updateTabBar();
      }
      if (tabBar.updateSelected) {
        tabBar.updateSelected();
      }
    }
  },

  initData: function () {
    var materialData = [
      // PDF资料 - 小学低年级
      {
        id: "1",
        title: "粤港数学三年级分数知识点对比",
        subject: "数学",
        grade: "小学低年级",
        type: "PDF",
        description: "详细对比粤港两地三年级数学分数知识点的差异和重合部分",
        download_url: "https://example.com/pdf1.pdf",
        voice_url: "https://example.com/voice1.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf1.pdf&embedded=true",
        views: 1258,
        downloads: 326
      },
      {
        id: "2",
        title: "粤港语文四年级阅读理解技巧",
        subject: "语文",
        grade: "小学低年级",
        type: "PDF",
        description: "针对粤港两地语文阅读理解的解题技巧和方法",
        download_url: "https://example.com/pdf2.pdf",
        voice_url: "https://example.com/voice2.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf2.pdf&embedded=true",
        views: 987,
        downloads: 289
      },
      {
        id: "3",
        title: "粤港英语三年级词汇手册",
        subject: "英语",
        grade: "小学低年级",
        type: "PDF",
        description: "粤港两地三年级英语核心词汇对比和学习指导",
        download_url: "https://example.com/pdf3.pdf",
        voice_url: "https://example.com/voice3.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf3.pdf&embedded=true",
        views: 1567,
        downloads: 456
      },
      {
        id: "4",
        title: "粤港数学四年级几何图形知识点",
        subject: "数学",
        grade: "小学低年级",
        type: "PDF",
        description: "粤港两地四年级数学几何图形知识点的详细对比",
        download_url: "https://example.com/pdf4.pdf",
        voice_url: "https://example.com/voice4.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf4.pdf&embedded=true",
        views: 1056,
        downloads: 298
      },
      {
        id: "5",
        title: "粤港语文三年级作文起步指导",
        subject: "语文",
        grade: "小学低年级",
        type: "PDF",
        description: "针对粤港两地语文三年级作文写作的起步指导和技巧",
        download_url: "https://example.com/pdf5.pdf",
        voice_url: "https://example.com/voice5.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf5.pdf&embedded=true",
        views: 892,
        downloads: 256
      },

      // PDF资料 - 小学高年级
      {
        id: "6",
        title: "粤港数学六年级百分数应用题对比",
        subject: "数学",
        grade: "小学高年级",
        type: "PDF",
        description: "详细对比粤港两地六年级数学百分数应用题的差异和解题方法",
        download_url: "https://example.com/pdf6.pdf",
        voice_url: "https://example.com/voice6.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf6.pdf&embedded=true",
        views: 1123,
        downloads: 345
      },
      {
        id: "7",
        title: "粤港语文六年级古诗词鉴赏",
        subject: "语文",
        grade: "小学高年级",
        type: "PDF",
        description: "针对粤港两地语文六年级古诗词鉴赏的技巧和方法",
        download_url: "https://example.com/pdf7.pdf",
        voice_url: "https://example.com/voice7.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf7.pdf&embedded=true",
        views: 1345,
        downloads: 412
      },
      {
        id: "8",
        title: "粤港英语六年级阅读理解提升",
        subject: "英语",
        grade: "小学高年级",
        type: "PDF",
        description: "粤港两地六年级英语阅读理解的技巧对比和提升方法",
        download_url: "https://example.com/pdf8.pdf",
        voice_url: "https://example.com/voice8.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf8.pdf&embedded=true",
        views: 1098,
        downloads: 321
      },
      {
        id: "9",
        title: "粤港数学五年级小数乘除法知识点",
        subject: "数学",
        grade: "小学高年级",
        type: "PDF",
        description: "粤港两地五年级数学小数乘除法知识点的详细对比",
        download_url: "https://example.com/pdf9.pdf",
        voice_url: "https://example.com/voice9.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf9.pdf&embedded=true",
        views: 987,
        downloads: 289
      },
      {
        id: "10",
        title: "粤港语文五年级文言文入门",
        subject: "语文",
        grade: "小学高年级",
        type: "PDF",
        description: "针对粤港两地语文五年级文言文阅读的入门指导和技巧",
        download_url: "https://example.com/pdf10.pdf",
        voice_url: "https://example.com/voice10.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf10.pdf&embedded=true",
        views: 1234,
        downloads: 356
      },

      // PDF资料 - 初中
      {
        id: "11",
        title: "粤港数学七年级有理数知识点对比",
        subject: "数学",
        grade: "初中",
        type: "PDF",
        description: "详细对比粤港两地七年级数学有理数知识点的差异和重合部分",
        download_url: "https://example.com/pdf11.pdf",
        voice_url: "https://example.com/voice11.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf11.pdf&embedded=true",
        views: 956,
        downloads: 234
      },
      {
        id: "12",
        title: "粤港语文八年级议论文写作指导",
        subject: "语文",
        grade: "初中",
        type: "PDF",
        description: "针对粤港两地语文八年级议论文写作的技巧和方法",
        download_url: "https://example.com/pdf12.pdf",
        voice_url: "https://example.com/voice12.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf12.pdf&embedded=true",
        views: 876,
        downloads: 213
      },
      {
        id: "13",
        title: "粤港英语九年级阅读理解突破",
        subject: "英语",
        grade: "初中",
        type: "PDF",
        description: "粤港两地九年级英语阅读理解的突破技巧和对比分析",
        download_url: "https://example.com/pdf13.pdf",
        voice_url: "https://example.com/voice13.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf13.pdf&embedded=true",
        views: 1234,
        downloads: 356
      },
      {
        id: "14",
        title: "粤港数学八年级函数知识点对比",
        subject: "数学",
        grade: "初中",
        type: "PDF",
        description: "详细对比粤港两地八年级数学函数知识点的差异和重合部分",
        download_url: "https://example.com/pdf14.pdf",
        voice_url: "https://example.com/voice14.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf14.pdf&embedded=true",
        views: 1089,
        downloads: 312
      },
      {
        id: "15",
        title: "粤港语文七年级现代文阅读技巧",
        subject: "语文",
        grade: "初中",
        type: "PDF",
        description: "针对粤港两地语文七年级现代文阅读的技巧和方法",
        download_url: "https://example.com/pdf15.pdf",
        voice_url: "https://example.com/voice15.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf15.pdf&embedded=true",
        views: 923,
        downloads: 267
      },

      // 视频资料
      {
        id: "16",
        title: "英语语法精讲（中粤英三语）",
        subject: "英语",
        grade: "初中",
        type: "视频",
        description: "英语常见语法点的中、英、粤三语讲解，帮助跨境学生理解语法规则",
        download_url: "https://example.com/video1.mp4",
        voice_url: "",
        preview_url: "",
        views: 2356,
        downloads: 568
      },
      {
        id: "17",
        title: "数学几何图形直观教学",
        subject: "数学",
        grade: "小学高年级",
        type: "视频",
        description: "通过直观演示帮助学生理解几何图形的概念和性质",
        download_url: "https://example.com/video2.mp4",
        voice_url: "",
        preview_url: "",
        views: 1892,
        downloads: 432
      },
      {
        id: "18",
        title: "语文作文写作技巧（中粤双语）",
        subject: "语文",
        grade: "初中",
        type: "视频",
        description: "中粤双语讲解语文作文写作技巧，帮助跨境学生提高写作能力",
        download_url: "https://example.com/video3.mp4",
        voice_url: "",
        preview_url: "",
        views: 1678,
        downloads: 398
      },
      {
        id: "19",
        title: "数学分数加减法直观教学",
        subject: "数学",
        grade: "小学低年级",
        type: "视频",
        description: "通过直观演示帮助学生理解分数加减法的概念和计算方法",
        download_url: "https://example.com/video4.mp4",
        voice_url: "",
        preview_url: "",
        views: 1456,
        downloads: 356
      },

      // 音频资料
      {
        id: "20",
        title: "粤语数学术语发音指南",
        subject: "数学",
        grade: "小学低年级",
        type: "音频",
        description: "常见数学术语的粤语发音和解释，帮助非粤语区学生适应香港教学环境",
        download_url: "https://example.com/audio1.mp3",
        voice_url: "https://example.com/audio1.mp3",
        preview_url: "",
        views: 1892,
        downloads: 782
      },
      {
        id: "21",
        title: "英语听力专项训练",
        subject: "英语",
        grade: "初中",
        type: "音频",
        description: "针对粤港两地英语听力题型的专项训练，提高听力理解能力",
        download_url: "https://example.com/audio2.mp3",
        voice_url: "https://example.com/audio2.mp3",
        preview_url: "",
        views: 2105,
        downloads: 645
      },
      {
        id: "22",
        title: "粤语语文古诗词朗读",
        subject: "语文",
        grade: "小学高年级",
        type: "音频",
        description: "常见古诗词的粤语朗读和解释，帮助学生理解古诗词内容",
        download_url: "https://example.com/audio3.mp3",
        voice_url: "https://example.com/audio3.mp3",
        preview_url: "",
        views: 1567,
        downloads: 489
      },
      {
        id: "23",
        title: "英语词汇发音练习",
        subject: "英语",
        grade: "小学低年级",
        type: "音频",
        description: "粤港两地小学低年级英语核心词汇的标准发音练习",
        download_url: "https://example.com/audio4.mp3",
        voice_url: "https://example.com/audio4.mp3",
        preview_url: "",
        views: 1789,
        downloads: 523
      },

      // PPT资料
      {
        id: "24",
        title: "物理力学知识点双语课件",
        subject: "物理",
        grade: "初中",
        type: "PPT",
        description: "初中物理力学部分的双语教学课件，包含中英对照的知识点讲解和例题",
        download_url: "https://example.com/ppt1.pptx",
        voice_url: "",
        preview_url: "",
        views: 956,
        downloads: 234
      },
      {
        id: "25",
        title: "化学元素周期表双语讲解",
        subject: "化学",
        grade: "初中",
        type: "PPT",
        description: "化学元素周期表的中英双语讲解，包含元素性质和应用的详细介绍",
        download_url: "https://example.com/ppt2.pptx",
        voice_url: "",
        preview_url: "",
        views: 1123,
        downloads: 289
      },
      {
        id: "26",
        title: "生物细胞结构双语课件",
        subject: "生物",
        grade: "初中",
        type: "PPT",
        description: "生物细胞结构的中英双语讲解，包含细胞各部分功能的详细介绍",
        download_url: "https://example.com/ppt3.pptx",
        voice_url: "",
        preview_url: "",
        views: 876,
        downloads: 213
      },
      {
        id: "27",
        title: "数学代数基础双语课件",
        subject: "数学",
        grade: "初中",
        type: "PPT",
        description: "初中数学代数基础的双语教学课件，包含中英对照的知识点讲解和例题",
        download_url: "https://example.com/ppt4.pptx",
        voice_url: "",
        preview_url: "",
        views: 1034,
        downloads: 276
      },
      {
        id: "28",
        title: "英语语法基础双语课件",
        subject: "英语",
        grade: "初中",
        type: "PPT",
        description: "初中英语语法基础的双语教学课件，包含中英对照的知识点讲解和例题",
        download_url: "https://example.com/ppt5.pptx",
        voice_url: "",
        preview_url: "",
        views: 1245,
        downloads: 321
      }
    ];

    this.setData({
      materials: materialData
    });
  },

  initAudioContext: function () {
    try {
      this.innerAudioContext = wx.createInnerAudioContext();
      var that = this;

      // 播放开始回调
      this.innerAudioContext.onPlay(function () {
        console.log('开始播放');
        that.setData({ isPlaying: true });
      });

      // 播放结束回调
      this.innerAudioContext.onEnded(function () {
        console.log('播放结束');
        that.setData({
          isPlaying: false,
          audioProgress: 100,
          currentTime: that.data.duration
        });
        wx.showToast({
          title: '播放完成',
          icon: 'success'
        });
      });

      // 错误回调
      this.innerAudioContext.onError(function (res) {
        console.log('播放失败:', res.errMsg);
        that.setData({ isPlaying: false });
        wx.showToast({
          title: '语音播放失败',
          icon: 'none'
        });
      });

      // 中断回调
      this.innerAudioContext.onStop(function () {
        console.log('播放停止');
        that.setData({ isPlaying: false });
      });

      // 监听播放进度
      this.innerAudioContext.onTimeUpdate(function () {
        var currentTime = that.innerAudioContext.currentTime;
        var duration = that.innerAudioContext.duration || 1;
        var progress = (currentTime / duration) * 100;
        that.setData({
          currentTime: currentTime,
          audioProgress: progress
        });
      });

      // 监听音频加载完成
      this.innerAudioContext.onCanplay(function () {
        var duration = that.innerAudioContext.duration;
        that.setData({ duration: duration });
      });
    } catch (error) {
      console.error('音频上下文初始化失败:', error);
      this.innerAudioContext = null;
    }
  },

  // 绑定年级变化
  bindGradeChange: function (e) {
    this.setData({ gradeIndex: e.detail.value });
    this.setData({ currentGrade: this.data.grades[e.detail.value] });
  },

  // 绑定语言变化
  bindLanguageChange: function (e) {
    this.setData({ languageIndex: e.detail.value });
  },

  // 绑定类型变化
  bindTypeChange: function (e) {
    this.setData({ typeIndex: e.detail.value });
  },

  // 筛选材料
  filterMaterials: function () {
    var currentSubject = this.data.currentSubject;
    var currentGrade = this.data.grades[this.data.gradeIndex];
    var currentType = this.data.types[this.data.typeIndex];
    var currentLanguage = this.data.languages[this.data.languageIndex];

    var materialData = [
      // PDF资料 - 小学低年级
      {
        id: "1",
        title: "粤港数学三年级分数知识点对比",
        subject: "数学",
        grade: "小学低年级",
        type: "PDF",
        description: "详细对比粤港两地三年级数学分数知识点的差异和重合部分",
        download_url: "https://example.com/pdf1.pdf",
        voice_url: "https://example.com/voice1.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf1.pdf&embedded=true",
        views: 1258,
        downloads: 326
      },
      {
        id: "2",
        title: "粤港语文四年级阅读理解技巧",
        subject: "语文",
        grade: "小学低年级",
        type: "PDF",
        description: "针对粤港两地语文阅读理解的解题技巧和方法",
        download_url: "https://example.com/pdf2.pdf",
        voice_url: "https://example.com/voice2.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf2.pdf&embedded=true",
        views: 987,
        downloads: 289
      },
      {
        id: "3",
        title: "粤港英语三年级词汇手册",
        subject: "英语",
        grade: "小学低年级",
        type: "PDF",
        description: "粤港两地三年级英语核心词汇对比和学习指导",
        download_url: "https://example.com/pdf3.pdf",
        voice_url: "https://example.com/voice3.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf3.pdf&embedded=true",
        views: 1567,
        downloads: 456
      },
      {
        id: "4",
        title: "粤港数学四年级几何图形知识点",
        subject: "数学",
        grade: "小学低年级",
        type: "PDF",
        description: "粤港两地四年级数学几何图形知识点的详细对比",
        download_url: "https://example.com/pdf4.pdf",
        voice_url: "https://example.com/voice4.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf4.pdf&embedded=true",
        views: 1056,
        downloads: 298
      },
      {
        id: "5",
        title: "粤港语文三年级作文起步指导",
        subject: "语文",
        grade: "小学低年级",
        type: "PDF",
        description: "针对粤港两地语文三年级作文写作的起步指导和技巧",
        download_url: "https://example.com/pdf5.pdf",
        voice_url: "https://example.com/voice5.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf5.pdf&embedded=true",
        views: 892,
        downloads: 256
      },

      // PDF资料 - 小学高年级
      {
        id: "6",
        title: "粤港数学六年级百分数应用题对比",
        subject: "数学",
        grade: "小学高年级",
        type: "PDF",
        description: "详细对比粤港两地六年级数学百分数应用题的差异和解题方法",
        download_url: "https://example.com/pdf6.pdf",
        voice_url: "https://example.com/voice6.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf6.pdf&embedded=true",
        views: 1123,
        downloads: 345
      },
      {
        id: "7",
        title: "粤港语文六年级古诗词鉴赏",
        subject: "语文",
        grade: "小学高年级",
        type: "PDF",
        description: "针对粤港两地语文六年级古诗词鉴赏的技巧和方法",
        download_url: "https://example.com/pdf7.pdf",
        voice_url: "https://example.com/voice7.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf7.pdf&embedded=true",
        views: 1345,
        downloads: 412
      },
      {
        id: "8",
        title: "粤港英语六年级阅读理解提升",
        subject: "英语",
        grade: "小学高年级",
        type: "PDF",
        description: "粤港两地六年级英语阅读理解的技巧对比和提升方法",
        download_url: "https://example.com/pdf8.pdf",
        voice_url: "https://example.com/voice8.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf8.pdf&embedded=true",
        views: 1098,
        downloads: 321
      },
      {
        id: "9",
        title: "粤港数学五年级小数乘除法知识点",
        subject: "数学",
        grade: "小学高年级",
        type: "PDF",
        description: "粤港两地五年级数学小数乘除法知识点的详细对比",
        download_url: "https://example.com/pdf9.pdf",
        voice_url: "https://example.com/voice9.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf9.pdf&embedded=true",
        views: 987,
        downloads: 289
      },
      {
        id: "10",
        title: "粤港语文五年级文言文入门",
        subject: "语文",
        grade: "小学高年级",
        type: "PDF",
        description: "针对粤港两地语文五年级文言文阅读的入门指导和技巧",
        download_url: "https://example.com/pdf10.pdf",
        voice_url: "https://example.com/voice10.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf10.pdf&embedded=true",
        views: 1234,
        downloads: 356
      },

      // PDF资料 - 初中
      {
        id: "11",
        title: "粤港数学七年级有理数知识点对比",
        subject: "数学",
        grade: "初中",
        type: "PDF",
        description: "详细对比粤港两地七年级数学有理数知识点的差异和重合部分",
        download_url: "https://example.com/pdf11.pdf",
        voice_url: "https://example.com/voice11.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf11.pdf&embedded=true",
        views: 956,
        downloads: 234
      },
      {
        id: "12",
        title: "粤港语文八年级议论文写作指导",
        subject: "语文",
        grade: "初中",
        type: "PDF",
        description: "针对粤港两地语文八年级议论文写作的技巧和方法",
        download_url: "https://example.com/pdf12.pdf",
        voice_url: "https://example.com/voice12.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf12.pdf&embedded=true",
        views: 876,
        downloads: 213
      },
      {
        id: "13",
        title: "粤港英语九年级阅读理解突破",
        subject: "英语",
        grade: "初中",
        type: "PDF",
        description: "粤港两地九年级英语阅读理解的突破技巧和对比分析",
        download_url: "https://example.com/pdf13.pdf",
        voice_url: "https://example.com/voice13.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf13.pdf&embedded=true",
        views: 1234,
        downloads: 356
      },
      {
        id: "14",
        title: "粤港数学八年级函数知识点对比",
        subject: "数学",
        grade: "初中",
        type: "PDF",
        description: "详细对比粤港两地八年级数学函数知识点的差异和重合部分",
        download_url: "https://example.com/pdf14.pdf",
        voice_url: "https://example.com/voice14.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf14.pdf&embedded=true",
        views: 1089,
        downloads: 312
      },
      {
        id: "15",
        title: "粤港语文七年级现代文阅读技巧",
        subject: "语文",
        grade: "初中",
        type: "PDF",
        description: "针对粤港两地语文七年级现代文阅读的技巧和方法",
        download_url: "https://example.com/pdf15.pdf",
        voice_url: "https://example.com/voice15.mp3",
        preview_url: "https://docs.google.com/viewer?url=https://example.com/pdf15.pdf&embedded=true",
        views: 923,
        downloads: 267
      },

      // 视频资料
      {
        id: "16",
        title: "英语语法精讲（中粤英三语）",
        subject: "英语",
        grade: "初中",
        type: "视频",
        description: "英语常见语法点的中、英、粤三语讲解，帮助跨境学生理解语法规则",
        download_url: "https://example.com/video1.mp4",
        voice_url: "",
        preview_url: "",
        views: 2356,
        downloads: 568
      },
      {
        id: "17",
        title: "数学几何图形直观教学",
        subject: "数学",
        grade: "小学高年级",
        type: "视频",
        description: "通过直观演示帮助学生理解几何图形的概念和性质",
        download_url: "https://example.com/video2.mp4",
        voice_url: "",
        preview_url: "",
        views: 1892,
        downloads: 432
      },
      {
        id: "18",
        title: "语文作文写作技巧（中粤双语）",
        subject: "语文",
        grade: "初中",
        type: "视频",
        description: "中粤双语讲解语文作文写作技巧，帮助跨境学生提高写作能力",
        download_url: "https://example.com/video3.mp4",
        voice_url: "",
        preview_url: "",
        views: 1678,
        downloads: 398
      },
      {
        id: "19",
        title: "数学分数加减法直观教学",
        subject: "数学",
        grade: "小学低年级",
        type: "视频",
        description: "通过直观演示帮助学生理解分数加减法的概念和计算方法",
        download_url: "https://example.com/video4.mp4",
        voice_url: "",
        preview_url: "",
        views: 1456,
        downloads: 356
      },

      // 音频资料
      {
        id: "20",
        title: "粤语数学术语发音指南",
        subject: "数学",
        grade: "小学低年级",
        type: "音频",
        description: "常见数学术语的粤语发音和解释，帮助非粤语区学生适应香港教学环境",
        download_url: "https://example.com/audio1.mp3",
        voice_url: "https://example.com/audio1.mp3",
        preview_url: "",
        views: 1892,
        downloads: 782
      },
      {
        id: "21",
        title: "英语听力专项训练",
        subject: "英语",
        grade: "初中",
        type: "音频",
        description: "针对粤港两地英语听力题型的专项训练，提高听力理解能力",
        download_url: "https://example.com/audio2.mp3",
        voice_url: "https://example.com/audio2.mp3",
        preview_url: "",
        views: 2105,
        downloads: 645
      },
      {
        id: "22",
        title: "粤语语文古诗词朗读",
        subject: "语文",
        grade: "小学高年级",
        type: "音频",
        description: "常见古诗词的粤语朗读和解释，帮助学生理解古诗词内容",
        download_url: "https://example.com/audio3.mp3",
        voice_url: "https://example.com/audio3.mp3",
        preview_url: "",
        views: 1567,
        downloads: 489
      },
      {
        id: "23",
        title: "英语词汇发音练习",
        subject: "英语",
        grade: "小学低年级",
        type: "音频",
        description: "粤港两地小学低年级英语核心词汇的标准发音练习",
        download_url: "https://example.com/audio4.mp3",
        voice_url: "https://example.com/audio4.mp3",
        preview_url: "",
        views: 1789,
        downloads: 523
      },

      // PPT资料
      {
        id: "24",
        title: "物理力学知识点双语课件",
        subject: "物理",
        grade: "初中",
        type: "PPT",
        description: "初中物理力学部分的双语教学课件，包含中英对照的知识点讲解和例题",
        download_url: "https://example.com/ppt1.pptx",
        voice_url: "",
        preview_url: "",
        views: 956,
        downloads: 234
      },
      {
        id: "25",
        title: "化学元素周期表双语讲解",
        subject: "化学",
        grade: "初中",
        type: "PPT",
        description: "化学元素周期表的中英双语讲解，包含元素性质和应用的详细介绍",
        download_url: "https://example.com/ppt2.pptx",
        voice_url: "",
        preview_url: "",
        views: 1123,
        downloads: 289
      },
      {
        id: "26",
        title: "生物细胞结构双语课件",
        subject: "生物",
        grade: "初中",
        type: "PPT",
        description: "生物细胞结构的中英双语讲解，包含细胞各部分功能的详细介绍",
        download_url: "https://example.com/ppt3.pptx",
        voice_url: "",
        preview_url: "",
        views: 876,
        downloads: 213
      },
      {
        id: "27",
        title: "数学代数基础双语课件",
        subject: "数学",
        grade: "初中",
        type: "PPT",
        description: "初中数学代数基础的双语教学课件，包含中英对照的知识点讲解和例题",
        download_url: "https://example.com/ppt4.pptx",
        voice_url: "",
        preview_url: "",
        views: 1034,
        downloads: 276
      },
      {
        id: "28",
        title: "英语语法基础双语课件",
        subject: "英语",
        grade: "初中",
        type: "PPT",
        description: "初中英语语法基础的双语教学课件，包含中英对照的知识点讲解和例题",
        download_url: "https://example.com/ppt5.pptx",
        voice_url: "",
        preview_url: "",
        views: 1245,
        downloads: 321
      }
    ];

    var filteredData = [];
    for (var i = 0; i < materialData.length; i++) {
      var item = materialData[i];
      var subjectMatch = (currentSubject === '全部' || item.subject === currentSubject);
      var gradeMatch = (currentGrade === '全部年级' || item.grade === currentGrade);
      var typeMatch = (currentType === '全部类型' || item.type === currentType);

      if (subjectMatch && gradeMatch && typeMatch) {
        filteredData.push(item);
      }
    }

    this.setData({
      materials: filteredData,
      currentPage: 1
    });
  },

  switchSubject: function (e) {
    var subject = e.currentTarget.dataset.subject;
    this.setData({
      currentSubject: subject
    });
    this.filterMaterials();
  },

  switchGrade: function (e) {
    var grade = e.currentTarget.dataset.grade;
    this.setData({
      currentGrade: grade
    });
    this.filterMaterials();
  },

  // 预览PDF文档
  previewMaterial: function (e) {
    var item = e.currentTarget.dataset.item;
    wx.showToast({
      title: '正在打开预览...',
      icon: 'loading'
    });

    setTimeout(function () {
      // 在实际应用中，这里会使用wx.downloadFile和wx.openDocument来预览PDF
      wx.showModal({
        title: 'PDF预览',
        content: 'PDF文档预览功能已触发，实际应用中将打开完整的PDF文档',
        showCancel: false,
        confirmText: '确定'
      });
    }, 800);
  },

  downloadMaterial: function (e) {
    var item = e.currentTarget.dataset.item;
    wx.showToast({
      title: '开始下载...',
      icon: 'loading'
    });

    setTimeout(function () {
      wx.showToast({
        title: '下载完成',
        icon: 'success'
      });
    }, 1000);
  },

  playVoice: function (e) {
    var item = e.currentTarget.dataset.item;
    wx.showToast({
      title: '开始播放语音...',
      icon: 'loading'
    });

    var that = this;
    setTimeout(function () {
      // 检查语音URL是否存在
      if (!item.voice_url || item.voice_url === '#' || item.voice_url === 'https://example.com/voice1.mp3') {
        wx.showToast({
          title: '语音文件不存在',
          icon: 'none'
        });
        return;
      }

      // 检查innerAudioContext是否初始化
      if (that.innerAudioContext) {
        try {
          that.innerAudioContext.src = item.voice_url;
          that.innerAudioContext.play();
          wx.showToast({
            title: '语音播放中',
            icon: 'none'
          });
        } catch (error) {
          console.error('语音播放失败:', error);
          wx.showToast({
            title: '语音播放失败',
            icon: 'none'
          });
        }
      } else {
        wx.showToast({
          title: '音频播放器初始化失败',
          icon: 'none'
        });
      }
    }, 500);
  },

  onUnload: function () {
    if (this.innerAudioContext) {
      this.innerAudioContext.destroy();
    }
  },

  // 获取资料类型的图标类名
  getIconClass: function (type) {
    switch (type) {
      case 'PDF':
        return 'pdf';
      case '视频':
        return 'video';
      case '音频':
        return 'audio';
      case 'PPT':
        return 'ppt';
      default:
        return '';
    }
  },

  // 获取资料类型的图标
  getIcon: function (type) {
    switch (type) {
      case 'PDF':
        return '📄';
      case '视频':
        return '🎬';
      case '音频':
        return '🎵';
      case 'PPT':
        return '📊';
      default:
        return '📄';
    }
  },

  // 获取资料类型的样式类名
  getTypeClass: function (type) {
    switch (type) {
      case 'PDF':
        return 'pdf';
      case '视频':
        return 'video';
      case '音频':
        return 'audio';
      case 'PPT':
        return 'ppt';
      default:
        return '';
    }
  },

  // 预览资料
  previewMaterial: function (e) {
    var item = e.currentTarget.dataset.item;
    wx.showToast({
      title: '正在打开预览...',
      icon: 'loading'
    });

    setTimeout(function () {
      wx.showModal({
        title: '预览资料',
        content: '资料预览功能已触发，实际应用中将打开完整的资料内容',
        showCancel: false,
        confirmText: '确定'
      });
    }, 800);
  },

  // 下载资料
  downloadMaterial: function (e) {
    var item = e.currentTarget.dataset.item;
    wx.showToast({
      title: '开始下载...',
      icon: 'loading'
    });

    setTimeout(function () {
      wx.showToast({
        title: '下载完成',
        icon: 'success'
      });
    }, 1000);
  },

  // 播放音频
  playAudio: function (e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      showAudioPlayer: true,
      currentAudio: item,
      isPlaying: true
    });
  },

  // 切换播放状态
  togglePlay: function () {
    this.setData({
      isPlaying: !this.data.isPlaying
    });
  },

  // 隐藏音频播放器
  hideAudioPlayer: function () {
    this.setData({
      showAudioPlayer: false,
      isPlaying: false
    });
  },

  // 上一页
  prevPage: function () {
    if (this.data.currentPage > 1) {
      this.setData({
        currentPage: this.data.currentPage - 1
      });
    }
  },

  // 下一页
  nextPage: function () {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
    }
  },

  // 跳转到指定页面
  goToPage: function (e) {
    var page = e.currentTarget.dataset.page;
    this.setData({
      currentPage: page
    });
  },

  // tabBar 更新回调
  onTabBarUpdate: function () {
    console.log('辅导资料页面 tabBar 更新');
  }
});