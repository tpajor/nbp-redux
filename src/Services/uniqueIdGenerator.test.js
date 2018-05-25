import uniqueIdGenerator from './uniqueIdGenerator';

describe('Unique id generator', () => {
  it('should gerate unique id', () => {
    const id1 = uniqueIdGenerator();
    const id2 = uniqueIdGenerator();

    expect(id1).not.toEqual(id2);
  });
});