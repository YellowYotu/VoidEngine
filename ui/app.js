const $ = id => document.getElementById(id);
const $$ = selector => Array.from(document.querySelectorAll(selector));

const projectManagerView = $("projectManagerView");
const lightEditorView = $("lightEditorView");
const projectEditorView = $("projectEditorView");

const fileMenuButton = $("fileMenuButton");
const fileMenu = $("fileMenu");
const editMenuButton = $("editMenuButton");
const editMenu = $("editMenu");
const helpMenuButton = $("helpMenuButton");
const helpMenu = $("helpMenu");
const editorContextMenu = $("editorContextMenu");
const explorerContextMenu = $("explorerContextMenu");

const fileNewProject = $("fileNewProject");
const fileOpenProject = $("fileOpenProject");
const fileOpenFile = $("fileOpenFile");
const fileSave = $("fileSave");
const settingsButton = $("settingsButton");
const exitButton = $("exitButton");

const allProjectsButton = $("allProjectsButton");
const recentProjectsButton = $("recentProjectsButton");
const sidebarOpenFileButton = $("sidebarOpenFileButton");
const newProjectButton = $("newProjectButton");
const emptyNewProjectButton = $("emptyNewProjectButton");
const emptyOpenProjectButton = $("emptyOpenProjectButton");
const managerOpenProjectButton = $("managerOpenProjectButton");
const pageTitle = $("pageTitle");
const pageDescription = $("pageDescription");
const projectList = $("projectList");
const emptyState = $("emptyState");
const emptyTitle = $("emptyTitle");
const emptyDescription = $("emptyDescription");

const lightCloseButton = $("lightCloseButton");
const lightSaveButton = $("lightSaveButton");
const lightFileName = $("lightFileName");
const lightFilePath = $("lightFilePath");
const lightFileIcon = $("lightFileIcon");
const lightLanguageBadge = $("lightLanguageBadge");
const lightLanguageStatus = $("lightLanguageStatus");
const lightTabFileName = $("lightTabFileName");
const lightModifiedDot = $("lightModifiedDot");
const lightSaveStatus = $("lightSaveStatus");
const lightLineNumbers = $("lightLineNumbers");
const lightSyntaxLayer = $("lightSyntaxLayer");
const lightTextEditor = $("lightTextEditor");
const lightCursorStatus = $("lightCursorStatus");
const lightTextArea = $("lightTextArea");
const lightImageArea = $("lightImageArea");
const lightImagePreview = $("lightImagePreview");
const lightImageTitle = $("lightImageTitle");
const lightImageFormat = $("lightImageFormat");
const lightImageResolution = $("lightImageResolution");
const lightImageSize = $("lightImageSize");
const lightImagePath = $("lightImagePath");

const backToProjectsButton = $("backToProjectsButton");
const editorProjectName = $("editorProjectName");
const editorProjectPath = $("editorProjectPath");
const fileTree = $("fileTree");
const searchExplorerButton = $("searchExplorerButton");
const actionSearchButton = $("actionSearchButton");
const welcomeSearchButton = $("welcomeSearchButton");
const newItemButton = $("newItemButton");
const welcomeNewFileButton = $("welcomeNewFileButton");
const refreshExplorerButton = $("refreshExplorerButton");
const searchPanel = $("searchPanel");
const searchInput = $("searchInput");
const closeSearchButton = $("closeSearchButton");
const searchStatus = $("searchStatus");
const searchResults = $("searchResults");
const searchModeButtons = $$(".search-mode");
const buildProjectButton = $("buildProjectButton");
const buildActionIcon = $("buildActionIcon");
const runProjectButton = $("runProjectButton");
const runActionIcon = $("runActionIcon");
const stopRunButton = $("stopRunButton");
const debugProjectButton = $("debugProjectButton");
const runMoreButton = $("runMoreButton");
const runConfigurationButton = $("runConfigurationButton");
const runConfigurationName = $("runConfigurationName");
const runConfigurationMenu = $("runConfigurationMenu");
const cmakeBadge = $("cmakeBadge");

const documentTabs = $("documentTabs");
const projectWelcomeView = $("projectWelcomeView");
const projectWelcomeTitle = $("projectWelcomeTitle");
const projectTextView = $("projectTextView");
const projectLineNumbers = $("projectLineNumbers");
const projectSyntaxLayer = $("projectSyntaxLayer");
const projectTextEditor = $("projectTextEditor");
const projectLanguageStatus = $("projectLanguageStatus");
const projectCursorStatus = $("projectCursorStatus");
const projectSaveStatus = $("projectSaveStatus");
const projectImageView = $("projectImageView");
const projectImagePreview = $("projectImagePreview");
const projectImageName = $("projectImageName");
const projectImageFormat = $("projectImageFormat");
const projectImageResolution = $("projectImageResolution");
const projectImageSize = $("projectImageSize");
const projectImagePath = $("projectImagePath");
const projectBinaryView = $("projectBinaryView");
const binaryFileName = $("binaryFileName");
const binaryFileInfo = $("binaryFileInfo");

const bottomPanel = $("bottomPanel");
const outputPanelButton = $("outputPanelButton");
const terminalPanelButton = $("terminalPanelButton");
const toggleBottomPanelButton = $("toggleBottomPanelButton");
const outputPanel = $("outputPanel");
const outputContent = $("outputContent");
const terminalPanel = $("terminalPanel");
const terminalTabs = $("terminalTabs");
const newTerminalButton = $("newTerminalButton");
const restartTerminalButton = $("restartTerminalButton");
const terminalEmptyState = $("terminalEmptyState");
const terminalOutput = $("terminalOutput");
const terminalInputRow = $("terminalInputRow");
const terminalPrompt = $("terminalPrompt");
const terminalInput = $("terminalInput");

const newProjectModal = $("newProjectModal");
const newProjectCloseButton = $("newProjectCloseButton");
const newProjectCancelButton = $("newProjectCancelButton");
const createProjectButton = $("createProjectButton");
const projectLocationInput = $("projectLocation");
const projectNameInput = $("projectName");
const browseProjectLocationButton = $("browseProjectLocationButton");
const projectPathPreview = $("projectPathPreview");
const newProjectError = $("newProjectError");
const templateButtons = $$(".template-button");
const projectTypeCards = $$(".project-type-card:not(.disabled)");

const newFileModal = $("newFileModal");
const newFileCloseButton = $("newFileCloseButton");
const newFileCancelButton = $("newFileCancelButton");
const createFileButton = $("createFileButton");
const newFileName = $("newFileName");
const newFileDestination = $("newFileDestination");
const newFileError = $("newFileError");
const filePresetButtons = $$(".file-preset");

const newFolderModal = $("newFolderModal");
const newFolderCloseButton = $("newFolderCloseButton");
const newFolderCancelButton = $("newFolderCancelButton");
const createFolderButton = $("createFolderButton");
const newFolderName = $("newFolderName");
const newFolderDestination = $("newFolderDestination");
const newFolderError = $("newFolderError");

const settingsModal = $("settingsModal");
const settingsCloseButton = $("settingsCloseButton");
const settingsDoneButton = $("settingsDoneButton");
const languageSelect = $("languageSelect");
const editorFontSizeInput = $("editorFontSizeInput");
const autoSaveCheckbox = $("autoSaveCheckbox");
const autoRefreshFilesCheckbox = $("autoRefreshFilesCheckbox");
const autoRebuildBeforeRunCheckbox = $("autoRebuildBeforeRunCheckbox");
const buildModeSelect = $("buildModeSelect");
const externalBuildCommandInput = $("externalBuildCommandInput");
const settingsCMakePath = $("settingsCMakePath");
const refreshCMakeButton = $("refreshCMakeButton");
const settingInfoButtons = $$("[data-setting-info]");
const settingsNavButtons = $$('[data-settings-page]');
const settingsGeneralPage = $("settingsGeneralPage");
const settingsBuildPage = $("settingsBuildPage");
const settingsPageTitle = $("settingsPageTitle");
const settingsPageDescription = $("settingsPageDescription");

const runConfigModal = $("runConfigModal");
const runConfigCloseButton = $("runConfigCloseButton");
const runConfigCancelButton = $("runConfigCancelButton");
const runConfigSaveButton = $("runConfigSaveButton");
const runConfigNameInput = $("runConfigNameInput");
const runConfigModeSelect = $("runConfigModeSelect");
const runConfigCommandInput = $("runConfigCommandInput");
const runConfigError = $("runConfigError");
const runConfigList = $("runConfigList");
const addRunConfigButton = $("addRunConfigButton");
const deleteRunConfigButton = $("deleteRunConfigButton");

const helpModal = $("helpModal");
const helpCloseButton = $("helpCloseButton");
const helpBody = $("helpBody");
const helpNavButtons = $$(".help-nav");
const helpMenuItems = $$("#helpMenu [data-help-page]");

const contextNew = $("contextNew");
const contextRun = $("contextRun");
const contextCut = $("contextCut");
const contextCopy = $("contextCopy");
const contextPaste = $("contextPaste");
const contextRename = $("contextRename");
const contextCopyPath = $("contextCopyPath");
const contextDelete = $("contextDelete");
const contextOpenIn = $("contextOpenIn");
const contextRefresh = $("contextRefresh");
const newSubmenu = $("newSubmenu");
const openInSubmenu = $("openInSubmenu");
const newSubmenuButtons = $$('[data-new-preset]');
const openInExplorer = $("openInExplorer");
const openInVoidEditor = $("openInVoidEditor");
const openInAssociated = $("openInAssociated");
const openInTerminal = $("openInTerminal");
const editorCommandButtons = $$("[data-editor-command]");
const appDialogModal = $("appDialogModal");
const appDialogTitle = $("appDialogTitle");
const appDialogMessage = $("appDialogMessage");
const appDialogInput = $("appDialogInput");
const appDialogClose = $("appDialogClose");
const appDialogCancel = $("appDialogCancel");
const appDialogConfirm = $("appDialogConfirm");


let projects = [];
let recentProjects = [];
let currentSection = "all";
let currentProject = null;
let selectedFolderPath = null;
let selectedExplorerPath = null;
let explorerContextTarget = null;
let draggedPath = null;
let explorerNodes = new Map();

let selectedProjectType = "text";
let selectedTemplate = "basic";
let suggestedProjectName = "void_project_1";
let selectedFilePreset = "file";

let lightFile = null;
let lightModified = false;
let lightSaveTimer = null;
let openDocuments = [];
let activeDocumentPath = null;
let projectSaveTimer = null;
let activeEditor = null;

let terminals = new Map();
let activeTerminalId = null;
let terminalCounter = 1;
let terminalHistory = [];
let terminalHistoryIndex = 0;

let searchMode = "files";
let searchTimer = null;
let detectedCMake = "";

let settings = {
    language: "en",
    editorFontSize: 14,
    autoSave: true,
    autoRefreshFiles: true,
    autoRebuildBeforeRun: true,
    buildMode: "void",
    externalBuildCommand: ""
};

let runConfigurations = [];
let activeRunConfigurationId = "project";
let executionState = { running: false, phase: "", pendingRunAfterBuild: false };
let lastProjectStamp = "";
let fileRefreshTimer = null;
let explorerClipboard = null;
let explorerUndoStack = [];

const translations = {
    en: {
        file:"File", edit:"Edit", help:"Help", newProject:"New Project", openProject:"Open Project", openFile:"Open File", save:"Save", settings:"Settings", exit:"Exit", projects:"Projects", allProjects:"All Projects", recent:"Recent", editor:"Editor", explorer:"Explorer",
        build:"Build", run:"Run", restart:"Restart", stop:"Stop", search:"Search", textProjectBadge:"TEXT PROJECT", output:"Output", terminal:"Terminal", general:"General", buildSettings:"Build",
        settingsDescription:"Void Engine editor preferences.", buildSettingsDescription:"Build system, toolchain and run preparation.", language:"Language", languageDescription:"Interface language.", editorFontSize:"Editor font size", editorFontSizeDescription:"Code editor text size.", autoSave:"Auto save", autoSaveDescription:"Save changed text files automatically.", autoRefreshFiles:"Auto refresh files", autoRefreshFilesDescription:"Refresh Explorer when project files change on disk.",
        autoRebuildBeforeRun:"Build before run when changed", autoRebuildBeforeRunDescription:"Build only when source/config files are newer than the executable.", builder:"Builder", builderDescription:"Void Build manages configure/build and cancellation itself.", externalBuildCommand:"External build command", externalBuildCommandDescription:"Used only when External command is selected.", detectedCMake:"Detected CMake", refresh:"Refresh", done:"Done",
        runSettings:"Run/Debug Configurations", runSettingsDescription:"Choose what the toolbar launches.", configurationName:"Configuration name", mode:"Mode", command:"Command", commandHints:"Command variables", saveConfig:"Save Configuration", cancel:"Cancel",
        searchProjectPlaceholder:"Search project...", selectFileOrCreate:"Select a file in Explorer or create a new one.", newFile:"New File", newFolder:"New Folder", new:"New", fileGeneric:"File", directory:"Directory", cut:"Cut", copy:"Copy", paste:"Paste", rename:"Rename", copyPath:"Copy Path", delete:"Delete", openIn:"Open In", voidEditor:"Void Editor", associatedApplication:"Associated Application", cppSource:"C/C++ Source File", cppHeader:"C/C++ Header File", javascriptFile:"JavaScript File", htmlFile:"HTML File", stylesheet:"Stylesheet", shader:"Shader", externalCommandOption:"External command",
        searchFiles:"Files", searchText:"Text", noTerminal:"No terminal", pressPlusPowerShell:"Press + to open Windows PowerShell.", actionBuildInfo:"Build project. While building this button becomes Cancel.", actionRunInfo:"Run selected configuration.", actionRestartInfo:"Close the running app and launch it again.", actionStopInfo:"Close the running app and its child processes.",
        runConfigProject:"VoidApp", runConfigFile:"Current File", runConfigCustom:"Custom Command", editConfigurations:"Edit Configurations...", recentDescription:"Projects you opened recently.", projectsDescription:"Create, open and manage your Void Engine projects.", noProjectsYet:"No projects yet", noRecentProjects:"No recent projects", noRecentProjectsDescription:"Projects you open will appear here.", noProjectsDescription:"Create your first project to start building with Void Engine.", createProject:"Create Project", projectSection:"Project", location:"Location", browse:"Browse", name:"Name", leaveEmptyForAuto:"Leave empty for automatic name", projectPath:"Project path", basic:"Basic", basicDescription:"Starter C++ project", empty:"Empty", emptyDescription:"Only project_type.void", templates:"Templates",
        info:"Information", buildCancelled:"Build cancelled.", buildFailed:"Build failed.", runStopped:"Application stopped.", runFinished:"Application finished.", buildBeforeRun:"Project changed. Building before run...", nothingToPaste:"Nothing to paste.", unsupportedRun:"This file type cannot be run directly.", openFileFirst:"Select a file first."
    },
    ru: {
        file:"Файл", edit:"Правка", help:"Помощь", newProject:"Новый проект", openProject:"Открыть проект", openFile:"Открыть файл", save:"Сохранить", settings:"Настройки", exit:"Выход", projects:"Проекты", allProjects:"Все проекты", recent:"Недавние", editor:"Редактор", explorer:"Проводник",
        build:"Сборка", run:"Запуск", restart:"Перезапуск", stop:"Стоп", search:"Поиск", textProjectBadge:"ТЕКСТОВЫЙ ПРОЕКТ", output:"Вывод", terminal:"Терминал", general:"Общие", buildSettings:"Сборка",
        settingsDescription:"Параметры редактора Void Engine.", buildSettingsDescription:"Система сборки, инструменты и подготовка к запуску.", language:"Язык", languageDescription:"Язык всего интерфейса.", editorFontSize:"Размер шрифта редактора", editorFontSizeDescription:"Размер текста в редакторе кода.", autoSave:"Автосохранение", autoSaveDescription:"Автоматически сохранять изменённые текстовые файлы.", autoRefreshFiles:"Автообновление файлов", autoRefreshFilesDescription:"Обновлять Проводник, когда файлы проекта меняются на диске.",
        autoRebuildBeforeRun:"Собирать перед запуском при изменениях", autoRebuildBeforeRunDescription:"Собирать только если исходники/конфиги новее готового exe.", builder:"Система сборки", builderDescription:"Void Build сам управляет конфигурацией, сборкой и отменой.", externalBuildCommand:"Сторонняя команда сборки", externalBuildCommandDescription:"Используется только при выборе сторонней команды.", detectedCMake:"Обнаруженный CMake", refresh:"Обновить", done:"Готово",
        runSettings:"Конфигурации запуска", runSettingsDescription:"Выберите, что запускается с верхней панели.", configurationName:"Имя конфигурации", mode:"Режим", command:"Команда", commandHints:"Переменные команды", saveConfig:"Сохранить конфигурацию", cancel:"Отмена",
        searchProjectPlaceholder:"Поиск по проекту...", selectFileOrCreate:"Выберите файл в Проводнике или создайте новый.", newFile:"Новый файл", newFolder:"Новая папка", new:"Создать", fileGeneric:"Файл", directory:"Папка", cut:"Вырезать", copy:"Копировать", paste:"Вставить", rename:"Переименовать", copyPath:"Копировать путь", delete:"Удалить", openIn:"Открыть в", voidEditor:"Void Editor", associatedApplication:"Связанное приложение", cppSource:"Исходный файл C/C++", cppHeader:"Заголовочный файл C/C++", javascriptFile:"Файл JavaScript", htmlFile:"Файл HTML", stylesheet:"Таблица стилей", shader:"Шейдер", externalCommandOption:"Сторонняя команда",
        searchFiles:"Файлы", searchText:"Текст", noTerminal:"Нет терминала", pressPlusPowerShell:"Нажмите +, чтобы открыть Windows PowerShell.", actionBuildInfo:"Собрать проект. Во время сборки эта кнопка становится Отмена.", actionRunInfo:"Запустить выбранную конфигурацию.", actionRestartInfo:"Закрыть запущенную программу и запустить её заново.", actionStopInfo:"Закрыть запущенную программу и все её дочерние процессы.",
        runConfigProject:"VoidApp", runConfigFile:"Текущий файл", runConfigCustom:"Своя команда", editConfigurations:"Изменить конфигурации...", recentDescription:"Проекты, которые вы недавно открывали.", projectsDescription:"Создавайте, открывайте и управляйте проектами Void Engine.", noProjectsYet:"Пока нет проектов", noRecentProjects:"Нет недавних проектов", noRecentProjectsDescription:"Открытые проекты появятся здесь.", noProjectsDescription:"Создайте первый проект, чтобы начать работу с Void Engine.", createProject:"Создать проект", projectSection:"Проект", location:"Расположение", browse:"Обзор", name:"Имя", leaveEmptyForAuto:"Оставьте пустым для автоматического имени", projectPath:"Путь проекта", basic:"Basic", basicDescription:"Стартовый C++ проект", empty:"Empty", emptyDescription:"Только project_type.void", templates:"Шаблоны",
        info:"Информация", buildCancelled:"Сборка отменена.", buildFailed:"Сборка завершилась с ошибкой.", runStopped:"Программа остановлена.", runFinished:"Программа завершилась.", buildBeforeRun:"Проект изменился. Сначала выполняется сборка...", nothingToPaste:"Нечего вставлять.", unsupportedRun:"Этот тип файла нельзя запустить напрямую.", openFileFirst:"Сначала выберите файл."
    }
};

