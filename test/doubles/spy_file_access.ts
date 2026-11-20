import { FileAccess } from "../../src/file_access.ts";
import { NumberSource } from "../../src/number_source.ts";

export class SpyFileAccess implements NumberSource {
  public callCount = 0;
  public returned: Array<Array<number>> = [];

  constructor(private inner: FileAccess) {}

  public async readNumbers(): Promise<Array<number>> {
    this.callCount++;
    const numbers = await this.inner.readNumbers();
    this.returned.push(numbers);
    return numbers;
  }
}
