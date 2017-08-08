'use strict'

import { TestOutputConfiguration } from "./TestOutputConfiguration.js"

/**
  This class represents the configuration for a test.

  @property {boolean} this.parallelExecution - Whether tests in a sequence should be executed in parallel.
  @property {number} this.timeout - The maximum amount of time in milliseconds a single test is allowed to
    run for before it gets timed out.
  @property {TestOutputConfiguration} this.outputConfiguration - The configuration for the output.
*/
class TestConfiguration {

    /**
      Creates a new TestConfiguration instance.

      @param {boolean} [parallelExecution=true] - Initial value for this.parallelExecution.
      @param {number} [timeout=10000] - Initial value for this.timeout.
      @param {TestOutputConfiguration} [outputConfiguration=new TestOutputConfiguration()] - Initial value
        for this.outputConfiguration.
    */
    constructor(parallelExecution = true, timeout = 10000, outputConfiguration = new TestOutputConfiguration()) {
        this.parallelExecution = parallelExecution
        this.timeout = timeout
        this.outputConfiguration = outputConfiguration
    }

}

export { TestConfiguration }
