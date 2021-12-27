class ArrayUtils {
  static contains(target, source) {
    const sourceMap = {};
    source.forEach((element) => {
      sourceMap[element.toString()] = true;
    });

    return target.every((targetElement) => sourceMap[targetElement.toString()]);
  }
}

export default ArrayUtils;
