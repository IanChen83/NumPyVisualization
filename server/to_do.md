
To Do
=====

This document defines what we have/plan to implement in our visualization tool.
Those routines in **bold** style would be the first few ones to be implemented.

The naming conventions are list below:
* **a**: array
* **shape**: a tuple representing array dimentions
* **i, j, k, m, v, n**: integer

Reference are from: [NumPy Refernece](https://docs.scipy.org/doc/numpy/reference/)

## Array Creation Routines

These routines create a new array/view either by some parameters or from existing array.
It's not difficult to caculate the dimention of the output array.

#### Ones and Zeros

* **np.identity(n)**
  Output shape: (n, n)
* **np.ones(shape)**
  Output shape: shape
* **np.zeros(shape)**
  Output shape: shape
* np.full(shape, fill_value)
  Output shape: shape
* **np.ones_like(a)**
* **np.zeros_like(a)**
* np.full_like(a, fill_value)

#### From Existing Data

* np.array(object)
* np.asarray(a)
* np.asanyarray(a)

#### Numerical Ranges

* np.arange([start,] stop[, step])
* np.linspace(start, stop[, num, endpoint])
* np.logspace(start, stop[, num, endpoint, base])

#### Building Matrices

* np.diag(v[, k])
* **np.tril(m, [, k])**
* **np.triu(m, [, k])**

## Array Manipulation Routines

#### Change Array Shape

* **np.reshape(a, newshape)**
  Output shape: newshape

#### Transpose-like Operations

* np.ravel(a)
  Output shape: (1, __elements in a__)
* np.moveaxis(a, source, destination)
  Output shape: *Dependent on source and diestination*
* **np.swapaxes(a, axis[, start])**
  Output shape: *Dependent on axis and start*
* **np.transpose(a[, axes])**
  Output shape: *Dependent on axes*

#### Joining Arrays

* np.concatenate((a1, a2, ...)[, axis])
  Output shape: *Dependent on a1, a2, ...*

