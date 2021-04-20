import isRatingValid from './isRatingValid';

describe('fn() isRatingValid', () => {
  it('returns true correctly', () => {
    expect(isRatingValid(5)).toBe(true);
    expect(isRatingValid(4.5)).toBe(true);
    expect(isRatingValid(4)).toBe(true);
    expect(isRatingValid(3.5)).toBe(true);
    expect(isRatingValid(3)).toBe(true);
    expect(isRatingValid(2.5)).toBe(true);
    expect(isRatingValid(2)).toBe(true);
    expect(isRatingValid(1.5)).toBe(true);
    expect(isRatingValid(1)).toBe(true);
    expect(isRatingValid(0.5)).toBe(true);
    expect(isRatingValid(0)).toBe(true);
  });

  it('returns false correctly', () => {
    expect(isRatingValid(6)).toBe(false);
    expect(isRatingValid(100)).toBe(false);
    expect(isRatingValid(4.9)).toBe(false);
    expect(isRatingValid(4.4)).toBe(false);
    expect(isRatingValid(3.8)).toBe(false);
    expect(isRatingValid(3.3)).toBe(false);
    expect(isRatingValid(2.7)).toBe(false);
    expect(isRatingValid(2.2)).toBe(false);
    expect(isRatingValid(1.6)).toBe(false);
    expect(isRatingValid(1.1)).toBe(false);
    expect(isRatingValid(0.6)).toBe(false);
    expect(isRatingValid(0.2)).toBe(false);
    expect(isRatingValid(-1)).toBe(false);
  });
});
