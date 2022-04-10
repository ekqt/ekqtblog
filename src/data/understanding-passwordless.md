# Understanding Passwordless

Passwordless authentication enables a secure, seamless customer experience. It addressess the urgent priority for a secure and frictionless authentication as customer experieces move online.

> "As it names suggests, passwordless authentication involves verifying a user's identity with something other than a password. This might be a push notification sent to a secondary device or a unique biometric like the user's face or fingerprint." —[Auth0](https://auth0.com/docs/authenticate/passwordless)

The biggest and most compelling reasons for going passwordless are:

- **Effortless authentication**: Users don't need to remember anything to get what they want/need, it just provides an easier and frictionless experience.
- **Reduced costs**: Companies save money by avoiding password management (i.e. User needs help resetting their password). On average a password reset costs \$70.
- **Higher revenue**: Easier experiences equates to customer loyalty, satisfaction, higher conversation rates, and ultimately more revenue. It can improve conversation rates by [more than 50%](https://www.cio.com/article/3193206/ditching-passwords-and-increasing-ecommerce-conversion-rates-by-54.html).

## How to set Passwordless with a React Application

Configure the SDK by wrapping your application in `Auth0Provider`:

```javascript
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain="YOUR_AUTH0_DOMAIN"
    clientId="YOUR_AUTH0_CLIENT_ID"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("app")
);
```

Use the `useAuth0` hook in your components to access authentication state(`isLoading`, `isAuthenticated` and `user`) and authentication methods (`loginWithRedirect` and `logout`):

```javascript
// src/App.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name}{" "}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}

export default App;
```

### Use with a React Component

Use the `withAuth0` higher order component to add the `auth0` property to React components:

```javascript
import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

const Profile() => {
    const { user, isAuthenticated } = withAuth0;
  return (
    isAuthenticated && (
      <div>Hello {user.name}</div>;
    )
  )
}

export default Profile;
```

More on the Auth0 SDK for React Single Page Applications (SPA) [here](https://github.com/auth0/auth0-react).

Thanks for reading!
