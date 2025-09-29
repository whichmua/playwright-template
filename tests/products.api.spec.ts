import {
  test,
  expect,
  request,
  APIResponse,
  APIRequestContext,
} from "@playwright/test";
import { ApiUrls } from "../support/urls";

async function parseJsonOrThrow(response: APIResponse) {
  try {
    return await response.json();
  } catch {
    const text = await response.text();
    throw new Error(`Failed to parse JSON. Raw response:\n${text}`);
  }
}

test.describe("@api Products API", () => {
  let api: APIRequestContext;

  test.beforeAll(async () => {
    api = await request.newContext({ baseURL: ApiUrls.baseUrl });
  });

  test.afterAll(async () => {
    await api.dispose();
  });

  test("Get all products list", async () => {
    // Given I send a "GET" request to "/productsList"
    const response = await api.get("/productsList");

    // Then the response status should be "200"
    expect(
      response.status(),
      `Expected status 200, got ${response.status()}`,
    ).toBe(200);

    // And the response should contain a list of products
    const body = await parseJsonOrThrow(response);
    expect(body).toHaveProperty("products");
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    // And each product should have "id", "name", and "price"
    for (const [i, product] of body.products.entries()) {
      expect(product, `Product[${i}] missing 'id'`).toHaveProperty("id");
      expect(product, `Product[${i}] missing 'name'`).toHaveProperty("name");
      expect(product, `Product[${i}] missing 'price'`).toHaveProperty("price");
    }
  });

  test("Requesting an invalid endpoint returns 404", async () => {
    // When I send a "GET" request to "/invalidEndpoint"
    const response = await api.get("/invalidEndpoint");

    // Then the response status should be "404"
    expect(response.status()).toBe(404);
  });
});
