# Nclusion Challenge

Step-by-step of my work:

- I started by creating the **utils** folder and making all the calculation there.

  - The helper function came first as I got a grip on what the equation actually needed.
  - After that I created the iterate file and function to actually calculate what the challenge needed

- From there I went on to the UI portion of the project (my favorite!)
  - Using the HTML element canvas along with react and tailwind.
  - I created the component **<ComplexGrid>** to actually put data into the graph

NOTE: Since I was supposed to stop after 4 hours of work (I really worked close to 5 to be fully honest because it took me a little longer to understand the equation) I didn't have time to do any of optimizations that I wanted.

- Potential optimization:

  1. Remove all function calls and make it inline math (while this does affect performance I wouldn't use it because readability is also very important - specially for future me/engineer that will touch this code later)
  2. Replace `Math.sqrt()` with a squared check.
  3. Pre-calculate constants outside for loops - to avoid re-running them every iteration.
  4. Move for loop calculation block to a Web Worker script
