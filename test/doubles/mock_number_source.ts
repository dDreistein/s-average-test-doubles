import { NumberSource } from "../../src/number_source.ts";

export class MockNumberSource implements NumberSource {
  public callCount = 0;

  public readNumbers(): Promise<Array<number>> {
    this.callCount++;
    return Promise.resolve([1, 2, 3, 4, 5]);
  }
}
