
export const reduceArray = (array) => {
   return array.reduce((accum, {deviceId}) => {
      accum.push(deviceId);
      return accum;
   }, []);
};

