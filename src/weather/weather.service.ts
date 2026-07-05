import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

const WMO_DESCRIPTIONS: Record<number, string> = {
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

function describeWeather(code: number): string {
  return WMO_DESCRIPTIONS[code] || `code ${code}`;
}

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(city: string) {
    try {
      const geoResponse = await firstValueFrom(
        this.httpService.get('https://geocoding-api.open-meteo.com/v1/search', {
          params: { name: city, count: 1, language: 'fr' },
        }),
      );

      const results = geoResponse.data?.results;
      if (!results || results.length === 0) {
        throw new BadRequestException(`Ville introuvable: ${city}`);
      }

      const { latitude, longitude, name } = results[0];

      const weatherResponse = await firstValueFrom(
        this.httpService.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude,
            longitude,
            current_weather: 'true',
            timezone: 'auto',
          },
        }),
      );

      const current = weatherResponse.data?.current_weather;
      if (!current) {
        throw new InternalServerErrorException('Données météo indisponibles');
      }

      return {
        city: name,
        temperature: current.temperature,
        description: describeWeather(current.weathercode),
        humidity: undefined,
        windSpeed: current.windspeed,
        source: 'Open-Meteo',
      };
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (axiosError?.response) {
        throw axiosError;
      }
      throw new InternalServerErrorException('Service météo indisponible');
    }
  }
}
