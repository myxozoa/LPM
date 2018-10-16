import * as actions from '../../app/actions/students';

describe('actions', () => {
  it('should create student action properly', () => {
    expect(
      actions.addStudent({
        name: 'Test',
        username: 'test09',
        rating: 3
      })
    ).toEqual({
      type: 'ADD_STUDENT',
      payload: {
        name: 'Test',
        username: 'test09',
        rating: 3
      }
    });
  });

  it('should create remove student action properly', () => {
    expect(actions.removeStudent('testid')).toEqual({
      type: 'REMOVE_STUDENT',
      payload: 'testid'
    });
  });

  it('should create setRating action properly', () => {
    expect(actions.setRating('testid', 2)).toEqual({
      type: 'SET_RATING',
      payload: {
        id: 'testid',
        rating: 2
      }
    });
  });

  it('should create setName action properly', () => {
    expect(actions.setName('testid', 'Test Name Change')).toEqual({
      type: 'SET_NAME',
      payload: {
        id: 'testid',
        name: 'Test Name Change'
      }
    });
  });
});
