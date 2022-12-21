import { h } from 'hyperapp';

import * as actions from '../actions.js';

export const AppendableList = (props) => {
  return h('appendable-list', {}, [
    h('ol', { class: 'mb-4' }, props.confirmed),
    h('form', {
      action: '#nop',
      method: 'get',
      onsubmit: (_, event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        console.log('appenable-list', formData.getAll('text'));

        return [actions.Nop];
      },
    }, [
      h('ol', { class: 'mb-4' }, props.pending),
    ]),
  ]);
};
