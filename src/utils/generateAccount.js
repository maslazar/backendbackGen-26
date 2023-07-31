exports.generateAccountNumber = () => {
  const minm = 100000;
  const maxm = 999999;
  const result = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  return result;
};
