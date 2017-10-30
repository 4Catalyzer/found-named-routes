import ActionTypes from 'farce/lib/ActionTypes';
import invariant from 'invariant';

export default function createMatcherNamedRoutesMiddleware(matcher) {
  const paths = {};

  function makePaths(route, basePath) {
    const { path, name, children } = route;

    const fullPath = matcher.joinPaths(basePath, path);

    if (name) {
      invariant(
        name[0] !== '/',
        'route name invalid: %s. A name cannot start with /',
        name,
      );

      paths[name] = fullPath;
    }

    if (children) {
      children.forEach(childRoute => makePaths(childRoute, fullPath));
    }
  }

  function resolveLocation(location) {
    let { name } = location;
    const { pathname, params } = location;


    if (!name && pathname.charAt(0) !== '/') {
      name = pathname;
    }

    if (!name) {
      return location;
    }

    const path = paths[name];
    invariant(path, 'Unknown route: %s', name);

    return {
      ...location,
      pathname: matcher.format(path, params),
    };
  }

  matcher.routeConfig.forEach(route => makePaths(route, '/'));

  return () => next => (action) => {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.TRANSITION:
      case ActionTypes.CREATE_HREF:
      case ActionTypes.CREATE_LOCATION:
        return next({ type, payload: resolveLocation(payload) });
      default:
        return next(action);
    }
  };
}
