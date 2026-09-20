#include "webview/webview.h"

#include <algorithm>
#include <chrono>
#include <atomic>
#include <cctype>
#include <cstring>
#include <cstdint>
#include <cstdlib>
#include <filesystem>
#include <fstream>
#include <map>
#include <memory>
#include <mutex>
#include <sstream>
#include <string>
#include <thread>
#include <vector>
#include <set>

#ifdef _WIN32
#ifndef NOMINMAX
#define NOMINMAX
#endif
#include <windows.h>
#include <ShObjIdl.h>
#include <shellapi.h>
#include <tlhelp32.h>
#endif

namespace fs = std::filesystem;



struct ProjectMetadata {
    std::string name;
    std::string type;
    std::string projectTemplate;
    std::string engineVersion;
    std::string startupScene;
};

std::wstring utf8ToWide(const std::string& value) {
#ifdef _WIN32
    if (value.empty()) {
        return {};
    }

    const int size = MultiByteToWideChar(CP_UTF8, 0, value.c_str(), static_cast<int>(value.size()), nullptr, 0);

    std::wstring result(size, L'\0');
    MultiByteToWideChar(CP_UTF8, 0, value.c_str(), static_cast<int>(value.size()), result.data(), size);

    return result;
#else
    return {};
#endif
}

std::string wideToUtf8(const std::wstring& value) {
#ifdef _WIN32
    if (value.empty()) {
        return {};
    }

    const int size = WideCharToMultiByte(CP_UTF8, 0, value.c_str(), static_cast<int>(value.size()), nullptr, 0, nullptr, nullptr);

    std::string result(size, '\0');
    WideCharToMultiByte(CP_UTF8, 0, value.c_str(), static_cast<int>(value.size()), result.data(), size, nullptr, nullptr);

    return result;
#else
    return {};
#endif
}

fs::path utf8Path(const std::string& value) {
#ifdef _WIN32
    return fs::path(utf8ToWide(value));
#else
    return fs::path(value);
#endif
}

std::string pathToUtf8(const fs::path& path) {
#ifdef _WIN32
    return wideToUtf8(path.wstring());
#else
    return path.string();
#endif
}

#ifdef _WIN32
std::wstring currentExecutablePath() {
    std::wstring buffer(32768, L'\0');
    const DWORD length = GetModuleFileNameW(nullptr, buffer.data(), static_cast<DWORD>(buffer.size()));
    buffer.resize(length);
    return buffer;
}

bool setRegistryString(HKEY root, const std::wstring& subkey, const wchar_t* name, const std::wstring& value) {
    HKEY key = nullptr;
    if (RegCreateKeyExW(root, subkey.c_str(), 0, nullptr, 0, KEY_SET_VALUE, nullptr, &key, nullptr) != ERROR_SUCCESS) {
        return false;
    }
    const LONG result = RegSetValueExW(key, name, 0, REG_SZ,
        reinterpret_cast<const BYTE*>(value.c_str()), static_cast<DWORD>((value.size() + 1) * sizeof(wchar_t)));
    RegCloseKey(key);
    return result == ERROR_SUCCESS;
}

void registerVoidEditorFileIntegration() {
    const std::wstring exe = currentExecutablePath();
    if (exe.empty()) return;
    const std::wstring command = L"\\\"" + exe + L"\\\" \\\"%1\\\"";
    const std::wstring app = L"Software\\Classes\\Applications\\VoidEngine.exe";

    setRegistryString(HKEY_CURRENT_USER, app, L"FriendlyAppName", L"Void Editor");
    setRegistryString(HKEY_CURRENT_USER, app + L"\\shell\\open\\command", nullptr, command);

    const std::vector<std::wstring> supported = {
        L".txt", L".md", L".json", L".xml", L".yaml", L".yml", L".toml", L".ini", L".cfg",
        L".html", L".css", L".js", L".ts", L".c", L".h", L".cc", L".cpp", L".hpp", L".cxx",
        L".java", L".py", L".lua", L".cmake", L".glsl", L".vert", L".frag", L".shader", L".void"
    };
    for (const auto& extension : supported) {
        setRegistryString(HKEY_CURRENT_USER, app + L"\\SupportedTypes", extension.c_str(), L"");
    }

    // .void is a text/configuration file. It is associated with Void Editor, not described as an application.
    setRegistryString(HKEY_CURRENT_USER, L"Software\\Classes\\.void", nullptr, L"VoidEngine.Configuration");
    setRegistryString(HKEY_CURRENT_USER, L"Software\\Classes\\.void", L"Content Type", L"text/plain");
    setRegistryString(HKEY_CURRENT_USER, L"Software\\Classes\\.void", L"PerceivedType", L"text");
    setRegistryString(HKEY_CURRENT_USER, L"Software\\Classes\\.void\\OpenWithProgids", L"VoidEngine.Configuration", L"");
    setRegistryString(HKEY_CURRENT_USER, L"Software\\Classes\\VoidEngine.Configuration", nullptr, L"Void Engine Configuration");
    setRegistryString(HKEY_CURRENT_USER, L"Software\\Classes\\VoidEngine.Configuration", L"FriendlyTypeName", L"Void Engine Configuration");
    setRegistryString(HKEY_CURRENT_USER, L"Software\\Classes\\VoidEngine.Configuration\\DefaultIcon", nullptr, exe + L",0");
    setRegistryString(HKEY_CURRENT_USER, L"Software\\Classes\\VoidEngine.Configuration\\shell\\open\\command", nullptr, command);

    SHChangeNotify(SHCNE_ASSOCCHANGED, SHCNF_IDLIST, nullptr, nullptr);
}

std::string startupFileArgument() {
    int argc = 0;
    LPWSTR* argv = CommandLineToArgvW(GetCommandLineW(), &argc);
    if (!argv) return "";
    std::string result;
    if (argc >= 2) {
        std::error_code error;
        fs::path candidate(argv[1]);
        if (fs::is_regular_file(candidate, error)) result = pathToUtf8(fs::absolute(candidate, error));
    }
    LocalFree(argv);
    return result;
}
#endif

std::string jsonEscape(const std::string& value) {
    std::string result;
    result.reserve(value.size() + 16);

    for (unsigned char character : value) {
        switch (character) {
            case '"':
                result += "\\\"";
                break;
            case '\\':
                result += "\\\\";
                break;
            case '\b':
                result += "\\b";
                break;
            case '\f':
                result += "\\f";
                break;
            case '\n':
                result += "\\n";
                break;
            case '\r':
                result += "\\r";
                break;
            case '\t':
                result += "\\t";
                break;
            default:
                if (character >= 0x20) {
                    result += static_cast<char>(character);
                }
                break;
        }
    }

    return result;
}

std::string jsonString(const std::string& value) {
    return "\"" + jsonEscape(value) + "\"";
}

std::string trim(const std::string& value) {
    const std::size_t first = value.find_first_not_of(" \t\r\n");

    if (first == std::string::npos) {
        return "";
    }

    const std::size_t last = value.find_last_not_of(" \t\r\n");

    return value.substr(first, last - first + 1);
}

std::string toLower(std::string value) {
    std::transform(value.begin(), value.end(), value.begin(), [](unsigned char character) {
        return static_cast<char>(std::tolower(character));
    });

    return value;
}

bool isValidWindowsName(const std::string& name) {
    if (name.empty()) {
        return false;
    }

    static const std::string invalidCharacters = R"(\/:*?"<>|)";

    if (name.find_first_of(invalidCharacters) != std::string::npos) {
        return false;
    }

    if (name.back() == '.' || name.back() == ' ') {
        return false;
    }

    return true;
}

bool isValidProjectName(const std::string& name) {
    if (name.empty()) {
        return true;
    }

    return isValidWindowsName(name);
}

bool isTextFile(const fs::path& path) {
    const std::string fileName = toLower(pathToUtf8(path.filename()));

    static const std::vector<std::string> specialNames = {
        "cmakelists.txt",
        "makefile",
        "dockerfile",
        ".gitignore",
        ".gitattributes",
        ".editorconfig"
    };

    if (std::find(specialNames.begin(), specialNames.end(), fileName) != specialNames.end()) {
        return true;
    }

    const std::string extension = toLower(pathToUtf8(path.extension()));

    static const std::vector<std::string> extensions = {
        ".txt",
        ".md",
        ".json",
        ".xml",
        ".yaml",
        ".yml",
        ".toml",
        ".ini",
        ".cfg",
        ".conf",
        ".properties",
        ".csv",
        ".html",
        ".htm",
        ".css",
        ".scss",
        ".js",
        ".mjs",
        ".ts",
        ".jsx",
        ".tsx",
        ".c",
        ".h",
        ".cc",
        ".cpp",
        ".hpp",
        ".cxx",
        ".hxx",
        ".java",
        ".kt",
        ".kts",
        ".gradle",
        ".py",
        ".lua",
        ".luau",
        ".cmake",
        ".glsl",
        ".vert",
        ".frag",
        ".shader",
        ".vscene",
        ".void"
    };

    return std::find(extensions.begin(), extensions.end(), extension) != extensions.end();
}

bool isImageFile(const fs::path& path) {
    const std::string extension = toLower(pathToUtf8(path.extension()));

    static const std::vector<std::string> extensions = {
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".gif",
        ".bmp",
        ".ico",
        ".svg"
    };

    return std::find(extensions.begin(), extensions.end(), extension) != extensions.end();
}

std::string readTextFileContent(const fs::path& path) {
    std::ifstream input(path, std::ios::binary);

    if (!input) {
        return "";
    }

    input.seekg(0, std::ios::end);
    const std::streamoff size = input.tellg();
    input.seekg(0, std::ios::beg);

    if (size < 0) {
        return "";
    }

    std::string content;
    content.resize(static_cast<std::size_t>(size));

    if (size > 0) {
        input.read(content.data(), size);
    }

    return content;
}

ProjectMetadata readProjectMetadata(const fs::path& projectPath) {
    ProjectMetadata metadata;

    metadata.name = pathToUtf8(projectPath.filename());
    metadata.type = "text";
    metadata.projectTemplate = "empty";
    metadata.engineVersion = "0.0.1";

    std::ifstream input(projectPath / "project_type.void");

    if (!input) {
        return metadata;
    }

    std::string line;

    while (std::getline(input, line)) {
        const std::size_t separator = line.find('=');

        if (separator == std::string::npos) {
            continue;
        }

        const std::string key = trim(line.substr(0, separator));
        const std::string value = trim(line.substr(separator + 1));

        if (key == "name") {
            metadata.name = value;
        } else if (key == "type") {
            metadata.type = value;
        } else if (key == "template") {
            metadata.projectTemplate = value;
        } else if (key == "engine_version") {
            metadata.engineVersion = value;
        } else if (key == "startup_scene") {
            metadata.startupScene = value;
        }
    }

    return metadata;
}

bool pathStartsWith(const fs::path& root, const fs::path& candidate) {
    std::error_code error;

    const fs::path canonicalRoot = fs::weakly_canonical(root, error);

    if (error) {
        return false;
    }

    const fs::path canonicalCandidate = fs::weakly_canonical(candidate, error);

    if (error) {
        return false;
    }

    auto rootIterator = canonicalRoot.begin();
    auto candidateIterator = canonicalCandidate.begin();

    for (; rootIterator != canonicalRoot.end(); ++rootIterator, ++candidateIterator) {
        if (candidateIterator == canonicalCandidate.end() || *rootIterator != *candidateIterator) {
            return false;
        }
    }

    return true;
}

