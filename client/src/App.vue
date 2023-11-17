<template>
  <header class="sticky row color">
    <div class="col-sm-12 col-md-10 col-md-offset-1 color">
      <!-- <a href="/" class="logo color">Toolset</a> -->
      <button v-for="(val, key) in tools" :class="{ active: state === key }" @click="switchState(key)" :key="key">
        {{ val[0] }}
      </button>
    </div>
  </header>
  <div class="row">
    <div class="col-sm-12 col-md-10 col-md-offset-1">
      <h3>{{ tools[state][1] }}</h3>
      <hr />
      <textarea style="width: 100%; background-color: #fdfdfd40" class="uni" v-model="txt"></textarea>
      <div>
        <button type="button" class="cl" @click="test">Test</button>
        <button type="button" class="cl" @click="clear">Clear</button>
        <button type="button" class="char" :disabled="!txt" @click="run">{{ tools[state][2] }}</button>
      </div>
      <div class="section light result" style="margin-top: 20px" v-if="symbols || result">
        <div v-if="result" v-html="result"></div>
        <div v-if="symbols">
          <div class="row" v-for="(item, index) in symbols" :key="index">
            <div class="col-sm-1">
              <div class="box-colored">{{ item }}</div>
            </div>
            <div class="col-sm-11">
              <div class="box-colored">{{ dict?.[item] || '&lt;UNKNOWN&gt;' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="row color" style="width: 100%">
    <div class="col-sm-12 col-md-10 col-md-offset-1">
      <a href="https://en.wikipedia.org/wiki/Scientific_transliteration_of_Cyrillic" target="_blank">Wikipedia on
        Romanization</a>
      <div>Linguistic Toolset for character level processing.</div>
      <div>Транслітарацыя беларускіх тэкстаў для навуковых публікацый.</div>
    </div>
    <div class="col-sm-12 col-md-10 col-md-offset-1">
      &copy; <a href="https://yaskevich.com/" target="_blank" style="text-decoration: none">Alyaxey Yaskevich</a>, 2018,
      2023 @ <a href="https://philology.by/" target="_blank">Philology.BY</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import tables from '../../data/tables.json';
import unicode from '../../data/unicode-data.json';
import axios from 'axios';

const api = import.meta.env.VITE_API;

const symbols = ref([] as Array<string>);
const dict = reactive({} as { [key: string]: string });
const maps = tables as { [key: string]: { [key: string]: string } };
const path = window.location.pathname?.slice(1);
console.log('path', path);
const state = ref(path || 'bellat');
const txt = ref('');
const result = ref('');
const randomEmoji = String.fromCodePoint(128512 + Math.floor(Math.random() * 50));

const tools = {
  bellat: [
    'BEL ⇒ LAT',
    'Scientific transliteration (romanization) for Belarusian texts',
    'Transliterate',
    'Здароў, марозны, звонкі вечар! Здароў, скрыпучы, мяккі снег!',
  ],
  ruslat: [
    'RUS ⇒ LAT',
    'Scientific transliteration (romanization) for Russian texts',
    'Transliterate',
    'Мороз и солнце; день чудесный!',
  ],
  beleng: [
    'BEL ⇒ ENG',
    'Practical transcription of Belarusian texts for English speakers',
    'Transcript',
    'А пад мостам рыба з хвостам',
  ],
  char: [
    (window.screen.width > 450 ? 'Decoder ' : '') + randomEmoji,
    'Character codes',
    'Reveal characters!',
    '🐒 любіць coyc з coi, です',
  ],
} as { [key: string]: Array<string> };

const clear = () => {
  txt.value = result.value = '';
  symbols.value = [];
};

const switchState = (str: string | number) => {
  console.log('switch', str);
  state.value = String(str);
  history.pushState({}, '', '/' + str);
  clear();
};

const getData = async (char: string) => {
  if (!dict?.[char]) {
    const code = char?.codePointAt(0)?.toString(16)?.toUpperCase()?.padStart(4, '0');
    if (api) {
      // console.log('fetch from API', char, code);
      const response = await axios.get(`${api}/${code}`);
      dict[char] = response.data.name;
    } else {
      dict[char] = unicode.find(x => x.codeval === code)?.charname;
    }
  }
};

const run = async () => {
  console.log('run', state.value);
  const chars = Array.from(txt.value);

  if (state.value === 'char') {
    if (api && chars.length > 255) {
      result.value = '&lt;TEXT LENGTH IS MORE THAN 255 symbols!&gt;';
      console.log("text length!");
      return;
    }
    symbols.value = chars;
    await Promise.all(Array.from(new Set(chars)).map(getData));
  } else {
    let latin = chars.map(x => (x === '\n' ? '<br/>' : maps?.[state.value]?.[x] || x)).join('');
    if (state.value === 'beleng') {
      latin = latin
        .replace(/(?<=e|o|a|\s|-|ߴ)ⁱ(?=e|a)/g, 'y')
        .replace(/ (?=y\s)/g, '');
    }
    result.value = latin;
  }
};

const test = () => {
  txt.value = tools[state.value][3];
  run();
};
</script>
<style scoped>
.active,
.color {
  background: #283593;
  color: #fafafa !important;
}

.result {
  padding: 1rem;
}
</style>
