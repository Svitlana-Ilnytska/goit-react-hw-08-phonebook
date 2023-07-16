import React, { lazy, Suspense  } from "react";
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useFetchUserQuery } from "./redux/auth/operations";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks";
import { refreshUser } from "./redux/auth/slice";
import Navigation from "./components/Navigation/Navigation";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
  Box,
  Spinner,
  Flex,
} from '@chakra-ui/core';

const HomePage = lazy(() => import("./views/HomePage/HomePage"));
const SignUpPage = lazy(() => import("./views/SignUpPage/SignUpPage"));
const LogInPage = lazy(() => import("./views/LogInPage/LogInPage"));
const ContactsPage = lazy(() => import("./views/ContactsPage/ContactsPage"));

export default function App() {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const { data: user } = useFetchUserQuery(token, {
    skip: token === null,
  });

  const { isRefreshing } = useAuth(token);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [ dispatch]);

  useEffect(() => {
    (async () => {
      await user;
      if (user) {
        dispatch(refreshUser(user));
      }
    })();
  }, [user, dispatch]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />

          {/* <Navigation /> */}

          {isRefreshing ? (
            <Flex
              alignContent="center"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Box>
            </Flex>
          ) : (
            <Suspense
              fallback={
                <Flex
                  alignContent="center"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Box>
                </Flex>
              }
            >
              {/* <Switch>
                  <Route exact path="/" component={HomePage} />

                  <PublicRoute
                    restricted
                    path="/register"
                    redirectTo="/contacts"
                    component={SignUpPage}
                  />

                  <PublicRoute
                    restricted
                    path="/login"
                    redirectTo="/contacts"
                    component={LogInPage}
                  />

                  <PrivateRoute
                    path="/contacts"
                    redirectTo="/login"
                    component={ContactsPage}
                  />

                  <Redirect to="/" />
                </Switch> */}

              <Routes>
                <Route path="/" 
                element={<Navigation />}
                
                >
                  <Route index element={<HomePage />} />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute
                        redirectTo="/contacts"
                        component={<SignUpPage />}
                      />
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <PublicRoute
                        redirectTo="/contacts"
                        component={<LogInPage />}
                      />
                    }
                  />
                  <Route
                    path="/contacts"
                    element={
                      <PrivateRoute
                        redirectTo="/login"
                        component={<ContactsPage />}
                      />
                    }
                  />
                </Route>
              </Routes>
            </Suspense>
          )}
        </ColorModeProvider>
      </ThemeProvider>
    </div>
  );
}

