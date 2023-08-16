const initialState = {
  idcard: {},
  info: {},
  pdf: {},
  globalQues: {questions: null, index: 0},
  docLoadingIndex: -1,
};

const dataReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'SET_ID_DATA':
      return {...state, idcard: action.payload.idcard};

    case 'SET_INFO_DATA':
      return {...state, info: action.payload.info};

    case 'CLEAR_DATA':
      return {idcard: {}, info: {}};

    case 'SET_PDF':
      console.log(action.payload.pdf, 'action.payload.pdf');

      return {
        ...state,
        pdf: action.payload.pdf,
      };

    case 'SET_DOC_INDEX':
      return {
        ...state,
        docLoadingIndex: action.payload.docLoadingIndex,
      };

    case 'SET_QUESTION':
      return {
        ...state,
        globalQues: {
          questions: action.payload.globalQues.question,
          index: action.payload.globalQues.index,
        },
      };

    case 'ADD_QUESTION':
      return {
        ...state,
        globalQues: {
          questions: [
            ...state.globalQues.questions.filter(
              (item: any) => item?.id !== action.payload.globalQues.question.id,
            ),
            action.payload.globalQues.question,
          ],
          index: state.globalQues.index + 1,
        },
      };

    case 'REMOVE_QUESTION':
      return {
        ...state,
        globalQues: {
          questions: [
            ...state.globalQues.questions.filter(
              (item: any) => item?.id !== action.payload.globalQues.question.id,
            ),
          ],
          index: state.globalQues.index - 1,
        },
      };

    default:
      return state;
  }
};

export {dataReducer};
