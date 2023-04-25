export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : {};

  return userInfo;
};

export const signOut = (router) => {
  localStorage.clear();
  router.push("/");
};
