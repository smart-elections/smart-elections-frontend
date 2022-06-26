const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case 'LIGHT': {
      return {
        darkMode: false,
      };
    }
    case 'DARK': {
      return {
        darkMode: true,
      };
    }
    case 'TOGGLE': {
      let darkMode = !state.darkMode;

      darkMode
        ? window.localStorage.setItem('smartVotingTheme', 'DARK')
        : window.localStorage.setItem('smartVotingTheme', 'LIGHT');
      return {
        darkMode,
      };
    }
    default:
      return state;
  }
};

export default DarkModeReducer;
