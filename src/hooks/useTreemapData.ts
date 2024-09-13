import { useFlowTypeTimeData } from './useFlowTypeTimeData'
import { useValueStreamData } from './useValueStreamData'

export const useTreemapData = () => {
  const flowTypeTimeData = useFlowTypeTimeData()
  const valueStreamData = useValueStreamData()

  return { valueStreamData, flowTypeTimeData }
}
