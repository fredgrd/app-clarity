class ApiService {
  baseUrl: string = 'http://localhost:3001/';

  async fetch<T>(
    endpoint: string,
    options?: {
      body?: any;
      method?: string;
      withCredentials?: boolean;
    }
  ): Promise<{ result?: T; error?: string }> {
    const { body, method, withCredentials } = options || {
      body: undefined,
      method: 'GET',
      withCredentials: true,
    };

    try {
      const response = await fetch(this.baseUrl + endpoint, {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: withCredentials ? 'include' : undefined,
        body: body && JSON.stringify(body),
      });

      console.log('HERE');

      if (!response.ok) {
        const error = await response.text();
        return { error };
      }

      console.log('HERE 2');

      const json = await response.json();

      return { result: json as T };
    } catch (error) {
      const typeError = error as TypeError;
      return { error: typeError.message };
    }
  }
}

export default ApiService;
