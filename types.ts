import { COEPDirective } from "./constants.ts";

export interface COEP {
  /** `Cross-Origin-Embedded-Policy` header directive. */
  readonly directive: `${COEPDirective}`;

  /** Reporting endpoint. */
  readonly endpoint?: string;
}
