#include <node/node_api.h>
#include <stdio.h>
#include <stdlib.h>

static napi_value lib_getline(napi_env env, napi_callback_info info) {
	(void) info;

	napi_value res = NULL;
	char *buf = NULL;
	size_t sz = 0;
	if(getline(&buf, &sz, stdin) < 0
		|| napi_create_string_latin1(env, buf, NAPI_AUTO_LENGTH, &res))
		napi_get_null(env, &res);
	return res;
}

static napi_value init(napi_env env, napi_value exports) {
	(void) exports;

	napi_value func = NULL;
	napi_create_function(env, NULL, 0, lib_getline, NULL, &func);
	return func;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
