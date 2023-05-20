# Notes on the data fetching

the tankQuerry is used to querry data from a server

# QUERRY VARAIABLES

# NETWORK MODE

1. ONLINE
   In this mode, Queries and Mutations will not fire unless you have network connection

   there are data or info that can be gotten fro the useQuerryClient
   1: iserror
   2: isfetching
   3: isPaused

   # refetchOnReconnect

   this is default set to true

# there are 3 fetchStatus

    1: fteching: data is fetching
    2: paused; there is netowrkerro and the fetching is pasused
    3: idle: the query is not fetching and not paused

2. ALWAYS
   IN THIS MODE, TANSTACK QUERRY WILL ALWAYS FETCH AND IGNORE THEONLINE/OFFLINE STATE
   This is likely the mode you want to choose if you use TanStack Query in an environment where you don't need an active network connection for your Queries to work - e.g. if you just read from AsyncStorage, or if you just want to return Promise.resolve(5) from your queryFn.
   IN THOS MODE

   1. querry will never be paused
   2. retries will never be aused
   3. refetchOnReconnect defaults to false

3. offlineFirst
   This mode is the middle ground between the first two options, where TanStack Query will run the queryFn once, but then pause retries. This is very handy if you have a serviceWorker that intercepts a request for caching like in an offline-first PWA, or if you use HTTP caching via the Cache-Control header.

In those situations, the first fetch might succeed because it comes from an offline storage / cache. However, if there is a cache miss, the network request will go out and fail, in which case this mode behaves like an online query - pausing retries.

# NOTE

The TanStack Query Devtools will show Queries in a paused state if they would be fetching, but there is no network connection

# Signature

networkMode: 'online' | 'always' | 'offlineFirst'
optional
defaults to 'online'

# Parallel Queries

THERE ARE BASICALLY TWO WAYS QUERRIES ARE DONE

1. Manual Parallel Queries
   When the number of parallel queries does not change, there is no extra effort to use parallel queries. Just use any number of TanStack Query's useQuery and useInfiniteQuery hooks side-by-side!

   E.G
   function App () {

The following queries will execute in parallel

    const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
    const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
    const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
    ...
    }

2. Dynamic Parallel Queries with useQueries
   If the number of queries you need to execute is changing from render to render, you cannot use manual querying since that would violate the rules of hooks. Instead, TanStack Query provides a useQueries hook, which you can use to dynamically execute as many queries in parallel as you'd like.

   IN .tsx file
   function App({ users }) {
   const userQueries = useQueries({
   queries: users.map((user) => {
   return {
   queryKey: ['user', user.id],
   queryFn: () => fetchUserById(user.id),
   }
   }),
   })
   }

# stale time

default time is 0 seconds

# Cache Time

default time is 5 minutes

# polling

    refetchInterval

    this is the the time period that there will be a deafault refatc if data from the db
    Default: false, howeverr you can set the time to however you to tweak

# CALL BACK e.g opening a modal, navigating to a different routeor displaying toast notifications
