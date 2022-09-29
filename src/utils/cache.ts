/* eslint-disable @typescript-eslint/no-explicit-any */
class LocalCache {
  getItem(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  }
  clear() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
