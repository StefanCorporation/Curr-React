import { Layout } from 'antd'
import { Card, Statistic } from 'antd'
import { List, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { CryptoContext } from '../../context/crypto-context.jsx'

const siderStyle = {
  padding: '1rem',
}

export default function AppSider() {
  const { loading, crypto, assets } = useContext(CryptoContext)

  return (
    <Layout.Sider width="340" style={siderStyle}>
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
