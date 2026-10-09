import { Layout } from 'antd'
import { Card, Statistic } from 'antd'
import { Listy } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

const siderStyle = {
  padding: '1rem',
}

const items = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  content: `Item ${index}`,
}))

export default function AppSider() {
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <Card style={{ marginBottom: '1rem' }}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          styles={{ content: { color: '#3f8600' } }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
        <Listy
          items={items}
          height={400}
          rowKey="id"
          itemRender={(item) => item.content}
        />
        ;
      </Card>
      <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          styles={{ content: { color: '#cf1322' } }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  )
}