std::string getSystemLevel(const fs::path& projectRoot, const fs::path& path) {
    std::error_code error;
    const fs::path relative = fs::relative(path, projectRoot, error);

    if (error) {
        return "normal";
    }

    auto iterator = relative.begin();

    if (iterator == relative.end()) {
        return "normal";
    }

    const std::string first = toLower(pathToUtf8(*iterator));
    const std::string fileName = toLower(pathToUtf8(path.filename()));

    if (first == "build" || first.starts_with("cmake-build-") || first == "out" || first == ".vs") {
        return "generated";
    }

    if (first == "config" || first == ".idea" || fileName == "project_type.void" || fileName == "cmakelists.txt" || fileName == ".editorconfig") {
        return "config";
    }

    return "normal";
}

std::string getFileKind(const fs::path& path) {
    std::error_code error;

    if (fs::is_directory(path, error)) {
        return "folder";
    }

    if (isImageFile(path)) {
        return "image";
    }

    if (isTextFile(path)) {
        return "text";
    }

    return "binary";
}

std::string makeEntryPayload(const fs::path& projectRoot, const fs::path& path) {
    std::error_code error;

    const std::string kind = getFileKind(path);
    std::uintmax_t size = 0;

    if (kind != "folder") {
        size = fs::file_size(path, error);

        if (error) {
            size = 0;
        }
    }

    return "{"
        "\"name\":" + jsonString(pathToUtf8(path.filename())) + ","
        "\"path\":" + jsonString(pathToUtf8(path)) + ","
        "\"kind\":" + jsonString(kind) + ","
        "\"extension\":" + jsonString(toLower(pathToUtf8(path.extension()))) + ","
        "\"size\":" + std::to_string(size) + ","
        "\"systemLevel\":" + jsonString(getSystemLevel(projectRoot, path)) +
        "}";
}

std::string listDirectory(const fs::path& projectRoot, const fs::path& directory) {
    if (!fs::exists(directory) || !fs::is_directory(directory) || !pathStartsWith(projectRoot, directory)) {
        return "{\"error\":\"Invalid project directory.\"}";
    }

    std::vector<fs::path> entries;
    std::error_code error;

    for (const auto& entry : fs::directory_iterator(directory, fs::directory_options::skip_permission_denied, error)) {
        if (error) {
            break;
        }

        entries.push_back(entry.path());
    }

    std::sort(entries.begin(), entries.end(), [](const fs::path& first, const fs::path& second) {
        std::error_code firstError;
        std::error_code secondError;

        const bool firstDirectory = fs::is_directory(first, firstError);
        const bool secondDirectory = fs::is_directory(second, secondError);

        if (firstDirectory != secondDirectory) {
            return firstDirectory;
        }

        return toLower(pathToUtf8(first.filename())) < toLower(pathToUtf8(second.filename()));
    });

    std::string result = "{\"entries\":[";

    bool first = true;

    for (const fs::path& path : entries) {
        if (!first) {
            result += ",";
        }

        result += makeEntryPayload(projectRoot, path);
        first = false;
    }

    result += "]}";

    return result;
}

void migrateProjectIfNeeded(const fs::path& projectPath);

std::string makeProjectPayload(const fs::path& projectPath) {
    if (!fs::exists(projectPath / "project_type.void")) {
        return "{\"error\":\"This folder is not a Void Engine project. project_type.void was not found.\"}";
    }

    migrateProjectIfNeeded(projectPath);
    const ProjectMetadata metadata = readProjectMetadata(projectPath);

    return "{"
        "\"kind\":\"project\","
        "\"name\":" + jsonString(metadata.name) + ","
        "\"path\":" + jsonString(pathToUtf8(projectPath)) + ","
        "\"type\":" + jsonString(metadata.type) + ","
        "\"template\":" + jsonString(metadata.projectTemplate) + ","
        "\"engineVersion\":" + jsonString(metadata.engineVersion) + ","
        "\"startupScene\":" + jsonString(metadata.startupScene) +
        "}";
}

std::string makeStandaloneFilePayload(const fs::path& path) {
    if (!fs::exists(path) || !fs::is_regular_file(path)) {
        return "{\"error\":\"File does not exist.\"}";
    }

    std::error_code error;
    const std::uintmax_t size = fs::file_size(path, error);

    if (isTextFile(path)) {
        return "{"
            "\"kind\":\"text\","
            "\"name\":" + jsonString(pathToUtf8(path.filename())) + ","
            "\"path\":" + jsonString(pathToUtf8(path)) + ","
            "\"extension\":" + jsonString(toLower(pathToUtf8(path.extension()))) + ","
            "\"size\":" + std::to_string(error ? 0 : size) + ","
            "\"content\":" + jsonString(readTextFileContent(path)) +
            "}";
    }

    if (isImageFile(path)) {
        return "{"
            "\"kind\":\"image\","
            "\"name\":" + jsonString(pathToUtf8(path.filename())) + ","
            "\"path\":" + jsonString(pathToUtf8(path)) + ","
            "\"extension\":" + jsonString(toLower(pathToUtf8(path.extension()))) + ","
            "\"size\":" + std::to_string(error ? 0 : size) +
            "}";
    }

    return "{\"error\":\"This file cannot be opened in the Light Editor.\"}";
}

std::string getSuggestedProjectName(const fs::path& basePath) {
    int index = 1;

    while (true) {
        const std::string name = "void_project_" + std::to_string(index);

        if (!fs::exists(basePath / utf8Path(name))) {
            return name;
        }

        ++index;
    }
}

void writeBasicCMakeFile(const fs::path& projectPath) {
    std::ofstream cmakeFile(projectPath / "CMakeLists.txt", std::ios::binary);

    cmakeFile << "cmake_minimum_required(VERSION 4.0)\n";
    cmakeFile << "project(VoidProject LANGUAGES CXX)\n\n";
    cmakeFile << "set(CMAKE_CXX_STANDARD 23)\n";
    cmakeFile << "set(CMAKE_CXX_STANDARD_REQUIRED ON)\n\n";
    cmakeFile << "set(CMAKE_RUNTIME_OUTPUT_DIRECTORY \"${CMAKE_SOURCE_DIR}/build/bin\")\n";
    cmakeFile << "set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG \"${CMAKE_SOURCE_DIR}/build/bin\")\n";
    cmakeFile << "set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE \"${CMAKE_SOURCE_DIR}/build/bin\")\n";
    cmakeFile << "set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELWITHDEBINFO \"${CMAKE_SOURCE_DIR}/build/bin\")\n";
    cmakeFile << "set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_MINSIZEREL \"${CMAKE_SOURCE_DIR}/build/bin\")\n\n";
    cmakeFile << "add_executable(VoidApp src/main.cpp)\n";
}


fs::path getAppDataDirectory() {
#ifdef _WIN32
    const char* appData = std::getenv("APPDATA");

    if (appData != nullptr && *appData != '\0') {
        return utf8Path(appData) / "VoidEngine";
    }
#endif

    return fs::temp_directory_path() / "VoidEngine";
}

std::string loadAppState() {
    const fs::path statePath = getAppDataDirectory() / "state.json";

    if (!fs::exists(statePath)) {
        return "{}";
    }

    std::ifstream input(statePath, std::ios::binary);

    if (!input) {
        return "{}";
    }

    std::ostringstream stream;
    stream << input.rdbuf();

    const std::string content = stream.str();
    return content.empty() ? "{}" : content;
}

bool saveAppState(const std::string& state) {
    try {
        const fs::path directory = getAppDataDirectory();
        fs::create_directories(directory);

        std::ofstream output(directory / "state.json", std::ios::binary | std::ios::trunc);

        if (!output) {
            return false;
        }

        output.write(state.data(), static_cast<std::streamsize>(state.size()));
        return static_cast<bool>(output);
    } catch (...) {
        return false;
    }
}

void migrateProjectIfNeeded(const fs::path& projectPath) {
    try {
        const fs::path sourceFile = projectPath / "src" / "main.cpp";

        if (fs::exists(sourceFile)) {
            if (!fs::exists(projectPath / "CMakeLists.txt")) {
                writeBasicCMakeFile(projectPath);
            }

            if (!fs::exists(projectPath / "Config")) {
                fs::create_directories(projectPath / "Config");
            }

            const fs::path engineConfigPath = projectPath / "Config" / "engine.void";

            if (!fs::exists(engineConfigPath)) {
                std::ofstream engineConfig(engineConfigPath, std::ios::binary);
                engineConfig << "build_type = debug\n";
                engineConfig << "auto_save = true\n";
            }
        }
    } catch (...) {
    }
}

std::string moveProjectPath(const fs::path& projectRoot, const fs::path& sourcePath, const fs::path& destinationDirectory) {
    if (!pathStartsWith(projectRoot, sourcePath) || !pathStartsWith(projectRoot, destinationDirectory)) {
        return "{\"error\":\"Path is outside the project.\"}";
    }

    if (sourcePath == projectRoot || !fs::exists(sourcePath) || !fs::is_directory(destinationDirectory)) {
        return "{\"error\":\"Invalid move operation.\"}";
    }

    if (fs::is_directory(sourcePath) && pathStartsWith(sourcePath, destinationDirectory)) {
        return "{\"error\":\"A folder cannot be moved into itself.\"}";
    }

    const fs::path destination = destinationDirectory / sourcePath.filename();

    if (destination == sourcePath) {
        return "{\"success\":true}";
    }

    if (fs::exists(destination)) {
        return "{\"error\":\"An item with this name already exists in the destination.\"}";
    }

    try {
        fs::rename(sourcePath, destination);
        return "{\"success\":true,\"path\":" + jsonString(pathToUtf8(destination)) + "}";
    } catch (const std::exception& exception) {
        return "{\"error\":" + jsonString(exception.what()) + "}";
    }
}

std::string importExternalPath(const fs::path& projectRoot, const fs::path& sourcePath, const fs::path& destinationDirectory) {
    if (!pathStartsWith(projectRoot, destinationDirectory) || !fs::is_directory(destinationDirectory) || !fs::exists(sourcePath)) {
        return "{\"error\":\"Invalid import operation.\"}";
    }

    fs::path destination = destinationDirectory / sourcePath.filename();
    if (fs::exists(destination)) {
        return "{\"error\":\"An item with this name already exists in the destination.\"}";
    }

    try {
        if (fs::is_directory(sourcePath)) {
            fs::copy(sourcePath, destination, fs::copy_options::recursive);
        } else {
            fs::copy_file(sourcePath, destination);
        }
        return "{\"success\":true,\"path\":" + jsonString(pathToUtf8(destination)) + "}";
    } catch (const std::exception& exception) {
        return "{\"error\":" + jsonString(exception.what()) + "}";
    }
}

