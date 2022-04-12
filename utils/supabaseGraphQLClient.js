export async function supabaseGraphQLClient(query, { authorizationKey, variables }) {
  //console.log(authorizationKey);

  const graphQLRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: authorizationKey ? `Bearer ${authorizationKey}` : null,
      },
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

  console.log(json.data);

  return json.data;
}
