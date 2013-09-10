Introduction
============

In 2012, after hearing about [yet another JavaScript framework][1], I became
upset that like other frameworks it abuses constructors to build something that
remotely resembles classes known from languages such as C++ or Java. I was
thinking: Wouldn't it be possible to build a true class system in JavaScript?

**Ugly'n'buggy**: What you find here is a proof of concept, hacky, buggy,
incomplete, and not elegant, not at all.

Anyhow, with some effort, it should be straight forward to build an arbitrarily
complex class system in JavaScript, with true private and protected members,
with friends, multiple inheritance, and all the things you love and hate from
languages such as C++. What is missing, of course, is strong type system, which
goes hand in hand with classes in C++.

I don't intend to spend more time on this, as I actually enjoy the liberty that
comes with *not* having a class and strong type system built into JavaScript.
If I want that, then I use other languages.

Felix E. Klee <felix.klee@inka.de>


License
======= 

Copyright (C) 2012 - 13 Felix E. Klee

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[1]: http://en.wikipedia.org/wiki/Qooxdoo
