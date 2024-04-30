# Play_now Backend

The backend part of the music streaming website. Allows searching for and
listening to music, creating playlists and adding songs to favorites.

## Initialization

For the project initialization, you must download the folder `static`, which
contains static files for database. Contents of the folder should be put in
`/backend/static`.

Download link -
[static](https://drive.google.com/drive/folders/1XM5FBm_3k-J4NVaOWumO7-rqiXJtwX92?usp=sharing)

After the `static` folder is in its place, you can execute the initialization
commands.

Migration populates your database with data about music, artists,
album covers, etc. It needs to be done once when
initializing the database.

```bash
npm install

npm run migration
```

## Application launch

```bash
# development
$ npm run start
```

## Swagger

To facilitate easier navigation through the API within the project,
the "Swagger" package has been added, which allows you to "poke around"
the API in a convenient graphical interface.

After the backend server has started, it will be available on
`http://localhost:3000/api/`

To make requests, you first need to authenticate. To do this, you need
to find the route `/api/auth/register`.

In the server's response to the registration request, you will receive
a token. You need to copy it and enter it into a special field, which
is available at the top of the page (the "Authorize" button).

After that, you will be considered an authorized user, and all API
functions will be available to you.

Authorization in the client application must be done separately.
These instructions are intended for getting acquainted with the API using
Swagger UI only.
