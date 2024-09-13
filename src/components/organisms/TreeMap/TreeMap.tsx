import { useTreemapData } from '@/hooks/useTreemapData'
import { Treemap, hierarchy, stratify, treemapSquarify } from '@visx/hierarchy'
import { HierarchyNode } from '@visx/hierarchy/lib/types'
import { ParentSize } from '@visx/responsive'
import { Tooltip } from 'react-tooltip'
import { useRecoilValue } from 'recoil'
import { chartIndexAtom, metricState } from '@/atoms/treemap'

import { StyledTreeMap } from '@/components/molecules/StyledTreeMap'
// import { useRecoilValue } from 'recoil';
// import { flowTimeStateState } from 'src/atoms/treemap';

export type Datum<T extends unknown[]> = T[number]
export type ChildNode<T> = {
  id: string
  parent?: string
  name?: string
} & Datum<T[]>

export const TreeMap = () => {
  const metric = useRecoilValue(metricState)
  const chartIndex = useRecoilValue(chartIndexAtom)
  const { valueStreamData, flowTypeTimeData } = useTreemapData()

  const data = chartIndex === 0 ? valueStreamData : flowTypeTimeData

  const stratifiedData = stratify<(typeof data)[number]>()
    .id((datum) => datum.id)
    .parentId((datum) => datum?.parent)(data)
    .sum((datum) => {
      return datum[metric]
    })
    .sort(
      (
        a: HierarchyNode<ChildNode<typeof data>>,
        b: HierarchyNode<ChildNode<typeof data>>
      ) => {
        return (b?.value ?? 0) - (a?.value ?? 0)
      }
    )

  return (
    <>
      <ParentSize>
        {({ width, height }) => (
          <Treemap
            root={hierarchy(stratifiedData)}
            size={[width, height]}
            tile={treemapSquarify}
            round
          >
            {(treemap) => <StyledTreeMap treemap={treemap} />}
          </Treemap>
        )}
      </ParentSize>
      <Tooltip
        id='childTileTooltip'
        style={{
          backgroundColor: 'white',
          color: 'black',
        }}
      />
    </>
  )
}

// const groupedOrderedData = mapValues(
//   group(dataset, (datum) => datum?.[parent]),
//   (data: typeof dataset) => sort(data, (datum) => formatMetric(datum[metric]), true)
// );