std::string copyProjectPath(const fs::path& projectRoot, const fs::path& sourcePath, const fs::path& destinationDirectory) {
    if (!pathStartsWith(projectRoot, sourcePath) || !pathStartsWith(projectRoot, destinationDirectory)) {
        return "{\"error\":\"Path is outside the project.\"}";
    }

    if (!fs::exists(sourcePath) || !fs::is_directory(destinationDirectory)) {
        return "{\"error\":\"Invalid copy operation.\"}";
    }

    fs::path destination = destinationDirectory / sourcePath.filename();
    if (fs::exists(destination)) {
        const std::string stem = pathToUtf8(sourcePath.stem());
        const std::string extension = pathToUtf8(sourcePath.extension());
        int counter = 2;
        do {
            destination = destinationDirectory / utf8Path(stem + " copy" + (counter > 2 ? " " + std::to_string(counter) : "") + extension);
            ++counter;
        } while (fs::exists(destination));
    }

    try {
        if (fs::is_directory(sourcePath)) {
            fs::copy(sourcePath, destination, fs::copy_options::recursive);
        } else {
            fs::copy_file(sourcePath, destination);
        }
        return "{\"success\":true,\"path\":" + jsonString(pathToUtf8(destination)) + "}";
    } catch (const std::exception& exception) {
        return "{\"error\":" + jsonString(exception.what()) + "}";
    }
}

std::string trashProjectPath(const fs::path& projectRoot, const fs::path& sourcePath) {
    if (!pathStartsWith(projectRoot, sourcePath) || sourcePath == projectRoot || !fs::exists(sourcePath)) {
        return "{\"error\":\"Invalid project item.\"}";
    }

    try {
        fs::path trashRoot = getAppDataDirectory() / "Trash";
        fs::create_directories(trashRoot);
        const auto now = std::chrono::high_resolution_clock::now().time_since_epoch().count();
        fs::path trashPath = trashRoot / utf8Path(std::to_string(now) + "_" + pathToUtf8(sourcePath.filename()));
        fs::rename(sourcePath, trashPath);
        return "{\"success\":true,\"original\":" + jsonString(pathToUtf8(sourcePath)) + ",\"trash\":" + jsonString(pathToUtf8(trashPath)) + "}";
    } catch (const std::exception& exception) {
        return "{\"error\":" + jsonString(exception.what()) + "}";
    }
}

std::string restoreTrashedPath(const fs::path& projectRoot, const fs::path& trashPath, const fs::path& originalPath) {
    if (!pathStartsWith(projectRoot, originalPath) || !fs::exists(trashPath)) {
        return "{\"error\":\"Cannot restore item.\"}";
    }

    try {
        if (fs::exists(originalPath)) {
            return "{\"error\":\"Original path is already occupied.\"}";
        }
        fs::create_directories(originalPath.parent_path());
        fs::rename(trashPath, originalPath);
        return "{\"success\":true,\"path\":" + jsonString(pathToUtf8(originalPath)) + "}";
    } catch (const std::exception& exception) {
        return "{\"error\":" + jsonString(exception.what()) + "}";
    }
}

std::string renameProjectPath(const fs::path& projectRoot, const fs::path& sourcePath, const std::string& newName) {
    if (!pathStartsWith(projectRoot, sourcePath) || sourcePath == projectRoot || !fs::exists(sourcePath)) {
        return "{\"error\":\"Invalid project item.\"}";
    }

    if (!isValidWindowsName(newName)) {
        return "{\"error\":\"Invalid file or folder name.\"}";
    }

    const fs::path destination = sourcePath.parent_path() / utf8Path(newName);

    if (fs::exists(destination)) {
        return "{\"error\":\"An item with this name already exists.\"}";
    }

    try {
        fs::rename(sourcePath, destination);
        return "{\"success\":true,\"path\":" + jsonString(pathToUtf8(destination)) + "}";
    } catch (const std::exception& exception) {
        return "{\"error\":" + jsonString(exception.what()) + "}";
    }
}

std::string deleteProjectPath(const fs::path& projectRoot, const fs::path& sourcePath) {
    return trashProjectPath(projectRoot, sourcePath);
}

std::string searchProject(const fs::path& projectRoot, const std::string& rawQuery, const std::string& mode) {
    const std::string query = toLower(trim(rawQuery));

    if (query.empty()) {
        return "{\"results\":[]}";
    }

    std::string result = "{\"results\":[";
    bool first = true;
    int resultCount = 0;
    constexpr int maxResults = 250;
    std::error_code error;

    for (fs::recursive_directory_iterator iterator(projectRoot, fs::directory_options::skip_permission_denied, error), end; iterator != end && resultCount < maxResults; iterator.increment(error)) {
        if (error) {
            error.clear();
            continue;
        }

        const fs::path path = iterator->path();
        const std::string name = pathToUtf8(path.filename());
        const std::string lowerName = toLower(name);
        const std::string kind = getFileKind(path);

        if (mode == "files" && lowerName.find(query) != std::string::npos) {
            if (!first) {
                result += ",";
            }

            result += "{\"name\":" + jsonString(name)
                + ",\"path\":" + jsonString(pathToUtf8(path))
                + ",\"kind\":" + jsonString(kind)
                + ",\"extension\":" + jsonString(toLower(pathToUtf8(path.extension())))
                + ",\"systemLevel\":" + jsonString(getSystemLevel(projectRoot, path))
                + ",\"matchType\":\"file\"}";
            first = false;
            ++resultCount;
            continue;
        }

        if (mode != "text" || kind != "text") {
            continue;
        }

        const auto size = fs::file_size(path, error);

        if (error || size > 2 * 1024 * 1024) {
            error.clear();
            continue;
        }

        std::ifstream input(path, std::ios::binary);
        std::string line;
        int lineNumber = 0;

        while (std::getline(input, line) && resultCount < maxResults) {
            ++lineNumber;
            const std::string lowerLine = toLower(line);
            const std::size_t position = lowerLine.find(query);

            if (position == std::string::npos) {
                continue;
            }

            std::string preview = trim(line);

            if (preview.size() > 160) {
                preview = preview.substr(0, 157) + "...";
            }

            if (!first) {
                result += ",";
            }

            result += "{\"name\":" + jsonString(name)
                + ",\"path\":" + jsonString(pathToUtf8(path))
                + ",\"kind\":\"text\""
                + ",\"extension\":" + jsonString(toLower(pathToUtf8(path.extension())))
                + ",\"systemLevel\":" + jsonString(getSystemLevel(projectRoot, path))
                + ",\"matchType\":\"text\""
                + ",\"line\":" + std::to_string(lineNumber)
                + ",\"preview\":" + jsonString(preview) + "}";
            first = false;
            ++resultCount;
        }
    }

    result += "]}";
    return result;
}

std::string createProject(const std::string& requestedName, const std::string& location, const std::string& projectType, const std::string& projectTemplate) {
    if (location.empty()) {
        return "{\"error\":\"Choose a project location.\"}";
    }

    if (projectType != "text") {
        return "{\"error\":\"3D projects are not available yet. Create a Text Project.\"}";
    }

    if (projectTemplate != "empty" && projectTemplate != "basic") {
        return "{\"error\":\"Invalid project template.\"}";
    }

    const fs::path basePath = utf8Path(location);

    std::string projectName = trim(requestedName);

    if (!isValidProjectName(projectName)) {
        return "{\"error\":\"Project name cannot contain \\\\ / : * ? \\\" < > | and cannot end with a dot or space.\"}";
    }

    try {
        fs::create_directories(basePath);

        if (projectName.empty()) {
            projectName = getSuggestedProjectName(basePath);
        }

        const fs::path projectPath = basePath / utf8Path(projectName);

        if (fs::exists(projectPath)) {
            return "{\"error\":\"A folder with this project name already exists.\"}";
        }

        fs::create_directories(projectPath);

        std::ofstream metadata(projectPath / "project_type.void", std::ios::binary);

        if (!metadata) {
            return "{\"error\":\"Failed to create project_type.void.\"}";
        }

        metadata << "type = " << projectType << "\n";
        metadata << "template = " << projectTemplate << "\n";
        metadata << "name = " << projectName << "\n";
        metadata << "engine_version = 0.0.1\n";

        if (projectType == "3d" && projectTemplate == "basic") {
            metadata << "startup_scene = Content/Scenes/Main.vscene\n";
        }

        metadata.close();

        if (projectTemplate == "basic") {
            fs::create_directories(projectPath / "src");
            fs::create_directories(projectPath / "Config");

            std::ofstream mainFile(projectPath / "src" / "main.cpp", std::ios::binary);

            mainFile << "#include <iostream>\n\n";
            mainFile << "int main() {\n";
            mainFile << "    std::cout << \"Void project started\" << std::endl;\n";
            mainFile << "    return 0;\n";
            mainFile << "}\n";

            std::ofstream engineConfig(projectPath / "Config" / "engine.void", std::ios::binary);

            engineConfig << "build_type = debug\n";
            engineConfig << "auto_save = true\n";

            writeBasicCMakeFile(projectPath);

            if (projectType == "3d") {
                fs::create_directories(projectPath / "Content" / "Scenes");
                fs::create_directories(projectPath / "Content" / "Models");
                fs::create_directories(projectPath / "Content" / "Materials");
                fs::create_directories(projectPath / "Content" / "Textures");

                std::ofstream sceneFile(projectPath / "Content" / "Scenes" / "Main.vscene", std::ios::binary);

                sceneFile << "{\n";
                sceneFile << "    \"name\": \"Main\",\n";
                sceneFile << "    \"entities\": []\n";
                sceneFile << "}\n";
            }
        }

        return makeProjectPayload(projectPath);
    } catch (const std::exception& exception) {
        return "{\"error\":" + jsonString(exception.what()) + "}";
    }
}

std::string createProjectFile(const fs::path& projectRoot, const fs::path& parentPath, const std::string& fileName, const std::string& preset) {
    if (!pathStartsWith(projectRoot, parentPath) || !fs::is_directory(parentPath)) {
        return "{\"error\":\"Invalid destination folder.\"}";
    }

    if (!isValidWindowsName(fileName)) {
        return "{\"error\":\"Invalid file name.\"}";
    }

    fs::path targetPath = parentPath / utf8Path(fileName);

    if (preset == "cpp" && targetPath.extension().empty()) {
        targetPath += ".cpp";
    } else if (preset == "hpp" && targetPath.extension().empty()) {
        targetPath += ".hpp";
    } else if (preset == "lua" && targetPath.extension().empty()) {
        targetPath += ".lua";
    } else if (preset == "json" && targetPath.extension().empty()) {
        targetPath += ".json";
    } else if (preset == "js" && targetPath.extension().empty()) {
        targetPath += ".js";
    } else if (preset == "html" && targetPath.extension().empty()) {
        targetPath += ".html";
    } else if (preset == "css" && targetPath.extension().empty()) {
        targetPath += ".css";
    } else if (preset == "text" && targetPath.extension().empty()) {
        targetPath += ".txt";
    } else if (preset == "shader" && targetPath.extension().empty()) {
        targetPath += ".glsl";
    }

    if (fs::exists(targetPath)) {
        return "{\"error\":\"A file with this name already exists.\"}";
    }

    std::ofstream output(targetPath, std::ios::binary);

    if (!output) {
        return "{\"error\":\"Failed to create file.\"}";
    }

    if (preset == "cpp") {
        output << "#include <iostream>\n\n";
        output << "int main() {\n";
        output << "    return 0;\n";
        output << "}\n";
    } else if (preset == "hpp") {
        output << "#pragma once\n";
    } else if (preset == "lua") {
        output << "-- Void Engine Lua file\n";
    } else if (preset == "json") {
        output << "{\n";
        output << "}\n";
    } else if (preset == "js") {
        output << "// Void Engine JavaScript file\n";
    } else if (preset == "html") {
        output << "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Void App</title>\n</head>\n<body>\n\n</body>\n</html>\n";
    } else if (preset == "css") {
        output << "/* Void Engine stylesheet */\n";
    } else if (preset == "shader") {
        output << "#version 460 core\n\n";
        output << "void main() {\n";
        output << "}\n";
    }

    output.close();

    return makeEntryPayload(projectRoot, targetPath);
}

