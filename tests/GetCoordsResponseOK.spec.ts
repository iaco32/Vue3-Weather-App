import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from 'axios';

vi.mock('axios');

describe('Test response API passing latitude and longitude', () => {
    beforeEach(() => {
        // reset the mocked get method 
        vi.spyOn(axios, 'get').mockReset();
    });

    it("Simulate API response", async () => {

        const API_BASE_URL = "http://api.openweathermap.org/data/2.5";
        const API_ID = "0e2e53624683a5f6ca318f8f88b88d9b";
        const lat = -7;
        const lon = 27;

        const mockResponse = {
            "coord": {
                "lon": 27,
                "lat": -7
            },
            "dt": 1687635037,
            "sys": {
                "country": "CD",
            },
            "timezone": 7200,
            "id": 209598,
            "name": "Manono",
        };

        const getLocationByCoords = async () => {
            return await axios.get(API_BASE_URL + `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_ID}`)
        }

        // mock server response
        vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

        const result = await getLocationByCoords();

        expect(axios.get).toHaveBeenCalledWith(API_BASE_URL + `/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_ID}`);

        // simulating a server response
        expect(result).toEqual(mockResponse);
    });
})