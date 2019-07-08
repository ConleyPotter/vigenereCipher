let message;
let password;
let gameCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
  // as soon as the button is hit ,then start stripping the information from the input boxes
  let cipher;

  const button = document.getElementById('submit');
  button.addEventListener('click', () => {
    message = document.getElementById('message-to-encode').value.toUpperCase();
    password = document.getElementById('password').value.toUpperCase();
    const passwordSpan = document.getElementById('password-overlay');
    const messageSpan = document.getElementById('message-overlay');
    password = buttonClick1(message, password, passwordSpan, messageSpan);

    // reveal the rest of the page
    document.getElementById('hidden-at-first').style.display = 'block';

    // figure out the correct solution
    // cipher = encrypt(passwordRepeated, message);

    // then start the "game"
    const letters = document.getElementsByClassName('letter');
    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      const event = new CustomEvent('letterPressed', 
        { detail: { letter, col: letter.classList[1].charAt(4), row: letter.classList[2].charAt(4) } } 
      );
      letter.addEventListener('click', () => {
        document.dispatchEvent(event);
      })
    }
  });

});

document.addEventListener('letterPressed', (event) => {
  const letter = event.detail.letter;
  const col = event.detail.col;
  const row = event.detail.row;
  
  if (col == message[gameCounter] && row == password[gameCounter]) {
    gameCounter += 1;
    // highlight the letter green
    letter.classList.add('correct');
    // check if this is the first letter
    if (gameCounter === 0) {
      // if it is, display a congratulatory message and explain some about the cipher
      openModal('congratulatory');
    }
    setTimeout(() => {
      letter.classList.remove('correct');
    }, 5000);
    // check if the game has been won
    if (gameCounter === message.length) {
      gameCounter = 0;
      // and display the winning modal if it has been
      openModal('winning');
    }
  } else {
    // highlight the letter red
    letter.classList.add('incorrect');
    // check if this is the first letter pressed
    if (gameCounter === 0) {
      // if it is, display an explanatory message about how to play
      openModal('explanatory');
    } 
    setTimeout(() => {
      letter.classList.remove('incorrect');
    }, 5000);
  }
});

const buttonClick1 = function(message, password, passwordSpan, messageSpan) {

  messageSpan.innerHTML = message.toUpperCase();
  if (password.length < message.length) {
    passwordRepeated = '';
    let passwordCharCounter = 0;
    for (let i = 0; i < message.length; i++) {
      if (message.charAt(i) == ' ') {
        passwordRepeated += ' ';
      } else {
        passwordRepeated += password.charAt(passwordCharCounter % password.length);
        passwordCharCounter += 1;
      }
    }
    passwordSpan.innerHTML = passwordRepeated.toUpperCase();
    return passwordRepeated;
  } else if (password.length === message.length) {
    passwordSpan.innerHTML = password.toUpperCase();
  } else {
    messageSpan.innerHTML = 'The password must be longer than the message you want to encode.'
  }
  return null;
}

const openModal = function(type) {
  modalWindow = document.getElementById('jsModal')
  modalWindow.classList.add('open');
  console.log('here')

  messageTag = document.getElementById('modal-message')
  switch(type) {
    case 'congratulatory':
      messsageTag.innerHTML = 'Wow, you really know your stuff. If you\'d like to keep playing, feel free to close this window and continue. However, it seems like you know what you\'re doing, so feel free to read some more about Vigenere\'s Cipher <a href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher">here</a>. Thanks for playing!'
      break;
    case 'winning':
      messageTag.innerHTML = 'Congratulations! You won! Thanks for playing. If you\'d like to learn more about Vigenere\'s Cipher, read some more <a href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher">here.</a>'
      break;
    case 'explanatory':
      messageTag.innerHTML = 'Need some help? Remember, the column corresponds with the letters in the message you want to encode. The row corresponds with the password you chose. Pick out letters in progress, first use the first letter in the message as the column, and go down to the first letter in the password row to find the correct letter for you ciphered text.'
      break;
    default: 
      break;
    }
  
  closeButton = document.getElementById('jsModalClose');
  overlay = document.getElementById('jsOverlay');

  closeButton.addEventListener('click', () => {
    modalWindow.classList.remove('open')
  });

  overlay.addEventListener('click', () => {
    modalWindow.classList.remove('open')
  });
  
}