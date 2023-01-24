/**
 * Makes a request to the specified URL and returns the response as JSON.
 */
export default async function fetcher(url) {
  return fetch(url).then((r) => r.json());
}