std::string createProjectFolder(const fs::path& projectRoot, const fs::path& parentPath, const std::string& folderName) {
    if (!pathStartsWith(projectRoot, parentPath) || !fs::is_directory(parentPath)) {
        return "{\"error\":\"Invalid destination folder.\"}";
    }

    if (!isValidWindowsName(folderName)) {
        return "{\"error\":\"Invalid folder name.\"}";
    }

    const fs::path targetPath = parentPath / utf8Path(folderName);

    if (fs::exists(targetPath)) {
        return "{\"error\":\"A folder with this name already exists.\"}";
    }

    if (!fs::create_directories(targetPath)) {
        return "{\"error\":\"Failed to create folder.\"}";
    }

    return makeEntryPayload(projectRoot, targetPath);
}

#ifdef _WIN32

fs::path showFolderDialog(const wchar_t* title) {
    IFileOpenDialog* dialog = nullptr;

    if (FAILED(CoCreateInstance(CLSID_FileOpenDialog, nullptr, CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&dialog))) || dialog == nullptr) {
        return {};
    }

    FILEOPENDIALOGOPTIONS options = {};

    if (SUCCEEDED(dialog->GetOptions(&options))) {
        dialog->SetOptions(options | FOS_PICKFOLDERS | FOS_FORCEFILESYSTEM | FOS_PATHMUSTEXIST);
    }

    dialog->SetTitle(title);

    if (FAILED(dialog->Show(nullptr))) {
        dialog->Release();
        return {};
    }

    IShellItem* item = nullptr;

    if (FAILED(dialog->GetResult(&item)) || item == nullptr) {
        dialog->Release();
        return {};
    }

    PWSTR selectedPath = nullptr;

    if (FAILED(item->GetDisplayName(SIGDN_FILESYSPATH, &selectedPath)) || selectedPath == nullptr) {
        item->Release();
        dialog->Release();
        return {};
    }

    fs::path result(selectedPath);

    CoTaskMemFree(selectedPath);
    item->Release();
    dialog->Release();

    return result;
}

fs::path showOpenFileDialog() {
    IFileOpenDialog* dialog = nullptr;

    if (FAILED(CoCreateInstance(CLSID_FileOpenDialog, nullptr, CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&dialog))) || dialog == nullptr) {
        return {};
    }

    FILEOPENDIALOGOPTIONS options = {};

    if (SUCCEEDED(dialog->GetOptions(&options))) {
        dialog->SetOptions(options | FOS_FORCEFILESYSTEM | FOS_FILEMUSTEXIST | FOS_PATHMUSTEXIST);
    }

    const COMDLG_FILTERSPEC fileTypes[] = {
        {
            L"Editable and image files",
            L"*.txt;*.md;*.json;*.xml;*.yaml;*.yml;*.toml;*.ini;*.cfg;*.conf;*.properties;*.csv;*.html;*.htm;*.css;*.scss;*.js;*.mjs;*.ts;*.jsx;*.tsx;*.c;*.h;*.cc;*.cpp;*.hpp;*.cxx;*.hxx;*.java;*.kt;*.kts;*.gradle;*.py;*.lua;*.luau;*.cmake;*.glsl;*.vert;*.frag;*.shader;*.vscene;*.void;*.png;*.jpg;*.jpeg;*.webp;*.gif;*.bmp;*.ico;*.svg"
        }
    };

    dialog->SetFileTypes(1, fileTypes);
    dialog->SetFileTypeIndex(1);
    dialog->SetTitle(L"Open File");

    if (FAILED(dialog->Show(nullptr))) {
        dialog->Release();
        return {};
    }

    IShellItem* item = nullptr;

    if (FAILED(dialog->GetResult(&item)) || item == nullptr) {
        dialog->Release();
        return {};
    }

    PWSTR selectedPath = nullptr;

    if (FAILED(item->GetDisplayName(SIGDN_FILESYSPATH, &selectedPath)) || selectedPath == nullptr) {
        item->Release();
        dialog->Release();
        return {};
    }

    fs::path result(selectedPath);

    CoTaskMemFree(selectedPath);
    item->Release();
    dialog->Release();

    return result;
}

std::string getClipboardText() {
    if (!OpenClipboard(nullptr)) {
        return "";
    }

    HANDLE data = GetClipboardData(CF_UNICODETEXT);

    if (data == nullptr) {
        CloseClipboard();
        return "";
    }

    const wchar_t* text = static_cast<const wchar_t*>(GlobalLock(data));

    if (text == nullptr) {
        CloseClipboard();
        return "";
    }

    const std::string result = wideToUtf8(text);

    GlobalUnlock(data);
    CloseClipboard();

    return result;
}

std::string getClipboardFiles() {
    if (!OpenClipboard(nullptr)) {
        return "[]";
    }

    HANDLE data = GetClipboardData(CF_HDROP);
    if (data == nullptr) {
        CloseClipboard();
        return "[]";
    }

    HDROP drop = static_cast<HDROP>(data);
    const UINT count = DragQueryFileW(drop, 0xFFFFFFFF, nullptr, 0);
    std::string result = "[";
    for (UINT index = 0; index < count; ++index) {
        const UINT length = DragQueryFileW(drop, index, nullptr, 0);
        std::wstring buffer(length + 1, L'\0');
        DragQueryFileW(drop, index, buffer.data(), length + 1);
        buffer.resize(length);
        if (index > 0) result += ",";
        result += jsonString(wideToUtf8(buffer));
    }
    result += "]";

    CloseClipboard();
    return result;
}

bool setClipboardText(const std::string& value) {
    if (!OpenClipboard(nullptr)) {
        return false;
    }

    EmptyClipboard();

    const std::wstring wideValue = utf8ToWide(value);
    const std::size_t bytes = (wideValue.size() + 1) * sizeof(wchar_t);

    HGLOBAL memory = GlobalAlloc(GMEM_MOVEABLE, bytes);

    if (memory == nullptr) {
        CloseClipboard();
        return false;
    }

    void* target = GlobalLock(memory);

    if (target == nullptr) {
        GlobalFree(memory);
        CloseClipboard();
        return false;
    }

    std::memcpy(target, wideValue.c_str(), bytes);
    GlobalUnlock(memory);

    if (SetClipboardData(CF_UNICODETEXT, memory) == nullptr) {
        GlobalFree(memory);
        CloseClipboard();
        return false;
    }

    CloseClipboard();

    return true;
}


fs::path bundledToolchainRoot() {
#ifdef _WIN32
    return fs::path(currentExecutablePath()).parent_path() / "toolchain";
#else
    return {};
#endif
}

void configureBundledToolchainEnvironment() {
#ifdef _WIN32
    const fs::path root = bundledToolchainRoot();
    const fs::path cmakeBin = root / "cmake" / "bin";
    const fs::path llvmBin = root / "llvm" / "bin";
    const fs::path ninjaExe = root / "ninja" / "ninja.exe";
    const fs::path cCompiler = llvmBin / "x86_64-w64-mingw32-clang.exe";
    const fs::path cxxCompiler = llvmBin / "x86_64-w64-mingw32-clang++.exe";

    if (!fs::exists(cmakeBin / "cmake.exe") || !fs::exists(ninjaExe) ||
        !fs::exists(cCompiler) || !fs::exists(cxxCompiler)) {
        return;
    }

    std::wstring oldPath;
    DWORD required = GetEnvironmentVariableW(L"PATH", nullptr, 0);
    if (required > 0) {
        oldPath.resize(required);
        GetEnvironmentVariableW(L"PATH", oldPath.data(), required);
        if (!oldPath.empty() && oldPath.back() == L'\0') {
            oldPath.pop_back();
        }
    }

    const std::wstring newPath =
        cmakeBin.wstring() + L";" +
        (root / "ninja").wstring() + L";" +
        llvmBin.wstring() + L";" + oldPath;

    SetEnvironmentVariableW(L"PATH", newPath.c_str());
    SetEnvironmentVariableW(L"CMAKE_GENERATOR", L"Ninja");
    SetEnvironmentVariableW(L"CMAKE_MAKE_PROGRAM", ninjaExe.wstring().c_str());
    SetEnvironmentVariableW(L"CC", cCompiler.wstring().c_str());
    SetEnvironmentVariableW(L"CXX", cxxCompiler.wstring().c_str());
#endif
}

std::string findCMakeExecutable() {
#ifdef _WIN32
    const fs::path bundledCMake = bundledToolchainRoot() / "cmake" / "bin" / "cmake.exe";
    if (fs::exists(bundledCMake)) {
        return pathToUtf8(bundledCMake);
    }

    wchar_t buffer[MAX_PATH] {};

    if (SearchPathW(nullptr, L"cmake.exe", nullptr, MAX_PATH, buffer, nullptr) > 0) {
        return wideToUtf8(buffer);
    }

    std::vector<fs::path> candidates;

    if (const char* programFiles = std::getenv("ProgramFiles")) {
        const fs::path base = utf8Path(programFiles);
        candidates.push_back(base / "CMake" / "bin" / "cmake.exe");

        const fs::path jetBrains = base / "JetBrains";
        std::error_code error;

        if (fs::exists(jetBrains, error)) {
            for (const auto& entry : fs::directory_iterator(jetBrains, fs::directory_options::skip_permission_denied, error)) {
                if (error || !entry.is_directory()) {
                    continue;
                }

                const std::string name = toLower(pathToUtf8(entry.path().filename()));

                if (!name.starts_with("clion")) {
                    continue;
                }

                candidates.push_back(entry.path() / "bin" / "cmake" / "win" / "x64" / "bin" / "cmake.exe");
            }
        }
    }

    if (const char* localAppData = std::getenv("LOCALAPPDATA")) {
        const fs::path base = utf8Path(localAppData);
        candidates.push_back(base / "Programs" / "CMake" / "bin" / "cmake.exe");
    }

    std::sort(candidates.begin(), candidates.end(), [](const fs::path& first, const fs::path& second) {
        return pathToUtf8(first) > pathToUtf8(second);
    });

    for (const fs::path& candidate : candidates) {
        if (fs::exists(candidate)) {
            return pathToUtf8(candidate);
        }
    }
#endif

    return "";
}

