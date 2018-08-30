[ DEPRECATED ] This project uses an old version of ml5.js.


# ML PONG

Machine Learning Pong it's an experimental version of the famous computer game Pong that aims to educate users on how machine learning tasks are trained through a fun gaming experience. The user is able to teach, in realtime, a neural network and then play the game in the browser using a set of assigned emojis as reference.


![ML PONG](public/images/doc01.jpg)

## How it works

ML Pong uses the P5 DeepLearn library https://github.com/cvalenzuela/p5-deeplearn-js to train the controllers and predict the output.

## Demo

Video Demo version runs in 2 different windows browsers and is sending the data through web sockets. (The repo for this project combines the game and the controller in one single page)

### [ML PONG](https://www.youtube.com/watch?v=koZYwOAHmQM&feature=youtu.be)
[![ML PONG](public/images/video.jpg)](https://www.youtube.com/watch?v=koZYwOAHmQM&feature=youtu.be)


## Usage

Currently version of the game runs the game and the controller at the same page.*

- Clone Repository.
- Create `private` directory inside of `/server` and add your `cert.pem` and `key.pem` certificates.
- Replace your credentials in the`server.js` file.
- Run `$ npm install`
- Start `$ npm start`

Project will run at port 3000.

## Test

https://am7673.itp.io:3000

![ML PONG](public/images/current.jpg)


## License

MIT
