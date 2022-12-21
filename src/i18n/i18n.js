import { text as originalText, h } from 'hyperapp';
import * as langs from './lang/*.js';

const get = (key, obj) => {
  if (!key) {
    return obj;
  }

  const [currentKey, ...remainingKeys] = key.split('.');

  return get(remainingKeys.join('.'), obj[currentKey]);
};

export const makeText = (lang) => {
  return (value, isKey = true) => {
    if (!isKey) return originalText(value);

    const v = get(value, lang);
    const warning = `No translation for <${value}>`;
    if (!v) {
      console.warn(warning, { lang, value, v });
    }
    return v
      ? originalText(v)
      : h('span', { class: 'border-b border-b-gray-400 border-dashed', title: warning }, originalText(value));
  };
};

let currentText = makeText(langs['en-default'].lang);

export const text = (value, isKey) => currentText(value, isKey);

export const load = (translation) => {
  if (!(translation in langs)) {
    return Promise.reject(`Unable to load ${translation}`);
  }
  currentText = makeText(langs[translation].lang);
  return Promise.resolve();
};