bool openExternalUrl(const std::string& url) {
#ifdef _WIN32
    const std::wstring wideUrl = utf8ToWide(url);
    const HINSTANCE result = ShellExecuteW(nullptr, L"open", wideUrl.c_str(), nullptr, nullptr, SW_SHOWNORMAL);
    return reinterpret_cast<std::intptr_t>(result) > 32;
#else
    return false;
#endif
}

bool restartCurrentApplication() {
#ifdef _WIN32
    wchar_t executable[MAX_PATH] {};

    if (GetModuleFileNameW(nullptr, executable, MAX_PATH) == 0) {
        return false;
    }

    std::wstring commandLine = L"\"" + std::wstring(executable) + L"\"";
    STARTUPINFOW startupInfo {};
    startupInfo.cb = sizeof(startupInfo);
    PROCESS_INFORMATION processInfo {};

    if (!CreateProcessW(executable, commandLine.data(), nullptr, nullptr, FALSE, 0, nullptr, nullptr, &startupInfo, &processInfo)) {
        return false;
    }

    CloseHandle(processInfo.hThread);
    CloseHandle(processInfo.hProcess);
    return true;
#else
    return false;
#endif
}

std::string escapePowerShellSingleQuoted(std::string value) {
    std::string result;

    for (char character : value) {
        if (character == '\'') {
            result += "''";
        } else {
            result += character;
        }
    }

    return result;
}

class PowerShellSession {
public:
    PowerShellSession(int id, fs::path workingDirectory, webview::webview* window, std::string cmakePath) : id_(id), workingDirectory_(std::move(workingDirectory)), window_(window), cmakePath_(std::move(cmakePath)) {
    }

    ~PowerShellSession() {
        stop();
    }

    bool start() {
        SECURITY_ATTRIBUTES securityAttributes {};
        securityAttributes.nLength = sizeof(SECURITY_ATTRIBUTES);
        securityAttributes.bInheritHandle = TRUE;

        HANDLE stdoutWrite = nullptr;
        HANDLE stdinRead = nullptr;

        if (!CreatePipe(&stdoutRead_, &stdoutWrite, &securityAttributes, 0)) {
            return false;
        }

        if (!SetHandleInformation(stdoutRead_, HANDLE_FLAG_INHERIT, 0)) {
            return false;
        }

        if (!CreatePipe(&stdinRead, &stdinWrite_, &securityAttributes, 0)) {
            return false;
        }

        if (!SetHandleInformation(stdinWrite_, HANDLE_FLAG_INHERIT, 0)) {
            return false;
        }

        STARTUPINFOW startupInfo {};
        startupInfo.cb = sizeof(STARTUPINFOW);
        startupInfo.dwFlags = STARTF_USESTDHANDLES;
        startupInfo.hStdInput = stdinRead;
        startupInfo.hStdOutput = stdoutWrite;
        startupInfo.hStdError = stdoutWrite;

        PROCESS_INFORMATION processInfo {};

        const std::string escapedPath = escapePowerShellSingleQuoted(pathToUtf8(workingDirectory_));
        const std::string escapedCMake = escapePowerShellSingleQuoted(cmakePath_);
        const std::string script = "$OutputEncoding=[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new($false);"
            "[Console]::InputEncoding=[System.Text.UTF8Encoding]::new($false);"
            "$global:VoidProjectRoot='" + escapedPath + "';"
            "$global:VoidCMake='" + escapedCMake + "';"
            "function global:void { param([string]$Action,[string]$Configuration='debug') $a=($Action+'').ToLower(); $c=($Configuration+'').ToLower(); $config=switch($c){'release'{'Release'} 'relwithdebinfo'{'RelWithDebInfo'} 'minsizerel'{'MinSizeRel'} default{'Debug'}}; switch($a) {"
            "'build' { Write-Output 'Void Build'; if(!(Test-Path -LiteralPath '.\\CMakeLists.txt')){Write-Error 'CMakeLists.txt was not found.'; break}; if([string]::IsNullOrWhiteSpace($global:VoidCMake) -or !(Test-Path -LiteralPath $global:VoidCMake)){Write-Error 'CMake was not found. Configure it in Settings or install CMake/CLion.'; break}; New-Item -ItemType Directory -Force -Path '.\\build\\cmake','.\\build\\bin','.\\build\\logs' | Out-Null; Write-Output ('CMake: '+$global:VoidCMake); Write-Output 'Configuring...'; & $global:VoidCMake -S . -B .\\build\\cmake; if($LASTEXITCODE -eq 0){Write-Output 'Building...'; & $global:VoidCMake --build .\\build\\cmake --config $config}; if($LASTEXITCODE -eq 0){Write-Output 'Build successful.'; $exe=Get-ChildItem -LiteralPath '.\\build\\bin' -Filter '*.exe' -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1; if($exe){Write-Output ('Executable: '+$exe.FullName)}else{Write-Warning 'Build completed, but no executable was found in build/bin.'}}; Write-Output '__VOID_REFRESH__' }"
            "'rebuild' { Remove-Item -LiteralPath '.\\build\\cmake' -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item -LiteralPath '.\\build\\bin' -Recurse -Force -ErrorAction SilentlyContinue; void build $config }"
            "'clean' { Remove-Item -LiteralPath '.\\build' -Recurse -Force -ErrorAction SilentlyContinue; Write-Output 'Build directory removed.'; Write-Output '__VOID_REFRESH__' }"
            "'run' { $exe=Get-ChildItem -LiteralPath '.\\build\\bin' -Filter '*.exe' -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1; if(!$exe){Write-Output 'Executable not found. Building first...'; void build; $exe=Get-ChildItem -LiteralPath '.\\build\\bin' -Filter '*.exe' -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1}; if($exe){Write-Output ('Running '+$exe.Name+'...'); & $exe.FullName}else{Write-Error 'No executable was found in build/bin.'} }"
            "'root' { Set-Location -LiteralPath $global:VoidProjectRoot }"
            "'where' { Write-Output (Get-Location).Path }"
            "'cmake' { if([string]::IsNullOrWhiteSpace($global:VoidCMake)){Write-Output 'CMake: not found'}else{Write-Output ('CMake: '+$global:VoidCMake)} }"
            "'version' { Write-Output 'Void Engine 0.0.1' }"
            "'doctor' { Write-Output 'Void Doctor'; Write-Output ('Project: '+$global:VoidProjectRoot); if(Test-Path '.\\CMakeLists.txt'){Write-Output '[OK] CMakeLists.txt'}else{Write-Output '[MISSING] CMakeLists.txt'}; if(Test-Path '.\\src\\main.cpp'){Write-Output '[OK] src/main.cpp'}else{Write-Output '[MISSING] src/main.cpp'}; if([string]::IsNullOrWhiteSpace($global:VoidCMake)){Write-Output '[MISSING] CMake'}else{Write-Output ('[OK] CMake '+$global:VoidCMake)} }"
            "'tree' { Get-ChildItem -Force | Format-Table Mode,LastWriteTime,Length,Name -AutoSize }"
            "'help' { Write-Output 'Void commands:'; Write-Output '  void build [debug|release|relwithdebinfo|minsizerel]'; Write-Output '  void run      Run the built executable from build/bin'; Write-Output '  void rebuild [debug|release|relwithdebinfo|minsizerel]'; Write-Output '  void clean    Remove generated build files'; Write-Output '  void root     Go to project root'; Write-Output '  void where    Print current directory'; Write-Output '  void cmake    Print detected CMake path'; Write-Output '  void doctor   Check project/toolchain'; Write-Output '  void tree     List project root'; Write-Output '  void version  Print engine version'; Write-Output '  void help     Show this help' }"
            "default { Write-Output 'Unknown Void command. Use: void help' } } };"
            "function global:cmake { if([string]::IsNullOrWhiteSpace($global:VoidCMake) -or !(Test-Path -LiteralPath $global:VoidCMake)){Write-Error 'CMake was not found.'; return}; & $global:VoidCMake @args };"
            "function global:vbuild { param([string]$Configuration='debug') void build $Configuration }; function global:vrebuild { param([string]$Configuration='debug') void rebuild $Configuration }; function global:vrun { void run }; function global:vclean { void clean }; function global:vdoctor { void doctor }; function global:vhelp { void help }; function global:vroot { void root };"
            "Set-Location -LiteralPath '" + escapedPath + "';";

        std::wstring commandLine = L"powershell.exe -NoLogo -NoProfile -NoExit -ExecutionPolicy Bypass -Command \"" + utf8ToWide(script) + L"\"";

        const BOOL created = CreateProcessW(nullptr, commandLine.data(), nullptr, nullptr, TRUE, CREATE_NO_WINDOW, nullptr, workingDirectory_.wstring().c_str(), &startupInfo, &processInfo);

        CloseHandle(stdinRead);
        CloseHandle(stdoutWrite);

        if (!created) {
            return false;
        }

        processHandle_ = processInfo.hProcess;
        processThreadHandle_ = processInfo.hThread;
        running_ = true;

        readerThread_ = std::thread([this]() {
            readOutput();
        });

        return true;
    }

    bool sendCommand(const std::string& command) {
        if (!running_) {
            return false;
        }

        std::string payload = command;
        payload += "\r\n";

        return sendRaw(payload);
    }

    void stop() {
        if (!running_.exchange(false)) {
            return;
        }

        sendRaw("exit\r\n");

        if (processHandle_ != nullptr) {
            const DWORD waitResult = WaitForSingleObject(processHandle_, 500);

            if (waitResult == WAIT_TIMEOUT) {
                TerminateProcess(processHandle_, 0);
            }
        }

        if (stdinWrite_ != nullptr) {
            CloseHandle(stdinWrite_);
            stdinWrite_ = nullptr;
        }

        if (processHandle_ != nullptr) {
            CloseHandle(processHandle_);
            processHandle_ = nullptr;
        }

        if (processThreadHandle_ != nullptr) {
            CloseHandle(processThreadHandle_);
            processThreadHandle_ = nullptr;
        }

        if (readerThread_.joinable()) {
            readerThread_.join();
        }

        if (stdoutRead_ != nullptr) {
            CloseHandle(stdoutRead_);
            stdoutRead_ = nullptr;
        }
    }

private:
    bool sendRaw(const std::string& value) {
        if (stdinWrite_ == nullptr) {
            return false;
        }

        std::lock_guard lock(writeMutex_);

        DWORD written = 0;

        return WriteFile(stdinWrite_, value.data(), static_cast<DWORD>(value.size()), &written, nullptr) == TRUE;
    }

    void emitLine(const std::string& line) {
        if (window_ == nullptr) {
            return;
        }

        const std::string script = "window.onVoidTerminalLine(" + std::to_string(id_) + "," + jsonString(line) + ");";

        window_->dispatch([window = window_, script]() {
            window->eval(script);
        });
    }

    void readOutput() {
        std::string pending;
        char buffer[4096];

        while (running_) {
            DWORD bytesRead = 0;

            if (!ReadFile(stdoutRead_, buffer, sizeof(buffer), &bytesRead, nullptr) || bytesRead == 0) {
                break;
            }

            pending.append(buffer, bytesRead);

            while (true) {
                const std::size_t newline = pending.find('\n');

                if (newline == std::string::npos) {
                    break;
                }

                std::string line = pending.substr(0, newline);
                pending.erase(0, newline + 1);

                if (!line.empty() && line.back() == '\r') {
                    line.pop_back();
                }

                emitLine(line);
            }
        }

        if (!pending.empty()) {
            emitLine(pending);
        }
    }

