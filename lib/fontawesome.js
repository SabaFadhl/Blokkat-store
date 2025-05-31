// lib/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';

// Disable auto-add CSS since we'll handle it manually
config.autoAddCss = false;

// Add icons to the library
library.add(faShoppingCart);