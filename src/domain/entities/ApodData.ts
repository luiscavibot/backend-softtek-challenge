/**
 * Estructura de la respuesta de NASA APOD.
 * Adáptala a lo que realmente uses en tu aplicación.
 */
export interface ApodData {
	copyright?: string;
	date: string;
	explanation: string;
	hdurl?: string;
	media_type: string;
	service_version: string;
	title: string;
	url: string;
}
