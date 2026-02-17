// index.js
Page({
  data: {
    grades: ['三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级'],
    gradeIndex: 0,
    subjects: ['数学', '语文', '英语'],
    subjectIndex: 0,
    versions: ['粤教版', '香港版', '全部'],
    versionIndex: 2,
    overlapKnowledges: [],
    guangdongKnowledges: [],
    hongkongKnowledges: [],
    overlapCount: 0,
    guangdongCount: 0,
    hongkongCount: 0,
    showDetail: false,
    currentKnowledge: {},
    activeTab: 'common',
    detailTab: 'chinese',
    comparingItem: null
  },

  onLoad: function () {
    this.initData();
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
    var knowledgeData = [
      // 三年级数学
      {
        grade: "三年级",
        subject: "数学",
        guangdong_knowledge: "分数的初步认识",
        hongkong_knowledge: "分数的基本概念",
        match_type: "重合",
        description: "认识分数的意义，掌握简单分数的读写",
        description_en: "Understand the meaning of fractions and master simple fraction reading and writing",
        description_zh: "認識分數的意義，掌握簡單分數的讀寫",
        example: "1/2 + 1/2 = 1"
      },
      {
        grade: "三年级",
        subject: "数学",
        guangdong_knowledge: "长方形和正方形的面积",
        hongkong_knowledge: "平面图形的面积计算",
        match_type: "重合",
        description: "掌握长方形和正方形的面积计算公式",
        description_en: "Master the area calculation formulas for rectangles and squares",
        description_zh: "掌握長方形和正方形的面積計算公式",
        example: "长方形面积 = 长 × 宽"
      },
      {
        grade: "三年级",
        subject: "数学",
        guangdong_knowledge: "小数的初步认识",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "认识小数的意义，掌握简单小数的读写",
        description_en: "Understand the meaning of decimals and master simple decimal reading and writing",
        description_zh: "認識小數的意義，掌握簡單小數的讀寫",
        example: "0.5 读作零点五"
      },
      {
        grade: "三年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "百分数的初步认识",
        match_type: "港拓展",
        description: "认识百分数的意义，掌握简单百分数的读写",
        description_en: "Understand the meaning of percentages and master simple percentage reading and writing",
        description_zh: "認識百分數的意義，掌握簡單百分數的讀寫",
        example: "50% 读作百分之五十"
      },

      // 四年级数学
      {
        grade: "四年级",
        subject: "数学",
        guangdong_knowledge: "四则混合运算",
        hongkong_knowledge: "整数四则运算",
        match_type: "重合",
        description: "掌握整数四则混合运算的顺序和方法",
        description_en: "Master the order and methods of integer four operations",
        description_zh: "掌握整數四則混合運算的順序和方法",
        example: "(25 + 15) × 2 = 80"
      },
      {
        grade: "四年级",
        subject: "数学",
        guangdong_knowledge: "三角形的认识",
        hongkong_knowledge: "三角形的性质",
        match_type: "重合",
        description: "认识三角形的基本特征和分类",
        description_en: "Understand the basic characteristics and classification of triangles",
        description_zh: "認識三角形的基本特徵和分類",
        example: "三角形内角和为180度"
      },
      {
        grade: "四年级",
        subject: "数学",
        guangdong_knowledge: "小数的加减法",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握小数加减法的计算方法",
        description_en: "Master the calculation methods of decimal addition and subtraction",
        description_zh: "掌握小數加減法的計算方法",
        example: "0.5 + 0.3 = 0.8"
      },
      {
        grade: "四年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "小数的乘除法",
        match_type: "港拓展",
        description: "掌握小数乘除法的计算方法",
        description_en: "Master the calculation methods of decimal multiplication and division",
        description_zh: "掌握小數乘除法的計算方法",
        example: "0.5 × 0.3 = 0.15"
      },

      // 五年级数学
      {
        grade: "五年级",
        subject: "数学",
        guangdong_knowledge: "分数的加减法",
        hongkong_knowledge: "分数的四则运算",
        match_type: "重合",
        description: "掌握分数加减法的计算方法",
        description_en: "Master the calculation methods of fraction addition and subtraction",
        description_zh: "掌握分數加減法的計算方法",
        example: "1/2 + 1/3 = 5/6"
      },
      {
        grade: "五年级",
        subject: "数学",
        guangdong_knowledge: "长方体和正方体",
        hongkong_knowledge: "立体图形的认识",
        match_type: "重合",
        description: "认识长方体和正方体的特征和表面积计算",
        description_en: "Understand the characteristics and surface area calculation of cuboids and cubes",
        description_zh: "認識長方體和正方體的特徵和表面積計算",
        example: "正方体表面积 = 6 × 边长²"
      },
      {
        grade: "五年级",
        subject: "数学",
        guangdong_knowledge: "简易方程",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握简易方程的解法",
        description_en: "Master the solution methods of simple equations",
        description_zh: "掌握簡易方程的解法",
        example: "2x + 3 = 7，解得x = 2"
      },
      {
        grade: "五年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "比例的初步认识",
        match_type: "港拓展",
        description: "认识比例的意义和基本性质",
        description_en: "Understand the meaning and basic properties of ratios",
        description_zh: "認識比例的意義和基本性質",
        example: "1:2 = 2:4"
      },

      // 六年级数学
      {
        grade: "六年级",
        subject: "数学",
        guangdong_knowledge: "分数的乘除法",
        hongkong_knowledge: "分数的四则运算",
        match_type: "重合",
        description: "掌握分数乘除法的计算方法",
        description_en: "Master the calculation methods of fraction multiplication and division",
        description_zh: "掌握分數乘除法的計算方法",
        example: "1/2 × 1/3 = 1/6"
      },
      {
        grade: "六年级",
        subject: "数学",
        guangdong_knowledge: "圆的认识",
        hongkong_knowledge: "圆的性质",
        match_type: "重合",
        description: "认识圆的基本特征和周长、面积计算",
        description_en: "Understand the basic characteristics and calculation of circumference and area of circles",
        description_zh: "認識圓的基本特徵和周長、面積計算",
        example: "圆的周长 = 2πr"
      },
      {
        grade: "六年级",
        subject: "数学",
        guangdong_knowledge: "百分数的应用",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握百分数的实际应用",
        description_en: "Master the practical application of percentages",
        description_zh: "掌握百分數的實際應用",
        example: "商品打8折，原价100元，现价80元"
      },
      {
        grade: "六年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "概率的初步认识",
        match_type: "港拓展",
        description: "认识概率的基本概念和简单计算",
        description_en: "Understand the basic concepts and simple calculations of probability",
        description_zh: "認識概率的基本概念和簡單計算",
        example: "抛硬币正面朝上的概率是1/2"
      },

      // 七年级数学
      {
        grade: "七年级",
        subject: "数学",
        guangdong_knowledge: "有理数的运算",
        hongkong_knowledge: "整数和分数的运算",
        match_type: "重合",
        description: "掌握有理数的四则运算",
        description_en: "Master the four operations of rational numbers",
        description_zh: "掌握有理數的四則運算",
        example: "(-3) + 5 = 2"
      },
      {
        grade: "七年级",
        subject: "数学",
        guangdong_knowledge: "一元一次方程",
        hongkong_knowledge: "线性方程",
        match_type: "重合",
        description: "掌握一元一次方程的解法和应用",
        description_en: "Master the solution methods and applications of linear equations with one variable",
        description_zh: "掌握一元一次方程的解法和應用",
        example: "3x + 5 = 14，解得x = 3"
      },

      // 八年级数学
      {
        grade: "八年级",
        subject: "数学",
        guangdong_knowledge: "勾股定理",
        hongkong_knowledge: "毕达哥拉斯定理",
        match_type: "重合",
        description: "掌握勾股定理的应用",
        description_en: "Master the application of Pythagorean theorem",
        description_zh: "掌握勾股定理的應用",
        example: "a² + b² = c²"
      },
      {
        grade: "八年级",
        subject: "数学",
        guangdong_knowledge: "一次函数",
        hongkong_knowledge: "线性函数",
        match_type: "重合",
        description: "掌握一次函数的图像和性质",
        description_en: "Master the graph and properties of linear functions",
        description_zh: "掌握一次函數的圖像和性質",
        example: "y = 2x + 1"
      },

      // 九年级数学
      {
        grade: "九年级",
        subject: "数学",
        guangdong_knowledge: "二次函数",
        hongkong_knowledge: "二次函数",
        match_type: "重合",
        description: "掌握二次函数的图像和性质",
        description_en: "Master the graph and properties of quadratic functions",
        description_zh: "掌握二次函數的圖像和性質",
        example: "y = ax² + bx + c"
      },
      {
        grade: "九年级",
        subject: "数学",
        guangdong_knowledge: "相似三角形",
        hongkong_knowledge: "相似图形",
        match_type: "重合",
        description: "掌握相似三角形的判定和性质",
        description_en: "Master the determination and properties of similar triangles",
        description_zh: "掌握相似三角形的判定和性質",
        example: "对应角相等，对应边成比例"
      },

      // 语文科目
      {
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "词语的理解和运用",
        hongkong_knowledge: "词汇的认识和使用",
        match_type: "重合",
        description: "掌握词语的理解、积累和运用",
        description_en: "Master the understanding, accumulation and application of words",
        description_zh: "掌握詞語的理解、積累和運用",
        example: "美丽：形容事物好看"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "句子的理解和运用",
        hongkong_knowledge: "句子的构造和使用",
        match_type: "重合",
        description: "掌握句子的理解、改写和运用",
        description_en: "Master the understanding, rewriting and application of sentences",
        description_zh: "掌握句子的理解、改寫和運用",
        example: "陈述句改反问句"
      },

      // 英语科目
      {
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "字母和音标",
        hongkong_knowledge: "英语字母和发音",
        match_type: "重合",
        description: "掌握26个英文字母的读写和基本音标",
        description_en: "Master the reading and writing of 26 English letters and basic phonetic symbols",
        description_zh: "掌握26個英文字母的讀寫和基本音標",
        example: "A a /æ/, B b /b/"
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "简单句型",
        hongkong_knowledge: "基础英语句型",
        match_type: "重合",
        description: "掌握简单的英语句型和日常用语",
        description_en: "Master simple English sentence patterns and daily expressions",
        description_zh: "掌握簡單的英語句型和日常用語",
        example: "I am a student."
      }
    ];

    this.updateKnowledgeList(knowledgeData);
  },

  bindGradeChange: function (e) {
    this.setData({
      gradeIndex: e.detail.value
    });
  },

  bindSubjectChange: function (e) {
    this.setData({
      subjectIndex: e.detail.value
    });
  },

  bindVersionChange: function (e) {
    this.setData({
      versionIndex: e.detail.value
    });
  },

  searchKnowledge: function () {
    var selectedGrade = this.data.grades[this.data.gradeIndex];
    var selectedSubject = this.data.subjects[this.data.subjectIndex];
    var selectedVersion = this.data.versions[this.data.versionIndex];

    // 完整的知识点数据
    var allKnowledgeData = [
      // 三年级数学
      {
        grade: "三年级",
        subject: "数学",
        guangdong_knowledge: "分数的初步认识",
        hongkong_knowledge: "分数的基本概念",
        match_type: "重合",
        description: "认识分数的意义，掌握简单分数的读写",
        description_en: "Understand the meaning of fractions and master simple fraction reading and writing",
        description_zh: "認識分數的意義，掌握簡單分數的讀寫",
        example: "1/2 + 1/2 = 1"
      },
      {
        grade: "三年级",
        subject: "数学",
        guangdong_knowledge: "长方形和正方形的面积",
        hongkong_knowledge: "平面图形的面积计算",
        match_type: "重合",
        description: "掌握长方形和正方形的面积计算公式",
        description_en: "Master the area calculation formulas for rectangles and squares",
        description_zh: "掌握長方形和正方形的面積計算公式",
        example: "长方形面积 = 长 × 宽"
      },
      {
        grade: "三年级",
        subject: "数学",
        guangdong_knowledge: "小数的初步认识",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "认识小数的意义，掌握简单小数的读写",
        description_en: "Understand the meaning of decimals and master simple decimal reading and writing",
        description_zh: "認識小數的意義，掌握簡單小數的讀寫",
        example: "0.5 读作零点五"
      },
      {
        grade: "三年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "百分数的初步认识",
        match_type: "港拓展",
        description: "认识百分数的意义，掌握简单百分数的读写",
        description_en: "Understand the meaning of percentages and master simple percentage reading and writing",
        description_zh: "認識百分數的意義，掌握簡單百分數的讀寫",
        example: "50% 读作百分之五十"
      },

      // 四年级数学
      {
        grade: "四年级",
        subject: "数学",
        guangdong_knowledge: "四则混合运算",
        hongkong_knowledge: "整数四则运算",
        match_type: "重合",
        description: "掌握整数四则混合运算的顺序和方法",
        description_en: "Master the order and methods of integer four operations",
        description_zh: "掌握整數四則混合運算的順序和方法",
        example: "(25 + 15) × 2 = 80"
      },
      {
        grade: "四年级",
        subject: "数学",
        guangdong_knowledge: "三角形的认识",
        hongkong_knowledge: "三角形的性质",
        match_type: "重合",
        description: "认识三角形的基本特征和分类",
        description_en: "Understand the basic characteristics and classification of triangles",
        description_zh: "認識三角形的基本特徵和分類",
        example: "三角形内角和为180度"
      },
      {
        grade: "四年级",
        subject: "数学",
        guangdong_knowledge: "小数的加减法",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握小数加减法的计算方法",
        description_en: "Master the calculation methods of decimal addition and subtraction",
        description_zh: "掌握小數加減法的計算方法",
        example: "0.5 + 0.3 = 0.8"
      },
      {
        grade: "四年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "小数的乘除法",
        match_type: "港拓展",
        description: "掌握小数乘除法的计算方法",
        description_en: "Master the calculation methods of decimal multiplication and division",
        description_zh: "掌握小數乘除法的計算方法",
        example: "0.5 × 0.3 = 0.15"
      },

      // 五年级数学
      {
        grade: "五年级",
        subject: "数学",
        guangdong_knowledge: "分数的加减法",
        hongkong_knowledge: "分数的四则运算",
        match_type: "重合",
        description: "掌握分数加减法的计算方法",
        description_en: "Master the calculation methods of fraction addition and subtraction",
        description_zh: "掌握分數加減法的計算方法",
        example: "1/2 + 1/3 = 5/6"
      },
      {
        grade: "五年级",
        subject: "数学",
        guangdong_knowledge: "长方体和正方体",
        hongkong_knowledge: "立体图形的认识",
        match_type: "重合",
        description: "认识长方体和正方体的特征和表面积计算",
        description_en: "Understand the characteristics and surface area calculation of cuboids and cubes",
        description_zh: "認識長方體和正方體的特徵和表面積計算",
        example: "正方体表面积 = 6 × 边长²"
      },
      {
        grade: "五年级",
        subject: "数学",
        guangdong_knowledge: "简易方程",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握简易方程的解法",
        description_en: "Master the solution methods of simple equations",
        description_zh: "掌握簡易方程的解法",
        example: "2x + 3 = 7，解得x = 2"
      },
      {
        grade: "五年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "比例的初步认识",
        match_type: "港拓展",
        description: "认识比例的意义和基本性质",
        description_en: "Understand the meaning and basic properties of ratios",
        description_zh: "認識比例的意義和基本性質",
        example: "1:2 = 2:4"
      },

      // 六年级数学
      {
        grade: "六年级",
        subject: "数学",
        guangdong_knowledge: "分数的乘除法",
        hongkong_knowledge: "分数的四则运算",
        match_type: "重合",
        description: "掌握分数乘除法的计算方法",
        description_en: "Master the calculation methods of fraction multiplication and division",
        description_zh: "掌握分數乘除法的計算方法",
        example: "1/2 × 1/3 = 1/6"
      },
      {
        grade: "六年级",
        subject: "数学",
        guangdong_knowledge: "圆的认识",
        hongkong_knowledge: "圆的性质",
        match_type: "重合",
        description: "认识圆的基本特征和周长、面积计算",
        description_en: "Understand the basic characteristics and calculation of circumference and area of circles",
        description_zh: "認識圓的基本特徵和周長、面積計算",
        example: "圆的周长 = 2πr"
      },
      {
        grade: "六年级",
        subject: "数学",
        guangdong_knowledge: "百分数的应用",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握百分数的实际应用",
        description_en: "Master the practical application of percentages",
        description_zh: "掌握百分數的實際應用",
        example: "商品打8折，原价100元，现价80元"
      },
      {
        grade: "六年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "概率的初步认识",
        match_type: "港拓展",
        description: "认识概率的基本概念和简单计算",
        description_en: "Understand the basic concepts and simple calculations of probability",
        description_zh: "認識概率的基本概念和簡單計算",
        example: "抛硬币正面朝上的概率是1/2"
      },

      // 七年级数学
      {
        grade: "七年级",
        subject: "数学",
        guangdong_knowledge: "有理数的运算",
        hongkong_knowledge: "整数和分数的运算",
        match_type: "重合",
        description: "掌握有理数的四则运算",
        description_en: "Master the four operations of rational numbers",
        description_zh: "掌握有理數的四則運算",
        example: "(-3) + 5 = 2"
      },
      {
        grade: "七年级",
        subject: "数学",
        guangdong_knowledge: "一元一次方程",
        hongkong_knowledge: "线性方程",
        match_type: "重合",
        description: "掌握一元一次方程的解法和应用",
        description_en: "Master the solution methods and applications of linear equations with one variable",
        description_zh: "掌握一元一次方程的解法和應用",
        example: "3x + 5 = 14，解得x = 3"
      },

      // 八年级数学
      {
        grade: "八年级",
        subject: "数学",
        guangdong_knowledge: "勾股定理",
        hongkong_knowledge: "毕达哥拉斯定理",
        match_type: "重合",
        description: "掌握勾股定理的应用",
        description_en: "Master the application of Pythagorean theorem",
        description_zh: "掌握勾股定理的應用",
        example: "a² + b² = c²"
      },
      {
        grade: "八年级",
        subject: "数学",
        guangdong_knowledge: "一次函数",
        hongkong_knowledge: "线性函数",
        match_type: "重合",
        description: "掌握一次函数的图像和性质",
        description_en: "Master the graph and properties of linear functions",
        description_zh: "掌握一次函數的圖像和性質",
        example: "y = 2x + 1"
      },

      // 九年级数学
      {
        grade: "九年级",
        subject: "数学",
        guangdong_knowledge: "二次函数",
        hongkong_knowledge: "二次函数",
        match_type: "重合",
        description: "掌握二次函数的图像和性质",
        description_en: "Master the graph and properties of quadratic functions",
        description_zh: "掌握二次函數的圖像和性質",
        example: "y = ax² + bx + c"
      },
      {
        grade: "九年级",
        subject: "数学",
        guangdong_knowledge: "相似三角形",
        hongkong_knowledge: "相似图形",
        match_type: "重合",
        description: "掌握相似三角形的判定和性质",
        description_en: "Master the determination and properties of similar triangles",
        description_zh: "掌握相似三角形的判定和性質",
        example: "对应角相等，对应边成比例"
      },

      // 语文科目
      {
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "词语的理解和运用",
        hongkong_knowledge: "词汇的认识和使用",
        match_type: "重合",
        description: "掌握词语的理解、积累和运用",
        description_en: "Master the understanding, accumulation and application of words",
        description_zh: "掌握詞語的理解、積累和運用",
        example: "美丽：形容事物好看"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "句子的理解和运用",
        hongkong_knowledge: "句子的构造和使用",
        match_type: "重合",
        description: "掌握句子的理解、改写和运用",
        description_en: "Master the understanding, rewriting and application of sentences",
        description_zh: "掌握句子的理解、改寫和運用",
        example: "陈述句改反问句"
      },

      // 英语科目
      {
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "字母和音标",
        hongkong_knowledge: "英语字母和发音",
        match_type: "重合",
        description: "掌握26个英文字母的读写和基本音标",
        description_en: "Master the reading and writing of 26 English letters and basic phonetic symbols",
        description_zh: "掌握26個英文字母的讀寫和基本音標",
        example: "A a /æ/, B b /b/"
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "简单句型",
        hongkong_knowledge: "基础英语句型",
        match_type: "重合",
        description: "掌握简单的英语句型和日常用语",
        description_en: "Master simple English sentence patterns and daily expressions",
        description_zh: "掌握簡單的英語句型和日常用語",
        example: "I am a student."
      }
    ];

    // 根据选择的年级和学科筛选数据
    var filteredData = allKnowledgeData.filter(function (item) {
      return item.grade === selectedGrade && item.subject === selectedSubject;
    });

    this.updateKnowledgeList(filteredData);
  },

  updateKnowledgeList: function (data) {
    var overlapKnowledges = [];
    var guangdongKnowledges = [];
    var hongkongKnowledges = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (item.match_type === '重合') {
        overlapKnowledges.push(item);
      } else if (item.match_type === '粤拓展') {
        guangdongKnowledges.push(item);
      } else if (item.match_type === '港拓展') {
        hongkongKnowledges.push(item);
      }
    }

    this.setData({
      overlapKnowledges: overlapKnowledges,
      guangdongKnowledges: guangdongKnowledges,
      hongkongKnowledges: hongkongKnowledges,
      overlapCount: overlapKnowledges.length,
      guangdongCount: guangdongKnowledges.length,
      hongkongCount: hongkongKnowledges.length
    });
  },

  showKnowledgeDetail: function (e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      showDetail: true,
      currentKnowledge: item
    });
  },

  hideKnowledgeDetail: function () {
    this.setData({
      showDetail: false,
      currentKnowledge: {}
    });
  },

  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  },

  // 切换知识点类型标签
  switchTab: function (e) {
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  // 切换详情弹窗语言标签
  switchDetailTab: function (e) {
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      detailTab: tab
    });
  },

  // 显示对比信息
  showComparison: function (e) {
    var item = e.currentTarget.dataset.item;
    this.setData({
      comparingItem: item
    });
  },

  // 隐藏对比信息
  hideComparison: function (e) {
    this.setData({
      comparingItem: null
    });
  },

  // tabBar 更新回调
  onTabBarUpdate: function () {
    console.log('知识对标页面 tabBar 更新');
  }
});