import { Avatar, Button, Card, Flex, Divider, Tag } from 'antd'
import { createStyles } from 'antd-style'
import styles from './ModalFix.module.css'

const { Meta } = Card
const useStyles = createStyles(({ token }) => ({
  root: {
    width: 3000,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
  },
  header: {
    borderBottom: 'none',
    paddingBottom: token.paddingXS,
  },
  body: {
    paddingTop: 0,
  },
}))

const stylesCard = {
  root: {
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    borderRadius: 8,
  },
  title: {
    fontSize: 19,
    fontWeight: 700,
  },
}

export default function CoinModal({ coin }) {
  const { styles: classNames } = useStyles()

  const actions = [
    <p>
      <h3>1 Hour: </h3>

      <Tag
        key={'green'}
        color={coin.priceChange1h > 0 ? 'green' : 'red'}
        variant={'outlined'}
      >
        {`% ${coin.priceChange1h}`}
      </Tag>
    </p>,

    <p>
      <h3>1 Day: </h3>

      <Tag
        key={'green'}
        color={coin.priceChange1d > 0 ? 'green' : 'red'}
        variant={'outlined'}
      >
        {`% ${coin.priceChange1d}`}
      </Tag>
    </p>,
    <p>
      <h3>1 Week: </h3>

      <Tag
        key={'green'}
        color={coin.priceChange1w > 0 ? 'green' : 'red'}
        variant={'outlined'}
      >
        {`% ${coin.priceChange1w}`}
      </Tag>
    </p>,
  ]

  const sharedCardProps = {
    classNames,
    actions,
  }
  const sharedCardMetaProps = {
    avatar: (
      <Avatar style={{ width: '50px', height: '50px' }} src={coin.icon} />
    ),
    description: `Volume:  ${coin.volume}`,
  }
  return (
    <Flex gap="medium">
      <Card
        {...sharedCardProps}
        title={`${coin.name} (${coin.symbol})`}
        styles={stylesCard}
        extra={<Button type="link">More</Button>}
        variant="borderless"
      >
        <Meta
          {...sharedCardMetaProps}
          title={`${coin.symbol} Rank: ${coin.rank}`}
        />
        <div className={styles.modalContent}>
          <Divider />

          <h3>Price: $ {coin.price.toFixed(2)}</h3>
          <h3>Price BTC: {coin.priceBtc}</h3>
          <h3>Market Cap: {coin.marketCap}</h3>
          <h3>Contract Addres: {coin.symbol}</h3>
        </div>
      </Card>
    </Flex>
  )
}
