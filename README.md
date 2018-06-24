# domauthority

A summarizing tool for a variety of topics.

# Requirements

* `ruby` 2.4+
* `gem` 2.6+
* `postgres` 9.6+
* `bundle` 1.15+
* `node` 9.2+
* `yarn` 1.7+

# Getting Started

1. Ensure requirements are met.
2. Create a postgres user with roles for all application databases.

    ```$ createuser -d username```

3. Setup necessary environment variables.

    ```
    export SIMPLICIFY_DB_NAME_TEST=name
    export SIMPLICIFY_DB_USERNAME_TEST=username
    export SIMPLICIFY_DB_PASSWORD_TEST=password
    export SIMPLICIFY_DB_NAME_DEVELOPMENT=name
    export SIMPLICIFY_DB_USERNAME_DEVELOPMENT=username
    export SIMPLICIFY_DB_PASSWORD_DEVELOPMENT=password
    ```

4. Navigate to cloned directory.

    ```$ cd simplicify```

5. Navigate to backend at `/backend`.

    ```$ cd backend```

6. Install project gems.

    ```$ bundle install```

7. Setup your databases.

    ```
    $ rake db:create && RAILS_ENV=test rake db:create
    $ rake db:migrate && RAILS_ENV=test rake db:migrate
    ```

8. Start the backend server on port 4000.

    ```$ rails s -p 4000```

9. Navigate back to root then navigate to the frontend.

    ```$ cd ../frontend```

10. Install node modules.

    ```yarn install```

11. Start the client server.

    ```yarn start```

12. Visit the server in your browser.

    ```http://localhost:3000```

# Contributing

1. Fork.
2. Create feature branch.

    ```$ git checkout -b my-new-feature```

3. Commit changes.

    ```
    $ git add .
    $ git commit -m 'My new feature'
    ```

4. Verify tests.

    ```$ cd backend && rails t```

    ```$ cd frontend && yarn test```

5. Push to branch.

    ```$ git push origin my-new-feature```

6. Create new pull request.
