import apiService from "../services/apiService";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";

export function useFetchUser(userId) {
  return useQuery(["userData", userId], () =>
    apiService.get(`user/${userId}`).then(({ data }) => data)
  );
}

export function useMutateLoginUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email ? user.email : "");
      data.append("password", user?.password);
      return axios.post("http://localhost:3001/auth/login", user)
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        console.log(responseData.data.name)
        localStorage.setItem("jwt", responseData.data.token)
        localStorage.setItem("user", JSON.stringify(responseData.data._doc))

        window.location.replace("http://localhost:3000")
      },
      onError: (e) => console.log(e.message),
    }
  );
}

export function useMutateCreatAccount() {
  return useMutation(
    (acc) => {

      return axios.post('http://localhost:3001/account/post', acc);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {

      },
      onError: (e) => console.log(e.message),
    }
  );
}

export function usegetTransactions(transactionId) {
  return axios.get(`http://localhost:3001/transactions/${userId}`).then(({ data }) => data)

}


export function useMutateRegisterUser() {
  return useMutation(
    (user) => {
      return apiService.post(`http://localhost:3001/user/post`, user);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page
        window.location.replace("http://localhost:3000");
      },
      onError: (e) => console.log(e.message),
    }
  );
}
export function useMutateTransferUser() {
  return useMutation(async transactions => {
    const data = new FormData();
    return await apiService.post(`http://localhost:3000/transactions/internal`, transactions);
  },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page------------>
        alert('Transfer completed Sucessfully ');
      },
      onError: (e) => { console.log(e.message); }



    });
}
export function useMutateTransferUserExternal() {
  return useMutation(async transactions => {
    const data = new FormData();
    return await apiService.post(`http://localhost:3000/transactions/external`, transactions);
  },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page------------>
        alert('Transfer completed Sucessfully ');
      },
      onError: (e) => { console.log(e.message); }



    });
}

export function useMutateUpdateUser(userId) {
  const queryClint = useQueryClient();
  return useMutation(
    (user) => {
      return apiService.post(`user/${userId}`, user);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        return queryClint.setQueryData(
          ["userData", userId],
          (data) => {
            return [
              {
                giuEmail: responseData.data.body.giuEmail,
                password: responseData.data.body.password,
                confirmPassword: responseData.data.body.confirmPassword,
                name: responseData.data.body.name,
                username: responseData.data.body.username,
                phone: responseData.data.body.phone,
                giuID: responseData.data.body.giuID,

              },
              ...data,
            ];
          }
        );
      },
      onError: (e) => console.log(e.message),
    }
  );
}
