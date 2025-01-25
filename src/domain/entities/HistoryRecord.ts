// src/domain/entities/HistoryRecord.ts
export interface HistoryRecord {
	id: string; // ID único del registro
	endpoint: string; // Por ejemplo, /fusionados/people o /fusionados/people/{id}
	timestamp: string; // Fecha/hora en ISO, para ordenar cronológicamente
	responseData: any; // El contenido de la respuesta devuelta
}
