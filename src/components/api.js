import { cryptoAssets, cryptoData } from './data'



export default function fakeFetchCrypto() {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(cryptoData)
    }, 2000)
  })
} 

export default function fakeFetchAssets() {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(cryptoAssets)
    }, 2000)
  })
}