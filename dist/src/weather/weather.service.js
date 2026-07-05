"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const WMO_DESCRIPTIONS = {
    0: 'ciel dégagé',
    1: 'principalement dégagé',
    2: 'partiellement nuageux',
    3: 'couvert',
    45: 'brouillard',
    48: 'brouillard givrant',
    51: 'bruine légère',
    53: 'bruine modérée',
    55: 'bruine dense',
    61: 'pluie faible',
    63: 'pluie modérée',
    65: 'pluie forte',
    71: 'neige faible',
    73: 'neige modérée',
    75: 'neige forte',
    80: 'averses de pluie faibles',
    81: 'averses de pluie modérées',
    82: 'averses de pluie violentes',
    95: 'orages',
};
function describeWeather(code) {
    return WMO_DESCRIPTIONS[code] || `code ${code}`;
}
let WeatherService = class WeatherService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getWeather(city) {
        try {
            const geoResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://geocoding-api.open-meteo.com/v1/search', {
                params: { name: city, count: 1, language: 'fr' },
            }));
            const results = geoResponse.data?.results;
            if (!results || results.length === 0) {
                throw new common_1.BadRequestException(`Ville introuvable: ${city}`);
            }
            const { latitude, longitude, name } = results[0];
            const weatherResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude,
                    longitude,
                    current_weather: 'true',
                    timezone: 'auto',
                },
            }));
            const current = weatherResponse.data?.current_weather;
            if (!current) {
                throw new common_1.InternalServerErrorException('Données météo indisponibles');
            }
            return {
                city: name,
                temperature: current.temperature,
                description: describeWeather(current.weathercode),
                humidity: undefined,
                windSpeed: current.windspeed,
                source: 'Open-Meteo',
            };
        }
        catch (error) {
            const axiosError = error;
            if (axiosError?.response) {
                throw axiosError;
            }
            throw new common_1.InternalServerErrorException('Service météo indisponible');
        }
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WeatherService);
//# sourceMappingURL=weather.service.js.map