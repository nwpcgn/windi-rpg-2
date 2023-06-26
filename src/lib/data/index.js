// @index(['./store/single/**/*.js', './api/**/*.js'], f => ` export { default as ${f.name} } from '${f.path}';`)
 export { default as addcomma } from './api/addcomma';
 export { default as delay } from './api/delay';
 export { default as resetValues } from './api/resetValues';
 export { default as sleep } from './api/sleep';
 export { default as supabase } from './api/supabase';
 export { default as elapsed } from './store/single/elapsed';
 export { default as time } from './store/single/time';
// @endindex
// @index(['./store/stores/**/*.js'], f => ` export { ${f.name} } from '${f.path}';`)
 export { _game } from './store/stores/_game';
 export { _profile } from './store/stores/_profile';
 export { _running } from './store/stores/_running';
 export { _settings } from './store/stores/_settings';
 export { _user } from './store/stores/_user';
// @endindex


/** Dispatch event on click outside of node */
export function clickOutside(node) {
  
    const handleClick = event => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('click_outside', node)
        )
      }
    }
  
      document.addEventListener('click', handleClick, true);
    
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
      }
  }