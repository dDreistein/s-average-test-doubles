import { NumberSource } from "../../src/number_source.ts";

export class FakeFileAccess implements NumberSource {
  private files: Map<string, Array<number>> = new Map([
    ["/path/to/an/empty/file", []],
    ["/path/to/some/other/file", [1, 2, 3, 4, 5]],
    ["C:\\test-data\\third-file.txt", [7, 34, 2]],
  ]);

  constructor(private path: string) {}

  public addFile(path: string, numbers: Array<number>): void {
    this.files.set(path, numbers);
  }

  public readNumbers(): Promise<Array<number>> {
    const numbers = this.files.get(this.path);
    if (numbers === undefined) {
      return Promise.reject(new Error(`File not found: ${this.path}`));
    }
    return Promise.resolve([...numbers]);
  }
}
