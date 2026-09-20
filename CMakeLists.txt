cmake_minimum_required(VERSION 4.3)
project(VoidEngine)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)

FetchContent_Declare(
        webview
        GIT_REPOSITORY https://github.com/webview/webview
        GIT_TAG 0.12.0
)

FetchContent_MakeAvailable(webview)

add_executable(VoidEngine WIN32 src/main.cpp resources/app.rc)

target_link_libraries(VoidEngine PRIVATE webview::core ole32 shell32 uuid user32 advapi32)

target_compile_definitions(VoidEngine PRIVATE PROJECT_SOURCE_DIR="${CMAKE_SOURCE_DIR}")
# Keep MinGW-built VoidEngine.exe portable. The editor must not require
# libgcc_s_seh-1.dll, libstdc++-6.dll or libwinpthread-1.dll next to the exe.
if (MINGW)
    target_link_options(VoidEngine PRIVATE -static-libgcc -static-libstdc++ -Wl,-Bstatic -lwinpthread -Wl,-Bdynamic)
endif()
