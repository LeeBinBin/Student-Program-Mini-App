// index.js
Page({
  data: {
    // 统计概览数据
    totalStudents: 45,
    crossBorderStudents: 15,
    totalCourses: 12,
    totalMaterials: 36,
    
    // 筛选条件

    
    // 学习数据
    learningData: {
      averageScores: [85, 86, 84, 87, 88, 89],
      subjects: ['数学', '英语', '语文', '科学', '历史', '地理'],
      scores: [88, 85, 87, 84, 89, 86]
    },
    
    // 跨境学生适应数据
    adaptationData: {
      levels: [
        { name: '优秀', count: 12, percentage: 40 },
        { name: '良好', count: 10, percentage: 35 },
        { name: '一般', count: 6, percentage: 20 },
        { name: '需关注', count: 2, percentage: 5 }
      ],
      problems: [
        { name: '语言障碍', count: 8 },
        { name: '课程差异', count: 6 },
        { name: '学习习惯', count: 4 },
        { name: '文化差异', count: 3 }
      ]
    },
    
    // 教学资源使用数据
    resourcesData: {
      downloads: [128, 95, 87, 64, 112, 73],
      types: [
        { name: '文档', count: 18 },
        { name: '课件', count: 10 },
        { name: '视频', count: 4 },
        { name: '音频', count: 2 },
        { name: '图片', count: 2 }
      ]
    }
  },

  onLoad: function () {
    // 初始化数据
    console.log('教学统计页面加载');
    
    // 初始化图表
    this.initCharts();
  },
  
  // 初始化图表
  initCharts: function () {
    // 延迟执行，确保Canvas已经渲染
    setTimeout(() => {
      this.drawScoreTrendChart();
      this.drawSubjectScoreChart();
      this.drawDownloadTrendChart();
      this.drawMaterialTypeChart();
    }, 500);
  },
  
  // 绘制成绩趋势图
  drawScoreTrendChart: function () {
    const ctx = wx.createCanvasContext('scoreTrendChart');
    const data = this.data.learningData.averageScores;
    const labels = ['1月', '2月', '3月', '4月', '5月', '6月'];
    
    this.drawLineChart(ctx, data, labels, '#667eea', '平均成绩趋势', 'scoreTrendChart');
  },
  
  // 绘制学科成绩分布图
  drawSubjectScoreChart: function () {
    const ctx = wx.createCanvasContext('subjectScoreChart');
    const data = this.data.learningData.scores;
    const labels = this.data.learningData.subjects;
    
    this.drawBarChart(ctx, data, labels, '#667eea', '学科成绩分布', 'subjectScoreChart');
  },
  
  // 绘制下载量趋势图
  drawDownloadTrendChart: function () {
    const ctx = wx.createCanvasContext('downloadTrendChart');
    const data = this.data.resourcesData.downloads;
    const labels = ['1月', '2月', '3月', '4月', '5月', '6月'];
    
    this.drawLineChart(ctx, data, labels, '#667eea', '素材下载量趋势', 'downloadTrendChart');
  },
  
  // 绘制素材类型分布图
  drawMaterialTypeChart: function () {
    const ctx = wx.createCanvasContext('materialTypeChart');
    const data = this.data.resourcesData.types;
    
    this.drawPieChart(ctx, data, '素材类型分布', 'materialTypeChart');
  },
  
  // 绘制折线图
  drawLineChart: function (ctx, data, labels, color, title, canvasId) {
    // 获取Canvas实际尺寸
    const query = wx.createSelectorQuery();
    query.select('#' + canvasId).boundingClientRect();
    query.exec((res) => {
      if (res && res[0]) {
        const width = res[0].width;
        const height = res[0].height;
        const padding = 40;
        
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制标题
        ctx.setFontSize(14);
        ctx.setFillStyle('#333');
        ctx.setTextAlign('center');
        ctx.fillText(title, width / 2, 20);
        
        // 计算数据范围
        const maxValue = Math.max(...data) * 1.1;
        const minValue = Math.min(...data) * 0.9;
        const valueRange = maxValue - minValue;
        
        // 绘制坐标轴
        ctx.setStrokeStyle('#ddd');
        ctx.setLineWidth(1);
        
        // X轴
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Y轴
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // 绘制数据点和连线
        ctx.setStrokeStyle(color);
        ctx.setLineWidth(2);
        ctx.setFillStyle(color);
        
        const stepX = (width - 2 * padding) / (data.length - 1);
        
        ctx.beginPath();
        data.forEach((value, index) => {
          const x = padding + index * stepX;
          const y = height - padding - ((value - minValue) / valueRange) * (height - 2 * padding);
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
        
        // 绘制数据点
        data.forEach((value, index) => {
          const x = padding + index * stepX;
          const y = height - padding - ((value - minValue) / valueRange) * (height - 2 * padding);
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        });
        
        // 绘制标签
        ctx.setFontSize(12);
        ctx.setFillStyle('#666');
        ctx.setTextAlign('center');
        
        labels.forEach((label, index) => {
          const x = padding + index * stepX;
          ctx.fillText(label, x, height - padding + 15);
        });
        
        ctx.draw();
      } else {
        console.log('Canvas element not found:', canvasId);
      }
    });
  },
  
  // 绘制柱状图
  drawBarChart: function (ctx, data, labels, color, title, canvasId) {
    // 获取Canvas实际尺寸
    const query = wx.createSelectorQuery();
    query.select('#' + canvasId).boundingClientRect();
    query.exec((res) => {
      if (res && res[0]) {
        const width = res[0].width;
        const height = res[0].height;
        const padding = 40;
        
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制标题
        ctx.setFontSize(14);
        ctx.setFillStyle('#333');
        ctx.setTextAlign('center');
        ctx.fillText(title, width / 2, 20);
        
        // 计算数据范围
        const maxValue = Math.max(...data) * 1.1;
        const minValue = 0;
        const valueRange = maxValue - minValue;
        
        // 绘制坐标轴
        ctx.setStrokeStyle('#ddd');
        ctx.setLineWidth(1);
        
        // X轴
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Y轴
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // 绘制柱状图
        const barWidth = (width - 2 * padding) / data.length * 0.7;
        const stepX = (width - 2 * padding) / data.length;
        
        data.forEach((value, index) => {
          const x = padding + index * stepX + (stepX - barWidth) / 2;
          const barHeight = ((value - minValue) / valueRange) * (height - 2 * padding);
          const y = height - padding - barHeight;
          
          // 绘制柱子
          ctx.setFillStyle(color);
          ctx.fillRect(x, y, barWidth, barHeight);
          
          // 绘制数值
          ctx.setFontSize(12);
          ctx.setFillStyle('#333');
          ctx.setTextAlign('center');
          ctx.fillText(value, x + barWidth / 2, y - 8);
        });
        
        // 绘制标签
        ctx.setFontSize(12);
        ctx.setFillStyle('#666');
        ctx.setTextAlign('center');
        
        labels.forEach((label, index) => {
          const x = padding + index * stepX + stepX / 2;
          ctx.fillText(label, x, height - padding + 15);
        });
        
        ctx.draw();
      }
    });
  },
  
  // 绘制饼图
  drawPieChart: function (ctx, data, title, canvasId) {
    // 获取Canvas实际尺寸
    const query = wx.createSelectorQuery();
    query.select('#' + canvasId).boundingClientRect();
    query.exec((res) => {
      if (res && res[0]) {
        const width = res[0].width;
        const height = res[0].height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) - 40;
        
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制标题
        ctx.setFontSize(14);
        ctx.setFillStyle('#333');
        ctx.setTextAlign('center');
        ctx.fillText(title, width / 2, 20);
        
        // 计算总数据
        const total = data.reduce((sum, item) => sum + item.count, 0);
        
        // 颜色数组 - 使用统一的紫色调
        const colors = ['#667eea', '#764ba2', '#8a5cf6', '#9333ea', '#a855f7'];
        
        // 绘制饼图
        let startAngle = 0;
        
        data.forEach((item, index) => {
          const angle = (item.count / total) * 2 * Math.PI;
          
          // 绘制扇形
          ctx.setFillStyle(colors[index % colors.length]);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
          ctx.closePath();
          ctx.fill();
          
          // 绘制标签
          const labelX = centerX + Math.cos(startAngle + angle / 2) * (radius + 30);
          const labelY = centerY + Math.sin(startAngle + angle / 2) * (radius + 30);
          
          ctx.setFontSize(12);
          ctx.setFillStyle('#333');
          ctx.setTextAlign('center');
          ctx.fillText(`${item.name}: ${item.count}`, labelX, labelY);
          
          startAngle += angle;
        });
        
        ctx.draw();
      } else {
        console.log('Canvas element not found:', canvasId);
      }
    });
  },

  // 返回上一页
  navigateBack: function () {
    wx.navigateBack();
  },

  // 导出数据
  exportData: function () {
    wx.showModal({
      title: '导出数据',
      content: '请选择导出格式',
      cancelText: 'Excel',
      confirmText: 'PDF',
      success: (res) => {
        if (res.confirm) {
          // PDF格式
          wx.showToast({
            title: 'PDF格式导出功能开发中',
            icon: 'info'
          });
        } else if (res.cancel) {
          // Excel格式
          wx.showToast({
            title: 'Excel格式导出功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },



  // 查看详情
  viewDetail: function (e) {
    const type = e.currentTarget.dataset.type;
    let title = '';
    let content = '';
    let detailData = {};
    let detailedContent = '';

    switch (type) {
      case 'learning':
        title = '学习数据分析详情';
        content = '学习数据详细分析包括成绩趋势、学科表现、学习时长等多个维度的分析。';
        
        // 计算成绩统计信息
        const averageScores = this.data.learningData.averageScores;
        const subjectScores = this.data.learningData.scores;
        const subjects = this.data.learningData.subjects;
        
        // 计算平均值
        var sumScores = 0;
        for (var i = 0; i < averageScores.length; i++) {
          sumScores += averageScores[i];
        }
        const avgScore = (sumScores / averageScores.length).toFixed(1);
        
        // 计算最大值和最小值
        var maxScore = averageScores[0];
        var minScore = averageScores[0];
        for (var i = 1; i < averageScores.length; i++) {
          if (averageScores[i] > maxScore) {
            maxScore = averageScores[i];
          }
          if (averageScores[i] < minScore) {
            minScore = averageScores[i];
          }
        }
        
        // 找出最高和最低分的学科
        var maxSubjectScore = subjectScores[0];
        var minSubjectScore = subjectScores[0];
        var maxSubjectIndex = 0;
        var minSubjectIndex = 0;
        for (var i = 1; i < subjectScores.length; i++) {
          if (subjectScores[i] > maxSubjectScore) {
            maxSubjectScore = subjectScores[i];
            maxSubjectIndex = i;
          }
          if (subjectScores[i] < minSubjectScore) {
            minSubjectScore = subjectScores[i];
            minSubjectIndex = i;
          }
        }
        const highestSubject = subjects[maxSubjectIndex];
        const lowestSubject = subjects[minSubjectIndex];
        
        // 构建详细内容
        detailedContent = "平均成绩趋势：\n";
        averageScores.forEach(function(score, index) {
          detailedContent += ['1月', '2月', '3月', '4月', '5月', '6月'][index] + ': ' + score + '\n';
        });
        detailedContent += "\n学科成绩分布：\n";
        subjects.forEach(function(subject, index) {
          detailedContent += subject + ': ' + subjectScores[index] + '\n';
        });
        detailedContent += "\n统计信息：\n";
        detailedContent += "平均成绩：" + avgScore + "\n";
        detailedContent += "最高成绩：" + maxScore + "\n";
        detailedContent += "最低成绩：" + minScore + "\n";
        detailedContent += "优势学科：" + highestSubject + "\n";
        detailedContent += "需改进学科：" + lowestSubject;
        
        detailData = this.data.learningData;
        break;
      case 'adaptation':
        title = '适应情况分析详情';
        content = '适应情况详细分析包括跨境学生的适应等级分布、主要问题及解决方案等。';
        
        // 构建详细内容
        detailedContent = "适应等级分布：\n";
        this.data.adaptationData.levels.forEach(function(level) {
          detailedContent += level.level + ': ' + level.count + '人 (' + level.percentage + '%)\n';
        });
        detailedContent += "\n主要适应问题：\n";
        this.data.adaptationData.problems.forEach(function(problem) {
          detailedContent += problem.problem + ': ' + problem.count + '人\n';
        });
        
        detailData = {
          levels: this.data.adaptationData.levels,
          problems: this.data.adaptationData.problems
        };
        break;
      case 'resources':
        title = '教学资源使用详情';
        content = '教学资源使用详细分析包括素材下载量、类型分布、使用频率等。';
        
        // 计算资源使用统计信息
        const downloads = this.data.resourcesData.downloads;
        const types = this.data.resourcesData.types;
        
        // 计算总下载量
        var totalDownloads = 0;
        for (var i = 0; i < downloads.length; i++) {
          totalDownloads += downloads[i];
        }
        const avgDownloads = (totalDownloads / downloads.length).toFixed(1);
        
        // 计算最大值和最小值
        var maxDownloads = downloads[0];
        var minDownloads = downloads[0];
        for (var i = 1; i < downloads.length; i++) {
          if (downloads[i] > maxDownloads) {
            maxDownloads = downloads[i];
          }
          if (downloads[i] < minDownloads) {
            minDownloads = downloads[i];
          }
        }
        
        // 找出最常用的素材类型
        var mostUsedType = types[0];
        for (var i = 1; i < types.length; i++) {
          if (types[i].count > mostUsedType.count) {
            mostUsedType = types[i];
          }
        }
        
        // 构建详细内容
        detailedContent = "素材下载量趋势：\n";
        downloads.forEach(function(download, index) {
          detailedContent += ['1月', '2月', '3月', '4月', '5月', '6月'][index] + ': ' + download + '次\n';
        });
        detailedContent += "\n素材类型分布：\n";
        types.forEach(function(type) {
          detailedContent += type.name + ': ' + type.count + '个\n';
        });
        detailedContent += "\n统计信息：\n";
        detailedContent += "总下载量：" + totalDownloads + "次\n";
        detailedContent += "平均下载量：" + avgDownloads + "次/月\n";
        detailedContent += "最高下载量：" + maxDownloads + "次\n";
        detailedContent += "最低下载量：" + minDownloads + "次\n";
        detailedContent += "最常用素材类型：" + mostUsedType.name;
        
        detailData = this.data.resourcesData;
        break;
    }

    // 显示详情弹窗
    wx.showModal({
      title: title,
      content: content,
      confirmText: '查看详细数据',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 显示详细数据
          wx.showModal({
            title: title,
            content: detailedContent,
            confirmText: '确定',
            showCancel: false
          });
        }
      }
    });
  },

  // 阻止事件冒泡
  catchTap: function () {
    // 空函数，用于阻止事件冒泡
  }
});