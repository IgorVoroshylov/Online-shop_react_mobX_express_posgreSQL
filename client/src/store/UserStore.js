import {makeAutoObservable} from 'mobx'

export default class UserStore {
   constructor() {
      this._isAuth = false
      this._user = {}
      this._basketListId = [] // массив с id товаров, которые находяться в корзине
      this._error = ''
      makeAutoObservable(this)
   }

   setIsAuth(bool) {
      this._isAuth = bool
   }
   setUser(user) {
      this._user = user
   }
   setError(message) {
      this._error = message
   }
   setBasketListId(list) {
      this._basketListId = list
   }

   get isAuth() {
      return this._isAuth
   }
   get user() {
      return this._user
   }
   get error() {
      return  this._error
   }
   get basketListId() {
      return  this._basketListId
   }
};