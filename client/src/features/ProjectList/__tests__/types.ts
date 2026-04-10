import { expectDefines, paramRegistry } from "./expectDefines";
import { pageDefines } from "./pageDefines";
import { createExpect } from "./test-utils/expect";
import { pageOptions } from "./test-utils/page";

export type PageOptions = Awaited<ReturnType<typeof pageOptions<typeof pageDefines>>>;
export type Expect = Awaited<ReturnType<typeof createExpect<typeof expectDefines, typeof paramRegistry>>>;
