import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const instance = axios.create();
const mock = new MockAdapter(instance);

export { instance as axiosInstance, mock as axiosMock };
