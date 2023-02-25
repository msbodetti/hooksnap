import axios from "axios";

export default axios.create({
  baseURL: "https://fa.bdtechnologies.ch/api/v1",
  params: {
    // API params go here
  },
});
