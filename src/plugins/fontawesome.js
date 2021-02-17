import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPen, faTimesCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);
