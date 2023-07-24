import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from 'axios';

vi.mock('axios');

describe('Test response API passing the name of the city', () => {
    beforeEach(() => {
        // reset the mocked get method 
        vi.spyOn(axios, 'get').mockReset();
    });

    it("Simulate API response", async () => {

        const API_BASE_URL = "http://api.openweathermap.org/data/2.5";
        const API_ID = "0e2e53624683a5f6ca318f8f88b88d9b";

        const mockCity = "frankfurt";

        const mockResponse = {
            "coord": {
                "lon": 8.6833,
                "lat": 50.1167
            },
            "dt": 1687635311,
            "sys": {
                "country": "DE",
            },
            "timezone": 7200,
            "id": 2925533,
            "name": "Frankfurt am Main",
        };

        const getLocationByCityName = async (city: string) => {
            return await axios.get(API_BASE_URL + `/weather?q=${city}&units=metric&appid=${API_ID}`)
        }

        // mock server response
        vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

        const result = await getLocationByCityName(mockCity);

        expect(axios.get).toHaveBeenCalledWith(API_BASE_URL + `/weather?q=${mockCity}&units=metric&appid=${API_ID}`);

        // simulating a server response
        expect(result).toEqual(mockResponse);
    });
})