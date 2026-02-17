// index.js
Page({
  data: {
    questions: [],
    currentQuestion: 0,
    selectedOptions: [],
    showResult: false,
    score: 0,
    masteryRate: 0,
    feedback: ""
  },

  onLoad: function () {
    this.initQuestions();
  },

  initQuestions: function () {
    var testData = [
      {
        id: "1",
        question: "下列哪个是分数？",
        options: ["123", "0.5", "1/2", "2"],
        answer: "2",
        knowledge_point: "分数的初步认识",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "2",
        question: "长方形的面积计算公式是？",
        options: ["长 + 宽", "长 × 宽", "长 - 宽", "长 ÷ 宽"],
        answer: "1",
        knowledge_point: "长方形和正方形的面积",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "3",
        question: "下列哪个是小数？",
        options: ["1/2", "3", "0.75", "5/4"],
        answer: "2",
        knowledge_point: "小数的初步认识",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "4",
        question: "下列哪个是百分数？",
        options: ["0.5", "1/2", "50%", "5"],
        answer: "2",
        knowledge_point: "百分数的初步认识",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "5",
        question: "下列哪个拼音是声母？",
        options: ["a", "o", "e", "b"],
        answer: "3",
        knowledge_point: "汉语拼音的复习",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "6",
        question: "下列哪个是完整的句子？",
        options: ["在教室里", "小明学习", "认真地", "小明在教室里认真学习"],
        answer: "3",
        knowledge_point: "句子的理解和运用",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "7",
        question: "下列哪个是正确的英语问候语？",
        options: ["Hello, my name is Tom.", "I am a student.", "You are a teacher.", "He is my friend."],
        answer: "0",
        knowledge_point: "基础词汇和句型",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "8",
        question: "下列哪个是正确的英语语法？",
        options: ["I is a student.", "You is a teacher.", "He is my friend.", "She are my sister."],
        answer: "2",
        knowledge_point: "英语语法基础",
        grade: "三年级",
        subject: "英语"
      }
    ];

    var selectedOptions = [];
    for (var i = 0; i < testData.length; i++) {
      selectedOptions.push(null);
    }

    this.setData({
      questions: testData,
      selectedOptions: selectedOptions
    });
  },

  selectOption: function (e) {
    var index = e.currentTarget.dataset.index;
    var selectedOptions = [];
    for (var i = 0; i < this.data.selectedOptions.length; i++) {
      selectedOptions.push(this.data.selectedOptions[i]);
    }
    selectedOptions[this.data.currentQuestion] = index;

    this.setData({
      selectedOptions: selectedOptions
    });
  },

  prevQuestion: function () {
    if (this.data.currentQuestion > 0) {
      this.setData({
        currentQuestion: this.data.currentQuestion - 1
      });
    }
  },

  nextQuestion: function () {
    if (this.data.currentQuestion < this.data.questions.length - 1) {
      this.setData({
        currentQuestion: this.data.currentQuestion + 1
      });
    }
  },

  jumpToQuestion: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentQuestion: index
    });
  },

  submitTest: function () {
    var score = 0;
    for (var i = 0; i < this.data.questions.length; i++) {
      if (this.data.selectedOptions[i] == this.data.questions[i].answer) {
        score++;
      }
    }

    var masteryRate = Math.round((score / this.data.questions.length) * 100);

    var feedback = "";
    if (masteryRate >= 80) {
      feedback = "恭喜你！你对知识点的掌握情况良好，继续保持。";
    } else if (masteryRate >= 60) {
      feedback = "你对知识点有一定的掌握，但仍需加强练习。建议重点关注错题涉及的知识点。";
    } else {
      feedback = "你对知识点的掌握情况有待提高，建议系统复习相关知识点，并多做练习。";
    }

    this.setData({
      showResult: true,
      score: score,
      masteryRate: masteryRate,
      feedback: feedback
    });
  },

  retryTest: function () {
    var selectedOptions = [];
    for (var i = 0; i < this.data.questions.length; i++) {
      selectedOptions.push(null);
    }

    this.setData({
      showResult: false,
      currentQuestion: 0,
      selectedOptions: selectedOptions,
      score: 0,
      masteryRate: 0,
      feedback: ""
    });
  },

  finishTest: function () {
    wx.navigateBack();
  },

  // tabBar 更新回调
  onTabBarUpdate: function () {
    console.log('测试页面 tabBar 更新');
  }
});