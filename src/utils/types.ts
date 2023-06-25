export interface JwtParseResult {
  aud: string;
  exp: number;
  sub: string;
  email: string;
  phone: string;
  app_metadata: Appmetadata;
  user_metadata: Usermetadata;
  role: string;
  aal: string;
  amr: Amr[];
  session_id: string;
}

interface Amr {
  method: string;
  timestamp: number;
}

interface Usermetadata {}

interface Appmetadata {
  provider: string;
  providers: string[];
}

export interface AxiosResponse {
  data: FixtureByIdResponse;
  status: number;
}

export interface FixtureByIdResponse {
  get: string;
  parameters: Record<string, unknown>;
  results: number;
  paging: Record<string, unknown>;
  response: Array<unknown>;
}
