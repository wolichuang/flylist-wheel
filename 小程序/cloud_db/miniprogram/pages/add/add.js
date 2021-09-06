// miniprogram/pages/add/add.js
const db = wx.cloud.database() //连接数据库
const productsCollection = db.collection("products")
const companiesCollection = db.collection("companies")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addData() {
    productsCollection.add({
      data: {
        title: "Product" + (Math.random() * 100).toString(),
        image: "https://img2.baidu.com/it/u=3755997119,1432315366&fm=26&fmt=auto&gp=0.jpg",
        tags: ["tag123", "tag23"],
        price: Math.random() * 100,
        color: 'pink',
        view: Math.floor(Math.random() * 10)
      }
    })
    let huawei = {
      name: "华为",
      logo: "https://img2.baidu.com/it/u=1694646572,1530297597&fm=26&fmt=auto&gp=0.jpg",
      address: "深圳市龙岗区"
    }
    companiesCollection.add({
      data: huawei
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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