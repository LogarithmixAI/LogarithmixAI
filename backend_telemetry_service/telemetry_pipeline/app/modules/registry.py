from app.modules.http.http_call import HttpCallModule
from app.modules.http.http_error import HttpErrorModule
from app.modules.http.http_exception import HttpExceptionModule
from app.modules.span.span_module import SpanModule
from app.modules.log.log_module import LogModuleHandler
from app.modules.db.db_query import DbQueryModule
from app.modules.db.db_error import DbErrorModule
from app.modules.function.function_call import FunctionCallModule
from app.modules.function.slow_function import SlowFunctionModule
from app.modules.function.function_exception import FunctionExceptionModule
from app.modules.request.incoming_request import IncomingRequestModule
from app.modules.request.client_error import ClientErrorModule
from app.modules.request.server_error import ServerErrorRequestModule
from app.modules.identity.identity_module import IdentityModuleHandler

MODULE_REGISTRY = {
    "HTTP_CALL": HttpCallModule,
    "HTTP_ERROR": HttpErrorModule,
    "HTTP_EXCEPTION": HttpExceptionModule,
    "SPAN": SpanModule,
    "LOG": LogModuleHandler,
    "DB_QUERY": DbQueryModule,
    "DB_ERROR": DbErrorModule,
    "FUNCTION_CALL": FunctionCallModule,
    "SLOW_FUNCTION": SlowFunctionModule,
    "FUNCTION_EXCEPTION": FunctionExceptionModule,
    "INCOMING_REQUEST": IncomingRequestModule,
    "CLIENT_ERROR": ClientErrorModule,
    "SERVER_ERROR": ServerErrorRequestModule,
    "IDENTITY": IdentityModuleHandler,  # optional trigger
}