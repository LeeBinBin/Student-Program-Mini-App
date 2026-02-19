// index.js
Page({
  data: {
    grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级'],
    gradeIndex: -1,
    allSubjects: ['数学', '语文', '英语', '物理', '化学', '生物'],
    subjects: ['数学', '语文', '英语'],
    subjectIndex: -1,
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
      // 一年级数学
      {
        grade: "一年级",
        subject: "数学",
        guangdong_knowledge: "100以内数的认识",
        hongkong_knowledge: "数字的认识",
        match_type: "重合",
        description: "认识100以内的数，掌握数的读写",
        description_en: "Understand numbers within 100 and master reading and writing of numbers",
        description_zh: "認識100以內的數，掌握數的讀寫",
        example: "1, 2, 3, ..., 100"
      },
      {
        grade: "一年级",
        subject: "数学",
        guangdong_knowledge: "20以内加减法",
        hongkong_knowledge: "简单加减法",
        match_type: "重合",
        description: "掌握20以内的加减法运算",
        description_en: "Master addition and subtraction within 20",
        description_zh: "掌握20以內的加減法運算",
        example: "5 + 3 = 8, 10 - 4 = 6"
      },
      {
        grade: "一年级",
        subject: "数学",
        guangdong_knowledge: "认识图形",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "认识长方形、正方形、圆形等基本图形",
        description_en: "Recognize basic shapes like rectangles, squares, circles",
        description_zh: "認識長方形、正方形、圓形等基本圖形",
        example: "长方形有四个角，圆形没有角"
      },
      {
        grade: "一年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "比较大小",
        match_type: "港拓展",
        description: "掌握数字大小的比较",
        description_en: "Master comparison of numbers",
        description_zh: "掌握數字大小的比較",
        example: "5 > 3, 8 < 10"
      },

      // 一年级语文
      {
        grade: "一年级",
        subject: "语文",
        guangdong_knowledge: "汉语拼音",
        hongkong_knowledge: "拼音学习",
        match_type: "重合",
        description: "掌握汉语拼音的声母、韵母和整体认读音节",
        description_en: "Master initials, finals and whole syllables of Pinyin",
        description_zh: "掌握漢語拼音的聲母、韻母和整體認讀音節",
        example: "b, p, m, f, a, o, e"
      },
      {
        grade: "一年级",
        subject: "语文",
        guangdong_knowledge: "识字写字",
        hongkong_knowledge: "汉字学习",
        match_type: "重合",
        description: "认识常用汉字，掌握基本笔画和笔顺",
        description_en: "Recognize common Chinese characters and master basic strokes and stroke order",
        description_zh: "認識常用漢字，掌握基本筆畫和筆順",
        example: "人、口、日、月"
      },
      {
        grade: "一年级",
        subject: "语文",
        guangdong_knowledge: "看图说话",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "能够看图说出简单的句子",
        description_en: "Able to speak simple sentences based on pictures",
        description_zh: "能夠看圖說出簡單的句子",
        example: "这是小明，他在看书"
      },
      {
        grade: "一年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "儿歌童谣",
        match_type: "港拓展",
        description: "背诵简单的儿歌和童谣",
        description_en: "Recite simple nursery rhymes",
        description_zh: "背誦簡單的兒歌和童謠",
        example: "小兔子乖乖，把门儿开开"
      },

      // 一年级英语
      {
        grade: "一年级",
        subject: "英语",
        guangdong_knowledge: "英文字母",
        hongkong_knowledge: "字母认识",
        match_type: "重合",
        description: "认识26个英文字母的大小写",
        description_en: "Recognize uppercase and lowercase of 26 English letters",
        description_zh: "認識26個英文字母的大小寫",
        example: "A a, B b, C c"
      },
      {
        grade: "一年级",
        subject: "英语",
        guangdong_knowledge: "简单单词",
        hongkong_knowledge: "基础词汇",
        match_type: "重合",
        description: "掌握简单的英语单词",
        description_en: "Master simple English words",
        description_zh: "掌握簡單的英語單詞",
        example: "apple, banana, cat, dog"
      },
      {
        grade: "一年级",
        subject: "英语",
        guangdong_knowledge: "数字英语",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握1-10的英语表达",
        description_en: "Master English expressions for numbers 1-10",
        description_zh: "掌握1-10的英語表達",
        example: "One, Two, Three, ..., Ten"
      },
      {
        grade: "一年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "颜色英语",
        match_type: "港拓展",
        description: "掌握基本颜色的英语表达",
        description_en: "Master English expressions for basic colors",
        description_zh: "掌握基本顏色的英語表達",
        example: "Red, Blue, Green, Yellow"
      },

      // 二年级数学
      {
        grade: "二年级",
        subject: "数学",
        guangdong_knowledge: "100以内加减法",
        hongkong_knowledge: "加减法运算",
        match_type: "重合",
        description: "掌握100以内的加减法运算",
        description_en: "Master addition and subtraction within 100",
        description_zh: "掌握100以內的加減法運算",
        example: "35 + 27 = 62, 80 - 45 = 35"
      },
      {
        grade: "二年级",
        subject: "数学",
        guangdong_knowledge: "乘法口诀",
        hongkong_knowledge: "乘法表",
        match_type: "重合",
        description: "掌握乘法口诀和简单的乘法运算",
        description_en: "Master multiplication table and simple multiplication",
        description_zh: "掌握乘法口訣和簡單的乘法運算",
        example: "一一得一，一二得二，..., 九九八十一"
      },
      {
        grade: "二年级",
        subject: "数学",
        guangdong_knowledge: "认识长度单位",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "认识厘米、米等长度单位",
        description_en: "Recognize length units like centimeters and meters",
        description_zh: "認識厘米、米等長度單位",
        example: "1米 = 100厘米"
      },
      {
        grade: "二年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "认识时间",
        match_type: "港拓展",
        description: "认识时钟和时间的表达",
        description_en: "Recognize clocks and time expressions",
        description_zh: "認識時鐘和時間的表達",
        example: "现在是8点30分"
      },

      // 二年级语文
      {
        grade: "二年级",
        subject: "语文",
        guangdong_knowledge: "词语积累",
        hongkong_knowledge: "词汇学习",
        match_type: "重合",
        description: "积累常用词语，理解词语的意思",
        description_en: "Accumulate common words and understand their meanings",
        description_zh: "積累常用詞語，理解詞語的意思",
        example: "高兴、快乐、美丽"
      },
      {
        grade: "二年级",
        subject: "语文",
        guangdong_knowledge: "句子练习",
        hongkong_knowledge: "句型学习",
        match_type: "重合",
        description: "掌握基本的句型和句子结构",
        description_en: "Master basic sentence patterns and structures",
        description_zh: "掌握基本的句型和句子結構",
        example: "谁在哪里做什么"
      },
      {
        grade: "二年级",
        subject: "语文",
        guangdong_knowledge: "看图写话",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "能够看图写出简单的句子和段落",
        description_en: "Able to write simple sentences and paragraphs based on pictures",
        description_zh: "能夠看圖寫出簡單的句子和段落",
        example: "春天来了，花儿开了，小鸟在唱歌"
      },
      {
        grade: "二年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "古诗背诵",
        match_type: "港拓展",
        description: "背诵简单的古诗",
        description_en: "Recite simple ancient poems",
        description_zh: "背誦簡單的古詩",
        example: "《静夜思》《春晓》"
      },

      // 二年级英语
      {
        grade: "二年级",
        subject: "英语",
        guangdong_knowledge: "日常用语",
        hongkong_knowledge: "日常英语",
        match_type: "重合",
        description: "掌握简单的日常英语用语",
        description_en: "Master simple daily English expressions",
        description_zh: "掌握簡單的日常英語用語",
        example: "Good morning, Goodbye, Thank you"
      },
      {
        grade: "二年级",
        subject: "英语",
        guangdong_knowledge: "家庭成员",
        hongkong_knowledge: "家庭词汇",
        match_type: "重合",
        description: "掌握家庭成员的英语表达",
        description_en: "Master English expressions for family members",
        description_zh: "掌握家庭成員的英語表達",
        example: "Father, Mother, Brother, Sister"
      },
      {
        grade: "二年级",
        subject: "英语",
        guangdong_knowledge: "动物英语",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握常见动物的英语表达",
        description_en: "Master English expressions for common animals",
        description_zh: "掌握常見動物的英語表達",
        example: "Cat, Dog, Bird, Fish"
      },
      {
        grade: "二年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "食物英语",
        match_type: "港拓展",
        description: "掌握常见食物的英语表达",
        description_en: "Master English expressions for common foods",
        description_zh: "掌握常見食物的英語表達",
        example: "Apple, Banana, Rice, Bread"
      },

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
      {
        grade: "七年级",
        subject: "数学",
        guangdong_knowledge: "整式的加减",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握整式的加减运算",
        description_en: "Master the addition and subtraction of algebraic expressions",
        description_zh: "掌握整式的加減運算",
        example: "3x + 2x = 5x"
      },
      {
        grade: "七年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "一元一次不等式",
        match_type: "港拓展",
        description: "掌握一元一次不等式的解法",
        description_en: "Master the solution methods of linear inequalities with one variable",
        description_zh: "掌握一元一次不等式的解法",
        example: "2x > 4，解得x > 2"
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
      {
        grade: "八年级",
        subject: "数学",
        guangdong_knowledge: "整式的乘除",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握整式的乘除运算和乘法公式",
        description_en: "Master the multiplication and division of algebraic expressions and multiplication formulas",
        description_zh: "掌握整式的乘除運算和乘法公式",
        example: "(a + b)(a - b) = a² - b²"
      },
      {
        grade: "八年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "因式分解",
        match_type: "港拓展",
        description: "掌握因式分解的基本方法",
        description_en: "Master the basic methods of factorization",
        description_zh: "掌握因式分解的基本方法",
        example: "x² - 4 = (x + 2)(x - 2)"
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
      {
        grade: "九年级",
        subject: "数学",
        guangdong_knowledge: "一元二次方程",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握一元二次方程的解法",
        description_en: "Master the solution methods of quadratic equations with one variable",
        description_zh: "掌握一元二次方程的解法",
        example: "x² - 5x + 6 = 0，解得x₁ = 2，x₂ = 3"
      },
      {
        grade: "九年级",
        subject: "数学",
        guangdong_knowledge: "",
        hongkong_knowledge: "圆的几何性质",
        match_type: "港拓展",
        description: "掌握圆的几何性质和定理",
        description_en: "Master the geometric properties and theorems of circles",
        description_zh: "掌握圓的幾何性質和定理",
        example: "圆周角定理、切线定理"
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
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "拼音的运用",
        hongkong_knowledge: "拼音的学习",
        match_type: "重合",
        description: "掌握拼音的正确读写和运用",
        description_en: "Master the correct reading, writing and application of Pinyin",
        description_zh: "掌握拼音的正確讀寫和運用",
        example: "bā ba（爸爸）"
      },
      {
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "汉字的笔画和结构",
        hongkong_knowledge: "汉字的书写",
        match_type: "重合",
        description: "掌握汉字的基本笔画和间架结构",
        description_en: "Master the basic strokes and structure of Chinese characters",
        description_zh: "掌握漢字的基本筆畫和間架結構",
        example: "木：一横一竖一撇一捺"
      },
      {
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "古诗的背诵和理解",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握古诗的背诵和基本理解",
        description_en: "Master the recitation and basic understanding of ancient poems",
        description_zh: "掌握古詩的背誦和基本理解",
        example: "《静夜思》李白"
      },
      {
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "成语的学习",
        match_type: "港拓展",
        description: "掌握常用成语的理解和运用",
        description_en: "Master the understanding and application of common idioms",
        description_zh: "掌握常用成語的理解和運用",
        example: "画蛇添足：多此一举"
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
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "段落和篇章的理解",
        hongkong_knowledge: "文章的阅读",
        match_type: "重合",
        description: "掌握段落和篇章的理解与分析",
        description_en: "Master the understanding and analysis of paragraphs and articles",
        description_zh: "掌握段落和篇章的理解與分析",
        example: "找出段落中心句"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "标点符号的运用",
        hongkong_knowledge: "标点符号的使用",
        match_type: "重合",
        description: "掌握常用标点符号的正确使用",
        description_en: "Master the correct use of common punctuation marks",
        description_zh: "掌握常用標點符號的正確使用",
        example: "，。？！：；"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "修辞手法的认识",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握常见修辞手法的识别和运用",
        description_en: "Master the identification and application of common rhetorical devices",
        description_zh: "掌握常見修辭手法的識別和運用",
        example: "比喻、拟人、排比"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "文言文的初步认识",
        match_type: "港拓展",
        description: "认识简单的文言文和古诗词",
        description_en: "Understand simple classical Chinese and ancient poems",
        description_zh: "認識簡單的文言文和古詩詞",
        example: "《论语》选读"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "阅读理解能力的培养",
        hongkong_knowledge: "阅读技巧",
        match_type: "重合",
        description: "提高阅读理解能力和分析能力",
        description_en: "Improve reading comprehension and analytical skills",
        description_zh: "提高閱讀理解能力和分析能力",
        example: "理解文章主旨和作者意图"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "作文的写作技巧",
        hongkong_knowledge: "写作方法",
        match_type: "重合",
        description: "掌握作文的基本写作方法和技巧",
        description_en: "Master basic writing methods and techniques for composition",
        description_zh: "掌握作文的基本寫作方法和技巧",
        example: "记叙文、说明文的写作"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "文言文阅读",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握简单的文言文阅读和理解",
        description_en: "Master the reading and understanding of simple classical Chinese",
        description_zh: "掌握簡單的文言文閱讀和理解",
        example: "《世说新语》选读"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "诗歌的鉴赏",
        match_type: "港拓展",
        description: "掌握诗歌的鉴赏和分析方法",
        description_en: "Master the appreciation and analysis methods of poetry",
        description_zh: "掌握詩歌的鑒賞和分析方法",
        example: "唐诗宋词的鉴赏"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "综合性学习",
        hongkong_knowledge: "综合能力",
        match_type: "重合",
        description: "培养综合运用语文知识的能力",
        description_en: "Cultivate the ability to comprehensively use Chinese knowledge",
        description_zh: "培養綜合運用語文知識的能力",
        example: "开展语文综合实践活动"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "名著阅读",
        hongkong_knowledge: "经典文学",
        match_type: "重合",
        description: "阅读和理解中外名著",
        description_en: "Read and understand Chinese and foreign classics",
        description_zh: "閱讀和理解中外名著",
        example: "《西游记》《三国演义》"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "议论文写作",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握议论文的基本写作方法",
        description_en: "Master the basic writing methods of argumentative essays",
        description_zh: "掌握議論文的基本寫作方法",
        example: "提出论点、论据、论证"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "散文的写作",
        match_type: "港拓展",
        description: "掌握散文的写作技巧和特点",
        description_en: "Master the writing techniques and characteristics of prose",
        description_zh: "掌握散文的寫作技巧和特點",
        example: "抒情散文、叙事散文"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "现代文阅读",
        hongkong_knowledge: "现代文学阅读",
        match_type: "重合",
        description: "提高现代文阅读理解和分析能力",
        description_en: "Improve reading comprehension and analytical skills of modern Chinese",
        description_zh: "提高現代文閱讀理解和分析能力",
        example: "分析文章结构和主旨"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "文言文基础",
        hongkong_knowledge: "文言入门",
        match_type: "重合",
        description: "掌握文言文的基本语法和词汇",
        description_en: "Master basic grammar and vocabulary of classical Chinese",
        description_zh: "掌握文言文的基本語法和詞彙",
        example: "实词、虚词的用法"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "作文进阶",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "提高作文写作的深度和广度",
        description_en: "Improve the depth and breadth of composition writing",
        description_zh: "提高作文寫作的深度和廣度",
        example: "议论文、说明文的深入写作"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "文学鉴赏",
        match_type: "港拓展",
        description: "培养文学作品的鉴赏能力",
        description_en: "Cultivate the appreciation ability of literary works",
        description_zh: "培養文學作品的鑒賞能力",
        example: "小说、散文的鉴赏"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "古诗文阅读",
        hongkong_knowledge: "古典文学",
        match_type: "重合",
        description: "深入理解古诗文的内容和意境",
        description_en: "Deeply understand the content and artistic conception of ancient poems",
        description_zh: "深入理解古詩文的內容和意境",
        example: "唐诗宋词的深入分析"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "说明文写作",
        hongkong_knowledge: "说明文",
        match_type: "重合",
        description: "掌握说明文的写作方法和技巧",
        description_en: "Master the writing methods and techniques of expository texts",
        description_zh: "掌握說明文的寫作方法和技巧",
        example: "事物说明、事理说明"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "议论文深入",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "深入掌握议论文的写作技巧",
        description_en: "Deeply master the writing techniques of argumentative essays",
        description_zh: "深入掌握議論文的寫作技巧",
        example: "论证方法、逻辑结构"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "戏剧文学",
        match_type: "港拓展",
        description: "了解戏剧文学的基本特点",
        description_en: "Understand the basic characteristics of dramatic literature",
        description_zh: "了解戲劇文學的基本特點",
        example: "话剧、戏曲的特点"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "文学常识",
        hongkong_knowledge: "文学知识",
        match_type: "重合",
        description: "掌握中外文学的基本常识",
        description_en: "Master basic knowledge of Chinese and foreign literature",
        description_zh: "掌握中外文學的基本常識",
        example: "作家、作品、文学流派"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "作文综合",
        hongkong_knowledge: "写作综合",
        match_type: "重合",
        description: "综合运用各种文体进行写作",
        description_en: "Comprehensively use various genres for writing",
        description_zh: "綜合運用各種文體進行寫作",
        example: "记叙、议论、说明、抒情"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "文言文进阶",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "深入掌握文言文的阅读和理解",
        description_en: "Deeply master the reading and understanding of classical Chinese",
        description_zh: "深入掌握文言文的閱讀和理解",
        example: "《史记》《汉书》选读"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "现代文学评论",
        match_type: "港拓展",
        description: "掌握现代文学评论的写作方法",
        description_en: "Master the writing methods of modern literary criticism",
        description_zh: "掌握現代文學評論的寫作方法",
        example: "作品评析、作家评论"
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
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "日常问候语",
        hongkong_knowledge: "基本问候",
        match_type: "重合",
        description: "掌握基本的英语问候和自我介绍",
        description_en: "Master basic English greetings and self-introduction",
        description_zh: "掌握基本的英語問候和自我介紹",
        example: "Hello, I'm Tom."
      },
      {
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "数字和颜色",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握数字1-10和基本颜色的英语表达",
        description_en: "Master English expressions for numbers 1-10 and basic colors",
        description_zh: "掌握數字1-10和基本顏色的英語表達",
        example: "One, Two, Red, Blue"
      },
      {
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "家庭成员",
        match_type: "港拓展",
        description: "掌握家庭成员的英语称呼",
        description_en: "Master English terms for family members",
        description_zh: "掌握家庭成員的英語稱呼",
        example: "Father, Mother, Brother, Sister"
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
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "动词时态",
        hongkong_knowledge: "时态",
        match_type: "重合",
        description: "掌握一般现在时和一般过去时",
        description_en: "Master simple present tense and simple past tense",
        description_zh: "掌握一般現在時和一般過去時",
        example: "I go to school. I went to school."
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "名词单复数",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握名词的单数和复数形式",
        description_en: "Master singular and plural forms of nouns",
        description_zh: "掌握名詞的單數和複數形式",
        example: "Book, Books, Child, Children"
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "形容词的比较级",
        match_type: "港拓展",
        description: "掌握形容词的比较级和最高级",
        description_en: "Master comparative and superlative degrees of adjectives",
        description_zh: "掌握形容詞的比較級和最高級",
        example: "Big, Bigger, Biggest"
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "现在进行时",
        hongkong_knowledge: "进行时",
        match_type: "重合",
        description: "掌握现在进行时的用法",
        description_en: "Master the usage of present continuous tense",
        description_zh: "掌握現在進行時的用法",
        example: "I am reading a book."
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "一般将来时",
        hongkong_knowledge: "将来时",
        match_type: "重合",
        description: "掌握一般将来时的用法",
        description_en: "Master the usage of simple future tense",
        description_zh: "掌握一般將來時的用法",
        example: "I will go to the park tomorrow."
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "情态动词",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握can, must, should等情态动词的用法",
        description_en: "Master the usage of modal verbs like can, must, should",
        description_zh: "掌握can, must, should等情態動詞的用法",
        example: "I can swim. You must study hard."
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "介词的用法",
        match_type: "港拓展",
        description: "掌握常用介词的用法",
        description_en: "Master the usage of common prepositions",
        description_zh: "掌握常用介詞的用法",
        example: "in, on, at, under, behind"
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "现在完成时",
        hongkong_knowledge: "完成时",
        match_type: "重合",
        description: "掌握现在完成时的用法",
        description_en: "Master the usage of present perfect tense",
        description_zh: "掌握現在完成時的用法",
        example: "I have finished my homework."
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "被动语态",
        hongkong_knowledge: "被动语",
        match_type: "重合",
        description: "掌握被动语态的基本用法",
        description_en: "Master the basic usage of passive voice",
        description_zh: "掌握被動語態的基本用法",
        example: "The book was written by him."
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "定语从句",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握定语从句的基本用法",
        description_en: "Master the basic usage of attributive clauses",
        description_zh: "掌握定語從句的基本用法",
        example: "The book that I bought is good."
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "状语从句",
        match_type: "港拓展",
        description: "掌握状语从句的基本用法",
        description_en: "Master the basic usage of adverbial clauses",
        description_zh: "掌握狀語從句的基本用法",
        example: "When I came home, he was sleeping."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "过去完成时",
        hongkong_knowledge: "过去完成时",
        match_type: "重合",
        description: "掌握过去完成时的用法",
        description_en: "Master the usage of past perfect tense",
        description_zh: "掌握過去完成時的用法",
        example: "I had finished my homework before he came."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "直接引语和间接引语",
        hongkong_knowledge: "直接引语和间接引语",
        match_type: "重合",
        description: "掌握直接引语和间接引语的转换",
        description_en: "Master the conversion between direct and indirect speech",
        description_zh: "掌握直接引語和間接引語的轉換",
        example: "He said, 'I am happy.' → He said that he was happy."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "非谓语动词",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握不定式和动名词的用法",
        description_en: "Master the usage of infinitives and gerunds",
        description_zh: "掌握不定式和動名詞的用法",
        example: "To learn English is important. I like swimming."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "虚拟语气",
        match_type: "港拓展",
        description: "掌握虚拟语气的基本用法",
        description_en: "Master the basic usage of subjunctive mood",
        description_zh: "掌握虛擬語氣的基本用法",
        example: "If I were you, I would do it."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "名词性从句",
        hongkong_knowledge: "名词从句",
        match_type: "重合",
        description: "掌握主语从句、宾语从句和表语从句",
        description_en: "Master subject clauses, object clauses and predicative clauses",
        description_zh: "掌握主語從句、賓語從句和表語從句",
        example: "What he said is true. I know that he is coming."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "倒装句",
        hongkong_knowledge: "倒装",
        match_type: "重合",
        description: "掌握倒装句的基本用法",
        description_en: "Master the basic usage of inversion",
        description_zh: "掌握倒裝句的基本用法",
        example: "Never have I seen such a thing."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "强调句",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握强调句的用法",
        description_en: "Master the usage of emphatic sentences",
        description_zh: "掌握強調句的用法",
        example: "It was Tom who broke the window."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "省略句",
        match_type: "港拓展",
        description: "掌握省略句的用法",
        description_en: "Master the usage of elliptical sentences",
        description_zh: "掌握省略句的用法",
        example: "If possible, I will go."
      },
      {
        grade: "九年级",
        subject: "英语",
        guangdong_knowledge: "主谓一致",
        hongkong_knowledge: "主谓一致",
        match_type: "重合",
        description: "掌握主谓一致的原则",
        description_en: "Master the principles of subject-verb agreement",
        description_zh: "掌握主謂一致的原則",
        example: "He goes to school. They go to school."
      },
      {
        grade: "九年级",
        subject: "英语",
        guangdong_knowledge: "独立主格",
        hongkong_knowledge: "独立结构",
        match_type: "重合",
        description: "掌握独立主格结构的用法",
        description_en: "Master the usage of nominative absolute construction",
        description_zh: "掌握獨立主格結構的用法",
        example: "Weather permitting, we will go out."
      },
      {
        grade: "九年级",
        subject: "英语",
        guangdong_knowledge: "构词法",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握派生词、合成词和转化词",
        description_en: "Master derived words, compound words and converted words",
        description_zh: "掌握派生詞、合成詞和轉化詞",
        example: "unhappy, classroom, water (n./v.)"
      },
      {
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "语篇连贯",
        match_type: "港拓展",
        description: "掌握语篇的连贯和衔接",
        description_en: "Master the coherence and cohesion of discourse",
        description_zh: "掌握語篇的連貫和銜接",
        example: "使用连接词使文章连贯"
      },
      {
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "看图写话",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握看图写话的基本方法",
        description_en: "Master the basic methods of writing based on pictures",
        description_zh: "掌握看圖寫話的基本方法",
        example: "观察图片，描述画面内容"
      },
      {
        grade: "三年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "阅读理解",
        match_type: "港拓展",
        description: "提高阅读理解能力",
        description_en: "Improve reading comprehension ability",
        description_zh: "提高閱讀理解能力",
        example: "理解文章主旨和细节"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "段落和篇章的理解",
        hongkong_knowledge: "文章的阅读",
        match_type: "重合",
        description: "掌握段落和篇章的理解与分析",
        description_en: "Master the understanding and analysis of paragraphs and articles",
        description_zh: "掌握段落和篇章的理解與分析",
        example: "找出段落中心句"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "标点符号的运用",
        hongkong_knowledge: "标点符号的使用",
        match_type: "重合",
        description: "掌握常用标点符号的正确使用",
        description_en: "Master the correct use of common punctuation marks",
        description_zh: "掌握常用標點符號的正確使用",
        example: "，。？！：；"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "修辞手法的认识",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握常见修辞手法的识别和运用",
        description_en: "Master the identification and application of common rhetorical devices",
        description_zh: "掌握常見修辭手法的識別和運用",
        example: "比喻、拟人、排比"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "文言文的初步认识",
        match_type: "港拓展",
        description: "认识简单的文言文和古诗词",
        description_en: "Understand simple classical Chinese and ancient poems",
        description_zh: "認識簡單的文言文和古詩詞",
        example: "《论语》选读"
      },
      {
        grade: "四年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "阅读技巧",
        match_type: "港拓展",
        description: "掌握阅读的基本技巧",
        description_en: "Master the basic reading skills",
        description_zh: "掌握閱讀的基本技巧",
        example: "快速阅读、精读、略读"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "阅读理解能力的培养",
        hongkong_knowledge: "阅读技巧",
        match_type: "重合",
        description: "提高阅读理解能力和分析能力",
        description_en: "Improve reading comprehension and analytical skills",
        description_zh: "提高閱讀理解能力和分析能力",
        example: "理解文章主旨和作者意图"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "作文的写作技巧",
        hongkong_knowledge: "写作方法",
        match_type: "重合",
        description: "掌握作文的基本写作方法和技巧",
        description_en: "Master the basic writing methods and techniques for composition",
        description_zh: "掌握作文的基本寫作方法和技巧",
        example: "记叙文、说明文的写作"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "文言文阅读",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握简单的文言文阅读和理解",
        description_en: "Master the reading and understanding of simple classical Chinese",
        description_zh: "掌握簡單的文言文閱讀和理解",
        example: "《世说新语》选读"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "诗歌的鉴赏",
        match_type: "港拓展",
        description: "掌握诗歌的鉴赏和分析方法",
        description_en: "Master the appreciation and analysis methods of poetry",
        description_zh: "掌握詩歌的鑒賞和分析方法",
        example: "唐诗宋词的鉴赏"
      },
      {
        grade: "五年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "写作技巧",
        match_type: "港拓展",
        description: "掌握各种文体的写作技巧",
        description_en: "Master the writing techniques of various genres",
        description_zh: "掌握各種文體的寫作技巧",
        example: "描写、记叙、议论"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "综合性学习",
        hongkong_knowledge: "综合能力",
        match_type: "重合",
        description: "培养综合运用语文知识的能力",
        description_en: "Cultivate the ability to comprehensively use Chinese knowledge",
        description_zh: "培養綜合運用語文知識的能力",
        example: "开展语文综合实践活动"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "名著阅读",
        hongkong_knowledge: "经典文学",
        match_type: "重合",
        description: "阅读和理解中外名著",
        description_en: "Read and understand Chinese and foreign classics",
        description_zh: "閱讀和理解中外名著",
        example: "《西游记》《三国演义》"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "议论文写作",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握议论文的基本写作方法",
        description_en: "Master the basic writing methods of argumentative essays",
        description_zh: "掌握議論文的基本寫作方法",
        example: "提出论点、论据、论证"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "散文的写作",
        match_type: "港拓展",
        description: "掌握散文的写作技巧和特点",
        description_en: "Master the writing techniques and characteristics of prose",
        description_zh: "掌握散文的寫作技巧和特點",
        example: "抒情散文、叙事散文"
      },
      {
        grade: "六年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "文学欣赏",
        match_type: "港拓展",
        description: "培养文学作品的欣赏能力",
        description_en: "Cultivate the appreciation ability of literary works",
        description_zh: "培養文學作品的欣賞能力",
        example: "小说、散文的欣赏"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "现代文阅读",
        hongkong_knowledge: "现代文学阅读",
        match_type: "重合",
        description: "提高现代文阅读理解和分析能力",
        description_en: "Improve the reading comprehension and analytical skills of modern Chinese",
        description_zh: "提高現代文閱讀理解和分析能力",
        example: "分析文章结构和主旨"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "文言文基础",
        hongkong_knowledge: "文言入门",
        match_type: "重合",
        description: "掌握文言文的基本语法和词汇",
        description_en: "Master the basic grammar and vocabulary of classical Chinese",
        description_zh: "掌握文言文的基本語法和詞彙",
        example: "实词、虚词的用法"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "作文进阶",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "提高作文写作的深度和广度",
        description_en: "Improve the depth and breadth of composition writing",
        description_zh: "提高作文寫作的深度和廣度",
        example: "议论文、说明文的深入写作"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "文学鉴赏",
        match_type: "港拓展",
        description: "培养文学作品的鉴赏能力",
        description_en: "Cultivate the appreciation ability of literary works",
        description_zh: "培養文學作品的鑒賞能力",
        example: "小说、散文的鉴赏"
      },
      {
        grade: "七年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "写作实践",
        match_type: "港拓展",
        description: "进行各种文体的写作实践",
        description_en: "Practice writing in various genres",
        description_zh: "進行各種文體的寫作實踐",
        example: "小说、散文、诗歌的写作"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "古诗文阅读",
        hongkong_knowledge: "古典文学",
        match_type: "重合",
        description: "深入理解古诗文的内容和意境",
        description_en: "Deeply understand the content and artistic conception of ancient poems",
        description_zh: "深入理解古詩文的內容和意境",
        example: "唐诗宋词的深入分析"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "说明文写作",
        hongkong_knowledge: "说明文",
        match_type: "重合",
        description: "掌握说明文的写作方法和技巧",
        description_en: "Master the writing methods and techniques of expository texts",
        description_zh: "掌握說明文的寫作方法和技巧",
        example: "事物说明、事理说明"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "议论文深入",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "深入掌握议论文的写作技巧",
        description_en: "Deeply master the writing techniques of argumentative essays",
        description_zh: "深入掌握議論文的寫作技巧",
        example: "论证方法、逻辑结构"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "戏剧文学",
        match_type: "港拓展",
        description: "了解戏剧文学的基本特点",
        description_en: "Understand the basic characteristics of dramatic literature",
        description_zh: "了解戲劇文學的基本特點",
        example: "话剧、戏曲的特点"
      },
      {
        grade: "八年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "文学评论",
        match_type: "港拓展",
        description: "掌握文学评论的写作方法",
        description_en: "Master the writing methods of literary criticism",
        description_zh: "掌握文學評論的寫作方法",
        example: "作品评析、作家评论"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "文学常识",
        hongkong_knowledge: "文学知识",
        match_type: "重合",
        description: "掌握中外文学的基本常识",
        description_en: "Master the basic knowledge of Chinese and foreign literature",
        description_zh: "掌握中外文學的基本常識",
        example: "作家、作品、文学流派"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "作文综合",
        hongkong_knowledge: "写作综合",
        match_type: "重合",
        description: "综合运用各种文体进行写作",
        description_en: "Comprehensively use various genres for writing",
        description_zh: "綜合運用各種文體進行寫作",
        example: "记叙、议论、说明、抒情"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "文言文进阶",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "深入掌握文言文的阅读和理解",
        description_en: "Deeply master the reading and understanding of classical Chinese",
        description_zh: "深入掌握文言文的閱讀和理解",
        example: "《史记》《汉书》选读"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "现代文学评论",
        match_type: "港拓展",
        description: "掌握现代文学评论的写作方法",
        description_en: "Master the writing methods of modern literary criticism",
        description_zh: "掌握現代文學評論的寫作方法",
        example: "作品评析、作家评论"
      },
      {
        grade: "九年级",
        subject: "语文",
        guangdong_knowledge: "",
        hongkong_knowledge: "文学研究",
        match_type: "港拓展",
        description: "培养文学研究的能力",
        description_en: "Cultivate the ability to research literature",
        description_zh: "培養文學研究的能力",
        example: "作家研究、作品分析"
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
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "日常问候语",
        hongkong_knowledge: "基本问候",
        match_type: "重合",
        description: "掌握基本的英语问候和自我介绍",
        description_en: "Master basic English greetings and self-introduction",
        description_zh: "掌握基本的英語問候和自我介紹",
        example: "Hello, I'm Tom."
      },
      {
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "数字和颜色",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握数字1-10和基本颜色的英语表达",
        description_en: "Master English expressions for numbers 1-10 and basic colors",
        description_zh: "掌握數字1-10和基本顏色的英語表達",
        example: "One, Two, Red, Blue"
      },
      {
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "家庭成员",
        match_type: "港拓展",
        description: "掌握家庭成员的英语称呼",
        description_en: "Master English terms for family members",
        description_zh: "掌握家庭成員的英語稱呼",
        example: "Father, Mother, Brother, Sister"
      },
      {
        grade: "三年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "日常用语",
        match_type: "港拓展",
        description: "掌握日常英语用语",
        description_en: "Master daily English expressions",
        description_zh: "掌握日常英語用語",
        example: "Good morning, Good night"
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
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "动词时态",
        hongkong_knowledge: "时态",
        match_type: "重合",
        description: "掌握一般现在时和一般过去时",
        description_en: "Master simple present tense and simple past tense",
        description_zh: "掌握一般現在時和一般過去時",
        example: "I go to school. I went to school."
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "名词单复数",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握名词的单数和复数形式",
        description_en: "Master the singular and plural forms of nouns",
        description_zh: "掌握名詞的單數和複數形式",
        example: "Book, Books, Child, Children"
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "形容词的比较级",
        match_type: "港拓展",
        description: "掌握形容词的比较级和最高级",
        description_en: "Master the comparative and superlative degrees of adjectives",
        description_zh: "掌握形容詞的比較級和最高級",
        example: "Big, Bigger, Biggest"
      },
      {
        grade: "四年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "介词的用法",
        match_type: "港拓展",
        description: "掌握常用介词的用法",
        description_en: "Master the usage of common prepositions",
        description_zh: "掌握常用介詞的用法",
        example: "in, on, at, under"
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "现在进行时",
        hongkong_knowledge: "进行时",
        match_type: "重合",
        description: "掌握现在进行时的用法",
        description_en: "Master the usage of present continuous tense",
        description_zh: "掌握現在進行時的用法",
        example: "I am reading a book."
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "一般将来时",
        hongkong_knowledge: "将来时",
        match_type: "重合",
        description: "掌握一般将来时的用法",
        description_en: "Master the usage of simple future tense",
        description_zh: "掌握一般將來時的用法",
        example: "I will go to the park tomorrow."
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "情态动词",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握can, must, should等情态动词的用法",
        description_en: "Master the usage of modal verbs like can, must, should",
        description_zh: "掌握can, must, should等情態動詞的用法",
        example: "I can swim. You must study hard."
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "介词的用法",
        match_type: "港拓展",
        description: "掌握常用介词的用法",
        description_en: "Master the usage of common prepositions",
        description_zh: "掌握常用介詞的用法",
        example: "in, on, at, under, behind"
      },
      {
        grade: "五年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "连词的用法",
        match_type: "港拓展",
        description: "掌握常用连词的用法",
        description_en: "Master the usage of common conjunctions",
        description_zh: "掌握常用連詞的用法",
        example: "and, but, or, so"
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "现在完成时",
        hongkong_knowledge: "完成时",
        match_type: "重合",
        description: "掌握现在完成时的用法",
        description_en: "Master the usage of present perfect tense",
        description_zh: "掌握現在完成時的用法",
        example: "I have finished my homework."
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "被动语态",
        hongkong_knowledge: "被动语",
        match_type: "重合",
        description: "掌握被动语态的基本用法",
        description_en: "Master the basic usage of passive voice",
        description_zh: "掌握被動語態的基本用法",
        example: "The book was written by him."
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "定语从句",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握定语从句的基本用法",
        description_en: "Master the basic usage of attributive clauses",
        description_zh: "掌握定語從句的基本用法",
        example: "The book that I bought is good."
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "状语从句",
        match_type: "港拓展",
        description: "掌握状语从句的基本用法",
        description_en: "Master the basic usage of adverbial clauses",
        description_zh: "掌握狀語從句的基本用法",
        example: "When I came home, he was sleeping."
      },
      {
        grade: "六年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "直接引语和间接引语",
        match_type: "港拓展",
        description: "掌握直接引语和间接引语的转换",
        description_en: "Master the conversion between direct and indirect speech",
        description_zh: "掌握直接引語和間接引語的轉換",
        example: "He said, 'I am happy.' → He said that he was happy."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "过去完成时",
        hongkong_knowledge: "过去完成时",
        match_type: "重合",
        description: "掌握过去完成时的用法",
        description_en: "Master the usage of past perfect tense",
        description_zh: "掌握過去完成時的用法",
        example: "I had finished my homework before he came."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "直接引语和间接引语",
        hongkong_knowledge: "直接引语和间接引语",
        match_type: "重合",
        description: "掌握直接引语和间接引语的转换",
        description_en: "Master the conversion between direct and indirect speech",
        description_zh: "掌握直接引語和間接引語的轉換",
        example: "He said, 'I am happy.' → He said that he was happy."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "非谓语动词",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握不定式和动名词的用法",
        description_en: "Master the usage of infinitives and gerunds",
        description_zh: "掌握不定式和動名詞的用法",
        example: "To learn English is important. I like swimming."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "虚拟语气",
        match_type: "港拓展",
        description: "掌握虚拟语气的基本用法",
        description_en: "Master the basic usage of subjunctive mood",
        description_zh: "掌握虛擬語氣的基本用法",
        example: "If I were you, I would do it."
      },
      {
        grade: "七年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "名词性从句",
        match_type: "港拓展",
        description: "掌握主语从句、宾语从句和表语从句",
        description_en: "Master subject clauses, object clauses and predicative clauses",
        description_zh: "掌握主語從句、賓語從句和表語從句",
        example: "What he said is true. I know that he is coming."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "名词性从句",
        hongkong_knowledge: "名词从句",
        match_type: "重合",
        description: "掌握主语从句、宾语从句和表语从句",
        description_en: "Master subject clauses, object clauses and predicative clauses",
        description_zh: "掌握主語從句、賓語從句和表語從句",
        example: "What he said is true. I know that he is coming."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "倒装句",
        hongkong_knowledge: "倒装",
        match_type: "重合",
        description: "掌握倒装句的基本用法",
        description_en: "Master the basic usage of inversion",
        description_zh: "掌握倒裝句的基本用法",
        example: "Never have I seen such a thing."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "强调句",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握强调句的用法",
        description_en: "Master the usage of emphatic sentences",
        description_zh: "掌握強調句的用法",
        example: "It was Tom who broke the window."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "省略句",
        match_type: "港拓展",
        description: "掌握省略句的用法",
        description_en: "Master the usage of elliptical sentences",
        description_zh: "掌握省略句的用法",
        example: "If possible, I will go."
      },
      {
        grade: "八年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "虚拟语气进阶",
        match_type: "港拓展",
        description: "掌握虚拟语气的进阶用法",
        description_en: "Master the advanced usage of subjunctive mood",
        description_zh: "掌握虛擬語氣的進階用法",
        example: "If I had known, I would have told you."
      },
      {
        grade: "九年级",
        subject: "英语",
        guangdong_knowledge: "主谓一致",
        hongkong_knowledge: "主谓一致",
        match_type: "重合",
        description: "掌握主谓一致的原则",
        description_en: "Master the principles of subject-verb agreement",
        description_zh: "掌握主謂一致的原則",
        example: "He goes to school. They go to school."
      },
      {
        grade: "九年级",
        subject: "英语",
        guangdong_knowledge: "独立主格",
        hongkong_knowledge: "独立结构",
        match_type: "重合",
        description: "掌握独立主格结构的用法",
        description_en: "Master the usage of nominative absolute construction",
        description_zh: "掌握獨立主格結構的用法",
        example: "Weather permitting, we will go out."
      },
      {
        grade: "九年级",
        subject: "英语",
        guangdong_knowledge: "构词法",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握派生词、合成词和转化词",
        description_en: "Master derived words, compound words and converted words",
        description_zh: "掌握派生詞、合成詞和轉化詞",
        example: "unhappy, classroom, water (n./v.)"
      },
      {
        grade: "九年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "语篇连贯",
        match_type: "港拓展",
        description: "掌握语篇的连贯和衔接",
        description_en: "Master the coherence and cohesion of discourse",
        description_zh: "掌握語篇的連貫和銜接",
        example: "使用连接词使文章连贯"
      },
      {
        grade: "九年级",
        subject: "英语",
        guangdong_knowledge: "",
        hongkong_knowledge: "英语写作",
        match_type: "港拓展",
        description: "掌握英语写作的技巧",
        description_en: "Master the skills of English writing",
        description_zh: "掌握英語寫作的技巧",
        example: "议论文、说明文的写作"
      },

      // 物理科目
      {
        grade: "七年级",
        subject: "物理",
        guangdong_knowledge: "声和光",
        hongkong_knowledge: "声学",
        match_type: "重合",
        description: "了解声音的产生和传播，光的直线传播",
        description_en: "Understand the production and propagation of sound, linear propagation of light",
        description_zh: "了解聲音的產生和傳播，光的直線傳播",
        example: "声音在空气中传播速度约为340m/s"
      },
      {
        grade: "七年级",
        subject: "物理",
        guangdong_knowledge: "质量和密度",
        hongkong_knowledge: "质量和密度",
        match_type: "重合",
        description: "掌握质量和密度的概念及计算",
        description_en: "Master the concepts and calculations of mass and density",
        description_zh: "掌握質量和密度的概念及計算",
        example: "密度 = 质量/体积"
      },
      {
        grade: "七年级",
        subject: "物理",
        guangdong_knowledge: "力和运动",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "理解力的概念和牛顿第一定律",
        description_en: "Understand the concept of force and Newton's first law",
        description_zh: "理解力的概念和牛頓第一定律",
        example: "力可以改变物体的运动状态"
      },
      {
        grade: "七年级",
        subject: "物理",
        guangdong_knowledge: "",
        hongkong_knowledge: "压强",
        match_type: "港拓展",
        description: "理解压强的概念和应用",
        description_en: "Understand the concept and application of pressure",
        description_zh: "理解壓強的概念和應用",
        example: "压强 = 压力/受力面积"
      },
      {
        grade: "八年级",
        subject: "物理",
        guangdong_knowledge: "浮力",
        hongkong_knowledge: "浮力",
        match_type: "重合",
        description: "理解浮力的原理和阿基米德原理",
        description_en: "Understand the principle of buoyancy and Archimedes' principle",
        description_zh: "理解浮力的原理和阿基米德原理",
        example: "浮力 = 排开液体的重力"
      },
      {
        grade: "八年级",
        subject: "物理",
        guangdong_knowledge: "功和功率",
        hongkong_knowledge: "功和功率",
        match_type: "重合",
        description: "掌握功和功率的计算",
        description_en: "Master the calculations of work and power",
        description_zh: "掌握功和功率的計算",
        example: "功 = 力×距离，功率 = 功/时间"
      },
      {
        grade: "八年级",
        subject: "物理",
        guangdong_knowledge: "简单机械",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "了解杠杆、滑轮等简单机械",
        description_en: "Understand simple machines like levers and pulleys",
        description_zh: "了解槓桿、滑輪等簡單機械",
        example: "杠杆可以省力"
      },
      {
        grade: "八年级",
        subject: "物理",
        guangdong_knowledge: "",
        hongkong_knowledge: "能量和能量守恒",
        match_type: "港拓展",
        description: "理解能量和能量守恒定律",
        description_en: "Understand energy and the law of conservation of energy",
        description_zh: "理解能量和能量守恆定律",
        example: "能量既不会凭空产生，也不会凭空消失"
      },
      {
        grade: "九年级",
        subject: "物理",
        guangdong_knowledge: "电学基础",
        hongkong_knowledge: "电学",
        match_type: "重合",
        description: "掌握电流、电压、电阻的概念",
        description_en: "Master the concepts of current, voltage and resistance",
        description_zh: "掌握電流、電壓、電阻的概念",
        example: "欧姆定律：I = U/R"
      },
      {
        grade: "九年级",
        subject: "物理",
        guangdong_knowledge: "电功率和电功",
        hongkong_knowledge: "电功率",
        match_type: "重合",
        description: "掌握电功率和电功的计算",
        description_en: "Master the calculations of electric power and electric work",
        description_zh: "掌握電功率和電功的計算",
        example: "P = UI, W = Pt"
      },
      {
        grade: "九年级",
        subject: "物理",
        guangdong_knowledge: "电磁感应",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "了解电磁感应现象",
        description_en: "Understand electromagnetic induction phenomena",
        description_zh: "了解電磁感應現象",
        example: "闭合电路中磁通量变化产生感应电流"
      },
      {
        grade: "九年级",
        subject: "物理",
        guangdong_knowledge: "",
        hongkong_knowledge: "热学",
        match_type: "港拓展",
        description: "理解热传递和热力学基础",
        description_en: "Understand heat transfer and basic thermodynamics",
        description_zh: "理解熱傳遞和熱力學基礎",
        example: "热量从高温物体传向低温物体"
      },

      // 化学科目
      {
        grade: "七年级",
        subject: "化学",
        guangdong_knowledge: "物质的组成和分类",
        hongkong_knowledge: "物质的组成",
        match_type: "重合",
        description: "了解物质的组成和基本分类",
        description_en: "Understand the composition and basic classification of matter",
        description_zh: "了解物質的組成和基本分類",
        example: "纯净物和混合物"
      },
      {
        grade: "七年级",
        subject: "化学",
        guangdong_knowledge: "化学实验基本操作",
        hongkong_knowledge: "化学实验",
        match_type: "重合",
        description: "掌握化学实验的基本操作技能",
        description_en: "Master the basic operation skills of chemical experiments",
        description_zh: "掌握化學實驗的基本操作技能",
        example: "加热、过滤、蒸发等基本操作"
      },
      {
        grade: "七年级",
        subject: "化学",
        guangdong_knowledge: "氧气的性质",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握氧气的物理性质和化学性质",
        description_en: "Master the physical and chemical properties of oxygen",
        description_zh: "掌握氧氣的物理性質和化學性質",
        example: "氧气能支持燃烧，不易溶于水"
      },
      {
        grade: "七年级",
        subject: "化学",
        guangdong_knowledge: "",
        hongkong_knowledge: "化学方程式",
        match_type: "港拓展",
        description: "掌握化学方程式的书写和配平",
        description_en: "Master the writing and balancing of chemical equations",
        description_zh: "掌握化學方程式的書寫和配平",
        example: "2H2 + O2 = 2H2O"
      },
      {
        grade: "八年级",
        subject: "化学",
        guangdong_knowledge: "酸碱盐",
        hongkong_knowledge: "酸碱盐",
        match_type: "重合",
        description: "了解酸、碱、盐的基本性质",
        description_en: "Understand the basic properties of acids, bases and salts",
        description_zh: "了解酸、鹼、鹽的基本性質",
        example: "酸能使石蕊变红，碱能使石蕊变蓝"
      },
      {
        grade: "八年级",
        subject: "化学",
        guangdong_knowledge: "金属和金属材料",
        hongkong_knowledge: "金属",
        match_type: "重合",
        description: "了解常见金属的性质和用途",
        description_en: "Understand the properties and uses of common metals",
        description_zh: "了解常見金屬的性質和用途",
        example: "铁、铜、铝的性质和用途"
      },
      {
        grade: "八年级",
        subject: "化学",
        guangdong_knowledge: "溶液和溶解度",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "理解溶液的概念和溶解度",
        description_en: "Understand the concept of solution and solubility",
        description_zh: "理解溶液的概念和溶解度",
        example: "物质的溶解度随温度变化"
      },
      {
        grade: "八年级",
        subject: "化学",
        guangdong_knowledge: "",
        hongkong_knowledge: "化学反应类型",
        match_type: "港拓展",
        description: "了解化学反应的基本类型",
        description_en: "Understand the basic types of chemical reactions",
        description_zh: "了解化學反應的基本類型",
        example: "化合反应、分解反应、置换反应"
      },
      {
        grade: "九年级",
        subject: "化学",
        guangdong_knowledge: "有机化学基础",
        hongkong_knowledge: "有机化学",
        match_type: "重合",
        description: "了解有机化合物的基本特征",
        description_en: "Understand the basic characteristics of organic compounds",
        description_zh: "了解有機化合物的基本特徵",
        example: "甲烷、乙醇等有机化合物"
      },
      {
        grade: "九年级",
        subject: "化学",
        guangdong_knowledge: "化学计算",
        hongkong_knowledge: "化学计算",
        match_type: "重合",
        description: "掌握化学计算的基本方法",
        description_en: "Master the basic methods of chemical calculations",
        description_zh: "掌握化學計算的基本方法",
        example: "摩尔质量、物质的量浓度计算"
      },
      {
        grade: "九年级",
        subject: "化学",
        guangdong_knowledge: "化学与生活",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "了解化学在日常生活中的应用",
        description_en: "Understand the application of chemistry in daily life",
        description_zh: "了解化學在日常生活中的應用",
        example: "食品添加剂、洗涤剂、化肥"
      },
      {
        grade: "九年级",
        subject: "化学",
        guangdong_knowledge: "",
        hongkong_knowledge: "环境保护",
        match_type: "港拓展",
        description: "了解化学与环境保护的关系",
        description_en: "Understand the relationship between chemistry and environmental protection",
        description_zh: "了解化學與環境保護的關係",
        example: "酸雨、温室效应、水污染"
      },

      // 生物科目
      {
        grade: "七年级",
        subject: "生物",
        guangdong_knowledge: "细胞的结构和功能",
        hongkong_knowledge: "细胞",
        match_type: "重合",
        description: "了解细胞的基本结构和功能",
        description_en: "Understand the basic structure and function of cells",
        description_zh: "了解細胞的基本結構和功能",
        example: "细胞膜、细胞质、细胞核"
      },
      {
        grade: "七年级",
        subject: "生物",
        guangdong_knowledge: "生物体的结构层次",
        hongkong_knowledge: "生物组织",
        match_type: "重合",
        description: "理解细胞、组织、器官、系统的层次关系",
        description_en: "Understand the hierarchical relationship of cells, tissues, organs and systems",
        description_zh: "理解細胞、組織、器官、系統的層次關係",
        example: "细胞组成组织，组织构成器官"
      },
      {
        grade: "七年级",
        subject: "生物",
        guangdong_knowledge: "光合作用",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "掌握光合作用的过程和意义",
        description_en: "Master the process and significance of photosynthesis",
        description_zh: "掌握光合作用的過程和意義",
        example: "光能转化为化学能"
      },
      {
        grade: "七年级",
        subject: "生物",
        guangdong_knowledge: "",
        hongkong_knowledge: "呼吸作用",
        match_type: "港拓展",
        description: "理解呼吸作用的过程",
        description_en: "Understand the process of respiration",
        description_zh: "理解呼吸作用的過程",
        example: "有机物氧化分解，释放能量"
      },
      {
        grade: "八年级",
        subject: "生物",
        guangdong_knowledge: "遗传和变异",
        hongkong_knowledge: "遗传学",
        match_type: "重合",
        description: "了解遗传和变异的基本概念",
        description_en: "Understand the basic concepts of heredity and variation",
        description_zh: "了解遺傳和變異的基本概念",
        example: "DNA是遗传物质"
      },
      {
        grade: "八年级",
        subject: "生物",
        guangdong_knowledge: "生物的进化",
        hongkong_knowledge: "进化论",
        match_type: "重合",
        description: "了解生物进化的基本观点",
        description_en: "Understand the basic viewpoints of biological evolution",
        description_zh: "了解生物進化的基本觀點",
        example: "自然选择、适者生存"
      },
      {
        grade: "八年级",
        subject: "生物",
        guangdong_knowledge: "生态系统",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "理解生态系统的组成和功能",
        description_en: "Understand the composition and function of ecosystems",
        description_zh: "理解生態系統的組成和功能",
        example: "生产者、消费者、分解者"
      },
      {
        grade: "八年级",
        subject: "生物",
        guangdong_knowledge: "",
        hongkong_knowledge: "生物多样性",
        match_type: "港拓展",
        description: "了解生物多样性的重要性",
        description_en: "Understand the importance of biodiversity",
        description_zh: "了解生物多樣性的重要性",
        example: "物种多样性、基因多样性"
      },
      {
        grade: "九年级",
        subject: "生物",
        guangdong_knowledge: "人体的生理系统",
        hongkong_knowledge: "人体生理",
        match_type: "重合",
        description: "了解人体各系统的结构和功能",
        description_en: "Understand the structure and function of human body systems",
        description_zh: "了解人體各系統的結構和功能",
        example: "消化系统、呼吸系统、循环系统"
      },
      {
        grade: "九年级",
        subject: "生物",
        guangdong_knowledge: "传染和免疫",
        hongkong_knowledge: "传染病",
        match_type: "重合",
        description: "了解传染病的传播和预防",
        description_en: "Understand the transmission and prevention of infectious diseases",
        description_zh: "了解傳染病的傳播和預防",
        example: "细菌、病毒、寄生虫"
      },
      {
        grade: "九年级",
        subject: "生物",
        guangdong_knowledge: "生物技术",
        hongkong_knowledge: "",
        match_type: "粤拓展",
        description: "了解现代生物技术的应用",
        description_en: "Understand the application of modern biotechnology",
        description_zh: "了解現代生物技術的應用",
        example: "基因工程、细胞工程、克隆技术"
      },
      {
        grade: "九年级",
        subject: "生物",
        guangdong_knowledge: "",
        hongkong_knowledge: "环境保护",
        match_type: "港拓展",
        description: "了解生物与环境保护的关系",
        description_en: "Understand relationship between biology and environmental protection",
        description_zh: "了解生物與環境保護的關係",
        example: "生物多样性保护、生态平衡"
      }
    ];

    this.setData({
      knowledgeData: knowledgeData
    });

    this.updateKnowledgeList(knowledgeData);
  },

  bindGradeChange: function (e) {
    var gradeIndex = parseInt(e.detail.value);
    var subjects = [];
    
    if (gradeIndex <= 5) {
      subjects = ['数学', '语文', '英语'];
    } else {
      subjects = ['数学', '语文', '英语', '物理', '化学', '生物'];
    }
    
    this.setData({
      gradeIndex: gradeIndex,
      subjects: subjects,
      subjectIndex: -1
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
    var selectedVersion = this.data.versions[this.data.versionIndex];

    this.addToHistory(selectedGrade, selectedSubject);

    // 使用完整的知识点数据
    var allKnowledgeData = this.data.knowledgeData || [];

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
  },

  // 添加学习历史
  addToHistory: function (grade, subject) {
    var history = wx.getStorageSync('studyHistory') || [];
    var id = 'knowledge_' + grade + '_' + subject;
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
      title: '知识点对标 - ' + subject,
      type: 'knowledge',
      typeName: '知识点对标',
      time: new Date().toLocaleString()
    });

    if (history.length > 50) {
      history = history.slice(0, 50);
    }

    wx.setStorageSync('studyHistory', history);
  }
});