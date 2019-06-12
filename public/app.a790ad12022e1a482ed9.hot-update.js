webpackHotUpdate("app",{

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  state: {\n    userInformation: '',\n    serverUrl: 'http://localhost:5000/api/v1/'\n  },\n  getters: {\n    serverUrl: function serverUrl(state) {\n      return state.serverUrl;\n    },\n    userInformation: function userInformation(state) {\n      return state.userInformation;\n    }\n  },\n  mutations: {\n    updateUserInformation: function updateUserInformation(state, userInformation) {\n      state.userInformation = userInformation;\n    }\n  },\n  actions: {\n    updateUserInformation: function updateUserInformation(_ref, userInformation) {\n      var commit = _ref.commit;\n      commit('updateUserInformation', userInformation);\n    }\n  }\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUuanM/YzBkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVleCBmcm9tICd2dWV4JztcblxuVnVlLnVzZShWdWV4KTtcblxuZXhwb3J0IGRlZmF1bHQgbmV3IFZ1ZXguU3RvcmUoe1xuICBzdGF0ZToge1xuICAgIHVzZXJJbmZvcm1hdGlvbjogJycsXG4gICAgc2VydmVyVXJsOiAoJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkvdjEvJyksXG4gIH0sXG4gIGdldHRlcnM6IHtcbiAgICBzZXJ2ZXJVcmw6IHN0YXRlID0+IHN0YXRlLnNlcnZlclVybCxcbiAgICB1c2VySW5mb3JtYXRpb246IHN0YXRlID0+IHN0YXRlLnVzZXJJbmZvcm1hdGlvbixcbiAgfSxcbiAgbXV0YXRpb25zOiB7XG4gICAgdXBkYXRlVXNlckluZm9ybWF0aW9uOiAoc3RhdGUsIHVzZXJJbmZvcm1hdGlvbikgPT4geyBzdGF0ZS51c2VySW5mb3JtYXRpb24gPSB1c2VySW5mb3JtYXRpb247IH0sXG4gIH0sXG4gIGFjdGlvbnM6IHtcbiAgICB1cGRhdGVVc2VySW5mb3JtYXRpb24oeyBjb21taXQgfSwgdXNlckluZm9ybWF0aW9uKSB7IGNvbW1pdCgndXBkYXRlVXNlckluZm9ybWF0aW9uJywgdXNlckluZm9ybWF0aW9uKTsgfSxcbiAgfSxcbn0pO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUlBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFaQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/store.js\n");

/***/ })

})