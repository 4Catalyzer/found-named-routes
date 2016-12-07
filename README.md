# found-named-routes
Named routes support for [found](https://github.com/4Catalyzer/found). Inspired by [use-named-routes](https://github.com/taion/use-named-routes)

## Usage

```js
import { createBrowserRouter } from 'found';
import { makeRouteConfig, Route } from 'found/lib/jsx';
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
  // add query middleware to preserve the default middlewares
  historyMiddlewares: [namedRoutesMiddleware, queryMiddlware]
});
```

You can then use either route names or objects with name and optionally params:


```js
router.push('widgets');
router.push({ name: 'widget', params: { widgetId: '1' } });
```

or using links


```js
<Link to="widgets">To widgets</Link>
<Link to={{ name: 'widget', params: { widgetId: '1' } }}>To widget 1</Link>
```

You can use normal paths by prepending the string with a '/'

```js
history.push('/widgets/1');
<Link to="/widgets/1">To widget 1</Link>
```
