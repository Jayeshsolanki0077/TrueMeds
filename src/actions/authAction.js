import axios from "axios";

export const authActions = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
};

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } =
  authActions;

export const handleSendOtp = (mobileNumber) => {
  const headers = {
    transactionId: "react_interview",
  };
  const url = `https://stage-services.truemeds.in/CustomerService/sendOtp?mobileNo=${mobileNumber}`;
  return axios
    .post(url, "", { headers })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const login = (payload) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const { mobileNumber, otp } = payload;
  const headers = {
    transactionId: "react_interview",
  };
  const url = `https://stage-services.truemeds.in/CustomerService/verifyOtp?mobileNo=${mobileNumber}&otp=${otp}&deviceKey=abcd&isIos=false&source=react_interview`;
  return axios
    .post(url, "", { headers })
    .then((response) => {
      if (response.status === 200) {
        if (response.status !== 200) {
          dispatch({ type: LOGIN_FAILURE });
          const result = { isLogin: false, message: "Error" };
          return result;
        }
        dispatch({
          type: LOGIN_SUCCESS,
        });
        const result = {
          isLogin: true,
          message: response.data[201],
        };
        localStorage.setItem(
          "user_token",
          JSON.stringify(response.data.Response?.access_token)
        );
        return result;
      }
      dispatch({ type: LOGIN_FAILURE });
      const result = { isLogin: false, message: "Error" };
      return result;
    })
    .catch(() => {
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const fetchArticleList = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token")) || {};
    const url =
      "https://stage-services.truemeds.in/ArticleService/getArticleListing";
    const headers = {
      Authorization: token,
    };
    const response = await axios.post(url, "", headers);
    if (response) {
      return { results: response.data.result?.article };
    }
    throw new Error();
  } catch (e) {
    throw new Error();
  }
};
