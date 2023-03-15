export const reduceString = (str, length) => {
    if (str.length > length) {
      return str.substring(0, length - 3) + '...';
    }
    return str;
};