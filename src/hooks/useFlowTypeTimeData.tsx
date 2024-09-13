import ArtifactsData from '@/data/Artifacts.json'
import { scalePower } from '@visx/scale'
import { transparentize } from 'polished'
import { max, unique } from 'radash'
import { useRecoilValue } from 'recoil'
import {
  metricState,
  noOfTilesDisplayedState,
  parentState,
} from '@/atoms/treemap'
import { PVDSColors, PVDSIcons } from '@/constants/PVDS'

import { ChildNode } from '@/components/organisms/TreeMap'
import moment from 'moment'

const formatMetric = (value: string) =>
  +moment.duration(value).asDays().toFixed()

export const useFlowTypeTimeData = () => {
  const parent = useRecoilValue(parentState)
  const metric = useRecoilValue(metricState)
  const noOfTilesDisplayed = useRecoilValue(noOfTilesDisplayedState)

  const dataset = ArtifactsData.artifacts.slice(0, noOfTilesDisplayed)
  const maxMetricValue = max(dataset.map((n) => formatMetric(n.flowTime))) ?? 0

  const colorScale = scalePower<number>({
    domain: [0, maxMetricValue],
    range: [0.9, 0.7],
  })

  const fontSizeScale = scalePower<number>({
    domain: [0, maxMetricValue],
    range: [8, 16],
  })

  const childrenNodes = [
    ...dataset.map((child) => {
      const flowType = child[parent]
      const flowTime = formatMetric(child[metric])
      const color = PVDSColors[flowType]
      const scaledColor = color
        ? transparentize(colorScale(flowTime), color)
        : 'transparent'

      return {
        ...child,
        parent: flowType,
        flowTime,
        badge: `${flowTime} Days`,
        tooltip: <></>,
        style: {
          container: {
            background: scaledColor,
            // fontSize: fontSizeScale(flowTime),
            borderColor: 'white',
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
          },
        },
        content: (
          <>
            <span style={{ color: 'Black' }}>{child?.name}</span>
            <div style={{}}>{flowTime}</div>
          </>
        ),
      }
    }),
  ]

  const availableParents = unique(childrenNodes.map((child) => child[parent]))

  const parentNodes = availableParents.map((flowType) => {
    const color = PVDSColors[flowType]
    const icon = PVDSIcons[flowType]

    return {
      parent: 'root',
      id: flowType,
      name: flowType,
      style: {
        container: {
          borderColor: color,
          borderWidth: 4,
          fontSize: 12,
          color: 'white',
        },
      },
      header: (
        <div
          style={{
            backgroundColor: color,
            display: 'flex',
            flexDirection: 'row',
            padding: 2,
            width: 'min-content',
            color: 'white',
            alignItems: 'center',
          }}
        >
          <p style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            {flowType}
          </p>
          <div style={{ paddingLeft: 2 }}>{icon}</div>
        </div>
      ),
    }
  })

  const data = [{ id: 'root' }, ...parentNodes, ...childrenNodes] as ChildNode<
    typeof dataset
  >[]

  return data
}
