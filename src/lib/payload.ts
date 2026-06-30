import { getPayload } from 'payload'
import config from '@payload-config'

/** Cached Payload Local API client for Server Components and the contact route. */
export const getPayloadClient = () => getPayload({ config })
