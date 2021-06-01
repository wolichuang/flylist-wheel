// 实现：Object.create()

/**
 * 1. 创建一个空对象
2. 将该空对象的原型设置为 proto
3. 将属性的 propertiesObject 赋给新建对象
4. 返回该对象
 */
Object.ObjectCreate = (proto, prop) => {
  // 对输入进行检测
  if (
    typeof proto !== "object" &&
    typeof proto !== "function" &&
    proto !== null
  ) {
    throw new Error(`Object prototype may only be an Object or null:${proto}`);
  }
  let res = {};
  Object.setPrototypeOf(res, proto);
  Object.defineProperties(res, prop);
  return res;
};

// 实现：Object.assign()

/**
 * 1. 判断目标对象 不能为 null 和 undefined
 * 2. 将目标对象转换成对象
 * 3. 获取后续源对象自身的中可枚举的复制到对象中
 * 4. 返回处理好的对象
 * 5. 利用 Object.defineProperty() 将该函数配置为不可枚举的挂载到 Object 上
 */

function ObjectAssign(target, ...sources) {
  // 对第一个参数的判断，不能为undefined和null
  if (target === undefined || target === null) {
    throw new TypeError("cannot convert first argument to object");
  }

  // 将第一个参数转换为对象(不是对象转换为对象)
  const targetObj = Object(target);
  // 将源对象(source)自身的所有可枚举属性复制到目标对象（target）
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    // 对于undefined和null在源角色中不会报错，会直接跳过
    if (source !== undefined && source !== null) {
      // 将源角色转换成对象
      // 需要将源角色自身的可枚举属性（包含Symbol值的属性）进行复制
      // Reflect.ownKeys(obj)  返回一个数组，包含对象自身的所有属性，不管属性名是Symbol还是字符串，也不管是否可枚举
      const keysArray = Reflect.ownKeys(Object(source));
      for (let nextIndex = 0; nextIndex < keysArray.length; nextIndex++) {
        const nextKey = keysArray[nextIndex];
        // 去除不可枚举属性
        const desc = Object.getOwnPropertyDescriptor(source, nextKey);
        if (desc !== undefined && desc.enumerable) {
          // 后面的属性会覆盖前面的属性
          targetObj[nextKey] = source[nextKey];
        }
      }
    }
  }

  return targetObj;
}

// 由于挂载到Object的assign是不可枚举的,直接挂载上去是可枚举的，所以采用这种方式
if (typeof Object.myAssign !== "function") {
  Object.defineProperty(Object, "myAssign", {
    value: ObjectAssign,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}
