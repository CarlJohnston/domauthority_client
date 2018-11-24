# domauthority

A tracking tool for domain authority SEO metrics over time. Features include automatic tracking, visualization, etc.

# Requirements

* `ruby` 2.4+
* `gem` 2.6+
* `postgres` 9.6+
* `bundle` 1.15+
* `node` 9.2+
* `yarn` 1.9+

# Getting Started

1. Ensure requirements are met.
2. Create a postgres user with roles for all application databases.

    ```$ createuser -d username```

3. Setup necessary environment variables.

    ```
    export DOMAUTHORITY_DB_NAME_TEST=name
    export DOMAUTHORITY_DB_USERNAME_TEST=username
    export DOMAUTHORITY_DB_PASSWORD_TEST=password
    export DOMAUTHORITY_DB_NAME_DEVELOPMENT=name
    export DOMAUTHORITY_DB_USERNAME_DEVELOPMENT=username
    export DOMAUTHORITY_DB_PASSWORD_DEVELOPMENT=password
    ```

4. Navigate to backend.

    ```$ cd domauthority/backend```

5. Install project gems.

    ```$ bundle install```

6. Setup your databases.

    ```
    $ rake db:create && RAILS_ENV=test rake db:create
    $ rake db:migrate && RAILS_ENV=test rake db:migrate
    ```

7. Start the backend server on port 4000.

    ```$ rails s -p 4000```

8. Open a new shell and navigate to the frontend.

    ```$ cd domauthority/frontend```

9. Install node modules.

    ```yarn install```

10. Start the client server.

    ```yarn start```

11. Visit the server in your browser.

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
