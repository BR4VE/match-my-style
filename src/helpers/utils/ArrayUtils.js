class ArrayUtils {
  static contains(target, source) {
    const sourceMap = {};
    source.forEach((element) => {
      sourceMap[element.toString()] = true;
    });

    return target.every((targetElement) => sourceMap[targetElement.toString()]);
  }

  static getKeys(target, key) {
    return target.reduce((keys, element) => {
      const keyValue = element[key];
      if (keyValue) {
        keys.push(keyValue);
      }
      return keys;
    }, []);
  }

  static mapify(arrayOfObjects, key) {
    const map = {};
    arrayOfObjects.forEach((object) => {
      const value = object[key];
      if (!value) {
        return;
      }
      map[value] = object;
    });
    return map;
  }
}

export default ArrayUtils;
