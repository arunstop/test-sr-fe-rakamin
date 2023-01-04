# Clean Architecture

## Structure/Layers

> Core @ `src/core` :

Core layer is the main business logic

- `core/data` : models / entities,factories, resides here
- `core/repos` : repository data
- `core/clients` : all core related clients (database/axios, etc)

> Application `src/app` :

App layer is where that business logic getting used

- `app/stores` : sates related things, like global states/contexts
- `app/types` : all app related types are here
- `app/hooks` : app related hooks
- `app/helpers` : app related helpers
- `app/services` : processing data that ui requested

> User Interface `src/ui` :

UI layer is where to that application getting showed

- `ui/layout` : where layouts reside
- `ui/components` : where components reside
- `ui/pages` : where pages reside
- `ui/helpers` : where ui related helpers resides

# Relative path problem

## have 2 solutions

## 1. using react router's `basename` and `homepage` on `package.json`

`package.json`

```json
    ...
    "homepage":"/v1"
    ...
```

`main.tsx`

```js
    // middleware to redirect `/` to `/v1`
    if (!(window.location.href + "/").includes(`${window.location.origin}/v1/`)) {
        window.history.replaceState("", "", "/v1" + window.location.pathname)
    }

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename="v1">
        <Routes>
            <Route
            path="/"
            element={
                <TodoProvider>
                <App />
                </TodoProvider>
            }
            />
            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    )
```

## 2. using redirection without `basename` and `homepage`

`main.tsx`

```js
    <React.StrictMode>
        <BrowserRouter>
        <Routes >
            <Route
            path="/v1"
            element={
                <TodoProvider>
                <App />
                </TodoProvider>
            }
            />
            <Route path="*" element={<Navigate to={"/v1"}/>} />
        </Routes>
        </BrowserRouter>
    </React.StrictMode>,
```
