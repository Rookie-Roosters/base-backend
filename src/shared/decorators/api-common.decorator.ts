import { applyDecorators, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { startCase } from 'lodash';

import { API_RESPONSES, API_VERSIONS } from '@core/constants';

export function ApiController(name: string, params?: { version?: string; apiTag?: string }): ClassDecorator {
  const version = params?.version ?? API_VERSIONS.V1;
  const tag = startCase(params?.apiTag ?? name);
  return applyDecorators(
    ApiTags(tag),
    Controller({
      path: name,
      version,
    }),
  );
}

interface ApiMethodParams {
  path?: string;
  roles?: string[];
  summary?: string;
  description?: string;
  responseType?: any;
  responseDescription?: string;
}

function ApiMethod(params?: ApiMethodParams): MethodDecorator {
  const roles = params?.roles ? '[' + params.roles.map((e) => startCase(e)).join('/') + '] ' : '';
  return applyDecorators(
    ApiOperation({
      summary: roles + (params?.summary ?? ''),
      description: params?.description,
    }),
    ApiOkResponse({
      type: params?.responseType,
      description: params?.responseDescription,
    }),
    ApiResponse(API_RESPONSES.COMMON_ERROR),
  );
}

export function ApiPost(params?: ApiMethodParams): MethodDecorator {
  return applyDecorators(Post(params?.path), ApiMethod(params), HttpCode(HttpStatus.OK));
}

export function ApiGet(params?: ApiMethodParams): MethodDecorator {
  return applyDecorators(Get(params?.path), ApiMethod(params));
}

export function ApiPatch(params?: ApiMethodParams): MethodDecorator {
  return applyDecorators(Patch(params?.path), ApiMethod(params), HttpCode(HttpStatus.OK));
}

export function ApiPut(params?: ApiMethodParams): MethodDecorator {
  return applyDecorators(Put(params?.path), ApiMethod(params), HttpCode(HttpStatus.OK));
}

export function ApiDelete(params?: ApiMethodParams): MethodDecorator {
  return applyDecorators(Delete(params?.path), ApiMethod(params), ApiOkResponse(API_RESPONSES.DELETION));
}
