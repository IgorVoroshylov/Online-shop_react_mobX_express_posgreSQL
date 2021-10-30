import { host, authHost } from "./axios";

// --------- Types ------------
export const createType = async(type) => {
   const response = await authHost.post('api/type', type);
   const {data} = response;
   return data;
};

export const fetchTypes = async() => {
   const response = await host.get('api/type');
   const {data} = response;
   return data;
};

// ---------- Brands -----------
export const createBrand = async(brand) => {
   const response = await authHost.post('api/brand', brand);
   const {data} = response;
   return data;
};

export const fetchBrand = async() => {
   const response = await host.get('api/brand');
   const {data} = response;
   return data;
};

// ----------- Device ----------
export const createDevice = async(device) => {
   const response = await authHost.post('api/device', device);
   const {data} = response;
   return data;
};

export const fetchDevice = async(typeId, brandId, page, limit) => {
   const response = await host.get('api/device', {params: {
      typeId, brandId, page, limit}});
   const {data} = response;
   return data;
};

export const fetchOneDevice = async(id) => {
   const response = await host.get('api/device/' + id);
   const {data} = response;
   return data;
};

// ----------- Bsket -----------
export const addToBasket = async(deviceId, basketId, name, img, price) => {
   const response = await host.post('api/basket', {deviceId, basketId, name, img, price});
   const {data} = response;
   return data;
};

export const fetchBasketDevices = async(basketId) => {
   const response = await host.get('api/basket', {params: {
      basketId
   }});
   const {data} = response;
   return data;
};

export const deleteBasketDevicesItem = async(id) => {
   const response = await host.delete('api/basket', {params: {
      id
   }});
   const {data} = response;
   return data;
};