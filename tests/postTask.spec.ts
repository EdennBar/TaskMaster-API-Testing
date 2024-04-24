import { axiosInstance, axiosMock } from "../utils/axiosInstance";
import { sendRequest } from "../utils/requestUtils";
import { HttpMethod } from "../enum/httpMethods";
import { Task } from "../models/task.interface";

describe("POST Tasks Test Suit", () => {
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

  test("Successful POST Request (Status 200)", async () => {
    axiosMock.onPost("/tasks").reply(200, responseData);

    const response = await sendRequest(
      axiosInstance,
      HttpMethod.POST,
      "/tasks",
      responseData
    );

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  test("POST Request - 404 Not Found", async () => {
    responseData.taskId = "wrong id";
    axiosMock.onPost("/tasks").reply(404);

    try {
      await sendRequest(axiosInstance, HttpMethod.POST, "/tasks", responseData);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("400 Bad Request Missing title field", async () => {
    const task = {
      taskId: crypto.randomUUID().toString(),
      description: "task",
      due_date: new Date().toString(),
    };

    axiosMock.onPost("/tasks").reply(400);

    try {
      await sendRequest(axiosInstance, HttpMethod.POST, `/tasks`, task);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("POST Request - 500 Internal Server Error", async () => {
    axiosMock.onPost("/tasks").reply(500);
    try {
      await sendRequest(axiosInstance, HttpMethod.POST, "/tasks", responseData);
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });
});
