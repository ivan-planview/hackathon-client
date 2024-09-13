import { InitialNode } from '@/components/molecules/StyledTreeMap'

export const ParentTile = ({ node }: { node: InitialNode }) => {
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
      }}
    >
      {node.data.data?.header}
    </div>
  )
}
