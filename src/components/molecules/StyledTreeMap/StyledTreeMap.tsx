import { fallbackZero } from '@/utils/fallbackZero'
import { a, useTransition } from '@react-spring/web'
import {
  HierarchyNode,
  HierarchyRectangularNode,
} from '@visx/hierarchy/lib/types'
import { unique } from 'radash'

import { ChildTile } from '@/components/atoms/ChildTile'
import { ParentTile } from '@/components/atoms/ParentTile'

export type InitialNode = HierarchyRectangularNode<HierarchyNode<ChildNode>> & {
  width: number
  height: number
  top: number
  left: number
}

export const StyledTreeMap = ({
  treemap,
}: {
  treemap: HierarchyRectangularNode<HierarchyNode<ChildNode>>
}) => {
  const descendants = treemap.descendants().reverse()

  const depths_y0 = Array.from({ length: treemap.height }, (_, i) =>
    unique(descendants.filter((n) => n.depth === i).map((n) => n.y0))
  )

  const initialNodes = descendants.map((node) => {
    const {
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      borderLeftWidth,
      borderRightWidth,
      borderTopWidth,
      borderBottomWidth,
    } = node.data.data?.style?.container ?? {}
    const ml = fallbackZero(marginLeft)
    const mr = fallbackZero(marginRight)
    const bl = fallbackZero(borderLeftWidth)
    const br = fallbackZero(borderRightWidth)
    const bb = fallbackZero(borderBottomWidth)
    const mb = fallbackZero(marginBottom)

    const prevDepth = node.depth - 1
    const diffs =
      depths_y0.filter((depths, index) => {
        return depths.includes(node.y0) && index < node.depth
      }).length - (node.y0 === 0 ? 1 : 0)
    const isOverlapping = depths_y0[prevDepth]?.includes(node.y0)

    const bt = isOverlapping
      ? fallbackZero(borderTopWidth) * (node.y0 === 0 ? diffs + 1 : diffs)
      : 0
    const mt = isOverlapping ? fallbackZero(marginTop) * diffs : 0

    // if (node.data.data.name === 'waiting')
    //   console.log({
    //     name: node.data.data.name,
    //     y0: node.y0,
    //     mt,
    //     bt,
    //     diffs,
    //     depth: node.depth,
    //     depths_y0,
    //     isOverlapping,
    //   })

    return {
      ...node,
      width: Math.max(fallbackZero(node.x1 - node.x0) - ml - mr - bl - br, 0),
      height: Math.max(fallbackZero(node.y1 - node.y0) - mt - mb - bt - bb, 0),
      top: fallbackZero(node.y0) + mt + bt,
      left: fallbackZero(node.x0) + ml + bl,
    }
  })

  const transitions = useTransition(initialNodes, {
    key: (item: InitialNode) => {
      return item.data.id
    },
    from: ({ top, left, width, height }: InitialNode) => ({
      top,
      left,
      width,
      height,
      opacity: 0,
    }),
    enter: ({ top, left, width, height }: InitialNode) => ({
      top,
      left,
      width,
      height,
      opacity: 1,
    }),
    update: ({ top, left, width, height }: InitialNode) => ({
      top,
      left,
      width,
      height,
    }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
  })

  return transitions((style, node) => {
    if (node.value === 0) return null
    if (node.depth === 0) return null
    const isParent = node.depth < treemap.height
    const isChild = node.depth === treemap.height

    return (
      <a.div
        key={node.data.id}
        style={{
          userSelect: 'none',
          position: 'absolute',
          pointerEvents: isChild ? 'auto' : 'none',
          ...style,
        }}
      >
        {isChild && <ChildTile node={node} />}
        {isParent && <ParentTile node={node} />}
      </a.div>
    )
  })
}
