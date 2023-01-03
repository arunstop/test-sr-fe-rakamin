# Clean Architecture

## Structure/Layers
> Core @ `src/core` :

Core layer is the main business logic

- `core/data` : models / entities,factories, resides here
- `core/repos` : repository data
- `core/clients` : all core related clients (database/axios, etc)

> Application `src/app` :

App layer is where that business logic getting used

- `app/states` : sates related things, like global states/contexts
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
