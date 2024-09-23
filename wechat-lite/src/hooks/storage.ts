import Taro from "@tarojs/taro";
import { useEffect, useState } from "react"

export const useStorage = (key: string) => {
  const [storage, setStorage] = useState('');

  const getStorage = () => {
    const storage = Taro.getStorageSync(key);
    if (storage !== '') {
      setStorage(storage);
    }
  }

  const addStorage = (value: string) => {
    Taro.setStorageSync(key, value);
    setStorage(value);
    getStorage();
  }

  const removeStorage = () => {
    Taro.removeStorageSync(key);
    setStorage('');
  }

  useEffect(() => {
    getStorage();
  }, [key]);

  return { storage, setStorage: addStorage, removeStorage, reload: getStorage }
}