export interface Mock {
  id: string;
  url: string;
  httpMethod: string;
  statusCode: number;
  delayInMS: number;
  body: string;
  headers: MockHeader[];
  isActive: boolean;
}

export interface MockHeader {
  key: string;
  value: string;
}

export type MockMode = 'new' | 'edit' | 'list';
