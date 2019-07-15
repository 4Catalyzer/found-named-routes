# Found Named Routes

Named route support for [Found](https://github.com/4Catalyzer/found). Inspired by [use-named-routes](https://github.com/taion/use-named-routes)

## Usage

```js
import { createBrowserRouter, makeRouteConfig, Route } from 'found';
import { createNamedRoutesMiddleware } from 'found-named-routes';

const routeConfig = makeRouteConfig(
  <Route path="/">
    <Route name="widgets" path="widgets" component={WidgetsPage}>
      <Route name="widget" path=":widgetId" component={WidgetPage} />
    </Route>
  </Route>
);

const namedRoutesMiddleware = createNamedRoutesMiddleware(routeConfig);

const BrowserRouter = createBrowserRouter({
  routeConfig,
  // Include queryMiddleware to preserve the default middlewares.
  historyMiddlewares: [namedRoutesMiddleware, queryMiddleware]
});
```

You can then use either route names or objects with name and optionally params:

```js
router.push('widgets');
router.push({ name: 'widget', params: { widgetId: '1' } });
```

or using links:

```js
<Link to="widgets">To widgets</Link>
<Link to={{ name: 'widget', params: { widgetId: '1' } }}>To widget 1</Link>
```

This middleware will not treat location strings as route names when the location starts with `/` or when the location string contains `://`, as it assumes that the former are absolute paths and that the latter are absolute URLs.

```js
history.push('/widgets/1');

<Link to="/widgets/1">To widget 1</Link>
```
