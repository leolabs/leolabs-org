---
title: Typesafe Firebase Cloud Functions with TypeScript
date: 2019-10-05
---

I often work with projects that use Firebase and Gatsby with TypeScript. While I love
the combination, it's weird to call Firebase Cloud Functions (CFs) without having a
clear definition of what it will return. Especially in a larger team, this is a
problem as you don't want to dive into a function's code just to find out what it
returns.

To solve this problem, we created a workflow to create typesafe Cloud Functions.

To set this workflow up, we use a new folder called `shared-types` that only contains
type definitions and will be accessed by the project as well as the Cloud Functions.
The folder structure in a normal project could look like this:

```text
.
├── functions
├── node_modules
├── shared-types
├── src
└── static
```

## Creating the Function Factory

The type magic happens in a simple function factory called `createFunction`. This
function takes a CF name and creates a callable function with correct types. This
function is located in a `util` folder in our project, but you may place it wherever
you wish.

```typescript
import { firebase } from '../firebase';

export const createFunction = <T = any, R = any>(
  name: string,
): ((data: T) => Promise<R>) => {
  const callable = firebase.functions().httpsCallable(name);
  return async (data: T) => (await callable(data)).data;
};
```

`T` is the parameter type and `R` is the return type, but more on that later.

## Using the Factory

Let's say we want to write a CF that returns a user's posts from a specific year.
First, let's create a shared type file, called `posts.ts`. This file contains
parameter and return types for the corresponding CF that we'll write later.

```typescript
export interface Post {
  userId: string;
  title: string;
  date: string;
  content: string;
}

export interface GetPostsParams {
  userId: string;
  year: number;
}

export interface GetPostsResult {
  posts: Post[];
}
```

We can now import and use these types in our CF file:

```typescript
import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';

import { GetPostsParams, GetPostsResult, Post } from '../../shared-types/posts';

export const getPosts = functions.https.onCall(
  async ({ userId, year }: GetPostsParams, ctx) => {
    const posts: Post[] = /* Firebase logic here */;
    return { posts } as GetPostsResult;
  },
);
```

To use this CF, we just need to call `createFunction` with the types we created:

```typescript
const getUsers = createFunction<GetPostsParams, GetPostsResult>('getPosts');
```

The created function can now be called with type completion:

```typescript
// posts will be of type Post[]
const posts = await getPosts({ userId: '0r4Hd99oKPci0WfTu7VkWxmROI03' });
```

## Bonus Tips

Using this method, we can wrap and modify CF calls and their results. Here are three
examples for what you could do with that.

### Performance Monitoring

Firebase has a built-in module that can measure various timings. Measuring the time a
function takes to execute on the client gives you a good glympse into the real
performance of your app.

```typescript
import { firebase } from '../firebase';

export const createFunction = <T = any, R = any>(
  name: string,
): ((data: T) => Promise<R>) => {
  const callable = firebase.functions().httpsCallable(name);

  return async (data: T) => {
    const trace = firebase.performance().trace(`functions:${name}`);
    trace.start();
    const result = await callable(data);
    trace.stop();
    return result.data;
  };
};
```

### Proxying Functions

One of our projects has to be available to customers in China, where unfortunately,
Google is blocked. To circumvent that block, we proxy all requests to
`https://ourdomain.tld/api/` to `https://us-central1-our-project.cloudfunctions.net/`
using Netlify's redirect file:

```text
/api/* https://us-central1-our-project.cloudfunctions.net/:splat 200
```

Changing the CF endpoint is not possible yet as of this post, so we wrote our own
library to handle it. Warning, long code block ahead:

```typescript
export enum ErrorStatus {
  Ok = 'OK',
  InvalidArgument = 'INVALID_ARGUMENT',
  FailedPrecondition = 'FAILED_PRECONDITION',
  OutOfRange = 'OUT_OF_RANGE',
  Unauthenticated = 'UNAUTHENTICATED',
  PermissionDenied = 'PERMISSION_DENIED',
  NotFound = 'NOT_FOUND',
  Aborted = 'ABORTED',
  AlreadyExists = 'ALREADY_EXISTS',
  ResourceExhausted = 'RESOURCE_EXHAUSTED',
  Cancelled = 'CANCELLED',
  DataLoss = 'DATA_LOSS',
  Unknown = 'UNKNOWN',
  Internal = 'INTERNAL',
  NotImplemented = 'NOT_IMPLEMENTED',
  Unavailable = 'UNAVAILABLE',
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
}

interface RawFunctionsError {
  error: {
    status: ErrorStatus;
    message: string;
  };
}

interface RawFunctionsResponse<T> {
  result: T | { success: boolean };
}

export class FunctionsError extends Error {
  constructor(message: string, public code: ErrorStatus) {
    super(message);
  }
}

const isError = <O>(
  input: RawFunctionsResponse<O> | RawFunctionsError,
): input is RawFunctionsError => !!(input as RawFunctionsError).error;

const isResult = <O>(
  input: RawFunctionsResponse<O> | RawFunctionsError,
): input is RawFunctionsResponse<O> => !!(input as RawFunctionsResponse<O>).result;

export const createFunction = <I = any, O = any, A = true>(name: string) => {
  // process.env.ENDPOINT is our API endpoint: https://ourdomain.tld/api
  const url = `${process.env.ENDPOINT}/${name}`;

  return async (data: I, token: A extends true ? string : undefined): Promise<O> => {
    const result = await fetch(url, {
      headers: {
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ data: data || null }),
    });

    const resultBody:
      | RawFunctionsResponse<O>
      | RawFunctionsError = await result.json();

    if (!result.ok && isError(resultBody)) {
      throw new FunctionsError(resultBody.error.message, resultBody.error.status);
    }

    if (isResult(resultBody)) {
      return resultBody.result as O;
    }

    throw new Error('Function response is neither error nor result.');
  };
};
```

This is an extreme example and in most cases, you don't need to use it. But it works.
The way `createFunction` is invoked almost stays the same. We only need to pass
authenticated CFs a user token in addition to the other parameters.
