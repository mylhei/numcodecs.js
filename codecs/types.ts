export interface EmscriptenModuleOpts {
  noInitialRun?: boolean;
  locateFile?: (url: string) => string;
  onRuntimeInitialized?: () => void;
  wasmBinary?: Uint8Array;
}

// Emscripten things
// Copied from: https://github.com/GoogleChromeLabs/squoosh/blob/65847c0ed76d31a2decd9483ceea11ec69b5e355/emscripten-wasm.d.ts
type EnvironmentType = "WEB" | "NODE" | "SHELL" | "WORKER";
export interface EmscriptenModule {
  print(str: string): void;
  printErr(str: string): void;
  arguments: string[];
  environment: EnvironmentType;
  preInit: { (): void }[];
  preRun: { (): void }[];
  postRun: { (): void }[];
  preinitializedWebGLContext: WebGLRenderingContext;
  noInitialRun: boolean;
  noExitRuntime: boolean;
  logReadFiles: boolean;
  filePackagePrefixURL: string;
  wasmBinary: ArrayBuffer;

  destroy(object: object): void;
  getPreloadedPackage(
    remotePackageName: string,
    remotePackageSize: number,
  ): ArrayBuffer;
  instantiateWasm(
    imports: WebAssembly.Imports,
    successCallback: (module: WebAssembly.Module) => void,
  ): WebAssembly.Exports;
  locateFile(url: string): string;
  onCustomMessage(event: MessageEvent): void;

  Runtime: any;

  ccall(
    ident: string,
    returnType: string | null,
    argTypes: string[],
    args: any[],
  ): any;
  cwrap(ident: string, returnType: string | null, argTypes: string[]): any;

  setValue(ptr: number, value: any, type: string, noSafe?: boolean): void;
  getValue(ptr: number, type: string, noSafe?: boolean): number;

  ALLOC_NORMAL: number;
  ALLOC_STACK: number;
  ALLOC_STATIC: number;
  ALLOC_DYNAMIC: number;
  ALLOC_NONE: number;

  allocate(slab: any, types: string, allocator: number, ptr: number): number;
  allocate(slab: any, types: string[], allocator: number, ptr: number): number;

  // eslint-disable-next-line @typescript-eslint/camelcase
  Pointer_stringify(ptr: number, length?: number): string;
  UTF16ToString(ptr: number): string;
  stringToUTF16(str: string, outPtr: number): void;
  UTF32ToString(ptr: number): string;
  stringToUTF32(str: string, outPtr: number): void;

  // USE_TYPED_ARRAYS == 1
  HEAP: Int32Array;
  IHEAP: Int32Array;
  FHEAP: Float64Array;

  // USE_TYPED_ARRAYS == 2
  HEAP8: Int8Array;
  HEAP16: Int16Array;
  HEAP32: Int32Array;
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAPU32: Uint32Array;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;

  TOTAL_STACK: number;
  TOTAL_MEMORY: number;
  FAST_MEMORY: number;

  addOnPreRun(cb: () => any): void;
  addOnInit(cb: () => any): void;
  addOnPreMain(cb: () => any): void;
  addOnExit(cb: () => any): void;
  addOnPostRun(cb: () => any): void;

  // Tools
  intArrayFromString(
    stringy: string,
    dontAddNull?: boolean,
    length?: number,
  ): number[];
  intArrayToString(array: number[]): string;
  writeStringToMemory(str: string, buffer: number, dontAddNull: boolean): void;
  writeArrayToMemory(array: number[], buffer: number): void;
  writeAsciiToMemory(str: string, buffer: number, dontAddNull: boolean): void;

  addRunDependency(id: any): void;
  removeRunDependency(id: any): void;

  preloadedImages: any;
  preloadedAudios: any;

  _malloc(size: number): number;
  _free(ptr: number): void;

  // Augmentations below by @surma.
  onRuntimeInitialized: () => void | null;
}
