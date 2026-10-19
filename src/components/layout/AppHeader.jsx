import { Layout, Select, Modal, Button } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react'
import CoinModal from './CoinModal'
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
  const { crypto, loading } = useCrypto()
  const [select, setSelect] = useState(false)
  const [open, setOpen] = useState(false)
  const [coin, setCoin] = useState(null)

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === '/') {
        setSelect((prev) => !prev)
      }
    }

    document.addEventListener('keypress', keypress)
  }, [])

  function handleSelect(coinName) {
    setOpen(true)
    setCoin(crypto.find((c) => c.id === coinName).id)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        onOpenChange={setSelect}
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

      <Modal
        footer={null}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <CoinModal coin={coin} />
      </Modal>
    </Layout.Header>
  )
}
