import { Layout, Select } from 'antd'
import { useCrypto } from '../../context/crypto-context'

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '1rem',
  height: 60,
  paddingInline: 48,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  bacgroundColor: 'white',
}

export default function AppHeader() {
  const { crypto } = useCrypto()

  function handleSelect(value) {
    console.log(value)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        value="Press / to open"
        defaultValue=""
        style={{ width: 220 }}
        onSelect={handleSelect}
        options={crypto.map((item, index) => {
          return {
            value: item.id,
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{ width: 20, height: 20 }}
                />
                <span>{item.name}</span>
              </div>
            ),
          }
        })}
      />
    </Layout.Header>
  )
}
