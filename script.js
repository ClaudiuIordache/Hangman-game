import { wordsArray } from './modules/data.js';

const container = document.getElementById('container');
const keyboard = document.getElementsByClassName('keyboard');
const text = document.getElementById('text');
const reset = document.getElementsByClassName('reset')[0];

let stringOfWords =
  'abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar boxful buckaroo buffalo buffoon buxom buzzard buzzing buzzwords caliph cobweb cockiness croquet crypt curacao cycle daiquiri dirndl disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo giaour gizmo glowworm glyph gnarly gnostic gossip grogginess haiku haphazard hyphen iatrogenic icebox injury ivory ivy jackpot jaundice jawbreaker jaywalk jazziest jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole khaki kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquis matrix megahertz microwave mnemonic mystify naphtha nightclub nowadays numbskull nymph onyx ovary oxidize oxygen pajama peekaboo phlegm pixel pizazz pneumonia polka pshaw psyche puppy puzzling quartz queue quips quixotic quiz quizzes quorum razzmatazz rhubarb rhythm rickshaw schnapps scratch shiv snazzy sphinx spritz squawk staff strength strengths stretch stronghold stymied subway swivel syndrome thriftless thumbscrew topaz transcript transgress transplant triphthong twelfth twelfths unknown unworthy unzip uptown vaporize vixen vodka voodoo vortex voyeurism walkway waltz wave wavy waxy wellspring wheezy whiskey whizzing whomever wimpy witchcraft wizard woozy wristwatch wyvern xylophone yachtsman yippee yoked youthful yummy zephyr zigzag zigzagging zilch zipper zodiac zombie';
let arrayOfWords = stringOfWords.split(' ');
let highscore = 0;
let constructedWord = [];
let noOfGuesses = 10;
let currentWord = '';
let isItThere = false;
let currentGuess = [];
let finalWord = [];
let score = 0;

const guessedLetters = document.createElement('p');
text.appendChild(guessedLetters);

let alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
let alphabetButton = [];

let firstRow = document.getElementById('firstRow');
let secondRow = document.getElementById('secondRow');
let thirdRow = document.getElementById('thirdRow');

const getNewWord = () => {
  currentWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  return currentWord;
};

for (var i = 0; i < alphabet.length; i++) {
  alphabetButton[i] = document.createElement('button');
  alphabetButton[i].innerText = alphabet[i];
  i < 10
    ? firstRow.appendChild(alphabetButton[i])
    : i < 19
    ? secondRow.appendChild(alphabetButton[i])
    : thirdRow.appendChild(alphabetButton[i]);
}

let currentImg = document.createElement('img');
currentImg.src = '/img/hangman0.png';
container.appendChild(currentImg);

// fetch(
//   'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=8000&maxCorpusCount=-1&minDictionaryCount=3&maxDictionaryCount=-1&minLength=6&maxLength=12&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
// )
//   .then((response) => response.json())
//   .then((data) => Hangman(data.word));

currentWord = getNewWord();

const Hangman = (word) => {
  currentImg.src = '/img/hangman0.png';
  container.appendChild(currentImg);

  for (let i = 0; i < word.length; i++) {
    if (i < word.length - 1) {
      constructedWord[i] = '_ | ';
    } else {
      constructedWord[i] = ' _ ';
    }
  }

  guessedLetters.innerText = `Guess the word: ${constructedWord.join(
    ''
  )} \n HIGHSCORE:${highscore}`;
  guessedLetters.setAttribute('id', 'guessedLetters');

  finalWord = [];
  score = 0;

  for (let i = 0; i < alphabet.length; i++) {
    alphabetButton[i].disabled = false;
    alphabetButton[i].setAttribute('id', 'button');
    onClick(alphabetButton[i]);
  }
};

function onClick(button) {
  button.onclick = () => {
    currentGuess = button.innerText.toLowerCase();
    if (finalWord.join('') != currentWord && noOfGuesses != 0) {
      isItThere = false;
      let noOfEncounters = 0;

      for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] == currentGuess) {
          if (i < currentWord.length - 1) {
            constructedWord[i] = currentWord[i] + ' | ';
          } else {
            constructedWord[i] = currentWord[i];
          }
          finalWord[i] = currentWord[i];
          isItThere = true;
          noOfEncounters++;
          guessedLetters.innerText = `Guess the word: ${constructedWord.join(
            ''
          )} \n HIGHSCORE:${highscore}`;
        }

        guessedLetters.setAttribute('id', 'guessedLetters');
      }
      if (isItThere) {
        button.disabled = true;
        score += 100;
        button.removeAttribute('id', 'button');
        button.setAttribute('id', 'buttonAfterClickRight');
        if (noOfEncounters == 1) {
          console.log(
            `${currentGuess} is found in the word one time, ${score}`
          );
        } else {
          console.log(
            `${currentGuess} is found in the word ${noOfEncounters} times, ${score}`
          );
        }
      } else {
        score -= 50;
        button.disabled = true;
        button.removeAttribute('id', 'button');
        button.setAttribute('id', 'buttonAfterClickWrong');
        noOfGuesses--;
        console.log(
          `The number of remaining attempts: ${noOfGuesses}, scor: ${score}`
        );

        currentImg.src = '/img/hangman' + (10 - noOfGuesses) + '.png';
        container.appendChild(currentImg);
      }

      if (finalWord.join('') == currentWord) {
        if (score > highscore) {
          highscore = score;
          console.log(`Sunt la if highscore ${highscore}}`);
        }
        guessedLetters.innerText = `Congrats! You guessed the word: ${finalWord.join(
          ''
        )}\n HIGHSCORE = ${highscore}`;
        console.log(
          `Congrats! You guessed the word: ${finalWord.join(
            ''
          )}\n scor: ${score}`
        );
      } else if (noOfGuesses == 0 && finalWord.join('') !== currentWord) {
        console.log(`I'm sorry! You didn't guess the word!`);
        guessedLetters.innerText = `I'm sorry! You didn't guess the word!\n The solution was: ${currentWord}`;
      }
    }
  };
}

Hangman(currentWord);

reset.addEventListener('click', () => {
  noOfGuesses = 10;
  constructedWord = [];
  container.removeChild(currentImg);
  currentWord = getNewWord();
  Hangman(currentWord);
});
