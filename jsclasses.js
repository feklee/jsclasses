// Requires JS 1.8.5
//
// Perhaps port existing PHP/C++ example to JavaScript.
//
// Playing around, trying to create real class objects in JavaScript, just for
// fun.
//
// Limitations, at the moment (to make it not too hard):
//
//   * No way to call functions from super class.
//
//   * No protected members.
//
// Ideas:
//
//   * Add way to call functions from super class, by introducing
//     `superInstance` object. Example:
//
//         f: function () {
//             return this.superInstance.f() + 5;
//         }
//
//     Be careful that public and protected (later) members are exposed and
//     accessed correctly.
//
//   * Instead of specifying constructor as object with init function, specify
//     it as function with - as an object - additional parameters. Something
//     like:
//
//         constructor: extend(function () { /* do init */ }, {/*...*/});
//
//   * Typization. See:
//
//         http://lea.verou.me/2011/05/strongly-typed-javascript/
//
//   * Virtual members (typization needed).

// Copyright (C) 2012 Felix E. Klee
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.


/*jslint devel: true, maxerr: 50, maxlen: 79, sloppy: true */

var RootClass = (function () {
    function copyOfOwnProperties(object) {
        var property, copy = {};

        for (property in object) {
            if (object.hasOwnProperty(property)) {
                copy[property] = object[property];
            }
        }

        return copy;
    }

    function copyOfOwnPropertiesOrEmpty(parentObject, objectName) {
        return (parentObject.hasOwnProperty(objectName) ?
                copyOfOwnProperties(parentObject[objectName]) : {});
    }

    function instanceFunction(f, instanceMembers) {
        return function (x) {
            return f.call(instanceMembers, x);
        };
    }

    // Creates a member of an instance. Differentiates between functions and
    // variables.
    function instanceMember(members, memberName, instancePrivateMembers) {
        return (typeof members[memberName] === 'function' ?
                instanceFunction(members[memberName],
                                 instancePrivateMembers) :
                members[memberName]);
    }

    return {
        publicMembers: {},

        privateMembers: {},

        SuperClass: null, // root

        constructor: null,

        // Returns a new instance, initialized with the constructor.
        instance: function () {
            var instance, memberName,
                instancePrivateMembers = {},
                constructor, superArguments;

            // Builds constructor using arguments:
            if (this.constructor !== null) {
                constructor = this.constructor.apply(this, arguments);
            } else {
                constructor = {};
            }

            // Creates basis of new instance, either from super class or as
            // empty object:
            if (this.SuperClass !== null) {
                superArguments = constructor.superArguments || [];
                instance = this.SuperClass.instance.apply(this.SuperClass,
                                                          superArguments);
            } else {
                instance = {};
            }

            // Instantiates private members (functions and variables):
            for (memberName in this.privateMembers) {
                if (this.privateMembers.hasOwnProperty(memberName)) {
                    instancePrivateMembers[memberName] =
                        instanceMember(this.privateMembers, memberName,
                                       instancePrivateMembers);
                }
            }

            // Exposes public members (overrides members from instance of super
            // class):
            for (memberName in this.publicMembers) {
                if (this.publicMembers.hasOwnProperty(memberName)) {
                    instance[memberName] =
                        instanceMember(this.publicMembers, memberName,
                                       instancePrivateMembers);
                }
            }

            // Calls constructor, if specified:
            if (constructor.hasOwnProperty('construct')) {
                constructor.construct.call(instancePrivateMembers);
            }

            return instance;
        },

        subClass: function (definition) {
            var newClass = Object.create(this);

            if (typeof definition.constructor !== 'undefined') {
                newClass.constructor = definition.constructor;
            }

            newClass.privateMembers =
                copyOfOwnPropertiesOrEmpty(definition, 'privateMembers');

            newClass.publicMembers =
                copyOfOwnPropertiesOrEmpty(definition, 'publicMembers');

            newClass.SuperClass = this;

            return newClass;
        }
    };
}());

var Animal = RootClass.subClass({
    constructor: function (verb, what) { // see below for why this structure is
                                         // needed (for building arguments)
        return {
            construct: function () {
                this.verb = verb;
                this.what = what;
            },
            superArguments: []
        };
    },

    publicMembers: {
        sais: function () {
            return 'I ' + this.verb + ': ' + this.what;
        },
        sendToSleep: function () {
            this.verb = 'sleep';
            this.what = 'zzzzz...';
        }
    },

    privateMembers: {
        verb: null,
        what: null
    }
});

var Cat = Animal.subClass({
    constructor: function (what) {
        return {
            superArguments: ['meow', what]
        };
    }
});

var Hund = Animal.subClass({
    constructor: function (what) {
        return {
            superArguments: ['bark', 'woof, woof!']
        };
    },

    publicMembers: {
        sais: function () { // overrides
            return ('Ich belle: Wau wau!');
        }
    }
});

var pluto = Animal.instance('bark', 'Woof, woof!');
console.log(pluto.sais());
pluto.sendToSleep();
console.log(pluto.sais());

var tom = Cat.instance('Where\'s Jerry?');
console.log(tom.sais());
tom.sendToSleep();
console.log(tom.sais());

var bello = Hund.instance('Wau wau!');
console.log(bello.sais());
bello.sendToSleep();
console.log(bello.sais());
