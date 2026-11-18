<!-- 
The file that Claude will base cpp-guide on
-->

# Emir YILDIRIM's C/C++ Guide

Want to write C/C++ like [the creator of ENux](https://github.com/ENux-Distro)? Well then this guide is for you.

## Before Starting

This guide assumes that you have some knowledge of writing C/C++, preferably systems level C/C++. 

This guide isn't a C/C++ standard, it's only my opinion. You can write however you want.

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

The ``#pragma once`` method is a modern approach in header files. It's a one liner, and most modern compilers support it.

This method can be used for codebases that target modern compilers, where you control the build environment.

But if you're writing open source code, distributed to unknown environments, then this method could work on user A, but could fail on user B.

### ``The macro style include guards method``

The macro style include guards method is the safest version of header definition, as it works almost everywhere.

This method can be used for open source code, distributed to unknown environments.

But, if you're too lazy to write 3 more lines of code, and know the specifics of how the code will be controlled, this method isn't for you.

## Namespaces

A namespace is a way to group related code together under a name, it helps you avoid naming conflicts when your code grows or when you use code from multiple sources.

Let's say you're writing a package manager, and you have an `install()` function. Then you pull in a library that also has an `install()` function. Now the compiler doesn't know which one you mean.

That's where namespaces come in:

```c++
namespace pkg {
  int install(char *package_name) {
    // Installs the package
  }
}

int main(int argc, char **argv) {
  pkg::install(argv[1]);
  return 0;
}
```

Now everyone knows that `install()` belongs to `pkg`, and it won't fight with anyone else's `install()`.

### ``using namespace``

You've probably seen this at the top of a lot of C++ files:

```c++
using namespace std;
```

It saves you from typing `std::` every time, but it dumps everything from `std` into your code, and that's how the naming conflicts come back.

Examples:

Good

```c++
std::cout << "Hello" << std::endl;
```

Bad

```c++
// in a header file
using namespace std;
```

Never write `using namespace` in a header file, because every file that includes your header gets it too, whether they want it or not. If you're really lazy to write `std::`, only do it inside a `.cpp` file, or inside a function.

### Don't overdo it

Just like OOP, just because C++ has namespaces, doesn't mean you should nest them 5 levels deep.

Bad

```c++
program::core::package::manager::install::run();
```

One or two levels is enough for almost every project.

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
  if (strcmp(argv[1], "install") == 0 && strcmp(argv[2], "distroX") == 0) {
    distroX::install();
  }

  return 0;
}
```
Look, your code looks prettier, more organized. This is a good way to use OOP. But a bad way is:

```c++
class calculator {

public:

  static int addition(int a, int b) {
    return a + b;
  }

};

int main() {
  calculator::addition(1, 2);
}
```

Just because C++ has OOP, doesn't mean you should use it everywhere. The addition function could've been simplified to one helper function.

## Function Definition

### Pointers

The pointer symbols (* and &) should be written to the **LEFT SIDE OF THE VARIABLE NAME**, not the **RIGHT SIDE OF THE POINTER TYPE**.

Examples:

Good

```c++
char good_char;
char *good_pointer = &good_char;
char &another_good_pointer = good_char;
```

Bad

```c++
char bad_char;
char* bad_pointer = &bad_char;
char& another_bad_pointer = bad_char;
```

### Helper Functions

Your helper function must tell you what it does. Don't rename it as tmp_helperfunc_1, because the next developer would have a hard time figuring it out.

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
```

If you're writing a helper function that wraps a library function with more error checking, you can name it as <library_function>2,
or if the function already has a number, you can do <library_function>[number + 1].

Example:

```c++
void *malloc2(size_t size) {
  void *ptr = malloc(size);
  if (ptr == NULL) {
    perror("malloc");
    exit(1);
  }
  return ptr;
}
```

## Leveraging from the Features

### C++ Features
C++ offers many incredible features, like OOP, strings, safe pointers and etc. But you should only use them when you know the internals of that function.

Examples:

```c++
std::filesystem::create_directory("dir"); // this is the same as mkdir("dir");
std::filesystem::rename("file.txt", "File.txt"); // this is the same as rename("file.txt", "File.txt");
std::filesystem::create_symlink("file.txt", "File.txt"); // this is the same as symlink("file.txt", "File.txt");
```

### GNU Extensions

GNU extensions are non-standard language features added by GCC to C and C++ beyond the official ISO standards.

GNU extensions sometimes allow you to write simple one liners that the normal ISO standards wouldn't allow.

Only use GNU extensions if the code requires GCC and not any other compiler like Clang.

Example:

```c++
execvp("foo", (char *[]){"foo", NULL}); // ISO standard C++ doesn't allow this, but GNU extensions do
```

This example uses a compound literal, which is a GNU extension in C++. It can't compile on ISO standard C++ compilers, or with `-pedantic-errors`.

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
  std::cout << a + b << std::endl;
  // The calculator will print the result of a + b to the standard output using cout, and will add a new line using endl.
  // These 2 library functions are in the iostream.h header file, in the std:: namespace
  reboot(RB_AUTOBOOT);
  // This simple yet dangerous prank reboots your computer. the reboot library functions wraps int syscall(SYS_reboot, int magic, int magic2, int op, void *arg)
}
```

Look at the good example: 4 lines of code and one line of comment. The bad example has the same 4 lines of code, buried under 7 lines of comments. Use comments, but don't overuse them.

## Writing Systems Level Programming

Systems level programming is writing the code that sits close to the kernel, like init systems, package managers, shells and drivers. This is where C/C++ really shines, but it's also where a small mistake can break the whole system.

### Check every return value

In systems programming, almost every function can fail. Your disk can be full, your file can be missing, your process can run out of memory. If you don't check the return value, you'll never know.

Examples:

Good

```c++
int fd = open("/etc/foo.conf", O_RDONLY);
if (fd == -1) {
  perror("open");
  return 1;
}
```

Bad

```c++
int fd = open("/etc/foo.conf", O_RDONLY);
read(fd, buffer, sizeof(buffer));
```

This is also where the `<library_function>2` helpers from the Helper Functions section are useful. Write the error checking once, and use it everywhere.

### Know your system calls

Remember the C++ Features section? `std::filesystem::create_directory` is just `mkdir` under the hood. When you're writing systems level code, you should know which system call your code ends up making, because that's what actually runs on the machine.

If you don't know, `strace` will tell you:

```sh
strace ./your_program
```

### Clean up after yourself

If you open it, close it. If you allocate it, free it. If you fork it, wait for it.

Good

```c++
pid_t pid = fork();
if (pid == 0) {
  execvp("foo", (char *[]){"foo", NULL});
  _exit(1);
}
waitpid(pid, NULL, 0);
```

Bad

```c++
fork();
execvp("foo", (char *[]){"foo", NULL});
```

The bad example replaces both the parent and the child with `foo`, and nobody waits for anything.

## The End

Thank you everyone for reading Emir YILDIRIM's C/C++ Guide, and I'll see you later.
