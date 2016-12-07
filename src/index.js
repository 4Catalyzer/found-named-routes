import ActionTypes from 'farce/lib/ActionTypes';
import Matcher from 'found/lib/Matcher';
import invariant from 'invariant';

// XXX Should thix be exposed explicitly upstream?
const format = Matcher.prototype.format;

function makePaths(paths, route, basePath) {
  const { path, name, children } = route;

  let fullPath;
  if (!path) {
    fullPath = basePath;
  } else if (path[0] === '/') {
    fullPath = path;
  } else if (basePath[basePath.length - 1] === '/') {
    fullPath = `${basePath}${path}`;
  } else {
    fullPath = `${basePath}/${path}`;
  }

  if (name) {
    invariant(
      name[0] !== '/',
      'route name invalid: %s. A name cannot start with /',
      name,
    );

    // eslint-disable-next-line no-param-reassign
    paths[name] = fullPath;
  }

  if (children) {
    children.forEach(childRoute => makePaths(paths, childRoute, fullPath));
  }
}

function resolveLocation(location, paths) {
  let { name } = location;
  const { pathname, params } = location;


  if (!name && pathname[0] !== '/') {
    name = pathname;
  }

  if (!name) {
    return location;
  }

  const path = paths[name];
  invariant(path, 'Unknown route: %s', name);

  return {
    ...location,
    pathname: format(path, params),
  };
}

export default function createNamedRoutesMiddleware(routes) {
  const paths = {};
  routes.forEach(route => makePaths(paths, route, '/'));

  return () => next => (action) => {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.TRANSITION:
      case ActionTypes.CREATE_HREF:
        return next({ type, payload: resolveLocation(payload, paths) });
      case ActionTypes.CREATE_LOCATION:
        return next({ type, payload: resolveLocation(payload, paths) });
      default:
        return next(action);
    }
  };
}
