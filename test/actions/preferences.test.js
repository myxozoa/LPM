import * as actions from '../../app/actions/preferences';

describe('actions', () => {
  it('should create setSection action properly', () => {
    expect(actions.setSection('testSection')).toEqual({
      type: 'SET_SECTION',
      payload: 'testSection'
    });
  });

  it('should create setRepo action properly', () => {
    expect(actions.setRepo('testRepo')).toEqual({
      type: 'SET_REPO',
      payload: 'testRepo'
    });
  });

  it('should create setWorkingDirectory action properly', () => {
    expect(actions.setWorkingDirectory('C:/test')).toEqual({
      type: 'SET_WORKING_DIRECTORY',
      payload: 'C:/test'
    });
  });

  it('should create setAlwaysOnTop actions properly', () => {
    expect(actions.setAlwaysOnTop(true)).toEqual({
      type: 'SET_ALWAYS_ON_TOP',
      payload: true
    });
  });
});
