Columnizer
==========

jQuery dependent column-sorting utility, with exceptions!

In short, Columnizer is a jQuery utility for distributing child elements across columns within a parent element.  It seeks to create even columns by assigning each new/subsequent element to the currently shortest column, BUT, it is sensitive to height exceptions, and will kick elements back to preceding columns if said exception is not exceeded.

In long...

This utility was built to solve the issue of generating clean, logically organized columns.

The specific problem dealt with organizing columns of the same width but with varying height, based on a preset order.
The initial solution of simply assigning an individual unit to a specific column ahead of time became unworkable when column height started to change, as seen here:
```
[       ] [   2   ]
[       ] [       ]
[   1   ] ---------
[       ] [       ]
[       ] [   4   ]
[       ] [       ]
---------
[       ]
[   3   ]
[       ]
---------
[   5   ]
```

As you can see, naively assigning columns based solely on order more or less negated the intent of that order.
The second solution was to find an already existing column sorting utility to simply push subsequent elements into the shortest column, thus creating a logical and more even column growth.  I quickly learned, though that this has its own awkward issues:
```
[       ] [       ]
[       ] [       ]
[   1   ] [   2   ]
[       ] [       ]
[       ] [       ]
[       ] ---------
--------- [       ]
[       ] [   3   ]
[   4   ] [       ]
[       ]
```

While we have a much more even (and thus aesthetically pleasing) column flow, the order is now awkward, and because of the relatively small height difference, appears to be counting 1, 2, 4, 3.  The problem, of course, is that a column sorting algorithm based solely on identifying the shortest column doesn't care if the difference in height is 1 unit or 1000 units.  So, while this solution does solve the general problem, it's rigidity creates a new problem of an awkward flow.

What I needed was a smarter solution, which aimed evenly distribute elements across a column layout, but also gave consideration to the originally intended flow and order.

What I built was a column sorting utility... with exceptions!

More to come...


