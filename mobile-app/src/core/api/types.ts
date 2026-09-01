export interface ApiResponseEnvelope<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  meta?: {
    timestamp: string;
    correlationId?: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ApiErrorEnvelope {
  success: false;
  status: number;
  message: string;
  error?: {
    code: string;
    details?: string[];
  };
  meta?: {
    timestamp: string;
    correlationId?: string;
  };
}
