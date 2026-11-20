import { assertEquals } from "@std/assert";
import { Average } from "../src/average.ts";
import { FileAccess } from "../src/file_access.ts";
import { FakeFileAccess } from "./doubles/fake_file_access.ts";
import { ConfigurableStub, HardCodedStub } from "./doubles/stubs.ts";
import { MockNumberSource } from "./doubles/mock_number_source.ts";
import { SpyFileAccess } from "./doubles/spy_file_access.ts";

Deno.test("Fake: mean of pseudo file", async () => {
  const fake = new FakeFileAccess("/path/to/some/other/file");
  assertEquals(await new Average(fake).computeMeanOfFile(), 3);
});

Deno.test("Fake: median of added file", async () => {
  const fake = new FakeFileAccess("/new/file");
  fake.addFile("/new/file", [10, 9, 100]);
  assertEquals(await new Average(fake).computeMedianOfFile(), 10);
});

Deno.test("Fake: mode of empty file", async () => {
  const fake = new FakeFileAccess("/path/to/an/empty/file");
  assertEquals(await new Average(fake).computeModeOfFile(), []);
});

Deno.test("Stub (hard-coded): median", async () => {
  assertEquals(await new Average(new HardCodedStub()).computeMedianOfFile(), 3);
});

Deno.test("Stub (configurable): median", async () => {
  const stub = new ConfigurableStub([1, 2, 3, 4, 5]);
  assertEquals(await new Average(stub).computeMedianOfFile(), 3);
});

Deno.test("Mock: mean calls source once", async () => {
  const mock = new MockNumberSource();
  assertEquals(await new Average(mock).computeMeanOfFile(), 3);
  assertEquals(mock.callCount, 1);
});

Deno.test("Spy: wraps FileAccess", async () => {
  const path = await Deno.makeTempFile();
  try {
    await Deno.writeTextFile(path, "4\n8\n15\n");
    const spy = new SpyFileAccess(new FileAccess(path));
    assertEquals(await new Average(spy).computeMeanOfFile(), 9);
    assertEquals(spy.callCount, 1);
    assertEquals(spy.returned, [[4, 8, 15]]);
  } finally {
    await Deno.remove(path);
  }
});
