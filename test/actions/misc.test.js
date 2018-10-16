import * as actions from '../../app/actions/misc';

describe('actions', () => {
  it('should create saveToDB action properly', () => {
    expect(actions.saveToDB()).toEqual({
      type: 'SAVE'
    });
  });

  it('should create initialLoad action properly', () => {
    expect(actions.initialLoad()).toEqual({
      type: 'INITIAL_LOAD'
    });
  });
});
