# Chora
A JavaScript simulator of the [Patmos ISA](http://patmos.compute.dtu.dk/), developed by [Marc Sun Bøg](https://github.com/MarcMarabou) & [Simon Amtoft Pedersen](https://github.com/simonamtoft) as a part of their bachelor project at the Technical University of Denmark (DTU), advised by [Martin Schoeberl](https://www.imm.dtu.dk/~masca/) from DTU Compute. 

# Setup Chora
First install NodeJS and clone the repository from GitHub.
Then install dependencies in the root folder of the repository with
```
npm i 
```

## Run Chora as browser application
Open cmd and change scope to root folder of Chora and run
```
npm start
```

## Run JEST tests
Open cmd and change scope to root folder of Chora and run
```
npm run test
```

# To-Do
1. Fix all the copy pasta JSDoc
2. Find an icon and replace the existing one (browser tab)
3. Fix bugs (When having a bundle before error, offset is wrong)
4. Move pending branch to processor state and update history
5. Make long immediates show in machine code also
