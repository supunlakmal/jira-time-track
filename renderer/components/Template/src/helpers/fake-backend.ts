import axios from "axios";
import MockAdapter from "axios-mock-adapter";

interface UserData {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
}

const mock = new MockAdapter(axios);

export function configureFakeBackend() {
  const users: UserData[] = [
    {
      id: 1,
      username: "konrix@coderthemes.com",
      password: "konrix",
      firstName: "konrix",
      lastName: "coderthemes",
      role: "Admin",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI",
    },
    {
      id: 1,
      username: "test",
      password: "test",
      firstName: "Test",
      lastName: "User",
      role: "Admin",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI",
    },
  ];

  mock.onPost("/login/").reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // get parameters from post request
        const params = JSON.parse(config.data);

        // find if any user matches login credentials
        const filteredUsers = users.filter((user) => {
          return (
            user.username === params.username &&
            user.password === params.password
          );
        });

        if (filteredUsers.length) {
          // if login details are valid return user details and fake jwt token
          const user = filteredUsers[0];
          resolve([200, user]);
        } else {
          // else return error
          resolve([401, { message: "Username or password is incorrect" }]);
        }
      }, 1000);
    });
  });

  mock.onPost("/register/").reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // get parameters from post request
        const params = JSON.parse(config.data);

        // add new users
        const [firstName, lastName] = params.fullname.split(" ");
        const newUser: UserData = {
          id: users.length + 1,
          username: firstName,
          password: params.password,
          firstName: firstName,
          lastName: lastName,
          role: "Admin",
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI",
        };
        users.push(newUser);

        resolve([200, newUser]);
      }, 1000);
    });
  });

  mock.onPost("/forgot-password/").reply(function (config) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // get parameters from post request
        const params = JSON.parse(config.data);

        // find if any user matches login credentials
        const filteredUsers = users.filter((user) => {
          return user.username === params.username;
        });

        if (filteredUsers.length) {
          // if login details are valid return user details and fake jwt token
          const responseJson = {
            message:
              "We've sent you a link to reset password to your registered email.",
          };
          resolve([200, responseJson]);
        } else {
          // else return error
          resolve([
            401,
            {
              message:
                "Sorry, we could not find any registered user with entered username",
            },
          ]);
        }
      }, 1000);
    });
  });
}
