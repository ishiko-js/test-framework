(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"));
	else if(typeof define === 'function' && define.amd)
		define(["fs"], factory);
	else if(typeof exports === 'object')
		exports["IshikoTestFramework"] = factory(require("fs"));
	else
		root["IshikoTestFramework"] = factory(root["fs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestResultOutcome; });


/**
  The possible outcomes of a test.
  @readonly
  @enum {number}
*/
var TestResultOutcome = {
    /**
      The result of the test is unknown.
      This is used as the initial value before
      the test has been run.
    */
    eUnknown: 0,
    /** The test passed. */
    ePassed: 1,
    /** The test failed. */
    eFailed: 3
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestInformation_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestResult_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ObserverEventType_js__ = __webpack_require__(3);







/**
  <p>The base class for all the classes implementing tests.</p>

  <p>Derived classes should override the doRun() method to
  implement their specific test logic.</p>

   @property {TestInformation} this.information - The description of the test (number, name, etc)
   @property {TestResult} this.result - The result of the test
*/
class Test {

    /** 
      Creates a new Test instance.
      @param {string} name - The name of the test.
    */
    constructor(name) {
        this.information = new __WEBPACK_IMPORTED_MODULE_0__TestInformation_js__["a" /* TestInformation */](name)
        this.result = new __WEBPACK_IMPORTED_MODULE_1__TestResult_js__["a" /* TestResult */]
    }

    number() {
        return this.information.number
    }

    name() {
        return this.information.name
    }

    passed() {
        return this.result.passed()
    }

    /**
      <p>Executes the test.</p>

      <p>This method should not be overriden. Override
      doRun().</p>

      @param {TestObserver=} observer - An observer that
        will monitor the execution of the test.
      @returns {Promise} A promise that will indicate when
        the test is complete.
    */
    run(observer) {
        let self = this
        let testPromise = new Promise(function(resolve, reject) {
            self.notify(__WEBPACK_IMPORTED_MODULE_3__ObserverEventType_js__["a" /* ObserverEventType */].eTestStart, observer)
        
            let outcomePromise = Promise.resolve(self.doRun(observer))
            outcomePromise.then(function(outcome) {
                self.result.outcome = outcome
                self.notify(__WEBPACK_IMPORTED_MODULE_3__ObserverEventType_js__["a" /* ObserverEventType */].eTestEnd, observer)
                resolve()
            })
        })
        return testPromise
    }

    /**
      <p>Called by {@link Test#run} to execute the test. Do not
         call this function directly.</p>

      <p>This function is meant to be overriden by specific 
         test classes.The base class implementation always 
         returns TestResultOutcome.eFailed.</p>

      <p>If the test is asynchronous this function should
         return a Promise with an executor function that
         passes the outcome of the test to the resolve 
         function. So even even if the test fails resolve 
         should be used, not reject. Use reject to indicate
         the test couldn't be run.</p>

      @virtual
      @returns {TestResultOutcome|Promise} The outcome of the
        test or a Promise that will provide the outcome of the
        test.
      @see FunctionBasedTest
      @see FileComparisonTest
    */
    doRun(observer) {
        return __WEBPACK_IMPORTED_MODULE_2__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed
    }

    notify(type, observer) {
        if (observer) {
            observer.notify(type, this)
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Test;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Test_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__ = __webpack_require__(0);





/**
  Represents a sequence of tests.
  @extends Test
*/
class TestSequence extends __WEBPACK_IMPORTED_MODULE_0__Test_js__["a" /* Test */] {

    /** 
      Creates a new TestSequence instance.
      @param {string} name - The name of the test sequence.
    */
    constructor(name) {
        super(name)
        this.tests = [ ]
    }

    /**
      Executes the test.
      @returns {Promise} a Promise that will provide the outcome of the
        test.
    */
    doRun(observer) {
        let self = this
        let testOutcomePromise = new Promise(function(resolve, reject) {

            // Start all tests in the sequence
            let testPromises = [ ];
            for (let i = 0; i < self.tests.length; i++) {
                let test = self.tests[i]
                let testPromise = Promise.resolve(test.run(observer))
                testPromises.push(testPromise)
            }

            // Wait for all tests to complete and update the
            // test sequence result
            Promise.all(testPromises).then(function() {
                let result = __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown

                for (let i = 0; i < self.tests.length; i++) {
                    let test = self.tests[i]
                    let outcome = test.result.outcome
                    if (i == 0) {
                        // The first test determines the initial value of the result
                        result = outcome
                    } else if (result == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown) {
                        // If the current sequence outcome is unknown it can only get worse and be set
                        // to exception or failed (if the outcome we are adding is exception or failed)
                        if ((outcome == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed) || (outcome == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eException)) {
                            result = outcome;
                        }
                    } else if (result == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed) {
                        // If the current sequence outcome is passed it stays at this state only if the
                        // result we are adding is passed, else it will be 'unknown', 
                        // 'passedButMemoryLeaks', 'exception' or 'failed'.
                        // depending on the outcome of the result we are adding.
                        result = outcome;
                    }
                }

                resolve(result)
            })
        })
        return testOutcomePromise
    }

    append(test) {
        // We need to update the number of the test
        if (this.tests.length == 0) {
            let newNumber = this.number().clone();
            test.information.number = newNumber.deeperNumber()
        } else {
            let newNumber = this.tests[this.tests.length - 1].number().clone();
            test.information.number = newNumber.increase()
	}

        this.tests.push(test)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestSequence;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserverEventType; });


/**
  The type of events generated by
  test runs.

  @readonly
  @enum {number}
*/
var ObserverEventType = {
    /** The test has started. */
    eTestStart: 0,
    /**
      The test has completed and its result
      has been updated.
    */
    eTestEnd : 1
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Test_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__ = __webpack_require__(0);


var fs = __webpack_require__(14)



/**
  Implements a test where a file is generated
  and its contents compared with a reference file.
  @extends Test
*/
class FileComparisonTest extends __WEBPACK_IMPORTED_MODULE_0__Test_js__["a" /* Test */] {

    /**
      Callback that implements a specific test case.
      @callback FileComparisonTestRunFct
      @return {TestResultOutcome} The outcome of the test.
    */

    /**
      Creates a new FileComparisonTest instance.
      @param {string} name - The name of the test.
      @param {FileComparisonTestRunFct} runFct - The callback that 
        will run the test and should generate the file
        that will be compared to the reference file.
      @param {TestSequence=} parentSequence - A test
        sequence to which the new test will be appended.
    */
    constructor(name, runFct, parentSequence) {
        super(name)
        this.runFct = runFct
        if (parentSequence) {
            parentSequence.append(this)
        }
    }

    setOutputFilePath(path) {
        this.outputFilePath = path;
    }

    setReferenceFilePath(path){
        this.referenceFilePath = path;
    }

    doRun(observer) {
        let result = __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed

        if (this.runFct) {
            result = this.runFct(this);
        } else {
            result = __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed
        }

        if (result == __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed) {
            result = __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed
            if (this.outputFilePath && this.referenceFilePath) {
                let outputContents = fs.readFileSync(this.outputFilePath)
                let referenceContents = fs.readFileSync(this.referenceFilePath)
                if (outputContents.equals(referenceContents)) {
                    result = __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed
                }
            }
        }

        return result;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = FileComparisonTest;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Test_js__ = __webpack_require__(1);




/**
  Implements a test where the test logic is
  implemented by a callback that is passed
  in as argument to the constructor.
  @extends Test
*/
class FunctionBasedTest extends __WEBPACK_IMPORTED_MODULE_0__Test_js__["a" /* Test */] {

    constructor(name, runFct, parentSequence) {
        super(name)
        this.runFct = runFct
        if (parentSequence) {
            parentSequence.append(this)
        }
    }

    doRun(observer) {
        let self = this
        let testPromise = new Promise(function(resolve, reject) {
            self.runFct(resolve, reject)
        })
        return testPromise
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = FunctionBasedTest;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestProgressObserver_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestSequence_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TestEnvironment_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TopTestSequence_js__ = __webpack_require__(12);







let topSequence = Symbol()

/** 
  The class that manages the execution of the
  test suite. Think of this as the entry point
  for a test suite.

  @example
'use strict'

var tf = require("ishiko-test-framework")

// Create the test harness
let theTestHarness = new tf.TestHarness("My First Test Suite")

// Add a test sequence
let numberTests = theTestHarness.appendTestSequence("Number tests")

// Add the first test to the test sequence
new tf.FunctionBasedTest(
    "Addition",
    function() {
        if ((3 + 2) == 5) {
            return tf.TestResultOutcome.ePassed
        } else {
            return tf.TestResultOutcome.eFailed
        }
    },
    numberTests)

// Add a second test to the test sequence
new tf.FunctionBasedTest(
    "Subtraction",
    function() {
        if ((3 - 2) == 2) {
            return tf.TestResultOutcome.ePassed
        } else {
            return tf.TestResultOutcome.eFailed
        }
    },
    numberTests)

// Run the test suite
theTestHarness.run()

*/
class TestHarness {

    /** 
      Creates a new TestHarness instance.
      @param {string} name - The title of the test suite.
    */
    constructor(name) {
        this.environment = new __WEBPACK_IMPORTED_MODULE_2__TestEnvironment_js__["a" /* TestEnvironment */]()
        this[topSequence] = new __WEBPACK_IMPORTED_MODULE_3__TopTestSequence_js__["a" /* TopTestSequence */](name)
    }

    /**
      Executes the tests in the test suite.
    */
    run() {
        let self = this
        console.log("Test Suite: " + self[topSequence].name())
        console.log()

        let progressObserver = new __WEBPACK_IMPORTED_MODULE_0__TestProgressObserver_js__["a" /* TestProgressObserver */]()
        let testPromise = Promise.resolve(self[topSequence].run(progressObserver))
        testPromise.then(function() {
            console.log()
            if (!self[topSequence].passed()) {
                console.log("Test Suite FAILED!!!")
            } else {
                console.log("Test Suite passed")
            }
        })
    }

    appendTestSequence(name) {
        let newTestSequence = new __WEBPACK_IMPORTED_MODULE_1__TestSequence_js__["a" /* TestSequence */](name)
        this[topSequence].append(newTestSequence)
        return newTestSequence
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestHarness;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/**
  This class stores context information
  that can be used by the tests.

  This is somewhat equivalent to global
  variables for the tests.

  @property {Object} this.testDataDirectories - An 
     associative array that stores a list of directories
     where test data is stored. The "(default)" key acts
     as the default test data directory so you don't have
     to bother with specifying the key if your test
     suite doesn't use more than one test data directory.
     See {@link TestEnvironment#setTestDataDirectory}.
*/
class TestEnvironment {

    /** Creates a new TestEnvironment instance. */
    constructor() {
        this.testDataDirectories = { }
    }

    /**
      Adds or updates a test data directory. If no id
      is specified then it is considered to be the id
      of the default test data directory: "(default)".

      @param {string} path - The path of the test
        data directory.
      @param {string=} id - The identifier of this
        test data directory.
    */
    setTestDataDirectory(path, id) {
        if (id == null) {
            id = "(default)"
        }
        this.testDataDirectories[id] = path
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestEnvironment;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestNumber_js__ = __webpack_require__(9);




/** 
    Stores the number and name of the
    test.
*/
class TestInformation {

    constructor(name) {
        this.number = new __WEBPACK_IMPORTED_MODULE_0__TestNumber_js__["a" /* TestNumber */]()
        this.name = name
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestInformation;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/** Represents the number of a test. */
class TestNumber {

    constructor() {
        this.number = [ ]
    }

    clone() {
        let newNumber = new TestNumber()
        for (let i = 0; i < this.number.length; i++) {
             newNumber.number.push(this.number[i])
        }
        return newNumber
    }

    depth() {
        return this.number.length
    }

    part(i) {
        return this.number[i]
    }

    deeperNumber() {
        this.number.push(1)
        return this
    }

    increase() {
        if (this.number.length) {
            this.number[this.number.length - 1]++
        }
        return this
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestNumber;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObserverEventType_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__ = __webpack_require__(0);





var nesting = Symbol()

/** 
  Observes the progress when a test is being executed
  and prints that information on the console.
  @extends TestObserver
*/
class TestProgressObserver {

    constructor() {
        this.notify = function(eventType, test) {
             switch (eventType) {
                 case __WEBPACK_IMPORTED_MODULE_0__ObserverEventType_js__["a" /* ObserverEventType */].eTestStart:
                     console.log(this[nesting] + formatNumber(test.number()) + " " + test.name() + " started")
                     this[nesting] += "    "
                     break

                 case __WEBPACK_IMPORTED_MODULE_0__ObserverEventType_js__["a" /* ObserverEventType */].eTestEnd:
                     if (this[nesting].length >= 4) {
                         this[nesting] = this[nesting].substring(0, (this[nesting].length - 4))
                     }
                     console.log(this[nesting] + formatNumber(test.number()) + " " + test.name() +
                         " completed, result is " + formatResult(test.result))
                     break
             }
        }
        this[nesting] = ""
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestProgressObserver;


function formatNumber(number) {
    let formattedNumber = ""
    for (let i = 0; i < number.depth(); i++) {
         formattedNumber += number.part(i) + ".";
    }
    return formattedNumber
}

function formatResult(result) {
    let formattedResult = ""
    switch (result.outcome) {
        case __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown:
            formattedResult = "UNKNOWN!!!"
            break

        case __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed:
            formattedResult = "passed"
            break

        case __WEBPACK_IMPORTED_MODULE_1__TestResultOutcome_js__["a" /* TestResultOutcome */].eFailed:
            formattedResult = "FAILED!!!"
            break

        default:
            formattedResult = "UNEXPECTED OUTCOME ENUM VALUE"
    }
    return formattedResult
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestResultOutcome_js__ = __webpack_require__(0);




/** 
  Represents the result of a test.

  @property {TestResultOutcome} this.outcome - An enum indicating the outcome of the test
*/
class TestResult {

    /**
      Creates a new TestResult instance. The outcome is
      set to TestResultOutcome.eUnknown.
    */
    constructor() {
        this.outcome = __WEBPACK_IMPORTED_MODULE_0__TestResultOutcome_js__["a" /* TestResultOutcome */].eUnknown
    }

    /**
      Checks whether the test passed.

      @returns True if this.outcome is TestResultOutcome.ePassed,
        False in all other cases.
    */
    passed() {
        return (this.outcome == __WEBPACK_IMPORTED_MODULE_0__TestResultOutcome_js__["a" /* TestResultOutcome */].ePassed)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TestResult;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TestSequence_js__ = __webpack_require__(2);




class TopTestSequence extends __WEBPACK_IMPORTED_MODULE_0__TestSequence_js__["a" /* TestSequence */] {

    notify(type, observer) {
        // Do nothing because the top level sequence is a 
        // sequence hidden to the user and used by the test 
        // harness internally only
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TopTestSequence;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_TestHarness_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Test_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_TestResultOutcome_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_TestSequence_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_FunctionBasedTest_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_FileComparisonTest_js__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestHarness", function() { return __WEBPACK_IMPORTED_MODULE_0__core_TestHarness_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Test", function() { return __WEBPACK_IMPORTED_MODULE_1__core_Test_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestResultOutcome", function() { return __WEBPACK_IMPORTED_MODULE_2__core_TestResultOutcome_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TestSequence", function() { return __WEBPACK_IMPORTED_MODULE_3__core_TestSequence_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionBasedTest", function() { return __WEBPACK_IMPORTED_MODULE_4__core_FunctionBasedTest_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FileComparisonTest", function() { return __WEBPACK_IMPORTED_MODULE_5__core_FileComparisonTest_js__["a"]; });












/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ })
/******/ ]);
});