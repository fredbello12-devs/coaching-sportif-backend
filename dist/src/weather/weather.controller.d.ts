import { WeatherService } from './weather.service';
export declare class WeatherController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    getWeather(city: string): Promise<{
        city: any;
        temperature: any;
        description: string;
        humidity: undefined;
        windSpeed: any;
        source: string;
    }>;
}
