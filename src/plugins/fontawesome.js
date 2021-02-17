import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas as faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimesCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);
