export async function requestAPI(
  headers: HeadersInit,
  method: string,
  body: BodyInit,
  url: string,
  log: boolean = true
) {
  return await fetch(url, {
    mode: 'no-cors',
    headers: headers,
    method: method,
    body: body,
  })
    .then((res) => res.json())
    .then((data) => {
      // enter you logic when the fetch is successful
      if (log) console.log(data)
      return data
    })
    .catch((error) => {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error)
    })
}

export async function requestAPINoBody(
    headers: HeadersInit,
    method: string,
    url: string,
    log: boolean = true
) {
  return await fetch(url, {
    mode: 'no-cors',
    headers: headers,
    method: method,
  })
      .then((res) => res.json())
      .then((data) => {
        // enter you logic when the fetch is successful
        if (log) console.log(data)
        return data
      })
      .catch((error) => {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
      })
}

