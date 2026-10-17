export default function percentDifference(assetPrice, coinPrice) {
  return (
    (Math.abs(assetPrice - coinPrice) / ((assetPrice + coinPrice) / 2)) *
    100
  ).toFixed(2)
}
