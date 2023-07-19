import React, { lazy, Suspense  } from "react";
import { Route, Routes } from 'react-router-dom';
import { useAuth } from "./hooks";
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
  const { isRefreshing } = useAuth();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />

          <Navigation />

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
              <Routes>
                <Route path="/"  >
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

