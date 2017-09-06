//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    today:{} 
  },

  getTodayString() {
    var weeks = ["日", "一", "二", "三", "四", "五", "六"];
    var today = new Date();
    return "主人，今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + weeks[today.getDay()];
  },
  getTotalObject() {
    var activities = [{
      name: "传教",
      good: "将你的好基友入LL神教",
      bad: "疑似邪教被警方控制"
    }, {
      name: "欣赏Nico的本子",
      good: "今天谁的鸡儿都别想放假",
      bad: "妈妈，你听我解释啊"
    }, {
      name: "穿着痛T出门",
      good: "万一偶遇了你未来的拉拉人女友",
      bad: "口意，四斋蒸鹅心"
    }, {
      name: "去面基",
      good: "成功TradePY♂",
      bad: "话不投机三句多",
      weekend: true
    }, {
      name: "肥宅锻炼身体",
      good: "万一能变现充呢？",
      bad: "能量没消耗多少，吃得却更多",
      weekend: true
    }, {
      name: "越三五好友，重温Final Live",
      good: "μ's forever",
      bad: "你朋友带来了一个爱马仕",
      weekend: true
    }, {
      name: "逛逛E-hentai",
      good: "感觉身体被掏空",
      bad: "这时妈妈推开房门"
    }, {
      name: "色眯眯的盯着自己的妹妹",
      good: "一抹多也色眯眯的盯着你",
      bad: "德国骨科床位已满"
    }, {
      name: "好好学习",
      good: "天天向上",
      bad: "学了也没用。辣鸡"
    }, {
      name: "去淘宝逛周边",
      good: "买买买。剁剁剁",
      bad: "妖妖灵，我钱包里的钱跑路了？"
    }, {
      name: "路边偶遇小萝莉",
      good: "大哥哥要抱抱",
      bad: "警察蜀黍，有个猥琐的大叔跟踪我。"
    }, {
      name: "逛逛A站",
      good: "和猴子TradePY",
      bad: "满屏兄贵亮瞎你眼"
    }, {
      name: "装逼",
      good: "逼格than逼格",
      bad: "在下坂本，有何贵干"
    }, {
      name: "熬夜刷作业",
      good: "变成学霸拉拉人",
      bad: "肝太多，但是秃了你会变得更强",
      weekend: true
    }, {
      name: "在妹子面前吹牛",
      good: "改善你矮穷挫的形象",
      bad: "会被识破",
      weekend: true
    }, {
      name: "约学妹出去",
      good: "愉快的一天DATE",
      bad: "遇见高大威猛的学长",
      weekend: true
    }, {
      name: "玩王者农药",
      good: "遇见神助攻，轻松上王者",
      bad: "放准点，大鹰放准点"
    }, {
      name: "打LOL",
      good: "你将有如神助",
      bad: "你会被虐的很惨",
      weekend: true
    }, {
      name: "上微博",
      good: "今天发生的事不能错过",
      bad: "今天的微博充满负能量",
      weekend: true
    }, {
      name: "去B站看看",
      good: "感受逸国风范",
      bad: "被关进小黑屋和比利嘿嘿嘿♂",
      weekend: true
    }, {
      name: "绝地求生",
      good: "大吉大利晚上吃鸡",
      bad: "滚去学习",
      weekend: true
    }];

    var directions = ["北方", "东北方", "东方", "东南方", "南方", "西南方", "西方", "西北方"];

    var drinks = ["Nico的妹汁", "果皇的妹汁", "KKE的妹汁", "南小鸟的妹汁", "喵凛的妹汁", "海爷的妹汁", "花阳的妹汁", "小真姬的妹汁", "希魔王的妹汁", "Dr Pepper", "Key咖啡", "武藏野牛奶", "長森牛乳","口嚼酒"];

    var _activities = this.filter(activities);
    var today = new Date();
    var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    var numGood = this.random(iday, 98) % 3 + 2;
    var numBad = this.random(iday, 87) % 3 + 2;
    var eventArr = this.pickRandomActivity(_activities, numGood + numBad);

    var goodList = [];
    var badList = [];

    for (var i = 0; i < numGood; i++) {
      goodList.push(eventArr[i]);
    }

    for (var i = 0; i < numBad; i++) {
      badList.push(eventArr[numGood + i]);
    }
    var totalList = {
      "today": this.getTodayString(),
      "goodList": goodList,
      "badList": badList,
      "direction": directions[this.random(iday, 2) % directions.length],
      "drinks": this.pickRandom(drinks, 2),
      "stars": this.star(this.random(iday, 6) % 5 + 1)
    }
    return totalList;
  },

  star(num) {
    var result = "";
    var i = 0;
    while (i < num) {
      result += "★";
      i++;
    }
    while (i < 5) {
      result += "☆";
      i++;
    }
    return result;
  },

  // 去掉一些不合今日的事件
  filter(activities) {
    var result = [];
    // 周末的话，只留下 weekend = true 的事件
    if (this.isWeekend()) {
      for (var i = 0; i < activities.length; i++) {
        if (activities[i].weekend) {
          result.push(activities[i]);
        }
      }
      return result;
    }
    return activities;
  },

  isWeekend() {
    var today = new Date();
    return today.getDay() == 0 || today.getDay() == 6;
  },

  // 从 activities 中随机挑选 size 个
  pickRandomActivity(activities, size) {
    var picked_events = this.pickRandom(activities, size);

    for (var i = 0; i < picked_events.length; i++) {
      picked_events[i] = picked_events[i];
    }

    return picked_events;
  },

  // 从数组中随机挑选 size 个
  pickRandom(array, size) {
    var result = [];
    var today = new Date();
    var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    for (var i = 0; i < array.length; i++) {
      result.push(array[i]);
    }
    for (var j = 0; j < array.length - size; j++) {
      var index = this.random(iday, j) % result.length;
      result.splice(index, 1);
    }

    return result;
  },

  random(dayseed, indexseed) {
    var n = dayseed % 11117;
    for (var i = 0; i < 100 + indexseed; i++) {
      n = n * n;
      n = n % 11117; // 11117 是个质数
    }
    return n;
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      today: this.getTotalObject()
    })
  },
  onShareAppMessage: function () {
    return {
      title: '宅历',
      desc: '来看看你今天的宅运吧',
      path: '/pages/index/index'
    }
  }
})