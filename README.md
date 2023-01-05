# Use Case Explanation

## Given a kanban board, a user can :

```markdown
1. Create Todo
2. Create Task in a todo item
3. Edit Task
4. Move Task from/to other todos
5. Delete Task
```

## Use Case


Explanation : as per requirement, user is able to create todo also create, edit, move and delete task and systematically if user is moving or deleting a task, then the initial and target todo are going to be updated as well, so will the task itself. As the image shows with the dashing line with the `<<include>>` label

## Technical Design



Using a little tweaked clean architecture allows me to offer a pretty good event-driven app design, These are 3 layers of the clean architecture :

1. Core Layer : This is where the application will get its data.

2. Application Layer : This is where the data get applied to the system.

3. User Interface : Pretty self explanatory. This will shows the user the app and for them to interact with.

here are some important points :

- User CANNOT directly request for data.

- Every action that user does, is considered an event.

- To make something happen. User must invoke an even.

- Then the app will react to it. And user will get the response.

- Everything that user does will be known throughout the app

Let's say user create a task, here is what'll happen inside the app :

1. (UI layer) A Button clicked, that denotes user is adding Todo
2. (App layer) then the State management, will notice that and react accodingly
3. (Core Layer) gets notified by App layer, and now fecth some data based on what it needs
4. (Core Layer) will give back the raw data from database/api
5. (App layer) will process that data to be presentable to the UI Layer
6. (UI Layer) receive that data, based on that, the UI will now present the response to the user. A.k.a a new task items shows up

---

## Dependencies

The tech stack i used for this projects are :

- React + Vite + Typescript
- React Context & Zustan (Event driven State managers)
- Tailwindcss + Headlessui (styling)
- Cypress (testing)
- Iconify (Icon packs)

## Clean Architecture

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