function t(key) {
    const language = translations[settings.language] ?? translations.en;
    return language[key] ?? translations.en[key] ?? key;
}

function parseNativeResult(value) {
    if (value === null || value === undefined) {
        return {};
    }

    if (typeof value !== "string") {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

function normalizePath(path) {
    return (path || "").replaceAll("/", "\\").replace(/\\+$/, "").toLowerCase();
}

function parentPath(path) {
    const normalized = (path || "").replaceAll("/", "\\").replace(/\\+$/, "");
    const index = normalized.lastIndexOf("\\");
    return index > 2 ? normalized.substring(0, index) : normalized;
}

function escapeHtml(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function formatBytes(bytes = 0) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function toFileUrl(path) {
    return encodeURI(`file:///${String(path).replaceAll("\\", "/")}`);
}

function iconUse(id) {
    return `<svg viewBox="0 0 24 24"><use href="#${id}"></use></svg>`;
}

function fileIconInfo(entry) {
    if (entry.kind === "folder") return { icon: "i-folder", cls: "folder" };
    if (entry.kind === "image") return { icon: "i-image", cls: "image" };

    const ext = (entry.extension || "").toLowerCase();
    const name = (entry.name || "").toLowerCase();
    if ([".cpp", ".cc", ".cxx", ".c"].includes(ext)) return { icon:"i-file-cpp", cls:"cpp" };
    if ([".h", ".hpp", ".hxx"].includes(ext)) return { icon:"i-file-h", cls:"header" };
    if ([".js", ".mjs", ".ts", ".jsx", ".tsx"].includes(ext)) return { icon:"i-file-js", cls:"js" };
    if ([".html", ".htm"].includes(ext)) return { icon:"i-file-html", cls:"html" };
    if ([".css", ".scss"].includes(ext)) return { icon:"i-file-css", cls:"css" };
    if (ext === ".json") return { icon:"i-file-json", cls:"json" };
    if ([".lua", ".luau"].includes(ext)) return { icon:"i-file-lua", cls:"lua" };
    if (ext === ".py") return { icon:"i-file-py", cls:"py" };
    if ([".txt", ".log"].includes(ext)) return { icon:"i-file-text", cls:"text" };
    if ([".md", ".markdown"].includes(ext)) return { icon:"i-file-markdown", cls:"markdown" };
    if ([".ini", ".cfg", ".conf", ".toml", ".yml", ".yaml", ".xml"].includes(ext)) return { icon:"i-file-config", cls:"configfile" };
    if ([".ps1", ".bat", ".cmd"].includes(ext)) return { icon:"i-file-ps", cls:"powershell" };
    if ([".vert", ".frag", ".glsl", ".hlsl", ".shader"].includes(ext)) return { icon:"i-file-shader", cls:"shader" };
    if (ext === ".void") return { icon:"i-file-void", cls:"void" };
    if (name === "cmakelists.txt" || ext === ".cmake") return { icon:"i-file-cmake", cls:"cmake" };
    return { icon:"i-file", cls:"file" };
}

function getLanguageInfo(fileName, extension) {
    const ext = (extension || "").toLowerCase();
    if ((fileName || "").toLowerCase() === "cmakelists.txt") return { badge:"CMAKE", name:"CMake" };
    const map = {
        ".cpp":["C++","C++"], ".cc":["C++","C++"], ".cxx":["C++","C++"], ".c":["C","C"],
        ".hpp":["H++","C++ Header"], ".h":["H","C/C++ Header"], ".js":["JS","JavaScript"],
        ".ts":["TS","TypeScript"], ".html":["HTML","HTML"], ".css":["CSS","CSS"], ".json":["JSON","JSON"],
        ".lua":["LUA","Lua"], ".luau":["LUAU","Luau"], ".py":["PY","Python"], ".glsl":["GLSL","GLSL"],
        ".vert":["VERT","Vertex Shader"], ".frag":["FRAG","Fragment Shader"], ".void":["VOID","Void Configuration"],
        ".md":["MD","Markdown"], ".txt":["TXT","Plain Text"]
    };
    const value = map[ext] ?? ["TEXT","Plain Text"];
    return { badge:value[0], name:value[1] };
}

function highlightSource(source, extension) {
    const keywords = new Set(["if","else","for","while","do","switch","case","break","continue","return","class","struct","namespace","public","private","protected","virtual","override","const","constexpr","static","inline","auto","new","delete","try","catch","throw","using","template","typename","this","nullptr","true","false","function","let","var","async","await","import","export","from","local","then","end","nil","and","or","not","def","None","True","False","in","is","with","lambda"]);
    const types = new Set(["int","float","double","char","bool","void","long","short","unsigned","string","std","size_t","uint32_t","uint64_t"]);
    let result = "";
    let index = 0;
    while (index < source.length) {
        const c = source[index];
        const n = source[index + 1] ?? "";
        if (c === "/" && n === "/") {
            let end = source.indexOf("\n", index); if (end < 0) end = source.length;
            result += `<span class="token-comment">${escapeHtml(source.substring(index, end))}</span>`; index = end; continue;
        }
        if ((extension === ".lua" || extension === ".luau") && c === "-" && n === "-") {
            let end = source.indexOf("\n", index); if (end < 0) end = source.length;
            result += `<span class="token-comment">${escapeHtml(source.substring(index, end))}</span>`; index = end; continue;
        }
        if (extension === ".py" && c === "#") {
            let end = source.indexOf("\n", index); if (end < 0) end = source.length;
            result += `<span class="token-comment">${escapeHtml(source.substring(index, end))}</span>`; index = end; continue;
        }
        if (c === '"' || c === "'" || c === "`") {
            const q = c; let end = index + 1;
            while (end < source.length) { if (source[end] === "\\") { end += 2; continue; } if (source[end] === q) { end++; break; } end++; }
            result += `<span class="token-string">${escapeHtml(source.substring(index, end))}</span>`; index = end; continue;
        }
        if (/[0-9]/.test(c)) {
            let end = index + 1; while (end < source.length && /[0-9a-fA-FxX._]/.test(source[end])) end++;
            result += `<span class="token-number">${escapeHtml(source.substring(index, end))}</span>`; index = end; continue;
        }
        if (/[A-Za-z_]/.test(c)) {
            let end = index + 1; while (end < source.length && /[A-Za-z0-9_]/.test(source[end])) end++;
            const word = source.substring(index, end);
            if (keywords.has(word)) result += `<span class="token-keyword">${word}</span>`;
            else if (types.has(word)) result += `<span class="token-type">${word}</span>`;
            else result += escapeHtml(word);
            index = end; continue;
        }
        result += escapeHtml(c); index++;
    }
    return result;
}

function updateEditorVisual(editor, syntaxLayer, gutter, cursorStatus, extension) {
    const value = editor.value;
    let lineCount = 1;
    for (let index = 0; index < value.length; ++index) {
        if (value.charCodeAt(index) === 10) ++lineCount;
    }

    let gutterText = "";
    for (let line = 1; line <= lineCount; ++line) {
        gutterText += line === lineCount ? String(line) : `${line}\n`;
    }
    gutter.textContent = gutterText;

    const largeFile = value.length > 2_000_000;
    if (largeFile) {
        syntaxLayer.textContent = value;
        syntaxLayer.classList.add("plain-large-file");
    } else {
        syntaxLayer.innerHTML = highlightSource(value, extension);
        syntaxLayer.classList.remove("plain-large-file");
    }

    syntaxLayer.style.height = `${Math.max(editor.clientHeight, editor.scrollHeight)}px`;
    syntaxLayer.style.width = `${Math.max(editor.clientWidth, editor.scrollWidth)}px`;
    gutter.scrollTop = editor.scrollTop;
    syntaxLayer.style.transform = `translate(${-editor.scrollLeft}px, ${-editor.scrollTop}px)`;
    if (cursorStatus) {
        const before = value.substring(0, editor.selectionStart);
        const lines = before.split("\n");
        cursorStatus.textContent = `Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
    }
}

function normalizePastedText(value) {
    return String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function insertEditorText(editor, value) {
    const text = normalizePastedText(value);
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const scrollTop = editor.scrollTop;
    const scrollLeft = editor.scrollLeft;
    editor.setRangeText(text, start, end, "end");
    editor.scrollTop = scrollTop;
    editor.scrollLeft = scrollLeft;
    editor.dispatchEvent(new Event("input", { bubbles: true }));
}

async function readClipboardText() {
    if (navigator.clipboard?.readText) {
        try {
            return await navigator.clipboard.readText();
        } catch { }
    }

    return parseNativeResult(await getClipboardTextNative());
}

function configureEditor(editor, syntaxLayer, gutter, cursorStatus, getExtension, changed) {
    editor.addEventListener("input", () => { updateEditorVisual(editor, syntaxLayer, gutter, cursorStatus, getExtension()); changed(); });
    editor.addEventListener("scroll", () => { gutter.scrollTop = editor.scrollTop; syntaxLayer.style.transform = `translate(${-editor.scrollLeft}px, ${-editor.scrollTop}px)`; });
    editor.addEventListener("click", () => updateEditorVisual(editor, syntaxLayer, gutter, cursorStatus, getExtension()));
    editor.addEventListener("keyup", () => updateEditorVisual(editor, syntaxLayer, gutter, cursorStatus, getExtension()));
    editor.addEventListener("focus", () => activeEditor = editor);
    editor.addEventListener("paste", event => {
        const text = event.clipboardData?.getData("text/plain");
        if (typeof text !== "string") return;
        event.preventDefault();
        insertEditorText(editor, text);
    });
    editor.addEventListener("keydown", event => {
        if (event.key !== "Tab") return;
        event.preventDefault();
        editor.setRangeText("\t", editor.selectionStart, editor.selectionEnd, "end");
        editor.dispatchEvent(new Event("input"));
    });
    editor.addEventListener("contextmenu", event => {
        event.preventDefault(); event.stopPropagation(); activeEditor = editor;
        showContextMenu(editorContextMenu, event.clientX, event.clientY);
    });
}

function showContextMenu(menu, x, y) {
    closeMenus();
    editorContextMenu.classList.add("hidden");
    explorerContextMenu.classList.add("hidden");
    menu.classList.remove("hidden");
    const rect = menu.getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - rect.width - 8))}px`;
    menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - rect.height - 8))}px`;
}

function closeMenus() {
    fileMenu.classList.add("hidden");
    editMenu.classList.add("hidden");
    helpMenu.classList.add("hidden");
    newSubmenu?.classList.add("hidden");
    openInSubmenu?.classList.add("hidden");
    runConfigurationMenu?.classList.add("hidden");
    fileMenuButton.classList.remove("active");
    editMenuButton.classList.remove("active");
    helpMenuButton.classList.remove("active");
}

function toggleMenu(button, menu) {
    const open = !menu.classList.contains("hidden"); closeMenus();
    if (!open) { menu.classList.remove("hidden"); button.classList.add("active"); }
}

function showOnly(view) {
    projectManagerView.classList.add("hidden"); lightEditorView.classList.add("hidden"); projectEditorView.classList.add("hidden");
    view.classList.remove("hidden"); editMenuButton.classList.toggle("hidden", view === projectManagerView);
}

async function executeEditorCommand(command) {
    if (!activeEditor) return;
    activeEditor.focus();
    if (command === "undo") { document.execCommand("undo"); return; }
    if (command === "redo") { document.execCommand("redo"); return; }
    if (command === "selectAll") { activeEditor.select(); return; }
    const start = activeEditor.selectionStart, end = activeEditor.selectionEnd;
    const selected = activeEditor.value.substring(start, end);
    if (command === "copy") { await setClipboardTextNative(selected); return; }
    if (command === "cut") { await setClipboardTextNative(selected); activeEditor.setRangeText("", start, end, "start"); activeEditor.dispatchEvent(new Event("input")); return; }
    if (command === "paste") { insertEditorText(activeEditor, await readClipboardText()); }
}

let appDialogResolver = null;
let appDialogMode = "alert";

function closeAppDialog(value) {
    appDialogModal.classList.add("hidden");
    const resolver = appDialogResolver;
    appDialogResolver = null;
    if (resolver) resolver(value);
}

function showAppDialog({ title = "Void Engine", message = "", mode = "alert", value = "", confirmText = "OK", cancelText = "Cancel" } = {}) {
    if (appDialogResolver) closeAppDialog(null);

    appDialogMode = mode;
    appDialogTitle.textContent = title;
    appDialogMessage.textContent = message;
    appDialogInput.value = value;
    appDialogInput.classList.toggle("hidden", mode !== "prompt");
    appDialogCancel.classList.toggle("hidden", mode === "alert");
    appDialogConfirm.textContent = confirmText;
    appDialogCancel.textContent = cancelText;
    appDialogModal.classList.remove("hidden");

    if (mode === "prompt") {
        requestAnimationFrame(() => {
            appDialogInput.focus();
            appDialogInput.select();
        });
    } else {
        requestAnimationFrame(() => appDialogConfirm.focus());
    }

    return new Promise(resolve => {
        appDialogResolver = resolve;
    });
}

function appAlert(message, title = "Void Engine") {
    return showAppDialog({ title, message, mode: "alert" });
}

function appConfirm(message, title = "Void Engine", confirmText = "Confirm") {
    return showAppDialog({ title, message, mode: "confirm", confirmText });
}

function appPrompt(message, value = "", title = "Void Engine", confirmText = "Rename") {
    return showAppDialog({ title, message, mode: "prompt", value, confirmText });
}

function applyLanguage() {
    const language = translations[settings.language] ?? translations.en;

    $$('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (language[key]) {
            element.textContent = language[key];
        }
    });

    searchInput.placeholder = t("searchProjectPlaceholder");
    projectWelcomeView.querySelector("p").textContent = t("selectFileOrCreate");
    welcomeNewFileButton.textContent = t("newFile");
    welcomeSearchButton.textContent = t("search");
    outputPanelButton.lastChild.textContent = t("output");
    terminalPanelButton.lastChild.textContent = t("terminal");
    searchModeButtons.forEach(button => {
        button.textContent = button.dataset.searchMode === "files" ? t("searchFiles") : t("searchText");
    });

    const terminalEmptyStrong = terminalEmptyState.querySelector("strong");
    const terminalEmptySpan = terminalEmptyState.querySelector("span");
    if (terminalEmptyStrong) terminalEmptyStrong.textContent = t("noTerminal");
    if (terminalEmptySpan) terminalEmptySpan.textContent = t("pressPlusPowerShell");

    const helpLabels = {
        about: settings.language === "ru" ? "О движке" : "About",
        commands: settings.language === "ru" ? "Команды" : "Commands",
        languages: settings.language === "ru" ? "Языки" : "Languages",
        colors: settings.language === "ru" ? "Цвета проводника" : "Explorer Colors",
        structure: settings.language === "ru" ? "Структура проекта" : "Project Structure"
    };
    helpNavButtons.forEach(button => {
        if (helpLabels[button.dataset.helpPage]) button.textContent = helpLabels[button.dataset.helpPage];
    });
    const helpTitle = helpModal.querySelector("aside h3");
    if (helpTitle) helpTitle.textContent = t("help");

    const templateButtonsLocal = $$(".template-button");
    if (templateButtonsLocal[0]) {
        templateButtonsLocal[0].querySelector("strong").textContent = t("basic");
        templateButtonsLocal[0].querySelector("span").textContent = t("basicDescription");
    }
    if (templateButtonsLocal[1]) {
        templateButtonsLocal[1].querySelector("strong").textContent = t("empty");
        templateButtonsLocal[1].querySelector("span").textContent = t("emptyDescription");
    }

    runConfigModeSelect.options[0].textContent = t("runConfigProject");
    runConfigModeSelect.options[1].textContent = t("runConfigFile");
    runConfigModeSelect.options[2].textContent = t("runConfigCustom");
    buildModeSelect.options[0].textContent = "Void Build";
    buildModeSelect.options[1].textContent = t("externalCommandOption");
    const newPresetLabels = {
        cpp: t("cppSource"),
        hpp: t("cppHeader"),
        file: t("fileGeneric"),
        folder: t("directory"),
        js: t("javascriptFile"),
        html: t("htmlFile"),
        css: t("stylesheet"),
        json: "JSON",
        lua: "Lua",
        shader: t("shader")
    };
    newSubmenuButtons.forEach(button => {
        const label = button.querySelector("span");
        if (label && newPresetLabels[button.dataset.newPreset]) label.textContent = newPresetLabels[button.dataset.newPreset];
    });

    searchExplorerButton.title = t("search");
    newItemButton.title = t("new");
    refreshExplorerButton.title = t("refresh");
    buildProjectButton.title = executionState.phase === "build" ? t("stop") : t("actionBuildInfo");
    runProjectButton.title = executionState.phase.startsWith("run") ? t("actionRestartInfo") : t("actionRunInfo");
    stopRunButton.title = t("actionStopInfo");
    refreshCMakeButton.title = settings.language === "ru" ? "Повторно найти CMake" : "Detect CMake again";

    const newProjectHeader = newProjectModal.querySelector(".modal-header h2");
    const newProjectDesc = newProjectModal.querySelector(".modal-header p");
    const newProjectLabels = newProjectModal.querySelectorAll(".form-section > label");
    const newProjectFieldLabels = newProjectModal.querySelectorAll(".field > span");
    if (newProjectHeader) newProjectHeader.textContent = t("newProject");
    if (newProjectDesc) newProjectDesc.textContent = settings.language === "ru" ? "Создайте новый проект Void Engine." : "Create a new Void Engine project.";
    if (newProjectLabels[0]) newProjectLabels[0].textContent = settings.language === "ru" ? "Тип проекта" : "Project type";
    if (newProjectLabels[1]) newProjectLabels[1].textContent = t("projectSection");
    if (newProjectFieldLabels[0]) newProjectFieldLabels[0].textContent = t("location");
    if (newProjectFieldLabels[1]) newProjectFieldLabels[1].textContent = t("name");
    browseProjectLocationButton.textContent = t("browse");
    projectNameInput.placeholder = t("leaveEmptyForAuto");
    const pathLabel = newProjectModal.querySelector(".path-preview span");
    if (pathLabel) pathLabel.textContent = t("projectPath");
    newProjectCancelButton.textContent = t("cancel");
    createProjectButton.textContent = t("createProject");

    const newFileHeader = newFileModal.querySelector(".modal-header h2");
    const newFileLabel = newFileModal.querySelector(".field > span");
    if (newFileHeader) newFileHeader.textContent = t("newFile");
    if (newFileLabel) newFileLabel.textContent = t("name");
    newFileCancelButton.textContent = t("cancel");
    createFileButton.textContent = settings.language === "ru" ? "Создать" : "Create";

    const newFolderHeader = newFolderModal.querySelector(".modal-header h2");
    const newFolderLabel = newFolderModal.querySelector(".field > span");
    if (newFolderHeader) newFolderHeader.textContent = t("newFolder");
    if (newFolderLabel) newFolderLabel.textContent = settings.language === "ru" ? "Имя папки" : "Folder name";
    newFolderCancelButton.textContent = t("cancel");
    createFolderButton.textContent = settings.language === "ru" ? "Создать" : "Create";

    const ru = settings.language === "ru";
    const explorerLegendItems = $$(".explorer-legend span");
    if (explorerLegendItems[0]) explorerLegendItems[0].lastChild.textContent = ru ? "Сгенерировано" : "Generated";
    if (explorerLegendItems[1]) explorerLegendItems[1].lastChild.textContent = ru ? "Конфигурация" : "Config";

    const newProjectCaption = newProjectModal.querySelector(".modal-caption");
    if (newProjectCaption) newProjectCaption.textContent = ru ? "Шаблоны" : "Templates";
    const projectTypeCardsLocal = newProjectModal.querySelectorAll(".project-type-card");
    if (projectTypeCardsLocal[0]) {
        projectTypeCardsLocal[0].querySelector("strong").textContent = ru ? "3D проект" : "3D Project";
        projectTypeCardsLocal[0].querySelector("span").textContent = ru ? "Пока не готов. Создание отключено." : "Not ready yet. Creation is disabled.";
        projectTypeCardsLocal[0].querySelector("em").textContent = ru ? "ПОЗЖЕ" : "COMING LATER";
    }
    if (projectTypeCardsLocal[1]) {
        projectTypeCardsLocal[1].querySelector("strong").textContent = ru ? "Текстовый проект" : "Text Project";
        projectTypeCardsLocal[1].querySelector("span").textContent = ru ? "C++ код, файлы, терминал и инструменты сборки." : "C++ source code, files, terminal and build tools.";
    }

    const imageLabels = $$(".image-info > div > span");
    for (let index = 0; index < imageLabels.length; ++index) {
        const labels = ru ? ["Формат", "Разрешение", "Размер", "Путь"] : ["Format", "Resolution", "Size", "Path"];
        imageLabels[index].textContent = labels[index % 4];
    }
    const binaryMessage = projectBinaryView.querySelector("p");
    if (binaryMessage) binaryMessage.textContent = ru ? "Файл виден в проекте, но его нельзя редактировать как текст." : "This file is visible in the project but cannot be edited as text.";

    const editorLabels = ru
        ? ["Отменить", "Повторить", "Вырезать", "Копировать", "Вставить", "Выделить всё"]
        : ["Undo", "Redo", "Cut", "Copy", "Paste", "Select All"];
    editorContextMenu.querySelectorAll("button span:first-child").forEach((node, index) => {
        if (editorLabels[index]) node.textContent = editorLabels[index];
    });

    renderRunConfigurationMenu();
    if (runConfigList && !runConfigModal.classList.contains("hidden")) renderRunConfigEditorList();
    updateSectionHeaders();
    updateSettingsPage();
}

function applySettings() {
    document.documentElement.style.setProperty("--editor-font-size", `${Math.max(11, Math.min(24, Number(settings.editorFontSize) || 14))}px`);
    languageSelect.value = settings.language;
    editorFontSizeInput.value = settings.editorFontSize;
    autoSaveCheckbox.checked = !!settings.autoSave;
    autoRefreshFilesCheckbox.checked = settings.autoRefreshFiles !== false;
    autoRebuildBeforeRunCheckbox.checked = settings.autoRebuildBeforeRun !== false;
    buildModeSelect.value = settings.buildMode || "void";
    externalBuildCommandInput.value = settings.externalBuildCommand || "";
    applyLanguage();
    restartFileWatcher();
}

function createDefaultRunConfigurations() {
    return [
        { id:"project", name:t("runConfigProject"), mode:"project", command:"" },
        { id:"file", name:t("runConfigFile"), mode:"file", command:"" },
        { id:"custom", name:t("runConfigCustom"), mode:"custom", command:"" }
    ];
}

function ensureRunConfigurations() {
    if (!Array.isArray(runConfigurations) || !runConfigurations.length) {
        runConfigurations = createDefaultRunConfigurations();
    }

    const defaults = createDefaultRunConfigurations();
    for (const defaultConfig of defaults) {
        if (!runConfigurations.some(config => config.id === defaultConfig.id)) {
            runConfigurations.push(defaultConfig);
        }
    }

    const projectConfig = runConfigurations.find(config => config.id === "project");
    const fileConfig = runConfigurations.find(config => config.id === "file");
    const customConfig = runConfigurations.find(config => config.id === "custom");
    if (projectConfig && (!projectConfig.name || ["Project", "Проект", "VoidApp"].includes(projectConfig.name))) projectConfig.name = t("runConfigProject");
    if (fileConfig && (!fileConfig.name || ["Current File", "Текущий файл"].includes(fileConfig.name))) fileConfig.name = t("runConfigFile");
    if (customConfig && (!customConfig.name || ["Custom Command", "Своя команда", "Пользовательская команда"].includes(customConfig.name))) customConfig.name = t("runConfigCustom");

    if (!runConfigurations.some(config => config.id === activeRunConfigurationId)) {
        activeRunConfigurationId = runConfigurations[0].id;
    }
}

async function saveState() {
    const state = { projects, recentProjects, settings, runConfigurations, activeRunConfigurationId };
    try {
        await saveAppStateNative(JSON.stringify(state));
    } catch { }
}

async function loadState() {
    try {
        const state = parseNativeResult(await loadAppStateNative());
        if (Array.isArray(state.projects)) projects = state.projects;
        if (Array.isArray(state.recentProjects)) recentProjects = state.recentProjects;
        if (state.settings && typeof state.settings === "object") settings = { ...settings, ...state.settings };
        if (Array.isArray(state.runConfigurations)) runConfigurations = state.runConfigurations;
        if (typeof state.activeRunConfigurationId === "string") activeRunConfigurationId = state.activeRunConfigurationId;
    } catch { }

    ensureRunConfigurations();
    applySettings();
    updateSectionHeaders();
    renderProjects();
}

async function refreshCMakeDetection() {
    try {
        detectedCMake = parseNativeResult(await findCMakeNative()) || "";
    } catch {
        detectedCMake = "";
    }

    const text = detectedCMake ? `CMake: ${detectedCMake.split(/[\/]/).pop()}` : "CMake: not found";
    cmakeBadge.textContent = text;
    cmakeBadge.classList.toggle("ok", !!detectedCMake);
    cmakeBadge.classList.toggle("bad", !detectedCMake);
    settingsCMakePath.textContent = detectedCMake || (settings.language === "ru" ? "Не найден." : "Not found.");
}

function getActiveDocument() {
    return openDocuments.find(doc => normalizePath(doc.path) === normalizePath(activeDocumentPath)) || null;
}

function updateSectionHeaders() {
    if (currentSection === "recent") {
        pageTitle.textContent = t("recent");
        pageDescription.textContent = t("recentDescription");
    } else {
        pageTitle.textContent = t("projects");
        pageDescription.textContent = t("projectsDescription");
    }
}

function getActiveRunConfiguration() {
    ensureRunConfigurations();
    return runConfigurations.find(item => item.id === activeRunConfigurationId) || runConfigurations[0];
}

function renderRunConfigurationMenu() {
    ensureRunConfigurations();
    const active = getActiveRunConfiguration();
    runConfigurationName.textContent = active?.name || t("runConfigProject");
    runConfigurationMenu.innerHTML = "";

    for (const config of runConfigurations) {
        const row = document.createElement("div");
        row.className = `run-config-row ${config.id === activeRunConfigurationId ? "active" : ""}`;

        const select = document.createElement("button");
        select.className = "run-config-main";
        select.innerHTML = `<svg><use href="#i-monitor"></use></svg><span>${escapeHtml(config.name || config.id)}</span>`;
        select.addEventListener("click", async () => {
            activeRunConfigurationId = config.id;
            renderRunConfigurationMenu();
            runConfigurationMenu.classList.add("hidden");
            await saveState();
        });

        const actions = document.createElement("div");
        actions.className = "run-config-inline-actions";

        const isActiveRunning = executionState.running && executionState.phase.startsWith("run") && config.id === activeRunConfigurationId;
        const run = document.createElement("button");
        run.title = isActiveRunning ? t("restart") : t("run");
        run.innerHTML = iconUse(isActiveRunning ? "i-run-restart" : "i-play");
        run.addEventListener("click", async event => {
            event.stopPropagation();
            activeRunConfigurationId = config.id;
            renderRunConfigurationMenu();
            runConfigurationMenu.classList.add("hidden");
            await startRun();
        });
        actions.appendChild(run);

        if (isActiveRunning) {
            const stop = document.createElement("button");
            stop.className = "inline-stop";
            stop.title = t("stop");
            stop.innerHTML = iconUse("i-stop");
            stop.addEventListener("click", async event => {
                event.stopPropagation();
                runConfigurationMenu.classList.add("hidden");
                await stopRun();
            });
            actions.appendChild(stop);
        }

        const more = document.createElement("button");
        more.title = t("runSettings");
        more.innerHTML = iconUse("i-more");
        more.addEventListener("click", event => {
            event.stopPropagation();
            activeRunConfigurationId = config.id;
            runConfigurationMenu.classList.add("hidden");
            openRunConfigurationModal();
        });

        actions.appendChild(more);
        row.append(select, actions);
        runConfigurationMenu.appendChild(row);
    }

    const separator = document.createElement("div");
    separator.className = "menu-separator";
    const edit = document.createElement("button");
    edit.className = "run-config-edit";
    edit.textContent = t("editConfigurations");
    edit.addEventListener("click", () => {
        runConfigurationMenu.classList.add("hidden");
        openRunConfigurationModal();
    });
    runConfigurationMenu.append(separator, edit);
}

function isDirectlyRunnableFile(entry) {
    if (!entry || entry.kind === "folder") return false;
    const extension = String(entry.extension || entry.name?.match(/\.[^.]+$/)?.[0] || "").toLowerCase();
    return [".exe", ".bat", ".cmd", ".ps1", ".py", ".js", ".mjs", ".html", ".htm"].includes(extension);
}

function commandForPath(path, extension = "") {
    const escaped = String(path || "").replaceAll("'", "''");
    const ext = extension.toLowerCase();
    if (ext === ".ps1") return `& '${escaped}'`;
    if (ext === ".bat" || ext === ".cmd" || ext === ".exe") return `& '${escaped}'`;
    if (ext === ".py") return `python '${escaped}'`;
    if (ext === ".js" || ext === ".mjs") return `node '${escaped}'`;
    if (ext === ".html" || ext === ".htm") return `Start-Process '${escaped}'`;
    return "";
}

function createCurrentFileCommand() {
    const activeDocument = getActiveDocument();
    if (!activeDocument) {
        appAlert(t("openFileFirst"), t("info"));
        return "";
    }
    const command = commandForPath(activeDocument.path, activeDocument.extension || "");
    if (!command) appAlert(t("unsupportedRun"), t("info"));
    return command;
}

function substituteRunCommand(template) {
    const activeDocument = getActiveDocument();
    const filePath = activeDocument?.path || "";
    const fileName = filePath.split(/[\/]/).pop() || "";
    const fileDir = parentPath(filePath);
    return String(template || "")
        .replaceAll("${projectRoot}", currentProject?.path || "")
        .replaceAll("${file}", filePath)
        .replaceAll("${fileDir}", fileDir)
        .replaceAll("${fileName}", fileName);
}

function appendOutputLine(level, text) {
    if (!outputContent.dataset.richOutput) {
        outputContent.textContent = "";
        outputContent.dataset.richOutput = "1";
    }
    const line = document.createElement("div");
    line.className = `output-line ${level || "info"}`;
    line.textContent = String(text ?? "");
    outputContent.appendChild(line);
    outputContent.scrollTop = outputContent.scrollHeight;
}

window.onVoidExecutionOutput = (level, text) => {
    appendOutputLine(level, text);
};

window.onVoidExecutionState = async state => {
    executionState.running = !!state.running;
    executionState.phase = state.phase || "";
    updateExecutionButtons();

    if (state.running) return;

    if (state.phase === "build") {
        await refreshExplorerPreservingState();
        if (state.cancelled) appendOutputLine("warning", t("buildCancelled"));
        else if (!state.success) appendOutputLine("error", t("buildFailed"));

        if (executionState.pendingRunAfterBuild) {
            const shouldRun = state.success && !state.cancelled;
            executionState.pendingRunAfterBuild = false;
            if (shouldRun) {
                await launchSelectedConfiguration(false);
            }
        }
    } else if (state.phase === "run") {
        appendOutputLine(state.cancelled ? "warning" : "info", state.cancelled ? t("runStopped") : t("runFinished"));
    }
};

function updateExecutionButtons() {
    const building = executionState.running && executionState.phase === "build";
    const running = executionState.running && executionState.phase.startsWith("run");

    buildProjectButton.classList.toggle("building", building);
    buildProjectButton.classList.toggle("cancel", building);
    buildActionIcon.setAttribute("href", building ? "#i-stop" : "#i-build");
    buildProjectButton.title = building ? t("stop") : t("actionBuildInfo");
    buildProjectButton.disabled = running;

    runProjectButton.classList.toggle("running", running);
    runActionIcon.setAttribute("href", running ? "#i-run-restart" : "#i-play");
    runProjectButton.title = running ? t("actionRestartInfo") : t("actionRunInfo");
    runProjectButton.disabled = building;

    stopRunButton.classList.toggle("hidden", !running);
    stopRunButton.disabled = building;
    runConfigurationButton.disabled = building;
    renderRunConfigurationMenu();
}

async function startNativeBuild(pendingRun = false) {
    if (!currentProject || executionState.running) return;
    executionState.pendingRunAfterBuild = pendingRun;
    outputContent.dataset.richOutput = "1";
    outputContent.innerHTML = "";
    switchBottomPanel("output");
    executionState.running = true;
    executionState.phase = "build";
    updateExecutionButtons();

    const result = parseNativeResult(await buildProjectNative(
        currentProject.path,
        settings.buildMode || "void",
        settings.externalBuildCommand || ""
    ));

    if (result !== "success") {
        executionState.running = false;
        executionState.phase = "";
        executionState.pendingRunAfterBuild = false;
        updateExecutionButtons();
    }
}

async function launchSelectedConfiguration(checkBuild = true) {
    if (!currentProject || executionState.running) return;
    const config = getActiveRunConfiguration();
    if (!config) return;

    if (config.mode === "project") {
        if (checkBuild && settings.autoRebuildBeforeRun) {
            let needsBuild = true;
            try {
                needsBuild = !!parseNativeResult(await projectNeedsBuildNative(currentProject.path));
            } catch { }
            if (needsBuild) {
                appendOutputLine("info", t("buildBeforeRun"));
                await startNativeBuild(true);
                return;
            }
        }

        executionState.running = true;
        executionState.phase = "run";
        updateExecutionButtons();
        const result = parseNativeResult(await runProjectNative(currentProject.path, ""));
        if (result !== "success") {
            executionState.running = false;
            executionState.phase = "";
            updateExecutionButtons();
        }
        return;
    }

    let command = "";
    if (config.mode === "file") command = createCurrentFileCommand();
    else command = substituteRunCommand(config.command);
    if (!command.trim()) return;

    executionState.running = true;
    executionState.phase = "run";
    updateExecutionButtons();
    const result = parseNativeResult(await runProjectNative(currentProject.path, command));
    if (result !== "success") {
        executionState.running = false;
        executionState.phase = "";
        updateExecutionButtons();
    }
}

async function buildProject() {
    if (executionState.running && executionState.phase === "build") {
        executionState.pendingRunAfterBuild = false;
        await stopExecutionNative();
        return;
    }
    await startNativeBuild(false);
}

async function startRun() {
    if (executionState.running && executionState.phase.startsWith("run")) {
        const config = getActiveRunConfiguration();
        let command = "";
        if (config?.mode === "file") command = createCurrentFileCommand();
        else if (config?.mode === "custom") command = substituteRunCommand(config.command);
        await restartRunNative(currentProject.path, command);
        return;
    }
    await launchSelectedConfiguration(true);
}

async function stopRun() {
    if (!executionState.running || !executionState.phase.startsWith("run")) return;
    await stopExecutionNative();
}

function loadRunConfigurationForm() {
    const config = getActiveRunConfiguration();
    if (!config) return;
    runConfigNameInput.value = config.name || "";
    runConfigModeSelect.value = config.mode || "project";
    runConfigCommandInput.value = config.command || "";
    runConfigError.textContent = "";
    const protectedConfig = config.id === "project" || config.id === "file";
    deleteRunConfigButton.disabled = protectedConfig;
}

function renderRunConfigEditorList() {
    if (!runConfigList) return;
    ensureRunConfigurations();
    runConfigList.innerHTML = "";
    for (const config of runConfigurations) {
        const row = document.createElement("button");
        row.className = `run-config-list-row ${config.id === activeRunConfigurationId ? "active" : ""}`;
        row.innerHTML = `${iconUse(config.mode === "file" ? "i-file" : "i-monitor")}<span>${escapeHtml(config.name || config.id)}</span>`;
        row.addEventListener("click", async () => {
            activeRunConfigurationId = config.id;
            renderRunConfigEditorList();
            loadRunConfigurationForm();
            renderRunConfigurationMenu();
            await saveState();
        });
        runConfigList.appendChild(row);
    }
}

function openRunConfigurationModal() {
    ensureRunConfigurations();
    renderRunConfigEditorList();
    loadRunConfigurationForm();
    runConfigModal.classList.remove("hidden");
    setTimeout(() => runConfigNameInput.focus(), 0);
}

async function addRunConfiguration() {
    const id = `custom_${Date.now()}`;
    runConfigurations.push({
        id,
        name: settings.language === "ru" ? "Новая конфигурация" : "New Configuration",
        mode: "custom",
        command: ""
    });
    activeRunConfigurationId = id;
    renderRunConfigEditorList();
    loadRunConfigurationForm();
    renderRunConfigurationMenu();
    await saveState();
    runConfigNameInput.focus();
    runConfigNameInput.select();
}

async function deleteRunConfiguration() {
    const config = getActiveRunConfiguration();
    if (!config || config.id === "project" || config.id === "file") return;
    const index = runConfigurations.findIndex(item => item.id === config.id);
    runConfigurations = runConfigurations.filter(item => item.id !== config.id);
    ensureRunConfigurations();
    const nextIndex = Math.min(Math.max(0, index - 1), runConfigurations.length - 1);
    activeRunConfigurationId = runConfigurations[nextIndex]?.id || "project";
    renderRunConfigEditorList();
    loadRunConfigurationForm();
    renderRunConfigurationMenu();
    await saveState();
}

async function saveRunConfiguration() {
    const config = getActiveRunConfiguration();
    if (!config) return;
    const name = runConfigNameInput.value.trim();
    if (!name) {
        runConfigError.textContent = settings.language === "ru" ? "Укажите имя конфигурации." : "Enter a configuration name.";
        return;
    }
    config.name = name;
    config.mode = runConfigModeSelect.value;
    config.command = runConfigCommandInput.value;
    renderRunConfigEditorList();
    renderRunConfigurationMenu();
    await saveState();
    runConfigModal.classList.add("hidden");
}

function updateSettingsPage(page = null) {
    const activeButton = settingsNavButtons.find(button => button.classList.contains("active"));
    const activePage = page || activeButton?.dataset.settingsPage || "general";
    settingsNavButtons.forEach(button => button.classList.toggle("active", button.dataset.settingsPage === activePage));
    settingsGeneralPage.classList.toggle("hidden", activePage !== "general");
    settingsBuildPage.classList.toggle("hidden", activePage !== "build");
    settingsPageTitle.textContent = activePage === "build" ? t("buildSettings") : t("general");
    settingsPageDescription.textContent = activePage === "build" ? t("buildSettingsDescription") : t("settingsDescription");
}

function showSettingInfo(key) {
    const info = {
        language: { en:"Changes all editor interface text. Project files, code and terminal output are never translated.", ru:"Меняет весь текст интерфейса редактора. Файлы проекта, код и вывод терминала не переводятся." },
        fontSize: { en:"Changes code editor font size without changing project files.", ru:"Меняет размер шрифта редактора кода, не изменяя файлы проекта." },
        autoSave: { en:"Automatically saves text documents shortly after changes.", ru:"Автоматически сохраняет текстовые документы вскоре после изменений." },
        autoRefresh: { en:"Void checks a lightweight project stamp and refreshes Explorer only when files really changed on disk.", ru:"Void проверяет лёгкий отпечаток проекта и обновляет Проводник только когда файлы реально изменились на диске." },
        autoRebuild: { en:"Before running VoidApp, Void compares source/config timestamps with build/bin/VoidApp.exe and builds only when required.", ru:"Перед запуском VoidApp сравнивает время изменения исходников/конфигов с build/bin/VoidApp.exe и собирает только при необходимости." },
        builder: { en:"Void Build is the native build controller. It invokes CMake directly, owns the process tree, detects completion and supports real cancellation.", ru:"Void Build — собственный контроллер сборки. Он напрямую запускает CMake, контролирует дерево процессов, точно знает завершение и умеет реально отменять сборку." },
        externalBuild: { en:"Runs your custom command instead of Void Build. Cancellation still kills the whole process tree.", ru:"Запускает вашу команду вместо Void Build. Отмена всё равно завершает всё дерево процессов." },
        cmake: { en:"CMake used by Void Build. Void searches PATH, regular installations and CLion bundles.", ru:"CMake, который использует Void Build. Void ищет его в PATH, обычных установках и комплекте CLion." }
    };
    const message = info[key]?.[settings.language] || info[key]?.en || "";
    if (message) appAlert(message, t("info"));
}

function restartFileWatcher() {
    if (fileRefreshTimer) {
        clearInterval(fileRefreshTimer);
        fileRefreshTimer = null;
    }
    if (!settings.autoRefreshFiles) return;
    fileRefreshTimer = setInterval(checkProjectFilesChanged, 1800);
}

async function syncOpenDocumentsFromDisk() {
    const remaining = [];
    let activeChanged = false;

    for (const doc of openDocuments) {
        try {
            const fresh = parseNativeResult(await readTextFileNative(doc.path));
            if (fresh?.error) continue;

            if (doc.kind === "text" && !doc.modified && typeof fresh.content === "string" && fresh.content !== doc.content) {
                doc.content = fresh.content;
                doc.size = fresh.size;
                if (normalizePath(doc.path) === normalizePath(activeDocumentPath)) activeChanged = true;
            } else if (doc.kind === "image") {
                doc.size = fresh.size;
                if (normalizePath(doc.path) === normalizePath(activeDocumentPath)) activeChanged = true;
            }
            remaining.push(doc);
        } catch {
            remaining.push(doc);
        }
    }

    openDocuments = remaining;
    if (activeDocumentPath && !openDocuments.some(doc => normalizePath(doc.path) === normalizePath(activeDocumentPath))) {
        activeDocumentPath = null;
        renderDocumentTabs();
        showDefaultProjectView();
        return;
    }
    if (activeChanged && activeDocumentPath) activateDocument(activeDocumentPath);
    else renderDocumentTabs();
}

async function checkProjectFilesChanged() {
    if (!currentProject || document.hidden || draggedPath) return;
    try {
        const stamp = parseNativeResult(await projectStampNative(currentProject.path));
        if (!lastProjectStamp) {
            lastProjectStamp = stamp;
            return;
        }
        if (stamp !== lastProjectStamp) {
            lastProjectStamp = stamp;
            await syncOpenDocumentsFromDisk();
            await refreshExplorerPreservingState();
        }
    } catch { }
}

function validateProjectName() {
    const name = projectNameInput.value.trim();
    if (/[\\/:*?"<>|]/.test(name)) { newProjectError.textContent = 'Project name cannot contain \\ / : * ? " < > |'; createProjectButton.disabled = true; return false; }
    if (name.endsWith(".") || name.endsWith(" ")) { newProjectError.textContent = "Project name cannot end with a dot or space."; createProjectButton.disabled = true; return false; }
    newProjectError.textContent = ""; createProjectButton.disabled = false; return true;
}

async function refreshSuggestedProjectName() {
    try { suggestedProjectName = parseNativeResult(await suggestProjectNameNative(projectLocationInput.value.trim())) || "void_project_1"; } catch { suggestedProjectName = "void_project_1"; }
    updateProjectPathPreview();
}

function updateProjectPathPreview() {
    validateProjectName();
    const location = projectLocationInput.value.trim();
    const name = projectNameInput.value.trim() || suggestedProjectName;
    projectPathPreview.textContent = location ? `${location}${/[\\/]$/.test(location) ? "" : "\\"}${name}` : name;
}

async function openNewProjectModal() {
    closeMenus(); selectedProjectType = "text"; selectedTemplate = "basic"; projectNameInput.value = ""; newProjectError.textContent = "";
    templateButtons.forEach(b => b.classList.toggle("active", b.dataset.template === "basic"));
    projectTypeCards.forEach(b => b.classList.toggle("active", b.dataset.type === "text"));
    await refreshSuggestedProjectName(); newProjectModal.classList.remove("hidden"); projectNameInput.focus();
}

function addProject(project) {
    projects = projects.filter(p => normalizePath(p.path) !== normalizePath(project.path)); projects.unshift(project);
    recentProjects = recentProjects.filter(p => normalizePath(p.path) !== normalizePath(project.path)); recentProjects.unshift(project);
    projects = projects.slice(0, 100); recentProjects = recentProjects.slice(0, 30);
    renderProjects(); updateSectionHeaders(); saveState();
}

function renderProjects() {
    const source = currentSection === "recent" ? recentProjects : projects;
    projectList.innerHTML = "";
    if (!source.length) {
        projectList.classList.add("hidden"); emptyState.classList.remove("hidden");
        if (currentSection === "recent") { emptyTitle.textContent = t("noRecentProjects"); emptyDescription.textContent = t("noRecentProjectsDescription"); emptyNewProjectButton.classList.add("hidden"); }
        else { emptyTitle.textContent = t("noProjectsYet"); emptyDescription.textContent = t("noProjectsDescription"); emptyNewProjectButton.classList.remove("hidden"); }
        return;
    }
    emptyState.classList.add("hidden"); projectList.classList.remove("hidden");
    for (const project of source) {
        const card = document.createElement("div"); card.className = "project-card";
        card.innerHTML = `<div class="card-top"><img src="assets/void-engine.svg" alt=""><div><strong>${escapeHtml(project.name || "Project")}</strong><span class="card-kind">${project.type === "3d" ? "3D PROJECT" : "TEXT PROJECT"}</span></div></div><span class="card-path">${escapeHtml(project.path)}</span>`;
        card.addEventListener("click", async () => {
            try {
                const refreshed = parseNativeResult(await refreshProjectNative(project.path));
                if (refreshed.error) throw new Error(refreshed.error);
                await openProjectEditor(refreshed);
            } catch (error) { await appAlert(`Cannot open project:\n${error.message || error}`, "Open Project"); }
        });
        projectList.appendChild(card);
    }
}

async function createProject() {
    if (!validateProjectName()) return;
    newProjectError.textContent = "";
    try {
        const project = parseNativeResult(await createProjectNative(projectNameInput.value.trim(), projectLocationInput.value.trim(), "text", selectedTemplate));
        if (project.error) { newProjectError.textContent = project.error; return; }
        newProjectModal.classList.add("hidden"); await openProjectEditor(project);
    } catch (error) { newProjectError.textContent = `Failed to create project: ${error}`; }
}

async function openProjectFromDisk() {
    closeMenus();
    const project = parseNativeResult(await openProjectNative());
    if (project.cancelled) return;
    if (project.error) { await appAlert(project.error, "Open Project"); return; }
    await openProjectEditor(project);
}

function explorerKey(path) { return normalizePath(path); }
function clearExplorerSelection() { $$(".tree-row.selected").forEach(row => row.classList.remove("selected")); }
function selectExplorerRow(row, path) { clearExplorerSelection(); if (row) row.classList.add("selected"); selectedExplorerPath = path; }

async function loadDirectory(container, directoryPath) {
    const result = parseNativeResult(await listDirectoryNative(currentProject.path, directoryPath));
    container.innerHTML = "";
    if (result.error) return;
    for (const entry of result.entries) {
        const wrapper = document.createElement("div");
        const row = document.createElement("div"); row.className = `tree-row ${entry.systemLevel || "normal"}`; row.dataset.path = entry.path; row.dataset.kind = entry.kind; row.draggable = true;
        const arrow = document.createElement("span"); arrow.className = "tree-arrow"; arrow.innerHTML = entry.kind === "folder" ? iconUse("i-chevron") : "";
        const info = fileIconInfo(entry); const icon = document.createElement("span"); icon.className = `tree-file-icon ${info.cls}`; icon.innerHTML = iconUse(info.icon);
        const name = document.createElement("span"); name.className = "tree-name"; name.textContent = entry.name;
        row.append(arrow, icon, name); wrapper.appendChild(row);
        const node = { entry, row, wrapper, children:null, loaded:false, open:false, expand:null };
        explorerNodes.set(explorerKey(entry.path), node);

        if (entry.kind === "folder") {
            const children = document.createElement("div"); children.className = "tree-children hidden"; wrapper.appendChild(children); node.children = children;
            node.expand = async forceOpen => {
                const nextOpen = forceOpen === true ? true : !node.open;
                if (nextOpen && !node.loaded) { await loadDirectory(children, entry.path); node.loaded = true; }
                node.open = nextOpen; children.classList.toggle("hidden", !node.open); arrow.classList.toggle("open", node.open);
            };
            row.addEventListener("click", async event => { event.stopPropagation(); selectedFolderPath = entry.path; selectExplorerRow(row, entry.path); await node.expand(); });
            row.addEventListener("dragover", event => { event.preventDefault(); row.classList.add("drag-over"); });
            row.addEventListener("dragleave", () => row.classList.remove("drag-over"));
            row.addEventListener("drop", async event => {
                event.preventDefault();
                event.stopPropagation();
                row.classList.remove("drag-over");
                if (draggedPath) await moveDraggedItem(entry.path);
                else await importDroppedFiles(event, entry.path, false);
            });
        } else {
            row.addEventListener("click", async event => { event.stopPropagation(); selectedFolderPath = parentPath(entry.path); selectExplorerRow(row, entry.path); await openProjectDocument(entry); });
        }

        row.addEventListener("dragstart", event => {
            draggedPath = entry.path;
            event.dataTransfer.effectAllowed = "copyMove";
            event.dataTransfer.setData("text/plain", entry.path);
            if (entry.kind !== "folder") {
                const fileUrl = toFileUrl(entry.path);
                event.dataTransfer.setData("text/uri-list", fileUrl);
                event.dataTransfer.setData("DownloadURL", `application/octet-stream:${entry.name}:${fileUrl}`);
            }
        });
        row.addEventListener("dragend", () => { draggedPath = null; $$(".tree-row.drag-over").forEach(r => r.classList.remove("drag-over")); });
        row.addEventListener("contextmenu", event => { event.preventDefault(); event.stopPropagation(); explorerContextTarget = entry; selectedFolderPath = entry.kind === "folder" ? entry.path : parentPath(entry.path); selectExplorerRow(row, entry.path); updateExplorerContextMenu(); showContextMenu(explorerContextMenu, event.clientX, event.clientY); });
        container.appendChild(wrapper);
    }
}

function snapshotExpandedExplorerPaths() {
    return [...explorerNodes.values()]
        .filter(node => node.open && node.entry?.kind === "folder")
        .map(node => node.entry.path)
        .sort((a, b) => a.split(/[\/]/).length - b.split(/[\/]/).length);
}

async function restoreExpandedExplorerPaths(paths) {
    for (const path of paths) {
        const relative = path.substring(currentProject.path.length).replace(/^[\/]+/, "");
        if (!relative) continue;
        const parts = relative.split(/[\/]/);
        let current = currentProject.path.replace(/[\/]$/, "");
        for (const part of parts) {
            current += `\${part}`;
            const node = explorerNodes.get(explorerKey(current));
            if (node?.expand) await node.expand(true);
        }
    }
}

async function refreshExplorerPreservingState() {
    if (!currentProject) return;
    const expanded = snapshotExpandedExplorerPaths();
    const selected = selectedExplorerPath;
    const selectedFolder = selectedFolderPath;
    explorerNodes.clear();
    await loadDirectory(fileTree, currentProject.path);
    await restoreExpandedExplorerPaths(expanded);
    selectedFolderPath = selectedFolder || currentProject.path;
    selectedExplorerPath = selected;
    if (selected) {
        const node = explorerNodes.get(explorerKey(selected));
        if (node) selectExplorerRow(node.row, selected);
    }
    try { lastProjectStamp = parseNativeResult(await projectStampNative(currentProject.path)); } catch { }
}

async function refreshExplorer() {
    if (!currentProject) return;
    const selected = selectedExplorerPath;
    explorerNodes.clear();
    await loadDirectory(fileTree, currentProject.path);
    if (selected) await revealPathInExplorer(selected, false);
    try { lastProjectStamp = parseNativeResult(await projectStampNative(currentProject.path)); } catch { }
}

async function importDroppedFiles(event, destinationFolder, openAfterImport = false) {
    const candidates = [];
    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    for (const file of droppedFiles) {
        if (file.path) candidates.push(file.path);
    }

    if (!candidates.length) {
        const uriList = event.dataTransfer?.getData("text/uri-list") || "";
        for (const line of uriList.split(/\r?\n/)) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#") || !trimmed.toLowerCase().startsWith("file:")) continue;
            try {
                let nativePath = decodeURIComponent(trimmed.replace(/^file:\/\/\//i, ""));
                nativePath = nativePath.replaceAll("/", "\\");
                candidates.push(nativePath);
            } catch { }
        }
    }

    let importedAny = false;
    for (const nativePath of [...new Set(candidates)]) {
        const result = parseNativeResult(await importExternalPathNative(currentProject.path, nativePath, destinationFolder));
        if (result.error) {
            await appAlert(result.error, "Void Engine");
            continue;
        }
        importedAny = true;
        if (openAfterImport && result.path) await openDraggedPathInEditor(result.path);
    }
    if (importedAny) await refreshExplorerPreservingState();
    return importedAny;
}

async function openDraggedPathInEditor(path) {
    if (!path || !currentProject) return;
    try {
        const file = parseNativeResult(await readTextFileNative(path));
        if (file.error || file.kind === "folder") return;
        await openProjectDocument(file);
        await revealPathInExplorer(path, false);
    } catch { }
}

async function handleEditorDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    if (draggedPath) {
        const node = explorerNodes.get(explorerKey(draggedPath));
        if (node?.entry?.kind !== "folder") await openDraggedPathInEditor(draggedPath);
        return;
    }

    await importDroppedFiles(event, selectedFolderPath || currentProject.path, true);
}

async function moveDraggedItem(destinationFolder) {
    if (!draggedPath || !currentProject || normalizePath(draggedPath) === normalizePath(destinationFolder)) return;
    const oldPath = draggedPath;
    const result = parseNativeResult(await movePathNative(currentProject.path, draggedPath, destinationFolder));
    if (result.error) { await appAlert(result.error, "Void Engine"); return; }
    if (result.path) remapOpenDocuments(oldPath, result.path);
    await refreshExplorer(); if (result.path) await revealPathInExplorer(result.path);
}

function remapOpenDocuments(oldBase, newBase) {
    const oldNorm = normalizePath(oldBase);
    for (const doc of openDocuments) {
        const docNorm = normalizePath(doc.path);
        if (docNorm === oldNorm || docNorm.startsWith(`${oldNorm}\\`)) {
            const suffix = doc.path.substring(oldBase.length);
            if (activeDocumentPath === doc.path) activeDocumentPath = `${newBase}${suffix}`;
            doc.path = `${newBase}${suffix}`;
            if (docNorm === oldNorm) doc.name = doc.path.split(/[\\/]/).pop();
        }
    }
    renderDocumentTabs();
}

async function revealPathInExplorer(path, refreshFirst = true) {
    if (!currentProject) return;
    if (refreshFirst) await refreshExplorerPreservingState();
    const root = currentProject.path.replace(/[\\/]$/, "");
    let relative = path.substring(root.length).replace(/^[\\/]+/, "");
    if (!relative) return;
    const parts = relative.split(/[\\/]/);
    let current = root;
    for (let i = 0; i < parts.length - 1; i++) {
        current += `\\${parts[i]}`;
        const node = explorerNodes.get(explorerKey(current));
        if (node?.expand) await node.expand(true);
    }
    const target = explorerNodes.get(explorerKey(path));
    if (target) { selectExplorerRow(target.row, path); target.row.scrollIntoView({ block:"center", behavior:"smooth" }); }
}

function updateExplorerContextMenu() {
    const root = !explorerContextTarget;
    contextRename.disabled = root;
    contextDelete.disabled = root;
    contextCut.disabled = root;
    contextCopy.disabled = root;
    contextRun.disabled = root || !isDirectlyRunnableFile(explorerContextTarget);
    contextPaste.disabled = false;
    contextCopyPath.disabled = false;
    contextOpenIn.disabled = false;
}

async function runExplorerTarget() {
    if (!explorerContextTarget || !isDirectlyRunnableFile(explorerContextTarget)) return;
    const extension = explorerContextTarget.extension || explorerContextTarget.name.match(/\.[^.]+$/)?.[0] || "";
    const command = commandForPath(explorerContextTarget.path, extension);
    if (!command) return;
    if (executionState.running) return;
    outputContent.dataset.richOutput = "1";
    outputContent.innerHTML = "";
    switchBottomPanel("output");
    executionState.running = true;
    executionState.phase = "run";
    updateExecutionButtons();
    const result = parseNativeResult(await runProjectNative(currentProject.path, command));
    if (result !== "success") {
        executionState.running = false;
        executionState.phase = "";
        updateExecutionButtons();
    }
}

function setExplorerClipboard(mode) {
    if (!explorerContextTarget) return;
    explorerClipboard = { mode, path: explorerContextTarget.path };
    updateExplorerContextMenu();
}

async function pasteExplorerClipboard() {
    if (!currentProject) return;
    const destination = selectedFolderPath || currentProject.path;

    if (!explorerClipboard) {
        let externalFiles = [];
        try { externalFiles = parseNativeResult(await getClipboardFilesNative()) || []; } catch { }
        if (!Array.isArray(externalFiles) || !externalFiles.length) {
            await appAlert(t("nothingToPaste"), t("info"));
            return;
        }
        let lastPath = null;
        for (const sourcePath of externalFiles) {
            const imported = parseNativeResult(await importExternalPathNative(currentProject.path, sourcePath, destination));
            if (imported.error) {
                await appAlert(imported.error, "Void Engine");
                continue;
            }
            if (imported.path) {
                lastPath = imported.path;
                explorerUndoStack.push({ type:"delete-copy", path:imported.path });
            }
        }
        await refreshExplorerPreservingState();
        if (lastPath) await revealPathInExplorer(lastPath, false);
        return;
    }

    const source = explorerClipboard.path;
    let result;
    if (explorerClipboard.mode === "cut") {
        result = parseNativeResult(await movePathNative(currentProject.path, source, destination));
        if (!result.error) {
            explorerUndoStack.push({ type:"move", from:result.path, to:source });
            explorerClipboard = null;
        }
    } else {
        result = parseNativeResult(await copyPathNative(currentProject.path, source, destination));
        if (!result.error && result.path) explorerUndoStack.push({ type:"delete-copy", path:result.path });
    }
    if (result?.error) {
        await appAlert(result.error, "Void Engine");
        return;
    }
    await refreshExplorerPreservingState();
    if (result?.path) await revealPathInExplorer(result.path, false);
}

async function undoExplorerOperation() {
    const operation = explorerUndoStack.pop();
    if (!operation || !currentProject) return false;
    let result = null;
    if (operation.type === "move") {
        result = parseNativeResult(await movePathNative(currentProject.path, operation.from, parentPath(operation.to)));
        if (!result.error && result.path !== operation.to) {
            const wantedName = operation.to.split(/[\\/]/).pop();
            result = parseNativeResult(await renamePathNative(currentProject.path, result.path, wantedName));
        }
    } else if (operation.type === "rename") {
        result = parseNativeResult(await renamePathNative(currentProject.path, operation.from, operation.oldName));
    } else if (operation.type === "restore-trash") {
        result = parseNativeResult(await restoreTrashedPathNative(currentProject.path, operation.trash, operation.original));
    } else if (operation.type === "delete-copy") {
        result = parseNativeResult(await deletePathNative(currentProject.path, operation.path));
    }
    if (result?.error) {
        await appAlert(result.error, "Void Engine");
        return true;
    }
    await refreshExplorerPreservingState();
    return true;
}

function openExplorerRootContext(event) {
    event.preventDefault();
    explorerContextTarget = null; selectedFolderPath = currentProject?.path ?? null; clearExplorerSelection(); updateExplorerContextMenu(); showContextMenu(explorerContextMenu, event.clientX, event.clientY);
}

function renderDocumentTabs() {
    documentTabs.innerHTML = "";
    for (const doc of openDocuments) {
        const tab = document.createElement("div"); tab.className = `document-tab ${doc.path === activeDocumentPath ? "active" : ""}`; tab.draggable = true;
        const info = fileIconInfo(doc); const icon = document.createElement("span"); icon.className = `tree-file-icon ${info.cls}`; icon.innerHTML = iconUse(info.icon);
        const label = document.createElement("span"); label.className = "tab-label"; label.textContent = `${doc.modified ? "● " : ""}${doc.name}`;
        const close = document.createElement("button"); close.className = "tab-close"; close.textContent = "×";
        tab.append(icon, label, close); tab.addEventListener("click", () => activateDocument(doc.path));
        tab.addEventListener("dragstart", event => {
            draggedPath = doc.path;
            event.dataTransfer.effectAllowed = "copyMove";
            event.dataTransfer.setData("text/plain", doc.path);
            const fileUrl = toFileUrl(doc.path);
            event.dataTransfer.setData("text/uri-list", fileUrl);
            event.dataTransfer.setData("DownloadURL", `application/octet-stream:${doc.name}:${fileUrl}`);
        });
        tab.addEventListener("dragend", () => { draggedPath = null; });
        close.addEventListener("click", async event => { event.stopPropagation(); await closeDocument(doc.path); });
        documentTabs.appendChild(tab);
    }
}

function showDefaultProjectView() {
    projectWelcomeView.classList.remove("hidden"); projectTextView.classList.add("hidden"); projectImageView.classList.add("hidden"); projectBinaryView.classList.add("hidden");
}

async function openProjectDocument(entry, line = null) {
    let doc = openDocuments.find(d => normalizePath(d.path) === normalizePath(entry.path));
    if (!doc) {
        doc = { ...entry, modified:false, content:null };
        if (entry.kind === "text") {
            const file = parseNativeResult(await readTextFileNative(entry.path)); if (file.error) { await appAlert(file.error, "Open File"); return; }
            doc = { ...doc, ...file, systemLevel:entry.systemLevel || "normal", modified:false };
        }
        openDocuments.push(doc);
    }
    activateDocument(doc.path);
    if (line && doc.kind === "text") requestAnimationFrame(() => selectEditorLine(projectTextEditor, line));
}

function activateDocument(path) {
    activeDocumentPath = path;
    const doc = openDocuments.find(d => normalizePath(d.path) === normalizePath(path));
    if (!doc) { showDefaultProjectView(); return; }
    projectWelcomeView.classList.add("hidden"); projectTextView.classList.add("hidden"); projectImageView.classList.add("hidden"); projectBinaryView.classList.add("hidden");
    if (doc.kind === "text") {
        const lang = getLanguageInfo(doc.name, doc.extension); projectTextView.classList.remove("hidden"); projectTextEditor.value = doc.content ?? ""; projectLanguageStatus.textContent = lang.name; projectSaveStatus.textContent = doc.modified ? "Modified" : "Saved";
        updateEditorVisual(projectTextEditor, projectSyntaxLayer, projectLineNumbers, projectCursorStatus, doc.extension); activeEditor = projectTextEditor;
    } else if (doc.kind === "image") {
        projectImageView.classList.remove("hidden"); projectImageName.textContent = doc.name; projectImageFormat.textContent = (doc.extension || "").replace(".", "").toUpperCase(); projectImageSize.textContent = formatBytes(doc.size || 0); projectImagePath.textContent = doc.path;
        projectImagePreview.onload = () => projectImageResolution.textContent = `${projectImagePreview.naturalWidth} × ${projectImagePreview.naturalHeight}`; projectImagePreview.src = `${toFileUrl(doc.path)}?voidRefresh=${Date.now()}`;
    } else {
        projectBinaryView.classList.remove("hidden"); binaryFileName.textContent = doc.name; binaryFileInfo.textContent = `${doc.path} • ${formatBytes(doc.size || 0)}`;
    }
    renderDocumentTabs();
}

function scheduleProjectSave() {
    const doc = openDocuments.find(d => normalizePath(d.path) === normalizePath(activeDocumentPath)); if (!doc || doc.kind !== "text") return;
    doc.content = projectTextEditor.value; doc.modified = true; projectSaveStatus.textContent = "Modified"; renderDocumentTabs(); clearTimeout(projectSaveTimer);
    if (settings.autoSave) projectSaveTimer = setTimeout(() => saveActiveDocument(), 350);
}

async function saveActiveDocument(force = false) {
    const doc = openDocuments.find(d => normalizePath(d.path) === normalizePath(activeDocumentPath)); if (!doc || doc.kind !== "text") return;
    if (!doc.modified && !force) return; projectSaveStatus.textContent = "Saving...";
    const result = parseNativeResult(await saveTextFileNative(doc.path, doc.content ?? projectTextEditor.value));
    if (result === "success") { doc.modified = false; projectSaveStatus.textContent = "Saved"; renderDocumentTabs(); } else projectSaveStatus.textContent = "Save failed";
}

async function saveAllDocuments() {
    for (const doc of openDocuments) if (doc.kind === "text" && doc.modified) { await saveTextFileNative(doc.path, doc.content ?? ""); doc.modified = false; }
}

async function closeDocument(path) {
    const index = openDocuments.findIndex(d => normalizePath(d.path) === normalizePath(path)); if (index < 0) return;
    const doc = openDocuments[index]; if (doc.kind === "text" && doc.modified) await saveTextFileNative(doc.path, doc.content ?? "");
    openDocuments.splice(index, 1);
    if (normalizePath(activeDocumentPath) === normalizePath(path)) activeDocumentPath = openDocuments[Math.max(0, index - 1)]?.path ?? null;
    if (activeDocumentPath) activateDocument(activeDocumentPath); else { renderDocumentTabs(); showDefaultProjectView(); }
}

function selectEditorLine(editor, lineNumber) {
    const lines = editor.value.split("\n"); const line = Math.max(1, Math.min(lineNumber, lines.length));
    let start = 0; for (let i = 0; i < line - 1; i++) start += lines[i].length + 1;
    const end = start + lines[line - 1].length; editor.focus(); editor.setSelectionRange(start, end);
    const lineHeight = parseFloat(getComputedStyle(editor).lineHeight) || 23; editor.scrollTop = Math.max(0, (line - 4) * lineHeight); editor.dispatchEvent(new Event("scroll"));
}

async function openProjectEditor(project) {
    await saveAllDocuments();
    currentProject = project;
    selectedFolderPath = project.path;
    selectedExplorerPath = null;
    openDocuments = [];
    activeDocumentPath = null;
    explorerClipboard = null;
    explorerUndoStack = [];
    executionState = { running:false, phase:"", pendingRunAfterBuild:false };
    addProject(project);
    editorProjectName.textContent = project.name;
    editorProjectPath.textContent = project.path;
    projectWelcomeTitle.textContent = project.name;
    showOnly(projectEditorView);
    renderDocumentTabs();
    showDefaultProjectView();
    await refreshExplorer();
    await refreshCMakeDetection();
    await resetTerminals(false);
    renderRunConfigurationMenu();
    updateExecutionButtons();
    restartFileWatcher();
}

async function closeProjectEditor() {
    await saveAllDocuments();
    if (executionState.running) await stopExecutionNative();
    for (const id of [...terminals.keys()]) await closeTerminalNative(id);
    terminals.clear();
    activeTerminalId = null;
    currentProject = null;
    openDocuments = [];
    activeDocumentPath = null;
    lastProjectStamp = "";
    showOnly(projectManagerView);
    renderProjects();
    await saveState();
}

function openNewFileModal(destination = selectedFolderPath, preset = "file") {
    if (!currentProject) return;
    selectedFolderPath = destination || currentProject.path;
    selectedFilePreset = preset || "file";
    filePresetButtons.forEach(b => b.classList.toggle("active", b.dataset.preset === selectedFilePreset));
    const placeholders = { cpp:"Example.cpp", hpp:"Example.hpp", js:"app.js", html:"index.html", css:"style.css", json:"data.json", lua:"script.lua", shader:"shader.glsl", file:"FileName" };
    newFileName.value = "";
    newFileName.placeholder = placeholders[selectedFilePreset] || "FileName";
    newFileError.textContent = "";
    newFileDestination.textContent = selectedFolderPath;
    newFileModal.classList.add("compact-new");
    newFileModal.classList.remove("hidden");
    setTimeout(() => newFileName.focus(), 0);
}

async function createFile() {
    const name = newFileName.value.trim(); if (!name) { newFileError.textContent = "Enter a file name."; return; }
    const result = parseNativeResult(await createFileNative(currentProject.path, selectedFolderPath, name, selectedFilePreset));
    if (result.error) { newFileError.textContent = result.error; return; }
    newFileModal.classList.add("hidden"); await refreshExplorer(); await revealPathInExplorer(result.path); await openProjectDocument(result);
}

function openNewFolderModal(destination = selectedFolderPath) {
    if (!currentProject) return; selectedFolderPath = destination || currentProject.path; newFolderName.value = ""; newFolderError.textContent = ""; newFolderDestination.textContent = selectedFolderPath; newFolderModal.classList.remove("hidden"); setTimeout(() => newFolderName.focus(), 0);
}

async function createFolder() {
    const name = newFolderName.value.trim(); if (!name) { newFolderError.textContent = "Enter a folder name."; return; }
    const result = parseNativeResult(await createFolderNative(currentProject.path, selectedFolderPath, name));
    if (result.error) { newFolderError.textContent = result.error; return; }
    newFolderModal.classList.add("hidden"); await refreshExplorer(); await revealPathInExplorer(result.path);
}

async function showLightFile(file) {
    if (!file || file.cancelled || file.error) return;
    lightFile = file; lightModified = false; lightFileName.textContent = file.name; lightTabFileName.textContent = file.name; lightFilePath.textContent = file.path; lightSaveStatus.textContent = "Saved"; lightModifiedDot.classList.add("hidden");
    if (file.kind === "image") {
        lightTextArea.classList.add("hidden"); lightImageArea.classList.remove("hidden"); lightFileIcon.textContent = "IMG"; lightLanguageBadge.textContent = "IMAGE"; lightImageTitle.textContent = file.name; lightImageFormat.textContent = file.extension.replace(".", "").toUpperCase(); lightImageSize.textContent = formatBytes(file.size); lightImagePath.textContent = file.path; lightImagePreview.onload = () => lightImageResolution.textContent = `${lightImagePreview.naturalWidth} × ${lightImagePreview.naturalHeight}`; lightImagePreview.src = toFileUrl(file.path);
    } else {
        lightImageArea.classList.add("hidden"); lightTextArea.classList.remove("hidden"); const lang = getLanguageInfo(file.name, file.extension); lightFileIcon.textContent = lang.badge; lightLanguageBadge.textContent = lang.badge; lightLanguageStatus.textContent = lang.name; lightTextEditor.value = file.content; updateEditorVisual(lightTextEditor, lightSyntaxLayer, lightLineNumbers, lightCursorStatus, file.extension); activeEditor = lightTextEditor;
    }
    showOnly(lightEditorView);
}

async function openLightFile() {
    closeMenus();
    await saveLightFile();
    const file = parseNativeResult(await openFileNative());
    await showLightFile(file);
}

async function openPathInVoidEditor(path) {
    if (!path) return;
    await saveLightFile();
    const file = parseNativeResult(await openSpecificFileNative(path));
    if (file.error) { await appAlert(file.error, "Void Engine"); return; }
    await showLightFile(file);
}

function scheduleLightSave() {
    if (!lightFile || lightFile.kind !== "text") return; lightModified = true; lightModifiedDot.classList.remove("hidden"); lightSaveStatus.textContent = "Modified"; clearTimeout(lightSaveTimer);
    if (settings.autoSave) lightSaveTimer = setTimeout(() => saveLightFile(), 350);
}

async function saveLightFile(force = false) {
    if (!lightFile || lightFile.kind !== "text") return; if (!lightModified && !force) return;
    lightSaveStatus.textContent = "Saving..."; const result = parseNativeResult(await saveTextFileNative(lightFile.path, lightTextEditor.value));
    if (result === "success") { lightModified = false; lightModifiedDot.classList.add("hidden"); lightSaveStatus.textContent = "Saved"; } else lightSaveStatus.textContent = "Save failed";
}

async function performSearch() {
    if (!currentProject) return; const query = searchInput.value.trim(); if (!query) { searchResults.innerHTML = ""; searchStatus.textContent = ""; return; }
    searchStatus.textContent = "Searching...";
    try {
        const data = parseNativeResult(await searchProjectNative(currentProject.path, query, searchMode)); const results = data.results || []; searchStatus.textContent = `${results.length} result${results.length === 1 ? "" : "s"}`; searchResults.innerHTML = "";
        for (const result of results) {
            const item = document.createElement("div"); item.className = "search-result"; item.innerHTML = `<strong>${escapeHtml(result.name)}</strong><span>${escapeHtml(result.path)}</span>${result.matchType === "text" ? `<em>Line ${result.line}: ${escapeHtml(result.preview)}</em>` : ""}`;
            item.addEventListener("click", async () => { await revealPathInExplorer(result.path); if (result.kind !== "folder") await openProjectDocument(result, result.line || null); }); searchResults.appendChild(item);
        }
    } catch (error) { searchStatus.textContent = `Search failed: ${error}`; }
}

function toggleSearch(show = null) {
    const next = show ?? searchPanel.classList.contains("hidden"); searchPanel.classList.toggle("hidden", !next); if (next) { searchInput.focus(); performSearch(); }
}

async function createTerminal(displayName = null) {
    if (!currentProject) return null;
    const id = Number(parseNativeResult(await createTerminalNative(currentProject.path))); if (id < 0) { await appAlert("Failed to start Windows PowerShell.", "Terminal"); return null; }
    const terminal = { id, name:displayName || `PowerShell ${terminalCounter++}`, cwd:currentProject.path, lines:[], capture:false };
    terminals.set(id, terminal); activeTerminalId = id; renderTerminalTabs(); renderTerminal(); return terminal;
}

async function resetTerminals(createInitial = false) {
    for (const id of [...terminals.keys()]) await closeTerminalNative(id);
    terminals.clear();
    activeTerminalId = null;
    terminalCounter = 1;
    renderTerminalTabs();
    renderTerminal();
    if (createInitial) await createTerminal();
}

function renderTerminalTabs() {
    terminalTabs.innerHTML = "";
    for (const terminal of terminals.values()) {
        const tab = document.createElement("button"); tab.className = `terminal-tab ${terminal.id === activeTerminalId ? "active" : ""}`;
        const label = document.createElement("span"); label.textContent = terminal.name; const close = document.createElement("span"); close.className = "terminal-tab-close"; close.textContent = "×"; tab.append(label, close);
        tab.addEventListener("click", () => { activeTerminalId = terminal.id; renderTerminalTabs(); renderTerminal(); });
        close.addEventListener("click", async event => { event.stopPropagation(); await closeTerminalNative(terminal.id); terminals.delete(terminal.id); if (activeTerminalId === terminal.id) activeTerminalId = terminals.keys().next().value ?? null; renderTerminalTabs(); renderTerminal(); });
        terminalTabs.appendChild(tab);
    }
}

function terminalLineClass(line) {
    const lower = line.toLowerCase(); if (lower.includes("error") || lower.includes("exception") || lower.includes("failed")) return "terminal-line-error"; if (lower.includes("warning")) return "terminal-line-warning"; return "";
}

function renderTerminal() {
    const terminal = terminals.get(activeTerminalId); const exists = !!terminal;
    terminalEmptyState.classList.toggle("hidden", exists); terminalOutput.classList.toggle("hidden", !exists); terminalInputRow.classList.toggle("hidden", !exists); restartTerminalButton.disabled = !exists;
    if (!terminal) { terminalOutput.innerHTML = ""; terminalPrompt.textContent = "PS>"; return; }
    terminalOutput.innerHTML = "";
    for (const line of terminal.lines) { const div = document.createElement("div"); div.className = line.command ? "terminal-line-command" : terminalLineClass(line.text); div.textContent = line.text; terminalOutput.appendChild(div); }
    terminalPrompt.textContent = `PS ${terminal.cwd}>`; terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

window.onVoidTerminalLine = async (id, rawLine) => {
    const terminal = terminals.get(id); if (!terminal) return;
    const line = String(rawLine ?? "");
    if (line.trim() === "__VOID_REFRESH__") { terminal.capture = false; await refreshExplorer(); if (activeTerminalId === id) renderTerminal(); return; }
    if (line.includes("__VOID_CWD__")) return;
    if (line.includes("__VOID_DONE__")) return;
    const promptMatch = line.match(/^PS\s+(.+?)>\s*(.*)$/);
    if (promptMatch) terminal.cwd = promptMatch[1];
    terminal.lines.push({ text:line, command:!!promptMatch && !!promptMatch[2] });
    if (terminal.capture) { outputContent.textContent += `${line}\n`; outputContent.scrollTop = outputContent.scrollHeight; }
    if (activeTerminalId === id) renderTerminal();
};

async function restartActiveTerminal() {
    const old = terminals.get(activeTerminalId); if (!old) { await createTerminal(); return; }
    const name = old.name; const oldId = old.id; await closeTerminalNative(oldId); terminals.delete(oldId); activeTerminalId = null; renderTerminalTabs(); renderTerminal(); await createTerminal(name);
}

async function runTerminalCommand(command, capture = false) {
    let terminal = terminals.get(activeTerminalId); if (!terminal) terminal = await createTerminal(); if (!terminal) return;
    const trimmed = command.trim(); if (!trimmed) return;
    const lower = trimmed.toLowerCase();
    if (lower === "clear" || lower === "cls") { terminal.lines = []; renderTerminal(); return; }
    if (lower === "void restart" || lower === "vrestart") { await restartActiveTerminal(); return; }
    if (lower === "void close" || lower === "vclose") { await closeTerminalNative(terminal.id); terminals.delete(terminal.id); activeTerminalId = terminals.keys().next().value ?? null; renderTerminalTabs(); renderTerminal(); return; }
    const aliases = { vbuild:"void build", vrun:"void run", vrebuild:"void rebuild", vclean:"void clean", vdoctor:"void doctor", vhelp:"void help", vroot:"void root" };
    const actual = aliases[lower] || trimmed;
    if (capture) { terminal.capture = true; outputContent.textContent = `${actual}\n\n`; switchBottomPanel("output"); }
    terminalHistory.push(trimmed); terminalHistoryIndex = terminalHistory.length;
    await sendTerminalCommandNative(terminal.id, actual);
}

function switchBottomPanel(type) {
    const output = type === "output"; outputPanel.classList.toggle("hidden", !output); terminalPanel.classList.toggle("hidden", output); outputPanelButton.classList.toggle("active", output); terminalPanelButton.classList.toggle("active", !output); bottomPanel.classList.remove("collapsed"); toggleBottomPanelButton.textContent = "−";
}


function helpLink(label, subtitle, url) { return `<button class="help-link" data-url="${url}"><span><strong>${label}</strong><br><small>${subtitle}</small></span><span>↗</span></button>`; }
function helpCard(command, text) { return `<div class="help-card"><code>${command}</code><p>${text}</p></div>`; }

function showHelp(page) {
    helpModal.classList.remove("hidden"); helpNavButtons.forEach(b => b.classList.toggle("active", b.dataset.helpPage === page));
    const ru = settings.language === "ru";
    if (page === "about") helpBody.innerHTML = ru ? `<h2>Void Engine</h2><p>Void Engine — это лёгкая Windows-среда для редактора и движка. Оболочка написана на C++23, интерфейс редактора — HTML/CSS/JavaScript внутри WebView2, а C++ сейчас является основным языком проекта.</p>${helpCard("Text Project","Поддерживаемый сейчас тип проекта. Включает проводник, вкладки, поиск, просмотр изображений, PowerShell, инструменты сборки и C++ файлы.")}${helpCard("Light Editor","Открывает один файл без создания проекта.")}${helpCard("3D Project","Временно отключён, пока создаются рендерер и рантайм сцены.")}` : `<h2>Void Engine</h2><p>Void Engine is a lightweight native Windows editor/engine workspace. The runtime shell is C++23, the editor interface is HTML/CSS/JavaScript inside WebView2, and C++ is the primary project language for now.</p>${helpCard("Text Project","The currently supported project type. It includes Explorer, tabs, search, image preview, PowerShell, build tools and C++ files.")}${helpCard("Light Editor","Open a single text/source/image file without creating a project.")}${helpCard("3D Project","Temporarily disabled while the renderer and scene runtime are being built.")}`;
    else if (page === "commands") helpBody.innerHTML = ru ? `<h2>Команды</h2><p>Терминал — это настоящий Windows PowerShell. Обычные команды PowerShell тоже работают.</p>${helpCard("void build / vbuild","Настроить и собрать текущий проект. Результат сохраняется в build/bin/VoidApp.exe.")}${helpCard("void run / vrun","Запустить исполняемый файл. Если его нет, Void сначала соберёт проект.")}${helpCard("void rebuild / vrebuild","Удалить сгенерированные данные и собрать заново.")}${helpCard("void clean / vclean","Удалить сгенерированную папку build.")}${helpCard("void doctor / vdoctor","Проверить CMake, CMakeLists.txt и src/main.cpp.")}${helpCard("void root / vroot","Вернуться в корень проекта в PowerShell.")}${helpCard("clear / cls","Очистить вывод терминала Void.")}${helpCard("void restart / vrestart","Перезапустить текущую PowerShell-сессию.")}${helpCard("void close / vclose","Закрыть текущую вкладку терминала.")}` : `<h2>Commands</h2><p>The terminal is real Windows PowerShell. Normal PowerShell commands continue to work.</p>${helpCard("void build / vbuild","Configure and build the current project. Output goes to build/bin/VoidApp.exe.")}${helpCard("void run / vrun","Run the executable. If it does not exist, Void builds first.")}${helpCard("void rebuild / vrebuild","Remove CMake/bin generated data and build again.")}${helpCard("void clean / vclean","Remove the generated build directory.")}${helpCard("void doctor / vdoctor","Check CMake, CMakeLists.txt and src/main.cpp.")}${helpCard("void root / vroot","Return PowerShell to the project root.")}${helpCard("clear / cls","Clear the Void terminal display.")}${helpCard("void restart / vrestart","Restart the current PowerShell session.")}${helpCard("void close / vclose","Close the current terminal tab.")}`;
    else if (page === "languages") helpBody.innerHTML = ru ? `<h2>Языки</h2><p><strong>C++23 — основной язык проектов Void.</strong> Другие текстовые языки можно создавать и редактировать; Void не добавляет их рантаймы автоматически.</p>${helpLink("C++ reference","cppreference.com","https://en.cppreference.com/")}${helpLink("CMake","Официальная документация CMake","https://cmake.org/documentation/")}${helpLink("PowerShell","Документация Microsoft PowerShell","https://learn.microsoft.com/powershell/")}${helpLink("Lua","Официальный справочник Lua","https://www.lua.org/manual/")}${helpLink("Python","Официальная документация Python","https://docs.python.org/3/")}${helpLink("JavaScript","Руководство MDN по JavaScript","https://developer.mozilla.org/docs/Web/JavaScript")}` : `<h2>Languages</h2><p><strong>C++23 is the primary Void project language.</strong> Other text languages can still be created and edited; Void does not provide their runtimes automatically.</p>${helpLink("C++ reference","cppreference.com","https://en.cppreference.com/")}${helpLink("CMake","Official CMake documentation","https://cmake.org/documentation/")}${helpLink("PowerShell","Microsoft PowerShell documentation","https://learn.microsoft.com/powershell/")}${helpLink("Lua","Official Lua manual","https://www.lua.org/manual/")}${helpLink("Python","Official Python documentation","https://docs.python.org/3/")}${helpLink("JavaScript","MDN JavaScript guide","https://developer.mozilla.org/docs/Web/JavaScript")}`;
    else if (page === "colors") helpBody.innerHTML = ru ? `<h2>Цвета проводника</h2><div class="help-color-row"><i class="help-color" style="background:#e58b4a"></i><div><strong>Оранжевый — Сгенерировано</strong><br><small>Всё внутри build/, cmake-build-*, out/ или .vs/. Безопасные сгенерированные данные рабочего пространства.</small></div></div><div class="help-color-row"><i class="help-color" style="background:#e0bb5e"></i><div><strong>Жёлтый — Конфигурация проекта</strong><br><small>project_type.void, CMakeLists.txt, Config/, .idea/ и редакторские конфиги.</small></div></div><div class="help-color-row"><i class="help-color" style="background:#c3cad3"></i><div><strong>Обычный</strong><br><small>Ваш исходный код, ресурсы и обычные файлы.</small></div></div><p>Все файлы всё равно видны. Цвет только подсказывает их роль.</p>` : `<h2>Explorer Colors</h2><div class="help-color-row"><i class="help-color" style="background:#e58b4a"></i><div><strong>Orange — Generated</strong><br><small>Anything under build/, cmake-build-*, out/ or .vs/. Safe/generated workspace data.</small></div></div><div class="help-color-row"><i class="help-color" style="background:#e0bb5e"></i><div><strong>Yellow — Project configuration</strong><br><small>project_type.void, CMakeLists.txt, Config/, .idea/ and editor config files.</small></div></div><div class="help-color-row"><i class="help-color" style="background:#c3cad3"></i><div><strong>Normal</strong><br><small>Your source, assets and regular files.</small></div></div><p>Every file is still visible. Colors only explain its role.</p>`;
    else helpBody.innerHTML = ru ? `<h2>Структура проекта</h2>${helpCard("project_type.void","Метаданные проекта Void. Нужен для распознавания папки как проекта Void.")}${helpCard("src/","Исходные файлы проекта. Basic-проект начинается с src/main.cpp.")}${helpCard("Config/","Настройки, влияющие на проект/движок.")}${helpCard("CMakeLists.txt","Конфигурация сборки C++, используемая командой void build.")}${helpCard("build/cmake/","Сгенерированные файлы CMake и данные сборки.")}${helpCard("build/bin/","Финальный исполняемый файл. Basic-проекты создают VoidApp.exe.")}${helpCard("build/logs/","Зарезервировано для логов.")}` : `<h2>Project Structure</h2>${helpCard("project_type.void","Void project metadata. Required to recognize a folder as a Void project.")}${helpCard("src/","Project source files. Basic projects start with src/main.cpp.")}${helpCard("Config/","Settings that affect the project/engine.")}${helpCard("CMakeLists.txt","C++ build configuration used by void build.")}${helpCard("build/cmake/","Generated CMake files and object/build data.")}${helpCard("build/bin/","Final executable output. Basic projects produce VoidApp.exe.")}${helpCard("build/logs/","Reserved for generated logs.")}`;
}

async function flushAll() { await saveLightFile(); await saveAllDocuments(); await saveState(); }

configureEditor(lightTextEditor, lightSyntaxLayer, lightLineNumbers, lightCursorStatus, () => lightFile?.extension || "", scheduleLightSave);
configureEditor(projectTextEditor, projectSyntaxLayer, projectLineNumbers, projectCursorStatus, () => openDocuments.find(d => normalizePath(d.path) === normalizePath(activeDocumentPath))?.extension || "", scheduleProjectSave);

fileMenuButton.addEventListener("click", e => { e.stopPropagation(); toggleMenu(fileMenuButton, fileMenu); });
editMenuButton.addEventListener("click", e => { e.stopPropagation(); toggleMenu(editMenuButton, editMenu); });
helpMenuButton.addEventListener("click", e => { e.stopPropagation(); toggleMenu(helpMenuButton, helpMenu); });
[fileMenu, editMenu, helpMenu, editorContextMenu, explorerContextMenu, newSubmenu, openInSubmenu, runConfigurationMenu].forEach(menu => menu?.addEventListener("click", e => e.stopPropagation()));
document.addEventListener("click", () => { closeMenus(); editorContextMenu.classList.add("hidden"); explorerContextMenu.classList.add("hidden"); newSubmenu.classList.add("hidden"); openInSubmenu.classList.add("hidden"); });
document.addEventListener("contextmenu", event => { if (event.target !== lightTextEditor && event.target !== projectTextEditor && !event.target.closest("#fileTree")) event.preventDefault(); });

fileNewProject.addEventListener("click", openNewProjectModal); newProjectButton.addEventListener("click", openNewProjectModal); emptyNewProjectButton.addEventListener("click", openNewProjectModal);
[fileOpenProject, managerOpenProjectButton, emptyOpenProjectButton].forEach(button => button.addEventListener("click", openProjectFromDisk));
[fileOpenFile, sidebarOpenFileButton].forEach(button => button.addEventListener("click", openLightFile));
fileSave.addEventListener("click", async () => { closeMenus(); if (!lightEditorView.classList.contains("hidden")) await saveLightFile(true); else await saveActiveDocument(true); });
settingsButton.addEventListener("click", async () => { closeMenus(); applySettings(); await refreshCMakeDetection(); settingsModal.classList.remove("hidden"); });
exitButton.addEventListener("click", async () => { await flushAll(); await closeApplication(); });

allProjectsButton.addEventListener("click", () => { currentSection = "all"; allProjectsButton.classList.add("active"); recentProjectsButton.classList.remove("active"); updateSectionHeaders(); renderProjects(); });
recentProjectsButton.addEventListener("click", () => { currentSection = "recent"; recentProjectsButton.classList.add("active"); allProjectsButton.classList.remove("active"); updateSectionHeaders(); renderProjects(); });

lightSaveButton.addEventListener("click", () => saveLightFile(true)); lightCloseButton.addEventListener("click", async () => { await saveLightFile(true); lightFile = null; showOnly(projectManagerView); });
backToProjectsButton.addEventListener("click", closeProjectEditor);

newProjectCloseButton.addEventListener("click", () => newProjectModal.classList.add("hidden")); newProjectCancelButton.addEventListener("click", () => newProjectModal.classList.add("hidden")); createProjectButton.addEventListener("click", createProject);
browseProjectLocationButton.addEventListener("click", async () => { const result = parseNativeResult(await chooseProjectLocationNative()); if (!result.cancelled && result.path) { projectLocationInput.value = result.path; await refreshSuggestedProjectName(); } });
projectNameInput.addEventListener("input", updateProjectPathPreview); projectLocationInput.addEventListener("input", () => { clearTimeout(projectLocationInput._timer); projectLocationInput._timer = setTimeout(refreshSuggestedProjectName, 180); });
templateButtons.forEach(button => button.addEventListener("click", () => { selectedTemplate = button.dataset.template; templateButtons.forEach(item => item.classList.toggle("active", item === button)); }));
projectTypeCards.forEach(button => button.addEventListener("click", () => { selectedProjectType = button.dataset.type; projectTypeCards.forEach(item => item.classList.toggle("active", item === button)); }));

newItemButton.addEventListener("click", event => { event.stopPropagation(); selectedFolderPath = selectedFolderPath || currentProject?.path; showSideSubmenu(newSubmenu, newItemButton); }); welcomeNewFileButton.addEventListener("click", () => openNewFileModal(currentProject?.path));
refreshExplorerButton.addEventListener("click", refreshExplorerPreservingState);
newFileCloseButton.addEventListener("click", () => newFileModal.classList.add("hidden")); newFileCancelButton.addEventListener("click", () => newFileModal.classList.add("hidden")); createFileButton.addEventListener("click", createFile);
newFolderCloseButton.addEventListener("click", () => newFolderModal.classList.add("hidden")); newFolderCancelButton.addEventListener("click", () => newFolderModal.classList.add("hidden")); createFolderButton.addEventListener("click", createFolder);
filePresetButtons.forEach(button => button.addEventListener("click", () => { selectedFilePreset = button.dataset.preset; filePresetButtons.forEach(item => item.classList.toggle("active", item === button)); }));

fileTree.addEventListener("contextmenu", event => { if (event.target === fileTree) openExplorerRootContext(event); });
fileTree.addEventListener("dragover", event => { if (event.target === fileTree) event.preventDefault(); });
fileTree.addEventListener("drop", async event => {
    if (event.target === fileTree) {
        event.preventDefault();
        if (draggedPath) await moveDraggedItem(currentProject.path);
        else await importDroppedFiles(event, currentProject.path, false);
    }
});

[documentTabs, projectWelcomeView, projectTextView, projectImageView, projectBinaryView].forEach(target => {
    target.addEventListener("dragover", event => event.preventDefault());
    target.addEventListener("drop", handleEditorDrop);
});

function showSideSubmenu(menu, anchor) {
    const rect = anchor.getBoundingClientRect();
    menu.classList.remove("hidden");
    const menuRect = menu.getBoundingClientRect();
    let left = rect.right + 6;
    let top = rect.top - 5;
    if (left + menuRect.width > window.innerWidth - 8) left = rect.left - menuRect.width - 6;
    if (top + menuRect.height > window.innerHeight - 8) top = window.innerHeight - menuRect.height - 8;
    menu.style.left = `${Math.max(8, left)}px`;
    menu.style.top = `${Math.max(8, top)}px`;
}

contextNew.addEventListener("mouseenter", () => { openInSubmenu.classList.add("hidden"); showSideSubmenu(newSubmenu, contextNew); });
contextOpenIn.addEventListener("mouseenter", () => { newSubmenu.classList.add("hidden"); showSideSubmenu(openInSubmenu, contextOpenIn); });
explorerContextMenu.addEventListener("mouseleave", event => {
    const next = event.relatedTarget;
    if (!newSubmenu.contains(next) && !openInSubmenu.contains(next)) {
        newSubmenu.classList.add("hidden");
        openInSubmenu.classList.add("hidden");
    }
});

newSubmenuButtons.forEach(button => button.addEventListener("click", () => {
    const preset = button.dataset.newPreset;
    explorerContextMenu.classList.add("hidden");
    newSubmenu.classList.add("hidden");
    if (preset === "folder") {
        openNewFolderModal(selectedFolderPath || currentProject.path);
        return;
    }
    selectedFilePreset = preset;
    openNewFileModal(selectedFolderPath || currentProject.path, preset);
}));

contextRun.addEventListener("click", runExplorerTarget);
contextCut.addEventListener("click", () => setExplorerClipboard("cut"));
contextCopy.addEventListener("click", () => setExplorerClipboard("copy"));
contextPaste.addEventListener("click", pasteExplorerClipboard);
contextCopyPath.addEventListener("click", async () => {
    const path = explorerContextTarget?.path || currentProject?.path || "";
    await setClipboardTextNative(path);
});
contextRefresh.addEventListener("click", refreshExplorerPreservingState);

contextRename.addEventListener("click", async () => {
    if (!explorerContextTarget) return;
    const oldPath = explorerContextTarget.path;
    const oldName = explorerContextTarget.name;
    const value = await appPrompt(
        settings.language === "ru" ? "Введите новое имя." : "Enter a new name.",
        oldName,
        t("rename"),
        t("rename")
    );
    if (!value || value.trim() === oldName) return;
    const result = parseNativeResult(await renamePathNative(currentProject.path, oldPath, value.trim()));
    if (result.error) {
        await appAlert(result.error, t("rename"));
        return;
    }
    explorerUndoStack.push({ type:"rename", from:result.path, oldName });
    remapOpenDocuments(oldPath, result.path);
    await refreshExplorerPreservingState();
    await revealPathInExplorer(result.path, false);
});

contextDelete.addEventListener("click", async () => {
    if (!explorerContextTarget) return;
    const confirmed = await appConfirm(
        settings.language === "ru" ? `Удалить ${explorerContextTarget.name}?\n\nCtrl+Z вернёт объект, пока Void Engine запущен.` : `Delete ${explorerContextTarget.name}?\n\nCtrl+Z can restore it while Void Engine is running.`,
        t("delete"),
        t("delete")
    );
    if (!confirmed) return;
    const deletedPath = explorerContextTarget.path;
    const result = parseNativeResult(await deletePathNative(currentProject.path, deletedPath));
    if (result.error) {
        await appAlert(result.error, t("delete"));
        return;
    }
    if (result.trash && result.original) explorerUndoStack.push({ type:"restore-trash", trash:result.trash, original:result.original });
    const prefix = `${normalizePath(deletedPath)}\\`;
    openDocuments = openDocuments.filter(doc => {
        const key = normalizePath(doc.path);
        return key !== normalizePath(deletedPath) && !key.startsWith(prefix);
    });
    if (activeDocumentPath && !openDocuments.some(d => normalizePath(d.path) === normalizePath(activeDocumentPath))) activeDocumentPath = null;
    renderDocumentTabs();
    if (!activeDocumentPath) showDefaultProjectView();
    await refreshExplorerPreservingState();
});

openInExplorer.addEventListener("click", async () => {
    await openPathInExplorerNative(explorerContextTarget?.path || currentProject?.path || "");
    openInSubmenu.classList.add("hidden");
    explorerContextMenu.classList.add("hidden");
});
openInVoidEditor.addEventListener("click", async () => {
    const path = explorerContextTarget?.path || "";
    openInSubmenu.classList.add("hidden");
    explorerContextMenu.classList.add("hidden");
    await openPathInVoidEditor(path);
});
openInAssociated.addEventListener("click", async () => {
    await openPathAssociatedNative(explorerContextTarget?.path || currentProject?.path || "");
    openInSubmenu.classList.add("hidden");
    explorerContextMenu.classList.add("hidden");
});
openInTerminal.addEventListener("click", async () => {
    await openTerminalInDirectoryNative(explorerContextTarget?.path || currentProject?.path || "");
    openInSubmenu.classList.add("hidden");
    explorerContextMenu.classList.add("hidden");
});

[searchExplorerButton, actionSearchButton, welcomeSearchButton].forEach(button => button.addEventListener("click", () => toggleSearch(true)));
closeSearchButton.addEventListener("click", () => toggleSearch(false));
searchInput.addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(performSearch, 180); });
searchModeButtons.forEach(button => button.addEventListener("click", () => {
    searchMode = button.dataset.searchMode;
    searchModeButtons.forEach(b => b.classList.toggle("active", b === button));
    performSearch();
}));

buildProjectButton.addEventListener("click", buildProject);
runProjectButton.addEventListener("click", startRun);
stopRunButton.addEventListener("click", stopRun);
runConfigurationButton.addEventListener("click", event => {
    event.stopPropagation();
    renderRunConfigurationMenu();
    runConfigurationMenu.classList.toggle("hidden");
});
runConfigurationMenu.addEventListener("click", event => event.stopPropagation());
runMoreButton.addEventListener("click", openRunConfigurationModal);

newTerminalButton.addEventListener("click", () => createTerminal());
restartTerminalButton.addEventListener("click", restartActiveTerminal);
terminalInput.addEventListener("keydown", async event => {
    if (event.key === "Enter") { event.preventDefault(); const command = terminalInput.value; terminalInput.value = ""; await runTerminalCommand(command); return; }
    if (event.key === "ArrowUp" && terminalHistory.length) { event.preventDefault(); terminalHistoryIndex = Math.max(0, terminalHistoryIndex - 1); terminalInput.value = terminalHistory[terminalHistoryIndex] ?? ""; terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length); }
    if (event.key === "ArrowDown" && terminalHistory.length) { event.preventDefault(); terminalHistoryIndex = Math.min(terminalHistory.length, terminalHistoryIndex + 1); terminalInput.value = terminalHistoryIndex >= terminalHistory.length ? "" : terminalHistory[terminalHistoryIndex]; terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length); }
});
outputPanelButton.addEventListener("click", () => switchBottomPanel("output"));
terminalPanelButton.addEventListener("click", () => switchBottomPanel("terminal"));
toggleBottomPanelButton.addEventListener("click", () => {
    bottomPanel.classList.toggle("collapsed");
    toggleBottomPanelButton.textContent = bottomPanel.classList.contains("collapsed") ? "+" : "−";
});

settingsNavButtons.forEach(button => button.addEventListener("click", () => updateSettingsPage(button.dataset.settingsPage)));
settingsCloseButton.addEventListener("click", () => settingsModal.classList.add("hidden"));
settingsDoneButton.addEventListener("click", async () => {
    settings.language = languageSelect.value;
    settings.editorFontSize = Number(editorFontSizeInput.value) || 14;
    settings.autoSave = autoSaveCheckbox.checked;
    settings.autoRefreshFiles = autoRefreshFilesCheckbox.checked;
    settings.autoRebuildBeforeRun = autoRebuildBeforeRunCheckbox.checked;
    settings.buildMode = buildModeSelect.value;
    settings.externalBuildCommand = externalBuildCommandInput.value.trim();
    applySettings();
    await saveState();
    settingsModal.classList.add("hidden");
});
settingInfoButtons.forEach(button => button.addEventListener("click", () => showSettingInfo(button.dataset.settingInfo)));
runConfigCloseButton.addEventListener("click", () => runConfigModal.classList.add("hidden"));
runConfigCancelButton.addEventListener("click", () => runConfigModal.classList.add("hidden"));
runConfigSaveButton.addEventListener("click", saveRunConfiguration);
addRunConfigButton.addEventListener("click", addRunConfiguration);
deleteRunConfigButton.addEventListener("click", deleteRunConfiguration);
languageSelect.addEventListener("change", () => { settings.language = languageSelect.value; applyLanguage(); });
editorFontSizeInput.addEventListener("input", () => { settings.editorFontSize = Number(editorFontSizeInput.value) || 14; applySettings(); });
autoSaveCheckbox.addEventListener("change", () => settings.autoSave = autoSaveCheckbox.checked);
autoRefreshFilesCheckbox.addEventListener("change", () => { settings.autoRefreshFiles = autoRefreshFilesCheckbox.checked; restartFileWatcher(); });
refreshCMakeButton.addEventListener("click", refreshCMakeDetection);

helpMenuItems.forEach(button => button.addEventListener("click", () => { closeMenus(); showHelp(button.dataset.helpPage); })); helpNavButtons.forEach(button => button.addEventListener("click", () => showHelp(button.dataset.helpPage))); helpCloseButton.addEventListener("click", () => helpModal.classList.add("hidden"));
helpBody.addEventListener("click", async event => { const button = event.target.closest("[data-url]"); if (button) await openExternalNative(button.dataset.url); });
editorCommandButtons.forEach(button => button.addEventListener("click", async event => { event.stopPropagation(); await executeEditorCommand(button.dataset.editorCommand); closeMenus(); editorContextMenu.classList.add("hidden"); }));

appDialogConfirm.addEventListener("click", () => {
    if (appDialogMode === "prompt") closeAppDialog(appDialogInput.value);
    else closeAppDialog(true);
});

appDialogCancel.addEventListener("click", () => {
    closeAppDialog(appDialogMode === "prompt" ? null : false);
});

appDialogClose.addEventListener("click", () => {
    closeAppDialog(appDialogMode === "prompt" ? null : false);
});

appDialogInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        closeAppDialog(appDialogInput.value);
    }

    if (event.key === "Escape") {
        event.preventDefault();
        closeAppDialog(null);
    }
});

newFileName.addEventListener("keydown", event => { if (event.key === "Enter") createFile(); }); newFolderName.addEventListener("keydown", event => { if (event.key === "Enter") createFolder(); });

function getSelectedExplorerEntry() {
    if (!selectedExplorerPath) return null;
    return explorerNodes.get(explorerKey(selectedExplorerPath))?.entry || null;
}

document.addEventListener("keydown", async event => {
    const key = event.key.toLowerCase();
    const target = event.target;
    const textInputFocused = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;

    if (event.ctrlKey && event.shiftKey && key === "o") { event.preventDefault(); await openProjectFromDisk(); return; }
    if (event.ctrlKey && key === "o") { event.preventDefault(); await openLightFile(); return; }
    if (event.ctrlKey && key === "n") { event.preventDefault(); await openNewProjectModal(); return; }
    if (event.ctrlKey && key === "s") {
        event.preventDefault();
        if (!lightEditorView.classList.contains("hidden")) await saveLightFile(true);
        else if (!projectEditorView.classList.contains("hidden")) await saveActiveDocument(true);
        return;
    }
    if (event.ctrlKey && event.shiftKey && key === "f" && currentProject) {
        event.preventDefault();
        toggleSearch(true);
        searchMode = "text";
        searchModeButtons.forEach(b => b.classList.toggle("active", b.dataset.searchMode === "text"));
        searchInput.focus();
        return;
    }

    if (!textInputFocused && currentProject && selectedExplorerPath) {
        const selectedEntry = getSelectedExplorerEntry();
        if (event.ctrlKey && key === "z") {
            event.preventDefault();
            if (await undoExplorerOperation()) return;
        }
        if (event.ctrlKey && key === "c" && selectedEntry) {
            event.preventDefault();
            explorerContextTarget = selectedEntry;
            setExplorerClipboard("copy");
            return;
        }
        if (event.ctrlKey && key === "x" && selectedEntry) {
            event.preventDefault();
            explorerContextTarget = selectedEntry;
            setExplorerClipboard("cut");
            return;
        }
        if (event.ctrlKey && key === "v") {
            event.preventDefault();
            await pasteExplorerClipboard();
            return;
        }
        if (event.ctrlKey && event.shiftKey && event.key === "F10" && selectedEntry) {
            event.preventDefault();
            explorerContextTarget = selectedEntry;
            await runExplorerTarget();
            return;
        }
        if (event.key === "F2" && selectedEntry) {
            event.preventDefault();
            explorerContextTarget = selectedEntry;
            contextRename.click();
            return;
        }
        if (event.key === "Delete" && selectedEntry) {
            event.preventDefault();
            explorerContextTarget = selectedEntry;
            contextDelete.click();
            return;
        }
    }

    if (event.key === "Escape") {
        if (!appDialogModal.classList.contains("hidden")) {
            closeAppDialog(appDialogMode === "prompt" ? null : false);
            return;
        }
        closeMenus();
        editorContextMenu.classList.add("hidden");
        explorerContextMenu.classList.add("hidden");
        newSubmenu.classList.add("hidden");
        openInSubmenu.classList.add("hidden");
        runConfigurationMenu.classList.add("hidden");
        newProjectModal.classList.add("hidden");
        newFileModal.classList.add("hidden");
        newFolderModal.classList.add("hidden");
        helpModal.classList.add("hidden");
        settingsModal.classList.add("hidden");
        runConfigModal.classList.add("hidden");
    }
});

(async function initialize() {
    await loadState(); await refreshSuggestedProjectName(); await refreshCMakeDetection(); renderRunConfigurationMenu(); updateExecutionButtons(); showOnly(projectManagerView);
    try {
        const startupPath = parseNativeResult(await getStartupFileNative());
        if (typeof startupPath === "string" && startupPath) await openPathInVoidEditor(startupPath);
    } catch { }
})();
