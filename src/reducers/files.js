const files = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FILES': {
      return action.files;
    }

    case 'REMOVE_FILE': {
      const fileId = action.id;
      return state.filter(file => file.key !== fileId);
    }

    default: {
      return state;
    }
  }
};

export default files;
