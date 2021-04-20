import getFormattedRating from './getFormattedRating';

describe('fn() getFormattedRating', () => {
  it('returns correct rating', () => {
    expect(getFormattedRating(50)).toBe(5);
    expect(getFormattedRating(4.8)).toBe(4.5);
    expect(getFormattedRating(4.2)).toBe(4);
    expect(getFormattedRating(3.7)).toBe(3.5);
    expect(getFormattedRating(3.1)).toBe(3);
    expect(getFormattedRating(2.9)).toBe(2.5);
    expect(getFormattedRating(2.1)).toBe(2);
    expect(getFormattedRating(1.6)).toBe(1.5);
    expect(getFormattedRating(1.3)).toBe(1);
    expect(getFormattedRating(0.8)).toBe(0.5);
    expect(getFormattedRating(0.4)).toBe(0);
  });
});
