let VueCookies = require("vue-cookies");

export default {
  namespaced: true,
  state: {
    userData: {},
    allUserData: {},
    anotherUser: {},
  },
  mutations: {
    setDataUser(state, payload) {
      state.userData = payload;
    },
    setAllDataUser(state, payload) {
      state.allUserData = payload;
    },
    setAnotherUser(state, payload) {
      state.anotherUser = payload;
    },
  },
  actions: {
    async getMyUser({ commit }) {
      try {
        const res = await fetch("http://localhost:5000/api/chat/user/one", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${VueCookies.get("accessToken")}`,
          },
        });

        const response = await res.json();
        commit("setDataUser", response.data);
        return response.data;
      } catch (err) {
        console.log(`error: ${err}`);
      }
    },
    async getAllUser({ commit }) {
      try {
        const res = await fetch("http://localhost:5000/api/chat/user/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${VueCookies.get("accessToken")}`,
          },
        });

        const response = await res.json();
        commit("setAllDataUser", response.data);
      } catch (error) {
        console.log(`error: ${error}`);
      }
    },
    async getOneUser(iduser) {
      console.log();
      try {
        const res = await fetch("http://localhost:5000/api/chat/user/one/id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${VueCookies.get("accessToken")}`,
          },
          body: JSON.stringify(iduser),
        });

        const response = await res.json();
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
