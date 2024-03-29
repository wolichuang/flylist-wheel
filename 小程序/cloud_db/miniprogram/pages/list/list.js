// pages/list/list.js
const { heroList, nav } = require('../../data/hero')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNavIndex:0,
    heroNav: [],
    heroList: [], //用于英雄列表 wx:for
    allHero: []
  },
  changeHeros(e) {
    console.log(e);
    let {index, type} = e.currentTarget.dataset;
    console.log(index, type);
    
    this.setData({
      activeNavIndex:index
    })
    // heroList
    // 如何从一个数组中（每一项都是对象）, 有一个key camptype
    // type  == camptype 找出所有来 
    if (type == 'all') {
      this.setData({
        heroList: this.data.allHero
      })
    } else {
      
      // this.data.allHero.forEach(hero => {
      //   if (hero.camptype == type) {
      //     heros.push(hero)
      //   }
      // })
      let heros = this.data.allHero.filter((hero) => hero.camptype == type )
      // console.log(heros);
      this.setData({
        heroList: heros
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '英雄数据加载中...',
    })
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        heroNav: nav,
        allHero: heroList,
        heroList: heroList
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      this.setData({
        activeNavIndex:0,
        allHero: heroList,
        heroList: heroList
      })
      wx.hideLoading();
      wx.stopPullDownRefresh()
    }, 1000)
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})