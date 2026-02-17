// index.js
Page({
  data: {
    selectedLanguage: 'zh',
    inputText: '',
    translatedText: '',
    languageNames: {
      zh: '中文',
      en: 'English',
      yue: '粤语'
    },
    commonPhrases: [
      {
        id: 'P001',
        text: '请打开课本第10页',
        language: '中文'
      },
      {
        id: 'P002',
        text: 'Please open your textbook to page 10',
        language: 'English'
      },
      {
        id: 'P003',
        text: '请睇开课本第10页',
        language: '粤语'
      },
      {
        id: 'P004',
        text: '这个问题谁来回答？',
        language: '中文'
      },
      {
        id: 'P005',
        text: 'Who would like to answer this question?',
        language: 'English'
      },
      {
        id: 'P006',
        text: '呢个问题边个嚟回答？',
        language: '粤语'
      },
      {
        id: 'P007',
        text: '很好，你答对了',
        language: '中文'
      },
      {
        id: 'P008',
        text: 'Great, you got it right!',
        language: 'English'
      },
      {
        id: 'P009',
        text: '好嘢，你答啱咗',
        language: '粤语'
      }
    ],
    history: []
  },

  onLoad: function () {
    // 初始化数据
    const savedHistory = wx.getStorageSync('translationHistory') || [];
    this.setData({ history: savedHistory });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 添加翻译
  addTranslation: function () {
    wx.showModal({
      title: '添加翻译',
      content: '请选择翻译类型',
      cancelText: '短语翻译',
      confirmText: '课文翻译',
      success: (res) => {
        if (res.confirm) {
          // 课文翻译
          wx.showToast({
            title: '课文翻译功能开发中',
            icon: 'info'
          });
        } else if (res.cancel) {
          // 短语翻译
          wx.showToast({
            title: '短语翻译功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  // 选择语言
  selectLanguage: function (language) {
    this.setData({ selectedLanguage: language });
  },

  // 输入内容
  onInput: function (e) {
    this.setData({ inputText: e.detail.value });
  },

  // 翻译
  translate: function () {
    const inputText = this.data.inputText;
    if (!inputText) {
      wx.showToast({
        title: '请输入需要翻译的内容',
        icon: 'none'
      });
      return;
    }

    // 模拟翻译
    let translatedText = '';
    const selectedLanguage = this.data.selectedLanguage;

    switch (selectedLanguage) {
      case 'zh':
        translatedText = this.simulateTranslation(inputText, 'zh');
        break;
      case 'en':
        translatedText = this.simulateTranslation(inputText, 'en');
        break;
      case 'yue':
        translatedText = this.simulateTranslation(inputText, 'yue');
        break;
    }

    this.setData({ translatedText: translatedText });

    // 保存到历史记录
    const historyItem = {
      input: inputText,
      output: translatedText,
      language: selectedLanguage,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [historyItem, ...this.data.history].slice(0, 10); // 只保留最近10条
    this.setData({ history: updatedHistory });
    wx.setStorageSync('translationHistory', updatedHistory);
  },

  // 模拟翻译
  simulateTranslation: function (text, targetLanguage) {
    // 简单的模拟翻译
    const translations = {
      zh: {
        'Hello': '你好',
        'Thank you': '谢谢',
        'Good morning': '早上好',
        'How are you?': '你好吗？',
        'I am fine': '我很好'
      },
      en: {
        '你好': 'Hello',
        '谢谢': 'Thank you',
        '早上好': 'Good morning',
        '你好吗？': 'How are you?',
        '我很好': 'I am fine'
      },
      yue: {
        '你好': '你好',
        '谢谢': '多谢',
        '早上好': '早晨',
        '你好吗？': '你好吗？',
        '我很好': '我几好'
      }
    };

    // 查找翻译
    for (const [key, value] of Object.entries(translations[targetLanguage])) {
      if (text.includes(key)) {
        return text.replace(key, value);
      }
    }

    // 没有找到翻译，返回默认翻译
    switch (targetLanguage) {
      case 'zh':
        return `[中文翻译] ${text}`;
      case 'en':
        return `[English translation] ${text}`;
      case 'yue':
        return `[粵語翻譯] ${text}`;
      default:
        return text;
    }
  },

  // 清空输入
  clearInput: function () {
    this.setData({ inputText: '', translatedText: '' });
  },

  // 复制结果
  copyResult: function () {
    const translatedText = this.data.translatedText;
    if (!translatedText) {
      wx.showToast({
        title: '没有可复制的内容',
        icon: 'none'
      });
      return;
    }

    wx.setClipboardData({
      data: translatedText,
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      }
    });
  },

  // 保存翻译
  saveTranslation: function () {
    const inputText = this.data.inputText;
    const translatedText = this.data.translatedText;
    const selectedLanguage = this.data.selectedLanguage;

    if (!inputText || !translatedText) {
      wx.showToast({
        title: '没有可保存的内容',
        icon: 'none'
      });
      return;
    }

    // 模拟保存
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
  },

  // 使用常用短语
  usePhrase: function (e) {
    const phrase = e.currentTarget.dataset.phrase;
    this.setData({ inputText: phrase });
  }
});