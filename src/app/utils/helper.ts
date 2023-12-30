export const createGuid = () => {  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
    return v.toString(16);  
  });
}

export const formatNumber = (value: string | number) => {
  if (value === null) {
    return '0,00'
  }
  const phoneNumber = value + '';
  const list = phoneNumber.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  const decimal = list[1]?.length > 1 ? list[1].slice(0,2) : list[1]?.length === 1 ? `${list[1]}0` : '';
  return `${prefix}${result}${decimal ? `,${decimal}` : ',00'}`;
};

