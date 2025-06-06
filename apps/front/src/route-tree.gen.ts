/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './pages/__root';
import { Route as AppImport } from './pages/_app';
import { Route as AuthIndexImport } from './pages/auth/index';
import { Route as AppIndexImport } from './pages/_app/index';
import { Route as AppAboutImport } from './pages/_app/about';
import { Route as AuthRegisterIndexImport } from './pages/auth/register/index';
import { Route as AuthLoginIndexImport } from './pages/auth/login/index';

// Create/Update Routes

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any);

const AuthIndexRoute = AuthIndexImport.update({
  id: '/auth/',
  path: '/auth/',
  getParentRoute: () => rootRoute,
} as any);

const AppIndexRoute = AppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRoute,
} as any);

const AppAboutRoute = AppAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => AppRoute,
} as any);

const AuthRegisterIndexRoute = AuthRegisterIndexImport.update({
  id: '/auth/register/',
  path: '/auth/register/',
  getParentRoute: () => rootRoute,
} as any);

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  id: '/auth/login/',
  path: '/auth/login/',
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AppImport;
      parentRoute: typeof rootRoute;
    };
    '/_app/about': {
      id: '/_app/about';
      path: '/about';
      fullPath: '/about';
      preLoaderRoute: typeof AppAboutImport;
      parentRoute: typeof AppImport;
    };
    '/_app/': {
      id: '/_app/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof AppIndexImport;
      parentRoute: typeof AppImport;
    };
    '/auth/': {
      id: '/auth/';
      path: '/auth';
      fullPath: '/auth';
      preLoaderRoute: typeof AuthIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/login/': {
      id: '/auth/login/';
      path: '/auth/login';
      fullPath: '/auth/login';
      preLoaderRoute: typeof AuthLoginIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/auth/register/': {
      id: '/auth/register/';
      path: '/auth/register';
      fullPath: '/auth/register';
      preLoaderRoute: typeof AuthRegisterIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppAboutRoute: typeof AppAboutRoute;
  AppIndexRoute: typeof AppIndexRoute;
}

const AppRouteChildren: AppRouteChildren = {
  AppAboutRoute: AppAboutRoute,
  AppIndexRoute: AppIndexRoute,
};

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);

export interface FileRoutesByFullPath {
  '': typeof AppRouteWithChildren;
  '/about': typeof AppAboutRoute;
  '/': typeof AppIndexRoute;
  '/auth': typeof AuthIndexRoute;
  '/auth/login': typeof AuthLoginIndexRoute;
  '/auth/register': typeof AuthRegisterIndexRoute;
}

export interface FileRoutesByTo {
  '/about': typeof AppAboutRoute;
  '/': typeof AppIndexRoute;
  '/auth': typeof AuthIndexRoute;
  '/auth/login': typeof AuthLoginIndexRoute;
  '/auth/register': typeof AuthRegisterIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/_app': typeof AppRouteWithChildren;
  '/_app/about': typeof AppAboutRoute;
  '/_app/': typeof AppIndexRoute;
  '/auth/': typeof AuthIndexRoute;
  '/auth/login/': typeof AuthLoginIndexRoute;
  '/auth/register/': typeof AuthRegisterIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '' | '/about' | '/' | '/auth' | '/auth/login' | '/auth/register';
  fileRoutesByTo: FileRoutesByTo;
  to: '/about' | '/' | '/auth' | '/auth/login' | '/auth/register';
  id:
    | '__root__'
    | '/_app'
    | '/_app/about'
    | '/_app/'
    | '/auth/'
    | '/auth/login/'
    | '/auth/register/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren;
  AuthIndexRoute: typeof AuthIndexRoute;
  AuthLoginIndexRoute: typeof AuthLoginIndexRoute;
  AuthRegisterIndexRoute: typeof AuthRegisterIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthIndexRoute: AuthIndexRoute,
  AuthLoginIndexRoute: AuthLoginIndexRoute,
  AuthRegisterIndexRoute: AuthRegisterIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/auth/",
        "/auth/login/",
        "/auth/register/"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/about",
        "/_app/"
      ]
    },
    "/_app/about": {
      "filePath": "_app/about.tsx",
      "parent": "/_app"
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/auth/": {
      "filePath": "auth/index.tsx"
    },
    "/auth/login/": {
      "filePath": "auth/login/index.tsx"
    },
    "/auth/register/": {
      "filePath": "auth/register/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
