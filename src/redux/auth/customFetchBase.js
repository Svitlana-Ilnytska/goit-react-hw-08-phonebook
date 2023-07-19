import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, setlogOut, refreshUser } from '../auth/slice';
import { store } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://connections-api.herokuapp.com',
});

export default async function baseQueryWithReauth(arg, api, extraOptions) {
  
  const token = store.getState().auth.token;
  if (token) {
    arg.headers = {
      ...arg.headers,
      Authorization: `Bearer ${token}`,
    };
  }


  try {
    let result = await baseQuery(arg, api, extraOptions);

    if (result?.error && result?.error?.status === 401) {
       console.log('You are not logged in')

      const refreshResult = await baseQuery('/users/current', api, extraOptions);
      if (refreshResult.data) {

        api.dispatch(setToken(refreshResult.data));
       
        result = await baseQuery(arg, api, extraOptions);
      } else {
        api.dispatch(setlogOut());
      }
    }

    return result;
  } catch (error) {
    console.error('Error in baseQueryWithReauth:', error);
    throw error; 
  }
}









// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setToken, setlogOut, refreshUser } from '../auth/slice';
// import { store } from '../store';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'https://connections-api.herokuapp.com',
// });

// export default async function baseQueryWithReauth(arg, api) {
//   const token = store.getState().auth.token;

//   if (token) {
//     arg.headers = {
//       ...arg.headers,
//       Authorization: `Bearer ${token}`,
//     };
//   }
//   console.log('token', token)
//   try {
//     let result = await baseQuery(arg, api);
//     console.log('result', result)

//     api.dispatch(setToken(result.data));
//     console.log('result111',  api.dispatch(refreshUser(result.data)))
    
//     if (result?.error?.data.message === 'Please authenticate') {
//        console.log('You are not logged in')
//       // try to get a new token
//       const refreshResult = await baseQuery('/users/current', api);
//       console.log('refreshResult', refreshResult)


//        if (!refreshResult.data) {
//         // store the new token

//         const newToken = result.data.token;

//         console.log('result2', result)

      
//         api.dispatch(refreshUser(result.data));
//         result = await baseQuery({ ...arg, headers: { ...arg.headers, Authorization: `Bearer ${newToken}` } }, api);

//         // api.dispatch(setToken(result.data));
//         // api.dispatch(refreshUser(result.data));

//         // retry the initial query
//         // result = await baseQuery(arg, api);
//       } else {
//         api.dispatch(setlogOut());
//       }
//     }

//     return result;
//   } catch (error) {
//     console.error('Error in baseQueryWithReauth:', error);
//     throw error; // Throw the error to be handled by the caller
//   }
// }