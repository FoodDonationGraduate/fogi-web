export const reduceString = (str, length) => {
    if (str.length > length) {
      return str.substring(0, length - 3) + '...';
    }
    return str;
};

export const handleMaxInput = (event, max, setText) => {
  const str = event.target.value;
  if (str.length > max) setText(str.substring(0, max));
  else setText(str);
};