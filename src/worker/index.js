import { handleStaticAsset, isStaticAsset } from './assets.js'
import { handleApiRequest, isApiRequest, parseQuerystring } from './api.js'
import { handlePropsRequest, isPropsRequest } from './props.js'
import { handleViewRendering } from './render.js'

export { addCorsHeaders as cors } from './utils.js'

export async function handleEvent(
  event,
  {
    // Options
    http2ServerPush,
    // Hooks
    willRequestAsset,
    didRequestAsset,
    willRequestApi,
    didRequestApi,
    willRequestProps,
    didRequestProps,
    willRequestRender,
    didRequestRender,
  }
) {
  // --- PREFLIGHT REQUESTS
  if (event.request.method === 'OPTIONS') {
    return createResponse(null, { status: 204 })
  }

  // --- STATIC FILES
  if (isStaticAsset(event)) {
    willRequestAsset && (await willRequestAsset({ event }))
    const response = await handleStaticAsset(event)

    return (
      (didRequestAsset && (await didRequestAsset({ event, response }))) ||
      response
    )
  }

  // --- PROPS ENDPOINTS
  if (isPropsRequest(event)) {
    const { url, query } = parseQuerystring(event)

    willRequestProps && (await willRequestProps({ event, url, query }))
    const response = await handlePropsRequest(event)

    return (
      (didRequestProps &&
        (await didRequestProps({ event, url, query, response }))) ||
      response
    )
  }

  // --- API ENDPOINTS
  if (isApiRequest(event)) {
    const { url, query } = parseQuerystring(event)

    willRequestApi && (await willRequestApi({ event, url, query }))
    const response = await handleApiRequest(event)

    return (
      (didRequestApi &&
        (await didRequestApi({ event, url, query, response }))) ||
      response
    )
  }

  // --- SSR
  willRequestRender && (await willRequestRender({ event }))
  const response = await handleViewRendering(event, { http2ServerPush })

  return (
    (didRequestRender && (await didRequestRender({ event, html, response }))) ||
    response
  )
}
