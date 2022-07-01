import fs from 'fs';

import {
  getGameInfo,
  addWord,
  removeWord,
  viewDictionary,
  resetGame,
  loadGame,
  saveGame,
} from './memory';



// Helper function to remove all memory_[NAME].json files in
// the current directory.
function removeSavedGames() {
  fs.readdirSync('./')
    .filter(file => /^memory_[a-zA-Z0-9]+\.json$/.test(file))
    .forEach(file => fs.unlinkSync('./' + file));
}

function clear() {
  removeSavedGames();
  resetGame();
}

beforeAll(() => {
  clear();
});

afterEach(() => {
  clear();
});

describe('addWord', () => {
  test('adding the same word twice', () => {
    expect(() => addWord('hello')).not.toThrow(Error);
    expect(() => addWord('hello')).toThrow(Error);
  });

  // TODO: more tests
});

describe('removeWord', () => {
  test('No such word', () => {
    expect(() => removeWord('hello')).toThrow(Error);
  });

  test('Double remove', () => {
    addWord('hello');
    expect(() => removeWord('hello')).not.toThrow(Error);
    expect(() => removeWord('hello')).toThrow(Error);
  });

  // TODO: more tests
});

// TODO: your other tests here
describe('viewDictionary', () => {
  test('no clues remain', () => {
    addWord('hello'); 
    expect(viewDictionary()).toMatchObject({
      dictionary: [ 'hello' ],
    });
    addWord('Rex');
    expect(viewDictionary()).toMatchObject({
      dictionary: [ 'hello', 'Rex' ],
    });
    expect(() => viewDictionary()).not.toThrow(Error);
    expect(() => viewDictionary()).toThrow(Error);
  });

  test('inactive game', () => {
    expect(() => removeWord('hello')).toThrow(Error);
    expect(() => removeWord('hello')).toThrow(Error);
    expect(() => removeWord('hello')).toThrow(Error);
    expect(() => viewDictionary()).not.toThrow(Error);
  });
  // TODO: more tests
});

test('resetGame', () => {
  addWord('hello');
  expect(getGameInfo()).toMatchObject({
    score: 1, 
    mistakesRemaining: 3,
    cluesRemaining: 3,
  });
  expect(() => resetGame()).not.toThrow(Error);
  expect(getGameInfo()).toMatchObject({
    score: 0, 
    mistakesRemaining: 3,
    cluesRemaining: 3,
  });
});

describe('saveGame', () => {
  test('Error', () => {
    expect(() => saveGame('')).toThrow(Error);
    expect(() => saveGame('34#@$abc')).toThrow(Error);
    expect(() => saveGame('abc')).not.toThrow(Error);
    expect(() => saveGame('abc')).toThrow(Error);
  });
});


describe('loadGame', () => {
  test('Error', () => {
    expect(() => loadGame('')).toThrow(Error);
    expect(() => saveGame('34#@$abc')).toThrow(Error);
    expect(() => loadGame('abc')).toThrow(Error);
    expect(() => saveGame('abc')).not.toThrow(Error);
    expect(() => loadGame('abc')).not.toThrow(Error);
  })
});
