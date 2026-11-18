<!-- 
The file that Claude will base cpp-guide on
-->

# Emir YILDIRIM's C/C++ Guide

Want to write C/C++ like [the creator of ENux](https://github.com/ENux-Distro)? Well then this guide is for you

## Before Starting

This guide assumes that you have some knowledge of writing C/C++, preferably systems level C/C++. 

This guide isn't a C/C++ standard, its only my opinion. You can write however you want

## Header Files

If you've written, or read some C/C++ code, then you're familiar with what header files are. You're also probably familiar with

The #pragma once method
```c++
#pragma once
```

The macro style include guards
```c++
#ifndef FOO
#define FOO

// some foo code

#endif // FOO
```

But which one should you use?

### ``#pragma once method``

The ``#pragma once`` method is a modern approach in header files. Its one liner, and most modern compilers support it.

This method can be used for codebases target modern compilers, where you control the build environment.

But if you're writing open source code, distributed to unknown environments, then this method could work on user a, but could fail on user b.

### ``The macro style include guards method``

The macro style include guards method is the safest version of header definition, as it works almost everywhere.

This method can be used for open source code, distributed to unknown methods.

But, if you're a lazy to write 3 more lines of code, and know the specifics of how the code will be controlled, this method isn't for you.

## Namespaces

A namespace is a way to group related code together under a name, it helps you avoid naming conflicts when your code grows or when you use code from multiple sources.

<!-- TODO: Work on this -->

## OOP

OOP, standing for object oriented programming, is one of the reasons why I switched to C++ from C. It helps you organize and make your code prettier.
But, when do you actually need this?

Let's say you're writing a container, and installation of every distribution is different from each other.
You don't want to write the same operations every time, so you create a class of each distro, like this:

```c++
class distroX {

public:
  
  static void install() {
    // Installs distroX
  }

  static void remove() {
    // Removes distroX
  }

};

int main(int argc, char **argv) {
  if (strcmp(argv[1]), "install") == 0 && strcmp(argv[2], "distroX") == 0) {
    distroX.install();
  }

  return 0;
}
```
Look, your code looks prettier, more organized. This is a good way to use OOP. But a bad way is:

```c++
class calculator {
  int addition(int a, int b) {
    return a + b
  }
};

int main() {
  calculator.addition(1, 2);
}
```

Just because C++ has OOP, doesn't mean you should use it everywhere. The addition function could've been simplified to one helper function.

## Function Definition

### Pointers

The pointer symbols (* and &) should be written to the **LEFT SIDE OF THE VARIABLE NAME**, not the **RIGHT SIDE OF THE POINTER TYPE**.

Examples:

Good

```c++
char *good_pointer;
char &another_good_pointer = good_pointer
```

Bad

```c++
char* bad_pointer
char& another_bad_pointer = bad_pointer
```

### Helper Functions

Your helper function must tell you what it does. Don't rename it as tmp_helperfunc_1, because the next developer would have a hard time figuring it out

Examples:

Good

```c++
int install_packages(char *package_name) {
  // Brilliant code
}
```

Bad

```c++
int tmp14(char *argument13) {
  // Brilliant code
}

If you're writing a helper function, that wraps a library function with more error checking, you can name it as <library_function>2,
or if the function already has a number, you can do <library_function>[number + 1]

## Leveraging from the Features

### C++ Features
C++ offers many incredibly features, like OOP, strings, safe pointers and etc. But you should only use it only when you know the internals of that function.

Examples:

std::filesystem::create_directory("dir"); // this is the same as mkdir("dir");
std::filesystem::rename("file.txt", "File.txt"); // this is the same as rename("file.txt", "File.txt");
std::getline(cin, string); // this is the same as read(0, string, sizeof(string) - 1);

### GNU Extentions

GNU extentions are non-standard language features added by the gcc to C and C++ beyond official ISO standards.

GNU extentions sometimes allow you to write simple one liners that the normal ISO standards wouldn't allow

Only use GNU extentions if the code requires gcc and not any other compiler like clang.

Example:

```c++
execvp("foo", (char *[]){"foo", NULL}); // ISO standard C++ doesn't allow this, but GNU extentions do
```

## Comments

Comments explain what the code does. Use them, but don't overuse them. 

Examples:

Good

```c++
int calculator(int a, int b) {
  std::cout << a + b << std::endl;
  // Only adding this as a prank
  reboot(RB_AUTOBOOT);
}
```

Bad

```c++
int calculator(int a, int b) {
  // A calculator is a physical device, software program, or person that performs mathematical calculations and numerical operations.
  // This calculator will get 2 integer arguments
  // an integer any whole number; positive, negative, or zero—that has no fractional or decimal part
  // There are 2 types integers, unsigned and signed integers, our calculator takes in a signed integer
  std::cout << a + b << std::endl
  // The calculator will print the result of a + b to the standard output using cout, and will add a new line using endl.
  // These 2 library functions are in the iostream.h header file, in the std:: namespace
  reboot(RB_AUTOBOOT);
  // This simple yet dangerous prank reboots your computer. the reboot library functions wraps int syscall(SYS_reboot, int magic, int magic2, int op, void *arg)
}
```

Look at the good example, 4 lines of code and one line of comment, whilst the bad example consists of 7 lines of comments and 4 lines of code. Use comments, but don't overuse them

## Writing Systems Level Programming

<!-- TODO: Work on this -->

## The End

Thank you everyone for reading Emir YILDIRIM's C/C++ Guide, and I'll see you later.
