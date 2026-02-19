// index.js
Page({
  data: {
    questions: [],
    currentQuestion: 0,
    selectedOptions: [],
    showResult: false,
    showTest: false,
    score: undefined,
    totalScore: 100,
    masteryRate: 0,
    feedback: "",
    grades: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "八年级", "九年级"],
    allSubjects: ["数学", "语文", "英语", "物理", "化学", "生物"],
    subjects: ["数学", "语文", "英语"],
    gradeIndex: -1,
    subjectIndex: -1,
    masteryItems: []
  },

  onLoad: function () {
    this.initQuestions();
  },

  onShow: function () {
    this.initQuestions();
  },

  bindGradeChange: function (e) {
    var gradeIndex = parseInt(e.detail.value);
    var grade = this.data.grades[gradeIndex];
    var subjects = [];
    
    if (gradeIndex <= 5) {
      subjects = ["数学", "语文", "英语"];
    } else {
      subjects = ["数学", "语文", "英语", "物理", "化学", "生物"];
    }
    
    this.setData({
      gradeIndex: gradeIndex,
      subjects: subjects,
      subjectIndex: -1,
      showTest: false,
      showResult: false,
      questions: [],
      selectedOptions: [],
      currentQuestion: 0,
      score: undefined,
      masteryRate: 0,
      feedback: "",
      masteryItems: []
    });
  },

  bindSubjectChange: function (e) {
    this.setData({
      subjectIndex: parseInt(e.detail.value),
      showTest: false,
      showResult: false,
      questions: [],
      selectedOptions: [],
      currentQuestion: 0,
      score: undefined,
      masteryRate: 0,
      feedback: "",
      masteryItems: []
    });
  },

  startTest: function () {
    if (this.data.gradeIndex === -1) {
      wx.showToast({
        title: '请选择年级',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (this.data.subjectIndex === -1) {
      wx.showToast({
        title: '请选择科目',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    var selectedGrade = this.data.grades[this.data.gradeIndex];
    var selectedSubject = this.data.subjects[this.data.subjectIndex];
    
    this.filterQuestions(selectedGrade, selectedSubject);
    
    this.setData({
      showTest: true
    });
  },

  filterQuestions: function (grade, subject) {
    var allQuestions = [
      {
        id: "1",
        question: "1 + 2 = ?",
        options: ["2", "3", "4", "5"],
        answer: "1",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "2",
        question: "5 - 3 = ?",
        options: ["1", "2", "3", "4"],
        answer: "1",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "3",
        question: "3 + 4 = ?",
        options: ["6", "7", "8", "9"],
        answer: "1",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "4",
        question: "8 - 5 = ?",
        options: ["2", "3", "4", "5"],
        answer: "1",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "5",
        question: "4 + 6 = ?",
        options: ["8", "9", "10", "11"],
        answer: "2",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "6",
        question: "9 - 2 = ?",
        options: ["6", "7", "8", "9"],
        answer: "1",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "7",
        question: "5 + 5 = ?",
        options: ["8", "9", "10", "11"],
        answer: "2",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "8",
        question: "10 - 3 = ?",
        options: ["6", "7", "8", "9"],
        answer: "1",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "9",
        question: "7 + 3 = ?",
        options: ["8", "9", "10", "11"],
        answer: "2",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "10",
        question: "15 - 7 = ?",
        options: ["6", "7", "8", "9"],
        answer: "2",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "11",
        question: "6 + 4 = ?",
        options: ["8", "9", "10", "11"],
        answer: "2",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "12",
        question: "12 - 5 = ?",
        options: ["6", "7", "8", "9"],
        answer: "1",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "13",
        question: "8 + 2 = ?",
        options: ["8", "9", "10", "11"],
        answer: "2",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "14",
        question: "14 - 6 = ?",
        options: ["6", "7", "8", "9"],
        answer: "2",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "15",
        question: "9 + 3 = ?",
        options: ["10", "11", "12", "13"],
        answer: "2",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "16",
        question: "16 - 8 = ?",
        options: ["6", "7", "8", "9"],
        answer: "2",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "17",
        question: "5 + 7 = ?",
        options: ["10", "11", "12", "13"],
        answer: "2",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "18",
        question: "18 - 9 = ?",
        options: ["6", "7", "8", "9"],
        answer: "3",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "19",
        question: "4 + 8 = ?",
        options: ["10", "11", "12", "13"],
        answer: "1",
        knowledge_point: "加法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "20",
        question: "13 - 4 = ?",
        options: ["7", "8", "9", "10"],
        answer: "1",
        knowledge_point: "减法运算",
        grade: "一年级",
        subject: "数学"
      },
      {
        id: "21",
        question: "2 × 3 = ?",
        options: ["5", "6", "7", "8"],
        answer: "1",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "22",
        question: "12 ÷ 4 = ?",
        options: ["2", "3", "4", "5"],
        answer: "1",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "23",
        question: "3 × 4 = ?",
        options: ["10", "11", "12", "13"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "24",
        question: "16 ÷ 2 = ?",
        options: ["6", "7", "8", "9"],
        answer: "2",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "25",
        question: "5 × 6 = ?",
        options: ["28", "29", "30", "31"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "26",
        question: "24 ÷ 3 = ?",
        options: ["6", "7", "8", "9"],
        answer: "1",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "27",
        question: "4 × 7 = ?",
        options: ["26", "27", "28", "29"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "28",
        question: "18 ÷ 2 = ?",
        options: ["7", "8", "9", "10"],
        answer: "2",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "29",
        question: "6 × 8 = ?",
        options: ["46", "47", "48", "49"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "30",
        question: "36 ÷ 4 = ?",
        options: ["7", "8", "9", "10"],
        answer: "2",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "31",
        question: "5 × 9 = ?",
        options: ["43", "44", "45", "46"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "32",
        question: "45 ÷ 5 = ?",
        options: ["7", "8", "9", "10"],
        answer: "2",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "33",
        question: "7 × 8 = ?",
        options: ["54", "55", "56", "57"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "34",
        question: "56 ÷ 7 = ?",
        options: ["6", "7", "8", "9"],
        answer: "2",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "35",
        question: "6 × 6 = ?",
        options: ["34", "35", "36", "37"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "36",
        question: "49 ÷ 7 = ?",
        options: ["5", "6", "7", "8"],
        answer: "2",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "37",
        question: "8 × 9 = ?",
        options: ["70", "71", "72", "73"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "38",
        question: "63 ÷ 9 = ?",
        options: ["5", "6", "7", "8"],
        answer: "2",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "39",
        question: "9 × 9 = ?",
        options: ["79", "80", "81", "82"],
        answer: "2",
        knowledge_point: "乘法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "40",
        question: "81 ÷ 9 = ?",
        options: ["7", "8", "9", "10"],
        answer: "2",
        knowledge_point: "除法运算",
        grade: "二年级",
        subject: "数学"
      },
      {
        id: "41",
        question: "下列哪个是分数？",
        options: ["123", "0.5", "1/2", "2"],
        answer: "2",
        knowledge_point: "分数的初步认识",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "42",
        question: "长方形的面积计算公式是？",
        options: ["长 + 宽", "长 × 宽", "长 - 宽", "长 ÷ 宽"],
        answer: "1",
        knowledge_point: "长方形和正方形的面积",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "43",
        question: "下列哪个是小数？",
        options: ["1/2", "3", "0.75", "5/4"],
        answer: "2",
        knowledge_point: "小数的初步认识",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "44",
        question: "下列哪个是百分数？",
        options: ["0.5", "1/2", "50%", "5"],
        answer: "2",
        knowledge_point: "百分数的初步认识",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "45",
        question: "1/2 + 1/2 = ?",
        options: ["1/4", "1", "2/4", "2"],
        answer: "1",
        knowledge_point: "分数的加减法",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "46",
        question: "正方形的面积计算公式是？",
        options: ["边长 × 边长", "边长 + 边长", "边长 × 4", "边长 ÷ 2"],
        answer: "0",
        knowledge_point: "正方形的面积",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "47",
        question: "0.5 + 0.3 = ?",
        options: ["0.2", "0.8", "0.15", "0.53"],
        answer: "1",
        knowledge_point: "小数的加减法",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "48",
        question: "25% 等于多少？",
        options: ["0.25", "2.5", "25", "1/4"],
        answer: "0",
        knowledge_point: "百分数的转换",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "49",
        question: "一个长方形长5cm，宽3cm，面积是多少？",
        options: ["8cm²", "15cm²", "16cm²", "2cm²"],
        answer: "1",
        knowledge_point: "长方形面积的应用",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "50",
        question: "3/4 和 0.75 哪个大？",
        options: ["3/4大", "0.75大", "一样大", "无法比较"],
        answer: "2",
        knowledge_point: "分数和小数的比较",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "51",
        question: "100的10%是多少？",
        options: ["10", "1", "100", "1000"],
        answer: "0",
        knowledge_point: "百分数的计算",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "52",
        question: "1/3 + 1/3 = ?",
        options: ["1/6", "2/3", "2/6", "1/9"],
        answer: "1",
        knowledge_point: "分数的加减法",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "53",
        question: "0.9 - 0.4 = ?",
        options: ["0.5", "0.13", "0.45", "0.95"],
        answer: "0",
        knowledge_point: "小数的减法",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "54",
        question: "1/4 + 1/2 = ?",
        options: ["1/6", "3/4", "2/6", "1/8"],
        answer: "1",
        knowledge_point: "分数的加减法",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "55",
        question: "0.6 + 0.4 = ?",
        options: ["0.2", "1.0", "0.10", "0.24"],
        answer: "1",
        knowledge_point: "小数的加减法",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "56",
        question: "50% 等于多少？",
        options: ["0.5", "5", "50", "1/2"],
        answer: "0",
        knowledge_point: "百分数的转换",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "57",
        question: "1/5 + 2/5 = ?",
        options: ["1/10", "3/5", "2/10", "3/10"],
        answer: "1",
        knowledge_point: "分数的加减法",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "58",
        question: "0.8 - 0.3 = ?",
        options: ["0.5", "0.11", "0.24", "0.83"],
        answer: "0",
        knowledge_point: "小数的减法",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "59",
        question: "200的25%是多少？",
        options: ["25", "50", "75", "100"],
        answer: "1",
        knowledge_point: "百分数的计算",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "60",
        question: "一个正方形边长4cm，面积是多少？",
        options: ["8cm²", "12cm²", "16cm²", "20cm²"],
        answer: "2",
        knowledge_point: "正方形面积的应用",
        grade: "三年级",
        subject: "数学"
      },
      {
        id: "61",
        question: "下列哪个是四位数？",
        options: ["999", "1000", "100", "99"],
        answer: "1",
        knowledge_point: "数的认识",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "62",
        question: "2345 + 1234 = ?",
        options: ["3579", "3589", "3479", "3679"],
        answer: "0",
        knowledge_point: "多位数的加法",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "63",
        question: "5678 - 2345 = ?",
        options: ["3333", "3233", "3433", "3313"],
        answer: "0",
        knowledge_point: "多位数的减法",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "64",
        question: "123 × 4 = ?",
        options: ["482", "492", "472", "502"],
        answer: "1",
        knowledge_point: "三位数乘一位数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "65",
        question: "456 ÷ 4 = ?",
        options: ["114", "124", "104", "134"],
        answer: "0",
        knowledge_point: "三位数除一位数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "66",
        question: "1千米等于多少米？",
        options: ["100米", "1000米", "10000米", "10米"],
        answer: "1",
        knowledge_point: "长度单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "67",
        question: "1千克等于多少克？",
        options: ["100克", "1000克", "10000克", "10克"],
        answer: "1",
        knowledge_point: "质量单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "68",
        question: "一个三角形的面积是底×高÷2，底是6cm，高是4cm，面积是多少？",
        options: ["24cm²", "12cm²", "10cm²", "48cm²"],
        answer: "1",
        knowledge_point: "三角形面积的计算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "69",
        question: "下列哪个是锐角？",
        options: ["90度", "120度", "45度", "180度"],
        answer: "2",
        knowledge_point: "角的分类",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "70",
        question: "3.5 + 2.6 = ?",
        options: ["5.11", "6.1", "5.1", "6.11"],
        answer: "1",
        knowledge_point: "小数的加法",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "71",
        question: "7.8 - 3.5 = ?",
        options: ["4.3", "4.13", "3.3", "5.3"],
        answer: "0",
        knowledge_point: "小数的减法",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "72",
        question: "2.5 × 4 = ?",
        options: ["10", "100", "1", "25"],
        answer: "0",
        knowledge_point: "小数乘整数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "73",
        question: "12.6 ÷ 3 = ?",
        options: ["4.2", "42", "0.42", "4.02"],
        answer: "0",
        knowledge_point: "小数除整数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "74",
        question: "1/2 + 1/3 = ?",
        options: ["2/5", "5/6", "1/6", "2/6"],
        answer: "1",
        knowledge_point: "异分母分数加法",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "75",
        question: "3/4 - 1/4 = ?",
        options: ["2/4", "1/2", "1/4", "2/8"],
        answer: "0",
        knowledge_point: "同分母分数减法",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "76",
        question: "50的20%是多少？",
        options: ["10", "20", "5", "100"],
        answer: "0",
        knowledge_point: "百分数的应用",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "77",
        question: "0.25等于多少百分数？",
        options: ["2.5%", "25%", "0.25%", "250%"],
        answer: "1",
        knowledge_point: "小数转百分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "78",
        question: "1.25等于多少分数？",
        options: ["1/4", "5/4", "1/25", "25/4"],
        answer: "1",
        knowledge_point: "小数转分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "79",
        question: "下列哪个是质数？",
        options: ["4", "6", "7", "9"],
        answer: "2",
        knowledge_point: "质数和合数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "80",
        question: "1升等于多少毫升？",
        options: ["100毫升", "1000毫升", "10000毫升", "10毫升"],
        answer: "1",
        knowledge_point: "容积单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "81",
        question: "2.5 × 3.2 = ?",
        options: ["7.5", "8.0", "8.5", "9.0"],
        answer: "1",
        knowledge_point: "小数乘小数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "82",
        question: "7.2 ÷ 0.8 = ?",
        options: ["8", "9", "10", "11"],
        answer: "1",
        knowledge_point: "小数除小数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "83",
        question: "一个圆的面积公式是？",
        options: ["πr", "2πr", "πr²", "2πr²"],
        answer: "2",
        knowledge_point: "圆的面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "84",
        question: "一个梯形的面积公式是？",
        options: ["(上底+下底)×高", "(上底+下底)×高÷2", "(上底+下底)÷高", "上底×下底×高"],
        answer: "1",
        knowledge_point: "梯形的面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "85",
        question: "3/5 × 2/3 = ?",
        options: ["6/15", "2/5", "1/5", "5/6"],
        answer: "1",
        knowledge_point: "分数乘法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "86",
        question: "4/5 ÷ 2/3 = ?",
        options: ["6/5", "8/15", "2/5", "12/5"],
        answer: "0",
        knowledge_point: "分数除法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "87",
        question: "一个长方体的体积公式是？",
        options: ["长+宽+高", "长×宽+高", "长×宽×高", "(长+宽)×高"],
        answer: "2",
        knowledge_point: "长方体的体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "88",
        question: "一个正方体的体积公式是？",
        options: ["边长×6", "边长×4", "边长³", "边长²"],
        answer: "2",
        knowledge_point: "正方体的体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "89",
        question: "1.2 × 0.5 = ?",
        options: ["0.5", "0.6", "0.7", "0.8"],
        answer: "1",
        knowledge_point: "小数乘小数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "90",
        question: "6.3 ÷ 0.9 = ?",
        options: ["6", "7", "8", "9"],
        answer: "1",
        knowledge_point: "小数除小数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "91",
        question: "圆的周长公式是？",
        options: ["πr", "2πr", "πr²", "2πr²"],
        answer: "1",
        knowledge_point: "圆的周长",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "92",
        question: "2/3 × 3/4 = ?",
        options: ["6/12", "1/2", "5/7", "9/8"],
        answer: "1",
        knowledge_point: "分数乘法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "93",
        question: "5/6 ÷ 5/8 = ?",
        options: ["4/3", "25/48", "1/3", "3/4"],
        answer: "0",
        knowledge_point: "分数除法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "94",
        question: "一个圆柱的体积公式是？",
        options: ["πr²h", "2πrh", "πrh", "2πr²"],
        answer: "0",
        knowledge_point: "圆柱的体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "95",
        question: "3.6 × 2.5 = ?",
        options: ["8.0", "9.0", "9.5", "10.0"],
        answer: "1",
        knowledge_point: "小数乘小数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "96",
        question: "8.4 ÷ 1.2 = ?",
        options: ["6", "7", "8", "9"],
        answer: "1",
        knowledge_point: "小数除小数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "97",
        question: "4/7 × 7/8 = ?",
        options: ["28/56", "1/2", "11/15", "32/49"],
        answer: "1",
        knowledge_point: "分数乘法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "98",
        question: "3/4 ÷ 1/2 = ?",
        options: ["3/8", "3/2", "1/2", "2/3"],
        answer: "1",
        knowledge_point: "分数除法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "99",
        question: "一个圆锥的体积公式是？",
        options: ["πr²h", "1/3πr²h", "2πrh", "1/2πr²h"],
        answer: "1",
        knowledge_point: "圆锥的体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "100",
        question: "4.8 ÷ 0.6 = ?",
        options: ["6", "7", "8", "9"],
        answer: "2",
        knowledge_point: "小数除小数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "101",
        question: "一个数的3/4是12，这个数是多少？",
        options: ["12", "14", "16", "18"],
        answer: "2",
        knowledge_point: "分数除法应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "102",
        question: "比的基本性质是？",
        options: ["前项和后项同时乘或除以相同的数，比值不变", "前项和后项同时加上相同的数，比值不变", "前项和后项同时减去相同的数，比值不变", "前项和后项同时乘或除以不同的数，比值不变"],
        answer: "0",
        knowledge_point: "比的基本性质",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "103",
        question: "化简比12:18的结果是？",
        options: ["2:3", "3:2", "6:9", "4:6"],
        answer: "0",
        knowledge_point: "比的化简",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "104",
        question: "圆的面积公式中，π约等于？",
        options: ["3.14", "3.15", "3.16", "3.13"],
        answer: "0",
        knowledge_point: "圆周率",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "105",
        question: "一个圆的半径是3cm，面积是多少？",
        options: ["9πcm²", "18πcm²", "27πcm²", "36πcm²"],
        answer: "0",
        knowledge_point: "圆的面积计算",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "106",
        question: "百分数化小数，75%等于？",
        options: ["0.075", "0.75", "7.5", "75"],
        answer: "1",
        knowledge_point: "百分数化小数",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "107",
        question: "小数化百分数，0.6等于？",
        options: ["0.6%", "6%", "60%", "600%"],
        answer: "2",
        knowledge_point: "小数化百分数",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "108",
        question: "比例尺1:100表示？",
        options: ["图上1厘米代表实际100厘米", "图上100厘米代表实际1厘米", "图上1厘米代表实际100米", "图上100厘米代表实际1米"],
        answer: "0",
        knowledge_point: "比例尺",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "109",
        question: "一个圆柱的底面半径是2cm，高是5cm，体积是多少？",
        options: ["20πcm³", "25πcm³", "30πcm³", "35πcm³"],
        answer: "0",
        knowledge_point: "圆柱的体积计算",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "110",
        question: "一个圆锥的底面半径是3cm，高是4cm，体积是多少？",
        options: ["12πcm³", "18πcm³", "24πcm³", "36πcm³"],
        answer: "0",
        knowledge_point: "圆锥的体积计算",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "111",
        question: "统计图中，能清楚地看出各部分数量占总数量的百分比的是？",
        options: ["条形统计图", "折线统计图", "扇形统计图", "柱状统计图"],
        answer: "2",
        knowledge_point: "统计图的选择",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "112",
        question: "负数小于0，正数大于0，0是？",
        options: ["正数", "负数", "既不是正数也不是负数", "既是正数也是负数"],
        answer: "2",
        knowledge_point: "正负数的认识",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "113",
        question: "|-5|等于？",
        options: ["-5", "5", "0", "10"],
        answer: "1",
        knowledge_point: "绝对值",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "114",
        question: "一个数的倒数是3/5，这个数是？",
        options: ["3/5", "5/3", "1/5", "1/3"],
        answer: "1",
        knowledge_point: "倒数",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "115",
        question: "解方程3x + 5 = 14，x等于？",
        options: ["2", "3", "4", "5"],
        answer: "1",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "116",
        question: "甲数是乙数的4/5，乙数是甲数的？",
        options: ["4/5", "5/4", "1/5", "1/4"],
        answer: "1",
        knowledge_point: "分数应用题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "117",
        question: "一个圆的直径是10cm，周长是多少？",
        options: ["5πcm", "10πcm", "15πcm", "20πcm"],
        answer: "1",
        knowledge_point: "圆的周长计算",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "118",
        question: "长方体的表面积公式是？",
        options: ["(长+宽+高)×6", "(长×宽+长×高+宽×高)×2", "长×宽×高", "(长+宽)×高×2"],
        answer: "1",
        knowledge_point: "长方体的表面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "119",
        question: "正方体的表面积公式是？",
        options: ["边长×6", "边长²×6", "边长³×6", "边长×4"],
        answer: "1",
        knowledge_point: "正方体的表面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "120",
        question: "一个数增加20%后是60，这个数是？",
        options: ["40", "45", "50", "55"],
        answer: "2",
        knowledge_point: "百分数应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "121",
        question: "下列哪个是声母？",
        options: ["a", "o", "e", "b"],
        answer: "3",
        knowledge_point: "汉语拼音的声母",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "122",
        question: "下列哪个是韵母？",
        options: ["b", "p", "m", "a"],
        answer: "3",
        knowledge_point: "汉语拼音的韵母",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "123",
        question: "下列哪个是整体认读音节？",
        options: ["zhi", "chi", "shi", "yi"],
        answer: "3",
        knowledge_point: "汉语拼音的整体认读音节",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "124",
        question: "下列哪个字是独体字？",
        options: ["明", "林", "日", "好"],
        answer: "2",
        knowledge_point: "汉字的结构",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "125",
        question: "下列哪个是正确的笔画顺序？",
        options: ["先横后竖", "先竖后横", "先撇后捺", "以上都对"],
        answer: "3",
        knowledge_point: "汉字的笔画顺序",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "126",
        question: "下列哪个词语是名词？",
        options: ["跑", "快", "书", "很"],
        answer: "2",
        knowledge_point: "词语的词性",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "127",
        question: "下列哪个是完整的句子？",
        options: ["在教室里", "小明学习", "认真地", "小明在教室里认真学习"],
        answer: "3",
        knowledge_point: "句子的完整性",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "128",
        question: "下列哪个是量词？",
        options: ["一", "个", "书", "看"],
        answer: "1",
        knowledge_point: "量词的运用",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "129",
        question: "下列哪个字是左右结构？",
        options: ["日", "月", "明", "天"],
        answer: "2",
        knowledge_point: "汉字的结构",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "130",
        question: "下列哪个是动词？",
        options: ["苹果", "跑", "红", "美丽"],
        answer: "1",
        knowledge_point: "词语的词性",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "131",
        question: "下列哪个是形容词？",
        options: ["吃", "美丽", "书", "桌子"],
        answer: "1",
        knowledge_point: "词语的词性",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "132",
        question: "下列哪个是正确的标点符号用法？",
        options: ["你好。", "你好,", "你好!", "以上都对"],
        answer: "3",
        knowledge_point: "标点符号的运用",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "133",
        question: "下列哪个是反义词？",
        options: ["大-小", "大-多", "大-高", "大-长"],
        answer: "0",
        knowledge_point: "反义词",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "134",
        question: "下列哪个是近义词？",
        options: ["大-小", "大-巨", "大-多", "大-高"],
        answer: "1",
        knowledge_point: "近义词",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "135",
        question: "下列哪个字是上下结构？",
        options: ["明", "好", "花", "林"],
        answer: "2",
        knowledge_point: "汉字的结构",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "136",
        question: "下列哪个是正确的句子？",
        options: ["我吃苹果", "我苹果吃", "吃我苹果", "苹果我吃"],
        answer: "0",
        knowledge_point: "句子的语序",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "137",
        question: "下列哪个是正确的词语搭配？",
        options: ["跑得快", "跑得美丽", "跑得书", "跑得桌子"],
        answer: "0",
        knowledge_point: "词语的搭配",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "138",
        question: "下列哪个是正确的笔画数？",
        options: ["一画", "二画", "三画", "以上都对"],
        answer: "3",
        knowledge_point: "汉字的笔画",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "139",
        question: "下列哪个是正确的拼音？",
        options: ["bā", "bá", "bà", "以上都对"],
        answer: "3",
        knowledge_point: "汉语拼音的声调",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "140",
        question: "下列哪个是正确的词语？",
        options: ["苹果", "平果", "苹菓", "平菓"],
        answer: "0",
        knowledge_point: "词语的书写",
        grade: "一年级",
        subject: "语文"
      },
      {
        id: "141",
        question: "下列哪个是ABB式词语？",
        options: ["高兴", "红彤彤", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "142",
        question: "下列哪个句子使用了比喻？",
        options: ["小明在看书", "太阳像个大火球", "今天天气很好", "我喜欢吃苹果"],
        answer: "1",
        knowledge_point: "修辞手法的运用",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "143",
        question: "下列哪个是陈述句？",
        options: ["你吃饭了吗？", "请把门关上", "今天天气真好", "多么美丽的花朵啊"],
        answer: "2",
        knowledge_point: "句子的理解和运用",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "144",
        question: "下列哪个是AABB式词语？",
        options: ["高兴", "欢欢喜喜", "打扫打扫", "生机勃勃"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "145",
        question: "下列哪个句子使用了拟人？",
        options: ["小鸟在唱歌", "小鸟在飞", "小鸟很可爱", "小鸟在树上"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "146",
        question: "下列哪个是疑问句？",
        options: ["你吃饭了吗？", "今天天气真好", "请把门关上", "多么美丽的花朵啊"],
        answer: "0",
        knowledge_point: "句子的理解和运用",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "147",
        question: "下列哪个是ABAB式词语？",
        options: ["高兴", "打扫打扫", "生机勃勃", "恋恋不舍"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "148",
        question: "下列哪个是正确的词语搭配？",
        options: ["认真地学习", "认真地美丽", "认真地苹果", "认真地快乐"],
        answer: "0",
        knowledge_point: "词语的搭配",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "149",
        question: "下列哪个是感叹句？",
        options: ["你吃饭了吗？", "今天天气真好", "请把门关上", "多么美丽的花朵啊"],
        answer: "3",
        knowledge_point: "句子的理解和运用",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "150",
        question: "下列哪个是ABAC式词语？",
        options: ["高兴", "全心全意", "亮晶晶", "欢欢喜喜"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "151",
        question: "下列哪个是祈使句？",
        options: ["你吃饭了吗？", "今天天气真好", "请把门关上", "多么美丽的花朵啊"],
        answer: "2",
        knowledge_point: "句子的理解和运用",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "152",
        question: "下列哪个是AABC式词语？",
        options: ["高兴", "心心相印", "全心全意", "亮晶晶"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "153",
        question: "下列哪个是正确的句子？",
        options: ["他高兴地唱起了歌", "他高兴唱起了歌", "他高兴地唱起歌", "他高兴唱起歌"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "154",
        question: "下列哪个是ABCC式词语？",
        options: ["高兴", "得意洋洋", "心心相印", "全心全意"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "155",
        question: "下列哪个是正确的标点符号？",
        options: ["你好。", "你好,", "你好!", "以上都对"],
        answer: "3",
        knowledge_point: "标点符号的运用",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "156",
        question: "下列哪个是成语？",
        options: ["高兴", "欢天喜地", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "成语的认识",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "157",
        question: "下列哪个是正确的词语？",
        options: ["我们在图书馆里看书", "我们图书馆里看书", "我们在看书图书馆里", "我们看书在图书馆里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "158",
        question: "下列哪个是反义词？",
        options: ["大-小", "大-多", "大-高", "大-长"],
        answer: "0",
        knowledge_point: "反义词",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "159",
        question: "下列哪个是近义词？",
        options: ["大-小", "大-巨", "大-多", "大-高"],
        answer: "1",
        knowledge_point: "近义词",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "160",
        question: "下列哪个是正确的句子？",
        options: ["我们在操场上跑步", "我们操场上跑步", "我们在跑步操场上", "我们跑步在操场上"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "二年级",
        subject: "语文"
      },
      {
        id: "161",
        question: "下列哪个拼音是声母？",
        options: ["a", "o", "e", "b"],
        answer: "3",
        knowledge_point: "汉语拼音的复习",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "162",
        question: "下列哪个是韵母？",
        options: ["b", "p", "m", "a"],
        answer: "3",
        knowledge_point: "汉语拼音的复习",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "163",
        question: "下列哪个是整体认读音节？",
        options: ["zhi", "chi", "shi", "yi"],
        answer: "3",
        knowledge_point: "汉语拼音的复习",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "164",
        question: "下列哪个词语书写正确？",
        options: ["苹果", "平果", "苹菓", "平菓"],
        answer: "0",
        knowledge_point: "词语的书写",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "165",
        question: "下列哪个句子使用了比喻？",
        options: ["小明在看书", "太阳像个大火球", "今天天气很好", "我喜欢吃苹果"],
        answer: "1",
        knowledge_point: "修辞手法的运用",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "166",
        question: "下列哪个是反义词？",
        options: ["大-小", "大-多", "大-高", "大-长"],
        answer: "0",
        knowledge_point: "词语的理解",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "167",
        question: "下列哪个句子是陈述句？",
        options: ["你吃饭了吗？", "请把门关上", "今天天气真好", "多么美丽的花朵啊"],
        answer: "2",
        knowledge_point: "句子的理解和运用",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "168",
        question: "下列哪个词语是ABB式？",
        options: ["高兴", "红彤彤", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "169",
        question: "下列哪个是量词？",
        options: ["一", "个", "书", "看"],
        answer: "1",
        knowledge_point: "量词的运用",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "170",
        question: "下列哪个句子使用了拟人？",
        options: ["小鸟在唱歌", "小鸟在飞", "小鸟很可爱", "小鸟在树上"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "171",
        question: "下列哪个是近义词？",
        options: ["大-小", "大-巨", "大-多", "大-高"],
        answer: "1",
        knowledge_point: "词语的理解",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "172",
        question: "下列哪个是正确的句子？",
        options: ["他认真地思考问题", "他认真思考问题", "他认真地问题", "他认真问题"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "173",
        question: "下列哪个词语是AABB式？",
        options: ["高兴", "欢欢喜喜", "打扫打扫", "生机勃勃"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "174",
        question: "下列哪个是成语？",
        options: ["高兴", "欢天喜地", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "成语的认识",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "175",
        question: "下列哪个是正确的词语搭配？",
        options: ["认真地学习", "认真地美丽", "认真地苹果", "认真地快乐"],
        answer: "0",
        knowledge_point: "词语的搭配",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "176",
        question: "下列哪个词语是ABAB式？",
        options: ["高兴", "打扫打扫", "生机勃勃", "恋恋不舍"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "177",
        question: "下列哪个是正确的标点符号？",
        options: ["你好。", "你好,", "你好!", "以上都对"],
        answer: "3",
        knowledge_point: "标点符号的运用",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "178",
        question: "下列哪个词语是ABAC式？",
        options: ["高兴", "全心全意", "亮晶晶", "欢欢喜喜"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "179",
        question: "下列哪个是正确的句子？",
        options: ["我们在教室里上课", "我们教室里上课", "我们在上课教室里", "我们上课在教室里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "180",
        question: "下列哪个词语是AABC式？",
        options: ["高兴", "心心相印", "全心全意", "亮晶晶"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "三年级",
        subject: "语文"
      },
      {
        id: "181",
        question: "下列哪个是成语？",
        options: ["高兴", "画蛇添足", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "成语的认识",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "182",
        question: "下列哪个成语使用正确？",
        options: ["他画蛇添足地多此一举", "他画蛇添足地恰到好处", "他画蛇添足地努力学习", "他画蛇添足地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "183",
        question: "下列哪个句子使用了比喻？",
        options: ["小明在看书", "太阳像个大火球", "今天天气很好", "我喜欢吃苹果"],
        answer: "1",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "184",
        question: "下列哪个是反义词？",
        options: ["大-小", "大-多", "大-高", "大-长"],
        answer: "0",
        knowledge_point: "词语的理解",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "185",
        question: "下列哪个句子是陈述句？",
        options: ["你吃饭了吗？", "请把门关上", "今天天气真好", "多么美丽的花朵啊"],
        answer: "2",
        knowledge_point: "句子的理解和运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "186",
        question: "下列哪个词语是ABB式？",
        options: ["高兴", "红彤彤", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "187",
        question: "下列哪个是量词？",
        options: ["一", "个", "书", "看"],
        answer: "1",
        knowledge_point: "量词的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "188",
        question: "下列哪个句子使用了拟人？",
        options: ["小鸟在唱歌", "小鸟在飞", "小鸟很可爱", "小鸟在树上"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "189",
        question: "下列哪个是近义词？",
        options: ["大-小", "大-巨", "大-多", "大-高"],
        answer: "1",
        knowledge_point: "词语的理解",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "190",
        question: "下列哪个是正确的句子？",
        options: ["他认真地思考问题", "他认真思考问题", "他认真地问题", "他认真问题"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "191",
        question: "下列哪个词语是AABB式？",
        options: ["高兴", "欢欢喜喜", "打扫打扫", "生机勃勃"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "192",
        question: "下列哪个成语使用正确？",
        options: ["他守株待兔地等待机会", "他守株待兔地创造机会", "他守株待兔地努力学习", "他守株待兔地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "193",
        question: "下列哪个句子使用了排比？",
        options: ["一座座，一排排，一列列", "一座座", "一排排", "一列列"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "194",
        question: "下列哪个是正确的句子？",
        options: ["我们在图书馆里看书", "我们图书馆里看书", "我们在看书图书馆里", "我们看书在图书馆里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "195",
        question: "下列哪个词语是ABAB式？",
        options: ["高兴", "打扫打扫", "生机勃勃", "恋恋不舍"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "196",
        question: "下列哪个成语使用正确？",
        options: ["他亡羊补牢地及时改正", "他亡羊补牢地继续犯错", "他亡羊补牢地努力学习", "他亡羊补牢地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "197",
        question: "下列哪个句子使用了夸张？",
        options: ["飞流直下三千尺", "水流很急", "瀑布很高", "水从高处落下"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "198",
        question: "下列哪个是正确的句子？",
        options: ["他高兴地唱起了歌", "他高兴唱起了歌", "他高兴地唱起歌", "他高兴唱起歌"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "199",
        question: "下列哪个词语是ABAC式？",
        options: ["高兴", "全心全意", "亮晶晶", "欢欢喜喜"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "200",
        question: "下列哪个成语使用正确？",
        options: ["他掩耳盗铃地自欺欺人", "他掩耳盗铃地诚实守信", "他掩耳盗铃地努力学习", "他掩耳盗铃地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "201",
        question: "下列哪个是成语？",
        options: ["高兴", "刻舟求剑", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "成语的认识",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "202",
        question: "下列哪个成语使用正确？",
        options: ["他刻舟求剑地固守旧法", "他刻舟求剑地创新方法", "他刻舟求剑地努力学习", "他刻舟求剑地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "203",
        question: "下列哪个句子使用了比喻？",
        options: ["小明在看书", "太阳像个大火球", "今天天气很好", "我喜欢吃苹果"],
        answer: "1",
        knowledge_point: "修辞手法的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "204",
        question: "下列哪个是反义词？",
        options: ["大-小", "大-多", "大-高", "大-长"],
        answer: "0",
        knowledge_point: "词语的理解",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "205",
        question: "下列哪个句子是陈述句？",
        options: ["你吃饭了吗？", "请把门关上", "今天天气真好", "多么美丽的花朵啊"],
        answer: "2",
        knowledge_point: "句子的理解和运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "206",
        question: "下列哪个词语是ABB式？",
        options: ["高兴", "红彤彤", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "207",
        question: "下列哪个是量词？",
        options: ["一", "个", "书", "看"],
        answer: "1",
        knowledge_point: "量词的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "208",
        question: "下列哪个句子使用了拟人？",
        options: ["小鸟在唱歌", "小鸟在飞", "小鸟很可爱", "小鸟在树上"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "209",
        question: "下列哪个是近义词？",
        options: ["大-小", "大-巨", "大-多", "大-高"],
        answer: "1",
        knowledge_point: "词语的理解",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "210",
        question: "下列哪个是正确的句子？",
        options: ["他认真地思考问题", "他认真思考问题", "他认真地问题", "他认真问题"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "211",
        question: "下列哪个词语是AABB式？",
        options: ["高兴", "欢欢喜喜", "打扫打扫", "生机勃勃"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "212",
        question: "下列哪个成语使用正确？",
        options: ["他拔苗助长地急于求成", "他拔苗助长地耐心等待", "他拔苗助长地努力学习", "他拔苗助长地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "213",
        question: "下列哪个句子使用了排比？",
        options: ["一座座，一排排，一列列", "一座座", "一排排", "一列列"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "214",
        question: "下列哪个是正确的句子？",
        options: ["我们在图书馆里看书", "我们图书馆里看书", "我们在看书图书馆里", "我们看书在图书馆里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "215",
        question: "下列哪个词语是ABAB式？",
        options: ["高兴", "打扫打扫", "生机勃勃", "恋恋不舍"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "216",
        question: "下列哪个成语使用正确？",
        options: ["他杯弓蛇影地疑神疑鬼", "他杯弓蛇影地心胸开阔", "他杯弓蛇影地努力学习", "他杯弓蛇影地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "217",
        question: "下列哪个句子使用了夸张？",
        options: ["飞流直下三千尺", "水流很急", "瀑布很高", "水从高处落下"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "218",
        question: "下列哪个是正确的句子？",
        options: ["他高兴地唱起了歌", "他高兴唱起了歌", "他高兴地唱起歌", "他高兴唱起歌"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "219",
        question: "下列哪个词语是ABAC式？",
        options: ["高兴", "全心全意", "亮晶晶", "欢欢喜喜"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "220",
        question: "下列哪个成语使用正确？",
        options: ["他叶公好龙地表面喜欢", "他叶公好龙地真心喜欢", "他叶公好龙地努力学习", "他叶公好龙地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "五年级",
        subject: "语文"
      },
      {
        id: "221",
        question: "下列哪个是成语？",
        options: ["高兴", "自相矛盾", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "成语的认识",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "222",
        question: "下列哪个成语使用正确？",
        options: ["他自相矛盾地前后矛盾", "他自相矛盾地前后一致", "他自相矛盾地努力学习", "他自相矛盾地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "223",
        question: "下列哪个句子使用了比喻？",
        options: ["小明在看书", "太阳像个大火球", "今天天气很好", "我喜欢吃苹果"],
        answer: "1",
        knowledge_point: "修辞手法的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "224",
        question: "下列哪个是反义词？",
        options: ["大-小", "大-多", "大-高", "大-长"],
        answer: "0",
        knowledge_point: "词语的理解",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "225",
        question: "下列哪个句子是陈述句？",
        options: ["你吃饭了吗？", "请把门关上", "今天天气真好", "多么美丽的花朵啊"],
        answer: "2",
        knowledge_point: "句子的理解和运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "226",
        question: "下列哪个词语是ABB式？",
        options: ["高兴", "红彤彤", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "227",
        question: "下列哪个是量词？",
        options: ["一", "个", "书", "看"],
        answer: "1",
        knowledge_point: "量词的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "228",
        question: "下列哪个句子使用了拟人？",
        options: ["小鸟在唱歌", "小鸟在飞", "小鸟很可爱", "小鸟在树上"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "229",
        question: "下列哪个是近义词？",
        options: ["大-小", "大-巨", "大-多", "大-高"],
        answer: "1",
        knowledge_point: "词语的理解",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "230",
        question: "下列哪个是正确的句子？",
        options: ["他认真地思考问题", "他认真思考问题", "他认真地问题", "他认真问题"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "231",
        question: "下列哪个词语是AABB式？",
        options: ["高兴", "欢欢喜喜", "打扫打扫", "生机勃勃"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "232",
        question: "下列哪个成语使用正确？",
        options: ["他滥竽充数地混在其中", "他滥竽充数地真才实学", "他滥竽充数地努力学习", "他滥竽充数地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "233",
        question: "下列哪个句子使用了排比？",
        options: ["一座座，一排排，一列列", "一座座", "一排排", "一列列"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "234",
        question: "下列哪个是正确的句子？",
        options: ["我们在图书馆里看书", "我们图书馆里看书", "我们在看书图书馆里", "我们看书在图书馆里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "235",
        question: "下列哪个词语是ABAB式？",
        options: ["高兴", "打扫打扫", "生机勃勃", "恋恋不舍"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "236",
        question: "下列哪个成语使用正确？",
        options: ["他狐假虎威地借势欺人", "他狐假虎威地独立自主", "他狐假虎威地努力学习", "他狐假虎威地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "237",
        question: "下列哪个句子使用了夸张？",
        options: ["飞流直下三千尺", "水流很急", "瀑布很高", "水从高处落下"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "238",
        question: "下列哪个是正确的句子？",
        options: ["他高兴地唱起了歌", "他高兴唱起了歌", "他高兴地唱起歌", "他高兴唱起歌"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "239",
        question: "下列哪个词语是ABAC式？",
        options: ["高兴", "全心全意", "亮晶晶", "欢欢喜喜"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "240",
        question: "下列哪个成语使用正确？",
        options: ["他井底之蛙地见识短浅", "他井底之蛙地见多识广", "他井底之蛙地努力学习", "他井底之蛙地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "六年级",
        subject: "语文"
      },
      {
        id: "241",
        question: "What is this?",
        options: ["Apple", "Banana", "Orange", "Grape"],
        answer: "0",
        knowledge_point: "水果词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "242",
        question: "What color is the sun?",
        options: ["Red", "Blue", "Yellow", "Green"],
        answer: "2",
        knowledge_point: "颜色词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "243",
        question: "How many fingers do you have?",
        options: ["Five", "Ten", "Eight", "Six"],
        answer: "1",
        knowledge_point: "数字词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "244",
        question: "What animal says 'moo'?",
        options: ["Dog", "Cat", "Cow", "Bird"],
        answer: "2",
        knowledge_point: "动物词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "245",
        question: "What is this?",
        options: ["Book", "Pen", "Pencil", "Ruler"],
        answer: "0",
        knowledge_point: "学习用品",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "246",
        question: "What do you say in the morning?",
        options: ["Good night", "Good afternoon", "Good morning", "Good evening"],
        answer: "2",
        knowledge_point: "日常问候",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "247",
        question: "What is this?",
        options: ["Chair", "Table", "Desk", "Bed"],
        answer: "0",
        knowledge_point: "家具词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "248",
        question: "What is your name?",
        options: ["I am fine", "My name is Tom", "I am a student", "You are a teacher"],
        answer: "1",
        knowledge_point: "自我介绍",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "249",
        question: "What color is the grass?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "2",
        knowledge_point: "颜色词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "250",
        question: "How many legs does a dog have?",
        options: ["Two", "Four", "Six", "Eight"],
        answer: "1",
        knowledge_point: "数字词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "251",
        question: "What animal says 'woof'?",
        options: ["Cat", "Dog", "Bird", "Cow"],
        answer: "1",
        knowledge_point: "动物词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "252",
        question: "What is this?",
        options: ["Ball", "Car", "Bus", "Bike"],
        answer: "0",
        knowledge_point: "玩具词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "253",
        question: "How do you say 'thank you'?",
        options: ["Hello", "Goodbye", "Thank you", "Sorry"],
        answer: "2",
        knowledge_point: "礼貌用语",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "254",
        question: "What is this?",
        options: ["Eye", "Ear", "Nose", "Mouth"],
        answer: "0",
        knowledge_point: "身体部位",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "255",
        question: "What is this?",
        options: ["Father", "Mother", "Brother", "Sister"],
        answer: "0",
        knowledge_point: "家庭成员",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "256",
        question: "What is this?",
        options: ["School", "Hospital", "Park", "Shop"],
        answer: "0",
        knowledge_point: "地点词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "257",
        question: "What is this?",
        options: ["Water", "Milk", "Juice", "Tea"],
        answer: "0",
        knowledge_point: "饮料词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "258",
        question: "What is this?",
        options: ["Bread", "Rice", "Noodles", "Cake"],
        answer: "0",
        knowledge_point: "食物词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "259",
        question: "What is this?",
        options: ["Shirt", "Pants", "Shoes", "Hat"],
        answer: "0",
        knowledge_point: "服装词汇",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "260",
        question: "How are you?",
        options: ["I am Tom", "I am fine", "I am a student", "I am happy"],
        answer: "1",
        knowledge_point: "日常问候",
        grade: "一年级",
        subject: "英语"
      },
      {
        id: "261",
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "1",
        knowledge_point: "颜色词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "262",
        question: "How many days are there in a week?",
        options: ["Five", "Six", "Seven", "Eight"],
        answer: "2",
        knowledge_point: "数字词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "263",
        question: "What is the opposite of 'big'?",
        options: ["Small", "Large", "Huge", "Tiny"],
        answer: "0",
        knowledge_point: "反义词",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "264",
        question: "Which word means 'apple'?",
        options: ["Orange", "Banana", "Apple", "Grape"],
        answer: "2",
        knowledge_point: "水果词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "265",
        question: "What do you say in the morning?",
        options: ["Good night", "Good afternoon", "Good morning", "Good evening"],
        answer: "2",
        knowledge_point: "日常问候",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "266",
        question: "How do you spell 'cat'?",
        options: ["k-a-t", "c-a-t", "c-e-t", "k-e-t"],
        answer: "1",
        knowledge_point: "拼写",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "267",
        question: "What is 5 + 3?",
        options: ["Six", "Seven", "Eight", "Nine"],
        answer: "2",
        knowledge_point: "数字词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "268",
        question: "Which animal says 'moo'?",
        options: ["Dog", "Cat", "Cow", "Bird"],
        answer: "2",
        knowledge_point: "动物词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "269",
        question: "What color is a banana?",
        options: ["Red", "Yellow", "Green", "Blue"],
        answer: "1",
        knowledge_point: "颜色词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "270",
        question: "How do you say 'thank you'?",
        options: ["Hello", "Goodbye", "Thank you", "Sorry"],
        answer: "2",
        knowledge_point: "礼貌用语",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "271",
        question: "What is the opposite of 'hot'?",
        options: ["Warm", "Cool", "Cold", "Freezing"],
        answer: "2",
        knowledge_point: "反义词",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "272",
        question: "How do you spell 'dog'?",
        options: ["d-o-g", "d-a-g", "d-e-g", "d-u-g"],
        answer: "0",
        knowledge_point: "拼写",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "273",
        question: "What is 10 - 4?",
        options: ["Four", "Five", "Six", "Seven"],
        answer: "2",
        knowledge_point: "数字词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "274",
        question: "Which animal says 'meow'?",
        options: ["Dog", "Cat", "Cow", "Bird"],
        answer: "1",
        knowledge_point: "动物词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "275",
        question: "What color is grass?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "2",
        knowledge_point: "颜色词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "276",
        question: "How do you say 'goodbye'?",
        options: ["Hello", "Goodbye", "Thank you", "Sorry"],
        answer: "1",
        knowledge_point: "礼貌用语",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "277",
        question: "What is the opposite of 'happy'?",
        options: ["Joyful", "Glad", "Sad", "Excited"],
        answer: "2",
        knowledge_point: "反义词",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "278",
        question: "How do you spell 'bird'?",
        options: ["b-i-r-d", "b-e-r-d", "b-a-r-d", "b-o-r-d"],
        answer: "0",
        knowledge_point: "拼写",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "279",
        question: "What is 6 + 4?",
        options: ["Eight", "Nine", "Ten", "Eleven"],
        answer: "2",
        knowledge_point: "数字词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "280",
        question: "Which animal says 'quack'?",
        options: ["Dog", "Cat", "Duck", "Bird"],
        answer: "2",
        knowledge_point: "动物词汇",
        grade: "二年级",
        subject: "英语"
      },
      {
        id: "281",
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "1",
        knowledge_point: "基础词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "282",
        question: "How many days are there in a week?",
        options: ["Five", "Six", "Seven", "Eight"],
        answer: "2",
        knowledge_point: "基础词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "283",
        question: "What is the opposite of 'big'?",
        options: ["Small", "Large", "Huge", "Tiny"],
        answer: "0",
        knowledge_point: "反义词",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "284",
        question: "Which word means 'apple'?",
        options: ["Orange", "Banana", "Apple", "Grape"],
        answer: "2",
        knowledge_point: "水果词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "285",
        question: "What do you say in the morning?",
        options: ["Good night", "Good afternoon", "Good morning", "Good evening"],
        answer: "2",
        knowledge_point: "日常问候",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "286",
        question: "How do you spell 'cat'?",
        options: ["k-a-t", "c-a-t", "c-e-t", "k-e-t"],
        answer: "1",
        knowledge_point: "拼写",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "287",
        question: "What is 5 + 3?",
        options: ["Six", "Seven", "Eight", "Nine"],
        answer: "2",
        knowledge_point: "数字词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "288",
        question: "Which animal says 'moo'?",
        options: ["Dog", "Cat", "Cow", "Bird"],
        answer: "2",
        knowledge_point: "动物词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "289",
        question: "What color is a banana?",
        options: ["Red", "Yellow", "Green", "Blue"],
        answer: "1",
        knowledge_point: "颜色词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "290",
        question: "How do you say 'thank you'?",
        options: ["Hello", "Goodbye", "Thank you", "Sorry"],
        answer: "2",
        knowledge_point: "礼貌用语",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "291",
        question: "What is the opposite of 'hot'?",
        options: ["Warm", "Cool", "Cold", "Freezing"],
        answer: "2",
        knowledge_point: "反义词",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "292",
        question: "How do you spell 'dog'?",
        options: ["d-o-g", "d-a-g", "d-e-g", "d-u-g"],
        answer: "0",
        knowledge_point: "拼写",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "293",
        question: "What is 10 - 4?",
        options: ["Four", "Five", "Six", "Seven"],
        answer: "2",
        knowledge_point: "数字词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "294",
        question: "Which animal says 'meow'?",
        options: ["Dog", "Cat", "Cow", "Bird"],
        answer: "1",
        knowledge_point: "动物词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "295",
        question: "What color is grass?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "2",
        knowledge_point: "颜色词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "296",
        question: "How do you say 'goodbye'?",
        options: ["Hello", "Goodbye", "Thank you", "Sorry"],
        answer: "1",
        knowledge_point: "礼貌用语",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "297",
        question: "What is the opposite of 'happy'?",
        options: ["Joyful", "Glad", "Sad", "Excited"],
        answer: "2",
        knowledge_point: "反义词",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "298",
        question: "How do you spell 'bird'?",
        options: ["b-i-r-d", "b-e-r-d", "b-a-r-d", "b-o-r-d"],
        answer: "0",
        knowledge_point: "拼写",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "299",
        question: "What is 6 + 4?",
        options: ["Eight", "Nine", "Ten", "Eleven"],
        answer: "2",
        knowledge_point: "数字词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "300",
        question: "Which animal says 'woof'?",
        options: ["Dog", "Cat", "Duck", "Bird"],
        answer: "0",
        knowledge_point: "动物词汇",
        grade: "三年级",
        subject: "英语"
      },
      {
        id: "301",
        question: "What is the past tense of 'go'?",
        options: ["goed", "went", "gone", "going"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "302",
        question: "What is the past tense of 'eat'?",
        options: ["eated", "ate", "eaten", "eating"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "303",
        question: "What is the past tense of 'see'?",
        options: ["seed", "saw", "seen", "seeing"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "304",
        question: "What is the past tense of 'do'?",
        options: ["did", "done", "doing", "doed"],
        answer: "0",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "305",
        question: "What is the past tense of 'come'?",
        options: ["comed", "came", "come", "coming"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "306",
        question: "What is the past tense of 'buy'?",
        options: ["buyed", "bought", "boughten", "buying"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "307",
        question: "What is the past tense of 'take'?",
        options: ["taked", "took", "taken", "taking"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "308",
        question: "What is the past tense of 'make'?",
        options: ["maked", "made", "make", "making"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "309",
        question: "What is the past tense of 'give'?",
        options: ["gived", "gave", "given", "giving"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "310",
        question: "What is the past tense of 'write'?",
        options: ["writed", "wrote", "written", "writing"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "311",
        question: "What is the past tense of 'read'?",
        options: ["readed", "read", "reading", "red"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "312",
        question: "What is the past tense of 'speak'?",
        options: ["speaked", "spoke", "spoken", "speaking"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "313",
        question: "What is the past tense of 'fly'?",
        options: ["flyed", "flew", "flown", "flying"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "314",
        question: "What is the past tense of 'know'?",
        options: ["knowed", "knew", "known", "knowing"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "315",
        question: "What is the past tense of 'think'?",
        options: ["thinked", "thought", "thinking", "thunk"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "316",
        question: "What is the past tense of 'teach'?",
        options: ["teached", "taught", "teaching", "teached"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "317",
        question: "What is the past tense of 'bring'?",
        options: ["bringed", "brought", "broughten", "bringing"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "318",
        question: "What is the past tense of 'sing'?",
        options: ["singged", "sang", "sung", "singing"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "319",
        question: "What is the past tense of 'swim'?",
        options: ["swimmed", "swam", "swum", "swimming"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "320",
        question: "What is the past tense of 'run'?",
        options: ["runned", "ran", "run", "running"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "四年级",
        subject: "英语"
      },
      {
        id: "321",
        question: "What is the present continuous tense of 'eat'?",
        options: ["eatting", "eating", "eats", "eaten"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "322",
        question: "What is the present continuous tense of 'go'?",
        options: ["goeing", "going", "goes", "gone"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "323",
        question: "What is the present continuous tense of 'study'?",
        options: ["studying", "study", "studies", "studied"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "324",
        question: "What is the present continuous tense of 'play'?",
        options: ["play", "playing", "plays", "played"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "325",
        question: "What is the present continuous tense of 'write'?",
        options: ["writing", "write", "writes", "wrote"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "326",
        question: "What is the present continuous tense of 'run'?",
        options: ["run", "running", "runs", "ran"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "327",
        question: "What is the present continuous tense of 'swim'?",
        options: ["swimming", "swim", "swims", "swam"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "328",
        question: "What is the present continuous tense of 'sing'?",
        options: ["singing", "sing", "sings", "sang"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "329",
        question: "What is the present continuous tense of 'dance'?",
        options: ["dance", "dancing", "dances", "danced"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "330",
        question: "What is the present continuous tense of 'read'?",
        options: ["reading", "read", "reads", "readed"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "331",
        question: "What is the present continuous tense of 'watch'?",
        options: ["watch", "watching", "watches", "watched"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "332",
        question: "What is the present continuous tense of 'listen'?",
        options: ["listening", "listen", "listens", "listened"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "333",
        question: "What is the present continuous tense of 'speak'?",
        options: ["speak", "speaking", "speaks", "spoke"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "334",
        question: "What is the present continuous tense of 'draw'?",
        options: ["drawing", "draw", "draws", "drew"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "335",
        question: "What is the present continuous tense of 'fly'?",
        options: ["fly", "flying", "flies", "flew"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "336",
        question: "What is the present continuous tense of 'sleep'?",
        options: ["sleep", "sleeping", "sleeps", "slept"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "337",
        question: "What is the present continuous tense of 'cook'?",
        options: ["cooking", "cook", "cooks", "cooked"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "338",
        question: "What is the present continuous tense of 'clean'?",
        options: ["clean", "cleaning", "cleans", "cleaned"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "339",
        question: "What is the present continuous tense of 'help'?",
        options: ["help", "helping", "helps", "helped"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "340",
        question: "What is the present continuous tense of 'work'?",
        options: ["working", "work", "works", "worked"],
        answer: "0",
        knowledge_point: "现在进行时",
        grade: "五年级",
        subject: "英语"
      },
      {
        id: "341",
        question: "What is the present perfect tense of 'eat'?",
        options: ["eated", "ate", "eaten", "eating"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "342",
        question: "What is the present perfect tense of 'go'?",
        options: ["goed", "went", "gone", "going"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "343",
        question: "What is the present perfect tense of 'see'?",
        options: ["seed", "saw", "seen", "seeing"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "344",
        question: "What is the present perfect tense of 'do'?",
        options: ["did", "done", "doing", "doed"],
        answer: "1",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "345",
        question: "What is the present perfect tense of 'write'?",
        options: ["writed", "wrote", "written", "writing"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "346",
        question: "What is the present perfect tense of 'take'?",
        options: ["taked", "took", "taken", "taking"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "347",
        question: "What is the present perfect tense of 'give'?",
        options: ["gived", "gave", "given", "giving"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "348",
        question: "What is the present perfect tense of 'make'?",
        options: ["maked", "made", "make", "making"],
        answer: "1",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "349",
        question: "What is the present perfect tense of 'buy'?",
        options: ["buyed", "bought", "boughten", "buying"],
        answer: "1",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "350",
        question: "What is the present perfect tense of 'speak'?",
        options: ["speaked", "spoke", "spoken", "speaking"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "351",
        question: "What is the present perfect tense of 'fly'?",
        options: ["flyed", "flew", "flown", "flying"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "352",
        question: "What is the present perfect tense of 'know'?",
        options: ["knowed", "knew", "known", "knowing"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "353",
        question: "What is the present perfect tense of 'think'?",
        options: ["thinked", "thought", "thinking", "thunk"],
        answer: "1",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "354",
        question: "What is the present perfect tense of 'teach'?",
        options: ["teached", "taught", "teaching", "teached"],
        answer: "1",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "355",
        question: "What is the present perfect tense of 'bring'?",
        options: ["bringed", "brought", "broughten", "bringing"],
        answer: "1",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "356",
        question: "What is the present perfect tense of 'sing'?",
        options: ["singged", "sang", "sung", "singing"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "357",
        question: "What is the present perfect tense of 'swim'?",
        options: ["swimmed", "swam", "swum", "swimming"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "358",
        question: "What is the present perfect tense of 'run'?",
        options: ["runned", "ran", "run", "running"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "359",
        question: "What is the present perfect tense of 'read'?",
        options: ["readed", "read", "reading", "red"],
        answer: "1",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "360",
        question: "What is the present perfect tense of 'come'?",
        options: ["comed", "came", "come", "coming"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "六年级",
        subject: "英语"
      },
      {
        id: "79",
        question: "12的因数有哪些？",
        options: ["1, 2, 3, 4, 6, 12", "1, 2, 3, 4, 12", "2, 3, 4, 6, 12", "1, 2, 3, 6, 12"],
        answer: "0",
        knowledge_point: "因数和倍数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "80",
        question: "3和5的最小公倍数是多少？",
        options: ["8", "15", "1", "35"],
        answer: "1",
        knowledge_point: "最小公倍数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "81",
        question: "6和8的最大公因数是多少？",
        options: ["2", "48", "24", "4"],
        answer: "0",
        knowledge_point: "最大公因数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "82",
        question: "一个梯形的面积是（上底+下底）×高÷2，上底4cm，下底6cm，高5cm，面积是多少？",
        options: ["25cm²", "20cm²", "30cm²", "15cm²"],
        answer: "0",
        knowledge_point: "梯形面积的计算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "83",
        question: "下列哪个是平行四边形？",
        options: ["对边平行且相等的四边形", "四条边都相等的四边形", "四个角都是直角的四边形", "只有一组对边平行的四边形"],
        answer: "0",
        knowledge_point: "平行四边形的认识",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "84",
        question: "1平方米等于多少平方分米？",
        options: ["10", "100", "1000", "1"],
        answer: "1",
        knowledge_point: "面积单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "85",
        question: "0.6 × 0.5 = ?",
        options: ["0.3", "3", "0.03", "30"],
        answer: "0",
        knowledge_point: "小数乘小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "86",
        question: "2.4 ÷ 0.6 = ?",
        options: ["4", "0.4", "40", "0.04"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "87",
        question: "下列哪个是假分数？",
        options: ["1/2", "3/2", "2/3", "3/4"],
        answer: "1",
        knowledge_point: "真分数和假分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "88",
        question: "5/2可以化成带分数？",
        options: ["2又1/2", "2又1/5", "1又2/5", "1又1/2"],
        answer: "0",
        knowledge_point: "假分数化带分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "89",
        question: "一个圆的半径是3cm，直径是多少？",
        options: ["6cm", "9cm", "3cm", "1.5cm"],
        answer: "0",
        knowledge_point: "圆的认识",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "90",
        question: "120的15%是多少？",
        options: ["18", "12", "15", "180"],
        answer: "0",
        knowledge_point: "百分数的应用",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "91",
        question: "0.75等于多少百分数？",
        options: ["7.5%", "75%", "0.75%", "750%"],
        answer: "1",
        knowledge_point: "小数转百分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "92",
        question: "1/4等于多少小数？",
        options: ["0.25", "0.4", "0.14", "2.5"],
        answer: "0",
        knowledge_point: "分数转小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "93",
        question: "3/5 × 10 = ?",
        options: ["6", "30", "3/50", "50/3"],
        answer: "0",
        knowledge_point: "分数乘整数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "94",
        question: "8 ÷ 2/5 = ?",
        options: ["20", "3.2", "16/5", "5/16"],
        answer: "0",
        knowledge_point: "整数除分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "95",
        question: "下列哪个方程的解是x=5？",
        options: ["2x=8", "x+3=8", "3x=15", "x-5=0"],
        answer: "2",
        knowledge_point: "简易方程",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "96",
        question: "一个长方体的长是5cm，宽是3cm，高是2cm，体积是多少？",
        options: ["10cm³", "30cm³", "15cm³", "8cm³"],
        answer: "1",
        knowledge_point: "长方体的体积",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "97",
        question: "1升等于多少毫升？",
        options: ["10", "100", "1000", "10000"],
        answer: "2",
        knowledge_point: "容积单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "98",
        question: "下列哪个是轴对称图形？",
        options: ["三角形", "正方形", "平行四边形", "梯形"],
        answer: "1",
        knowledge_point: "轴对称图形",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "99",
        question: "一个正方体的棱长是3cm，表面积是多少？",
        options: ["27cm²", "54cm²", "9cm²", "18cm²"],
        answer: "1",
        knowledge_point: "正方体的表面积",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "100",
        question: "2.5 × 0.4 = ?",
        options: ["1", "10", "0.1", "0.01"],
        answer: "0",
        knowledge_point: "小数乘小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "101",
        question: "3.6 ÷ 0.9 = ?",
        options: ["4", "0.4", "40", "0.04"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "102",
        question: "1/3 + 1/6 = ?",
        options: ["2/9", "1/2", "1/9", "2/3"],
        answer: "1",
        knowledge_point: "异分母分数加法",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "103",
        question: "5/6 - 1/3 = ?",
        options: ["4/3", "1/2", "2/3", "1/6"],
        answer: "1",
        knowledge_point: "异分母分数减法",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "104",
        question: "200的25%是多少？",
        options: ["50", "25", "500", "5"],
        answer: "0",
        knowledge_point: "百分数的应用",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "105",
        question: "0.125等于多少分数？",
        options: ["1/8", "1/4", "1/2", "1/16"],
        answer: "0",
        knowledge_point: "小数转分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "106",
        question: "下列哪个是合数？",
        options: ["2", "3", "5", "9"],
        answer: "3",
        knowledge_point: "质数和合数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "107",
        question: "8和12的最大公因数是多少？",
        options: ["2", "4", "96", "24"],
        answer: "1",
        knowledge_point: "最大公因数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "108",
        question: "4和6的最小公倍数是多少？",
        options: ["2", "12", "24", "10"],
        answer: "1",
        knowledge_point: "最小公倍数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "109",
        question: "一个圆柱的底面半径是2cm，高是5cm，体积是多少？（π取3.14）",
        options: ["31.4cm³", "62.8cm³", "15.7cm³", "20cm³"],
        answer: "1",
        knowledge_point: "圆柱的体积",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "110",
        question: "1平方千米等于多少公顷？",
        options: ["10", "100", "1000", "1"],
        answer: "1",
        knowledge_point: "面积单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "111",
        question: "0.8 × 0.9 = ?",
        options: ["0.72", "7.2", "0.072", "72"],
        answer: "0",
        knowledge_point: "小数乘小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "112",
        question: "5.4 ÷ 0.6 = ?",
        options: ["9", "0.9", "90", "0.09"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "113",
        question: "2/3 × 3/4 = ?",
        options: ["6/7", "1/2", "5/7", "8/9"],
        answer: "1",
        knowledge_point: "分数乘分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "114",
        question: "3/4 ÷ 1/2 = ?",
        options: ["3/8", "3/2", "1/2", "2/3"],
        answer: "1",
        knowledge_point: "分数除分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "115",
        question: "150的20%是多少？",
        options: ["30", "20", "15", "300"],
        answer: "0",
        knowledge_point: "百分数的应用",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "116",
        question: "0.625等于多少分数？",
        options: ["5/8", "1/8", "3/8", "7/8"],
        answer: "0",
        knowledge_point: "小数转分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "117",
        question: "下列哪个是互质数？",
        options: ["4和6", "8和12", "5和7", "9和15"],
        answer: "2",
        knowledge_point: "互质数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "118",
        question: "一个圆锥的底面半径是3cm，高是4cm，体积是多少？（π取3.14）",
        options: ["37.68cm³", "12.56cm³", "113.04cm³", "75.36cm³"],
        answer: "0",
        knowledge_point: "圆锥的体积",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "119",
        question: "1公顷等于多少平方米？",
        options: ["100", "1000", "10000", "100000"],
        answer: "2",
        knowledge_point: "面积单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "120",
        question: "0.45 × 0.8 = ?",
        options: ["0.36", "3.6", "0.036", "36"],
        answer: "0",
        knowledge_point: "小数乘小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "121",
        question: "7.2 ÷ 0.8 = ?",
        options: ["9", "0.9", "90", "0.09"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "122",
        question: "4/5 × 5/6 = ?",
        options: ["20/11", "2/3", "9/11", "24/25"],
        answer: "1",
        knowledge_point: "分数乘分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "123",
        question: "5/6 ÷ 2/3 = ?",
        options: ["5/4", "5/9", "10/18", "15/6"],
        answer: "0",
        knowledge_point: "分数除分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "124",
        question: "180的15%是多少？",
        options: ["27", "18", "15", "270"],
        answer: "0",
        knowledge_point: "百分数的应用",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "125",
        question: "0.875等于多少分数？",
        options: ["7/8", "1/8", "3/8", "5/8"],
        answer: "0",
        knowledge_point: "小数转分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "126",
        question: "下列哪个是2的倍数？",
        options: ["3", "5", "7", "8"],
        answer: "3",
        knowledge_point: "2、3、5的倍数特征",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "127",
        question: "一个球的半径是3cm，表面积是多少？（π取3.14）",
        options: ["28.26cm²", "113.04cm²", "9.42cm²", "37.68cm²"],
        answer: "1",
        knowledge_point: "球的表面积",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "128",
        question: "1吨等于多少千克？",
        options: ["10", "100", "1000", "10000"],
        answer: "2",
        knowledge_point: "质量单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "129",
        question: "0.36 × 0.5 = ?",
        options: ["0.18", "1.8", "0.018", "18"],
        answer: "0",
        knowledge_point: "小数乘小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "130",
        question: "6.3 ÷ 0.7 = ?",
        options: ["9", "0.9", "90", "0.09"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "131",
        question: "3/8 × 4/5 = ?",
        options: ["12/13", "3/10", "7/13", "15/32"],
        answer: "1",
        knowledge_point: "分数乘分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "132",
        question: "7/8 ÷ 3/4 = ?",
        options: ["7/6", "21/32", "7/32", "21/8"],
        answer: "0",
        knowledge_point: "分数除分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "133",
        question: "250的12%是多少？",
        options: ["30", "25", "12", "300"],
        answer: "0",
        knowledge_point: "百分数的应用",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "134",
        question: "0.375等于多少分数？",
        options: ["3/8", "1/8", "5/8", "7/8"],
        answer: "0",
        knowledge_point: "小数转分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "135",
        question: "下列哪个是3的倍数？",
        options: ["4", "5", "7", "9"],
        answer: "3",
        knowledge_point: "2、3、5的倍数特征",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "136",
        question: "一个正方体的棱长是4cm，体积是多少？",
        options: ["16cm³", "64cm³", "48cm³", "12cm³"],
        answer: "1",
        knowledge_point: "正方体的体积",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "137",
        question: "1毫升等于多少立方厘米？",
        options: ["1", "10", "100", "1000"],
        answer: "0",
        knowledge_point: "容积单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "138",
        question: "0.28 × 0.6 = ?",
        options: ["0.168", "1.68", "0.0168", "16.8"],
        answer: "0",
        knowledge_point: "小数乘小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "139",
        question: "8.4 ÷ 1.2 = ?",
        options: ["7", "0.7", "70", "0.07"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "140",
        question: "5/12 × 3/4 = ?",
        options: ["15/16", "5/16", "8/16", "20/36"],
        answer: "1",
        knowledge_point: "分数乘分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "141",
        question: "9/10 ÷ 3/5 = ?",
        options: ["3/2", "27/50", "9/50", "27/10"],
        answer: "0",
        knowledge_point: "分数除分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "142",
        question: "320的25%是多少？",
        options: ["80", "25", "32", "800"],
        answer: "0",
        knowledge_point: "百分数的应用",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "143",
        question: "0.0625等于多少分数？",
        options: ["1/16", "1/8", "1/4", "1/2"],
        answer: "0",
        knowledge_point: "小数转分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "144",
        question: "下列哪个是5的倍数？",
        options: ["12", "13", "14", "15"],
        answer: "3",
        knowledge_point: "2、3、5的倍数特征",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "145",
        question: "一个长方体的长是6cm，宽是4cm，高是3cm，表面积是多少？",
        options: ["108cm²", "72cm²", "36cm²", "13cm²"],
        answer: "0",
        knowledge_point: "长方体的表面积",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "146",
        question: "1立方米等于多少立方分米？",
        options: ["10", "100", "1000", "10000"],
        answer: "2",
        knowledge_point: "体积单位的换算",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "147",
        question: "0.54 × 0.3 = ?",
        options: ["0.162", "1.62", "0.0162", "16.2"],
        answer: "0",
        knowledge_point: "小数乘小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "148",
        question: "9.6 ÷ 1.6 = ?",
        options: ["6", "0.6", "60", "0.06"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "149",
        question: "7/9 × 3/5 = ?",
        options: ["21/14", "7/15", "10/14", "21/45"],
        answer: "1",
        knowledge_point: "分数乘分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "150",
        question: "11/12 ÷ 2/3 = ?",
        options: ["11/8", "11/18", "22/36", "33/12"],
        answer: "0",
        knowledge_point: "分数除分数",
        grade: "四年级",
        subject: "数学"
      },
      {
        id: "151",
        question: "2.5 + 3.75 = ?",
        options: ["6.25", "5.25", "6.15", "5.15"],
        answer: "0",
        knowledge_point: "小数的加减法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "152",
        question: "8.4 - 2.6 = ?",
        options: ["5.8", "6.8", "5.2", "6.2"],
        answer: "0",
        knowledge_point: "小数的减法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "153",
        question: "1.25 × 8 = ?",
        options: ["10", "100", "1", "12.5"],
        answer: "0",
        knowledge_point: "小数乘整数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "154",
        question: "7.2 ÷ 0.9 = ?",
        options: ["8", "0.8", "80", "0.08"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "155",
        question: "3/5 + 2/5 = ?",
        options: ["1", "5/10", "1/5", "5/25"],
        answer: "0",
        knowledge_point: "同分母分数加法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "156",
        question: "7/8 - 3/8 = ?",
        options: ["4/8", "1/2", "4/16", "1/4"],
        answer: "0",
        knowledge_point: "同分母分数减法",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "157",
        question: "2/3 × 3/4 = ?",
        options: ["6/7", "1/2", "5/7", "8/9"],
        answer: "1",
        knowledge_point: "分数乘分数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "158",
        question: "5/6 ÷ 2/3 = ?",
        options: ["5/4", "5/9", "10/18", "15/6"],
        answer: "0",
        knowledge_point: "分数除分数",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "159",
        question: "一个圆的半径是5cm，面积是多少？（π取3.14）",
        options: ["31.4cm²", "78.5cm²", "15.7cm²", "25cm²"],
        answer: "1",
        knowledge_point: "圆的面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "160",
        question: "一个圆的直径是10cm，周长是多少？（π取3.14）",
        options: ["31.4cm", "78.5cm", "15.7cm", "25cm"],
        answer: "0",
        knowledge_point: "圆的周长",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "161",
        question: "一个长方体的长是8cm，宽是5cm，高是4cm，体积是多少？",
        options: ["160cm³", "17cm³", "40cm³", "80cm³"],
        answer: "0",
        knowledge_point: "长方体的体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "162",
        question: "一个正方体的棱长是6cm，表面积是多少？",
        options: ["36cm²", "216cm²", "108cm²", "72cm²"],
        answer: "1",
        knowledge_point: "正方体的表面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "163",
        question: "一个圆柱的底面半径是3cm，高是6cm，体积是多少？（π取3.14）",
        options: ["169.56cm³", "56.52cm³", "339.12cm³", "113.04cm³"],
        answer: "0",
        knowledge_point: "圆柱的体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "164",
        question: "一个圆锥的底面半径是4cm，高是6cm，体积是多少？（π取3.14）",
        options: ["301.44cm³", "100.48cm³", "150.72cm³", "75.36cm³"],
        answer: "1",
        knowledge_point: "圆锥的体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "165",
        question: "解方程：2x + 3 = 11，x = ?",
        options: ["4", "7", "8", "5.5"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "166",
        question: "解方程：3x - 5 = 16，x = ?",
        options: ["7", "11", "21", "3"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "167",
        question: "一个比例是2:3 = 4:x，x = ?",
        options: ["5", "6", "7", "8"],
        answer: "1",
        knowledge_point: "比例",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "168",
        question: "甲数是乙数的2倍，乙数是15，甲数是多少？",
        options: ["30", "7.5", "17", "13"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "169",
        question: "一个数的3/5是12，这个数是多少？",
        options: ["20", "7.2", "15", "18"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "170",
        question: "甲乙两地相距240千米，一辆汽车以每小时60千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "171",
        question: "一件商品原价200元，打八折后是多少元？",
        options: ["160元", "40元", "180元", "120元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "172",
        question: "一个数增加25%后是125，这个数是多少？",
        options: ["100", "156.25", "93.75", "150"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "173",
        question: "一个梯形的上底是4cm，下底是8cm，高是5cm，面积是多少？",
        options: ["30cm²", "20cm²", "40cm²", "60cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "174",
        question: "一个三角形的底是10cm，高是6cm，面积是多少？",
        options: ["60cm²", "30cm²", "16cm²", "32cm²"],
        answer: "1",
        knowledge_point: "三角形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "175",
        question: "一个平行四边形的底是8cm，高是5cm，面积是多少？",
        options: ["40cm²", "13cm²", "26cm²", "20cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "176",
        question: "一个长方体的长是10cm，宽是6cm，高是4cm，表面积是多少？",
        options: ["248cm²", "240cm²", "244cm²", "236cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "177",
        question: "一个正方体的棱长是5cm，体积是多少？",
        options: ["25cm³", "125cm³", "100cm³", "150cm³"],
        answer: "1",
        knowledge_point: "正方体体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "178",
        question: "一个圆柱的底面直径是10cm，高是8cm，体积是多少？（π取3.14）",
        options: ["628cm³", "314cm³", "1570cm³", "2512cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "179",
        question: "一个圆锥的底面直径是8cm，高是9cm，体积是多少？（π取3.14）",
        options: ["150.72cm³", "452.16cm³", "301.44cm³", "226.08cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "180",
        question: "解方程：4x - 7 = 25，x = ?",
        options: ["8", "9", "7", "6"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "181",
        question: "解方程：5x + 8 = 33，x = ?",
        options: ["5", "25", "41", "6.6"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "182",
        question: "一个比例是3:4 = 6:x，x = ?",
        options: ["7", "8", "9", "10"],
        answer: "1",
        knowledge_point: "比例",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "183",
        question: "甲数是乙数的3倍，甲数是27，乙数是多少？",
        options: ["9", "81", "24", "30"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "184",
        question: "一个数的4/5是16，这个数是多少？",
        options: ["20", "12.8", "12", "25"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "185",
        question: "甲乙两地相距180千米，一辆汽车以每小时45千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "186",
        question: "一件商品原价300元，打七折后是多少元？",
        options: ["210元", "90元", "270元", "180元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "187",
        question: "一个数增加20%后是120，这个数是多少？",
        options: ["100", "144", "96", "150"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "188",
        question: "一个梯形的上底是5cm，下底是9cm，高是6cm，面积是多少？",
        options: ["42cm²", "28cm²", "56cm²", "84cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "189",
        question: "一个三角形的底是12cm，高是8cm，面积是多少？",
        options: ["96cm²", "48cm²", "20cm²", "40cm²"],
        answer: "1",
        knowledge_point: "三角形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "190",
        question: "一个平行四边形的底是10cm，高是7cm，面积是多少？",
        options: ["70cm²", "17cm²", "35cm²", "34cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "191",
        question: "一个长方体的长是12cm，宽是8cm，高是5cm，表面积是多少？",
        options: ["392cm²", "480cm²", "432cm²", "376cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "192",
        question: "一个正方体的棱长是7cm，体积是多少？",
        options: ["49cm³", "343cm³", "21cm³", "294cm³"],
        answer: "1",
        knowledge_point: "正方体体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "193",
        question: "一个圆柱的底面直径是12cm，高是10cm，体积是多少？（π取3.14）",
        options: ["1130.4cm³", "565.2cm³", "2826cm³", "4521.6cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "194",
        question: "一个圆锥的底面直径是10cm，高是12cm，体积是多少？（π取3.14）",
        options: ["314cm³", "942cm³", "628cm³", "157cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "195",
        question: "解方程：6x - 9 = 33，x = ?",
        options: ["7", "8", "6", "5"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "196",
        question: "解方程：7x + 12 = 47，x = ?",
        options: ["5", "35", "59", "7"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "197",
        question: "一个比例是4:5 = 8:x，x = ?",
        options: ["9", "10", "11", "12"],
        answer: "1",
        knowledge_point: "比例",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "198",
        question: "甲数是乙数的4倍，乙数是18，甲数是多少？",
        options: ["72", "4.5", "22", "14"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "199",
        question: "一个数的5/6是20，这个数是多少？",
        options: ["24", "16.67", "15", "30"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "200",
        question: "甲乙两地相距300千米，一辆汽车以每小时75千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "201",
        question: "一件商品原价500元，打六折后是多少元？",
        options: ["300元", "200元", "400元", "250元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "202",
        question: "一个数增加30%后是130，这个数是多少？",
        options: ["100", "169", "91", "170"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "203",
        question: "一个梯形的上底是6cm，下底是10cm，高是7cm，面积是多少？",
        options: ["56cm²", "42cm²", "70cm²", "112cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "204",
        question: "一个三角形的底是14cm，高是10cm，面积是多少？",
        options: ["140cm²", "70cm²", "24cm²", "48cm²"],
        answer: "1",
        knowledge_point: "三角形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "205",
        question: "一个平行四边形的底是12cm，高是9cm，面积是多少？",
        options: ["108cm²", "21cm²", "54cm²", "48cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "206",
        question: "一个长方体的长是15cm，宽是10cm，高是6cm，表面积是多少？",
        options: ["600cm²", "540cm²", "660cm²", "510cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "207",
        question: "一个正方体的棱长是8cm，体积是多少？",
        options: ["64cm³", "512cm³", "24cm³", "384cm³"],
        answer: "1",
        knowledge_point: "正方体体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "208",
        question: "一个圆柱的底面直径是14cm，高是12cm，体积是多少？（π取3.14）",
        options: ["1846.32cm³", "923.16cm³", "4615.8cm³", "7385.28cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "209",
        question: "一个圆锥的底面直径是12cm，高是15cm，体积是多少？（π取3.14）",
        options: ["565.2cm³", "1695.6cm³", "1130.4cm³", "282.6cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "210",
        question: "解方程：8x - 11 = 37，x = ?",
        options: ["6", "7", "5", "8"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "211",
        question: "解方程：9x + 15 = 60，x = ?",
        options: ["5", "45", "75", "6.67"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "212",
        question: "一个比例是5:6 = 10:x，x = ?",
        options: ["11", "12", "13", "14"],
        answer: "1",
        knowledge_point: "比例",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "213",
        question: "甲数是乙数的5倍，乙数是20，甲数是多少？",
        options: ["100", "4", "25", "15"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "214",
        question: "一个数的3/4是18，这个数是多少？",
        options: ["24", "13.5", "12", "30"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "215",
        question: "甲乙两地相距360千米，一辆汽车以每小时90千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "216",
        question: "一件商品原价400元，打八五折后是多少元？",
        options: ["340元", "60元", "360元", "300元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "217",
        question: "一个数增加40%后是140，这个数是多少？",
        options: ["100", "196", "84", "200"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "218",
        question: "一个梯形的上底是7cm，下底是11cm，高是8cm，面积是多少？",
        options: ["72cm²", "56cm²", "88cm²", "144cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "219",
        question: "一个三角形的底是16cm，高是12cm，面积是多少？",
        options: ["192cm²", "96cm²", "28cm²", "56cm²"],
        answer: "1",
        knowledge_point: "三角形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "220",
        question: "一个平行四边形的底是14cm，高是11cm，面积是多少？",
        options: ["154cm²", "25cm²", "77cm²", "56cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "221",
        question: "一个长方体的长是18cm，宽是12cm，高是7cm，表面积是多少？",
        options: ["852cm²", "912cm²", "792cm²", "732cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "222",
        question: "一个正方体的棱长是9cm，体积是多少？",
        options: ["81cm³", "729cm³", "27cm³", "486cm³"],
        answer: "1",
        knowledge_point: "正方体体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "223",
        question: "一个圆柱的底面直径是16cm，高是14cm，体积是多少？（π取3.14）",
        options: ["2813.44cm³", "1406.72cm³", "7033.6cm³", "11253.76cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "224",
        question: "一个圆锥的底面直径是14cm，高是18cm，体积是多少？（π取3.14）",
        options: ["923.16cm³", "2769.48cm³", "1846.32cm³", "461.58cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "225",
        question: "解方程：10x - 13 = 47，x = ?",
        options: ["6", "7", "5", "8"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "226",
        question: "解方程：11x + 18 = 73，x = ?",
        options: ["5", "55", "91", "7.55"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "227",
        question: "一个比例是6:7 = 12:x，x = ?",
        options: ["13", "14", "15", "16"],
        answer: "1",
        knowledge_point: "比例",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "228",
        question: "甲数是乙数的6倍，乙数是25，甲数是多少？",
        options: ["150", "4.17", "31", "19"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "229",
        question: "一个数的7/8是28，这个数是多少？",
        options: ["32", "24.5", "20", "40"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "230",
        question: "甲乙两地相距420千米，一辆汽车以每小时105千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "231",
        question: "一件商品原价600元，打七五折后是多少元？",
        options: ["450元", "150元", "510元", "420元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "232",
        question: "一个数增加50%后是150，这个数是多少？",
        options: ["100", "225", "75", "200"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "233",
        question: "一个梯形的上底是8cm，下底是12cm，高是9cm，面积是多少？",
        options: ["90cm²", "72cm²", "108cm²", "180cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "234",
        question: "一个三角形的底是18cm，高是14cm，面积是多少？",
        options: ["252cm²", "126cm²", "32cm²", "64cm²"],
        answer: "1",
        knowledge_point: "三角形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "235",
        question: "一个平行四边形的底是16cm，高是13cm，面积是多少？",
        options: ["208cm²", "29cm²", "104cm²", "64cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "236",
        question: "一个长方体的长是20cm，宽是15cm，高是8cm，表面积是多少？",
        options: ["1180cm²", "1160cm²", "1200cm²", "1140cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "237",
        question: "一个正方体的棱长是10cm，体积是多少？",
        options: ["100cm³", "1000cm³", "30cm³", "600cm³"],
        answer: "1",
        knowledge_point: "正方体体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "238",
        question: "一个圆柱的底面直径是18cm，高是16cm，体积是多少？（π取3.14）",
        options: ["4069.44cm³", "2034.72cm³", "10173.6cm³", "16277.76cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "239",
        question: "一个圆锥的底面直径是16cm，高是21cm，体积是多少？（π取3.14）",
        options: ["1406.72cm³", "4220.16cm³", "2813.44cm³", "703.36cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "240",
        question: "解方程：12x - 15 = 57，x = ?",
        options: ["6", "7", "5", "8"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "241",
        question: "解方程：13x + 21 = 86，x = ?",
        options: ["5", "65", "107", "8.23"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "242",
        question: "一个比例是7:8 = 14:x，x = ?",
        options: ["15", "16", "17", "18"],
        answer: "1",
        knowledge_point: "比例",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "243",
        question: "甲数是乙数的7倍，乙数是30，甲数是多少？",
        options: ["210", "4.29", "37", "23"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "244",
        question: "一个数的5/6是25，这个数是多少？",
        options: ["30", "20.83", "15", "35"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "245",
        question: "甲乙两地相距480千米，一辆汽车以每小时120千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "246",
        question: "一件商品原价800元，打九折后是多少元？",
        options: ["720元", "80元", "780元", "640元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "247",
        question: "一个数增加60%后是160，这个数是多少？",
        options: ["100", "256", "64", "260"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "248",
        question: "一个梯形的上底是9cm，下底是13cm，高是10cm，面积是多少？",
        options: ["110cm²", "90cm²", "130cm²", "220cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "249",
        question: "一个三角形的底是20cm，高是16cm，面积是多少？",
        options: ["320cm²", "160cm²", "36cm²", "72cm²"],
        answer: "1",
        knowledge_point: "三角形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "250",
        question: "一个平行四边形的底是18cm，高是15cm，面积是多少？",
        options: ["270cm²", "33cm²", "135cm²", "72cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "五年级",
        subject: "数学"
      },
      {
        id: "251",
        question: "3.6 + 4.8 = ?",
        options: ["8.4", "7.8", "8.14", "7.14"],
        answer: "0",
        knowledge_point: "小数的加减法",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "252",
        question: "9.5 - 3.7 = ?",
        options: ["5.8", "6.8", "5.2", "6.2"],
        answer: "0",
        knowledge_point: "小数的减法",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "253",
        question: "2.4 × 5 = ?",
        options: ["12", "120", "1.2", "7.4"],
        answer: "0",
        knowledge_point: "小数乘整数",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "254",
        question: "8.1 ÷ 0.9 = ?",
        options: ["9", "0.9", "90", "0.09"],
        answer: "0",
        knowledge_point: "小数除小数",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "255",
        question: "4/7 + 2/7 = ?",
        options: ["6/7", "2/7", "8/49", "6/49"],
        answer: "0",
        knowledge_point: "同分母分数加法",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "256",
        question: "9/10 - 3/10 = ?",
        options: ["6/10", "3/5", "12/20", "6/20"],
        answer: "0",
        knowledge_point: "同分母分数减法",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "257",
        question: "3/4 × 2/3 = ?",
        options: ["6/12", "1/2", "5/7", "9/12"],
        answer: "1",
        knowledge_point: "分数乘分数",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "258",
        question: "7/8 ÷ 3/4 = ?",
        options: ["7/6", "21/32", "7/32", "21/8"],
        answer: "0",
        knowledge_point: "分数除分数",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "259",
        question: "一个圆的半径是6cm，面积是多少？（π取3.14）",
        options: ["113.04cm²", "37.68cm²", "36cm²", "18.84cm²"],
        answer: "0",
        knowledge_point: "圆的面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "260",
        question: "一个圆的直径是12cm，周长是多少？（π取3.14）",
        options: ["37.68cm", "113.04cm", "18.84cm", "36cm"],
        answer: "0",
        knowledge_point: "圆的周长",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "261",
        question: "一个长方体的长是10cm，宽是6cm，高是5cm，体积是多少？",
        options: ["300cm³", "21cm³", "60cm³", "120cm³"],
        answer: "0",
        knowledge_point: "长方体的体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "262",
        question: "一个正方体的棱长是7cm，表面积是多少？",
        options: ["294cm²", "49cm²", "343cm²", "21cm²"],
        answer: "0",
        knowledge_point: "正方体的表面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "263",
        question: "一个圆柱的底面半径是4cm，高是8cm，体积是多少？（π取3.14）",
        options: ["401.92cm³", "100.48cm³", "803.84cm³", "50.24cm³"],
        answer: "0",
        knowledge_point: "圆柱的体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "264",
        question: "一个圆锥的底面半径是5cm，高是8cm，体积是多少？（π取3.14）",
        options: ["209.33cm³", "628cm³", "314cm³", "157cm³"],
        answer: "0",
        knowledge_point: "圆锥的体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "265",
        question: "解方程：3x + 5 = 20，x = ?",
        options: ["5", "15", "25", "6.67"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "266",
        question: "解方程：4x - 7 = 21，x = ?",
        options: ["7", "28", "14", "3.5"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "267",
        question: "一个比例是3:4 = 6:x，x = ?",
        options: ["8", "7", "9", "10"],
        answer: "0",
        knowledge_point: "比例",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "268",
        question: "甲数是乙数的2倍，甲数是30，乙数是多少？",
        options: ["15", "60", "28", "32"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "269",
        question: "一个数的4/5是16，这个数是多少？",
        options: ["20", "12.8", "12", "25"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "270",
        question: "甲乙两地相距300千米，一辆汽车以每小时75千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "271",
        question: "一件商品原价250元，打八折后是多少元？",
        options: ["200元", "50元", "225元", "175元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "272",
        question: "一个数增加20%后是120，这个数是多少？",
        options: ["100", "144", "96", "150"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "273",
        question: "一个梯形的上底是5cm，下底是9cm，高是6cm，面积是多少？",
        options: ["42cm²", "28cm²", "54cm²", "84cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "274",
        question: "一个三角形的底是12cm，高是8cm，面积是多少？",
        options: ["48cm²", "96cm²", "20cm²", "40cm²"],
        answer: "0",
        knowledge_point: "三角形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "275",
        question: "一个平行四边形的底是10cm，高是7cm，面积是多少？",
        options: ["70cm²", "17cm²", "35cm²", "34cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "276",
        question: "一个长方体的长是12cm，宽是8cm，高是5cm，表面积是多少？",
        options: ["392cm²", "480cm²", "432cm²", "376cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "277",
        question: "一个正方体的棱长是6cm，体积是多少？",
        options: ["216cm³", "36cm³", "24cm³", "72cm³"],
        answer: "0",
        knowledge_point: "正方体体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "278",
        question: "一个圆柱的底面直径是10cm，高是10cm，体积是多少？（π取3.14）",
        options: ["785cm³", "314cm³", "1570cm³", "2512cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "279",
        question: "一个圆锥的底面直径是8cm，高是10cm，体积是多少？（π取3.14）",
        options: ["167.47cm³", "502.4cm³", "334.93cm³", "83.73cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "280",
        question: "解方程：5x + 8 = 38，x = ?",
        options: ["6", "30", "46", "7.6"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "281",
        question: "解方程：6x - 9 = 33，x = ?",
        options: ["7", "42", "24", "4"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "282",
        question: "一个比例是4:5 = 8:x，x = ?",
        options: ["10", "9", "11", "12"],
        answer: "0",
        knowledge_point: "比例",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "283",
        question: "甲数是乙数的3倍，甲数是36，乙数是多少？",
        options: ["12", "108", "33", "39"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "284",
        question: "一个数的5/6是20，这个数是多少？",
        options: ["24", "16.67", "15", "30"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "285",
        question: "甲乙两地相距360千米，一辆汽车以每小时90千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "286",
        question: "一件商品原价350元，打七折后是多少元？",
        options: ["245元", "105元", "315元", "280元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "287",
        question: "一个数增加30%后是130，这个数是多少？",
        options: ["100", "169", "91", "170"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "288",
        question: "一个梯形的上底是6cm，下底是10cm，高是7cm，面积是多少？",
        options: ["56cm²", "42cm²", "70cm²", "112cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "289",
        question: "一个三角形的底是14cm，高是10cm，面积是多少？",
        options: ["70cm²", "140cm²", "24cm²", "48cm²"],
        answer: "0",
        knowledge_point: "三角形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "290",
        question: "一个平行四边形的底是12cm，高是9cm，面积是多少？",
        options: ["108cm²", "21cm²", "54cm²", "48cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "291",
        question: "一个长方体的长是14cm，宽是10cm，高是6cm，表面积是多少？",
        options: ["548cm²", "840cm²", "608cm²", "484cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "292",
        question: "一个正方体的棱长是8cm，体积是多少？",
        options: ["512cm³", "64cm³", "32cm³", "96cm³"],
        answer: "0",
        knowledge_point: "正方体体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "293",
        question: "一个圆柱的底面直径是12cm，高是12cm，体积是多少？（π取3.14）",
        options: ["1356.48cm³", "678.24cm³", "2712.96cm³", "4329.6cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "294",
        question: "一个圆锥的底面直径是10cm，高是12cm，体积是多少？（π取3.14）",
        options: ["314cm³", "942cm³", "628cm³", "157cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "295",
        question: "解方程：7x + 11 = 46，x = ?",
        options: ["5", "35", "57", "6.57"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "296",
        question: "解方程：8x - 13 = 43，x = ?",
        options: ["7", "56", "30", "4.38"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "297",
        question: "一个比例是5:6 = 10:x，x = ?",
        options: ["12", "11", "13", "14"],
        answer: "0",
        knowledge_point: "比例",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "298",
        question: "甲数是乙数的4倍，甲数是40，乙数是多少？",
        options: ["10", "160", "36", "44"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "299",
        question: "一个数的3/4是18，这个数是多少？",
        options: ["24", "13.5", "12", "30"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "300",
        question: "甲乙两地相距420千米，一辆汽车以每小时105千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "301",
        question: "一件商品原价450元，打八五折后是多少元？",
        options: ["382.5元", "67.5元", "427.5元", "315元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "302",
        question: "一个数增加40%后是140，这个数是多少？",
        options: ["100", "196", "84", "200"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "303",
        question: "一个梯形的上底是7cm，下底是11cm，高是8cm，面积是多少？",
        options: ["72cm²", "56cm²", "88cm²", "144cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "304",
        question: "一个三角形的底是16cm，高是12cm，面积是多少？",
        options: ["96cm²", "192cm²", "28cm²", "56cm²"],
        answer: "0",
        knowledge_point: "三角形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "305",
        question: "一个平行四边形的底是14cm，高是11cm，面积是多少？",
        options: ["154cm²", "25cm²", "77cm²", "56cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "306",
        question: "一个长方体的长是16cm，宽是12cm，高是7cm，表面积是多少？",
        options: ["728cm²", "1344cm²", "848cm²", "608cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "307",
        question: "一个正方体的棱长是9cm，体积是多少？",
        options: ["729cm³", "81cm³", "36cm³", "108cm³"],
        answer: "0",
        knowledge_point: "正方体体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "308",
        question: "一个圆柱的底面直径是14cm，高是14cm，体积是多少？（π取3.14）",
        options: ["2154.04cm³", "1077.02cm³", "4308.08cm³", "6869.28cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "309",
        question: "一个圆锥的底面直径是12cm，高是14cm，体积是多少？（π取3.14）",
        options: ["527.52cm³", "1582.56cm³", "1055.04cm³", "263.76cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "310",
        question: "解方程：9x + 14 = 59，x = ?",
        options: ["5", "45", "73", "6.56"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "311",
        question: "解方程：10x - 17 = 53，x = ?",
        options: ["7", "70", "36", "3.6"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "312",
        question: "一个比例是6:7 = 12:x，x = ?",
        options: ["14", "13", "15", "16"],
        answer: "0",
        knowledge_point: "比例",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "313",
        question: "甲数是乙数的5倍，甲数是50，乙数是多少？",
        options: ["10", "250", "45", "55"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "314",
        question: "一个数的2/3是14，这个数是多少？",
        options: ["21", "9.33", "10", "28"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "315",
        question: "甲乙两地相距480千米，一辆汽车以每小时120千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "316",
        question: "一件商品原价550元，打九折后是多少元？",
        options: ["495元", "55元", "539.5元", "440元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "317",
        question: "一个数增加50%后是150，这个数是多少？",
        options: ["100", "225", "75", "200"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "318",
        question: "一个梯形的上底是8cm，下底是12cm，高是9cm，面积是多少？",
        options: ["90cm²", "72cm²", "108cm²", "180cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "319",
        question: "一个三角形的底是18cm，高是14cm，面积是多少？",
        options: ["126cm²", "252cm²", "32cm²", "64cm²"],
        answer: "0",
        knowledge_point: "三角形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "320",
        question: "一个平行四边形的底是16cm，高是13cm，面积是多少？",
        options: ["208cm²", "29cm²", "104cm²", "64cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "321",
        question: "一个长方体的长是18cm，宽是14cm，高是8cm，表面积是多少？",
        options: ["1064cm²", "2016cm²", "1168cm²", "760cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "322",
        question: "一个正方体的棱长是10cm，体积是多少？",
        options: ["1000cm³", "100cm³", "40cm³", "120cm³"],
        answer: "0",
        knowledge_point: "正方体体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "323",
        question: "一个圆柱的底面直径是16cm，高是16cm，体积是多少？（π取3.14）",
        options: ["3215.36cm³", "1607.68cm³", "6430.72cm³", "10289.28cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "324",
        question: "一个圆锥的底面直径是14cm，高是16cm，体积是多少？（π取3.14）",
        options: ["820.16cm³", "2460.48cm³", "1640.32cm³", "410.08cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "325",
        question: "解方程：11x + 17 = 72，x = ?",
        options: ["5", "55", "89", "6.55"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "326",
        question: "解方程：12x - 19 = 65，x = ?",
        options: ["7", "84", "46", "4.08"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "327",
        question: "一个比例是7:8 = 14:x，x = ?",
        options: ["16", "15", "17", "18"],
        answer: "0",
        knowledge_point: "比例",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "328",
        question: "甲数是乙数的6倍，甲数是60，乙数是多少？",
        options: ["10", "360", "54", "66"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "329",
        question: "一个数的4/5是24，这个数是多少？",
        options: ["30", "19.2", "15", "36"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "330",
        question: "甲乙两地相距540千米，一辆汽车以每小时135千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "331",
        question: "一件商品原价650元，打七五折后是多少元？",
        options: ["487.5元", "162.5元", "632.5元", "520元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "332",
        question: "一个数增加60%后是160，这个数是多少？",
        options: ["100", "256", "64", "260"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "333",
        question: "一个梯形的上底是9cm，下底是13cm，高是10cm，面积是多少？",
        options: ["110cm²", "90cm²", "130cm²", "220cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "334",
        question: "一个三角形的底是20cm，高是16cm，面积是多少？",
        options: ["160cm²", "320cm²", "36cm²", "72cm²"],
        answer: "0",
        knowledge_point: "三角形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "335",
        question: "一个平行四边形的底是18cm，高是15cm，面积是多少？",
        options: ["270cm²", "33cm²", "135cm²", "72cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "336",
        question: "一个长方体的长是20cm，宽是16cm，高是9cm，表面积是多少？",
        options: ["1408cm²", "2880cm²", "1568cm²", "888cm²"],
        answer: "0",
        knowledge_point: "长方体表面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "337",
        question: "一个正方体的棱长是11cm，体积是多少？",
        options: ["1331cm³", "121cm³", "44cm³", "132cm³"],
        answer: "0",
        knowledge_point: "正方体体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "338",
        question: "一个圆柱的底面直径是18cm，高是18cm，体积是多少？（π取3.14）",
        options: ["4578.12cm³", "2289.06cm³", "9156.24cm³", "14649.92cm³"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "339",
        question: "一个圆锥的底面直径是16cm，高是18cm，体积是多少？（π取3.14）",
        options: ["1205.76cm³", "3617.28cm³", "2411.52cm³", "602.88cm³"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "340",
        question: "解方程：13x + 20 = 85，x = ?",
        options: ["5", "65", "105", "6.54"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "341",
        question: "解方程：14x - 21 = 77，x = ?",
        options: ["7", "98", "56", "4.07"],
        answer: "0",
        knowledge_point: "解方程",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "342",
        question: "一个比例是8:9 = 16:x，x = ?",
        options: ["18", "17", "19", "20"],
        answer: "0",
        knowledge_point: "比例",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "343",
        question: "甲数是乙数的7倍，甲数是70，乙数是多少？",
        options: ["10", "490", "63", "77"],
        answer: "0",
        knowledge_point: "倍数关系",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "344",
        question: "一个数的5/6是25，这个数是多少？",
        options: ["30", "20.83", "15", "35"],
        answer: "0",
        knowledge_point: "分数除法应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "345",
        question: "甲乙两地相距600千米，一辆汽车以每小时150千米的速度行驶，需要几小时？",
        options: ["4小时", "3小时", "5小时", "6小时"],
        answer: "0",
        knowledge_point: "行程问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "346",
        question: "一件商品原价750元，打八折后是多少元？",
        options: ["600元", "150元", "735元", "525元"],
        answer: "0",
        knowledge_point: "折扣问题",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "347",
        question: "一个数增加70%后是170，这个数是多少？",
        options: ["100", "289", "51", "340"],
        answer: "0",
        knowledge_point: "百分数应用",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "348",
        question: "一个梯形的上底是10cm，下底是14cm，高是11cm，面积是多少？",
        options: ["132cm²", "110cm²", "154cm²", "308cm²"],
        answer: "0",
        knowledge_point: "梯形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "349",
        question: "一个三角形的底是22cm，高是18cm，面积是多少？",
        options: ["198cm²", "396cm²", "40cm²", "80cm²"],
        answer: "0",
        knowledge_point: "三角形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "350",
        question: "一个平行四边形的底是20cm，高是17cm，面积是多少？",
        options: ["340cm²", "37cm²", "170cm²", "80cm²"],
        answer: "0",
        knowledge_point: "平行四边形面积",
        grade: "六年级",
        subject: "数学"
      },
      {
        id: "351",
        question: "下列哪个词语书写正确？",
        options: ["美丽", "美立", "美厉", "美利"],
        answer: "0",
        knowledge_point: "词语的书写",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "352",
        question: "下列哪个句子使用了比喻？",
        options: ["月亮像圆盘", "月亮很圆", "月亮在天上", "我喜欢月亮"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "353",
        question: "下列哪个是反义词？",
        options: ["大-小", "大-多", "大-高", "大-长"],
        answer: "0",
        knowledge_point: "词语的理解",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "354",
        question: "下列哪个句子是陈述句？",
        options: ["你吃饭了吗？", "请把门关上", "今天天气真好", "多么美丽的花朵啊"],
        answer: "2",
        knowledge_point: "句子的理解和运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "355",
        question: "下列哪个词语是AABB式？",
        options: ["高兴", "开开心心", "美丽", "快乐"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "356",
        question: "下列哪个是量词？",
        options: ["一", "个", "书", "看"],
        answer: "1",
        knowledge_point: "量词的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "357",
        question: "下列哪个句子使用了拟人？",
        options: ["小鸟在唱歌", "小鸟在飞", "小鸟很可爱", "小鸟在树上"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "358",
        question: "下列哪个是近义词？",
        options: ["大-小", "大-巨", "大-多", "大-高"],
        answer: "1",
        knowledge_point: "词语的理解",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "359",
        question: "下列哪个句子是疑问句？",
        options: ["你吃饭了吗？", "今天天气真好", "请把门关上", "多么美丽的花朵啊"],
        answer: "0",
        knowledge_point: "句子的理解和运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "360",
        question: "下列哪个词语是ABAC式？",
        options: ["高兴", "一心一意", "开开心心", "美丽"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "361",
        question: "下列哪个是正确的标点符号使用？",
        options: ["你好，", "你好。", "你好！", "你好，"],
        answer: "2",
        knowledge_point: "标点符号的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "362",
        question: "下列哪个句子使用了排比？",
        options: ["天是蓝的，水是清的，草是绿的", "天很蓝", "水很清", "草很绿"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "363",
        question: "下列哪个是褒义词？",
        options: ["勇敢", "胆小", "懒惰", "愚蠢"],
        answer: "0",
        knowledge_point: "词语的感情色彩",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "364",
        question: "下列哪个句子是祈使句？",
        options: ["你吃饭了吗？", "今天天气真好", "请把门关上", "多么美丽的花朵啊"],
        answer: "2",
        knowledge_point: "句子的理解和运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "365",
        question: "下列哪个词语是ABB式？",
        options: ["高兴", "红彤彤", "开开心心", "美丽"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "366",
        question: "下列哪个是贬义词？",
        options: ["勇敢", "聪明", "懒惰", "勤奋"],
        answer: "2",
        knowledge_point: "词语的感情色彩",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "367",
        question: "下列哪个句子使用了夸张？",
        options: ["他跑得比风还快", "他跑得很快", "他在跑步", "他喜欢跑步"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "368",
        question: "下列哪个是中性词？",
        options: ["勇敢", "胆小", "懒惰", "桌子"],
        answer: "3",
        knowledge_point: "词语的感情色彩",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "369",
        question: "下列哪个句子是感叹句？",
        options: ["你吃饭了吗？", "今天天气真好", "请把门关上", "多么美丽的花朵啊"],
        answer: "3",
        knowledge_point: "句子的理解和运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "370",
        question: "下列哪个词语是AABC式？",
        options: ["高兴", "津津有味", "开开心心", "红彤彤"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "371",
        question: "下列哪个成语使用正确？",
        options: ["他画龙点睛地总结了全文", "他画蛇添足地总结了全文", "他画饼充饥地总结了全文", "他画地为牢地总结了全文"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "372",
        question: "下列哪个句子使用了设问？",
        options: ["什么是爱？爱是关心和帮助", "什么是爱？", "爱是关心", "什么是爱啊"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "373",
        question: "下列哪个是正确的句子？",
        options: ["我吃了一个苹果", "我吃了一个苹果和", "我吃了一个", "我吃了苹果一个"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "374",
        question: "下列哪个词语是ABCC式？",
        options: ["高兴", "生机勃勃", "开开心心", "红彤彤"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "375",
        question: "下列哪个成语使用正确？",
        options: ["他守株待兔地等待机会", "他守株待兔地抓住了机会", "他守株待兔地放弃了机会", "他守株待兔地错过了机会"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "376",
        question: "下列哪个句子使用了反问？",
        options: ["难道这不是真的吗？", "这是真的吗？", "这是真的", "这是真的啊"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "377",
        question: "下列哪个是正确的句子？",
        options: ["我和他去公园", "我和他到公园", "我和他公园去", "我和他公园到"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "378",
        question: "下列哪个词语是ABAB式？",
        options: ["高兴", "研究研究", "开开心心", "红彤彤"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "379",
        question: "下列哪个成语使用正确？",
        options: ["他亡羊补牢地改正了错误", "他亡羊补牢地犯了错误", "他亡羊补牢地忘记了错误", "他亡羊补牢地重复了错误"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "380",
        question: "下列哪个句子使用了借代？",
        options: ["红领巾在阳光下闪闪发光", "红领巾很红", "红领巾在飘扬", "红领巾很漂亮"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "381",
        question: "下列哪个是正确的句子？",
        options: ["他认真地做作业", "他认真做作业", "他认真地作业", "他认真作业"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "382",
        question: "下列哪个词语是AABB式？",
        options: ["高兴", "干干净净", "红彤彤", "研究研究"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "383",
        question: "下列哪个成语使用正确？",
        options: ["他掩耳盗铃地自欺欺人", "他掩耳盗铃地帮助别人", "他掩耳盗铃地努力学习", "他掩耳盗铃地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "384",
        question: "下列哪个句子使用了对比？",
        options: ["他虽然学习不好，但是很努力", "他学习不好", "他很努力", "他学习"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "385",
        question: "下列哪个是正确的句子？",
        options: ["我在家里看书", "我家里看书", "我在看书家里", "我看书在家里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "386",
        question: "下列哪个词语是ABB式？",
        options: ["高兴", "绿油油", "干干净净", "研究研究"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "387",
        question: "下列哪个成语使用正确？",
        options: ["他刻舟求剑地固守旧法", "他刻舟求剑地创新方法", "他刻舟求剑地努力学习", "他刻舟求剑地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "388",
        question: "下列哪个句子使用了反复？",
        options: ["盼望着，盼望着，春天来了", "春天来了", "我盼望春天", "春天很美"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "389",
        question: "下列哪个是正确的句子？",
        options: ["他高兴地跳了起来", "他高兴跳了起来", "他高兴地跳起来", "他高兴跳起来"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "390",
        question: "下列哪个词语是ABAC式？",
        options: ["高兴", "自言自语", "绿油油", "干干净净"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "391",
        question: "下列哪个成语使用正确？",
        options: ["他拔苗助长地急于求成", "他拔苗助长地耐心等待", "他拔苗助长地努力学习", "他拔苗助长地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "392",
        question: "下列哪个句子使用了引用？",
        options: ["老师说：'好好学习，天天向上'", "老师说好好学习", "老师天天向上", "老师学习"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "393",
        question: "下列哪个是正确的句子？",
        options: ["我们一起去上学", "我们上学一起去", "我们一上学起去", "我们上学去一起"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "394",
        question: "下列哪个词语是AABC式？",
        options: ["高兴", "依依不舍", "自言自语", "绿油油"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "395",
        question: "下列哪个成语使用正确？",
        options: ["他狐假虎威地欺负同学", "他狐假虎威地帮助同学", "他狐假虎威地努力学习", "他狐假虎威地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "396",
        question: "下列哪个句子使用了顶真？",
        options: ["山朗润起来了，水涨起来了", "山朗润起来了", "水涨起来了", "山水"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "397",
        question: "下列哪个是正确的句子？",
        options: ["他认真地听老师讲课", "他认真听老师讲课", "他认真地老师讲课", "他认真老师讲课"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "398",
        question: "下列哪个词语是ABCC式？",
        options: ["高兴", "小心翼翼", "依依不舍", "自言自语"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "399",
        question: "下列哪个成语使用正确？",
        options: ["他井底之蛙地见识短浅", "他井底之蛙地见识广博", "他井底之蛙地努力学习", "他井底之蛙地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "400",
        question: "下列哪个句子使用了通感？",
        options: ["微风过处，送来缕缕清香，仿佛远处高楼上渺茫的歌声似的", "微风过处", "送来缕缕清香", "远处高楼上渺茫的歌声"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "401",
        question: "下列哪个是正确的句子？",
        options: ["我们在操场上踢足球", "我们操场上踢足球", "我们在踢足球操场上", "我们踢足球在操场上"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "402",
        question: "下列哪个词语是ABAB式？",
        options: ["高兴", "讨论讨论", "小心翼翼", "依依不舍"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "403",
        question: "下列哪个成语使用正确？",
        options: ["他叶公好龙地表面喜欢", "他叶公好龙地真心喜欢", "他叶公好龙地努力学习", "他叶公好龙地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "404",
        question: "下列哪个句子使用了互文？",
        options: ["烟笼寒水月笼沙", "烟笼寒水", "月笼沙", "烟月"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "405",
        question: "下列哪个是正确的句子？",
        options: ["他高兴地笑了", "他高兴笑了", "他高兴地笑", "他高兴笑"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "406",
        question: "下列哪个词语是AABB式？",
        options: ["高兴", "整整齐齐", "讨论讨论", "小心翼翼"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "407",
        question: "下列哪个成语使用正确？",
        options: ["他滥竽充数地混在队伍里", "他滥竽充数地认真工作", "他滥竽充数地努力学习", "他滥竽充数地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "408",
        question: "下列哪个句子使用了双关？",
        options: ["东边日出西边雨，道是无晴却有晴", "东边日出", "西边雨", "道是无晴"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "409",
        question: "下列哪个是正确的句子？",
        options: ["我们认真地完成作业", "我们认真完成作业", "我们认真地作业", "我们认真作业"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "410",
        question: "下列哪个词语是ABB式？",
        options: ["高兴", "金灿灿", "整整齐齐", "讨论讨论"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "411",
        question: "下列哪个成语使用正确？",
        options: ["他自相矛盾地前后矛盾", "他自相矛盾地前后一致", "他自相矛盾地努力学习", "他自相矛盾地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "412",
        question: "下列哪个句子使用了回文？",
        options: ["上海自来水来自海上", "上海自来水", "来自海上", "海上"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "413",
        question: "下列哪个是正确的句子？",
        options: ["他在教室里读书", "他教室里读书", "他在读书教室里", "他读书在教室里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "414",
        question: "下列哪个词语是ABAC式？",
        options: ["高兴", "多才多艺", "金灿灿", "整整齐齐"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "415",
        question: "下列哪个成语使用正确？",
        options: ["他南辕北辙地背道而驰", "他南辕北辙地同向而行", "他南辕北辙地努力学习", "他南辕北辙地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "416",
        question: "下列哪个句子使用了倒装？",
        options: ["起来，不愿做奴隶的人们", "不愿做奴隶的人们起来", "人们起来", "起来人们"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "417",
        question: "下列哪个是正确的句子？",
        options: ["我们在公园里玩耍", "我们公园里玩耍", "我们在玩耍公园里", "我们玩耍在公园里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "418",
        question: "下列哪个词语是AABC式？",
        options: ["高兴", "恋恋不舍", "多才多艺", "金灿灿"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "419",
        question: "下列哪个成语使用正确？",
        options: ["他杞人忧天地担心天会塌下来", "他杞人忧天地相信天不会塌", "他杞人忧天地努力学习", "他杞人忧天地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "420",
        question: "下列哪个句子使用了层递？",
        options: ["一座座，一排排，一列列", "一座座", "一排排", "一列列"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "421",
        question: "下列哪个是正确的句子？",
        options: ["他认真地思考问题", "他认真思考问题", "他认真地问题", "他认真问题"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "422",
        question: "下列哪个词语是ABCC式？",
        options: ["高兴", "生机勃勃", "恋恋不舍", "多才多艺"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "423",
        question: "下列哪个成语使用正确？",
        options: ["他杯弓蛇影地疑神疑鬼", "他杯弓蛇影地心胸开阔", "他杯弓蛇影地努力学习", "他杯弓蛇影地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "424",
        question: "下列哪个句子使用了拈连？",
        options: ["蜜蜂是在酿蜜，又是在酿造生活", "蜜蜂是在酿蜜", "蜜蜂是在酿造生活", "蜜蜂酿蜜"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "425",
        question: "下列哪个是正确的句子？",
        options: ["我们在图书馆里看书", "我们图书馆里看书", "我们在看书图书馆里", "我们看书在图书馆里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "426",
        question: "下列哪个词语是ABAB式？",
        options: ["高兴", "打扫打扫", "生机勃勃", "恋恋不舍"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "427",
        question: "下列哪个成语使用正确？",
        options: ["他画蛇添足地多此一举", "他画蛇添足地恰到好处", "他画蛇添足地努力学习", "他画蛇添足地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "428",
        question: "下列哪个句子使用了移觉？",
        options: ["微风过处，送来缕缕清香，仿佛远处高楼上渺茫的歌声似的", "微风过处", "送来缕缕清香", "远处高楼上渺茫的歌声"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "429",
        question: "下列哪个是正确的句子？",
        options: ["他高兴地唱起了歌", "他高兴唱起了歌", "他高兴地唱起歌", "他高兴唱起歌"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "430",
        question: "下列哪个词语是AABB式？",
        options: ["高兴", "欢欢喜喜", "打扫打扫", "生机勃勃"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "431",
        question: "下列哪个成语使用正确？",
        options: ["他守株待兔地等待机会", "他守株待兔地创造机会", "他守株待兔地努力学习", "他守株待兔地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "432",
        question: "下列哪个句子使用了反语？",
        options: ["你真是个'聪明'人", "你真是个聪明人", "你很聪明", "你聪明"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "433",
        question: "下列哪个是正确的句子？",
        options: ["我们在操场上跑步", "我们操场上跑步", "我们在跑步操场上", "我们跑步在操场上"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "434",
        question: "下列哪个词语是ABB式？",
        options: ["高兴", "亮晶晶", "欢欢喜喜", "打扫打扫"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "435",
        question: "下列哪个成语使用正确？",
        options: ["他亡羊补牢地及时改正", "他亡羊补牢地继续犯错", "他亡羊补牢地努力学习", "他亡羊补牢地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "436",
        question: "下列哪个句子使用了仿拟？",
        options: ["满招损，谦受益", "满招损", "谦受益", "损益"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "437",
        question: "下列哪个是正确的句子？",
        options: ["他在河边钓鱼", "他河边钓鱼", "他在钓鱼河边", "他钓鱼在河边"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "438",
        question: "下列哪个词语是ABAC式？",
        options: ["高兴", "全心全意", "亮晶晶", "欢欢喜喜"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "439",
        question: "下列哪个成语使用正确？",
        options: ["他掩耳盗铃地自欺欺人", "他掩耳盗铃地诚实守信", "他掩耳盗铃地努力学习", "他掩耳盗铃地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "440",
        question: "下列哪个句子使用了列锦？",
        options: ["枯藤老树昏鸦，小桥流水人家", "枯藤老树", "小桥流水", "人家"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "441",
        question: "下列哪个是正确的句子？",
        options: ["我们在教室里上课", "我们教室里上课", "我们在上课教室里", "我们上课在教室里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "442",
        question: "下列哪个词语是AABC式？",
        options: ["高兴", "心心相印", "全心全意", "亮晶晶"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "443",
        question: "下列哪个成语使用正确？",
        options: ["他刻舟求剑地固守旧法", "他刻舟求剑地创新方法", "他刻舟求剑地努力学习", "他刻舟求剑地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "444",
        question: "下列哪个句子使用了联珠？",
        options: ["山朗润起来了，水涨起来了", "山朗润起来了", "水涨起来了", "山水"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "445",
        question: "下列哪个是正确的句子？",
        options: ["他在家里做作业", "他家里做作业", "他在做作业家里", "他做作业在家里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "446",
        question: "下列哪个词语是ABCC式？",
        options: ["高兴", "得意洋洋", "心心相印", "全心全意"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "447",
        question: "下列哪个成语使用正确？",
        options: ["他拔苗助长地急于求成", "他拔苗助长地耐心等待", "他拔苗助长地努力学习", "他拔苗助长地取得成功"],
        answer: "0",
        knowledge_point: "成语的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "448",
        question: "下列哪个句子使用了分承？",
        options: ["父析子荷", "父析", "子荷", "析荷"],
        answer: "0",
        knowledge_point: "修辞手法的运用",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "449",
        question: "下列哪个是正确的句子？",
        options: ["我们在食堂里吃饭", "我们食堂里吃饭", "我们在吃饭食堂里", "我们吃饭在食堂里"],
        answer: "0",
        knowledge_point: "句子的完整性",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "450",
        question: "下列哪个词语是ABAB式？",
        options: ["高兴", "学习学习", "得意洋洋", "心心相印"],
        answer: "1",
        knowledge_point: "词语的结构",
        grade: "四年级",
        subject: "语文"
      },
      {
        id: "451",
        question: "下列哪个是物理现象？",
        options: ["水结冰", "铁生锈", "木材燃烧", "食物腐烂"],
        answer: "0",
        knowledge_point: "物理现象",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "452",
        question: "声音的传播需要什么？",
        options: ["真空", "介质", "光线", "电力"],
        answer: "1",
        knowledge_point: "声音的传播",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "453",
        question: "光在真空中的传播速度是多少？",
        options: ["3×10^8 m/s", "3×10^6 m/s", "3×10^5 m/s", "3×10^4 m/s"],
        answer: "0",
        knowledge_point: "光的传播速度",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "454",
        question: "下列哪个是力的单位？",
        options: ["焦耳", "牛顿", "瓦特", "帕斯卡"],
        answer: "1",
        knowledge_point: "力的单位",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "455",
        question: "质量为1kg的物体受到的重力大约是多少？",
        options: ["1N", "10N", "100N", "1000N"],
        answer: "1",
        knowledge_point: "重力",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "456",
        question: "下列哪个是化学变化？",
        options: ["冰融化", "纸张燃烧", "汽油挥发", "矿石粉碎"],
        answer: "1",
        knowledge_point: "化学变化",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "457",
        question: "空气的主要成分是什么？",
        options: ["氧气", "氮气", "二氧化碳", "氢气"],
        answer: "1",
        knowledge_point: "空气的成分",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "458",
        question: "水的化学式是什么？",
        options: ["H2O", "CO2", "O2", "H2"],
        answer: "0",
        knowledge_point: "化学式",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "459",
        question: "下列哪个是纯净物？",
        options: ["空气", "海水", "蒸馏水", "矿泉水"],
        answer: "2",
        knowledge_point: "纯净物与混合物",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "460",
        question: "植物进行光合作用的场所是？",
        options: ["线粒体", "叶绿体", "细胞核", "液泡"],
        answer: "1",
        knowledge_point: "光合作用",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "461",
        question: "人体最大的器官是？",
        options: ["心脏", "肝脏", "皮肤", "肺"],
        answer: "2",
        knowledge_point: "人体器官",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "462",
        question: "下列哪个是单细胞生物？",
        options: ["草履虫", "金鱼", "蚂蚁", "麻雀"],
        answer: "0",
        knowledge_point: "单细胞生物",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "463",
        question: "植物细胞特有的结构是？",
        options: ["细胞核", "细胞膜", "叶绿体", "线粒体"],
        answer: "2",
        knowledge_point: "植物细胞",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "464",
        question: "下列哪个是哺乳动物？",
        options: ["鲨鱼", "鳄鱼", "海豚", "青蛙"],
        answer: "2",
        knowledge_point: "哺乳动物",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "465",
        question: "密度公式是什么？",
        options: ["ρ = m/V", "ρ = V/m", "ρ = m×V", "ρ = m+V"],
        answer: "0",
        knowledge_point: "密度",
        grade: "八年级",
        subject: "物理"
      },
      {
        id: "466",
        question: "1标准大气压等于多少帕斯卡？",
        options: ["1.013×10^5 Pa", "1.013×10^4 Pa", "1.013×10^6 Pa", "1.013×10^3 Pa"],
        answer: "0",
        knowledge_point: "大气压强",
        grade: "八年级",
        subject: "物理"
      },
      {
        id: "467",
        question: "下列哪个是导体？",
        options: ["橡胶", "塑料", "铜", "玻璃"],
        answer: "2",
        knowledge_point: "导体与绝缘体",
        grade: "八年级",
        subject: "物理"
      },
      {
        id: "468",
        question: "电流的单位是什么？",
        options: ["伏特", "安培", "欧姆", "瓦特"],
        answer: "1",
        knowledge_point: "电流单位",
        grade: "八年级",
        subject: "物理"
      },
      {
        id: "469",
        question: "欧姆定律的公式是？",
        options: ["I = U/R", "U = I/R", "R = I/U", "I = U×R"],
        answer: "0",
        knowledge_point: "欧姆定律",
        grade: "八年级",
        subject: "物理"
      },
      {
        id: "470",
        question: "下列哪个反应属于化合反应？",
        options: ["CaCO3 → CaO + CO2", "2H2 + O2 → 2H2O", "CH4 + 2O2 → CO2 + 2H2O", "Zn + H2SO4 → ZnSO4 + H2"],
        answer: "1",
        knowledge_point: "化学反应类型",
        grade: "八年级",
        subject: "化学"
      },
      {
        id: "471",
        question: "下列哪个是酸？",
        options: ["NaOH", "HCl", "NaCl", "CaO"],
        answer: "1",
        knowledge_point: "酸碱盐",
        grade: "八年级",
        subject: "化学"
      },
      {
        id: "472",
        question: "pH值小于7的溶液呈什么性？",
        options: ["中性", "酸性", "碱性", "无法确定"],
        answer: "1",
        knowledge_point: "酸碱性",
        grade: "八年级",
        subject: "化学"
      },
      {
        id: "473",
        question: "下列哪个变化是物理变化？",
        options: ["铁生锈", "木材燃烧", "冰融化", "食物腐败"],
        answer: "2",
        knowledge_point: "物理变化与化学变化",
        grade: "八年级",
        subject: "化学"
      },
      {
        id: "474",
        question: "元素周期表是按什么排列的？",
        options: ["原子质量", "原子序数", "电子数", "质子数"],
        answer: "1",
        knowledge_point: "元素周期表",
        grade: "八年级",
        subject: "化学"
      },
      {
        id: "475",
        question: "人体消化系统中，吸收营养物质的主要场所是？",
        options: ["胃", "小肠", "大肠", "食道"],
        answer: "1",
        knowledge_point: "消化系统",
        grade: "八年级",
        subject: "生物"
      },
      {
        id: "476",
        question: "DNA主要存在于细胞的哪个结构中？",
        options: ["细胞质", "细胞核", "线粒体", "叶绿体"],
        answer: "1",
        knowledge_point: "细胞结构",
        grade: "八年级",
        subject: "生物"
      },
      {
        id: "477",
        question: "下列哪个是遗传物质？",
        options: ["蛋白质", "DNA", "糖类", "脂肪"],
        answer: "1",
        knowledge_point: "遗传物质",
        grade: "八年级",
        subject: "生物"
      },
      {
        id: "478",
        question: "生态系统中的能量流动特点是？",
        options: ["循环流动", "单向流动", "双向流动", "静止不动"],
        answer: "1",
        knowledge_point: "生态系统",
        grade: "八年级",
        subject: "生物"
      },
      {
        id: "479",
        question: "下列哪个是生物群落？",
        options: ["池塘中的所有鱼", "池塘中的所有生物", "池塘中的所有植物", "池塘中的所有动物"],
        answer: "1",
        knowledge_point: "生物群落",
        grade: "八年级",
        subject: "生物"
      },
      {
        id: "480",
        question: "功的计算公式是？",
        options: ["W = F/s", "W = F×s", "W = F+s", "W = F-s"],
        answer: "1",
        knowledge_point: "功的计算",
        grade: "九年级",
        subject: "物理"
      },
      {
        id: "481",
        question: "功率的单位是什么？",
        options: ["焦耳", "瓦特", "牛顿", "帕斯卡"],
        answer: "1",
        knowledge_point: "功率单位",
        grade: "九年级",
        subject: "物理"
      },
      {
        id: "482",
        question: "下列哪个是机械能？",
        options: ["内能", "电能", "动能", "化学能"],
        answer: "2",
        knowledge_point: "机械能",
        grade: "九年级",
        subject: "物理"
      },
      {
        id: "483",
        question: "能量守恒定律的内容是？",
        options: ["能量可以创造", "能量可以消灭", "能量既不能创造也不能消灭", "能量只能增加"],
        answer: "2",
        knowledge_point: "能量守恒定律",
        grade: "九年级",
        subject: "物理"
      },
      {
        id: "484",
        question: "下列哪个是可再生能源？",
        options: ["煤炭", "石油", "太阳能", "天然气"],
        answer: "2",
        knowledge_point: "能源",
        grade: "九年级",
        subject: "物理"
      },
      {
        id: "485",
        question: "下列哪个反应属于置换反应？",
        options: ["2H2 + O2 → 2H2O", "Zn + H2SO4 → ZnSO4 + H2", "CaCO3 → CaO + CO2", "NaOH + HCl → NaCl + H2O"],
        answer: "1",
        knowledge_point: "化学反应类型",
        grade: "九年级",
        subject: "化学"
      },
      {
        id: "486",
        question: "下列哪个是盐？",
        options: ["HCl", "NaOH", "NaCl", "H2O"],
        answer: "2",
        knowledge_point: "酸碱盐",
        grade: "九年级",
        subject: "化学"
      },
      {
        id: "487",
        question: "中和反应的产物是什么？",
        options: ["盐和水", "盐和气体", "盐和沉淀", "气体和水"],
        answer: "0",
        knowledge_point: "中和反应",
        grade: "九年级",
        subject: "化学"
      },
      {
        id: "488",
        question: "下列哪个是氧化还原反应？",
        options: ["酸碱中和", "复分解反应", "燃烧反应", "沉淀反应"],
        answer: "2",
        knowledge_point: "氧化还原反应",
        grade: "九年级",
        subject: "化学"
      },
      {
        id: "489",
        question: "有机物的特征是？",
        options: ["只含碳元素", "含碳元素的化合物", "不含碳元素", "只含氢元素"],
        answer: "1",
        knowledge_point: "有机物",
        grade: "九年级",
        subject: "化学"
      },
      {
        id: "490",
        question: "人体呼吸系统中，气体交换的主要场所是？",
        options: ["鼻腔", "气管", "肺泡", "支气管"],
        answer: "2",
        knowledge_point: "呼吸系统",
        grade: "九年级",
        subject: "生物"
      },
      {
        id: "491",
        question: "下列哪个是内分泌腺？",
        options: ["汗腺", "唾液腺", "甲状腺", "胃腺"],
        answer: "2",
        knowledge_point: "内分泌系统",
        grade: "九年级",
        subject: "生物"
      },
      {
        id: "492",
        question: "人体免疫系统中，产生抗体的细胞是？",
        options: ["T细胞", "B细胞", "红细胞", "白细胞"],
        answer: "1",
        knowledge_point: "免疫系统",
        grade: "九年级",
        subject: "生物"
      },
      {
        id: "493",
        question: "下列哪个是遗传病？",
        options: ["感冒", "糖尿病", "色盲", "骨折"],
        answer: "2",
        knowledge_point: "遗传病",
        grade: "九年级",
        subject: "生物"
      },
      {
        id: "494",
        question: "生物进化的主要证据是？",
        options: ["化石", "现生生物", "胚胎发育", "同源器官"],
        answer: "0",
        knowledge_point: "生物进化",
        grade: "九年级",
        subject: "生物"
      },
      {
        id: "495",
        question: "有理数中，绝对值最小的数是？",
        options: ["-1", "0", "1", "2"],
        answer: "1",
        knowledge_point: "有理数",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "496",
        question: "下列哪个是一元一次方程？",
        options: ["x + y = 5", "x² + 2x = 3", "3x - 5 = 7", "1/x = 2"],
        answer: "2",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "497",
        question: "下列哪个是同类项？",
        options: ["2x和3y", "2x和3x²", "2x和3x", "2x和3xy"],
        answer: "2",
        knowledge_point: "同类项",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "498",
        question: "(-2)³等于？",
        options: ["-6", "-8", "6", "8"],
        answer: "1",
        knowledge_point: "有理数的乘方",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "499",
        question: "下列哪个是整式？",
        options: ["1/x", "√x", "x² + 2x + 1", "x + 1/x"],
        answer: "2",
        knowledge_point: "整式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "500",
        question: "下列哪个是代数式？",
        options: ["a + b = c", "a + b", "a = 5", "5"],
        answer: "1",
        knowledge_point: "代数式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "501",
        question: "不等式2x > 6的解集是？",
        options: ["x < 3", "x > 3", "x ≤ 3", "x ≥ 3"],
        answer: "1",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "502",
        question: "下列哪个是科学计数法表示的数？",
        options: ["123", "1.23×10²", "1.23×10³", "12.3×10¹"],
        answer: "1",
        knowledge_point: "科学计数法",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "503",
        question: "下列哪个词语是褒义词？",
        options: ["狡猾", "勇敢", "懒惰", "愚蠢"],
        answer: "1",
        knowledge_point: "词语的感情色彩",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "504",
        question: "下列哪个句子使用了比喻修辞？",
        options: ["他像鸟一样飞快地跑", "他跑得很快", "他跑得像鸟一样", "他飞快地跑"],
        answer: "0",
        knowledge_point: "修辞手法",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "505",
        question: "下列哪个成语使用正确？",
        options: ["他废寝忘食地学习", "他废寝忘食地玩耍", "他废寝忘食地睡觉", "他废寝忘食地吃饭"],
        answer: "0",
        knowledge_point: "成语运用",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "506",
        question: "下列哪个是说明文？",
        options: ["《春》", "《苏州园林》", "《背影》", "《孔乙己》"],
        answer: "1",
        knowledge_point: "文体知识",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "507",
        question: "下列哪个句子没有语病？",
        options: ["通过学习，使我进步很大", "通过学习，我进步很大", "通过学习，进步很大", "通过学习，我很大进步"],
        answer: "1",
        knowledge_point: "病句修改",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "508",
        question: "下列哪个是议论文？",
        options: ["《春》", "《苏州园林》", "《敬业与乐业》", "《背影》"],
        answer: "2",
        knowledge_point: "文体知识",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "509",
        question: "What is the past tense of 'go'?",
        options: ["goed", "went", "going", "goes"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "510",
        question: "Which word is a fruit?",
        options: ["carrot", "apple", "potato", "onion"],
        answer: "1",
        knowledge_point: "词汇分类",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "511",
        question: "Choose the correct sentence:",
        options: ["He go to school", "He goes to school", "He going to school", "He gone to school"],
        answer: "1",
        knowledge_point: "一般现在时",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "512",
        question: "What is the plural of 'child'?",
        options: ["childs", "children", "childes", "child"],
        answer: "1",
        knowledge_point: "名词复数",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "513",
        question: "Which word means '非常'?",
        options: ["very", "many", "much", "some"],
        answer: "0",
        knowledge_point: "副词",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "514",
        question: "函数y = 2x + 1中，当x = 3时，y的值是？",
        options: ["5", "6", "7", "8"],
        answer: "2",
        knowledge_point: "函数",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "515",
        question: "下列哪个是二次函数？",
        options: ["y = x + 1", "y = x² + 2x", "y = 1/x", "y = √x"],
        answer: "1",
        knowledge_point: "二次函数",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "516",
        question: "下列哪个是勾股数？",
        options: ["1, 2, 3", "3, 4, 5", "2, 3, 4", "4, 5, 6"],
        answer: "1",
        knowledge_point: "勾股定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "517",
        question: "下列哪个是轴对称图形？",
        options: ["平行四边形", "等腰梯形", "直角梯形", "不等边三角形"],
        answer: "1",
        knowledge_point: "轴对称图形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "518",
        question: "不等式组{x > 2, x < 5}的解集是？",
        options: ["x < 2", "x > 5", "2 < x < 5", "x < 5"],
        answer: "2",
        knowledge_point: "不等式组",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "519",
        question: "下列哪个是因式分解？",
        options: ["x² + 2x + 1", "(x + 1)²", "x² + 2x", "x(x + 2)"],
        answer: "3",
        knowledge_point: "因式分解",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "520",
        question: "下列哪个是分式？",
        options: ["x/2", "1/x", "x + 1", "x²"],
        answer: "1",
        knowledge_point: "分式",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "521",
        question: "下列哪个句子使用了排比修辞？",
        options: ["他像鸟一样飞快地跑", "他跑得很快，他跳得很高，他游得很远", "他跑得很快", "他像鸟一样跑"],
        answer: "1",
        knowledge_point: "修辞手法",
        grade: "八年级",
        subject: "语文"
      },
      {
        id: "522",
        question: "下列哪个是说明方法？",
        options: ["比喻", "拟人", "举例子", "夸张"],
        answer: "2",
        knowledge_point: "说明方法",
        grade: "八年级",
        subject: "语文"
      },
      {
        id: "523",
        question: "下列哪个是议论文的论点？",
        options: ["他跑得很快", "学习要勤奋", "他喜欢吃苹果", "今天天气很好"],
        answer: "1",
        knowledge_point: "议论文",
        grade: "八年级",
        subject: "语文"
      },
      {
        id: "524",
        question: "下列哪个是记叙文？",
        options: ["《苏州园林》", "《敬业与乐业》", "《背影》", "《大自然的语言》"],
        answer: "2",
        knowledge_point: "文体知识",
        grade: "八年级",
        subject: "语文"
      },
      {
        id: "525",
        question: "下列哪个句子使用了拟人修辞？",
        options: ["他像鸟一样飞快地跑", "小鸟在枝头唱歌", "他跑得很快", "鸟在枝头叫"],
        answer: "1",
        knowledge_point: "修辞手法",
        grade: "八年级",
        subject: "语文"
      },
      {
        id: "526",
        question: "What is the past participle of 'write'?",
        options: ["wrote", "written", "writing", "writes"],
        answer: "1",
        knowledge_point: "动词过去分词",
        grade: "八年级",
        subject: "英语"
      },
      {
        id: "527",
        question: "Which sentence is in present continuous tense?",
        options: ["He goes to school", "He is going to school", "He went to school", "He has gone to school"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "八年级",
        subject: "英语"
      },
      {
        id: "528",
        question: "Choose the correct preposition:",
        options: ["I am good in English", "I am good at English", "I am good on English", "I am good with English"],
        answer: "1",
        knowledge_point: "介词",
        grade: "八年级",
        subject: "英语"
      },
      {
        id: "529",
        question: "What is the comparative form of 'good'?",
        options: ["gooder", "better", "more good", "best"],
        answer: "1",
        knowledge_point: "形容词比较级",
        grade: "八年级",
        subject: "英语"
      },
      {
        id: "530",
        question: "Which word means '虽然'?",
        options: ["because", "although", "but", "so"],
        answer: "1",
        knowledge_point: "连词",
        grade: "八年级",
        subject: "英语"
      },
      {
        id: "531",
        question: "一元二次方程x² - 5x + 6 = 0的解是？",
        options: ["x = 2或3", "x = -2或-3", "x = 1或6", "x = -1或-6"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "532",
        question: "下列哪个是二次函数的顶点式？",
        options: ["y = ax² + bx + c", "y = a(x - h)² + k", "y = a(x - x₁)(x - x₂)", "y = ax²"],
        answer: "1",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "533",
        question: "sin30°等于？",
        options: ["1/2", "√2/2", "√3/2", "1"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "534",
        question: "下列哪个是圆的切线性质？",
        options: ["切线垂直于半径", "切线平行于半径", "切线等于半径", "切线是直径"],
        answer: "0",
        knowledge_point: "圆的切线",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "535",
        question: "下列哪个是相似三角形的判定条件？",
        options: ["两边相等", "三边成比例", "两角相等", "一角相等"],
        answer: "2",
        knowledge_point: "相似三角形",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "536",
        question: "概率的基本性质是？",
        options: ["概率可以大于1", "概率可以小于0", "0 ≤ P ≤ 1", "概率总是等于1"],
        answer: "2",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "537",
        question: "下列哪个句子使用了反问修辞？",
        options: ["他跑得很快", "他难道跑得不快吗？", "他像鸟一样跑", "鸟在枝头叫"],
        answer: "1",
        knowledge_point: "修辞手法",
        grade: "九年级",
        subject: "语文"
      },
      {
        id: "538",
        question: "下列哪个是古文中的通假字？",
        options: ["甚矣，汝之不惠", "惠通慧", "惠是智慧", "惠是恩惠"],
        answer: "1",
        knowledge_point: "通假字",
        grade: "九年级",
        subject: "语文"
      },
      {
        id: "539",
        question: "下列哪个是议论文的论证方法？",
        options: ["比喻", "举例论证", "拟人", "夸张"],
        answer: "1",
        knowledge_point: "议论文",
        grade: "九年级",
        subject: "语文"
      },
      {
        id: "540",
        question: "下列哪个是古文中的词类活用？",
        options: ["名词作动词", "形容词作名词", "动词作名词", "以上都是"],
        answer: "3",
        knowledge_point: "词类活用",
        grade: "九年级",
        subject: "语文"
      },
      {
        id: "541",
        question: "下列哪个是古文中的特殊句式？",
        options: ["判断句", "被动句", "倒装句", "以上都是"],
        answer: "3",
        knowledge_point: "特殊句式",
        grade: "九年级",
        subject: "语文"
      },
      {
        id: "542",
        question: "What is the superlative form of 'good'?",
        options: ["gooder", "better", "best", "more good"],
        answer: "2",
        knowledge_point: "形容词最高级",
        grade: "九年级",
        subject: "英语"
      },
      {
        id: "543",
        question: "Which sentence is in present perfect tense?",
        options: ["He goes to school", "He is going to school", "He has gone to school", "He went to school"],
        answer: "2",
        knowledge_point: "现在完成时",
        grade: "九年级",
        subject: "英语"
      },
      {
        id: "544",
        question: "Choose the correct relative pronoun:",
        options: ["The man which helped me", "The man who helped me", "The man what helped me", "The man where helped me"],
        answer: "1",
        knowledge_point: "定语从句",
        grade: "九年级",
        subject: "英语"
      },
      {
        id: "545",
        question: "What is the passive voice of 'They built the house'?",
        options: ["The house is built by them", "The house was built by them", "The house will be built by them", "The house has been built by them"],
        answer: "1",
        knowledge_point: "被动语态",
        grade: "九年级",
        subject: "英语"
      },
      {
        id: "546",
        question: "Which word means '然而'?",
        options: ["because", "although", "however", "so"],
        answer: "2",
        knowledge_point: "连词",
        grade: "九年级",
        subject: "英语"
      },
      {
        id: "547",
        question: "下列哪个是相反数？",
        options: ["3和-3", "5和-5", "2和2", "4和-4"],
        answer: "0",
        knowledge_point: "相反数",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "548",
        question: "下列哪个是单项式？",
        options: ["a + b", "2a", "a²", "a/b"],
        answer: "0",
        knowledge_point: "单项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "549",
        question: "下列哪个是多项式？",
        options: ["2a", "a + b", "a²", "5"],
        answer: "1",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "550",
        question: "方程3x - 6 = 0的解是？",
        options: ["x = 0", "x = 2", "x = -2", "x = 3"],
        answer: "1",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "551",
        question: "下列哪个是正数？",
        options: ["-5", "0", "3", "-2"],
        answer: "2",
        knowledge_point: "有理数",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "552",
        question: "不等式-2x < 4的解集是？",
        options: ["x > -2", "x < -2", "x > 2", "x < 2"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "553",
        question: "下列哪个是代数式的值？",
        options: ["当a=2时，a+1=3", "当a=2时，a+1=2", "当a=2时，a+1=4", "当a=2时，a+1=5"],
        answer: "0",
        knowledge_point: "代数式求值",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "554",
        question: "下列哪个是整式的加减？",
        options: ["(a+b)+(c+d)", "(a+b)(c+d)", "a+b+c+d", "a+b-c-d"],
        answer: "0",
        knowledge_point: "整式的加减",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "555",
        question: "下列哪个是同类项？",
        options: ["3x²和2x", "3x和2y", "3x和2x³", "3x²和2x³"],
        answer: "0",
        knowledge_point: "同类项",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "556",
        question: "下列哪个是负数？",
        options: ["5", "0", "1", "-3"],
        answer: "3",
        knowledge_point: "有理数",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "557",
        question: "方程2x + 4 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 4"],
        answer: "0",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "558",
        question: "下列哪个是科学计数法？",
        options: ["12300", "1.23×10⁴", "1.23×10⁵", "1.23×10⁶"],
        answer: "1",
        knowledge_point: "科学计数法",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "559",
        question: "不等式3x ≥ 6的解集是？",
        options: ["x ≥ 2", "x ≤ 2", "x > 2", "x < 2"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "560",
        question: "下列哪个是单项式的系数？",
        options: ["3x中的3", "3x中的x", "3x中的3x", "3x中的"],
        answer: "0",
        knowledge_point: "单项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "561",
        question: "下列哪个是多项式的次数？",
        options: ["x²+2x+1的次数是2", "x²+2x+1的次数是3", "x²+2x+1的次数是1", "x²+2x+1的次数是0"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "562",
        question: "方程4x - 8 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 4"],
        answer: "1",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "563",
        question: "下列哪个是整式的乘法？",
        options: ["2a×3b", "2a+3b", "2a-3b", "2a/3b"],
        answer: "0",
        knowledge_point: "整式的乘法",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "564",
        question: "不等式-3x ≤ 9的解集是？",
        options: ["x ≥ -3", "x ≤ -3", "x > -3", "x < -3"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "565",
        question: "下列哪个是代数式的次数？",
        options: ["2a³的次数是2", "2a³的次数是3", "2a³的次数是1", "2a³的次数是0"],
        answer: "1",
        knowledge_point: "代数式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "566",
        question: "方程5x + 10 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 5"],
        answer: "0",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "567",
        question: "下列哪个是整式的除法？",
        options: ["(6a²b)/(2ab)", "(6a²b)+(2ab)", "(6a²b)-(2ab)", "(6a²b)*(2ab)"],
        answer: "0",
        knowledge_point: "整式的除法",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "568",
        question: "不等式x/2 > 3的解集是？",
        options: ["x > 6", "x < 6", "x ≥ 6", "x ≤ 6"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "569",
        question: "下列哪个是多项式的项？",
        options: ["x²+2x+1有3项", "x²+2x+1有4项", "x²+2x+1有2项", "x²+2x+1有1项"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "570",
        question: "方程6x - 12 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 6"],
        answer: "1",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "571",
        question: "下列哪个是代数式的系数？",
        options: ["-3x中的-3", "-3x中的x", "-3x中的-3x", "-3x中的"],
        answer: "0",
        knowledge_point: "代数式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "572",
        question: "不等式2x + 4 ≥ 8的解集是？",
        options: ["x ≥ 2", "x ≤ 2", "x > 2", "x < 2"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "573",
        question: "下列哪个是多项式的常数项？",
        options: ["x²+2x+1中的1", "x²+2x+1中的x²", "x²+2x+1中的2x", "x²+2x+1中的x"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "574",
        question: "方程7x + 14 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 7"],
        answer: "0",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "575",
        question: "下列哪个是整式的加减混合运算？",
        options: ["(a+b)-(c-d)", "(a+b)+(c-d)", "(a+b)*(c-d)", "(a+b)/(c-d)"],
        answer: "1",
        knowledge_point: "整式的加减",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "576",
        question: "不等式3x - 6 < 3的解集是？",
        options: ["x < 3", "x > 3", "x ≤ 3", "x ≥ 3"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "577",
        question: "下列哪个是多项式的最高次项？",
        options: ["x²+2x+1中的x²", "x²+2x+1中的2x", "x²+2x+1中的1", "x²+2x+1中的x"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "578",
        question: "方程8x - 16 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 8"],
        answer: "1",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "579",
        question: "下列哪个是代数式的字母？",
        options: ["3x中的3", "3x中的x", "3x中的3x", "3x中的"],
        answer: "1",
        knowledge_point: "代数式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "580",
        question: "不等式4x + 8 ≥ 12的解集是？",
        options: ["x ≥ 1", "x ≤ 1", "x > 1", "x < 1"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "581",
        question: "下列哪个是多项式的升幂排列？",
        options: ["x²+2x+1", "2x+x²+1", "1+2x+x²", "1+x²+2x"],
        answer: "2",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "582",
        question: "方程9x + 18 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 9"],
        answer: "0",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "583",
        question: "下列哪个是代数式的指数？",
        options: ["x²中的2", "x²中的x", "x²中的x²", "x²中的"],
        answer: "0",
        knowledge_point: "代数式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "584",
        question: "不等式5x - 10 > 5的解集是？",
        options: ["x > 3", "x < 3", "x ≥ 3", "x ≤ 3"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "585",
        question: "下列哪个是多项式的降幂排列？",
        options: ["x²+2x+1", "2x+x²+1", "1+2x+x²", "1+x²+2x"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "586",
        question: "方程10x - 20 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 10"],
        answer: "1",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "587",
        question: "下列哪个是代数式的底数？",
        options: ["a²中的a", "a²中的2", "a²中的a²", "a²中的"],
        answer: "0",
        knowledge_point: "代数式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "588",
        question: "不等式6x + 12 ≤ 18的解集是？",
        options: ["x ≤ 1", "x ≥ 1", "x > 1", "x < 1"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "589",
        question: "下列哪个是单项式的次数？",
        options: ["2a³b的次数是3", "2a³b的次数是4", "2a³b的次数是2", "2a³b的次数是1"],
        answer: "1",
        knowledge_point: "单项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "590",
        question: "方程11x + 22 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 11"],
        answer: "0",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "591",
        question: "下列哪个是单项式的字母部分？",
        options: ["3x²中的3", "3x²中的x²", "3x²中的x", "3x²中的3x²"],
        answer: "2",
        knowledge_point: "单项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "592",
        question: "不等式7x - 14 ≥ 7的解集是？",
        options: ["x ≥ 3", "x ≤ 3", "x > 3", "x < 3"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "593",
        question: "下列哪个是多项式的同类项？",
        options: ["3x²和2x", "3x²和2x³", "3x²和2y", "3x²和2"],
        answer: "0",
        knowledge_point: "同类项",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "594",
        question: "方程12x - 24 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 12"],
        answer: "1",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "595",
        question: "下列哪个是多项式的常数项？",
        options: ["2x³+3x²-1中的-1", "2x³+3x²-1中的2x³", "2x³+3x²-1中的3x²", "2x³+3x²-1中的2x³"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "596",
        question: "不等式8x + 16 ≤ 24的解集是？",
        options: ["x ≤ 1", "x ≥ 1", "x > 1", "x < 1"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "597",
        question: "下列哪个是多项式的升幂排列？",
        options: ["2x³+3x²-1", "3x²+2x³-1", "-1+3x²+2x³", "2x³-1+3x²"],
        answer: "2",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "598",
        question: "方程13x + 26 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 13"],
        answer: "0",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "599",
        question: "下列哪个是多项式的降幂排列？",
        options: ["2x³+3x²-1", "3x²+2x³-1", "-1+3x²+2x³", "2x³-1+3x²"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "600",
        question: "方程14x - 28 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 14"],
        answer: "1",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "601",
        question: "下列哪个是多项式的项数？",
        options: ["x²+2x+1有3项", "x²+2x+1有2项", "x²+2x+1有4项", "x²+2x+1有1项"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "602",
        question: "不等式9x - 18 ≥ 9的解集是？",
        options: ["x ≥ 3", "x ≤ 3", "x > 3", "x < 3"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "603",
        question: "下列哪个是多项式的系数？",
        options: ["-2x³中的-2", "-2x³中的x³", "-2x³中的-2x³", "-2x³中的"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "604",
        question: "方程15x + 30 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 15"],
        answer: "0",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "605",
        question: "下列哪个是多项式的次数？",
        options: ["-2x³+3x²-1的次数是3", "-2x³+3x²-1的次数是2", "-2x³+3x²-1的次数是1", "-2x³+3x²-1的次数是0"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "606",
        question: "不等式10x + 20 ≤ 30的解集是？",
        options: ["x ≤ 1", "x ≥ 1", "x > 1", "x < 1"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "607",
        question: "方程16x - 32 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 16"],
        answer: "1",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "608",
        question: "下列哪个是多项式的最高次项？",
        options: ["-2x³+3x²-1中的-2x³", "-2x³+3x²-1中的3x²", "-2x³+3x²-1中的-1", "-2x³+3x²-1中的"],
        answer: "0",
        knowledge_point: "多项式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "609",
        question: "不等式11x - 22 > 11的解集是？",
        options: ["x > 3", "x < 3", "x ≥ 3", "x ≤ 3"],
        answer: "0",
        knowledge_point: "不等式",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "610",
        question: "方程17x + 34 = 0的解是？",
        options: ["x = -2", "x = 2", "x = 0", "x = 17"],
        answer: "0",
        knowledge_point: "一元一次方程",
        grade: "七年级",
        subject: "数学"
      },
      {
        id: "611",
        question: "下列哪个词语是贬义词？",
        options: ["勇敢", "聪明", "狡猾", "勤奋"],
        answer: "2",
        knowledge_point: "词语的感情色彩",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "612",
        question: "下列哪个句子使用了拟人修辞？",
        options: ["小鸟在枝头唱歌", "鸟在枝头叫", "他跑得很快", "鸟在枝头飞"],
        answer: "0",
        knowledge_point: "修辞手法",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "613",
        question: "下列哪个成语使用正确？",
        options: ["他废寝忘食地学习", "他废寝忘食地睡觉", "他废寝忘食地玩耍", "他废寝忘食地吃饭"],
        answer: "0",
        knowledge_point: "成语运用",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "614",
        question: "下列哪个是说明文？",
        options: ["《春》", "《苏州园林》", "《敬业与乐业》", "《背影》"],
        answer: "1",
        knowledge_point: "文体知识",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "615",
        question: "下列哪个句子没有语病？",
        options: ["通过学习，使我进步很大", "通过学习，我进步很大", "通过学习，进步很大", "通过学习，我很大进步"],
        answer: "1",
        knowledge_point: "病句修改",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "616",
        question: "下列哪个是议论文？",
        options: ["《春》", "《苏州园林》", "《敬业与乐业》", "《背影》"],
        answer: "2",
        knowledge_point: "文体知识",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "617",
        question: "下列哪个句子使用了夸张修辞？",
        options: ["他跑得很快", "他跑得飞快", "他像鸟一样跑", "他飞快地跑"],
        answer: "1",
        knowledge_point: "修辞手法",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "618",
        question: "下列哪个是记叙文？",
        options: ["《春》", "《苏州园林》", "《敬业与乐业》", "《背影》"],
        answer: "2",
        knowledge_point: "文体知识",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "619",
        question: "下列哪个是说明方法？",
        options: ["比喻", "拟人", "举例子", "夸张"],
        answer: "2",
        knowledge_point: "说明方法",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "620",
        question: "下列哪个是议论文的论点？",
        options: ["他跑得很快", "学习要勤奋", "他喜欢吃苹果", "今天天气很好"],
        answer: "1",
        knowledge_point: "议论文",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "621",
        question: "下列哪个是古文中的通假字？",
        options: ["甚矣，汝之不惠", "惠通慧", "惠是智慧", "惠是恩惠"],
        answer: "1",
        knowledge_point: "通假字",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "622",
        question: "下列哪个是古文中的词类活用？",
        options: ["名词作动词", "形容词作名词", "动词作名词", "以上都是"],
        answer: "3",
        knowledge_point: "词类活用",
        grade: "七年级",
        subject: "语文"
      },
      {
        id: "623",
        question: "What is the past tense of 'eat'?",
        options: ["eated", "ate", "eaten", "eats"],
        answer: "1",
        knowledge_point: "动词过去式",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "624",
        question: "Which word is a vegetable?",
        options: ["apple", "banana", "carrot", "orange"],
        answer: "2",
        knowledge_point: "词汇分类",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "625",
        question: "Choose the correct sentence:",
        options: ["She go to school", "She goes to school", "She going to school", "She gone to school"],
        answer: "1",
        knowledge_point: "一般现在时",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "626",
        question: "What is the plural of 'man'?",
        options: ["mans", "men", "manes", "man"],
        answer: "1",
        knowledge_point: "名词复数",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "627",
        question: "Which word means '非常'?",
        options: ["very", "many", "much", "some"],
        answer: "0",
        knowledge_point: "副词",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "628",
        question: "What is the comparative form of 'bad'?",
        options: ["badder", "worse", "more bad", "badest"],
        answer: "1",
        knowledge_point: "形容词比较级",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "629",
        question: "Choose the correct preposition:",
        options: ["I am good in English", "I am good at English", "I am good on English", "I am good with English"],
        answer: "1",
        knowledge_point: "介词",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "630",
        question: "Which word means '但是'?",
        options: ["because", "although", "but", "so"],
        answer: "2",
        knowledge_point: "连词",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "631",
        question: "What is the past participle of 'see'?",
        options: ["seed", "saw", "seen", "seeing"],
        answer: "2",
        knowledge_point: "动词过去分词",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "632",
        question: "Which sentence is in present continuous tense?",
        options: ["She goes to school", "She is going to school", "She went to school", "She has gone to school"],
        answer: "1",
        knowledge_point: "现在进行时",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "633",
        question: "Choose the correct article:",
        options: ["I saw a apple", "I saw an apple", "I saw apple", "I saw the apple"],
        answer: "0",
        knowledge_point: "冠词",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "634",
        question: "What is the superlative form of 'big'?",
        options: ["bigger", "biggest", "more big", "bigest"],
        answer: "1",
        knowledge_point: "形容词最高级",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "635",
        question: "Which word means '因为'?",
        options: ["because", "although", "but", "so"],
        answer: "0",
        knowledge_point: "连词",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "636",
        question: "What is the present perfect tense of 'go'?",
        options: ["He have gone", "He has gone", "He is gone", "He gone"],
        answer: "1",
        knowledge_point: "现在完成时",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "637",
        question: "Which word means '也'?",
        options: ["too", "also", "either", "neither"],
        answer: "0",
        knowledge_point: "副词",
        grade: "七年级",
        subject: "英语"
      },
      {
        id: "638",
        question: "声音的传播速度是多少？",
        options: ["340 m/s", "3400 m/s", "34 m/s", "34000 m/s"],
        answer: "0",
        knowledge_point: "声音的传播",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "639",
        question: "光的反射定律是什么？",
        options: ["入射角等于反射角", "入射角大于反射角", "入射角小于反射角", "入射角等于折射角"],
        answer: "0",
        knowledge_point: "光的反射",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "640",
        question: "下列哪个是凸透镜？",
        options: ["中间厚边缘薄", "中间薄边缘厚", "厚度均匀", "以上都不是"],
        answer: "0",
        knowledge_point: "透镜",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "641",
        question: "摩擦力的方向与运动方向的关系是？",
        options: ["相同", "相反", "垂直", "成45度角"],
        answer: "1",
        knowledge_point: "摩擦力",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "642",
        question: "下列哪个是省力杠杆？",
        options: ["动力臂大于阻力臂", "动力臂小于阻力臂", "动力臂等于阻力臂", "动力臂是阻力臂的2倍"],
        answer: "0",
        knowledge_point: "杠杆",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "643",
        question: "下列哪个是做功的必要因素？",
        options: ["力和距离", "力和时间", "力和速度", "力和质量"],
        answer: "0",
        knowledge_point: "功",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "644",
        question: "功率的物理意义是？",
        options: ["做功的多少", "做功的快慢", "力的大小", "距离的长短"],
        answer: "1",
        knowledge_point: "功率",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "645",
        question: "下列哪个是动能？",
        options: ["静止的物体", "在低处的物体", "运动的物体", "质量大的物体"],
        answer: "2",
        knowledge_point: "动能",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "646",
        question: "下列哪个是势能？",
        options: ["运动的物体", "在低处的物体", "在地面上的物体", "在高处的物体"],
        answer: "3",
        knowledge_point: "势能",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "647",
        question: "机械能守恒定律的内容是？",
        options: ["动能可以创造", "势能可以消灭", "动能和势能可以相互转化", "机械能总是增加"],
        answer: "2",
        knowledge_point: "机械能守恒",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "648",
        question: "下列哪个是扩散现象？",
        options: ["铁块生锈", "香水扩散", "冰块融化", "水沸腾"],
        answer: "1",
        knowledge_point: "扩散现象",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "649",
        question: "下列哪个是晶体？",
        options: ["玻璃", "食盐", "沥青", "橡胶"],
        answer: "1",
        knowledge_point: "晶体与非晶体",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "650",
        question: "下列哪个是非晶体？",
        options: ["食盐", "冰", "钻石", "石英"],
        answer: "3",
        knowledge_point: "晶体与非晶体",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "651",
        question: "汽化的两种方式是？",
        options: ["蒸发和沸腾", "熔化和凝固", "升华和凝华", "液化和汽化"],
        answer: "0",
        knowledge_point: "物态变化",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "652",
        question: "下列哪个是液化现象？",
        options: ["冰块融化", "露珠形成", "樟脑丸变小", "湿衣服变干"],
        answer: "1",
        knowledge_point: "物态变化",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "653",
        question: "下列哪个是升华现象？",
        options: ["冰块融化", "樟脑丸变小", "霜的形成", "露珠形成"],
        answer: "1",
        knowledge_point: "物态变化",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "654",
        question: "下列哪个是凝华现象？",
        options: ["冰块融化", "霜的形成", "露珠形成", "樟脑丸变小"],
        answer: "1",
        knowledge_point: "物态变化",
        grade: "七年级",
        subject: "物理"
      },
      {
        id: "655",
        question: "下列哪个是混合物？",
        options: ["蒸馏水", "纯净的氧气", "冰水混合物", "氯化钠"],
        answer: "2",
        knowledge_point: "纯净物与混合物",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "656",
        question: "下列哪个是化合物？",
        options: ["氧气", "氮气", "水", "空气"],
        answer: "2",
        knowledge_point: "纯净物与混合物",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "657",
        question: "下列哪个是单质？",
        options: ["水", "空气", "氧气", "氯化钠"],
        answer: "2",
        knowledge_point: "纯净物与混合物",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "658",
        question: "下列哪个是氧化物？",
        options: ["HCl", "H2O", "CO2", "NaCl"],
        answer: "1",
        knowledge_point: "氧化物",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "659",
        question: "下列哪个是酸？",
        options: ["NaOH", "CaO", "NaCl", "H2O"],
        answer: "0",
        knowledge_point: "酸碱盐",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "660",
        question: "下列哪个是碱？",
        options: ["HCl", "NaOH", "NaCl", "CO2"],
        answer: "1",
        knowledge_point: "酸碱盐",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "661",
        question: "下列哪个是盐？",
        options: ["HCl", "NaOH", "NaCl", "H2O"],
        answer: "2",
        knowledge_point: "酸碱盐",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "662",
        question: "中和反应的产物是？",
        options: ["盐和水", "盐和气体", "盐和沉淀", "气体和水"],
        answer: "0",
        knowledge_point: "中和反应",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "663",
        question: "下列哪个是置换反应？",
        options: ["2H2 + O2 → 2H2O", "Zn + H2SO4 → ZnSO4 + H2", "CaCO3 → CaO + CO2", "NaOH + HCl → NaCl + H2O"],
        answer: "1",
        knowledge_point: "化学反应类型",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "664",
        question: "下列哪个是化合反应？",
        options: ["CaCO3 → CaO + CO2", "2H2 + O2 → 2H2O", "Zn + H2SO4 → ZnSO4 + H2", "NaOH + HCl → NaCl + H2O"],
        answer: "1",
        knowledge_point: "化学反应类型",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "665",
        question: "下列哪个是分解反应？",
        options: ["CaCO3 → CaO + CO2", "2H2 + O2 → 2H2O", "Zn + H2SO4 → ZnSO4 + H2", "NaOH + HCl → NaCl + H2O"],
        answer: "0",
        knowledge_point: "化学反应类型",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "666",
        question: "下列哪个是复分解反应？",
        options: ["CaCO3 → CaO + CO2", "2H2 + O2 → 2H2O", "Zn + H2SO4 → ZnSO4 + H2", "NaOH + HCl → NaCl + H2O"],
        answer: "3",
        knowledge_point: "化学反应类型",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "667",
        question: "下列哪个是氧化反应？",
        options: ["铁生锈", "木材燃烧", "冰融化", "食物腐烂"],
        answer: "1",
        knowledge_point: "化学反应类型",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "668",
        question: "下列哪个是还原反应？",
        options: ["铁生锈", "木材燃烧", "冰融化", "食物腐烂"],
        answer: "1",
        knowledge_point: "化学反应类型",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "669",
        question: "下列哪个是燃烧反应？",
        options: ["铁生锈", "木材燃烧", "冰融化", "食物腐烂"],
        answer: "1",
        knowledge_point: "化学反应类型",
        grade: "七年级",
        subject: "化学"
      },
      {
        id: "670",
        question: "植物细胞的基本结构包括？",
        options: ["细胞壁、细胞膜、细胞质", "细胞核、细胞膜、细胞质", "细胞壁、细胞核、细胞质", "细胞壁、细胞膜、细胞核"],
        answer: "0",
        knowledge_point: "植物细胞",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "671",
        question: "动物细胞与植物细胞的主要区别是？",
        options: ["动物细胞有细胞壁", "植物细胞有细胞壁", "动物细胞有叶绿体", "植物细胞有中心体"],
        answer: "1",
        knowledge_point: "细胞结构",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "672",
        question: "下列哪个是单细胞生物？",
        options: ["金鱼", "蚂蚁", "麻雀", "草履虫"],
        answer: "3",
        knowledge_point: "单细胞生物",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "673",
        question: "下列哪个是多细胞生物？",
        options: ["草履虫", "金鱼", "蚂蚁", "麻雀"],
        answer: "1",
        knowledge_point: "单细胞生物",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "674",
        question: "下列哪个是原核生物？",
        options: ["草履虫", "金鱼", "蚂蚁", "细菌"],
        answer: "3",
        knowledge_point: "细胞结构",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "675",
        question: "下列哪个是真核生物？",
        options: ["细菌", "金鱼", "蚂蚁", "麻雀"],
        answer: "0",
        knowledge_point: "细胞结构",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "676",
        question: "下列哪个是病毒？",
        options: ["草履虫", "细菌", "艾滋病病毒", "金鱼"],
        answer: "2",
        knowledge_point: "病毒",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "677",
        question: "下列哪个是细菌？",
        options: ["草履虫", "艾滋病病毒", "大肠杆菌", "金鱼"],
        answer: "2",
        knowledge_point: "细菌",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "678",
        question: "下列哪个是真菌？",
        options: ["草履虫", "艾滋病病毒", "大肠杆菌", "酵母菌"],
        answer: "3",
        knowledge_point: "真菌",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "679",
        question: "生态系统的组成包括？",
        options: ["生产者、消费者", "生产者、消费者、分解者", "消费者、分解者", "生产者、分解者"],
        answer: "1",
        knowledge_point: "生态系统",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "680",
        question: "下列哪个是生产者？",
        options: ["狼", "羊", "草", "鹰"],
        answer: "2",
        knowledge_point: "生态系统",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "681",
        question: "下列哪个是消费者？",
        options: ["草", "羊", "狼", "鹰"],
        answer: "2",
        knowledge_point: "生态系统",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "682",
        question: "下列哪个是分解者？",
        options: ["草", "羊", "狼", "细菌"],
        answer: "3",
        knowledge_point: "生态系统",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "683",
        question: "食物链的正确写法是？",
        options: ["草→羊→狼", "草←羊←狼", "草←羊→狼", "草→羊←狼"],
        answer: "0",
        knowledge_point: "食物链",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "684",
        question: "下列哪个是食物网？",
        options: ["草→羊", "草←羊→狼←鹰", "草→羊→狼", "草→羊→狼→鹰"],
        answer: "3",
        knowledge_point: "食物链",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "685",
        question: "生态系统中的能量流动特点是？",
        options: ["循环流动", "单向流动", "双向流动", "静止不动"],
        answer: "1",
        knowledge_point: "生态系统",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "686",
        question: "下列哪个是生物圈？",
        options: ["一个池塘", "池塘中的所有鱼", "地球上的所有生物", "池塘中的所有生物"],
        answer: "2",
        knowledge_point: "生物圈",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "687",
        question: "下列哪个是生物多样性？",
        options: ["一个池塘", "池塘中的所有生物", "地球上的所有生物", "池塘中的所有鱼"],
        answer: "2",
        knowledge_point: "生物圈",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "688",
        question: "保护生物多样性的措施是？",
        options: ["大量捕猎", "建立自然保护区", "砍伐森林", "排放污水"],
        answer: "1",
        knowledge_point: "生物多样性",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "689",
        question: "下列哪个是原生动物？",
        options: ["蚯蚓", "草履虫", "变形虫", "以上都是"],
        answer: "3",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "690",
        question: "下列哪个是腔肠动物？",
        options: ["蚯蚓", "草履虫", "变形虫", "以上都是"],
        answer: "0",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "691",
        question: "下列哪个是扁形动物？",
        options: ["蚯蚓", "涡虫", "草履虫", "以上都是"],
        answer: "1",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "692",
        question: "下列哪个是线形动物？",
        options: ["蚯蚓", "草履虫", "涡虫", "以上都是"],
        answer: "1",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "693",
        question: "下列哪个是软体动物？",
        options: ["蚯蚓", "蜗牛", "涡虫", "草履虫"],
        answer: "1",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "694",
        question: "下列哪个是节肢动物？",
        options: ["蚯蚓", "蜗牛", "蚂蚁", "草履虫"],
        answer: "2",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "695",
        question: "下列哪个是昆虫？",
        options: ["蚯蚓", "蚂蚁", "蜗牛", "草履虫"],
        answer: "1",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "696",
        question: "下列哪个是两栖动物？",
        options: ["蚯蚓", "青蛙", "蚂蚁", "蜗牛"],
        answer: "1",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "697",
        question: "下列哪个是爬行动物？",
        options: ["蚯蚓", "青蛙", "蚂蚁", "蜗牛"],
        answer: "2",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "698",
        question: "下列哪个是鸟类？",
        options: ["蚯蚓", "青蛙", "麻雀", "蚂蚁"],
        answer: "2",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "699",
        question: "下列哪个是哺乳动物？",
        options: ["蚯蚓", "青蛙", "蚂蚁", "海豚"],
        answer: "3",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "700",
        question: "下列哪个是鱼类？",
        options: ["蚯蚓", "金鱼", "蚂蚁", "麻雀"],
        answer: "1",
        knowledge_point: "动物分类",
        grade: "七年级",
        subject: "生物"
      },
      {
        id: "701",
        question: "下列哪个是轴对称图形？",
        options: ["平行四边形", "等腰梯形", "直角梯形", "不等边三角形"],
        answer: "1",
        knowledge_point: "轴对称图形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "702",
        question: "下列哪个是中心对称图形？",
        options: ["等边三角形", "正方形", "等腰梯形", "直角三角形"],
        answer: "1",
        knowledge_point: "中心对称图形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "703",
        question: "下列哪个是平移变换？",
        options: ["图形绕某点旋转", "图形沿直线移动", "图形关于直线对称", "图形放大"],
        answer: "1",
        knowledge_point: "图形的平移",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "704",
        question: "下列哪个是旋转变换？",
        options: ["图形沿直线移动", "图形绕某点旋转", "图形关于直线对称", "图形放大"],
        answer: "1",
        knowledge_point: "图形的旋转",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "705",
        question: "下列哪个是轴对称变换？",
        options: ["图形沿直线移动", "图形绕某点旋转", "图形关于直线对称", "图形放大"],
        answer: "2",
        knowledge_point: "图形的对称",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "706",
        question: "下列哪个是相似变换？",
        options: ["图形沿直线移动", "图形绕某点旋转", "图形关于直线对称", "图形放大或缩小"],
        answer: "3",
        knowledge_point: "图形的相似",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "707",
        question: "下列哪个是全等变换？",
        options: ["图形放大或缩小", "图形沿直线移动", "图形绕某点旋转", "以上都是"],
        answer: "3",
        knowledge_point: "图形的全等",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "708",
        question: "下列哪个是比例的性质？",
        options: ["a:b = c:d", "ad = bc", "a/b = c/d", "以上都是"],
        answer: "3",
        knowledge_point: "比例的性质",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "709",
        question: "下列哪个是相似三角形的性质？",
        options: ["对应角相等", "对应边成比例", "面积比等于相似比的平方", "以上都是"],
        answer: "3",
        knowledge_point: "相似三角形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "710",
        question: "下列哪个是勾股定理的逆定理？",
        options: ["a² + b² = c²", "如果a² + b² = c²，那么三角形是直角三角形", "如果三角形是直角三角形，那么a² + b² = c²", "以上都不是"],
        answer: "1",
        knowledge_point: "勾股定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "711",
        question: "下列哪个是锐角三角形？",
        options: ["三个角都是锐角", "三个角都是钝角", "三个角都是直角", "以上都不是"],
        answer: "0",
        knowledge_point: "三角形的分类",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "712",
        question: "下列哪个是钝角三角形？",
        options: ["三个角都是锐角", "有一个角是钝角", "有一个角是直角", "以上都不是"],
        answer: "1",
        knowledge_point: "三角形的分类",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "713",
        question: "下列哪个是直角三角形？",
        options: ["三个角都是锐角", "有一个角是钝角", "有一个角是直角", "以上都不是"],
        answer: "2",
        knowledge_point: "三角形的分类",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "714",
        question: "下列哪个是等腰三角形？",
        options: ["三条边都相等", "两条边相等", "三条边都不相等", "以上都不是"],
        answer: "1",
        knowledge_point: "三角形的分类",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "715",
        question: "下列哪个是等边三角形？",
        options: ["三条边都相等", "两条边相等", "三条边都不相等", "以上都不是"],
        answer: "0",
        knowledge_point: "三角形的分类",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "716",
        question: "下列哪个是直角梯形？",
        options: ["四个角都是直角", "有一个角是直角", "两个角是直角", "以上都不是"],
        answer: "2",
        knowledge_point: "梯形的分类",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "717",
        question: "下列哪个是等腰梯形？",
        options: ["四条边都相等", "两条腰相等", "两条底相等", "以上都不是"],
        answer: "1",
        knowledge_point: "梯形的分类",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "718",
        question: "下列哪个是平行四边形的性质？",
        options: ["对边平行且相等", "对角线相等", "四个角都是直角", "以上都是"],
        answer: "0",
        knowledge_point: "平行四边形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "719",
        question: "下列哪个是矩形的性质？",
        options: ["对边平行且相等", "对角线相等且平分", "四个角都是直角", "以上都是"],
        answer: "3",
        knowledge_point: "矩形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "720",
        question: "下列哪个是菱形的性质？",
        options: ["四条边都相等", "对角线垂直平分", "对角线平分一组对角", "以上都是"],
        answer: "3",
        knowledge_point: "菱形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "721",
        question: "下列哪个是正方形的性质？",
        options: ["四条边都相等", "四个角都是直角", "对角线垂直平分且相等", "以上都是"],
        answer: "3",
        knowledge_point: "正方形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "722",
        question: "下列哪个是圆的性质？",
        options: ["圆上所有点到圆心的距离相等", "圆的直径等于半径的2倍", "圆的周长等于2πr", "以上都是"],
        answer: "3",
        knowledge_point: "圆",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "723",
        question: "下列哪个是圆的切线性质？",
        options: ["切线垂直于半径", "切线平行于半径", "切线等于半径", "切线是直径"],
        answer: "0",
        knowledge_point: "圆的切线",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "724",
        question: "下列哪个是圆的弦的性质？",
        options: ["弦垂直于半径", "弦平行于半径", "弦等于半径", "弦的两个端点在圆上"],
        answer: "3",
        knowledge_point: "圆的弦",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "725",
        question: "下列哪个是圆的弧的性质？",
        options: ["弧垂直于半径", "弧平行于半径", "弧等于半径", "弧是圆的一部分"],
        answer: "3",
        knowledge_point: "圆的弧",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "726",
        question: "下列哪个是圆的扇形？",
        options: ["圆的一部分", "圆心角和弧围成的图形", "圆的直径", "圆的半径"],
        answer: "1",
        knowledge_point: "圆的扇形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "727",
        question: "下列哪个是圆的面积公式？",
        options: ["S = 2πr", "S = πr²", "S = πd", "S = 2πd"],
        answer: "1",
        knowledge_point: "圆的面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "728",
        question: "下列哪个是圆的周长公式？",
        options: ["C = πr²", "C = 2πr", "C = πd", "C = 2πd"],
        answer: "1",
        knowledge_point: "圆的周长",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "729",
        question: "下列哪个是圆的面积计算？",
        options: ["r = 3时，S = 9π", "r = 3时，S = 18π", "r = 3时，S = 6π", "r = 3时，S = 3π"],
        answer: "0",
        knowledge_point: "圆的面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "730",
        question: "下列哪个是圆的周长计算？",
        options: ["r = 3时，C = 6π", "r = 3时，C = 9π", "r = 3时，C = 3π", "r = 3时，C = 12π"],
        answer: "0",
        knowledge_point: "圆的周长",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "731",
        question: "下列哪个是圆的直径？",
        options: ["直径等于半径", "直径等于半径的2倍", "直径等于半径的3倍", "直径等于半径的4倍"],
        answer: "1",
        knowledge_point: "圆的直径",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "732",
        question: "下列哪个是圆的半径？",
        options: ["半径等于直径", "半径等于直径的一半", "半径等于直径的2倍", "半径等于直径的3倍"],
        answer: "1",
        knowledge_point: "圆的半径",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "733",
        question: "下列哪个是圆的圆心？",
        options: ["圆上的一点", "圆内的一点", "圆外的一点", "圆的中心点"],
        answer: "3",
        knowledge_point: "圆的圆心",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "734",
        question: "下列哪个是圆的弦？",
        options: ["连接圆心和圆上一点的线段", "连接圆上两点的线段", "圆的直径", "圆的半径"],
        answer: "1",
        knowledge_point: "圆的弦",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "735",
        question: "下列哪个是圆的直径？",
        options: ["连接圆心和圆上一点的线段", "连接圆上两点的线段", "通过圆心的弦", "圆的半径"],
        answer: "2",
        knowledge_point: "圆的直径",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "736",
        question: "下列哪个是圆的弧？",
        options: ["圆上两点之间的线段", "圆上两点之间的曲线", "圆的直径", "圆的半径"],
        answer: "1",
        knowledge_point: "圆的弧",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "737",
        question: "下列哪个是圆的扇形？",
        options: ["圆的一部分", "圆心角和弧围成的图形", "圆的直径", "圆的半径"],
        answer: "1",
        knowledge_point: "圆的扇形",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "738",
        question: "下列哪个是圆的圆心角？",
        options: ["顶点在圆上的角", "顶点在圆心的角", "顶点在圆外的角", "顶点在圆内的角"],
        answer: "1",
        knowledge_point: "圆的圆心角",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "739",
        question: "下列哪个是圆的圆周角？",
        options: ["顶点在圆心的角", "顶点在圆上的角", "顶点在圆外的角", "顶点在圆内的角"],
        answer: "1",
        knowledge_point: "圆的圆周角",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "740",
        question: "下列哪个是圆的切线？",
        options: ["与圆相交的直线", "与圆相切的直线", "与圆相离的直线", "通过圆心的直线"],
        answer: "1",
        knowledge_point: "圆的切线",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "741",
        question: "下列哪个是圆的割线？",
        options: ["与圆相切的直线", "与圆相交的直线", "与圆相离的直线", "通过圆心的直线"],
        answer: "1",
        knowledge_point: "圆的割线",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "742",
        question: "下列哪个是圆的弦切角？",
        options: ["顶点在圆心的角", "顶点在圆上的角", "顶点在圆外的角", "顶点在圆内的角"],
        answer: "1",
        knowledge_point: "圆的弦切角",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "743",
        question: "下列哪个是圆的弦心距？",
        options: ["圆心到弦的距离", "圆心到切线的距离", "圆心到割线的距离", "圆心到直径的距离"],
        answer: "0",
        knowledge_point: "圆的弦心距",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "744",
        question: "下列哪个是圆的切线长？",
        options: ["切点到圆心的距离", "切点到切点的距离", "切点到割线的距离", "切点到直径的距离"],
        answer: "1",
        knowledge_point: "圆的切线长",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "745",
        question: "下列哪个是圆的相交弦定理？",
        options: ["两弦相交，交点分弦的两段乘积相等", "两弦平行，交点分弦的两段乘积相等", "两弦垂直，交点分弦的两段乘积相等", "两弦相等，交点分弦的两段乘积相等"],
        answer: "0",
        knowledge_point: "圆的相交弦定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "746",
        question: "下列哪个是圆的切割线定理？",
        options: ["从圆外一点引切线和割线，切线长的平方等于割线长与其圆外部分的乘积", "从圆外一点引切线和割线，切线长等于割线长", "从圆外一点引切线和割线，切线长的平方等于割线长的平方", "从圆外一点引切线和割线，切线长等于割线长的圆外部分"],
        answer: "0",
        knowledge_point: "圆的切割线定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "747",
        question: "下列哪个是圆的切线长定理？",
        options: ["从圆外一点引两条切线，切线长相等", "从圆外一点引两条切线，切线长不等", "从圆外一点引两条切线，切线长等于半径", "从圆外一点引两条切线，切线长等于直径"],
        answer: "0",
        knowledge_point: "圆的切线长定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "748",
        question: "下列哪个是圆的弦切角定理？",
        options: ["弦切角等于它所夹的弧所对的圆周角", "弦切角等于它所夹的弧所对的圆心角", "弦切角等于它所夹的弧所对的弦切角", "弦切角等于它所夹的弧所对的割线角"],
        answer: "0",
        knowledge_point: "圆的弦切角定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "749",
        question: "下列哪个是圆的圆周角定理？",
        options: ["圆周角等于圆心角的一半", "圆周角等于圆心角", "圆周角等于圆心角的2倍", "圆周角等于圆心角的3倍"],
        answer: "0",
        knowledge_point: "圆的圆周角定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "750",
        question: "下列哪个是圆的圆心角定理？",
        options: ["圆心角等于圆周角的一半", "圆心角等于圆周角", "圆心角等于圆周角的2倍", "圆心角等于圆周角的3倍"],
        answer: "2",
        knowledge_point: "圆的圆心角定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "751",
        question: "下列哪个是圆的垂径定理？",
        options: ["垂直于弦的直径平分弦", "垂直于弦的直径平分弦所对的两条弧", "垂直于弦的直径平分弦和弦所对的两条弧", "以上都不是"],
        answer: "2",
        knowledge_point: "圆的垂径定理",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "752",
        question: "下列哪个是圆的弧长公式？",
        options: ["l = 2πr", "l = πr²", "l = nπr/180", "l = nπr/360"],
        answer: "2",
        knowledge_point: "圆的弧长",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "753",
        question: "下列哪个是圆的扇形面积公式？",
        options: ["S = 2πr", "S = πr²", "S = nπr²/360", "S = nπr²/180"],
        answer: "2",
        knowledge_point: "圆的扇形面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "754",
        question: "下列哪个是圆的弓形面积公式？",
        options: ["S = S扇形 - S三角形", "S = S扇形 + S三角形", "S = S扇形 × S三角形", "S = S扇形 ÷ S三角形"],
        answer: "0",
        knowledge_point: "圆的弓形面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "755",
        question: "下列哪个是圆的环面积公式？",
        options: ["S = π(R² - r²)", "S = π(R + r)", "S = π(R - r)", "S = πRr"],
        answer: "0",
        knowledge_point: "圆的环面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "756",
        question: "下列哪个是圆的圆柱体积公式？",
        options: ["V = πr²h", "V = 2πrh", "V = πrh", "V = 2πr²h"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "757",
        question: "下列哪个是圆的圆柱表面积公式？",
        options: ["S = 2πr² + 2πrh", "S = πr² + 2πrh", "S = 2πr² + πrh", "S = πr² + πrh"],
        answer: "0",
        knowledge_point: "圆柱表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "758",
        question: "下列哪个是圆的圆锥体积公式？",
        options: ["V = πr²h", "V = 1/3πr²h", "V = 2/3πr²h", "V = 3πr²h"],
        answer: "1",
        knowledge_point: "圆锥体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "759",
        question: "下列哪个是圆的圆锥表面积公式？",
        options: ["S = πr² + πrl", "S = 2πr² + πrl", "S = πr² + 2πrl", "S = 2πr² + 2πrl"],
        answer: "0",
        knowledge_point: "圆锥表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "760",
        question: "下列哪个是圆的球体积公式？",
        options: ["V = 4/3πr³", "V = 4πr³", "V = 4/3πr²", "V = 4πr²"],
        answer: "0",
        knowledge_point: "球体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "761",
        question: "下列哪个是圆的球表面积公式？",
        options: ["S = 4πr²", "S = 2πr²", "S = 4πr", "S = 2πr"],
        answer: "0",
        knowledge_point: "球表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "762",
        question: "下列哪个是圆的圆柱侧面积公式？",
        options: ["S = 2πrh", "S = πrh", "S = 2πr²", "S = πr²"],
        answer: "0",
        knowledge_point: "圆柱侧面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "763",
        question: "下列哪个是圆的圆锥侧面积公式？",
        options: ["S = πrl", "S = 2πrl", "S = πr²", "S = 2πr²"],
        answer: "0",
        knowledge_point: "圆锥侧面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "764",
        question: "下列哪个是圆的圆柱全面积公式？",
        options: ["S = 2πr² + 2πrh", "S = πr² + 2πrh", "S = 2πr² + πrh", "S = πr² + πrh"],
        answer: "0",
        knowledge_point: "圆柱全面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "765",
        question: "下列哪个是圆的圆锥全面积公式？",
        options: ["S = πr² + πrl", "S = 2πr² + πrl", "S = πr² + 2πrl", "S = 2πr² + 2πrl"],
        answer: "0",
        knowledge_point: "圆锥全面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "766",
        question: "下列哪个是圆的圆柱高？",
        options: ["圆柱的底面半径", "圆柱的底面直径", "圆柱的两个底面之间的距离", "圆柱的母线长"],
        answer: "2",
        knowledge_point: "圆柱高",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "767",
        question: "下列哪个是圆的圆锥高？",
        options: ["圆锥的底面半径", "圆锥的底面直径", "圆锥的顶点到底面的距离", "圆锥的母线长"],
        answer: "2",
        knowledge_point: "圆锥高",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "768",
        question: "下列哪个是圆的圆柱母线？",
        options: ["圆柱的底面半径", "圆柱的底面直径", "圆柱的两个底面之间的距离", "圆柱的侧面展开图的矩形的长"],
        answer: "3",
        knowledge_point: "圆柱母线",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "769",
        question: "下列哪个是圆的圆锥母线？",
        options: ["圆锥的底面半径", "圆锥的底面直径", "圆锥的顶点到底面的距离", "圆锥的顶点到底面圆周上任意一点的距离"],
        answer: "3",
        knowledge_point: "圆锥母线",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "770",
        question: "下列哪个是圆的圆柱底面？",
        options: ["圆柱的两个圆面", "圆柱的一个圆面", "圆柱的侧面", "圆柱的展开图"],
        answer: "0",
        knowledge_point: "圆柱底面",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "771",
        question: "下列哪个是圆的圆锥底面？",
        options: ["圆锥的两个圆面", "圆锥的一个圆面", "圆锥的侧面", "圆锥的展开图"],
        answer: "1",
        knowledge_point: "圆锥底面",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "772",
        question: "下列哪个是圆的圆柱侧面？",
        options: ["圆柱的两个圆面", "圆柱的一个圆面", "圆柱的曲面", "圆柱的展开图"],
        answer: "2",
        knowledge_point: "圆柱侧面",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "773",
        question: "下列哪个是圆的圆锥侧面？",
        options: ["圆锥的两个圆面", "圆锥的一个圆面", "圆锥的曲面", "圆锥的展开图"],
        answer: "2",
        knowledge_point: "圆锥侧面",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "774",
        question: "下列哪个是圆的圆柱展开图？",
        options: ["两个圆和一个矩形", "一个圆和一个矩形", "两个圆和一个三角形", "一个圆和一个三角形"],
        answer: "0",
        knowledge_point: "圆柱展开图",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "775",
        question: "下列哪个是圆的圆锥展开图？",
        options: ["一个圆和一个扇形", "两个圆和一个扇形", "一个圆和一个矩形", "两个圆和一个矩形"],
        answer: "0",
        knowledge_point: "圆锥展开图",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "776",
        question: "下列哪个是圆的圆柱轴截面？",
        options: ["矩形", "圆形", "三角形", "梯形"],
        answer: "0",
        knowledge_point: "圆柱轴截面",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "777",
        question: "下列哪个是圆的圆锥轴截面？",
        options: ["矩形", "圆形", "等腰三角形", "梯形"],
        answer: "2",
        knowledge_point: "圆锥轴截面",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "778",
        question: "下列哪个是圆的圆柱截面？",
        options: ["圆形或矩形", "圆形或三角形", "圆形或梯形", "圆形或椭圆形"],
        answer: "0",
        knowledge_point: "圆柱截面",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "779",
        question: "下列哪个是圆的圆锥截面？",
        options: ["圆形或等腰三角形", "圆形或矩形", "圆形或梯形", "圆形或椭圆形"],
        answer: "0",
        knowledge_point: "圆锥截面",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "780",
        question: "下列哪个是圆的圆柱体积计算？",
        options: ["r = 3，h = 5时，V = 45π", "r = 3，h = 5时，V = 15π", "r = 3，h = 5时，V = 30π", "r = 3，h = 5时，V = 60π"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "781",
        question: "下列哪个是圆的圆锥体积计算？",
        options: ["r = 3，h = 5时，V = 15π", "r = 3，h = 5时，V = 45π", "r = 3，h = 5时，V = 30π", "r = 3，h = 5时，V = 60π"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "782",
        question: "下列哪个是圆的球体积计算？",
        options: ["r = 3时，V = 36π", "r = 3时，V = 108π", "r = 3时，V = 12π", "r = 3时，V = 24π"],
        answer: "0",
        knowledge_point: "球体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "783",
        question: "下列哪个是圆的圆柱表面积计算？",
        options: ["r = 3，h = 5时，S = 48π", "r = 3，h = 5时，S = 24π", "r = 3，h = 5时，S = 36π", "r = 3，h = 5时，S = 60π"],
        answer: "0",
        knowledge_point: "圆柱表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "784",
        question: "下列哪个是圆的圆锥表面积计算？",
        options: ["r = 3，l = 5时，S = 24π", "r = 3，l = 5时，S = 12π", "r = 3，l = 5时，S = 18π", "r = 3，l = 5时，S = 30π"],
        answer: "0",
        knowledge_point: "圆锥表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "785",
        question: "下列哪个是圆的球表面积计算？",
        options: ["r = 3时，S = 36π", "r = 3时，S = 18π", "r = 3时，S = 12π", "r = 3时，S = 24π"],
        answer: "0",
        knowledge_point: "球表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "786",
        question: "下列哪个是圆的圆柱侧面积计算？",
        options: ["r = 3，h = 5时，S = 30π", "r = 3，h = 5时，S = 15π", "r = 3，h = 5时，S = 45π", "r = 3，h = 5时，S = 60π"],
        answer: "0",
        knowledge_point: "圆柱侧面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "787",
        question: "下列哪个是圆的圆锥侧面积计算？",
        options: ["r = 3，l = 5时，S = 15π", "r = 3，l = 5时，S = 30π", "r = 3，l = 5时，S = 45π", "r = 3，l = 5时，S = 60π"],
        answer: "0",
        knowledge_point: "圆锥侧面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "788",
        question: "下列哪个是圆的圆柱全面积计算？",
        options: ["r = 3，h = 5时，S = 48π", "r = 3，h = 5时，S = 24π", "r = 3，h = 5时，S = 36π", "r = 3，h = 5时，S = 60π"],
        answer: "0",
        knowledge_point: "圆柱全面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "789",
        question: "下列哪个是圆的圆锥全面积计算？",
        options: ["r = 3，l = 5时，S = 24π", "r = 3，l = 5时，S = 12π", "r = 3，l = 5时，S = 18π", "r = 3，l = 5时，S = 30π"],
        answer: "0",
        knowledge_point: "圆锥全面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "790",
        question: "下列哪个是圆的圆柱体积计算？",
        options: ["r = 3，h = 5时，V = 45π", "r = 3，h = 5时，V = 15π", "r = 3，h = 5时，V = 30π", "r = 3，h = 5时，V = 60π"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "791",
        question: "下列哪个是圆的圆锥体积计算？",
        options: ["r = 3，h = 5时，V = 15π", "r = 3，h = 5时，V = 45π", "r = 3，h = 5时，V = 30π", "r = 3，h = 5时，V = 60π"],
        answer: "0",
        knowledge_point: "圆锥体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "792",
        question: "下列哪个是圆的球体积计算？",
        options: ["r = 3时，V = 36π", "r = 3时，V = 108π", "r = 3时，V = 12π", "r = 3时，V = 24π"],
        answer: "0",
        knowledge_point: "球体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "793",
        question: "下列哪个是圆的圆柱表面积计算？",
        options: ["r = 3，h = 5时，S = 48π", "r = 3，h = 5时，S = 24π", "r = 3，h = 5时，S = 36π", "r = 3，h = 5时，S = 60π"],
        answer: "0",
        knowledge_point: "圆柱表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "794",
        question: "下列哪个是圆的圆锥表面积计算？",
        options: ["r = 3，l = 5时，S = 24π", "r = 3，l = 5时，S = 12π", "r = 3，l = 5时，S = 18π", "r = 3，l = 5时，S = 30π"],
        answer: "0",
        knowledge_point: "圆锥表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "795",
        question: "下列哪个是圆的球表面积计算？",
        options: ["r = 3时，S = 36π", "r = 3时，S = 18π", "r = 3时，S = 12π", "r = 3时，S = 24π"],
        answer: "0",
        knowledge_point: "球表面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "796",
        question: "下列哪个是圆的圆柱侧面积计算？",
        options: ["r = 3，h = 5时，S = 30π", "r = 3，h = 5时，S = 15π", "r = 3，h = 5时，S = 45π", "r = 3，h = 5时，S = 60π"],
        answer: "0",
        knowledge_point: "圆柱侧面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "797",
        question: "下列哪个是圆的圆锥侧面积计算？",
        options: ["r = 3，l = 5时，S = 15π", "r = 3，l = 5时，S = 30π", "r = 3，l = 5时，S = 45π", "r = 3，l = 5时，S = 60π"],
        answer: "0",
        knowledge_point: "圆锥侧面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "798",
        question: "下列哪个是圆的圆柱全面积计算？",
        options: ["r = 3，h = 5时，S = 48π", "r = 3，h = 5时，S = 24π", "r = 3，h = 5时，S = 36π", "r = 3，h = 5时，S = 60π"],
        answer: "0",
        knowledge_point: "圆柱全面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "799",
        question: "下列哪个是圆的圆锥全面积计算？",
        options: ["r = 3，l = 5时，S = 24π", "r = 3，l = 5时，S = 12π", "r = 3，l = 5时，S = 18π", "r = 3，l = 5时，S = 30π"],
        answer: "0",
        knowledge_point: "圆锥全面积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "800",
        question: "下列哪个是圆的圆柱体积计算？",
        options: ["r = 3，h = 5时，V = 45π", "r = 3，h = 5时，V = 15π", "r = 3，h = 5时，V = 30π", "r = 3，h = 5时，V = 60π"],
        answer: "0",
        knowledge_point: "圆柱体积",
        grade: "八年级",
        subject: "数学"
      },
      {
        id: "801",
        question: "一元二次方程x² - 4x + 4 = 0的解是？",
        options: ["x = 2", "x = -2", "x = 4", "x = -4"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "802",
        question: "一元二次方程x² - 9 = 0的解是？",
        options: ["x = 3或-3", "x = 3", "x = -3", "x = 9"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "803",
        question: "一元二次方程x² + 5x + 6 = 0的解是？",
        options: ["x = -2或-3", "x = 2或3", "x = -2或3", "x = 2或-3"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "804",
        question: "一元二次方程2x² - 8 = 0的解是？",
        options: ["x = 2或-2", "x = 2", "x = -2", "x = 4"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "805",
        question: "一元二次方程x² - 6x + 9 = 0的解是？",
        options: ["x = 3", "x = -3", "x = 6", "x = -6"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "806",
        question: "一元二次方程x² - 7x + 12 = 0的解是？",
        options: ["x = 3或4", "x = -3或-4", "x = 3或-4", "x = -3或4"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "807",
        question: "一元二次方程x² - 2x - 3 = 0的解是？",
        options: ["x = -1或3", "x = 1或-3", "x = -1或-3", "x = 1或3"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "808",
        question: "一元二次方程x² + 3x - 10 = 0的解是？",
        options: ["x = -5或2", "x = 5或-2", "x = -5或-2", "x = 5或2"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "809",
        question: "一元二次方程x² - 8x + 15 = 0的解是？",
        options: ["x = 3或5", "x = -3或-5", "x = 3或-5", "x = -3或5"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "810",
        question: "一元二次方程x² + 4x + 3 = 0的解是？",
        options: ["x = -1或-3", "x = 1或3", "x = -1或3", "x = 1或-3"],
        answer: "0",
        knowledge_point: "一元二次方程",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "811",
        question: "二次函数y = x² - 4x + 3的顶点坐标是？",
        options: ["(2, -1)", "(-2, 1)", "(2, 1)", "(-2, -1)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "812",
        question: "二次函数y = x² + 2x + 1的顶点坐标是？",
        options: ["(-1, 0)", "(1, 0)", "(-1, 1)", "(1, 1)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "813",
        question: "二次函数y = -x² + 4x - 3的顶点坐标是？",
        options: ["(2, 1)", "(-2, -1)", "(2, -1)", "(-2, 1)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "814",
        question: "二次函数y = x² - 6x + 8的顶点坐标是？",
        options: ["(3, -1)", "(-3, 1)", "(3, 1)", "(-3, -1)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "815",
        question: "二次函数y = -x² + 2x + 3的顶点坐标是？",
        options: ["(1, 4)", "(-1, -4)", "(1, -4)", "(-1, 4)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "816",
        question: "二次函数y = x² + 4x + 5的顶点坐标是？",
        options: ["(-2, 1)", "(2, -1)", "(-2, -1)", "(2, 1)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "817",
        question: "二次函数y = -x² - 6x - 8的顶点坐标是？",
        options: ["(-3, 1)", "(3, -1)", "(-3, -1)", "(3, 1)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "818",
        question: "二次函数y = x² - 2x - 3的顶点坐标是？",
        options: ["(1, -4)", "(-1, 4)", "(1, 4)", "(-1, -4)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "819",
        question: "二次函数y = -x² + 8x - 15的顶点坐标是？",
        options: ["(4, 1)", "(-4, -1)", "(4, -1)", "(-4, 1)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "820",
        question: "二次函数y = x² + 6x + 9的顶点坐标是？",
        options: ["(-3, 0)", "(3, 0)", "(-3, 9)", "(3, 9)"],
        answer: "0",
        knowledge_point: "二次函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "821",
        question: "sin45°等于？",
        options: ["√2/2", "√3/2", "1/2", "1"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "822",
        question: "cos60°等于？",
        options: ["1/2", "√2/2", "√3/2", "1"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "823",
        question: "tan30°等于？",
        options: ["√3/3", "√3", "1", "1/√3"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "824",
        question: "sin60°等于？",
        options: ["√3/2", "√2/2", "1/2", "1"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "825",
        question: "cos45°等于？",
        options: ["√2/2", "√3/2", "1/2", "1"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "826",
        question: "tan45°等于？",
        options: ["1", "√3", "√3/3", "1/2"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "827",
        question: "sin²α + cos²α等于？",
        options: ["1", "0", "2", "sin2α"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "828",
        question: "tanα等于？",
        options: ["sinα/cosα", "cosα/sinα", "sinα×cosα", "sinα+cosα"],
        answer: "0",
        knowledge_point: "三角函数",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "829",
        question: "下列哪个是圆的切线性质？",
        options: ["切线垂直于半径", "切线平行于半径", "切线等于半径", "切线是直径"],
        answer: "0",
        knowledge_point: "圆的切线",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "830",
        question: "下列哪个是相似三角形的判定条件？",
        options: ["两边相等", "三边成比例", "两角相等", "一角相等"],
        answer: "2",
        knowledge_point: "相似三角形",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "831",
        question: "概率的基本性质是？",
        options: ["概率可以大于1", "概率可以小于0", "0 ≤ P ≤ 1", "概率总是等于1"],
        answer: "2",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "832",
        question: "抛硬币出现正面的概率是？",
        options: ["1/2", "1/3", "1/4", "1"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "833",
        question: "掷骰子出现6的概率是？",
        options: ["1/6", "1/3", "1/2", "1"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "834",
        question: "从1到10中随机取一个数，取到偶数的概率是？",
        options: ["1/2", "1/3", "2/5", "3/5"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "835",
        question: "从一副牌中随机抽一张，抽到红桃的概率是？",
        options: ["1/4", "1/2", "1/3", "1/13"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "836",
        question: "下列哪个是必然事件？",
        options: ["太阳从东方升起", "明天会下雨", "掷骰子出现6", "抽到红桃"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "837",
        question: "下列哪个是不可能事件？",
        options: ["太阳从东方升起", "明天会下雨", "掷骰子出现7", "抽到红桃"],
        answer: "2",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "838",
        question: "下列哪个是随机事件？",
        options: ["太阳从东方升起", "明天会下雨", "掷骰子出现6", "掷骰子出现7"],
        answer: "2",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "839",
        question: "下列哪个是互斥事件？",
        options: ["掷骰子出现1和2", "掷骰子出现1和6", "掷骰子出现偶数和奇数", "掷骰子出现质数和合数"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "840",
        question: "下列哪个是对立事件？",
        options: ["掷骰子出现1和2", "掷骰子出现1和6", "掷骰子出现偶数和奇数", "掷骰子出现质数和合数"],
        answer: "2",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "841",
        question: "下列哪个是独立事件？",
        options: ["掷骰子两次，第一次出现1，第二次出现2", "掷骰子两次，第一次出现1，第二次出现1", "掷骰子两次，第一次出现偶数，第二次出现奇数", "掷骰子两次，第一次出现质数，第二次出现合数"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "842",
        question: "下列哪个是条件概率？",
        options: ["已知第一次掷骰子出现1，第二次掷骰子出现2的概率", "掷骰子出现1的概率", "掷骰子出现2的概率", "掷骰子出现1或2的概率"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "843",
        question: "下列哪个是全概率公式？",
        options: ["P(A) = P(A|B1)P(B1) + P(A|B2)P(B2) + ...", "P(A) = P(A|B)P(B)", "P(A) = P(A∩B)", "P(A) = P(A∪B)"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "844",
        question: "下列哪个是贝叶斯公式？",
        options: ["P(B|A) = P(A|B)P(B)/P(A)", "P(A|B) = P(B|A)P(A)/P(B)", "P(A∩B) = P(A)P(B)", "P(A∪B) = P(A) + P(B)"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "845",
        question: "下列哪个是期望？",
        options: ["E(X) = ΣxP(X=x)", "E(X) = Σx²P(X=x)", "E(X) = ΣP(X=x)", "E(X) = ΣxP(X=x)²"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "846",
        question: "下列哪个是方差？",
        options: ["Var(X) = E(X²) - [E(X)]²", "Var(X) = E(X) - [E(X)]²", "Var(X) = E(X²) + [E(X)]²", "Var(X) = [E(X)]² - E(X²)"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "847",
        question: "下列哪个是标准差？",
        options: ["σ = √Var(X)", "σ = Var(X)", "σ = Var(X)²", "σ = Var(X)/2"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "848",
        question: "下列哪个是离散型随机变量？",
        options: ["掷骰子的结果", "人的身高", "人的体重", "人的年龄"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "849",
        question: "下列哪个是连续型随机变量？",
        options: ["掷骰子的结果", "人的身高", "人的体重", "以上都是"],
        answer: "3",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "850",
        question: "下列哪个是二项分布？",
        options: ["n次独立重复试验中成功次数的分布", "n次独立重复试验中失败次数的分布", "n次独立重复试验中成功和失败次数的分布", "n次独立重复试验中成功和失败次数的比值"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "851",
        question: "下列哪个是正态分布？",
        options: ["钟形曲线", "U形曲线", "直线", "抛物线"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "852",
        question: "下列哪个是标准正态分布？",
        options: ["μ=0，σ=1的正态分布", "μ=1，σ=0的正态分布", "μ=0，σ=0的正态分布", "μ=1，σ=1的正态分布"],
        answer: "0",
        knowledge_point: "概率",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "853",
        question: "下列哪个是统计中的样本？",
        options: ["从总体中抽取的一部分", "总体中的所有个体", "样本中的所有个体", "样本中的一部分"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "854",
        question: "下列哪个是统计中的总体？",
        options: ["研究对象的全体", "从总体中抽取的一部分", "样本中的所有个体", "样本中的一部分"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "855",
        question: "下列哪个是统计中的样本容量？",
        options: ["样本中个体的数量", "总体中个体的数量", "样本中个体的总和", "总体中个体的总和"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "856",
        question: "下列哪个是统计中的样本均值？",
        options: ["样本中个体的平均值", "总体中个体的平均值", "样本中个体的总和", "总体中个体的总和"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "857",
        question: "下列哪个是统计中的样本方差？",
        options: ["样本中个体的方差", "总体中个体的方差", "样本中个体的标准差", "总体中个体的标准差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "858",
        question: "下列哪个是统计中的样本标准差？",
        options: ["样本中个体的标准差", "总体中个体的标准差", "样本中个体的方差", "总体中个体的方差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "859",
        question: "下列哪个是统计中的样本中位数？",
        options: ["样本中个体的中位数", "总体中个体的中位数", "样本中个体的平均值", "总体中个体的平均值"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "860",
        question: "下列哪个是统计中的样本众数？",
        options: ["样本中出现次数最多的数", "总体中出现次数最多的数", "样本中个体的平均值", "总体中个体的平均值"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "861",
        question: "下列哪个是统计中的样本极差？",
        options: ["样本中最大值与最小值的差", "总体中最大值与最小值的差", "样本中个体的平均值", "总体中个体的平均值"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "862",
        question: "下列哪个是统计中的样本四分位数？",
        options: ["将样本分成四等分的数", "将总体分成四等分的数", "样本中个体的平均值", "总体中个体的平均值"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "863",
        question: "下列哪个是统计中的样本偏度？",
        options: ["样本分布的不对称程度", "总体分布的不对称程度", "样本中个体的平均值", "总体中个体的平均值"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "864",
        question: "下列哪个是统计中的样本峰度？",
        options: ["样本分布的尖锐程度", "总体分布的尖锐程度", "样本中个体的平均值", "总体中个体的平均值"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "865",
        question: "下列哪个是统计中的样本相关系数？",
        options: ["两个变量之间的线性关系", "两个变量之间的非线性关系", "两个变量之间的平均值", "两个变量之间的方差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "866",
        question: "下列哪个是统计中的样本回归系数？",
        options: ["回归直线的斜率", "回归直线的截距", "回归直线的方差", "回归直线的标准差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "867",
        question: "下列哪个是统计中的样本决定系数？",
        options: ["回归方程的拟合程度", "回归方程的斜率", "回归方程的截距", "回归方程的方差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "868",
        question: "下列哪个是统计中的样本残差？",
        options: ["观测值与预测值的差", "观测值与平均值的差", "预测值与平均值的差", "观测值与预测值的和"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "869",
        question: "下列哪个是统计中的样本残差平方和？",
        options: ["残差的平方和", "残差的和", "残差的绝对值和", "残差的立方和"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "870",
        question: "下列哪个是统计中的样本均方误差？",
        options: ["残差平方和的平均值", "残差平方和的总和", "残差平方和的平方根", "残差平方和的平方"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "871",
        question: "下列哪个是统计中的样本均方根误差？",
        options: ["均方误差的平方根", "均方误差的平方", "均方误差的绝对值", "均方误差的平均值"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "872",
        question: "下列哪个是统计中的样本平均绝对误差？",
        options: ["残差绝对值的平均值", "残差绝对值的总和", "残差绝对值的平方根", "残差绝对值的平方"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "873",
        question: "下列哪个是统计中的样本平均绝对百分比误差？",
        options: ["残差绝对值与观测值比值的平均值", "残差绝对值与观测值比值的总和", "残差绝对值与观测值比值的平方根", "残差绝对值与观测值比值的平方"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "874",
        question: "下列哪个是统计中的样本对称平均绝对百分比误差？",
        options: ["残差绝对值与观测值和预测值平均值比值的平均值", "残差绝对值与观测值比值的平均值", "残差绝对值与预测值比值的平均值", "残差绝对值与观测值和预测值比值的平均值"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "875",
        question: "下列哪个是统计中的样本Theil不等系数？",
        options: ["预测误差的相对大小", "预测误差的绝对大小", "预测误差的平方大小", "预测误差的立方大小"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "876",
        question: "下列哪个是统计中的样本信息准则？",
        options: ["模型选择的准则", "模型选择的斜率", "模型选择的截距", "模型选择的方差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "877",
        question: "下列哪个是统计中的样本贝叶斯信息准则？",
        options: ["模型选择的准则", "模型选择的斜率", "模型选择的截距", "模型选择的方差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "878",
        question: "下列哪个是统计中的样本赤池信息准则？",
        options: ["模型选择的准则", "模型选择的斜率", "模型选择的截距", "模型选择的方差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "879",
        question: "下列哪个是统计中的样本交叉验证？",
        options: ["模型评估的方法", "模型选择的斜率", "模型选择的截距", "模型选择的方差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      },
      {
        id: "880",
        question: "下列哪个是统计中的样本自助法？",
        options: ["重抽样的方法", "模型选择的斜率", "模型选择的截距", "模型选择的方差"],
        answer: "0",
        knowledge_point: "统计",
        grade: "九年级",
        subject: "数学"
      }
    ];

    var filteredQuestions = allQuestions.filter(function (q) {
      return q.grade === grade && q.subject === subject;
    });

    var selectedOptions = [];
    for (var i = 0; i < filteredQuestions.length; i++) {
      selectedOptions.push(null);
    }

    this.setData({
      questions: filteredQuestions,
      selectedOptions: selectedOptions,
      currentQuestion: 0
    });
  },

  initQuestions: function () {
    this.setData({
      showTest: false,
      showResult: false,
      questions: [],
      selectedOptions: [],
      currentQuestion: 0,
      gradeIndex: -1,
      subjectIndex: -1,
      score: undefined,
      masteryRate: 0,
      feedback: "",
      masteryItems: []
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
    var correctCount = 0;
    var totalQuestions = this.data.questions.length;
    var pointsPerQuestion = Math.round(this.data.totalScore / totalQuestions);
    
    for (var i = 0; i < this.data.questions.length; i++) {
      if (this.data.selectedOptions[i] == this.data.questions[i].answer) {
        correctCount++;
      }
    }
    
    score = correctCount * pointsPerQuestion;
    var masteryRate = Math.round((correctCount / totalQuestions) * 100);
    
    var masteryItems = this.calculateMastery();
    var feedback = this.generateFeedback(correctCount, totalQuestions, masteryItems);
    
    var selectedGrade = this.data.grades[this.data.gradeIndex];
    var selectedSubject = this.data.subjects[this.data.subjectIndex];
    
    this.addToHistory(selectedGrade, selectedSubject, score, masteryRate, feedback, masteryItems);

    this.setData({
      showTest: false,
      showResult: true,
      score: score,
      masteryRate: masteryRate,
      feedback: feedback,
      masteryItems: masteryItems
    });
  },

  calculateMastery: function () {
    var questions = this.data.questions;
    var selectedOptions = this.data.selectedOptions;
    
    // 统计每个知识点的答题情况
    var knowledgePointStats = {};
    
    for (var i = 0; i < questions.length; i++) {
      var question = questions[i];
      var point = question.knowledge_point;
      var isCorrect = selectedOptions[i] == question.answer;
      
      if (!knowledgePointStats[point]) {
        knowledgePointStats[point] = {
          correct: 0,
          total: 0
        };
      }
      
      knowledgePointStats[point].total++;
      if (isCorrect) {
        knowledgePointStats[point].correct++;
      }
    }
    
    // 转换为数组并计算百分比
    var masteryItems = [];
    for (var point in knowledgePointStats) {
      var stats = knowledgePointStats[point];
      var percent = Math.round((stats.correct / stats.total) * 100);
      masteryItems.push({
        name: point,
        percent: percent
      });
    }
    
    // 如果没有知识点（比如没有题目），返回空数组
    if (masteryItems.length === 0) {
      masteryItems = [];
    }
    
    return masteryItems;
  },

  generateFeedback: function (correctCount, totalQuestions, masteryItems) {
    var percentage = Math.round((correctCount / totalQuestions) * 100);
    var weakPoints = [];
    
    masteryItems.forEach(function (item) {
      if (item.percent < 70) {
        weakPoints.push(item.name);
      }
    });
    
    var feedback = "";
    
    if (percentage >= 90) {
      feedback = "太棒了！你对" + this.data.subjects[this.data.subjectIndex] + "知识的掌握非常扎实，基础概念、计算能力和应用能力都达到了优秀水平。继续保持这种学习状态，你一定能取得更好的成绩！";
    } else if (percentage >= 80) {
      feedback = "表现优秀！你对大部分知识点都掌握得很好，基础概念和计算能力较强。建议在应用能力方面多做一些综合练习题，提高解题的灵活性。";
    } else if (percentage >= 70) {
      feedback = "表现良好！你对基础知识有一定的掌握，但在某些方面还需要加强。建议重点复习错题涉及的知识点，多做针对性练习，巩固薄弱环节。";
    } else if (percentage >= 60) {
      feedback = "及格了，但还有很大的提升空间。你对基础知识有一定了解，但掌握不够牢固。建议系统复习课本内容，特别是" + (weakPoints.length > 0 ? weakPoints.join("、") : "薄弱知识点") + "方面，需要加强练习。";
    } else {
      feedback = "需要加油！你对当前知识点的掌握情况有待提高，建议从基础开始系统学习。可以先回顾课本的基本概念和公式，然后通过大量练习来巩固。遇到不懂的问题要及时请教老师或同学，不要让问题积累。";
    }
    
    return feedback;
  },

  retryTest: function () {
    var selectedGrade = this.data.grades[this.data.gradeIndex];
    var selectedSubject = this.data.subjects[this.data.subjectIndex];
    
    this.filterQuestions(selectedGrade, selectedSubject);
    
    this.setData({
      showResult: false,
      showTest: true,
      score: undefined,
      masteryRate: 0,
      feedback: "",
      masteryItems: []
    });
  },

  finishTest: function () {
    wx.navigateBack();
  },

  // 添加学习历史
  addToHistory: function (grade, subject, score, masteryRate, feedback, masteryItems) {
    var history = wx.getStorageSync('studyHistory') || [];
    var id = 'test_' + grade + '_' + subject;
    var existingIndex = -1;
    
    for (var i = 0; i < history.length; i++) {
      if (history[i].id === id) {
        existingIndex = i;
        break;
      }
    }

    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }

    history.unshift({
      id: id,
      title: '学业诊断 - ' + subject + '测试',
      type: 'test',
      typeName: '学业诊断',
      time: new Date().toLocaleString(),
      grade: grade,
      subject: subject,
      score: score,
      masteryRate: masteryRate,
      feedback: feedback,
      masteryItems: masteryItems
    });

    if (history.length > 50) {
      history = history.slice(0, 50);
    }

    wx.setStorageSync('studyHistory', history);
  },

  // tabBar 更新回调
  onTabBarUpdate: function () {
    console.log('测试页面 tabBar 更新');
  }
});