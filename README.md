# Memolist of code snippets

## Overview

This project was created to host all interestings snippets that i find on internet when working on my projects.

The data is hosted on a Firestore database and the connection is managed by Firebase.

## Features

- the frontend is built with React, Redux and Tailwind
- the datas are organised in a Firestore non-relational database
- the asynchronous calls are managed with Redux Thunk
- all the application state is managed with Redux
- all the visitors can see the list of snippets
- only the registered users (via google authentication) can manage and use a wishlist of favourites snippets
- only administrators can add/delete/modify the snippets
- there is a filter to show only the snippets in the chosen category
- the Forms are managed with Formik

## Running the project

Clone the repository with:

### `git clone https://github.com/davide-ravasi/memolist.git`

Then, to run this project, install it locally using npm:

```
$ cd ../memolist
$ npm install
$ npm start
```

The page will reload if you make edits.\

### Live version

[memolist](http://www.reddit.com)

## Dependencies

Project is created with:

- React: 17.0
- Redux: 4.0
- Tailwind: 2.0
- Redux-Thunk: 2.3
- Formik: 2.2.6
- Firebase 8.0
- React Fontawesome: 0.01.12
