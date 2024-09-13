import FlowModelerAnalysis from '@/data/FlowModelerAnalysis.json'
import { color } from '@planview/pv-utilities'
import { lighten, transparentize } from 'polished'
import { capitalize, unique } from 'radash'
import {
  FaCheckCircle,
  FaPowerOff,
  FaRegPauseCircle,
  FaRegPlayCircle,
  FaStopCircle,
} from 'react-icons/fa'

const borderRadius = 8
const phaseOrder = ['ideate', 'create', 'release', 'operate'] as const
const flowStates = ['new', 'active', 'waiting', 'done', 'canceled'] as const

const getPhaseColor = (phase: (typeof phaseOrder)[number]) => {
  switch (phase) {
    case 'ideate':
      return color.gray500
    case 'create':
      return color.gray500
    case 'release':
      return color.gray500
    case 'operate':
      return color.gray500
  }
}

const getFlowStateColor = (state: (typeof flowStates)[number]) => {
  switch (state) {
    case 'new':
      return color.yellow400
    case 'active':
      return color.blue400
    case 'waiting':
      return color.red400
    case 'done':
      return color.green400
    case 'canceled':
      return color.gray500
  }
}

const getFlowStateIcon = (state: (typeof flowStates)[number]) => {
  switch (state) {
    case 'new':
      return <FaRegPlayCircle />
    case 'active':
      return <FaPowerOff />
    case 'waiting':
      return <FaRegPauseCircle />
    case 'done':
      return <FaCheckCircle />
    case 'canceled':
      return <FaStopCircle />
  }
}

const fontSize = 12
const headerHeight = 24
const border = {
  borderTopWidth: 4,
  borderBottomWidth: 4,
  borderLeftWidth: 4,
  borderRightWidth: 4,
}

export const useValueStreamData = () => {
  let result = [
    {
      id: 'root',
    },

    ...phaseOrder.map((phase) => ({
      id: phase,
      name: phase,
      parent: 'root',
      style: {
        container: {
          ...border,
          borderRadius,

          backgroundColor: transparentize(0, getPhaseColor(phase)),

          // borderColor: transparentize(0.3, getPhaseColor(phase)),
          height: '100%',
        },
      },

      header: (
        <div
          style={{
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize,
            color: 'white',
            textAlign: 'center',
            background: getPhaseColor(phase),
            borderRadius,
            height: headerHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {phase}
        </div>
      ),
    })),
  ]
  const artifactTypes = FlowModelerAnalysis.types

  artifactTypes.forEach((artifactType) => {
    phaseOrder.forEach((phase) => {
      const { stateKeys } = artifactType[phase]

      stateKeys.forEach((stateKey) => {
        const stateDetails = artifactType.states[stateKey]
        const { flowStates, bottleneck, key, label } = stateDetails

        flowStates.forEach((flowState) => {
          result = [
            ...result,

            {
              id: `${phase}-${flowState}`,
              name: flowState,
              parent: phase,
              style: {
                container: {
                  ...border,
                  ...{
                    borderLeftWidth: 8,
                    borderRightWidth: 8,
                  },
                  borderRadius,
                  marginTop: headerHeight,
                },
              },
              tooltip: <>{`${phase}-${flowState}`}</>,
              header: (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize,
                    height: headerHeight,
                    backgroundColor: getFlowStateColor(flowState),
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    borderRadius,
                    paddingLeft: 4,
                  }}
                >
                  {getFlowStateIcon(flowState)}
                  <div style={{ paddingLeft: 4 }}> {capitalize(flowState)}</div>
                </div>
              ),
            },

            // CHILD
            {
              id: key,
              name: label,
              parent: `${phase}-${flowState}`,
              currentArtifactCount:
                bottleneck.currentArtifactCount === 0
                  ? 1
                  : bottleneck.currentArtifactCount,
              // bottleneck.currentArtifactCount,
              tooltip: <></>,

              style: {
                container: {
                  background:
                    bottleneck.currentArtifactCount === 0
                      ? color.gray50
                      : lighten(0.2, getFlowStateColor(flowState)),
                  borderRadius,
                  ...border,
                  ...{
                    borderLeftWidth: 12,
                    borderRightWidth: 12,
                  },
                  marginTop: headerHeight,
                },
              },
              content: (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                    fontSize,
                    color: 'black',
                  }}
                >
                  <p
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {label}
                  </p>
                  {bottleneck.currentArtifactCount > 0 && (
                    <div
                      style={{
                        width: 'min-content',
                        paddingTop: 1,
                        paddingLeft: 4,
                        paddingRight: 4,
                        borderRadius: '50%',
                        backgroundColor: lighten(
                          0.25,
                          getFlowStateColor(flowState)
                        ),
                      }}
                    >
                      {bottleneck.currentArtifactCount}
                    </div>
                  )}
                </div>
              ),
              ...stateDetails,
            },
          ]
        })
      })
    })
  })

  const data = unique(result, (r) => r.id)

  return data
}

/**
 * [
 *  { id: 'root' },
 *
 * // PHASES
 *  { id: 'ideate', name: 'ideate', parent: 'root' },
 *  { id: 'create', name: 'create', parent: 'root' },
 *  { id: 'release', name: 'release', parent: 'root' },
 *  { id: 'operate', name: 'operate', parent: 'root' },
 *
 * // FLOW STATES
 *  { id: 'new-ideate', name: 'new', parent: 'ideate' },
 *  { id: 'active-ideate', name: 'active', parent: 'ideate' },
 *  { id: 'new-create', name: 'new', parent: 'create' },
 *  { id: 'active-create', name: 'active', parent: 'create' },
 *  ...
 *
 * // ARTIFACT TYEPS
 *  { id: 'open', name: 'open', parent: 'new-ideate' },
 *  { id: 'in-refinement', name: 'in-refinement', parent: 'active-ideate' },
 *  ...
 *
 * // ARTIFACTS
 *  { id: 'artifact-1', name: 'artifact-1', parent: 'open' },
 *
 * ]
 *
 *
 */
