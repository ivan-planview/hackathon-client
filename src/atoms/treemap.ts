import { atom, selector } from 'recoil';

export const metricState = atom({
  key: 'metric',
  default: 'currentArtifactCount'
});

export const parentState = atom({
  key: 'parent',
  default: 'parent'
});

export const noOfTilesDisplayedIndexState = atom({
  key: 'noOfTilesDisplayedIndex',
  default: 2
});

export const noOfTilesDisplayedState = selector({
  key: 'noOfTilesDisplayed',
  get: ({ get }) => {
    const index = get(noOfTilesDisplayedIndexState);

    return (index + 1) * 100;
  }
});

export const chartIndexAtom = atom({
  key: 'chartIndex',
  default: 0
});
