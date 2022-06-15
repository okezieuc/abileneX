export async function supabaseGraphQLClient(
  query: string,
  {
    authorizationKey,
    variables,
  }: {
    authorizationKey?: string | null;
    variables?: Record<string, any>;
  }
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    Authorization: authorizationKey ? `Bearer ${authorizationKey}` : "",
  };

  const graphQLRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const json = await graphQLRequest.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}
