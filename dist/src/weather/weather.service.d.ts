import { HttpService } from '@nestjs/axios';
export declare class WeatherService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getWeather(city: string): Promise<{
        city: any;
        temperature: any;
        description: string;
        humidity: undefined;
        windSpeed: any;
        source: string;
    }>;
}
