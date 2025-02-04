export interface GreetOptions {
  name: string;
  enthusiastic?: boolean;
}

export function greet({ name, enthusiastic = false }: GreetOptions): string {
  const greeting = `Hello, ${name}`;
  return enthusiastic ? `${greeting}!` : greeting;
}

export class SDK {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public getApiKey(): string {
    return this.apiKey;
  }
}
