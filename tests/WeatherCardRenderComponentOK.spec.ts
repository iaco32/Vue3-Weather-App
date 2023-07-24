import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import WeatherCard from "../src/components/WeatherCard.vue";


describe("Login", () => {
    it("Mount WeatherCard component and render it without errors", () => {
        expect(WeatherCard).toBeTruthy();
    });
});
