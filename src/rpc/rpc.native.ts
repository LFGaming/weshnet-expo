import WeshnetExpoModule from '../WeshnetExpoModule';
import * as pb from 'protobufjs'

import {
	serializeToBase64,
	deserializeFromBase64,
	ErrorStreamNotImplemented,
	getServiceName,
} from './utils'

// native rpc implem
const unary = async <T extends pb.Method>(method: T, request: Uint8Array, _metadata?: never) => {
	const methodName = `/${getServiceName(method)}/${method.name}`
	const req64 = serializeToBase64(request)
    return WeshnetExpoModule.invokeMethod(methodName, req64).then((res64: string) => deserializeFromBase64(res64))
}

const stream = async (_method: unknown, _request: unknown, _metadata: unknown) => {
	throw ErrorStreamNotImplemented
}

export default {
	unaryCall: unary,
	streamCall: stream,
}
