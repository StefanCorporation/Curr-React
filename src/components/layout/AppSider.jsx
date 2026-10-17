import { Layout } from 'antd'
import { Card, Statistic } from 'antd'
import { List, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { fakeFetchCrypto, fakeFetchAssets } from '../api'
import { Spin } from 'antd'
import percentDifference from '../utils'

const siderStyle = {
  padding: '1rem',
}

export default function AppSider() {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assets = await fakeFetchAssets()

      setCrypto(result)

      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id)
          console.log(coin, asset.id)
          return {
            grow: asset.price < coin.price, // true / false
            growPerecent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          }
        }),
      )
      setLoading(false)
    }

    preload()
  }, [])

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider width="30%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={asset.id.charAt(0).toUpperCase() + asset.id.slice(1)}
            value={asset.totalAmount}
            precision={2}
            styles={{
              content: asset.grow ? { color: '#3f8600' } : { color: '#cf1322' },
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: `$ ${Math.round(asset.totalProfit * 100) / 100}`,
                style: asset.grow ? { color: 'green' } : { color: 'red' },
                tag: true,
              },
              {
                title: 'Asset Amount',
                value: asset.amount,
              },
              // { title: 'Difference', value: `% ${asset.growPerecent}` },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span> {item.title}</span>
                {item.tag && (
                  <span style={item.style}>
                    <span style={{ marginRight: '10px' }}>
                      {
                        <Tag
                          key={'green'}
                          color={item.style.color}
                          variant={'outlined'}
                        >
                          {`% ${asset.growPerecent}`}
                        </Tag>
                      }
                    </span>

                    {item.value}
                  </span>
                )}

                {!item.tag && <span>{item.value}</span>}
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  )
}
