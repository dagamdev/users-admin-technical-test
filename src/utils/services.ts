import { API_ENDPOINT } from './config'

export async function customApiFetch<Data=any> (path: string): Promise<Data> {
  return await fetch(API_ENDPOINT + path).then(res => {
    const contentJson = res.headers.get('Content-Type')?.includes('application/json') ?? false

    if (contentJson) return res.json()

    throw new Error(`Error ${res.status}: ${res.statusText}`)
  })
}