    int id_;
    fs::path workingDirectory_;
    webview::webview* window_;
    std::string cmakePath_;
    HANDLE processHandle_ = nullptr;
    HANDLE processThreadHandle_ = nullptr;
    HANDLE stdinWrite_ = nullptr;
    HANDLE stdoutRead_ = nullptr;
    std::thread readerThread_;
    std::mutex writeMutex_;
    std::atomic<bool> running_ = false;
};

class PowerShellManager {
public:
    explicit PowerShellManager(webview::webview* window) : window_(window), cmakePath_(findCMakeExecutable()) {
    }

    ~PowerShellManager() {
        std::map<int, std::unique_ptr<PowerShellSession>> sessions;

        {
            std::lock_guard lock(mutex_);
            sessions.swap(sessions_);
        }
    }

    int create(const fs::path& workingDirectory) {
        std::lock_guard lock(mutex_);

        const int id = nextId_++;

        auto session = std::make_unique<PowerShellSession>(id, workingDirectory, window_, cmakePath_);

        if (!session->start()) {
            return -1;
        }

        sessions_[id] = std::move(session);

        return id;
    }

    bool send(int id, const std::string& command) {
        std::lock_guard lock(mutex_);

        const auto iterator = sessions_.find(id);

        if (iterator == sessions_.end()) {
            return false;
        }

        return iterator->second->sendCommand(command);
    }

    void close(int id) {
        std::unique_ptr<PowerShellSession> session;

        {
            std::lock_guard lock(mutex_);

            const auto iterator = sessions_.find(id);

            if (iterator == sessions_.end()) {
                return;
            }

            session = std::move(iterator->second);
            sessions_.erase(iterator);
        }
    }

private:
    webview::webview* window_;
    std::string cmakePath_;
    std::mutex mutex_;
    std::map<int, std::unique_ptr<PowerShellSession>> sessions_;
    int nextId_ = 1;
};


bool openPathInExplorer(const fs::path& path) {
    if (!fs::exists(path)) {
        return false;
    }

    std::wstring parameters;

    if (fs::is_directory(path)) {
        parameters = L"\"" + path.wstring() + L"\"";
    } else {
        parameters = L"/select,\"" + path.wstring() + L"\"";
    }

    const HINSTANCE result = ShellExecuteW(nullptr, L"open", L"explorer.exe", parameters.c_str(), nullptr, SW_SHOWNORMAL);
    return reinterpret_cast<std::intptr_t>(result) > 32;
}

bool openPathAssociated(const fs::path& path) {
    if (!fs::exists(path)) {
        return false;
    }

    const HINSTANCE result = ShellExecuteW(nullptr, L"open", path.wstring().c_str(), nullptr, nullptr, SW_SHOWNORMAL);
    return reinterpret_cast<std::intptr_t>(result) > 32;
}

bool openTerminalInDirectory(fs::path path) {
    if (fs::is_regular_file(path)) {
        path = path.parent_path();
    }

    if (!fs::is_directory(path)) {
        return false;
    }

    std::wstring escaped = path.wstring();
    std::wstring parameters = L"-NoExit -NoProfile -Command Set-Location -LiteralPath '" + escaped + L"'";
    const HINSTANCE result = ShellExecuteW(nullptr, L"open", L"powershell.exe", parameters.c_str(), path.wstring().c_str(), SW_SHOWNORMAL);
    return reinterpret_cast<std::intptr_t>(result) > 32;
}

std::string projectStamp(const fs::path& projectRoot) {
    std::uintmax_t totalSize = 0;
    std::uint64_t count = 0;
    std::uint64_t newest = 0;
    std::error_code error;

    if (!fs::exists(projectRoot, error)) {
        return "missing";
    }

    for (fs::recursive_directory_iterator iterator(projectRoot, fs::directory_options::skip_permission_denied, error), end; iterator != end; iterator.increment(error)) {
        if (error) {
            error.clear();
            continue;
        }

        const fs::path path = iterator->path();
        const fs::path relative = path.lexically_relative(projectRoot);
        if (!relative.empty()) {
            const std::string first = toLower(pathToUtf8(*relative.begin()));
            if (first == "build" || first == ".git") {
                if (iterator->is_directory(error)) {
                    iterator.disable_recursion_pending();
                }
                continue;
            }
        }

        if (!iterator->is_regular_file(error)) {
            continue;
        }

        ++count;
        totalSize += iterator->file_size(error);
        error.clear();
        const auto writeTime = iterator->last_write_time(error);
        if (!error) {
            newest = (std::max)(newest, static_cast<std::uint64_t>(writeTime.time_since_epoch().count()));
        }
        error.clear();
    }

    return std::to_string(count) + ":" + std::to_string(totalSize) + ":" + std::to_string(newest);
}

fs::path findBuiltExecutable(const fs::path& projectRoot) {
    const fs::path binDirectory = projectRoot / "build" / "bin";
    std::error_code error;

    if (!fs::is_directory(binDirectory, error)) {
        return {};
    }

    std::vector<fs::path> executables;
    for (const auto& entry : fs::directory_iterator(binDirectory, fs::directory_options::skip_permission_denied, error)) {
        if (error) {
            break;
        }
        if (entry.is_regular_file(error) && toLower(pathToUtf8(entry.path().extension())) == ".exe") {
            executables.push_back(entry.path());
        }
        error.clear();
    }

    if (executables.empty()) {
        return {};
    }

    const fs::path defaultExecutable = binDirectory / "VoidApp.exe";
    if (fs::exists(defaultExecutable, error)) {
        return defaultExecutable;
    }
    error.clear();

    std::sort(executables.begin(), executables.end(), [](const fs::path& first, const fs::path& second) {
        std::error_code firstError;
        std::error_code secondError;
        const auto firstTime = fs::last_write_time(first, firstError);
        const auto secondTime = fs::last_write_time(second, secondError);
        if (firstError != secondError) {
            return !firstError;
        }
        if (!firstError && firstTime != secondTime) {
            return firstTime > secondTime;
        }
        return toLower(pathToUtf8(first.filename())) < toLower(pathToUtf8(second.filename()));
    });

    return executables.front();
}

bool projectNeedsBuild(const fs::path& projectRoot) {
    const fs::path executable = findBuiltExecutable(projectRoot);
    std::error_code error;

    if (executable.empty() || !fs::exists(executable, error)) {
        return true;
    }

    const auto executableTime = fs::last_write_time(executable, error);
    if (error) {
        return true;
    }

    for (fs::recursive_directory_iterator iterator(projectRoot, fs::directory_options::skip_permission_denied, error), end; iterator != end; iterator.increment(error)) {
        if (error) {
            error.clear();
            continue;
        }

        const fs::path path = iterator->path();
        const fs::path relative = path.lexically_relative(projectRoot);
        if (!relative.empty()) {
            const std::string first = toLower(pathToUtf8(*relative.begin()));
            if (first == "build" || first == ".git") {
                if (iterator->is_directory(error)) {
                    iterator.disable_recursion_pending();
                }
                continue;
            }
        }

        if (!iterator->is_regular_file(error)) {
            continue;
        }

        const auto writeTime = iterator->last_write_time(error);
        if (!error && writeTime > executableTime) {
            return true;
        }
        error.clear();
    }

    return false;
}

void terminateProcessTree(DWORD rootProcessId) {
    if (rootProcessId == 0) {
        return;
    }

    std::vector<DWORD> processIds {rootProcessId};

    for (std::size_t index = 0; index < processIds.size(); ++index) {
        const DWORD parentId = processIds[index];
        HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (snapshot == INVALID_HANDLE_VALUE) {
            continue;
        }

        PROCESSENTRY32W entry {};
        entry.dwSize = sizeof(PROCESSENTRY32W);

        if (Process32FirstW(snapshot, &entry)) {
            do {
                if (entry.th32ParentProcessID == parentId && entry.th32ProcessID != rootProcessId) {
                    if (std::find(processIds.begin(), processIds.end(), entry.th32ProcessID) == processIds.end()) {
                        processIds.push_back(entry.th32ProcessID);
                    }
                }
            } while (Process32NextW(snapshot, &entry));
        }

        CloseHandle(snapshot);
    }

    for (auto iterator = processIds.rbegin(); iterator != processIds.rend(); ++iterator) {
        HANDLE process = OpenProcess(PROCESS_TERMINATE | SYNCHRONIZE, FALSE, *iterator);
        if (process == nullptr) {
            continue;
        }
        TerminateProcess(process, 1);
        CloseHandle(process);
    }
}

class NativeExecutionManager {
public:
    explicit NativeExecutionManager(webview::webview* window) : window_(window) {
    }

    ~NativeExecutionManager() {
        stop();
        joinWorker();
    }

    bool build(const fs::path& projectRoot, const std::string& buildMode, const std::string& externalCommand, const std::string& requestedConfiguration = "Debug") {
        std::lock_guard lock(stateMutex_);
        if (running_) {
            return false;
        }

        joinWorkerUnlocked();
        running_ = true;
        cancelled_ = false;
        phase_ = "build";

        worker_ = std::thread([this, projectRoot, buildMode, externalCommand, requestedConfiguration]() {
            emitState("build", true, false, false);
            bool success = false;

            if (buildMode == "external") {
                if (externalCommand.empty()) {
                    emitOutput("error", "External build command is empty.");
                } else {
                    std::wstring command = L"powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command \"" + utf8ToWide(externalCommand) + L"\"";
                    success = runProcess(command, projectRoot, true);
                }
            } else {
                const std::string cmakePath = findCMakeExecutable();
                if (cmakePath.empty()) {
                    emitOutput("error", "CMake was not found.");
                } else if (!fs::exists(projectRoot / "CMakeLists.txt")) {
                    emitOutput("error", "CMakeLists.txt was not found.");
                } else {
                    std::error_code error;
                    fs::create_directories(projectRoot / "build" / "cmake", error);
                    fs::create_directories(projectRoot / "build" / "bin", error);
                    fs::create_directories(projectRoot / "build" / "logs", error);

                    emitOutput("info", "Void Build");
                    emitOutput("info", "CMake: " + cmakePath);
                    emitOutput("info", "Configuring...");

                    std::wstring configure = L"\"" + utf8ToWide(cmakePath) + L"\" -S . -B .\\build\\cmake";
                    success = runProcess(configure, projectRoot, true);

                    if (success && !cancelled_) {
                        emitOutput("info", "Building...");
                        const std::string configuration = requestedConfiguration == "Release" || requestedConfiguration == "RelWithDebInfo" || requestedConfiguration == "MinSizeRel" ? requestedConfiguration : "Debug";
                        emitOutput("info", "Configuration: " + configuration);
                        std::wstring buildCommand = L"\"" + utf8ToWide(cmakePath) + L"\" --build .\\build\\cmake --config " + utf8ToWide(configuration);
                        success = runProcess(buildCommand, projectRoot, true);
                    }

                    if (success && !cancelled_) {
                        emitOutput("success", "Build successful.");
                        const fs::path executable = findBuiltExecutable(projectRoot);
                        if (!executable.empty()) {
                            emitOutput("info", "Executable: " + pathToUtf8(executable));
                        } else {
                            emitOutput("warning", "Build completed, but no executable was found in build/bin.");
                        }
                    }
                }
            }

            const bool wasCancelled = cancelled_.load();
            finish("build", success && !wasCancelled, wasCancelled);
        });

        return true;
    }

