import ReactDOMServer from 'react-dom/server'

import { InitialNode } from '@/components/molecules/StyledTreeMap'

export const ChildTile = ({ node }: { node: InitialNode }) => {
  const nodeArea = node.width * node.height
  const shouldShowDetails = nodeArea > 4000

  const {
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
    borderBottomWidth,
    ...containerStyles
  } = node.data.data.style.container

  return (
    <div
      style={{
        ...containerStyles,
        height: '100%',
        overflow: 'hidden',
        textAlign: 'text-center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      data-tooltip-id='childTileTooltip'
      data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
        node.data.data?.tooltip
      )}
    >
      {shouldShowDetails && node.data.data?.content}
    </div>
  )
}
