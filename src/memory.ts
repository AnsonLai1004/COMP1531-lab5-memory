import fs from 'fs';

interface Game {
    score: number;
    mistakesRemaining: number;
    cluesRemaining: number;
    dictionary: string[];
}

const currentGame: Game = {
  score: 0,
  mistakesRemaining: 3,
  cluesRemaining: 3,
  dictionary: [],
};

// Note: key "dictionary" is NOT returned in this function.
export function getGameInfo() {
  return {
    score: currentGame.score,
    mistakesRemaining: currentGame.mistakesRemaining,
    cluesRemaining: currentGame.cluesRemaining,
  };
}

export function addWord(word: string) {
  // error if inactive 
  if (currentGame.mistakesRemaining === 0) {
    throw new Error(' ');
  }
  for (let element of currentGame.dictionary) {
    if (word === element) {
      // already exist 
      throw new Error(' ');
    }
  }
  currentGame.dictionary.push(word);
  currentGame.score++;
}

export function removeWord(word: string) {
  if (currentGame.mistakesRemaining === 0) {
    throw new Error(' ');
  }
  const dict = currentGame.dictionary;
  for (let i = 0; i < dict.length; i++) {
    if (word === dict[i]) {
      dict.splice(i, 1);
      currentGame.score++;
      return;
    }
  }
  currentGame.mistakesRemaining--;
  throw new Error(' ');
}

export function viewDictionary() {
  if (currentGame.mistakesRemaining === 0) {
    // inactive game
  } else {
    if (currentGame.cluesRemaining === 0) {
      throw new Error('');
    } else {
      currentGame.cluesRemaining--;
    }
  }
  return { dictionary: currentGame.dictionary };
}

export function resetGame() {
  currentGame.score = 0;
  currentGame.mistakesRemaining =3;
  currentGame.cluesRemaining = 3;
  currentGame.dictionary = [];
}

export function saveGame(name: string) {
  if (name === '' || name.match(/^[0-9A-Za-z]+$/) === null) {
    throw new Error('');
  }
  const filename = 'memory_' + name + '.json';
  if (fs.existsSync(filename) === true) {
    throw new Error('');
  }
  const data = JSON.stringify(currentGame, null, 4);
  fs.writeFileSync(filename, data);
}

export function loadGame(name: string) {
  if (name === '' || name.match(/^[0-9A-Za-z]+$/) === null) {
    throw new Error('');
  }
  const filename = 'memory_' + name + '.json';
  if (fs.existsSync(filename) === false) {
    throw new Error('');
  }
  const rawdata = fs.readFileSync(filename,'utf8');
  const data = JSON.parse(rawdata);
  currentGame.score = data.score;
  currentGame.mistakesRemaining = data.mistakesRemaining;
  currentGame.cluesRemaining = data.cluesRemaining;
  currentGame.dictionary = data.dictionary;
}