    bool run(const fs::path& projectRoot, const std::string& command = {}) {
        std::lock_guard lock(stateMutex_);
        if (running_) {
            return false;
        }

        joinWorkerUnlocked();
        running_ = true;
        cancelled_ = false;
        phase_ = "run";

        worker_ = std::thread([this, projectRoot, command]() {
            emitState("run", true, false, false);
            std::wstring runCommand;

            if (command.empty()) {
                const fs::path executable = findBuiltExecutable(projectRoot);
                if (executable.empty() || !fs::exists(executable)) {
                    emitOutput("error", "No executable was found in: " + pathToUtf8(projectRoot / "build" / "bin"));
                    finish("run", false, false);
                    return;
                }
                runCommand = L"\"" + executable.wstring() + L"\"";
            } else {
                runCommand = L"powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command \"" + utf8ToWide(command) + L"\"";
            }

            emitOutput("info", "Running...");
            const bool success = runProcess(runCommand, projectRoot, false);
            const bool wasCancelled = cancelled_.load();
            finish("run", success && !wasCancelled, wasCancelled);
        });

        return true;
    }

    void stop() {
        cancelled_ = true;

        std::lock_guard lock(processMutex_);
        if (activeJob_ != nullptr && activeJobOwnsProcess_) {
            TerminateJobObject(activeJob_, 1);
            return;
        }

        if (activeProcessId_ != 0) {
            terminateProcessTree(activeProcessId_);
        } else if (activeProcess_ != nullptr) {
            TerminateProcess(activeProcess_, 1);
        }
    }

    bool restart(const fs::path& projectRoot, const std::string& command = {}) {
        stop();
        joinWorker();
        return run(projectRoot, command);
    }

private:
    void joinWorker() {
        std::thread worker;
        {
            std::lock_guard lock(stateMutex_);
            if (worker_.joinable()) {
                worker = std::move(worker_);
            }
        }
        if (worker.joinable()) {
            worker.join();
        }
    }

    void joinWorkerUnlocked() {
        if (worker_.joinable()) {
            worker_.join();
        }
    }

    void emitOutput(const std::string& level, const std::string& text) {
        if (window_ == nullptr) {
            return;
        }
        const std::string script = "window.onVoidExecutionOutput(" + jsonString(level) + "," + jsonString(text) + ");";
        window_->dispatch([window = window_, script]() { window->eval(script); });
    }

    void emitState(const std::string& phase, bool running, bool success, bool cancelled) {
        if (window_ == nullptr) {
            return;
        }
        const std::string payload = "{\"phase\":" + jsonString(phase) + ",\"running\":" + (running ? "true" : "false") + ",\"success\":" + (success ? "true" : "false") + ",\"cancelled\":" + (cancelled ? "true" : "false") + "}";
        const std::string script = "window.onVoidExecutionState(" + payload + ");";
        window_->dispatch([window = window_, script]() { window->eval(script); });
    }

    void finish(const std::string& phase, bool success, bool cancelled) {
        {
            std::lock_guard lock(stateMutex_);
            running_ = false;
            phase_.clear();
        }
        emitState(phase, false, success, cancelled);
    }

    bool runProcess(const std::wstring& commandLineValue, const fs::path& workingDirectory, bool captureOutput) {
        SECURITY_ATTRIBUTES securityAttributes {};
        securityAttributes.nLength = sizeof(SECURITY_ATTRIBUTES);
        securityAttributes.bInheritHandle = TRUE;

        HANDLE readPipe = nullptr;
        HANDLE writePipe = nullptr;

        if (captureOutput) {
            if (!CreatePipe(&readPipe, &writePipe, &securityAttributes, 0)) {
                emitOutput("error", "Failed to create build output pipe.");
                return false;
            }
            SetHandleInformation(readPipe, HANDLE_FLAG_INHERIT, 0);
        }

        STARTUPINFOW startupInfo {};
        startupInfo.cb = sizeof(STARTUPINFOW);
        if (captureOutput) {
            startupInfo.dwFlags = STARTF_USESTDHANDLES;
            startupInfo.hStdOutput = writePipe;
            startupInfo.hStdError = writePipe;
            startupInfo.hStdInput = GetStdHandle(STD_INPUT_HANDLE);
        }

        PROCESS_INFORMATION processInfo {};
        std::wstring commandLine = commandLineValue;
        if (cancelled_) {
            if (readPipe != nullptr) CloseHandle(readPipe);
            if (writePipe != nullptr) CloseHandle(writePipe);
            return false;
        }
        DWORD flags = CREATE_SUSPENDED;
        if (captureOutput) {
            flags |= CREATE_NO_WINDOW;
        }

        HANDLE job = CreateJobObjectW(nullptr, nullptr);
        if (job == nullptr) {
            if (readPipe) CloseHandle(readPipe);
            if (writePipe) CloseHandle(writePipe);
            emitOutput("error", "Failed to create process job.");
            return false;
        }

        JOBOBJECT_EXTENDED_LIMIT_INFORMATION limits {};
        limits.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
        SetInformationJobObject(job, JobObjectExtendedLimitInformation, &limits, sizeof(limits));

        const BOOL created = CreateProcessW(
            nullptr,
            commandLine.data(),
            nullptr,
            nullptr,
            captureOutput ? TRUE : FALSE,
            flags,
            nullptr,
            workingDirectory.wstring().c_str(),
            &startupInfo,
            &processInfo
        );

        if (writePipe != nullptr) {
            CloseHandle(writePipe);
            writePipe = nullptr;
        }

        if (!created) {
            if (readPipe) CloseHandle(readPipe);
            CloseHandle(job);
            emitOutput("error", "Failed to start process. Windows error: " + std::to_string(GetLastError()));
            return false;
        }

        const bool assignedToJob = AssignProcessToJobObject(job, processInfo.hProcess) == TRUE;
        {
            std::lock_guard lock(processMutex_);
            activeJob_ = job;
            activeJobOwnsProcess_ = assignedToJob;
            activeProcess_ = processInfo.hProcess;
            activeProcessId_ = processInfo.dwProcessId;
        }
        if (cancelled_) {
            if (assignedToJob) {
                TerminateJobObject(job, 1);
            } else {
                terminateProcessTree(processInfo.dwProcessId);
            }
        }
        ResumeThread(processInfo.hThread);
        CloseHandle(processInfo.hThread);

        std::thread reader;
        if (captureOutput && readPipe != nullptr) {
            reader = std::thread([this, readPipe]() {
                std::string pending;
                char buffer[4096];
                while (true) {
                    DWORD bytesRead = 0;
                    if (!ReadFile(readPipe, buffer, sizeof(buffer), &bytesRead, nullptr) || bytesRead == 0) {
                        break;
                    }
                    pending.append(buffer, bytesRead);
                    while (true) {
                        const std::size_t newline = pending.find('\n');
                        if (newline == std::string::npos) break;
                        std::string line = pending.substr(0, newline);
                        pending.erase(0, newline + 1);
                        if (!line.empty() && line.back() == '\r') line.pop_back();
                        if (!line.empty()) {
                            const std::string lower = toLower(line);
                            const std::string level = (lower.find("error") != std::string::npos || lower.find("failed") != std::string::npos) ? "error" : (lower.find("warning") != std::string::npos ? "warning" : "info");
                            emitOutput(level, line);
                        }
                    }
                }
                if (!pending.empty()) emitOutput("info", pending);
                CloseHandle(readPipe);
            });
        }

        WaitForSingleObject(processInfo.hProcess, INFINITE);
        DWORD exitCode = 1;
        GetExitCodeProcess(processInfo.hProcess, &exitCode);

        if (reader.joinable()) {
            reader.join();
        }

        {
            std::lock_guard lock(processMutex_);
            if (activeJob_ == job) {
                activeJob_ = nullptr;
                activeJobOwnsProcess_ = false;
            }
            if (activeProcess_ == processInfo.hProcess) {
                activeProcess_ = nullptr;
                activeProcessId_ = 0;
            }
        }
        CloseHandle(processInfo.hProcess);
        CloseHandle(job);

        return exitCode == 0;
    }

    webview::webview* window_ = nullptr;
    std::thread worker_;
    std::mutex stateMutex_;
    std::mutex processMutex_;
    HANDLE activeJob_ = nullptr;
    bool activeJobOwnsProcess_ = false;
    HANDLE activeProcess_ = nullptr;
    DWORD activeProcessId_ = 0;
    std::atomic<bool> running_ = false;
    std::atomic<bool> cancelled_ = false;
    std::string phase_;
};

#endif

#ifndef _WIN32
bool openExternalUrl(const std::string&) {
    return false;
}
#endif

