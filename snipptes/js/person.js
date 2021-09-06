/*
 * @Description: 
 * @Author: Chuang Li
 * @Date: 2021-08-27 09:27:15
 * @LastEditTime: 2021-08-27 09:42:33
 * @LastEditors: Chuang Li
 */
class Person {
	constructor(name, age) {
		// this 指向 p1 实例对象, p2 实例对象
		this.name = name;
		this.age = age;
	}
	speak() {
		// this 指向 调用该函数的实例
		return `我的名字是：${this.name}，年纪${this.age}`
	}
}

var p1 = new Person("王小花",20);
var p2 = new Person("李明",10)
var p3 = p1.speak.call({name:"李大锤",age:30}) // 修改了 this  
// call 的意思是把 p1 的方法 speak 放到 {name:"李大锤",age:30} 上执行
console.log(p1)
console.log(p2)
console.log(p3)


// 继承
class Student extends Person {
	constructor(name,age,grade) {
		super()
		this.name = name;
		this.age = age;
		this.grade = grade;
	}
	speak() {
		// this 指向 调用该函数的实例
		return `我的名字是：${this.name}，年纪${this.age}, 班级${this.grade}`
	}
}

var s1 = new Student("王小花",20,"三年级一班")
console.log(s1.speak())