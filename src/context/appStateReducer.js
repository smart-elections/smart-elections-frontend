const AppStateReducer = (state, action) => {
  switch (action.type) {
    case 'Login': {
      console.log('Action', action);

      // Add the user to local storage
      localStorage.setItem(
        'SmartElectionsProfile',
        JSON.stringify({ ...action.payload, isAuthenticated: true })
      );

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    }
    case 'Logout': {
      window.localStorage.removeItem('SmartElectionsProfile');
      return {
        isDarkMode: state.isDarkMode,
        isAuthenticated: false,
        user: null,
      };
    }

    case 'UpdateProfile': {
      return {
        ...state,
      };
    }

    case 'ChangePassword': {
      return {
        ...state,
      };
    }
    case 'getElections': {
      return {
        ...state,
      };
    }
    case 'getCandidates': {
      return {
        ...state,
      };
    }
    case 'Vote': {
      return {
        ...state,
      };
    }

    case 'LIGHT': {
      return {
        ...state,
        isDarkMode: false,
      };
    }
    case 'DARK': {
      return {
        ...state,
        isDarkMode: true,
      };
    }
    case 'TOGGLE': {
      let isDarkMode = !state.isDarkMode;

      isDarkMode
        ? window.localStorage.setItem('smartVotingTheme', 'DARK')
        : window.localStorage.setItem('smartVotingTheme', 'LIGHT');

      return {
        ...state,
        isDarkMode,
      };
    }

    default:
      return state;
  }
};

export default AppStateReducer;
