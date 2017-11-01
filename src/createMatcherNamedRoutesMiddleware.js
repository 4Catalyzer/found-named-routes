import createLocationMiddleware from 'farce/lib/createLocationMiddleware';
import invariant from 'invariant';

export default function createMatcherNamedRoutesMiddleware(matcher) {
  const paths = {};

  function makePaths(route, basePath) {
    const { path, name } = route;
    let { children } = route;

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
      if (!Array.isArray(children)) { // flatten route routes
        children = Object.values(children).reduce((a, b) => a.concat(b));
      }

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

  return createLocationMiddleware({
    makeLocationDescriptor: resolveLocation,
    makeLocation: location => location,
  });
}
