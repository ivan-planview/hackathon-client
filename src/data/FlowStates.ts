import ArtifactTypesStates from '@/data/ArtifactTypesStates.json';

import { ChildNode } from '@/components/organisms/TreeMap';

// const flowStates = ['New', 'Waiting', 'Active', 'Done', 'Canceled'];

// const parentNodes = flowStates.map((state) => ({
//   parent: 'root',
//   id: state,
//   name: state
// }));

const { artifactStates } = ArtifactTypesStates;

let parentNodes: ChildNode<typeof artifactStates> = [];
let childrenNodes: ChildNode<typeof artifactStates> = [];

artifactStates.forEach((state) => {
  parentNodes = [
    ...parentNodes,
    {
      parent: 'root',
      id: state.name,
      name: state.name,
      color: '#000000'
    }
  ];

  state.options.forEach((option) => {
    childrenNodes = [
      ...childrenNodes,
      {
        parent: state.name,
        id: option.option,
        name: option.option,
        color: '#000000'
      }
    ];
  });
});

// const childrenNodes = ArtifactTypesStates.artifactStates.map((state) => ({
//   parent: 'root',
//   id: state,
//   name: state
// }));

export const flowStatesNodes = [{ id: 'root' }, ...parentNodes, ...childrenNodes];

// console.log(flowStatesNodes);
