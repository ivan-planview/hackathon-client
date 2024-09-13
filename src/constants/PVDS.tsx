import {
  FlowItemsDebt,
  FlowItemsDefect,
  FlowItemsFeature,
  FlowItemsRisk,
  FlowItemsSupport,
} from '@planview/pv-icons'
import { color, iconSizes } from '@planview/pv-utilities'

export const flowTypes = [
  'Feature',
  'Defect',
  'Risk',
  'Debt',
  'Supporting',
] as const

export const PVDSColors: Record<(typeof flowTypes)[number], string> = {
  Feature: color.green400,
  Defect: color.orange400,
  Risk: color.yellow400,
  Debt: color.purple400,
  Supporting: color.navy200,
}

export const PVDSColorsRange: Record<
  (typeof flowTypes)[number],
  [string, string]
> = {
  Feature: [color.green50, color.green300],
  Defect: [color.orange50, color.orange300],
  Risk: [color.yellow50, color.yellow300],
  Debt: [color.purple50, color.purple300],
  Supporting: [color.navy50, color.navy300],
}

export const PVDSIcons: Record<(typeof flowTypes)[number], JSX.Element> = {
  Feature: <FlowItemsFeature size={iconSizes.medium} />,
  Defect: <FlowItemsDefect size={iconSizes.medium} />,
  Risk: <FlowItemsRisk size={iconSizes.medium} />,
  Debt: <FlowItemsDebt size={iconSizes.medium} />,
  Supporting: <FlowItemsSupport size={iconSizes.medium} />,
}
