import { test, expect } from "@playwright/test";
import { ApiUrls } from "../support/urls";

type Product = {
  id: string | number;
  name: string;
  price: string | number;
};

const isValidProduct = (p: unknown): p is Product => {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  const has = (k: string) => Object.prototype.hasOwnProperty.call(o, k);
  return (
    has("id") &&
    has("name") &&
    has("price") &&
    (typeof o.id === "string" || typeof o.id === "number") &&
    typeof o.name === "string" &&
    (typeof o.price === "string" || typeof o.price === "number")
  );
};

test.describe("AutomationExercise API", () => {
  const BASE = ApiUrls.baseUrl;

  test("GET /productsList → 200 & valid product structure", async ({
    request,
  }) => {
    const url = `${BASE}/productsList`;
    const response = await request.get(url);

    await expect(response).toBeOK();

    const raw = await response.text();
    expect(raw.trim().startsWith("{")).toBeTruthy();

    const body = JSON.parse(raw);

    expect(body).toHaveProperty("products");
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    for (const product of body.products) {
      expect.soft(isValidProduct(product)).toBe(true);
      if (isValidProduct(product)) {
        expect(typeof product.name).toBe("string");
      }
    }
  });

  test("GET invalid endpoint → 404", async ({ request }) => {
    const response = await request.get(`${BASE}/invalidEndpoint`);
    expect(response.status()).toBe(404);
  });

  test("POST /searchProduct → 200 & returns matching products", async ({
    request,
  }) => {
    const searchTerm = "jean";

    const response = await request.post(`${BASE}/searchProduct`, {
      headers: { accept: "application/json" },
      form: { search_product: searchTerm },
    });

    expect(response.status()).toBe(200);

    const ct = response.headers()["content-type"] ?? "";
    if (!/json/i.test(ct)) {
      console.warn(`Non-JSON content-type received: ${ct}`);
    }

    const raw = await response.text();
    expect(raw.trim().startsWith("{")).toBeTruthy();
    const body = JSON.parse(raw);

    expect(body).toHaveProperty("products");
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    for (const product of body.products) {
      expect.soft(isValidProduct(product)).toBe(true);
      if (isValidProduct(product)) {
        expect(product.name.toLowerCase()).toContain(searchTerm.toLowerCase());
      }
    }
  });
});
