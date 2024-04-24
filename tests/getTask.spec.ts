import { axiosInstance, axiosMock } from "../utils/axiosInstance";
import { sendRequest } from "../utils/requestUtils";
import { HttpMethod } from "../enum/httpMethods";
import { Task } from "../models/task.interface";

describe("GET Tasks Test Suit", () => {
  let responseData: Task;

  beforeAll(() => {
    responseData = {
      taskId: crypto.randomUUID().toString(),
      title: "Complete API Testing Practices",
      description: "Write test cases and exectue them for api testing",
      due_date: new Date().toString(),
    };
  });

  afterEach(() => {
    axiosMock.reset();
  });

  test("Successful GET Request (Status 200)", async () => {
    axiosMock.onGet(`/tasks/${responseData.taskId}`).reply(200, responseData);

    const response = await sendRequest(
      axiosInstance,
      HttpMethod.GET,
      `/tasks/${responseData.taskId}`
    );

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  test("GET Request - 404 Not Found", async () => {
    const taskId = "not found id";
    axiosMock.onGet(`/tasks/${taskId}`).reply(404);

    try {
      await sendRequest(axiosInstance, HttpMethod.GET, `/tasks/${taskId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("GET Request - 404 Url Not Found", async () => {
    const url = `/not/real/endpoint`;

    try {
      await sendRequest(axiosInstance, HttpMethod.GET, url);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("GET Request - 500 Internal Server Error", async () => {
    const taskId = "task id";
    axiosMock.onGet(`/tasks/${taskId}`).reply(500);

    try {
      await sendRequest(axiosInstance, HttpMethod.GET, `/tasks/${taskId}`);
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });
});
