import { axiosInstance, axiosMock } from "../utils/axiosInstance";
import { sendRequest } from "../utils/requestUtils";
import { HttpMethod } from "../enum/httpMethods";
import { Task } from "../models/task.interface";

describe("PUT Tasks Test Suit", () => {
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

  test("Put Update Title And Description - 200 Ok", async () => {
    let updateData = {
      title: "update test",
      description: "update test",
    };

    responseData = { ...responseData, ...updateData };

    axiosMock.onPut(`/tasks/${responseData.taskId}`).reply(200, responseData);

    const response = await sendRequest(
      axiosInstance,
      HttpMethod.PUT,
      `/tasks/${responseData.taskId}`,
      responseData
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  test("PUT Update Task Not Found - 404 Not Found", async () => {
    responseData.taskId = "wrong id";
    axiosMock.onPut(`/tasks/${responseData.taskId}`).reply(404);

    try {
      await sendRequest(
        axiosInstance,
        HttpMethod.PUT,
        `/tasks/${responseData.taskId}`,
        responseData
      );
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("PUT Update Task Failed - 500 Internal Server Error", async () => {
    axiosMock.onPut(`/tasks/${responseData.taskId}`).reply(500);

    try {
      await sendRequest(
        axiosInstance,
        HttpMethod.PUT,
        `/tasks/${responseData.taskId}`,
        responseData
      );
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });
});
