import '@/styles/globals.css'
import { Graph, UserAdmin } from '@planview/pv-icons'
import {
  LogoPlanview,
  NavigationBar,
  Toolbar as PVDSToolbar,
  ToolbarButtonEmpty,
  ToolbarButtonEmptyInverse,
  ToolbarButtonGroup,
  ToolbarDropdownMenu,
  ToolbarSectionLeft,
  ToolbarSectionRight,
} from '@planview/pv-toolbar'
import { StepSlider } from '@planview/pv-uikit'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  chartIndexAtom,
  metricState,
  noOfTilesDisplayedIndexState,
  parentState,
} from '@/atoms/treemap'

export const Toolbar = () => {
  const [noOfTilesDisplayedIndex, setNoOfTilesDisplayedIndex] = useRecoilState(
    noOfTilesDisplayedIndexState
  )
  const setChartIndex = useSetRecoilState(chartIndexAtom)
  const [parent, setParent] = useRecoilState(parentState)
  const [metric, setMetric] = useRecoilState(metricState)

  return (
    <>
      <NavigationBar logo={<LogoPlanview />}>
        <ToolbarSectionLeft>
          <ToolbarButtonEmptyInverse preventLabelCollapse>
            Hackathon 2024
          </ToolbarButtonEmptyInverse>
        </ToolbarSectionLeft>
      </NavigationBar>
      <PVDSToolbar label=''>
        <ToolbarSectionLeft>
          <ToolbarButtonGroup>
            <ToolbarButtonEmpty
              onClick={() => {
                setChartIndex(0)
                setMetric('currentArtifactCount')
                setParent('parent')
              }}
            >
              Bottlenecks
            </ToolbarButtonEmpty>
            <ToolbarButtonEmpty
              onClick={() => {
                setChartIndex(1)
                setMetric('flowTime')
                setParent('flowType')
              }}
            >
              Flow Time by Flow Item Type
            </ToolbarButtonEmpty>
          </ToolbarButtonGroup>
        </ToolbarSectionLeft>
        <ToolbarSectionRight>
          <ToolbarDropdownMenu
            disabled
            label={parent}
            // onActivateItem={() => {}}
            trigger={{
              'aria-label': parent,
              fluid: true,
              icon: <UserAdmin />,
              label: parent,
              tooltip: 'Press this to open dropdown',
              withCaret: true,
            }}
          >
            {/* <ListItem label="Age" />
            <ListItem label="Flow Time" />
            <ListItem label="Status" /> */}
          </ToolbarDropdownMenu>
          <ToolbarDropdownMenu
            disabled
            label={metric}
            // onActivateItem={() => {}}
            trigger={{
              'aria-label': metric,
              fluid: true,
              icon: <Graph />,
              label: metric,
              tooltip: 'Press this to open dropdown',
              withCaret: true,
            }}
          >
            {/* <ListItem label="Age" />
            <ListItem label="Flow Time" />
            <ListItem label="Status" /> */}
          </ToolbarDropdownMenu>
          <div>
            {/* <Label htmlFor="tiles-step-slider" id="tiles-step-slider-label">
              Amount
            </Label> */}
            <StepSlider
              id={'tiles-step-slider'}
              aria-label='Amount'
              index={noOfTilesDisplayedIndex}
              onChange={setNoOfTilesDisplayedIndex}
              steps={['100', '300', '500', '700', '900']}
            />
          </div>
        </ToolbarSectionRight>
      </PVDSToolbar>
    </>
  )
}
