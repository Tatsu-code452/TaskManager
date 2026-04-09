import { expectDefines } from "./expectDefines";
import { pageDefines } from "./pageDefines";
import { ExpectFromMeta } from "./test-utils/expectUtils/types";
import { pageOptions } from "./test-utils/page";

export type PageOptions = Awaited<ReturnType<typeof pageOptions<typeof pageDefines>>>;
export type Expect = Awaited<ExpectFromMeta<typeof expectDefines>>;
