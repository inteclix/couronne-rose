import React from "react";

import Main from "./Main"
import Login from "./Login"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default () => {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null)
      }
    });
    
  }, [])

  if (user == null) {
    return <Login setUser={setUser} />
  } else {
    return <Main user={user} />
  }
}