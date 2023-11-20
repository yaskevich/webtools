# Webtools of Philology.BY
Language-related web tools which are could be of use for a linguist.

### 1. Scientific transliteration tool for Belarusian and Russian

It is one-to-one transliteration of Belarusian and Russian texts by means of the letters of Latin (rather Latin-based/Roman) alphabet, which is called *romanization*.

It may be of use for preparing a paper for international publication providing Russian or Belarusian examples. Romanized representation is usually done for readability. If the readers are not supposed to be able to read Cyrillic texts, but may be interested in getting to know the formal structure of a text sample.

### 2. Unicode character decoder

It's quite often when regular expressions or other ways to process a text by means of pattern search do not work as expected. It could be related to errors produced by OCR or to inaccurate user input. E.g. the words of the languages with Cyrillic alphabets are typed with English keyboard layout. This tool helps to see real names of same-looking letters of any provided text.

### 3. Practical transcription of Belarusian (2023)

Sometimes, non-native speakers need to know how to spell out the Belarusian texts &mdash; without prior knowledge of Belarusian. For example, to recite a poetry or to sing a song. This is my **experiment** on converting Belarusian orthography into form readable by **English speakers**. It does not comply with any standard.

------

### Development

Original project of 2018 had client-server architecture. The client was a bunch of HTML files and JQuery-based JavaScript code. The server was a NodeJS (ExpressJS) application. Basically, it was only needed for retrieving Unicode info.

The project was rewritten in November 2023 being redesigned as a static Vue3/TypeScript application.

#### Client application

Two build types are available:

- Unicode characters data are fetched from external API. `VITE_API` environment variable is set and points put out to the endpoint of external API. As for now, [UCD API](https://ucdapi.org/) is in use. Build size is less than 100kb. Single query from UI is limited to 255 characters.
- Unicode characters dictionary is hard-coded into the app. `VITE_API` environment variable is unset. Build size is about 7Mb.

`VITE_API` environment variable is picked up from the `.env` file in `client` directory.

##### Project Setup


```sh
cd client
```

```sh
npm install
```

###### Compile and Hot-Reload for Development

```sh
npm run dev
```

###### Type-Check, Compile and Minify for Production

```sh
npm run build
```

###### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
