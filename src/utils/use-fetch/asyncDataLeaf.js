import daggy from 'daggy';

const AsyncDataLeaf = daggy.taggedSum('AsyncDataLeaf', {
  Loading: [],
  Success: ['data'],
  Error: ['error'],
});

export default AsyncDataLeaf;
