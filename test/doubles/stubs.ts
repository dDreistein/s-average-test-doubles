import { NumberSource } from "../../src/number_source.ts";

export class HardCodedStub implements NumberSource {
  public readNumbers(): Promise<Array<number>> {
    return Promise.resolve([1, 2, 3, 4, 5]);
  }
}

export class ConfigurableStub implements NumberSource {
  constructor(private numbers: Array<number>) {}

  public readNumbers(): Promise<Array<number>> {
    return Promise.resolve(this.numbers);
  }
}
