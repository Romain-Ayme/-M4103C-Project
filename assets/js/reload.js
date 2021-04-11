export {reload}
import {getRandom} from "./call_api";

function reload() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      getRandom();
    }
  }, false);
}