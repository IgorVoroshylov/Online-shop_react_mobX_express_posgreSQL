import { makeAutoObservable } from "mobx"

export default class DeviceStore {
   constructor() {
      this._types = []
      this._brands = []
      this._device = []
      this._selectedType = {}
      this._selectedBrand = {}
      this._page = 1
      this._totalCount = 0
      this._limit = 8
      makeAutoObservable(this)
   }

   setTypes(type) {
      this._types = type
   }
   setBrands(brand) {
      this._brands = brand
   }
   setDevice(device) {
      this._device = device
   }
   setSelectedType(stype) {
      this._page = 1
      this._selectedType = stype
   }
   setSelectedBrand(sbrand) {
      this._page = 1
      this._selectedBrand = sbrand
   }
   setPage(page) {
      this._page = page
   }
   setTotalCount(totalCount) {
      this._totalCount = totalCount
   }
   setLimit(limit) {
      this._limit = limit
   }

   get types() {
      return this._types
   }
   get brands() {
      return this._brands
   }
   get devices() {
      return this._device
   }
   get selectedType() {
      return this._selectedType
   }
   get selectedBrend() {
      return this._selectedBrand
   }
   get page() {
      return this._page
   }
   get totalCount() {
      return this._totalCount
   }
   get limit() {
      return this._limit
   }
};