#ifdef _WIN32
int WINAPI WinMain(HINSTANCE, HINSTANCE, LPSTR, int) {
#else
int main() {
#endif
#ifdef _WIN32
    const HRESULT comResult = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
    const bool shouldUninitializeCom = SUCCEEDED(comResult);
#endif

    try {
#ifdef _WIN32
        registerVoidEditorFileIntegration();
        configureBundledToolchainEnvironment();
        const std::string startupFile = startupFileArgument();
#endif
        webview::webview window(false, nullptr);

#ifdef _WIN32
        PowerShellManager terminalManager(&window);
        NativeExecutionManager executionManager(&window);
#endif

        window.set_title("Void Engine");
        window.set_size(1360, 860, WEBVIEW_HINT_NONE);

        window.bind("closeApplication", [&window](const std::string&) -> std::string {
            window.terminate();
            return "\"success\"";
        });


        window.bind("restartApplicationNative", [&window](const std::string&) -> std::string {
#ifdef _WIN32
            if (!restartCurrentApplication()) {
                return "\"error\"";
            }

            window.terminate();
            return "\"success\"";
#else
            return "\"error\"";
#endif
        });

        window.bind("loadAppStateNative", [](const std::string&) -> std::string {
            return loadAppState();
        });

        window.bind("saveAppStateNative", [](const std::string& request) -> std::string {
            const std::string state = webview::json_parse(request, "", 0);
            return saveAppState(state) ? "\"success\"" : "\"error\"";
        });

        window.bind("findCMakeNative", [](const std::string&) -> std::string {
#ifdef _WIN32
            return jsonString(findCMakeExecutable());
#else
            return "\"\"";
#endif
        });

        window.bind("openExternalNative", [](const std::string& request) -> std::string {
            const std::string url = webview::json_parse(request, "", 0);
            return openExternalUrl(url) ? "\"success\"" : "\"error\"";
        });

        window.bind("chooseProjectLocationNative", [](const std::string&) -> std::string {
#ifdef _WIN32
            const fs::path path = showFolderDialog(L"Choose Project Location");

            if (path.empty()) {
                return "{\"cancelled\":true}";
            }

            return "{\"path\":" + jsonString(pathToUtf8(path)) + "}";
#else
            return "{\"error\":\"Unsupported platform.\"}";
#endif
        });

        window.bind("openProjectNative", [](const std::string&) -> std::string {
#ifdef _WIN32
            const fs::path path = showFolderDialog(L"Open Void Engine Project");

            if (path.empty()) {
                return "{\"cancelled\":true}";
            }

            return makeProjectPayload(path);
#else
            return "{\"error\":\"Unsupported platform.\"}";
#endif
        });

        window.bind("getStartupFileNative", [startupFile](const std::string&) -> std::string {
#ifdef _WIN32
            return jsonString(startupFile);
#else
            return jsonString("");
#endif
        });

        window.bind("openSpecificFileNative", [](const std::string& request) -> std::string {
#ifdef _WIN32
            const std::string rawPath = webview::json_parse(request, "", 0);
            const fs::path path = utf8Path(rawPath);
            std::error_code error;
            if (!fs::is_regular_file(path, error)) return "{\"error\":\"File was not found.\"}";
            return makeStandaloneFilePayload(path);
#else
            return "{\"error\":\"Unsupported platform.\"}";
#endif
        });

        window.bind("openFileNative", [](const std::string&) -> std::string {
#ifdef _WIN32
            const fs::path path = showOpenFileDialog();

            if (path.empty()) {
                return "{\"cancelled\":true}";
            }

            return makeStandaloneFilePayload(path);
#else
            return "{\"error\":\"Unsupported platform.\"}";
#endif
        });

        window.bind("suggestProjectNameNative", [](const std::string& request) -> std::string {
            const std::string location = webview::json_parse(request, "", 0);
            const std::string name = location.empty() ? "void_project_1" : getSuggestedProjectName(utf8Path(location));

            return jsonString(name);
        });

        window.bind("createProjectNative", [](const std::string& request) -> std::string {
            const std::string name = webview::json_parse(request, "", 0);
            const std::string location = webview::json_parse(request, "", 1);
            const std::string type = webview::json_parse(request, "", 2);
            const std::string projectTemplate = webview::json_parse(request, "", 3);

            return createProject(name, location, type, projectTemplate);
        });

        window.bind("listDirectoryNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string directory = webview::json_parse(request, "", 1);

            return listDirectory(utf8Path(projectRoot), utf8Path(directory));
        });

        window.bind("refreshProjectNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);

            return makeProjectPayload(utf8Path(projectRoot));
        });

        window.bind("readTextFileNative", [](const std::string& request) -> std::string {
            const std::string pathValue = webview::json_parse(request, "", 0);

            if (pathValue.empty()) {
                return "{\"error\":\"Invalid file path.\"}";
            }

            return makeStandaloneFilePayload(utf8Path(pathValue));
        });

        window.bind("saveTextFileNative", [](const std::string& request) -> std::string {
            const std::string pathValue = webview::json_parse(request, "", 0);
            const std::string content = webview::json_parse(request, "", 1);

            if (pathValue.empty()) {
                return "\"Invalid file path.\"";
            }

            const fs::path path = utf8Path(pathValue);

            if (!isTextFile(path)) {
                return "\"This file type cannot be edited.\"";
            }

            std::ofstream output(path, std::ios::binary | std::ios::trunc);

            if (!output) {
                return "\"Failed to open file for writing.\"";
            }

            output.write(content.data(), static_cast<std::streamsize>(content.size()));

            return output ? "\"success\"" : "\"Failed to save file.\"";
        });

        window.bind("createFileNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string parentPath = webview::json_parse(request, "", 1);
            const std::string fileName = webview::json_parse(request, "", 2);
            const std::string preset = webview::json_parse(request, "", 3);

            return createProjectFile(utf8Path(projectRoot), utf8Path(parentPath), fileName, preset);
        });

        window.bind("createFolderNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string parentPath = webview::json_parse(request, "", 1);
            const std::string folderName = webview::json_parse(request, "", 2);

            return createProjectFolder(utf8Path(projectRoot), utf8Path(parentPath), folderName);
        });


        window.bind("movePathNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string sourcePath = webview::json_parse(request, "", 1);
            const std::string destinationPath = webview::json_parse(request, "", 2);

            return moveProjectPath(utf8Path(projectRoot), utf8Path(sourcePath), utf8Path(destinationPath));
        });

        window.bind("importExternalPathNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string sourcePath = webview::json_parse(request, "", 1);
            const std::string destinationPath = webview::json_parse(request, "", 2);
            return importExternalPath(utf8Path(projectRoot), utf8Path(sourcePath), utf8Path(destinationPath));
        });

        window.bind("copyPathNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string sourcePath = webview::json_parse(request, "", 1);
            const std::string destinationPath = webview::json_parse(request, "", 2);
            return copyProjectPath(utf8Path(projectRoot), utf8Path(sourcePath), utf8Path(destinationPath));
        });

        window.bind("restoreTrashedPathNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string trashPath = webview::json_parse(request, "", 1);
            const std::string originalPath = webview::json_parse(request, "", 2);
            return restoreTrashedPath(utf8Path(projectRoot), utf8Path(trashPath), utf8Path(originalPath));
        });

        window.bind("renamePathNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string sourcePath = webview::json_parse(request, "", 1);
            const std::string newName = webview::json_parse(request, "", 2);

            return renameProjectPath(utf8Path(projectRoot), utf8Path(sourcePath), newName);
        });

        window.bind("deletePathNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string sourcePath = webview::json_parse(request, "", 1);

            return deleteProjectPath(utf8Path(projectRoot), utf8Path(sourcePath));
        });

        window.bind("searchProjectNative", [](const std::string& request) -> std::string {
            const std::string projectRoot = webview::json_parse(request, "", 0);
            const std::string query = webview::json_parse(request, "", 1);
            const std::string mode = webview::json_parse(request, "", 2);

            return searchProject(utf8Path(projectRoot), query, mode);
        });

        window.bind("getClipboardTextNative", [](const std::string&) -> std::string {
#ifdef _WIN32
            return jsonString(getClipboardText());
#else
            return "\"\"";
#endif
        });

        window.bind("getClipboardFilesNative", [](const std::string&) -> std::string {
#ifdef _WIN32
            return getClipboardFiles();
#else
            return "[]";
#endif
        });

        window.bind("setClipboardTextNative", [](const std::string& request) -> std::string {
#ifdef _WIN32
            const std::string value = webview::json_parse(request, "", 0);

            return setClipboardText(value) ? "\"success\"" : "\"error\"";
#else
            return "\"error\"";
#endif
        });

#ifdef _WIN32
        window.bind("projectStampNative", [](const std::string& request) -> std::string {
            const std::string root = webview::json_parse(request, "", 0);
            return jsonString(projectStamp(utf8Path(root)));
        });

        window.bind("projectNeedsBuildNative", [](const std::string& request) -> std::string {
            const std::string root = webview::json_parse(request, "", 0);
            return projectNeedsBuild(utf8Path(root)) ? "true" : "false";
        });

        window.bind("buildProjectNative", [&executionManager](const std::string& request) -> std::string {
            const std::string root = webview::json_parse(request, "", 0);
            const std::string mode = webview::json_parse(request, "", 1);
            const std::string externalCommand = webview::json_parse(request, "", 2);
            const std::string configuration = webview::json_parse(request, "", 3);
            return executionManager.build(utf8Path(root), mode.empty() ? "void" : mode, externalCommand, configuration.empty() ? "Debug" : configuration) ? "\"success\"" : "\"busy\"";
        });

        window.bind("runProjectNative", [&executionManager](const std::string& request) -> std::string {
            const std::string root = webview::json_parse(request, "", 0);
            const std::string command = webview::json_parse(request, "", 1);
            return executionManager.run(utf8Path(root), command) ? "\"success\"" : "\"busy\"";
        });

        window.bind("restartRunNative", [&executionManager](const std::string& request) -> std::string {
            const std::string root = webview::json_parse(request, "", 0);
            const std::string command = webview::json_parse(request, "", 1);
            return executionManager.restart(utf8Path(root), command) ? "\"success\"" : "\"error\"";
        });

        window.bind("stopExecutionNative", [&executionManager](const std::string&) -> std::string {
            executionManager.stop();
            return "\"success\"";
        });

        window.bind("openPathInExplorerNative", [](const std::string& request) -> std::string {
            const std::string path = webview::json_parse(request, "", 0);
            return openPathInExplorer(utf8Path(path)) ? "\"success\"" : "\"error\"";
        });

        window.bind("openPathAssociatedNative", [](const std::string& request) -> std::string {
            const std::string path = webview::json_parse(request, "", 0);
            return openPathAssociated(utf8Path(path)) ? "\"success\"" : "\"error\"";
        });

        window.bind("openTerminalInDirectoryNative", [](const std::string& request) -> std::string {
            const std::string path = webview::json_parse(request, "", 0);
            return openTerminalInDirectory(utf8Path(path)) ? "\"success\"" : "\"error\"";
        });
#endif

#ifdef _WIN32
        window.bind("createTerminalNative", [&terminalManager](const std::string& request) -> std::string {
            const std::string workingDirectory = webview::json_parse(request, "", 0);

            if (workingDirectory.empty()) {
                return "-1";
            }

            return std::to_string(terminalManager.create(utf8Path(workingDirectory)));
        });

        window.bind("sendTerminalCommandNative", [&terminalManager](const std::string& request) -> std::string {
            const int id = std::stoi(webview::json_parse(request, "", 0));
            const std::string command = webview::json_parse(request, "", 1);

            return terminalManager.send(id, command) ? "\"success\"" : "\"error\"";
        });

        window.bind("closeTerminalNative", [&terminalManager](const std::string& request) -> std::string {
            const int id = std::stoi(webview::json_parse(request, "", 0));

            terminalManager.close(id);

            return "\"success\"";
        });
#endif

        fs::path uiPath;
#ifdef _WIN32
        const fs::path executablePath = fs::path(currentExecutablePath());
        const fs::path packagedUiPath = executablePath.parent_path() / "ui" / "index.html";
        if (fs::exists(packagedUiPath)) {
            uiPath = packagedUiPath;
        } else {
            uiPath = fs::path(PROJECT_SOURCE_DIR) / "ui" / "index.html";
        }
#else
        uiPath = fs::path(PROJECT_SOURCE_DIR) / "ui" / "index.html";
#endif

        if (!fs::exists(uiPath)) {
#ifdef _WIN32
            MessageBoxW(nullptr,
                L"Void Engine UI was not found. Make sure the ui folder is next to VoidEngine.exe.",
                L"Void Engine Error",
                MB_OK | MB_ICONERROR);
#endif
            throw std::runtime_error("Void Engine UI was not found.");
        }

        window.navigate("file:///" + uiPath.generic_string());
        window.run();
    } catch (const webview::exception& exception) {
#ifdef _WIN32
        MessageBoxA(nullptr, exception.what(), "Void Engine Error", MB_OK | MB_ICONERROR);
#endif

#ifdef _WIN32
        if (shouldUninitializeCom) {
            CoUninitialize();
        }
#endif

        return 1;
    }

#ifdef _WIN32
    if (shouldUninitializeCom) {
        CoUninitialize();
    }
#endif

    return 0;
}